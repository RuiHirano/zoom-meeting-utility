import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import API from './api';

import ZoomMtgEmbedded from "@zoomus/websdk/embedded"
import JoinForm, { InputData } from './components/JoinForm';

var ZOOM_SDK_KEY = process.env.REACT_APP_ZOOM_SDK_KEY

function App() {
  const api = new API();

  const handleJoinMeeting = async (data: InputData) => {
    console.log(data)
    const signature = await api.getSignature(data.meetingId);
    const client = ZoomMtgEmbedded.createClient()
    let meetingSDKElement: HTMLElement | null | undefined = document.getElementById('meetingSDKElement')
    if (meetingSDKElement === null) meetingSDKElement = undefined
    client.init({ zoomAppRoot: meetingSDKElement, language: 'en-US' })
    client.join({
      sdkKey: ZOOM_SDK_KEY,
      signature: signature,
      meetingNumber: data.meetingId,
      password: data.password,
      userName: data.username
    })
  }

  useEffect(() => {
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <h1>Zoom Meeting Utility</h1>
        <JoinForm onSubmit={handleJoinMeeting} />
        <div id="meetingSDKElement">
        </div>
      </header>
    </div>
  );
}

export default App;
