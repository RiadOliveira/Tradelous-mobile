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
} from './styles';
import { Alert, ScrollView, TextInput } from 'react-native';
import Input from '@components/Input';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import Button from '@components/Button';
import api from '@services/api';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as yup from 'yup';
import { launchImageLibrary } from 'react-native-image-picker/src';
import getValidationErrors from '@utils/getValidationErrors';
import { useNavigation, useRoute } from '@react-navigation/native';

import { Picker } from '@react-native-picker/picker';

interface BrazilianState {
    nome: string;
    sigla: string;
}

interface ICompany {
    id: string;
    name: string;
    cnpj: string;
    adress: string;
    logo?: string;
}

const EditCompany: React.FC = () => {
    const navigation = useNavigation();
    const company = useRoute().params as ICompany;

    const formRef = useRef<FormHandles>(null);
    const cnpjInput = useRef<TextInput>(null);
    const cityInput = useRef<TextInput>(null);

    const [selectedImage, setSelectedImage] = useState<string | null>(() =>
        company.logo ? company.logo : null,
    );

    const [selectedState, setSelectedState] = useState(
        company.adress.split('/')[1],
    );
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
        async (companyData: ICompany) => {
            try {
                const schema = yup.object().shape({
                    name: yup.string().required('Nome da empresa obrigatório'),
                    cnpj: yup
                        .string()
                        .required('CNPJ obrigatório')
                        .min(14, 'O tamanho mínimo do cnpj é de 14 dígitos'),
                    adress: yup
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

                companyData.adress += `/${selectedState}`;

                await api.put('/company/update', companyData);

                Alert.alert(
                    'Atualização concluída!',
                    'A alteração da empresa foi efetuada com sucesso.',
                );
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
                    'Ocorreu algum problema, por favor, tente novamente.',
                );
            }
        },
        [selectedState],
    );

    const handleImageData = useCallback(
        async (handleMode: 'upload' | 'delete') => {
            if (handleMode == 'delete') {
                if (!selectedImage) {
                    Alert.alert(
                        'Operação indisponível',
                        'Nenhuma imagem para ser deletada.',
                    );
                } else {
                    Alert.alert(
                        'Deletar imagem',
                        'Você deseja mesmo continuar com a exclusão da imagem?',
                        [
                            {
                                text: 'Continuar',
                                onPress: async () => {
                                    try {
                                        await api.patch('/company/updateLogo');
                                        setSelectedImage(null);
                                    } catch {
                                        Alert.alert(
                                            'Falha na exclusão',
                                            'Ocorreu um erro ao tentar excluir a logo.',
                                        );
                                    }
                                },
                            },
                            { text: 'Cancelar' },
                        ],
                    );
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
                            } catch {
                                Alert.alert(
                                    'Falha na atualização',
                                    'Ocorreu um erro ao tentar atualizar a logo.',
                                );
                            }
                        }
                    },
                );
            }
        },
        [selectedImage, company.id],
    );

    useEffect(() => {
        navigation.addListener('blur', () => {
            const updatedCompany = JSON.stringify({
                ...formRef.current?.getData(),
                // eslint-disable-next-line react-hooks/exhaustive-deps
                adress: `${formRef.current?.getFieldValue(
                    'adress',
                )}/${selectedState}`,
                logo: selectedImage || null,
            });

            const comparsionCompany = JSON.stringify({
                name: company.name,
                cnpj: company.cnpj,
                adress: company.adress,
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
                            <Icon name="business" size={140} color="#1c274e" />
                        )}
                    </ImagePicker>

                    <DeleteImageButton
                        onPress={() => handleImageData('delete')}
                    >
                        <Icon name="clear" size={48} color="#e7e7e7" />
                    </DeleteImageButton>
                </ImageContainer>

                <Form
                    ref={formRef}
                    onSubmit={handleSubmit}
                    initialData={{
                        ...company,
                        adress: company.adress.split('/')[0],
                    }}
                >
                    <Input
                        autoCorrect={false}
                        textContentType="organizationName"
                        autoCapitalize="words"
                        name="name"
                        placeholder="Nome da empresa"
                        icon="business"
                        onSubmitEditing={() => {
                            cnpjInput.current?.focus();
                        }}
                        returnKeyType="next"
                    />

                    <Input
                        keyboardType="numeric"
                        ref={cnpjInput}
                        maxLength={14}
                        name="cnpj"
                        placeholder="CNPJ (Somente números)"
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
                        name="adress"
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

                <Button
                    style={{ position: 'absolute', bottom: '5%' }}
                    biggerText
                    onPress={() => formRef.current?.submitForm()}
                >
                    Atualizar dados
                </Button>
            </Container>
        </ScrollView>
    );
};

export default EditCompany;
