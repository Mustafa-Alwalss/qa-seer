import { Modal, Button, Spinner } from "react-bootstrap";
import type {PopUpPropsInterface} from "../type/PopUpPropsInterface.ts";


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
                        <a href={`${window.location.origin}/${popUpData.data.shortCode}`} target="_blank" rel="noreferrer">
                            {`${window.location.origin}/${popUpData.data.shortCode}`}
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