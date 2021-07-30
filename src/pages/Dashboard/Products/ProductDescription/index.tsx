import React, { useCallback, useMemo, useRef, useState } from 'react';
import {
    Container,
    TitleTextContainer,
    TitleText,
    ProductQuantityContainer,
    SellProductButton,
    AuxiliarBar,
    SellProductButtonText,
    BarCodeScannerContainer,
    BarCodeValue,
    BarCodeButton,
    ImageContainer,
    ImagePicker,
    DeleteImageButton,
    ImageHighlight,
    ButtonsContainer,
} from './styles';
import { ScrollView, TextInput } from 'react-native';
import { useAuth } from '@hooks/auth';
import { useCamera } from '@hooks/camera';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import { launchImageLibrary } from 'react-native-image-picker/src';
import { useNavigation, useRoute } from '@react-navigation/core';
import { useProducts } from '@hooks/products';

import api from '@services/api';
import Camera from '@components/Camera';
import Button from '@components/Button';
import Input from '@components/Input';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as yup from 'yup';
import Modal from '@components/Modal';
import Toast from 'react-native-toast-message';
import ErrorCatcher from '@errors/errorCatcher';

interface IProduct {
    name: string;
    id: string;
    price: number;
    quantity: number;
    brand: string;
    barCode?: string;
    image?: string;
}

interface ModalProps {
    actionFunction?: () => Promise<void>;
    text?: string;
    visibility: boolean;
}

