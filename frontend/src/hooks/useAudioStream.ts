import { useEffect, useMemo, useState } from "react";

export type Props = {
    interval: number;
    callback: (stream: BlobEvent) => void;
}

export const useAudioStream = (props: Props) => {
    //const ctx = new AudioContext();

    useEffect(() => {
        (async () => {
            /*const videoStream = await navigator.mediaDevices.getDisplayMedia({
              video: true,
              audio: false
            });*/
            /*navigator.mediaDevices.getUserMedia = async (params) => {
              const mediaStreamDest = ctx.createMediaStreamDestination();
              const mediaStream = new MediaStream()
              mediaStreamDest.stream.getAudioTracks().forEach((x) => {
                mediaStream.addTrack(x);
              });
              return mediaStream;
            }*/
            const audioStream = await navigator.mediaDevices.getUserMedia({
                video: false,
                audio: true
            });
            //const combinedStream = new MediaStream([...audioStream.getTracks()])
            //const result = await navigator.permissions.query({ name: Permissions. });
            // Audio Context?
            console.log("Media Stream")
            //const mediaStreamDest = ctx.createMediaStreamDestination();
            //const mediaStream = new MediaStream()
            //mediaStreamDest.stream.getAudioTracks().forEach((x) => {
            //  mediaStream.addTrack(x);
            //});
            const mediaRecorder = new MediaRecorder(audioStream)
            mediaRecorder.ondataavailable = (event) => {
                props.callback(event)
            }
            mediaRecorder.start(props.interval);
        })()
    }, [])
    return {}
}
