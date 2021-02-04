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
    ImagePicker,
    ImageHighlight,
} from './styles';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import TestLogo from '../../../../assets/Logo/Test-logo.png';

import api from '../../../services/api';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import { TextInput, Text, Dimensions, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Picker } from '@react-native-picker/picker';
import { launchImageLibrary } from 'react-native-image-picker/src';
import { useAuth } from '../../../hooks/auth';
import { useNavigation } from '@react-navigation/native';
import * as yup from 'yup';
import getValidationErrors from '../../../utils/getValidationErrors';
const { width } = Dimensions.get('screen');

interface BrazilianState {
    nome: string;
    sigla: string;
}

interface CompanyData {
    companyName: string;
    cnpj: string;
    companyCity: string;
}

interface ImageData {
    name: string;
    type: string;
    uri: string;
}

const SignUpCompany: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const cnpjInput = useRef<TextInput>(null);
    const cityInput = useRef<TextInput>(null);
    const stateInput = useRef<TextInput>(null);

    const navigation = useNavigation();

    const { user } = useAuth();

    const [selectedImage, setSelectedImage] = useState<ImageData>(
        {} as ImageData,
    );

    const [selectedState, setSelectedState] = useState('');
    const [allStates, setAllStates] = useState<BrazilianState[]>([]);

    useEffect(() => {
        api.get<BrazilianState[]>(
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
        async (data: CompanyData) => {
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

                const companyData = new FormData();

                companyData.append('name', data.companyName);
                companyData.append(
                    'adress',
                    `${data.companyCity}/${selectedState}`,
                );
                companyData.append('cnpj', data.cnpj);
                companyData.append('adminID', user.id);

                if (selectedImage.uri) {
                    companyData.append('logo', {
                        uri: selectedImage.uri,
                        name: `${data.companyName}-${user.id}`,
                        type: selectedImage.type,
                    });
                }

                await api.post('/company/register', companyData);

                navigation.navigate('Dashboard');
            } catch (err) {
                if (err instanceof yup.ValidationError) {
                    const validationErrors = getValidationErrors(err);

                    const validationKeys = Object.keys(validationErrors);

                    formRef.current?.setErrors(validationErrors);

                    Alert.alert(
                        'Problema na validação',
                        `${validationErrors[validationKeys[0]]}.`,
                    );

                    return;
                }

                Alert.alert(
                    'Problema inesperado',
                    'Ocorreu algum problema na aplicação, por favor, tente logar-se novamente.',
                );
            }
        },
        [selectedState, user, selectedImage, navigation],
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
                        onSubmitEditing={() => {
                            cnpjInput.current?.focus();
                        }}
                        returnKeyType="next"
                    />

                    <Input
                        autoCorrect={false}
                        keyboardType="number-pad"
                        ref={cnpjInput}
                        name="cnpj"
                        placeholder="CNPJ"
                        icon="location-city"
                        onSubmitEditing={() => {
                            cityInput.current?.focus();
                        }}
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
                        onSubmitEditing={() => {
                            stateInput.current?.focus();
                        }}
                        returnKeyType="next"
                    />

                    <PickerView>
                        <PickerText>Selecione o Estado:</PickerText>
                        <Picker
                            selectedValue={selectedState}
                            style={{
                                height: 50,
                                width: 100,
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

                    <ImagePicker
                        onPress={handleUploadImage}
                        activeOpacity={0.5}
                        selectedImage={selectedImage.uri}
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
                </Form>

                <Button
                    biggerText={true}
                    onPress={() => {
                        formRef.current?.submitForm();
                    }}
                >
                    <Text
                        style={{
                            fontSize: 14,
                        }}
                    >
                        Registrar{'\n'}empresa
                    </Text>
                </Button>
            </ScrollView>
        </Container>
    );
};

export default SignUpCompany;
