import styled, { css } from 'styled-components/native';
import icon from 'react-native-vector-icons/MaterialIcons';

interface InputProps {
    isSelected: boolean;
    isFilled: boolean;
    isErrored: boolean;
}

export const Container = styled.View<InputProps>`
    background-color: #ffffff;
    width: 75%;
    height: 60px;
    align-items: center;
    border-radius: 5px;
    margin-bottom: 25px;
    flex-direction: row;
    padding: 1.8px;

    ${props =>
        props.isErrored &&
        css`
            border: 1.5px solid #c02a2a;
        `}

    ${props =>
        props.isSelected && !props.isErrored
            ? css`
                  border: 1.5px solid #1c274e;
                  padding: 0;
              `
            : null}
`;

export const Content = styled.TextInput`
    font-family: Poppins-Regular;
    font-size: 14px;
    flex: 1;
    margin-top: 5px;
    margin-right: 15px;
`;

export const Icon = styled(icon)`
    margin-left: 10px;
    margin-right: 10px;
`;
