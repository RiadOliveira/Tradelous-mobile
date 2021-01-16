import React, { useCallback, useRef } from 'react';
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
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import { TextInput } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import * as yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';

interface SignInFormData {
    email: string;
    password: string;
}

const SignIn: React.FC = () => {
    const navigation = useNavigation();

    const formRef = useRef<FormHandles>(null);
    const passwordInput = useRef<TextInput>(null);

    const handleSubmit = useCallback(async (data: SignInFormData) => {
        try {
            const schema = yup.object().shape({
                email: yup
                    .string()
                    .required('E-mail obrigatório')
                    .email('Formato de e-mail incorreto'),
                password: yup.string().required('Senha obrigatória'),
            });

            await schema.validate(data, {
                abortEarly: false,
            });
        } catch (err) {
            if (err instanceof yup.ValidationError) {
                getValidationErrors(err);
            }
        }
    }, []);

    return (
        <ScrollView
            contentContainerStyle={{ flex: 1 }}
            keyboardShouldPersistTaps="handled"
        >
            <Container>
                <LogoView>
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
                        onSubmitEditing={() => {
                            passwordInput.current?.focus();
                        }}
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
                        onSubmitEditing={() => {
                            formRef.current?.submitForm();
                        }}
                    />
                </Form>

                <ForgotPassword
                    onPress={() => {
                        navigation.navigate('PasswordRecovery');
                    }}
                >
                    <ForgotPasswordText>Esqueceu sua senha?</ForgotPasswordText>
                </ForgotPassword>

                <Button
                    onPress={() => {
                        formRef.current?.submitForm();
                    }}
                >
                    Entrar
                </Button>

                <SignUp
                    onPress={() => {
                        navigation.navigate('SignUp');
                    }}
                >
                    <SignUpText>
                        Ainda não possui uma conta? Crie-a agora
                    </SignUpText>
                </SignUp>
            </Container>
        </ScrollView>
    );
};

export default SignIn;
