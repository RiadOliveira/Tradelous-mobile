import { RectButton } from 'react-native-gesture-handler';
import styled, { css } from 'styled-components/native';

interface ButtonProps {
    biggerText?: boolean;
}

export const Container = styled(RectButton)<ButtonProps>`
    width: 150px;
    height: 50px;
    justify-content: center;
    align-items: center;
    background-color: #1c274e;
    border-radius: 25px;

    ${props =>
        props.biggerText &&
        css`
            height: 60px;
            margin-top: 10px;
        `}
`;

export const Content = styled.Text`
    font-family: Poppins-SemiBold;
    font-size: 18px;
    color: #ffffff;
`;
