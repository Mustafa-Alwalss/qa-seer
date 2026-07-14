import axios from 'axios';
import type {CreateUrlRequest} from "../type/CreateUrlRequest.ts";
import type {UrlResponse} from "../type/UrlResponse.ts";
import type {ErrorResponse} from "../type/ErrorResponse.ts";

const BASE_URL = 'http://localhost:8080';

export default class BackEndCommunicator {
    static async getUrl(shortCode: string): Promise<UrlResponse> {
        const response = await axios.get<UrlResponse>(`${BASE_URL}${shortCode}`);
        return response.data
    }

    static async postSendUrl(req:CreateUrlRequest):Promise<UrlResponse> {
        const response = await axios.post<UrlResponse>(BASE_URL,req)
        return response.data
    }

    static extractErrorMessage(error: unknown): string {
        if (axios.isAxiosError<ErrorResponse>(error)) {
            if (error.response) {
                return error.response.data.message;
            }
            return "Could not reach the server. Please check your connection.";
        }
        return "An unexpected error occurred.";
    }


}

