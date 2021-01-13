import {RectButton} from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const Container = styled(RectButton)`
    width: 150px;
    height: 50px;
    justify-content: center;
    align-items: center;
    background-color: #1c274e;
    border-radius: 25px;
`;

export const Content = styled.Text`
    font-family: Poppins-SemiBold;
    font-size: 19px;
    color: #ffffff;
`;
