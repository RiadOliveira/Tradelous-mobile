import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

interface ButtonProps {
    biggerText?: boolean;
}

export const Container = styled(RectButton)<ButtonProps>`
    width: 150px;
    height: ${props => (props.biggerText ? '64px' : '50px')};
    justify-content: center;
    align-items: center;
    background-color: #1c274e;
    border-radius: 25px;
`;

export const Content = styled.Text`
    font-family: Poppins-SemiBold;
    text-align: center;
    font-size: 17px;
    color: #ffffff;
`;
