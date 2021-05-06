import React from 'react';
import { Container, Icon } from './styles';
import { ScrollView, Text } from 'react-native';
import { useAuth } from '../../../hooks/auth';
import { useCamera } from '../../../hooks/camera';
import api from '../../../services/api';
import Camera from '../../../components/Camera';
import Button from '../../../components/Button';

interface IProduct {
    name: string;
    id: string;
    price: number;
    quantity: number;
    brand: string;
    barCode?: string;
    image?: string;
}

const RegisterProduct: React.FC = () => {
    const { user } = useAuth();
    const { isCameraVisible, handleCameraVisibility } = useCamera();

    return isCameraVisible ? (
        <Camera
            onBarCodeRead={event => {
                console.log(event.data);
            }}
        />
    ) : (
        <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
        >
            <Container>
                <Text>Criar Produto</Text>
            </Container>
        </ScrollView>
    );
};

export default RegisterProduct;