const ProductDescription: React.FC = () => {
    const { user } = useAuth();
    const { updateProductsStatus } = useProducts();
    const navigation = useNavigation();

    const [product, setProduct] = useState(useRoute().params as IProduct);

    const [modalProps, setModalProps] = useState<ModalProps>({
        visibility: false,
    });

    const apiStaticUrl = useMemo(
        () => `${api.defaults.baseURL}/files/productImage`,
        [],
    );

    const formRef = useRef<FormHandles>(null);
    const priceInput = useRef<TextInput>(null);
    const brandInput = useRef<TextInput>(null);
    const quantityInput = useRef<TextInput>(null);
    const { isCameraVisible, handleCameraVisibility } = useCamera();

    const [barCodeValue, setBarCodeValue] = useState(
        product.barCode ? product.barCode : '',
    );

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

    const handleSubmit = useCallback(
        async (data: IProduct) => {
            try {
                data.quantity = data.quantity || 0;

                data.quantity = Number(
                    data.quantity.toString().replace('-', '.'),
                );

                data.price = data.price || 0;

                data.price = Number(data.price.toString().replace('-', '.'));

                if (barCodeValue) {
                    data.barCode = barCodeValue;
                }

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
                    barCode: yup.string().optional(),
                });

                await schema.validate(data, {
                    abortEarly: false,
                });

                const response = await api.put(`/products/${product.id}`, data);

                updateProductsStatus(response.data);
                setProduct(response.data);

                Toast.show({
                    type: 'success',
                    text1: 'Produto atualizado com sucesso!',
                });
            } catch (err) {
                ErrorCatcher(err, formRef);
            }
        },
        [product.id, barCodeValue, updateProductsStatus],
    );

    const handleImageData = useCallback(
        async (handleMode: 'upload' | 'delete') => {
            if (handleMode == 'delete') {
                if (!product.image) {
                    Toast.show({
                        type: 'error',
                        text1: 'Operação indisponível',
                    });
                } else {
                    try {
                        const response = await api.patch(
                            `/products/updateImage/${product.id}`,
                        );

                        updateProductsStatus(response.data);
                        setProduct(response.data);

                        Toast.show({
                            type: 'success',
                            text1: 'A imagem do produto foi excluída!',
                        });
                    } catch {
                        Toast.show({
                            type: 'error',
                            text1: 'Falha na exclusão da imagem',
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

                                data.append('image', {
                                    name: `${user.companyId}:${product.id}`,
                                    type: 'image/jpeg',
                                    uri,
                                });

                                const response = await api.patch(
                                    `/products/updateImage/${product.id}`,
                                    data,
                                );

                                setProduct(response.data);
                                updateProductsStatus(response.data);

                                Toast.show({
                                    type: 'success',
                                    text1:
                                        'A imagem do produto foi atualizada!',
                                });
                            } catch {
                                Toast.show({
                                    type: 'error',
                                    text1: 'Falha na atualização do produto',
                                });
                            }
                        }
                    },
                );
            }
        },
        [product.id, user.companyId, updateProductsStatus, product.image],
    );

    const handleProductDelete = useCallback(async () => {
        try {
            await api.delete(`/products/${product.id}`);

            navigation.navigate('ProductsList');
            updateProductsStatus({
                id: `deleted ${product.id}`,
            } as IProduct);

            Toast.show({
                type: 'success',
                text1: 'Produto excluído com sucesso!',
            });
        } catch {
            Toast.show({
                type: 'error',
                text1: 'Falha na exclusão do produto',
            });
        }
    }, [product.id, navigation, updateProductsStatus]);

    return isCameraVisible ? (
        <Camera
            onBarCodeRead={event => {
                handleBarCodeRead(event.data);
            }}
        />
    ) : (
        <>
            <Modal
                actionFunction={modalProps.actionFunction}
                setVisibility={setModalProps}
                isVisible={modalProps.visibility}
                text={modalProps.text ?? ''}
                iconProps={{ name: 'delete', color: '#de4343' }}
            />

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
                        initialData={{
                            ...product,
                            price: product.price.toString(),
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
                            onSubmitEditing={() =>
                                quantityInput.current?.focus()
                            }
                            returnKeyType="next"
                        />

                        <ProductQuantityContainer>
                            <Input
                                style={{ marginRight: 88 }}
                                keyboardType="numeric"
                                name="quantity"
                                ref={quantityInput}
                                placeholder="Quant. em estoque"
                                icon="inbox"
                                returnKeyType="next"
                            />

                            <SellProductButton
                                onPress={() => {
                                    Toast.show({
                                        type: 'info',
                                        text1: 'Venda quase concluída',
                                        text2:
                                            'Insira a quantidade vendida para finalizá-la.',
                                    });
                                    navigation.navigate('ProductSale', product);
                                }}
                            >
                                <AuxiliarBar />
                                <SellProductButtonText>
                                    Vender
                                </SellProductButtonText>
                            </SellProductButton>
                        </ProductQuantityContainer>

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
                                onPress={handleCameraOpening}
                                activeOpacity={0.4}
                            >
                                <Icon name="qr-code-scanner" size={24} />
                            </BarCodeButton>
                        </BarCodeScannerContainer>

                        <ImageContainer>
                            <ImagePicker
                                onPress={() => handleImageData('upload')}
                                activeOpacity={0.7}
                            >
                                {product.image ? (
                                    <ImageHighlight
                                        source={{
                                            uri: `${apiStaticUrl}/${product.image}`,
                                        }}
                                    />
                                ) : (
                                    <Icon
                                        name="add"
                                        size={44}
                                        color="#1c274e"
                                    />
                                )}
                            </ImagePicker>

                            <DeleteImageButton
                                onPress={() =>
                                    setModalProps({
                                        visibility: true,
                                        actionFunction: () =>
                                            handleImageData('delete'),
                                        text:
                                            'Tem certeza que deseja deletar a imagem desse produto?',
                                    })
                                }
                            >
                                <Icon name="clear" size={34} color="#e7e7e7" />
                            </DeleteImageButton>
                        </ImageContainer>
                    </Form>

                    <ButtonsContainer>
                        <Button
                            biggerText
                            onPress={() => formRef.current?.submitForm()}
                        >
                            Atualizar Produto
                        </Button>

                        <Button
                            biggerText
                            style={{ backgroundColor: '#c93c3c' }}
                            onPress={() =>
                                setModalProps({
                                    visibility: true,
                                    actionFunction: handleProductDelete,
                                    text:
                                        'Tem certeza que deseja deletar esse produto?',
                                })
                            }
                        >
                            Deletar Produto
                        </Button>
                    </ButtonsContainer>
                </Container>
            </ScrollView>
        </>
    );
};

export default ProductDescription;
