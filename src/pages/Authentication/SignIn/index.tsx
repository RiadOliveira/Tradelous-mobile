import React, { useCallback, useRef } from 'react';
import {
    Container,
    LogoView,
    LogoImage,
    ForgotPassword,
    ForgotPasswordText,
    SignUpButton,
    SignUpText,
} from './styles';

import Input from '@components/Input';
import Button from '@components/Button';
import TestLogo from '@assets/logo/test-logo.png';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '@hooks/auth';
import { TextInput, Dimensions } from 'react-native';

import * as yup from 'yup';
import ErrorCatcher from '@errors/errorCatcher';

const { height } = Dimensions.get('screen');

interface ISignInFormData {
    email: string;
    password: string;
}

const SignIn: React.FC = () => {
    const navigation = useNavigation();
    const { signIn } = useAuth();

    const formRef = useRef<FormHandles>(null);
    const passwordInput = useRef<TextInput>(null);

    const handleSubmit = useCallback(
        async (data: ISignInFormData) => {
            try {
                const schema = yup.object().shape({
                    email: yup
                        .string()
                        .required('E-mail obrigatório')
                        .email('Formato de e-mail incorreto'),
                    password: yup
                        .string()
                        .required('Senha obrigatória')
                        .min(6, 'Senha de no mínimo 6 caracteres'),
                });

                await schema.validate(data, {
                    abortEarly: false,
                });

                await signIn(data);
            } catch (err) {
                ErrorCatcher(err as Error | yup.ValidationError, formRef);
            }
        },
        [signIn],
    );

    return (
        <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
        >
            <Container>
                <LogoView
                    style={{
                        marginBottom: height / 10,
                        marginTop: height / 10,
                    }}
                >
                    <LogoImage source={TestLogo} />
                </LogoView>

                <Form ref={formRef} onSubmit={handleSubmit}>
                    <Input
                        autoCorrect={false}
                        textContentType="emailAddress"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        name="email"
                        placeholder="E-mail"
                        icon="mail-outline"
                        onSubmitEditing={() => passwordInput.current?.focus()}
                        returnKeyType="next"
                    />

                    <Input
                        returnKeyType="send"
                        autoCapitalize="none"
                        textContentType="password"
                        secureTextEntry
                        name="password"
                        placeholder="Senha"
                        icon="lock-outline"
                        ref={passwordInput}
                        onSubmitEditing={() => formRef.current?.submitForm()}
                    />
                </Form>

                <ForgotPassword
                    onPress={() => navigation.navigate('ForgotPassword')}
                    activeOpacity={0.5}
                >
                    <ForgotPasswordText>Esqueceu sua senha?</ForgotPasswordText>
                </ForgotPassword>

                <Button
                    smallerText
                    onPress={() => formRef.current?.submitForm()}
                >
                    Entrar
                </Button>

                <SignUpButton
                    onPress={() => navigation.navigate('SignUp')}
                    activeOpacity={0.5}
                >
                    <SignUpText>
                        Ainda não possui uma conta? Crie-a agora!
                    </SignUpText>
                </SignUpButton>
            </Container>
        </ScrollView>
    );
};

export default SignIn;
