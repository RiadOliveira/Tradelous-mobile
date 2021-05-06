import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'react-native';
import Routes from './routes';
import { AuthContext } from './hooks/auth';
import { CameraContext } from './hooks/camera';

const App: React.FC = () => {
    return (
        <>
            <StatusBar barStyle="light-content" />
            <AuthContext>
                <CameraContext>
                    <Routes />
                </CameraContext>
            </AuthContext>
        </>
    );
};

export default App;
