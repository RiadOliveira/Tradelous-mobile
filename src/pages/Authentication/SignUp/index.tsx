import React, { useCallback, useRef } from 'react';
import Input from '@components/Input';
import Button from '@components/Button';
import TestLogo from '@assets/logo/test-logo.png';
import Toast from 'react-native-toast-message';
import ErrorCatcher from '@errors/errorCatcher';
import api from '@services/api';
import * as yup from 'yup';

import { Container, LogoView, LogoImage } from './styles';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import { TextInput } from 'react-native';
import { useAuth } from '@hooks/auth';

interface ISignUpData {
    email: string;
    password: string;
    name: string;
    confirmPassword: string;
}

const SignUp: React.FC = () => {
    const { signIn } = useAuth();

    const formRef = useRef<FormHandles>(null);
    const emailInput = useRef<TextInput>(null);
    const passwordInput = useRef<TextInput>(null);
    const confirmPasswordInput = useRef<TextInput>(null);

    const handleSubmit = useCallback(
        async (data: ISignUpData) => {
            try {
                const schema = yup.object().shape({
                    name: yup.string().required('Nome obrigatório'),
                    email: yup
                        .string()
                        .required('E-mail obrigatório')
                        .email('Formato de e-mail incorreto'),
                    password: yup
                        .string()
                        .required('Senha obrigatória')
                        .min(6, 'Senha de no mínimo 6 caracteres'),
                    confirmPassword: yup
                        .string()
                        .required('Confirmação de senha obrigatória')
                        .oneOf(
                            [yup.ref('password')],
                            'As senhas inseridas não são iguais',
                        ),
                });

                await schema.validate(data, {
                    abortEarly: false,
                });

                await api.post('/user/sign-up', data);

                await signIn({
                    email: data.email,
                    password: data.password,
                });

                Toast.show({
                    type: 'success',
                    text1: 'Cadastro realizado com sucesso!',
                    text2: `Agora só falta se associar a uma empresa.`,
                });
            } catch (err) {
                console.log(err);
                ErrorCatcher(err as Error | yup.ValidationError, formRef);
            }
        },
        [signIn],
    );

    return (
        <Container>
            <LogoView>
                <LogoImage source={TestLogo} />
            </LogoView>

            <Form ref={formRef} onSubmit={handleSubmit}>
                <Input
                    autoCorrect={false}
                    textContentType="username"
                    autoCapitalize="words"
                    name="name"
                    placeholder="Nome"
                    icon="person-outline"
                    onSubmitEditing={() => emailInput.current?.focus()}
                    returnKeyType="next"
                />

                <Input
                    autoCorrect={false}
                    textContentType="emailAddress"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    ref={emailInput}
                    name="email"
                    placeholder="E-mail"
                    icon="mail-outline"
                    onSubmitEditing={() => passwordInput.current?.focus()}
                    returnKeyType="next"
                />

                <Input
                    returnKeyType="next"
                    autoCapitalize="none"
                    textContentType="password"
                    secureTextEntry
                    name="password"
                    placeholder="Senha"
                    icon="lock-outline"
                    ref={passwordInput}
                    onSubmitEditing={() =>
                        confirmPasswordInput.current?.focus()
                    }
                />

                <Input
                    returnKeyType="next"
                    autoCapitalize="none"
                    textContentType="password"
                    secureTextEntry
                    name="confirmPassword"
                    placeholder="Confirmar senha"
                    icon="lock-outline"
                    ref={confirmPasswordInput}
                    onSubmitEditing={() => formRef.current?.submitForm()}
                />
            </Form>

            <Button
                style={{ marginTop: 35 }}
                onPress={() => formRef.current?.submitForm()}
            >
                Criar conta
            </Button>
        </Container>
    );
};

export default SignUp;
