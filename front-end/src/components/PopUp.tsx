import { Modal, Button } from "react-bootstrap";
import type {PopUpPropsInterface} from "../type/PopUpPropsInterface.ts";


const BASE_URL = import.meta.env.VITE_API_BASE_URL;


function PopUp({ popUpData, onClose }: PopUpPropsInterface) {
    return (
        <Modal show={popUpData !== null} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>
                    {popUpData?.variant === "SUCCESS" ? "Link Shortened!" : "Something went wrong"}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {popUpData?.variant === "SUCCESS" && (
                    <div>
                        <p>Your shortened link:</p>
                        <a href={`${BASE_URL}/goto/${popUpData.data.shortCode}`} target="_blank" rel="noreferrer">
                            {`${BASE_URL}/goto/${popUpData.data.shortCode}`}
                        </a>
                    </div>
                )}

                {popUpData?.variant === "ERROR" && (
                    <p className="text-danger">{popUpData.message}</p>
                )}
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default PopUp;