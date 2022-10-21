import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:8000",
});

const requests = {
    getSignature: `/signature`,
};

export default class API {
    constructor() {
    }

    getSignature = async (meetingId: string) => {
        const response = await instance.get(requests.getSignature, { params: { meetingId: meetingId } });
        const signature: string = response.data.signature;
        return signature;
    }
}
