import React, { useCallback, useRef } from 'react';
import { Container, LogoView, LogoImage } from './styles';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import TestLogo from '../../../../assets/Logo/Test-logo.png';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import { ScrollView } from 'react-native-gesture-handler';
import { Text, Dimensions } from 'react-native';

const { height } = Dimensions.get('screen');

const PasswordRecovery: React.FC = () => {
    const formRef = useRef<FormHandles>(null);

    const handleSubmit = useCallback(data => {
        console.log(data);
    }, []);

    return (
        <ScrollView
            contentContainerStyle={{ flex: 1 }}
            keyboardShouldPersistTaps="handled"
        >
            <Container>
                <LogoView style={{ top: height / 10 }}>
                    <LogoImage source={TestLogo} />
                </LogoView>

                <Form ref={formRef} onSubmit={handleSubmit}>
                    <Input
                        autoCorrect={false}
                        textContentType="emailAddress"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        name="recoverEmail"
                        placeholder="E-mail de recuperação"
                        icon="mail-outline"
                        onSubmitEditing={() => {
                            formRef.current?.submitForm();
                        }}
                        returnKeyType="send"
                    />
                </Form>

                <Button
                    biggerText={true}
                    onPress={() => {
                        formRef.current?.submitForm();
                    }}
                >
                    <Text
                        style={{
                            fontSize: 13,
                        }}
                    >
                        Recuperar senha
                    </Text>
                </Button>
            </Container>
        </ScrollView>
    );
};

export default PasswordRecovery;
