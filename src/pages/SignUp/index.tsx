import React, { useCallback, useRef, useState } from 'react';
import {
    Container,
    LogoView,
    LogoImage,
    SwitchField,
    SwitchText,
} from './styles';
import Input from '../../components/Input';
import Button from '../../components/Button';
import TestLogo from '../../../assets/Logo/Test-logo.png';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import { TextInput, Switch, Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('screen');

const SignUp: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const emailInput = useRef<TextInput>(null);
    const passwordInput = useRef<TextInput>(null);
    const confirmPasswordInput = useRef<TextInput>(null);

    const navigation = useNavigation();

    const [switchValue, setSwitchValue] = useState(false);

    const handleSwitchChange = useCallback(() => {
        setSwitchValue(value => !value);
    }, []);

    const handleSubmit = useCallback(
        data => {
            console.log(data);

            if (switchValue) {
                navigation.navigate('SignUpCompany');
            }

            //navigation.navigate('Dashboard');
        },
        [navigation, switchValue],
    );

    return (
        <Container>
            <ScrollView
                contentContainerStyle={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    width,
                    paddingBottom: 20,
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
                        onSubmitEditing={() => {
                            emailInput.current?.focus();
                        }}
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
                        onSubmitEditing={() => {
                            passwordInput.current?.focus();
                        }}
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
                        onSubmitEditing={() => {
                            confirmPasswordInput.current?.focus();
                        }}
                    />

                    <Input
                        returnKeyType="send"
                        autoCapitalize="none"
                        textContentType="password"
                        secureTextEntry
                        name="passwordConfirm"
                        placeholder="Confirmar senha"
                        icon="lock-outline"
                        ref={confirmPasswordInput}
                        onSubmitEditing={() => {
                            formRef.current?.submitForm();
                        }}
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

                <Button
                    onPress={() => {
                        formRef.current?.submitForm();
                    }}
                >
                    Criar conta
                </Button>
            </ScrollView>
        </Container>
    );
};

export default SignUp;
