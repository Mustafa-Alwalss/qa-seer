import { Modal, Button, Spinner } from "react-bootstrap";
import type {PopUpPropsInterface} from "../type/PopUpPropsInterface.ts";


// Resolves the front-end origin used for shareable short links: <APP_URL>/:shortCode
// Checks the VITE_APP_BASE_URL env var first, falls back to the current window origin,
// and strips any trailing slash so we never render a double slash.
function getAppBaseUrl(): string {
    const configured = import.meta.env.VITE_APP_BASE_URL;
    const base = configured ? configured : window.location.origin;
    return base.replace(/\/+$/, "");
}

const APP_URL = getAppBaseUrl();


function PopUp({ popUpData, onClose }: PopUpPropsInterface) {
    const isLoading = popUpData?.variant === "LOADING";

    return (
        <Modal show={popUpData !== null} onHide={onClose} centered>
            <Modal.Header closeButton={!isLoading}>
                <Modal.Title>
                    {isLoading
                        ? "Shortening..."
                        : popUpData?.variant === "SUCCESS" ? "Link Shortened!" : "Something went wrong"}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {isLoading && (
                    <div className="d-flex flex-column align-items-center justify-content-center vh-75">
                        <Spinner animation="border" variant="warning" />
                        <p className="mt-3 text-muted">Shortening your link...</p>
                    </div>
                )}

                {popUpData?.variant === "SUCCESS" && (
                    <div>
                        <p>Your shortened link:</p>
                        <a href={`${APP_URL}/${popUpData.data.shortCode}`} target="_blank" rel="noreferrer">
                            {`${APP_URL}/${popUpData.data.shortCode}`}
                        </a>
                    </div>
                )}

                {popUpData?.variant === "ERROR" && (
                    <p className="text-danger">{popUpData.message}</p>
                )}
            </Modal.Body>

            {!isLoading && (
                <Modal.Footer>
                    <Button variant="secondary" onClick={onClose}>
                        Close
                    </Button>
                </Modal.Footer>
            )}
        </Modal>
    );
}

export default PopUp;