import {useState} from "react";
import {Container, FormControl, InputGroup} from "react-bootstrap";
import URLChecker from "../utils/URLChecker.ts"
import backEndCommunicator from "../utils/backEndCommunicator.ts";

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPaperPlane} from '@fortawesome/free-solid-svg-icons'

import {motion} from "motion/react";

import ExpiryOptionsComp from "./ExpiryOptionsComp.tsx";
import type {ExpiryOption} from "../type/ExpiryOption.ts";
import "../App.css"
import type {CreateUrlRequest} from "../type/CreateUrlRequest.ts";
import type {PopUpData} from "../type/PopUpData.ts";
import PopUp from "./PopUp.tsx";


function InputField() {
    // HERE WHERE THE URL WILL BE STORED.
    const [urlToSend, setUrlToSend] = useState<CreateUrlRequest>({originalUrl: "", amount: 1, isItInMinutes: false});

    // STATES FOR BUTTON ANIMATION.
    const [enableButton, setEnableButton] = useState<boolean>(false)
    const [hoveredBtn, sethoveredBtn] = useState(false)

    const [selectedOption, setSelectedOption] = useState<ExpiryOption | null>(null)

    const [popUpData, setPopUpData] = useState<PopUpData | null>(null);


    async function onSubmit(urlToSend: CreateUrlRequest) {
        try {
            const response = await backEndCommunicator.postSendUrl(urlToSend);
            setPopUpData({ variant: "SUCCESS", data: response });
        } catch (err) {
            const message = backEndCommunicator.extractErrorMessage(err);
            setPopUpData({ variant: "ERROR", message });
        }
    }


    function handleExpiryChange(option: ExpiryOption) {
        setSelectedOption(option);

        setUrlToSend(prev => ({
            ...prev,
            amount: option.amount,
            isItInMinutes: option.isItInMinutes,
        }));
    };

    function handleURLChange(e: React.ChangeEvent<HTMLInputElement>) {
        const value = e.target.value;

        setUrlToSend(prev => ({
            ...prev,
            originalUrl: value,
        }));

        setEnableButton(URLChecker(value));
    }

    return (
        <>
            <PopUp popUpData={popUpData} onClose={() => setPopUpData(null)} />
            <Container>
                <InputGroup className={"border border-5 border-dark rounded p-0"}>
                    <FormControl value={urlToSend?.originalUrl} onChange={handleURLChange} size="lg"
                                 className={"rounded-0"}
                                 placeholder={"Enter The URL Here. \"http://example.com\""}/>
                    <motion.button
                        className={"sendBtn btn btn-warning rounded-0"}
                        disabled={!enableButton || selectedOption === null}
                        onHoverStart={() => sethoveredBtn(true)}
                        onHoverEnd={() => sethoveredBtn(false)}
                        onClick={async () => {
                            await onSubmit(urlToSend);

                            setUrlToSend(prev => ({
                                ...prev,
                                originalUrl: "",
                            }));
                            // RESET STATES
                            setEnableButton(false)
                            setSelectedOption(null);
                            setUrlToSend({
                                originalUrl: "",
                                amount: 1,
                                isItInMinutes: false,
                            });
                        }
                        }
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
            <Container className={"mt-5"}>
                <ExpiryOptionsComp selectedOption={selectedOption} setSelectedOption={handleExpiryChange}/>
            </Container>
        </>
    )
}

export default InputField;