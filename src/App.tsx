import 'react-native-gesture-handler';
import React from 'react';
import Routes from './routes';
import ContextsProvider from './hooks';
import { StatusBar } from 'react-native';
import Toast from '@components/Toast';

const App: React.FC = () => {
    return (
        <>
            <StatusBar barStyle="light-content" />
            <ContextsProvider>
                <Routes />
                <Toast />
            </ContextsProvider>
        </>
    );
};

export default App;
