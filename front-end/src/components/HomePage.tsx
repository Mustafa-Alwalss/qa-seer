import {Col, Container, Row} from "react-bootstrap";
import Logo from "./Logo.tsx";
import InputField from "./InputField.tsx";
import Footer from "./Footer.tsx";

function HomePage() {
    return (
        <Container className={"vh-100 d-flex flex-column "}>
            <Row className="mt-5 ">
                <Col className={"text-center"}>
                    <Logo/>
                </Col>
            </Row>
            <Row className={"pb-5 mb-5 flex-grow-1 align-items-center"}>
                <Col>
                    <InputField/>
                </Col>
            </Row>
            <Row>
                <Footer/>
            </Row>
        </Container>
    );
}

export default HomePage;