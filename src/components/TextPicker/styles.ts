import styled from 'styled-components/native';
import {
    GestureHandlerRootView,
    RectButton,
} from 'react-native-gesture-handler';

interface TextPickerInputProps {
    hasPasteButton: boolean;
}

export const TextPickerView = styled(GestureHandlerRootView)`
    background-color: #243266;
    width: 80%;
    height: 45%;
    border-radius: 15px;

    align-items: center;
`;

export const TextPickerInfo = styled.Text`
    font-family: 'Poppins-Bold';
    text-align: center;
    color: #fff;
    margin-top: 5%;
    margin-bottom: 1%;
    width: 76%;
`;

export const InputContainer = styled.View`
    width: 80%;
    height: 48px;

    border-radius: 10px;
    background-color: #fff;
    margin-top: 6%;

    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

export const TextPickerInput = styled.TextInput<TextPickerInputProps>`
    font-family: Poppins-Regular;

    height: 98%;
    width: ${({ hasPasteButton }) => (!hasPasteButton ? '90%' : '72%')};
    text-align: ${({ hasPasteButton }) => (hasPasteButton ? 'left' : 'center')};

    margin-left: 5%;
`;

export const PasteButton = styled.TouchableOpacity`
    background-color: #45a84f;
    padding: 5%;
    border-radius: 10px;

    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
`;

export const ConfirmButton = styled(RectButton)`
    min-width: 35%;
    padding: 10px 0;
    align-items: center;
    border-radius: 8px;
    margin-top: 10%;
`;

export const ConfirmButtonText = styled.Text`
    color: #ffffff;
    font-family: 'Poppins-Bold';
`;
