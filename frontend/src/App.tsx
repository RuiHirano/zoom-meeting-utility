import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import API from './api';

import ZoomMtgEmbedded from "@zoomus/websdk/embedded"
import JoinForm, { MeetingData } from './components/JoinForm';
import { useZoomSDK } from './hooks/useZoomSDK';
import Main from './views/Main';
import { useAudioStream } from './hooks/useAudioStream';

var ZOOM_SDK_KEY = process.env.REACT_APP_ZOOM_SDK_KEY

function App() {
  const api = new API();
  //const [isJoined, setIsJoined] = useState<boolean>(false);
  const { joinMeeting, isJoined } = useZoomSDK({})
  const { } = useAudioStream({
    interval: 1000,
    callback: (event) => {
      console.log(event)
      // generate wav file


      // send to server

      //var myURL = window.URL
      //var url = myURL.createObjectURL(event.data);
      //console.log(url)
    }
  })

  return (
    <div className="App">
      <header className="App-header">
        <h1>Zoom Meeting Utility</h1>
        <JoinForm onSubmit={joinMeeting} />
        <Main ZoomElement={<div id="meetingSDKElement" />} />
      </header>
    </div>
  );
}

export default App;
