import './App.css'
import Logo from "./components/Logo.tsx";
import {Col, Container, Row} from "react-bootstrap";
import InputField from "./components/InputField.tsx";

function App() {
    return (
        <>
            <Container className={"vh-100 d-flex flex-column "}>
                <Row className="mt-5 " >
                    <Col className={"text-center"}>
                        <Logo/>
                    </Col>
                </Row>
                <Row className={"pb-5 mb-5 flex-grow-1 align-items-center"}>
                    <Col >
                        <InputField/>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default App
