import styled from 'styled-components/native';

export const Container = styled.View`
    background-color: #49b454;
    flex: 1;
    flex-direction: column;
    align-items: center;
    padding-bottom: 30px;
`;

export const LogoView = styled.View`
    margin-top: 60px;
    margin-bottom: 55px;
`;

export const LogoImage = styled.Image`
    width: 200px;
    height: 100px;
`;

export const SwitchField = styled.View`
    background-color: #ffffff;
    width: 300px;
    height: 60px;
    align-items: center;
    border-radius: 5px;
    margin-bottom: 25px;
    flex-direction: row;
    justify-content: space-evenly;
    border: 1.8px solid #1c274e;
`;

export const SwitchText = styled.Text`
    font-family: 'Poppins-SemiBold';
`;
