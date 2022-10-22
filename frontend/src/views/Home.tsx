import React, { useEffect } from 'react';
import JoinForm, { MeetingData } from '../components/JoinForm';
import { useZoomSDK } from '../hooks/useZoomSDK';

const Home: React.FC = () => {
    const { joinMeeting, isJoined } = useZoomSDK({})

    useEffect(() => {
    }, [])

    return (
        <div className="App">
            <header className="App-header">
                <h1>Zoom Meeting Utility</h1>
                <JoinForm onSubmit={joinMeeting} />
            </header>
        </div>
    );
}

export default Home;
