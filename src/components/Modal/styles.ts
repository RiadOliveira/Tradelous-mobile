import styled from 'styled-components/native';
import IconComponent from 'react-native-vector-icons/MaterialIcons';
import { RectButton } from 'react-native-gesture-handler';

export const ModalView = styled.View`
    background-color: #243266;
    width: 75%;
    height: 40%;
    border-radius: 15px;

    align-items: center;
`;

export const Icon = styled(IconComponent)`
    margin-top: 10%;
`;

export const ModalText = styled.Text`
    font-family: 'Poppins-Bold';
    text-align: center;
    color: #fff;
    margin-top: 8%;
    width: 76%;
`;

export const ButtonsContainer = styled.View`
    flex-direction: row;
    width: 100%;

    justify-content: space-evenly;
    margin-top: 10%;
`;

export const ModalButton = styled(RectButton)`
    min-width: 33%;
    padding: 10px 0;
    align-items: center;
    border-radius: 8px;
`;

export const ModalButtonText = styled.Text`
    color: #ffffff;
    font-family: 'Poppins-Bold';
`;
