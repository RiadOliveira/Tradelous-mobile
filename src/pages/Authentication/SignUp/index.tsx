import React, { useCallback, useRef, useState } from 'react';
import Input from '@components/Input';
import Button from '@components/Button';
import TestLogo from '@assets/logo/test-logo.png';
import Toast from 'react-native-toast-message';
import ErrorCatcher from '@errors/errorCatcher';
import api from '@services/api';
import * as yup from 'yup';

import {
    Container,
    LogoView,
    LogoImage,
    SwitchField,
    SwitchText,
} from './styles';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import { TextInput, Switch, Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '@hooks/auth';

const { width } = Dimensions.get('screen');

interface ISignUpData {
    email: string;
    password: string;
    name: string;
    confirmPassword: string;
}

const SignUp: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const emailInput = useRef<TextInput>(null);
    const passwordInput = useRef<TextInput>(null);
    const confirmPasswordInput = useRef<TextInput>(null);

    const navigation = useNavigation();

    const { signIn } = useAuth();

    const [switchValue, setSwitchValue] = useState(false);

    const handleSwitchChange = useCallback(() => {
        setSwitchValue(value => !value);
    }, []);

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

                await api.post('/user/signUp', {
                    ...data,
                    isAdmin: switchValue,
                });

                if (switchValue) {
                    navigation.navigate('RegisterCompany');
                } else {
                    Toast.show({
                        type: 'success',
                        text1: 'Cadastro realizado com sucesso!',
                        text2:
                            'Entre em uma empresa para gerenciar seu estoque.',
                    });
                }

                await signIn(data);
            } catch (err) {
                ErrorCatcher(err, formRef);
            }
        },
        [navigation, switchValue, signIn],
    );

    return (
        <Container>
            <ScrollView
                contentContainerStyle={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    width,
                }}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
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
                    />

                    <SwitchField>
                        <SwitchText>Dono da empresa?</SwitchText>
                        <Switch
                            value={switchValue}
                            onValueChange={() => {
                                handleSwitchChange();
                            }}
                            trackColor={{ false: '#767577', true: '#1c274e' }}
                            thumbColor={!switchValue ? '#FFFFFF' : '#3B8E44'}
                        />
                    </SwitchField>
                </Form>

                <Button onPress={() => formRef.current?.submitForm()}>
                    Criar conta
                </Button>
            </ScrollView>
        </Container>
    );
};

export default SignUp;
