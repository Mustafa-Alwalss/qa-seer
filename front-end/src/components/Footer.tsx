import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faGithub} from '@fortawesome/free-brands-svg-icons'
import {Col, Row} from "react-bootstrap";

import {useTranslation} from "react-i18next";

import "../App.css"

function Footer() {
    const {t} = useTranslation();

    return (
        <footer className="footer">
            <Row className={"mb-2 justify-content-center "}>
                <Col className={"font-monospace d-flex align-items-center justify-content-center gap-2"}>
                    <a href={"https://github.com/Mustafa-Alwalss/qa-seer"}
                       id="github-link">
                        {t("footer.repo")}
                    </a>
                    <FontAwesomeIcon size="2x" icon={faGithub}/>
                </Col>

            </Row>
        </footer>
    )
}
export default Footer