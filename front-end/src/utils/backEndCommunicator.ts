import axios from 'axios';

export default class BackEndCommunicator {
    static async getTest() {
        const response = await axios.get(`http://localhost:8080/test`);
        return response.data;

    }

    static async postTest(url:string) {
        const response = await axios.post<string>(
            "http://localhost:8080/test",
            url
        );
        console.log("this is from post method "+response.data);
        return response.data;
    }

}

