import Camera from '@components/Camera';
import React, { createContext, useCallback, useState, useContext } from 'react';
import { BackHandler } from 'react-native';

type actionFunctionType = (data: string) => void;

interface ICameraContext {
    showCamera(): void;
    hideCamera(): void;
    setBarCodeReadFunction(actionFunction: actionFunctionType): void;
}

const cameraContext = createContext<ICameraContext>({} as ICameraContext);

const CameraContext: React.FC = ({ children }) => {
    const [isCameraVisible, setIsCameraVisible] = useState(false);
    const [onReadFunction, setOnReadFunction] = useState<actionFunctionType>(
        () => null,
    );

    const setBarCodeReadFunction = useCallback(
        (actionFunction: (data: string) => void) =>
            setOnReadFunction(() => actionFunction),
        [],
    );

    const handleBarCodeRead = useCallback(
        (data: string) => {
            onReadFunction(data);
            setIsCameraVisible(false);
        },
        [onReadFunction],
    );

    const showCamera = () => {
        setIsCameraVisible(true);

        BackHandler.addEventListener('hardwareBackPress', () => {
            setIsCameraVisible(false);

            BackHandler.addEventListener('hardwareBackPress', () => {
                BackHandler.exitApp();
                return true;
            });

            return true;
        });
    };

    const hideCamera = () => setIsCameraVisible(false);

    return (
        <cameraContext.Provider
            value={{
                showCamera,
                hideCamera,
                setBarCodeReadFunction,
            }}
        >
            {children}
            {isCameraVisible && (
                <Camera
                    onBarCodeRead={event => handleBarCodeRead(event.data)}
                />
            )}
        </cameraContext.Provider>
    );
};

const useCamera = (): ICameraContext => useContext(cameraContext);

export { CameraContext, useCamera };
