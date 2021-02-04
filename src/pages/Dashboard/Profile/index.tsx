import React, { useCallback, useRef, useState } from 'react';
import {
    Container,
    ProfileImage,
    SignOutButton,
    SignOutButtonText,
    ImagePicker,
} from './styles';
import { Dimensions, ScrollView, TextInput } from 'react-native';
import { useAuth } from '../../../hooks/auth';
import Input from '../../../components/Input';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import Button from '../../../components/Button';
import api from '../../../services/api';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { launchImageLibrary } from 'react-native-image-picker/src';

const { width } = Dimensions.get('screen');

interface UpdateProfileData {
    name: string;
    email: string;
    password?: string;
    confirmPassword?: string;
}

interface ImageData {
    name: string;
    type: string;
    uri: string;
}

const Profile: React.FC = () => {
    const { signOut } = useAuth();
    const formRef = useRef<FormHandles>(null);
    const emailInput = useRef<TextInput>(null);
    const oldPasswordInput = useRef<TextInput>(null);
    const newPasswordInput = useRef<TextInput>(null);
    const confirmPasswordInput = useRef<TextInput>(null);

    const [selectedImage, setSelectedImage] = useState<ImageData>(
        {} as ImageData,
    );

    const { user } = useAuth();

    const handleSubmit = useCallback(async (data: UpdateProfileData) => {
        await api.patch('/user/update', data); //Need to be created on API
    }, []);

    const handleUploadImage = useCallback(() => {
        launchImageLibrary(
            {
                mediaType: 'photo',
            },
            ({ fileName, uri, type, didCancel }) => {
                if (!didCancel && uri && fileName && type) {
                    setSelectedImage({
                        name: fileName,
                        type,
                        uri,
                    });
                }
            },
        );
    }, []);

    return (
        <ScrollView
            contentContainerStyle={{
                width,
            }}
            showsVerticalScrollIndicator={false}
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

                <ImagePicker
                    onPress={handleUploadImage}
                    activeOpacity={0.5}
                    selectedImage={selectedImage.uri}
                >
                    {selectedImage.uri ? (
                        <ProfileImage
                            source={{
                                uri: selectedImage.uri,
                            }}
                        />
                    ) : (
                        <Icon name="person" size={170} color="#1c274e" />
                    )}
                </ImagePicker>

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
                            oldPasswordInput.current?.focus();
                        }}
                        returnKeyType="next"
                    />

                    <Input
                        returnKeyType="next"
                        autoCapitalize="none"
                        textContentType="password"
                        secureTextEntry
                        name="oldPassword"
                        placeholder="Senha antiga"
                        icon="lock-outline"
                        ref={oldPasswordInput}
                        onSubmitEditing={() => {
                            newPasswordInput.current?.focus();
                        }}
                    />

                    <Input
                        returnKeyType="next"
                        autoCapitalize="none"
                        textContentType="password"
                        secureTextEntry
                        name="newPassword"
                        placeholder="Nova senha"
                        icon="lock-outline"
                        ref={newPasswordInput}
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
                        onSubmitEditing={() => {
                            formRef.current?.submitForm();
                        }}
                    />
                </Form>

                <Button
                    biggerText
                    onPress={() => {
                        formRef.current?.submitForm();
                    }}
                >
                    Atualizar dados
                </Button>
            </Container>
        </ScrollView>
    );
};

export default Profile;
