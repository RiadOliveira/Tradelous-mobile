import React, { useCallback, useRef, useState } from 'react';
import {
    Container,
    TitleTextContainer,
    TitleText,
    ImagePicker,
    ImageHighlight,
    BarCodeScannerContainer,
    BarCodeValue,
    BarCodeButton,
} from './styles';
import { Alert, ScrollView, TextInput } from 'react-native';
import { useAuth } from '@hooks/auth';
import { useCamera } from '@hooks/camera';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import { launchImageLibrary } from 'react-native-image-picker/src';

import api from '@services/api';
import Camera from '@components/Camera';
import Button from '@components/Button';
import Input from '@components/Input';
import Icon from 'react-native-vector-icons/MaterialIcons';
import getValidationErrors from '@utils/getValidationErrors';
import * as yup from 'yup';
import { useNavigation, useRoute } from '@react-navigation/core';

interface IProduct {
    name: string;
    id: string;
    price: number;
    quantity: number;
    brand: string;
    barCode?: string;
    image?: string;
}

interface ImageData {
    name: string;
    type: string;
    uri: string;
}

//Needs to create a button to decrease product quantity in one (sell).
//Needs a button to delete a product.
//Needs a button to delete product's image.
const ProductDescription: React.FC = () => {
    const { user } = useAuth();
    const navigation = useNavigation();
    const product = useRoute().params as IProduct;

    const formRef = useRef<FormHandles>(null);
    const priceInput = useRef<TextInput>(null);
    const brandInput = useRef<TextInput>(null);
    const quantityInput = useRef<TextInput>(null);
    const { isCameraVisible, handleCameraVisibility } = useCamera();

    const [barCodeValue, setBarCodeValue] = useState(
        product.barCode ? product.barCode : 0,
    );

    const [selectedImage, setSelectedImage] = useState<ImageData>({
        uri: product.image
            ? `${api.defaults.baseURL}/files/productImage/${product.image}`
            : '',
    } as ImageData);

    const handleCameraOpening = useCallback(() => {
        handleCameraVisibility(true);
    }, [handleCameraVisibility]);

    const handleBarCodeRead = useCallback(
        value => {
            setBarCodeValue(value);
            handleCameraVisibility(false);
        },
        [handleCameraVisibility],
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
                data.quantity = data.quantity ? data.quantity : 0;

                const schema = yup.object().shape({
                    name: yup.string().required('Nome do produto obrigatório'),
                    price: yup
                        .number()
                        .required('Preço do produto obrigatório'),
                    brand: yup
                        .string()
                        .required('Marca do produto obrigatória'),
                    quantity: yup.number(),
                    barCode: yup.string().optional(),
                });

                await schema.validate(data, {
                    abortEarly: false,
                });

                const productData = new FormData();

                productData.append('name', data.name);
                productData.append('price', data.price);
                productData.append('brand', data.brand);
                productData.append('quantity', data.quantity);

                if (barCodeValue) {
                    productData.append('barCode', barCodeValue);
                }

                if (selectedImage.uri) {
                    productData.append('image', {
                        uri: selectedImage.uri,
                        name: `${data.name}-${user.companyId}`,
                        type: 'image/jpeg',
                    });
                }

                const response = await api.put(
                    `/products/update/${product.id}`,
                    productData,
                );

                navigation.navigate('ProductsList', {
                    updatedProduct: response.data.updatedAt,
                });

                Alert.alert(
                    'Produto atualizado com sucesso!',
                    'O produto selecionado teve seus dados atualizados.',
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
                    'Ocorreu algum problema na aplicação, por favor, tente novamente.',
                );
            }
        },
        [selectedImage, user.companyId, barCodeValue, navigation, product.id],
    );

    return isCameraVisible ? (
        <Camera
            onBarCodeRead={event => {
                handleBarCodeRead(event.data);
            }}
        />
    ) : (
        <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
        >
            <Container>
                <TitleTextContainer style={{ elevation: 10 }}>
                    <TitleText>Dados do produto</TitleText>
                </TitleTextContainer>

                <Form
                    ref={formRef}
                    initialData={{
                        ...product,
                        quantity: product.quantity.toString(),
                    }}
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
                        onSubmitEditing={() => {
                            priceInput.current?.focus();
                        }}
                        returnKeyType="next"
                    />

                    <Input
                        keyboardType="numeric"
                        name="price"
                        ref={priceInput}
                        placeholder="Preço (Use . para decimal)"
                        icon="attach-money"
                        onSubmitEditing={() => {
                            brandInput.current?.focus();
                        }}
                        returnKeyType="next"
                    />

                    <Input
                        autoCapitalize="words"
                        name="brand"
                        placeholder="Marca"
                        icon="tag"
                        ref={brandInput}
                        onSubmitEditing={() => {
                            quantityInput.current?.focus();
                        }}
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

                    <BarCodeScannerContainer>
                        <Icon
                            name="qr-code"
                            size={24}
                            style={{ position: 'absolute', left: 12 }}
                            color={barCodeValue ? '#374b92' : 'black'}
                        />
                        <BarCodeValue>
                            {barCodeValue
                                ? barCodeValue
                                : 'Sem código inserido'}
                        </BarCodeValue>

                        <BarCodeButton
                            onPress={() => handleCameraOpening()}
                            activeOpacity={0.4}
                        >
                            <Icon name="qr-code-scanner" size={24} />
                        </BarCodeButton>
                    </BarCodeScannerContainer>

                    <ImagePicker
                        onPress={() => handleUploadImage()}
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

                <Button
                    biggerText
                    onPress={() => formRef.current?.submitForm()}
                >
                    Atualizar Produto
                </Button>
            </Container>
        </ScrollView>
    );
};

export default ProductDescription;
