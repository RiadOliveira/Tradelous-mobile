import React, { useCallback, useRef, useState } from 'react';
import {
    Container,
    Header,
    ProfileImage,
    HeaderButton,
    ImagePicker,
    ImageContainer,
    DeleteImageButton,
    ButtonsContainer,
} from './styles';
import { ScrollView, TextInput } from 'react-native';
import { useAuth } from '@hooks/auth';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import { launchImageLibrary } from 'react-native-image-picker/src';

import Input from '@components/Input';
import Button from '@components/Button';
import api from '@services/api';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as yup from 'yup';
import Modal from '@components/Modal';
import Toast from 'react-native-toast-message';
import ErrorCatcher from '@errors/errorCatcher';
import Clipboard from '@react-native-clipboard/clipboard';
import TextPicker from '@components/TextPicker';

interface IUpdateProfileData {
    name: string;
    email: string;
    oldPassword?: string;
    newPassword?: string;
    confirmPassword?: string;
}

const Profile: React.FC = () => {
    const { signOut, updateUser, updateUsersAvatar, user } = useAuth();
    const formRef = useRef<FormHandles>(null);
    const emailInput = useRef<TextInput>(null);
    const oldPasswordInput = useRef<TextInput>(null);
    const newPasswordInput = useRef<TextInput>(null);
    const confirmPasswordInput = useRef<TextInput>(null);

    const [modalProps, setModalProps] = useState({
        visibility: false,
    });

    const [textPickerVisibility, setTextPickerVisibility] = useState<{
        visibility: boolean;
    }>({
        visibility: false,
    });

    const [selectedImage, setSelectedImage] = useState(() =>
        user.avatar
            ? `${api.defaults.baseURL}/files/avatar/${user.avatar}`
            : '',
    );

    const handleSubmit = useCallback(
        async (userData: IUpdateProfileData) => {
            try {
                const schema = yup.object().shape({
                    name: yup.string().required('Nome obrigatório'),
                    email: yup
                        .string()
                        .required('E-mail obrigatório')
                        .email('Formato de e-mail incorreto'),
                    oldPassword: yup.string().optional(),
                    newPassword: yup.string().optional(),
                    confirmPassword: yup.string().when('newPassword', {
                        is: (value: string) => !!value,
                        then: yup
                            .string()
                            .required('Confirmação de senha obrigatória')
                            .oneOf(
                                [yup.ref('newPassword'), null],
                                'As senhas precisam ser iguais',
                            )
                            .min(6, 'Senha de, no mínimo, 6 caracteres'),
                        otherwise: yup.string(),
                    }),
                });

                await schema.validate(userData, {
                    abortEarly: false,
                });

                await updateUser(userData);

                if (userData.newPassword) {
                    formRef.current?.clearField('oldPassword');
                    formRef.current?.clearField('newPassword');
                    formRef.current?.clearField('confirmPassword');
                }

                Toast.show({
                    type: 'success',
                    text1: 'Atualização do perfil concluída!',
                });
            } catch (err) {
                ErrorCatcher(err as Error | yup.ValidationError, formRef);
            }
        },
        [updateUser],
    );

    const handleImageData = useCallback(
        async (handleMode: 'upload' | 'delete') => {
            if (handleMode == 'delete') {
                if (!selectedImage) {
                    Toast.show({
                        type: 'error',
                        text1: 'Operação indisponível.',
                    });
                } else {
                    try {
                        await updateUsersAvatar('');
                        setSelectedImage('');
                    } catch {
                        Toast.show({
                            type: 'error',
                            text1: 'Problema inesperado',
                            text2:
                                'Ocorreu algum problema na exclusão do avatar.',
                        });
                    }
                }
            } else {
                launchImageLibrary(
                    {
                        mediaType: 'photo',
                    },
                    async ({ fileName, uri, type, didCancel }) => {
                        if (!didCancel && uri && fileName && type) {
                            try {
                                await updateUsersAvatar(uri);
                                setSelectedImage(uri);

                                Toast.show({
                                    type: 'success',
                                    text1: 'Avatar atualizado com sucesso!',
                                });
                            } catch {
                                Toast.show({
                                    type: 'error',
                                    text1: 'Falha na atualização do avatar.',
                                });
                            }
                        }
                    },
                );
            }
        },
        [updateUsersAvatar, selectedImage],
    );

    const handleCopyId = useCallback(() => {
        Clipboard.setString(user.id);

        Toast.show({
            type: 'info',
            text1: 'ID copiado para área de transferência.',
        });
    }, [user.id]);

    const handleDeleteAccount = useCallback(
        async (verifyPassword: string) => {
            try {
                await api.post('/user/sessions', {
                    email: user.email,
                    password: verifyPassword,
                }); //In order to verify user's password to delete account.

                await api.delete('/user/');

                Toast.show({
                    type: 'success',
                    text1: 'Conta excluída com sucesso!',
                });

                signOut();
            } catch {
                Toast.show({
                    type: 'error',
                    text1: 'Problema inesperado',
                    text2: 'Ocorreu um erro ao excluir sua conta.',
                });
            }
        },
        [user.email, signOut],
    );

    return (
        <>
            <Modal
                actionFunction={() => handleImageData('delete')}
                setVisibility={setModalProps}
                isVisible={modalProps.visibility}
                text={{
                    info: 'Tem certeza que deseja deletar seu avatar?',
                    firstButton: 'Sim',
                    secondButton: 'Não',
                }}
                iconName="delete"
            />

            <TextPicker
                isVisible={textPickerVisibility.visibility}
                text={{
                    info: 'Insira sua senha para confirmar a exclusão',
                    buttonText: 'Confirmar',
                }}
                inputProps={{
                    hasPasteButton: false,
                    placeholder: 'Senha',
                    isSecureText: true,
                }}
                iconName="delete"
                willUnmount={true}
                setVisibility={setTextPickerVisibility}
                actionFunction={(verifyPassword: string) =>
                    handleDeleteAccount(verifyPassword)
                }
            />

            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                <Container>
                    <Header>
                        <HeaderButton
                            style={{ borderBottomLeftRadius: 0 }}
                            activeOpacity={0.7}
                            onPress={handleCopyId}
                        >
                            <Icon name="content-copy" size={34} color="#fff" />
                        </HeaderButton>

                        <HeaderButton
                            style={{ borderBottomRightRadius: 0 }}
                            activeOpacity={0.7}
                            onPress={signOut}
                        >
                            <Icon name="logout" size={34} color="#fff" />
                        </HeaderButton>
                    </Header>

                    <ImageContainer>
                        <ImagePicker
                            onPress={() => handleImageData('upload')}
                            activeOpacity={0.7}
                            selectedImage={selectedImage}
                        >
                            {selectedImage ? (
                                <ProfileImage
                                    source={{
                                        uri: selectedImage,
                                    }}
                                />
                            ) : (
                                <Icon
                                    name="person"
                                    size={170}
                                    color="#1c274e"
                                />
                            )}
                        </ImagePicker>

                        <DeleteImageButton
                            onPress={() => setModalProps({ visibility: true })}
                        >
                            <Icon name="clear" size={48} color="#e7e7e7" />
                        </DeleteImageButton>
                    </ImageContainer>

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
                            onSubmitEditing={() =>
                                oldPasswordInput.current?.focus()
                            }
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
                            onSubmitEditing={() =>
                                newPasswordInput.current?.focus()
                            }
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
                            onSubmitEditing={() =>
                                formRef.current?.submitForm()
                            }
                        />
                    </Form>

                    <ButtonsContainer>
                        <Button onPress={() => formRef.current?.submitForm()}>
                            Atualizar Conta
                        </Button>

                        <Button
                            style={{ backgroundColor: '#c93c3c' }}
                            onPress={() =>
                                setTextPickerVisibility({ visibility: true })
                            }
                        >
                            Deletar{'\n'}Conta
                        </Button>
                    </ButtonsContainer>
                </Container>
            </ScrollView>
        </>
    );
};

export default Profile;
