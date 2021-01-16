import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import Input from '../../components/Input';
import Button from '../../components/Button';
import TestLogo from '../../../assets/Logo/Test-logo.png';
import api from '../api';

import {
    Container,
    LogoView,
    LogoImage,
    PickerView,
    PickerText,
    ImagePicker,
    ImageHighlight,
} from './styles';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import { TextInput, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Picker } from '@react-native-picker/picker';
import { launchImageLibrary } from 'react-native-image-picker/src';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface BrazilianState {
    nome: string;
    sigla: string;
}

const SignUpCompany: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const cnpjInput = useRef<TextInput>(null);
    const cityInput = useRef<TextInput>(null);
    const stateInput = useRef<TextInput>(null);

    const [selectedImage, setSelectedImage] = useState('');

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

    const handleSubmit = useCallback(data => {
        console.log(data);
    }, []);

    const handleUploadImage = useCallback(() => {
        launchImageLibrary(
            {
                mediaType: 'photo',
            },
            ({ fileName, uri, type, didCancel }) => {
                if (!didCancel && uri) {
                    setSelectedImage(uri);
                }
            },
        );
    }, []);

    return (
        <ScrollView
            contentContainerStyle={{ flex: 1 }}
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
                        onSubmitEditing={() => {
                            cnpjInput.current?.focus();
                        }}
                        returnKeyType="next"
                    />

                    <Input
                        autoCorrect={false}
                        keyboardType="numbers-and-punctuation"
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
                                    value={state.nome}
                                />
                            ))}
                        </Picker>
                    </PickerView>

                    <ImagePicker
                        onPress={handleUploadImage}
                        activeOpacity={0.5}
                        selectedImage={selectedImage}
                    >
                        {selectedImage ? (
                            <ImageHighlight
                                source={{
                                    uri: `${selectedImage}`,
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
            </Container>
        </ScrollView>
    );
};

export default SignUpCompany;
