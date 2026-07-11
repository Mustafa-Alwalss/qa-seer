import {Button, FormControl, InputGroup} from "react-bootstrap";

function InputField() {
    return (
        <>
                <InputGroup className={"border border-4 border-dark rounded p-0"}>
                    <FormControl size="lg"  className={"rounded-0"} placeholder={"Enter The URL Here."} />
                    <Button variant={"warning"}>Shorten it</Button>
                </InputGroup>
        </>
    )
}
export default InputField;