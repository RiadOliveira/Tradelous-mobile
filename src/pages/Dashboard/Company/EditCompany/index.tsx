import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import {
    Container,
    CompanyLogo,
    ImagePicker,
    ImageContainer,
    DeleteImageButton,
    PickerView,
    PickerText,
    ButtonsContainer,
} from './styles';
import { ScrollView, TextInput } from 'react-native';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import { launchImageLibrary } from 'react-native-image-picker/src';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';

import * as yup from 'yup';
import Button from '@components/Button';
import api from '@services/api';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Input from '@components/Input';
import Modal from '@components/Modal';
import Toast from 'react-native-toast-message';
import ErrorCatcher from '@errors/errorCatcher';
import TextPicker from '@components/TextPicker';
import { useAuth } from '@hooks/auth';

interface IBrazilianState {
    nome: string;
    sigla: string;
}

interface ICompany {
    id: string;
    name: string;
    cnpj: string;
    address: string;
    logo?: string;
}

const EditCompany: React.FC = () => {
    const {
        user: { email },
        setUserCompany,
    } = useAuth();

    const navigation = useNavigation();
    const company = useRoute().params as ICompany;

    const formRef = useRef<FormHandles>(null);
    const cnpjInput = useRef<TextInput>(null);
    const cityInput = useRef<TextInput>(null);

    const [modalVisibility, setModalVisibility] = useState<{
        visibility: boolean;
    }>({
        visibility: false,
    });

    const [textPickerVisibility, setTextPickerVisibility] = useState<{
        visibility: boolean;
    }>({
        visibility: false,
    });

    const [selectedImage, setSelectedImage] = useState<string | null>(() =>
        company.logo ? company.logo : null,
    );
    const [selectedState, setSelectedState] = useState(
        company.address.split('/')[1],
    );

    const [allStates, setAllStates] = useState<IBrazilianState[]>([]);

    useEffect(() => {
        api.get<IBrazilianState[]>(
            'https://servicodados.ibge.gov.br/api/v1/localidades/estados',
            {
                baseURL: '',
            },
        ).then(response => {
            setAllStates(() =>
                response.data.map(state => {
                    return { nome: state.nome, sigla: state.sigla };
                }),
            );
        });
    }, []);

    const formattedStatesList = useMemo(
        () =>
            allStates.sort((a, b) =>
                a.sigla > b.sigla ? 1 : b.sigla > a.sigla ? -1 : 0,
            ),
        [allStates],
    );

    const handleSubmit = useCallback(
        async (companyData: ICompany) => {
            try {
                const schema = yup.object().shape({
                    name: yup.string().required('Nome da empresa obrigatório'),
                    cnpj: yup
                        .string()
                        .required('CNPJ obrigatório')
                        .min(14, 'O tamanho mínimo do cnpj é de 14 dígitos'),
                    address: yup
                        .string()
                        .required('Cidade da empresa obrigatório'),
                });

                await schema.validate(companyData, {
                    abortEarly: false,
                });

                if (
                    companyData.cnpj.includes('.') ||
                    companyData.cnpj.includes('-')
                ) {
                    throw new yup.ValidationError('Formato de cnpj inválido');
                }

                companyData.address += `/${selectedState}`;

                await api.put('/company/', companyData);

                Toast.show({
                    type: 'success',
                    text1: 'Atualização da empresa concluída!',
                });
            } catch (err) {
                ErrorCatcher(err as Error | yup.ValidationError, formRef);
            }
        },
        [selectedState],
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
                        await api.patch('/company/updateLogo');
                        setSelectedImage(null);

                        Toast.show({
                            type: 'success',
                            text1: 'Logo excluída com sucesso!',
                        });
                    } catch {
                        Toast.show({
                            type: 'error',
                            text1: 'Problema inesperado',
                            text2:
                                'Ocorreu algum problema na exclusão da logo.',
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
                                const data = new FormData();

                                data.append('logo', {
                                    name: `${company.id}`,
                                    type: 'image/jpeg',
                                    uri,
                                });

                                const response = await api.patch(
                                    '/company/updateLogo',
                                    data,
                                );

                                setSelectedImage(response.data.logo);

                                Toast.show({
                                    type: 'success',
                                    text1: 'Logo atualizada com sucesso!',
                                });
                            } catch {
                                Toast.show({
                                    type: 'error',
                                    text1: 'Falha na atualização da logo.',
                                });
                            }
                        }
                    },
                );
            }
        },
        [selectedImage, company.id],
    );

    const handleDeleteCompany = useCallback(
        async (verifyPassword: string) => {
            try {
                await api.post('/user/sessions', {
                    email,
                    password: verifyPassword,
                }); //In order to verify user's password to delete company.

                await api.delete('/company');

                Toast.show({
                    type: 'success',
                    text1: 'Empresa excluída com sucesso!',
                });

                setUserCompany(false);
            } catch {
                Toast.show({
                    type: 'error',
                    text1: 'Problema inesperado',
                    text2: 'Ocorreu um erro ao excluir a empresa.',
                });
            }
        },
        [setUserCompany, email],
    );

    useEffect(() => {
        navigation.addListener('blur', () => {
            const updatedCompany = JSON.stringify({
                ...formRef.current?.getData(),
                // eslint-disable-next-line react-hooks/exhaustive-deps
                address: `${formRef.current?.getFieldValue(
                    'address',
                )}/${selectedState}`,
                logo: selectedImage || null,
            });

            const comparsionCompany = JSON.stringify({
                name: company.name,
                cnpj: company.cnpj,
                address: company.address,
                logo: company.logo,
            });

            if (comparsionCompany !== updatedCompany) {
                navigation.navigate('CompanySummary', {
                    updatedAt: Date.now(),
                });
            }
        });
    }, [selectedImage, company, navigation, selectedState]);

    return (
        <>
            <Modal
                actionFunction={() => handleImageData('delete')}
                setVisibility={setModalVisibility}
                isVisible={modalVisibility.visibility}
                text={{
                    info: 'Tem certeza que deseja deletar a imagem da empresa?',
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
                    handleDeleteCompany(verifyPassword)
                }
            />

            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                <Container>
                    <ImageContainer>
                        <ImagePicker
                            onPress={() => handleImageData('upload')}
                            activeOpacity={0.7}
                            selectedImage={selectedImage || ''}
                        >
                            {selectedImage ? (
                                <CompanyLogo
                                    source={{
                                        uri: `${api.defaults.baseURL}/files/logo/${selectedImage}`,
                                    }}
                                />
                            ) : (
                                <Icon
                                    name="business"
                                    size={140}
                                    color="#1c274e"
                                />
                            )}
                        </ImagePicker>

                        <DeleteImageButton
                            onPress={() =>
                                setModalVisibility({ visibility: true })
                            }
                        >
                            <Icon name="clear" size={48} color="#e7e7e7" />
                        </DeleteImageButton>
                    </ImageContainer>

                    <Form
                        ref={formRef}
                        onSubmit={handleSubmit}
                        initialData={{
                            ...company,
                            address: company.address.split('/')[0],
                        }}
                    >
                        <Input
                            autoCorrect={false}
                            textContentType="organizationName"
                            autoCapitalize="words"
                            name="name"
                            placeholder="Nome da empresa"
                            icon="business"
                            onSubmitEditing={() => cnpjInput.current?.focus()}
                            returnKeyType="next"
                        />

                        <Input
                            keyboardType="numeric"
                            ref={cnpjInput}
                            maxLength={14}
                            name="cnpj"
                            placeholder="CNPJ (Somente números)"
                            icon="location-city"
                            onSubmitEditing={() => cityInput.current?.focus()}
                            returnKeyType="next"
                        />

                        <Input
                            autoCorrect={false}
                            textContentType="addressCity"
                            autoCapitalize="words"
                            ref={cityInput}
                            name="address"
                            placeholder="Cidade"
                            icon="location-city"
                            returnKeyType="next"
                        />

                        <PickerView>
                            <PickerText>Selecione o Estado:</PickerText>
                            <Picker
                                selectedValue={selectedState}
                                style={{
                                    height: 50,
                                    width: '35%',
                                }}
                                onValueChange={itemValue =>
                                    setSelectedState(String(itemValue))
                                }
                            >
                                {formattedStatesList.map(state => (
                                    <Picker.Item
                                        key={state.nome}
                                        label={state.sigla}
                                        value={state.sigla}
                                    />
                                ))}
                            </Picker>
                        </PickerView>
                    </Form>

                    <ButtonsContainer>
                        <Button
                            biggerText
                            onPress={() => formRef.current?.submitForm()}
                        >
                            Atualizar Empresa
                        </Button>

                        <Button
                            biggerText
                            style={{ backgroundColor: '#c93c3c' }}
                            onPress={() =>
                                setTextPickerVisibility({ visibility: true })
                            }
                        >
                            Deletar Empresa
                        </Button>
                    </ButtonsContainer>
                </Container>
            </ScrollView>
        </>
    );
};

export default EditCompany;
