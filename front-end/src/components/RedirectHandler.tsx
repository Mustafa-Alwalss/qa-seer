import {useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import backEndCommunicator from "../utils/backEndCommunicator.ts";
import {Container, Spinner} from "react-bootstrap";

function RedirectHandler() {
    const { shortCode } = useParams<{ shortCode: string }>();
    const navigate = useNavigate();
    const isChecking = true;

    // FOR PRODUCTION.
    useEffect(() => {
        async function checkAndRedirect() {
            if (!shortCode) {
                navigate("/", { replace: true });
                return;
            }

            try {
                const url = await backEndCommunicator.getUrl(shortCode);
                window.location.href = url.originalUrl;
            } catch (err) {
                const message = backEndCommunicator.extractErrorMessage(err);
                navigate("/", { replace: true, state: { error: message } });
            }
        }

        checkAndRedirect();
    }, [shortCode, navigate]);

    // FOR DEVELOPING.
    // useEffect(() => {
    //     let isMounted = true;
    //
    //     async function checkAndRedirect() {
    //         if (!shortCode) {
    //             navigate("/", { replace: true });
    //             return;
    //         }
    //
    //         try {
    //             const url = await backEndCommunicator.getUrl(shortCode);
    //             if (isMounted) {
    //                 window.location.href = url.originalUrl;
    //             }
    //         } catch (err) {
    //             if (isMounted) {
    //                 const message = backEndCommunicator.extractErrorMessage(err);
    //                 navigate("/", { replace: true, state: { error: message } });
    //             }
    //         }
    //     }
    //
    //     checkAndRedirect();
    //
    //     return () => {
    //         isMounted = false;
    //     };
    // }, [shortCode, navigate]);
    return (
        <Container className="vh-100 d-flex flex-column align-items-center justify-content-center">
            {isChecking && <Spinner animation="border" variant="warning" />}
        </Container>
    );
}

export default RedirectHandler