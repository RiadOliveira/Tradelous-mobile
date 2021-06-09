import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import {
    Container,
    TitleTextContainer,
    TitleText,
    ProductQuantityContainer,
    DecreaseQuantityButton,
    BarCodeScannerContainer,
    BarCodeValue,
    BarCodeButton,
    ImageContainer,
    ImagePicker,
    DeleteImageButton,
    ImageHighlight,
    ButtonsContainer,
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

const ProductDescription: React.FC = () => {
    const { user } = useAuth();
    const navigation = useNavigation();

    const [product, setProduct] = useState<IProduct>(
        useRoute().params as IProduct,
    );
    const apiStaticUrl = useMemo(
        () => `${api.defaults.baseURL}/files/productImage`,
        [],
    );

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const productInitialImage = useMemo(() => product.image, []); //Just to store initialImage, for that reason, doesn't has deps.

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
                data.quantity = product.quantity ? product.quantity : 0;

                const schema = yup.object().shape({
                    name: yup.string().required('Nome do produto obrigatório'),
                    price: yup
                        .number()
                        .required('Preço do produto obrigatório'),
                    brand: yup
                        .string()
                        .required('Marca do produto obrigatória'),
                    quantity: yup.number(),
                });

                await schema.validate(data, {
                    abortEarly: false,
                });

                if (barCodeValue) {
                    data.barCode = barCodeValue;
                }

                const response = await api.put(
                    `/products/update/${product.id}`,
                    data,
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
        [navigation, product.id, barCodeValue, product.quantity],
    );

    const handleImageData = useCallback(
        async (handleMode: 'upload' | 'delete') => {
            if (handleMode == 'delete') {
                if (!product.image) {
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
                                        await api.patch(
                                            `/products/updateImage/${product.id}`,
                                        );

                                        setProduct(actualProduct => ({
                                            ...actualProduct,
                                            image: '',
                                        }));
                                    } catch {
                                        Alert.alert(
                                            'Falha na exclusão',
                                            'Ocorreu um erro ao tentar excluir a imagem do produto.',
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

                                data.append('image', {
                                    name: `${formRef.current?.getFieldValue(
                                        'name',
                                    )}-${user.companyId}`,
                                    type: 'image/jpeg',
                                    uri: uri,
                                });

                                const response = await api.patch(
                                    `/products/updateImage/${product.id}`,
                                    data,
                                );

                                setProduct(actualProduct => ({
                                    ...actualProduct,
                                    image: response.data.image,
                                }));
                            } catch {
                                Alert.alert(
                                    'Falha na atualização',
                                    'Ocorreu um erro ao tentar atualizar a imagem do produto.',
                                );
                            }
                        }
                    },
                );
            }
        },
        [product.id, user.companyId, product.image],
    );

    const handleProductDelete = useCallback(async () => {
        Alert.alert(
            'Deletar produto',
            'Você deseja mesmo continuar com a exclusão do produto?',
            [
                {
                    text: 'Continuar',
                    onPress: async () => {
                        try {
                            await api.delete(`/products/delete/${product.id}`);
                            navigation.navigate('ProductsList', {
                                updatedProduct: `deleted ${product.id}`,
                            });
                            Alert.alert(
                                'Produto excluído com sucesso!',
                                'O produto selecionado teve uma exclusão bem sucedida.',
                            );
                        } catch {
                            Alert.alert(
                                'Falha na exclusão',
                                'Ocorreu um erro ao tentar excluir o produto.',
                            );
                        }
                    },
                },
                { text: 'Cancelar' },
            ],
        );
    }, [product.id, navigation]);

    const handleProductQuantityDecrease = useCallback(() => {
        if (product.quantity > 0) {
            setProduct(actualProduct => ({
                ...actualProduct,
                quantity: actualProduct.quantity - 1,
            }));
        } else {
            Alert.alert(
                'Falha na diminuição',
                'Não é possível ficar com a quantidade de um produto negativa.',
            );
        }
    }, [product.quantity]);

    useEffect(() => {
        //If the user did modify product's image and not pressed modify button.
        return () => {
            if (product.image != productInitialImage) {
                navigation.navigate('ProductsList', {
                    updatedProduct: product.image,
                });
            }
        };
    }, [navigation, product.image, productInitialImage]);

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

                    <ProductQuantityContainer>
                        <Input
                            style={{ marginRight: 45 }}
                            keyboardType="numeric"
                            name="quantity"
                            ref={quantityInput}
                            placeholder="Quantidade em estoque"
                            icon="inbox"
                            returnKeyType="next"
                        />

                        <DecreaseQuantityButton
                            onPress={() => handleProductQuantityDecrease()}
                        >
                            <Icon name="remove" size={30} color="#ffffff" />
                        </DecreaseQuantityButton>
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
                            onPress={() => handleCameraOpening()}
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
                                <Icon name="add" size={44} color="#1c274e" />
                            )}
                        </ImagePicker>

                        <DeleteImageButton
                            onPress={() => handleImageData('delete')}
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
                        onPress={() => handleProductDelete()}
                    >
                        Deletar Produto
                    </Button>
                </ButtonsContainer>
            </Container>
        </ScrollView>
    );
};

export default ProductDescription;
