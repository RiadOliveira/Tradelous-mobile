import styled from 'styled-components/native';

export const Container = styled.View`
    background-color: #49b454;
    flex: 1;
    flex-direction: column;
    align-items: center;
`;

export const LogoView = styled.View``;

export const LogoImage = styled.Image`
    width: 200px;
    height: 100px;
`;

export const ForgotPassword = styled.TouchableOpacity`
    margin-top: -5px;
    margin-bottom: 35px;
`;

export const ForgotPasswordText = styled.Text`
    font-family: Poppins-Regular;
    color: #ffffff;
`;

export const SignUp = styled.TouchableOpacity`
    position: absolute;
    bottom: 35px;
`;

export const SignUpText = styled.Text`
    font-family: Poppins-Regular;
    color: #ffffff;
`;
