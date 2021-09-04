import styled from 'styled-components/native';

export const Container = styled.View`
    background-color: #49b454;
    flex: 1;
    flex-direction: column;
    align-items: center;
`;

export const LogoView = styled.View`
    margin: 10% 0 35%;
`;

export const LogoImage = styled.Image`
    width: 220px;
    height: 130px;
`;

export const RecoverPasswordButton = styled.TouchableOpacity`
    position: absolute;
    bottom: 35px;
`;

export const RecoverPasswordText = styled.Text`
    font-family: Poppins-Regular;
    color: #ffffff;
`;
