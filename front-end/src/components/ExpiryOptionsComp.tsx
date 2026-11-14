import { Dropdown } from "react-bootstrap";
import {useTranslation} from "react-i18next";
import type {ExpiryOptionsProps} from "../type/ExpiryOptionsProps.ts";
import type {ExpiryOption} from "../type/ExpiryOption.ts";



function ExpiryOptionsComp({selectedOption,setSelectedOption,}: ExpiryOptionsProps) {
    const {t} = useTranslation();

    const expiryOptionList: ExpiryOption[] = [
        { amount: 1, isItInMinutes: true },
        { amount: 15, isItInMinutes: true },
        { amount: 1, isItInMinutes: false },
        { amount: 3, isItInMinutes: false },
        { amount: 15, isItInMinutes: false },
        { amount: 30, isItInMinutes: false },
    ];

    function formatOption(option: ExpiryOption) {
        return option.isItInMinutes
            ? t("expiry.minutes", {count: option.amount})
            : t("expiry.days", {count: option.amount});
    }

    return (
        <Dropdown>
            <Dropdown.Toggle variant="warning">
                {selectedOption ? formatOption(selectedOption) : t("expiry.select")}
            </Dropdown.Toggle>

            <Dropdown.Menu>
                {expiryOptionList.map((option, index) => (
                    <Dropdown.Item
                        key={index}
                        onClick={() => setSelectedOption(option)}
                    >
                        {formatOption(option)}
                    </Dropdown.Item>
                ))}
            </Dropdown.Menu>
        </Dropdown>
    );
}

export default ExpiryOptionsComp;
