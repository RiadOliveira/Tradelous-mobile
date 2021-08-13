import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const DatePickerView = styled.View`
    background-color: #ffffff;
    width: 80%;
    height: 42%;
    border-radius: 15px;

    align-items: center;
    justify-content: space-evenly;
`;

export const DatePickerButton = styled(RectButton)`
    border-radius: 8px;
    width: 32%;
    height: 20%;
    align-items: center;
    justify-content: center;
    background-color: #1c274e;
`;

export const DatePickerButtonText = styled.Text`
    color: #ffffff;
    font-size: 13px;
    font-family: 'Poppins-Bold';
`;
