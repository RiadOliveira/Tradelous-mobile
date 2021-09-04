import React, { useCallback, useRef, useState } from 'react';
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

interface IRecoverPassword {
    token: string;
    email: string;
    newPassword: string;
}

const RecoverPassword: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const emailInput = useRef<TextInput>(null);
    const newPasswordInput = useRef<TextInput>(null);

    const [tokenInputText, setTokenInputText] = useState('');

    const handleSubmit = useCallback(async (recoverData: IRecoverPassword) => {
        try {
            const schema = yup.object().shape({
                token: yup.string().required('Token obrigatório'),
                email: yup
                    .string()
                    .required('E-mail obrigatório')
                    .email('Formato de e-mail incorreto'),
                newPassword: yup.string().required(),
            });

            await schema.validate(recoverData, {
                abortEarly: false,
            });

            await api.post('/users/recover-password', recoverData);

            Toast.show({
                type: 'success',
                text1: 'Atualização do perfil concluída!',
            });
        } catch (err) {
            ErrorCatcher(err as Error | yup.ValidationError, formRef);
        }
    }, []);

    return (
        <Container>
            <LogoView>
                <LogoImage source={TestLogo} />
            </LogoView>

            <Form
                ref={formRef}
                onSubmit={handleSubmit}
                //initialData={{ email }}
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
                        <Icon name="content-paste" color="#fff" size={24} />
                    </PasteButton>
                </TokenInputContainer>

                <Input
                    autoCorrect={false}
                    textContentType="emailAddress"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    ref={emailInput}
                    name="email"
                    placeholder="E-mail"
                    icon="mail-outline"
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
                    onSubmitEditing={() => formRef.current?.submitForm()}
                />
            </Form>

            <Button biggerText onPress={() => formRef.current?.submitForm()}>
                Alterar senha
            </Button>
        </Container>
    );
};

export default RecoverPassword;
