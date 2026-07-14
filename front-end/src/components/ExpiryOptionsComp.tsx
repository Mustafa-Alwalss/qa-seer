import { Dropdown } from "react-bootstrap";
import type {ExpiryOptionsProps} from "../type/ExpiryOptionsProps.ts";
import type {ExpiryOption} from "../type/ExpiryOption.ts";



function ExpiryOptionsComp({selectedOption,setSelectedOption,}: ExpiryOptionsProps) {

    const expiryOptionList: ExpiryOption[] = [
        { amount: 1, isItInMinutes: true },
        { amount: 15, isItInMinutes: true },
        { amount: 1, isItInMinutes: false },
        { amount: 3, isItInMinutes: false },
        { amount: 15, isItInMinutes: false },
        { amount: 30, isItInMinutes: false },
    ];

    return (
        <Dropdown>
            <Dropdown.Toggle variant="warning">
                {selectedOption
                    ? `${selectedOption.amount} ${
                        selectedOption.isItInMinutes ? "min" : "days"
                    }`
                    : "Select expiry option"}
            </Dropdown.Toggle>

            <Dropdown.Menu>
                {expiryOptionList.map((option, index) => (
                    <Dropdown.Item
                        key={index}
                        onClick={() => setSelectedOption(option)}
                    >
                        {`${option.amount} ${
                            option.isItInMinutes ? "min" : "days"
                        }`}
                    </Dropdown.Item>
                ))}
            </Dropdown.Menu>
        </Dropdown>
    );
}

export default ExpiryOptionsComp;