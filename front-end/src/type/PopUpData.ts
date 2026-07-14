// type/PopUpData.ts
import type { UrlResponse } from "./UrlResponse.ts";

export type PopUpData =
    | { variant: "SUCCESS"; data: UrlResponse }
    | { variant: "ERROR"; message: string };