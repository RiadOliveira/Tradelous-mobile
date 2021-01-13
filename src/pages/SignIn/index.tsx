import React from 'react';
import {
    Container,
    LogoView,
    LogoImage,
    ForgotPassword,
    ForgotPasswordText,
    SignUp,
    SignUpText,
} from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';
import TestLogo from '../../../assets/Logo/Test-logo.png';

const SignIn: React.FC = () => (
    <Container>
        <LogoView>
            <LogoImage source={TestLogo} />
        </LogoView>

        <Input name="E-mail" icon="mail-outline" />
        <Input name="Senha" icon="lock-outline" />

        <ForgotPassword>
            <ForgotPasswordText>Esqueceu sua senha?</ForgotPasswordText>
        </ForgotPassword>

        <Button>Entrar</Button>

        <SignUp>
            <SignUpText>Ainda não possui uma conta? Crie-a agora</SignUpText>
        </SignUp>
    </Container>
);

export default SignIn;
