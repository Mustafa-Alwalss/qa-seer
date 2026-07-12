import {Button, FormControl, InputGroup} from "react-bootstrap";
import {useState} from "react";
// import PopUp from "./PopUp.tsx";
import {URLChecker} from "../utils/URLChecker.ts"
function InputField() {
    // HERE WHERE THE URL WILL BE STORED.
    const [URL, setURL] = useState<string>("")

    const [enableButton, setEnableButton] = useState<boolean>(false)

    // THIS WILL BE PASSED TO 'PopUp' COMP.
    // const [showPopUP, setShowPopUP] = useState<boolean>(false);


    //
    // function onSubmit() {
    //
    //     if (URL !== "") {
    //
    //     }
    // }

    function handleURLChange(e:React.ChangeEvent<HTMLInputElement>) {
            setURL(e.currentTarget.value)
            setEnableButton(URLChecker(e.currentTarget.value))
    }

    return (
        <>
            {/*<PopUp/>*/}
            <InputGroup className={"border border-5 border-dark rounded p-0"}>
                <FormControl value={URL} onChange={handleURLChange} size="lg" className={"rounded-0"}
                             placeholder={"Enter The URL Here. \"http://example.com\""}/>
                <Button disabled={!enableButton} variant={"warning"} className={"rounded-0"}>Shorten it</Button>
            </InputGroup>
        </>
    )
}

export default InputField;