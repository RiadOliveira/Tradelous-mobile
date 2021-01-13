import styled from 'styled-components/native';

//#cd4c4c

export const Container = styled.View`
    background-color: #49b454;
    flex: 1;
    flex-direction: column;
    align-items: center;
`;

export const LogoView = styled.View`
    margin-top: 100px;
    margin-bottom: 80px;
`;

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
    bottom: 50px;
`;

export const SignUpText = styled.Text`
    font-family: Poppins-Regular;
    color: #ffffff;
`;
