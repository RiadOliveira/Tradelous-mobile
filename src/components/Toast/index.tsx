import React from 'react';
import ToastComponent from 'react-native-toast-message';
import toastConfig from './config';

const Toast: React.FC = () => {
    return (
        <ToastComponent
            topOffset={25}
            visibilityTime={2000}
            config={toastConfig}
            ref={ref => ToastComponent.setRef(ref)}
        />
    );
};

export default Toast;
