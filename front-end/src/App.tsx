import './App.css'
import Logo from "./components/Logo.tsx";
import {Container, Row} from "react-bootstrap";
import InputField from "./components/InputField.tsx";

function App() {
    return (
        <>
            <Container>
                <Row><Logo/></Row>
                <Row>
                    <InputField/>
                </Row>
            </Container>
        </>
    )
}

export default App
