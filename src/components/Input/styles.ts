import styled, {css} from 'styled-components/native';
import icon from 'react-native-vector-icons/MaterialIcons';

interface InputProps {
    isSelected: boolean;
    isFilled: boolean;
}

export const Container = styled.View<InputProps>`
    background-color: #ffffff;
    width: 300px;
    height: 60px;
    align-items: center;
    border-radius: 5px;
    margin-bottom: 25px;
    flex-direction: row;
    padding: 2px;

    ${(props) =>
        props.isSelected &&
        css`
            border: 1.8px solid #1c274e;
            padding: 0;
        `}

    ${(props) =>
        props.isFilled &&
        css`
            border: 1.8px solid #1c274e;
            padding: 0;
        `}
`;

export const Content = styled.TextInput`
    font-family: Poppins-Regular;
    font-size: 15px;
    flex: 1;
    margin-top: 5px;
    margin-right: 15px;
`;

export const Icon = styled(icon)`
    margin-left: 10px;
    margin-right: 10px;
`;
