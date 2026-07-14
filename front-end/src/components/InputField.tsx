import {useState} from "react";
import {Container, FormControl, InputGroup} from "react-bootstrap";
// import PopUp from "./PopUp.tsx";
import URLChecker from "../utils/URLChecker.ts"
import backEndCommunicator from "../utils/backEndCommunicator.ts";

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPaperPlane} from '@fortawesome/free-solid-svg-icons'

import {motion} from "motion/react";

import "../App.css"
import ExpiryOptionsComp from "./ExpiryOptionsComp.tsx";
import type {ExpiryOption} from "../type/ExpiryOption.ts";


function InputField() {
    // HERE WHERE THE URL WILL BE STORED.
    const [URL, setURL] = useState<string>("")

    const [enableButton, setEnableButton] = useState<boolean>(false)
    const [hoveredBtn, sethoveredBtn] = useState(false)

    const [selectedOption, setSelectedOption] = useState<ExpiryOption|null>(null)

    // THIS WILL BE PASSED TO 'PopUp' COMP.
    // const [showPopUP, setShowPopUP] = useState<boolean>(false);


    async function onSubmit(url: string) {

        const get = await backEndCommunicator.getUrl()
        console.log("from get  " + get)

        const response = await backEndCommunicator.postSendUrl(url)
        console.log("this is from inputField.tsx " + response)

    }

    function handleURLChange(e: React.ChangeEvent<HTMLInputElement>) {
        setURL(e.currentTarget.value)
        setEnableButton(URLChecker(e.currentTarget.value))
    }

    return (
        <>
            {/*<PopUp/>*/}
                <Container>
                    <InputGroup className={"border border-5 border-dark rounded p-0"}>
                        <FormControl value={URL} onChange={handleURLChange} size="lg" className={"rounded-0"}
                                     placeholder={"Enter The URL Here. \"http://example.com\""}/>
                        <motion.button
                            className={"sendBtn btn btn-warning rounded-0"}
                            disabled={!enableButton}
                            onHoverStart={() => sethoveredBtn(true)}
                            onHoverEnd={() => sethoveredBtn(false)}
                        >
                            {hoveredBtn ?
                                <motion.div
                                    initial={{x: -30, y: 0, rotate: 45, opacity: 0}}
                                    animate={{x: 0, y: 0, rotate: 45, opacity: 1}}
                                    exit={{opacity: 0}}
                                    transition={{duration: 0.3}}
                                >
                                    <FontAwesomeIcon icon={faPaperPlane}/>
                                </motion.div>
                                :
                                <span className={"font-monospace"}>Shorten it</span>
                            }
                        </motion.button>
                    </InputGroup>
                </Container>
                <Container className={"mt-5"} >
                    <ExpiryOptionsComp selectedOption={selectedOption} setSelectedOption={setSelectedOption}/>
                </Container>
        </>
    )
}

export default InputField;