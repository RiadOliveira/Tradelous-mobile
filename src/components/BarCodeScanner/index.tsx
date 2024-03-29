import React, { useCallback } from 'react';
import {
    Container,
    BarCodeButton,
    BarCodeValueButton,
    BarCodeValue,
} from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useCamera } from '@hooks/camera';

interface ScannerProps {
    barCodeValue: string;
    actionFunction: (data: string) => void;
    deleteFunction: () => void;
}

const BarCodeScanner: React.FC<ScannerProps> = ({
    barCodeValue,
    actionFunction,
    deleteFunction,
}) => {
    const { showCamera, setBarCodeReadFunction } = useCamera();

    const handleButtonPress = useCallback(() => {
        showCamera();
        setBarCodeReadFunction(actionFunction);
    }, [actionFunction, setBarCodeReadFunction, showCamera]);

    const handleDeleteBarCode = () => barCodeValue && deleteFunction();

    return (
        <Container>
            <Icon
                name="qr-code"
                size={24}
                style={{ position: 'absolute', left: 12 }}
                color={barCodeValue ? '#374b92' : 'black'}
            />

            <BarCodeValueButton onPress={handleDeleteBarCode}>
                <BarCodeValue>
                    {barCodeValue ? barCodeValue : 'Sem código inserido'}
                </BarCodeValue>
            </BarCodeValueButton>

            <BarCodeButton onPress={handleButtonPress} activeOpacity={0.4}>
                <Icon name="qr-code-scanner" size={24} color="#374b92" />
            </BarCodeButton>
        </Container>
    );
};

export default BarCodeScanner;
