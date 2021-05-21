import React, { useCallback, useState } from 'react';
import BarcodeMask from 'react-native-barcode-mask';
import { RNCamera, RNCameraProps } from 'react-native-camera';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useCamera } from '@hooks/camera';
import { ReturnButton, FlashButton } from './styles';

const Camera: React.FC<RNCameraProps> = ({ ...props }) => {
    const { handleCameraVisibility } = useCamera();

    const [isFlashEnabled, setIsFlashEnabled] = useState(false);

    const handleCameraFlash = useCallback(() => {
        setIsFlashEnabled(flashValue => !flashValue);
    }, []);

    return (
        <>
            <RNCamera
                style={{ flex: 1 }}
                captureAudio={false}
                flashMode={isFlashEnabled ? 'torch' : 'off'}
                {...props}
            >
                <BarcodeMask
                    animatedLineColor="#49b454"
                    animatedLineWidth={'2%'}
                    animatedLineHeight={'100%'}
                    animatedLineOrientation={'vertical'}
                    lineAnimationDuration={2500}
                    height={'80%'}
                    width={'30%'}
                />
            </RNCamera>
            <ReturnButton
                activeOpacity={0.4}
                onPress={() => handleCameraVisibility(false)}
            >
                <Icon name="arrow-back" size={32} color="#ffffff" />
            </ReturnButton>

            <FlashButton
                activeOpacity={0.4}
                onPress={() => handleCameraFlash()}
            >
                {isFlashEnabled ? (
                    <Icon name="flash-on" size={32} color="#ffffff" />
                ) : (
                    <Icon name="flash-off" size={32} color="#ffffff" />
                )}
            </FlashButton>
        </>
    );
};

export default Camera;
