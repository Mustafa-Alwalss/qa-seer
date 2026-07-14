import type {ExpiryOption} from "./ExpiryOption.ts";

export interface ExpiryOptionsProps {
    selectedOption      : ExpiryOption | null;
    setSelectedOption: (option: ExpiryOption) => void;
}