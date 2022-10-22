import { useMemo, useState } from "react";
import ZoomMtgEmbedded from "@zoomus/websdk/embedded"
import { MeetingData } from '../components/JoinForm';
import API from '../api';

var ZOOM_SDK_KEY = process.env.REACT_APP_ZOOM_SDK_KEY
export type Props = {
}

export const useZoomSDK = (props: Props) => {
    const api = new API();
    const client = ZoomMtgEmbedded.createClient()
    const [isJoined, setIsJoined] = useState<boolean>(false);

    const joinMeeting = async (data: MeetingData) => {
        console.log(data)
        try {
            const signature = await api.getSignature(data.meetingId);
            let meetingSDKElement: HTMLElement | null | undefined = document.getElementById('meetingSDKElement')
            if (meetingSDKElement === null) meetingSDKElement = undefined
            await client.init({ zoomAppRoot: meetingSDKElement, language: 'en-US', })
            await client.join({
                sdkKey: ZOOM_SDK_KEY,
                signature: signature,
                meetingNumber: data.meetingId,
                password: data.password,
                userName: data.username
            })
            console.log('Joined meeting')
            setIsJoined(true)
        } catch (e) {
            console.log("error: ", e)
        }
    }

    const sendMessage = (message: string) => {

    }

    return { joinMeeting, isJoined }
}
