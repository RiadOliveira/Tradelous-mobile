import React, { useCallback, useRef, useState } from 'react';
import {
    Container,
    TitleTextContainer,
    TitleText,
    ImagePicker,
    ImageHighlight,
} from './styles';
import { ScrollView, TextInput } from 'react-native';
import { useAuth } from '@hooks/auth';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import { launchImageLibrary } from 'react-native-image-picker/src';
import { IProduct, useProducts } from '@hooks/products';

import api from '@services/api';
import Button from '@components/Button';
import Input from '@components/Input';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as yup from 'yup';
import Toast from 'react-native-toast-message';
import ErrorCatcher from '@errors/errorCatcher';
import BarCodeScanner from '@components/BarCodeScanner';
import { useModal } from '@hooks/modal';

interface IImageData {
    name: string;
    type: string;
    uri: string;
}

const RegisterProduct: React.FC = () => {
    const { user } = useAuth();
    const { showModal } = useModal();
    const { updateProductsStatus } = useProducts();

    const formRef = useRef<FormHandles>(null);
    const priceInput = useRef<TextInput>(null);
    const brandInput = useRef<TextInput>(null);
    const quantityInput = useRef<TextInput>(null);

    const [barCodeValue, setBarCodeValue] = useState('');
    const [selectedImage, setSelectedImage] = useState<IImageData>(
        {} as IImageData,
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
        async (data: IProduct) => {
            try {
                data.quantity = data.quantity || 0;
                data.quantity = Number(
                    data.quantity.toString().replace('-', '.'),
                );

                data.price = data.price || 0;

                data.price =
                    Number(data.price.toString().replace('-', '.')) || 0;

                const schema = yup.object().shape({
                    name: yup.string().required('Nome do produto obrigatório'),
                    price: yup
                        .number()
                        .moreThan(0, 'O preço precisa ser maior que zero')
                        .required('Preço do produto obrigatório'),
                    brand: yup
                        .string()
                        .required('Marca do produto obrigatória'),
                    quantity: yup
                        .number()
                        .integer('A quantidade precisa ser um valor inteiro')
                        .min(0, 'A quantidade não pode ser negativa'),
                });

                await schema.validate(data, {
                    abortEarly: false,
                });

                const productData = new FormData();

                productData.append('name', data.name);
                productData.append('price', data.price);
                productData.append('brand', data.brand);
                productData.append('quantity', data.quantity);

                if (barCodeValue) productData.append('barCode', barCodeValue);

                if (selectedImage.uri) {
                    productData.append('image', {
                        uri: selectedImage.uri,
                        name: `${data.name}-${user.companyId}`,
                        type: selectedImage.type,
                    });
                }

                await api.post('/products/', productData);

                formRef.current?.reset();
                setSelectedImage({} as IImageData);
                setBarCodeValue('');

                updateProductsStatus('newProduct');

                Toast.show({
                    type: 'success',
                    text1: 'Produto adicionado com sucesso!',
                });
            } catch (err) {
                ErrorCatcher(err as Error | yup.ValidationError, formRef);
            }
        },
        [selectedImage, user.companyId, barCodeValue, updateProductsStatus],
    );

    return (
        <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
        >
            <Container>
                <TitleTextContainer style={{ elevation: 10 }}>
                    <TitleText>Dados do produto</TitleText>
                </TitleTextContainer>

                <Form
                    ref={formRef}
                    onSubmit={handleSubmit}
                    style={{
                        alignItems: 'center',
                        width: '100%',
                    }}
                >
                    <Input
                        autoCorrect={false}
                        autoCapitalize="sentences"
                        name="name"
                        placeholder="Nome"
                        icon="label-outline"
                        onSubmitEditing={() => priceInput.current?.focus()}
                        returnKeyType="next"
                    />

                    <Input
                        keyboardType="numeric"
                        name="price"
                        ref={priceInput}
                        placeholder="Preço (Use . para decimal)"
                        icon="attach-money"
                        onSubmitEditing={() => brandInput.current?.focus()}
                        returnKeyType="next"
                    />

                    <Input
                        autoCapitalize="words"
                        name="brand"
                        placeholder="Marca"
                        icon="tag"
                        ref={brandInput}
                        onSubmitEditing={() => quantityInput.current?.focus()}
                        returnKeyType="next"
                    />

                    <Input
                        keyboardType="numeric"
                        name="quantity"
                        ref={quantityInput}
                        placeholder="Quantidade em estoque"
                        icon="inbox"
                        returnKeyType="next"
                    />

                    <BarCodeScanner
                        barCodeValue={barCodeValue}
                        actionFunction={data => setBarCodeValue(data)}
                        deleteFunction={() =>
                            showModal({
                                actionFunction: async () => setBarCodeValue(''),
                                text: {
                                    info:
                                        'Tem certeza que deseja deletar o código do produto?',
                                    firstButton: 'Sim',
                                    secondButton: 'Não',
                                },
                                iconName: 'delete',
                            })
                        }
                    />

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
                </Form>

                <Button onPress={() => formRef.current?.submitForm()}>
                    Cadastrar Produto
                </Button>
            </Container>
        </ScrollView>
    );
};

export default RegisterProduct;
