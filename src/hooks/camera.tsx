import React, { createContext, useCallback, useState, useContext } from 'react';
import { BackHandler } from 'react-native';

interface CameraContextInterface {
    isCameraVisible: boolean;
    isFlashEnabled: boolean;
    handleCameraVisibility(visibility: boolean): void;
    handleCameraFlash(): void;
}

const cameraContext = createContext<CameraContextInterface>(
    {} as CameraContextInterface,
);

const CameraContext: React.FC = ({ children }) => {
    const [isCameraVisible, setIsCameraVisible] = useState(false);
    const [isFlashEnabled, setIsFlashEnabled] = useState(false);

    const handleCameraVisibility = useCallback(visibility => {
        if (!visibility) {
            //If camera's visibility is false, disable camera and return.
            setIsCameraVisible(visibility);

            return;
        }

        setIsCameraVisible(visibility);

        BackHandler.addEventListener('hardwareBackPress', () => {
            setIsCameraVisible(false);

            BackHandler.addEventListener('hardwareBackPress', () => {
                BackHandler.exitApp();
                return true;
            });

            return true;
        });
    }, []);

    const handleCameraFlash = useCallback(() => {
        setIsFlashEnabled(flashValue => !flashValue);
    }, []);

    return (
        <cameraContext.Provider
            value={{
                isCameraVisible,
                isFlashEnabled,
                handleCameraVisibility,
                handleCameraFlash,
            }}
        >
            {children}
        </cameraContext.Provider>
    );
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useCamera = () => useContext(cameraContext);

export { CameraContext, useCamera };
