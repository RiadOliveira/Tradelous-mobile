import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
    Container,
    LogoImage,
    LogoView,
    TokenInputContainer,
    TokenInput,
    PasteButton,
} from './styles';
import { TextInput } from 'react-native';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';

import Icon from 'react-native-vector-icons/MaterialIcons';
import TestLogo from '@assets/logo/test-logo.png';
import Input from '@components/Input';
import Button from '@components/Button';
import api from '@services/api';
import * as yup from 'yup';
import Toast from 'react-native-toast-message';
import ErrorCatcher from '@errors/errorCatcher';
import Clipboard from '@react-native-clipboard/clipboard';
import { useNavigation } from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface IRecoverPassword {
    recoverToken: string;
    confirmEmail: string;
    newPassword: string;
    confirmPassword: string;
}

const RecoverPassword: React.FC = () => {
    const navigation = useNavigation();

    const formRef = useRef<FormHandles>(null);
    const emailInput = useRef<TextInput>(null);
    const newPasswordInput = useRef<TextInput>(null);
    const confirmPasswordInput = useRef<TextInput>(null);

    const [tokenInputText, setTokenInputText] = useState('');

    const [userEmail, setUserEmail] = useState('');

    useEffect(() => {
        AsyncStorage.getItem('@Tradelous-user').then(response => {
            if (response) {
                setUserEmail(response);
            } else {
                navigation.goBack();

                Toast.show({
                    type: 'error',
                    text1: 'Token necessário!',
                    text2: 'Primeiro faça a requisição do token',
                });
            }
        });
    }, [navigation]);

    const handleSubmit = useCallback(
        async (recoverData: IRecoverPassword) => {
            try {
                recoverData.recoverToken = tokenInputText;

                const schema = yup.object().shape({
                    recoverToken: yup.string().required('Token obrigatório'),
                    confirmEmail: yup
                        .string()
                        .required('E-mail obrigatório')
                        .email('Formato de e-mail incorreto'),
                    newPassword: yup
                        .string()
                        .required('Senha obrigatória')
                        .min(6, 'Senha de no mínimo 6 caracteres'),
                    confirmPassword: yup
                        .string()
                        .required('Confirmação de senha obrigatória')
                        .oneOf(
                            [yup.ref('newPassword')],
                            'As senhas inseridas não são iguais',
                        ),
                });

                await schema.validate(recoverData, {
                    abortEarly: false,
                });

                await api.post('/user/recover-password', recoverData);

                await AsyncStorage.removeItem('@Tradelous-user');

                Toast.show({
                    type: 'success',
                    text1: 'Senha atualizada com sucesso!',
                    text2: 'Agora só basta fazer login com sua nova senha',
                });

                navigation.navigate('SignIn');
            } catch (err) {
                ErrorCatcher(err as Error | yup.ValidationError, formRef);
            }
        },
        [tokenInputText, navigation],
    );

    return (
        <Container>
            <LogoView>
                <LogoImage source={TestLogo} />
            </LogoView>

            <Form
                ref={formRef}
                onSubmit={handleSubmit}
                initialData={{ confirmEmail: userEmail }}
            >
                <TokenInputContainer>
                    <TokenInput
                        autoCapitalize="none"
                        autoCorrect={false}
                        selectionColor="#000000"
                        placeholder="Token de recuperação"
                        value={tokenInputText}
                        onChangeText={text => setTokenInputText(text)}
                        onSubmitEditing={() => emailInput.current?.focus()}
                        returnKeyType="next"
                    />

                    <PasteButton
                        activeOpacity={0.75}
                        onPress={() =>
                            Clipboard.getString().then(response =>
                                setTokenInputText(response),
                            )
                        }
                    >
                        <Icon name="content-paste" color="#fff" size={30} />
                    </PasteButton>
                </TokenInputContainer>

                <Input
                    autoCorrect={false}
                    textContentType="emailAddress"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    ref={emailInput}
                    name="confirmEmail"
                    placeholder="E-mail"
                    icon="mail-outline"
                    editable={false}
                    onSubmitEditing={() => newPasswordInput.current?.focus()}
                    returnKeyType="next"
                />

                <Input
                    returnKeyType="next"
                    autoCapitalize="none"
                    textContentType="newPassword"
                    secureTextEntry
                    name="newPassword"
                    placeholder="Nova senha"
                    icon="lock-outline"
                    ref={newPasswordInput}
                    onSubmitEditing={() =>
                        confirmPasswordInput.current?.focus()
                    }
                />

                <Input
                    returnKeyType="next"
                    autoCapitalize="none"
                    textContentType="newPassword"
                    secureTextEntry
                    name="confirmPassword"
                    placeholder="Confirmar senha"
                    icon="lock-outline"
                    ref={confirmPasswordInput}
                    onSubmitEditing={() => formRef.current?.submitForm()}
                />
            </Form>

            <Button onPress={() => formRef.current?.submitForm()}>
                Alterar senha
            </Button>
        </Container>
    );
};

export default RecoverPassword;
