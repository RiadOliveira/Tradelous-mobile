import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import {
    Container,
    LogoView,
    LogoImage,
    PickerView,
    PickerText,
    ImageContainer,
    ImagePicker,
    DeleteImageButton,
    ImageHighlight,
} from './styles';
import Input from '@components/Input';
import Button from '@components/Button';
import TestLogo from '@assets/logo/test-logo.png';
import api from '@services/api';
import Icon from 'react-native-vector-icons/MaterialIcons';
import getValidationErrors from '@utils/getValidationErrors';
import Toast from 'react-native-toast-message';
import * as yup from 'yup';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import { TextInput, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Picker } from '@react-native-picker/picker';
import { launchImageLibrary } from 'react-native-image-picker/src';
import { useAuth } from '@hooks/auth';

interface IBrazilianState {
    nome: string;
    sigla: string;
}

interface ICompanyData {
    companyName: string;
    cnpj: string;
    companyCity: string;
}

interface IImageData {
    name: string;
    type: string;
    uri: string;
}

const RegisterCompany: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const cnpjInput = useRef<TextInput>(null);
    const cityInput = useRef<TextInput>(null);

    const { user, setUserCompany } = useAuth();

    const [selectedImage, setSelectedImage] = useState<IImageData>(
        {} as IImageData,
    );

    const [selectedState, setSelectedState] = useState('');
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

    const handleSubmit = useCallback(
        async (data: ICompanyData) => {
            try {
                const schema = yup.object().shape({
                    companyName: yup
                        .string()
                        .required('Nome da empresa obrigatório'),
                    companyCity: yup
                        .string()
                        .required('Cidade da empresa obrigatório'),
                    cnpj: yup
                        .string()
                        .required('CNPJ obrigatório')
                        .min(14, 'O tamanho mínimo do cnpj é de 14 dígitos'),
                });

                await schema.validate(data, {
                    abortEarly: false,
                });

                if (data.cnpj.includes('.') || data.cnpj.includes('-')) {
                    throw new yup.ValidationError('Formato de cnpj inválido');
                }

                const companyData = new FormData();

                companyData.append('name', data.companyName);
                companyData.append(
                    'adress',
                    `${data.companyCity}/${selectedState}`,
                );
                companyData.append('cnpj', Number(data.cnpj));
                companyData.append('adminID', user.id);

                if (selectedImage.uri) {
                    companyData.append('logo', {
                        uri: selectedImage.uri,
                        name: `${data.companyName}-${user.id}`,
                        type: selectedImage.type,
                    });
                }

                const response = await api.post('/company/', companyData);

                Toast.show({
                    type: 'success',
                    text1: 'Empresa cadastrada com sucesso!',
                });

                setUserCompany(response.data.id);
            } catch (err) {
                if (err instanceof yup.ValidationError) {
                    const validationErrors = getValidationErrors(err);

                    const validationKeys = Object.keys(validationErrors);

                    formRef.current?.setErrors(validationErrors);

                    if (validationKeys.length > 0) {
                        Toast.show({
                            type: 'error',
                            text1: 'Problema na validação',
                            text2: `${validationErrors[validationKeys[0]]}.`,
                        });
                    } else {
                        Toast.show({
                            type: 'error',
                            text1: 'Problema na validação',
                            text2: `${err.errors[0]}.`,
                        });
                    }

                    return;
                }

                Toast.show({
                    type: 'error',
                    text1: 'Problema inesperado',
                    text2: 'Ocorreu alguma falha, por favor, tente novamente.',
                });
            }
        },
        [selectedState, user, selectedImage, setUserCompany],
    );

    return (
        <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
        >
            <Container>
                <LogoView>
                    <LogoImage source={TestLogo} />
                </LogoView>

                <Form
                    style={{
                        alignItems: 'center',
                    }}
                    ref={formRef}
                    onSubmit={handleSubmit}
                >
                    <Input
                        autoCorrect={false}
                        textContentType="organizationName"
                        autoCapitalize="words"
                        name="companyName"
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
                        name="companyCity"
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
                                width: '36%',
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

                    <ImageContainer>
                        <ImagePicker
                            onPress={handleUploadImage}
                            activeOpacity={0.7}
                        >
                            {selectedImage.uri ? (
                                <ImageHighlight
                                    source={{
                                        uri: selectedImage.uri,
                                    }}
                                />
                            ) : (
                                <Icon name="add" size={44} color="#1c274e" />
                            )}
                        </ImagePicker>
                        <DeleteImageButton
                            onPress={() => setSelectedImage({} as IImageData)}
                        >
                            <Icon name="clear" size={34} color="#e7e7e7" />
                        </DeleteImageButton>
                    </ImageContainer>
                </Form>

                <Button
                    biggerText
                    onPress={() => formRef.current?.submitForm()}
                >
                    <Text>Registrar{'\n'}empresa</Text>
                </Button>
            </Container>
        </ScrollView>
    );
};

export default RegisterCompany;
