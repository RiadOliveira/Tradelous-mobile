import React, { useCallback, useRef, useState } from 'react';
import {
    Container,
    LogoView,
    LogoImage,
    RecoverPasswordButton,
    RecoverPasswordText,
} from './styles';
import Input from '@components/Input';
import Button from '@components/Button';
import TestLogo from '@assets/logo/test-logo.png';
import api from '@services/api';
import Toast from 'react-native-toast-message';
import ErrorCatcher from '@errors/errorCatcher';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingIndicator from '@components/LoadingIndicator';
import * as yup from 'yup';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import { Text } from 'react-native';
import { useNavigation } from '@react-navigation/core';

const ForgotPassword: React.FC = () => {
    const navigation = useNavigation();

    const formRef = useRef<FormHandles>(null);
    const [isLoadingSending, setIsLoadingSending] = useState(false);

    const handleSubmit = useCallback(async (data: { email: string }) => {
        try {
            const schema = yup.object().shape({
                email: yup
                    .string()
                    .required('E-mail obrigatório')
                    .email('Formato de e-mail incorreto'),
            });

            await schema.validate(data, {
                abortEarly: false,
            });
            setIsLoadingSending(true);

            await api.post('/user/forgot-password', data);
            await AsyncStorage.setItem('@Tradelous-user', data.email);

            setIsLoadingSending(false);
            formRef.current?.clearField('email');

            Toast.show({
                type: 'success',
                text1: 'Mensagem de recuperação enviada',
                text2: 'O e-mail com o token de recuperação foi enviado.',
            });
        } catch (err) {
            ErrorCatcher(err as Error | yup.ValidationError, formRef);
        }
    }, []);

    return (
        <Container>
            {isLoadingSending && <LoadingIndicator />}

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
                    placeholder="E-mail de recuperação"
                    icon="mail-outline"
                    onSubmitEditing={() => formRef.current?.submitForm()}
                    returnKeyType="send"
                />
            </Form>

            <Button smallerText onPress={() => formRef.current?.submitForm()}>
                <Text>Enviar</Text>
            </Button>

            <RecoverPasswordButton
                onPress={() => navigation.navigate('RecoverPassword')}
                activeOpacity={0.5}
            >
                <RecoverPasswordText>
                    Já possui o código de recuperação?
                </RecoverPasswordText>
            </RecoverPasswordButton>
        </Container>
    );
};

export default ForgotPassword;
