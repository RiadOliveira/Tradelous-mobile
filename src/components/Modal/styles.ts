import styled from 'styled-components/native';
import {
    GestureHandlerRootView,
    RectButton,
} from 'react-native-gesture-handler';

export const ModalView = styled.View`
    background-color: #243266;
    width: 75%;
    height: 36%;
    border-radius: 15px;

    align-items: center;

    justify-content: space-evenly;
`;

export const ModalText = styled.Text`
    font-family: 'Poppins-Bold';
    text-align: center;
    color: #fff;
    width: 76%;
`;

export const ButtonsContainer = styled(GestureHandlerRootView)`
    flex-direction: row;
    width: 100%;

    justify-content: space-evenly;
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
