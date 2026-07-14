import type {PopUpData} from "./PopUpData.ts";

export interface PopUpPropsInterface {
    popUpData: PopUpData | null;
    onClose: () => void;
}