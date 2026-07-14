import type {ExpiryOption} from "./ExpiryOption.ts";

export interface ExpiryOptionsProps {
    selectedOption      : ExpiryOption | null;
    setSelectedOption   : React.Dispatch<React.SetStateAction<ExpiryOption | null>>;
}