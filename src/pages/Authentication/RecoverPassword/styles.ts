import styled from 'styled-components/native';

export const Container = styled.View`
    background-color: #49b454;
    flex: 1;
    align-items: center;
`;

export const LogoView = styled.View`
    margin: 10% 0 20%;
`;

export const LogoImage = styled.Image`
    width: 220px;
    height: 130px;
`;

export const TokenInputContainer = styled.View`
    width: 75%;
    height: 60px;

    border-radius: 5px;
    background-color: #fff;

    margin-bottom: 25px;

    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

export const TokenInput = styled.TextInput`
    font-family: Poppins-Regular;
    width: 72%;
    height: 98%;

    margin-left: 5%;
`;

export const PasteButton = styled.TouchableOpacity`
    background-color: #1c274e;
    padding: 6%;
    border-radius: 5px;
    margin-left: 3.1%;

    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
`;
