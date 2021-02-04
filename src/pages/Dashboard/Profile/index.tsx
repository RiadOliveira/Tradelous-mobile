import React, { useCallback, useRef } from 'react';
import {
    Container,
    ProfileImage,
    SignOutButton,
    SignOutButtonText,
    ProfileImageContainer,
} from './styles';
import { ScrollView, TextInput } from 'react-native';
import { useAuth } from '../../../hooks/auth';
import Input from '../../../components/Input';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';

const Profile: React.FC = () => {
    const { signOut } = useAuth();
    const formRef = useRef<FormHandles>(null);
    const emailInput = useRef<TextInput>(null);
    const passwordInput = useRef<TextInput>(null);
    const confirmPasswordInput = useRef<TextInput>(null);

    const { user } = useAuth();

    const handleSubmit = useCallback(() => {}, []);

    return (
        <ScrollView
            contentContainerStyle={{ flex: 1 }}
            keyboardShouldPersistTaps="handled"
        >
            <Container>
                <SignOutButton
                    onPress={() => {
                        signOut();
                    }}
                >
                    <SignOutButtonText>Sair</SignOutButtonText>
                </SignOutButton>

                <ProfileImageContainer activeOpacity={0.5}>
                    <ProfileImage
                        source={{
                            uri:
                                'https://upload.wikimedia.org/wikipedia/en/2/21/Web_of_Spider-Man_Vol_1_129-1.png',
                        }}
                    />
                </ProfileImageContainer>

                <Form
                    ref={formRef}
                    onSubmit={handleSubmit}
                    initialData={{ name: user.name, email: user.email }}
                >
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
                        returnKeyType="next"
                        autoCapitalize="none"
                        textContentType="password"
                        secureTextEntry
                        name="confirmPassword"
                        placeholder="Confirmar senha"
                        icon="lock-outline"
                        ref={confirmPasswordInput}
                    />
                </Form>
            </Container>
        </ScrollView>
    );
};

export default Profile;
