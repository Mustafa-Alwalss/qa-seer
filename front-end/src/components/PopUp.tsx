import { Modal, Button, Spinner } from "react-bootstrap";
import {useTranslation} from "react-i18next";
import type {PopUpPropsInterface} from "../type/PopUpPropsInterface.ts";


function PopUp({ popUpData, onClose }: PopUpPropsInterface) {
    const {t} = useTranslation();
    const isLoading = popUpData?.variant === "LOADING";

    return (
        <Modal show={popUpData !== null} onHide={onClose} centered>
            <Modal.Header closeButton={!isLoading}>
                <Modal.Title>
                    {isLoading
                        ? t("popup.loadingTitle")
                        : popUpData?.variant === "SUCCESS" ? t("popup.successTitle") : t("popup.errorTitle")}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {isLoading && (
                    <div className="d-flex flex-column align-items-center justify-content-center vh-75">
                        <Spinner animation="border" variant="warning" />
                        <p className="mt-3 text-muted">{t("popup.loadingBody")}</p>
                    </div>
                )}

                {popUpData?.variant === "SUCCESS" && (
                    <div>
                        <p>{t("popup.yourLink")}</p>
                        <a href={`${window.location.origin}/${popUpData.data.shortCode}`} target="_blank" rel="noreferrer" dir="ltr">
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
                        {t("popup.close")}
                    </Button>
                </Modal.Footer>
            )}
        </Modal>
    );
}

export default PopUp;