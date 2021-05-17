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

import Input from '../../../components/Input';
import Button from '../../../components/Button';
import TestLogo from '../../../../assets/Logo/Test-logo.png';
import getValidationErrors from '../../../utils/getValidationErrors';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../../hooks/auth';
import { TextInput, Dimensions, Alert } from 'react-native';

import * as yup from 'yup';

const { height } = Dimensions.get('screen');

interface SignInFormData {
    email: string;
    password: string;
}

const SignIn: React.FC = () => {
    const navigation = useNavigation();
    const { signIn } = useAuth();

    const formRef = useRef<FormHandles>(null);
    const passwordInput = useRef<TextInput>(null);

    const handleSubmit = useCallback(
        async (data: SignInFormData) => {
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
                if (err instanceof yup.ValidationError) {
                    const validationErrors = getValidationErrors(err);

                    const validationKeys = Object.keys(validationErrors);

                    formRef.current?.setErrors(validationErrors);

                    Alert.alert(
                        'Problema na validação',
                        `${validationErrors[validationKeys[0]]}.`,
                    );

                    return;
                }

                Alert.alert(
                    'Problema inesperado',
                    'Ocorreu algum problema, por favor, tente logar-se novamente.',
                );
            }
        },
        [signIn],
    );

    return (
        <ScrollView
            contentContainerStyle={{ flex: 1 }}
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
                    activeOpacity={0.5}
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
                    activeOpacity={0.5}
                >
                    <SignUpText>
                        Ainda não possui uma conta? Crie-a agora!
                    </SignUpText>
                </SignUp>
            </Container>
        </ScrollView>
    );
};

export default SignIn;
