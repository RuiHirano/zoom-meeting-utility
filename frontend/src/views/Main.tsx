import React, { useEffect } from 'react';

export type Props = {
    ZoomElement: JSX.Element
}

const Main: React.FC<Props> = ({ ZoomElement }) => {


    useEffect(() => {
    }, [])

    return (
        <div className="App">
            <header className="App-header">
                {ZoomElement}
            </header>
        </div>
    );
}

export default Main;
