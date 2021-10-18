import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
    Container,
    LogoView,
    LogoImage,
    PickerView,
    PickerText,
} from './styles';
import Input from '@components/Input';
import Button from '@components/Button';
import TestLogo from '@assets/logo/test-logo.png';
import api from '@services/api';
import getValidationErrors from '@utils/getValidationErrors';
import Toast from 'react-native-toast-message';
import * as yup from 'yup';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import { TextInput, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Picker } from '@react-native-picker/picker';
import { useAuth } from '@hooks/auth';
import LoadingIndicator from '@components/LoadingIndicator';

interface IBrazilianState {
    id: string;
    nome: string;
    sigla: string;
}

interface IBrazilianCity {
    id: string;
    nome: string;
}

interface ICompanyData {
    name: string;
    cnpj: string;
}

const RegisterCompany: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const cnpjInput = useRef<TextInput>(null);
    const cityInput = useRef<TextInput>(null);

    const { setUserCompany } = useAuth();

    const [selectedState, setSelectedState] = useState<IBrazilianState>(
        {} as IBrazilianState,
    );
    const [allStates, setAllStates] = useState<IBrazilianState[]>([]);

    const [hasLoadedCities, setHasLoadedCities] = useState(false);

    const [selectedCity, setSelectedCity] = useState<IBrazilianCity>(
        {} as IBrazilianCity,
    );
    const [stateCities, setStateCities] = useState<IBrazilianCity[]>([]);

    useEffect(() => {
        api.get<IBrazilianState[]>(
            'https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome',
            {
                baseURL: '',
            },
        ).then(({ data }) => {
            setAllStates(data);
            setSelectedState(data[0]);
        });
    }, []);

    useEffect(() => {
        if (selectedState.id) {
            api.get<IBrazilianCity[]>(
                `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedState.id}/municipios?orderBy=nome`,
            ).then(({ data }) => {
                setStateCities(data);
                setSelectedCity(data[0]);
                setHasLoadedCities(true);
            });
        }
    }, [selectedState.id]);

    const handleSubmit = useCallback(
        async (data: ICompanyData) => {
            try {
                const schema = yup.object().shape({
                    name: yup.string().required('Nome da empresa obrigatório'),
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

                const response = await api.post('/company/', {
                    ...data,
                    address: `${selectedCity.nome}/${selectedState.sigla}`,
                });

                Toast.show({
                    type: 'success',
                    text1: 'Empresa cadastrada com sucesso!',
                });

                setUserCompany(true, response.data.id);
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
        [selectedState, selectedCity, setUserCompany],
    );

    return (
        <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
        >
            {!hasLoadedCities && <LoadingIndicator />}

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

                    <PickerView>
                        <PickerText>Estado:</PickerText>
                        <Picker
                            selectedValue={selectedState}
                            style={{
                                height: 50,
                                width: '60%',
                            }}
                            onValueChange={itemValue => {
                                setSelectedState(itemValue);
                                setHasLoadedCities(false);
                            }}
                        >
                            {allStates.map(state => (
                                <Picker.Item
                                    key={state.id}
                                    label={state.nome}
                                    value={state}
                                />
                            ))}
                        </Picker>
                    </PickerView>

                    <PickerView>
                        <PickerText>Cidade:</PickerText>
                        <Picker
                            selectedValue={selectedCity}
                            style={{
                                height: 50,
                                width: '60%',
                            }}
                            onValueChange={itemValue =>
                                setSelectedCity(itemValue)
                            }
                        >
                            {stateCities.map(city => (
                                <Picker.Item
                                    key={city.id}
                                    label={city.nome}
                                    value={city}
                                />
                            ))}
                        </Picker>
                    </PickerView>
                </Form>

                <Button onPress={() => formRef.current?.submitForm()}>
                    <Text>Registrar{'\n'}empresa</Text>
                </Button>
            </Container>
        </ScrollView>
    );
};

export default RegisterCompany;
