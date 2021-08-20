import React, { useMemo, useRef } from 'react';
import api from '@services/api';
import Button from '@components/Button';
import Input from '@components/Input';
import Icon from 'react-native-vector-icons/MaterialIcons';
import formatPrice from '@utils/formatPrice';
import Toast from 'react-native-toast-message';
import ErrorCatcher from '@errors/errorCatcher';
import * as yup from 'yup';

import {
    Container,
    TitleTextContainer,
    TitleText,
    ImageContainer,
    ImageHighlight,
    ProductSellContainer,
    TotalSellPrice,
    AuxiliarBar,
    TotalSellPriceText,
    PickerView,
    PickerText,
} from './styles';
import { ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useProducts } from '@hooks/products';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import { useCallback } from 'react';
import { useState } from 'react';
import { Picker } from '@react-native-picker/picker';

interface IProduct {
    name: string;
    id: string;
    price: number;
    brand: string;
    quantity: number;
    image?: string;
}

const ProductSale: React.FC = () => {
    const product = useRoute().params as IProduct;
    const { updateProductsStatus } = useProducts();

    const [soldQuantity, setSoldQuantity] = useState(0);
    const [totalValue, setTotalValue] = useState('');
    const [sellMethod, setSellMethod] = useState('money');

    const formRef = useRef<FormHandles>(null);
    const navigation = useNavigation();

    const apiStaticUrl = useMemo(
        () => `${api.defaults.baseURL}/files/productImage`,
        [],
    );

    const formattedPrice = useMemo(
        () => (product ? formatPrice(product.price) : '0'),
        [product],
    );

    const handleQuantityChange = useCallback(
        (value: string) => {
            setSoldQuantity(Number(value));
            setTotalValue(formatPrice(Number(value) * product.price));
        },
        [product.price],
    );

    const handleSubmit = useCallback(
        async (data: { soldQuantity: number }) => {
            try {
                const schema = yup.object().shape({
                    soldQuantity: yup
                        .number()
                        .min(1, 'A quantidade vendida precisa ser no mínimo 1')
                        .max(
                            product.quantity,
                            'Quantidade requisitada maior que a disponível',
                        )
                        .required('Quantidade vendida obrigatória'),
                });

                await schema.validate(data, {
                    abortEarly: false,
                });

                const response = await api.post(`/sales`, {
                    method: sellMethod,
                    quantity: soldQuantity,
                    productId: product.id,
                });

                updateProductsStatus({
                    ...product,
                    quantity: product.quantity - soldQuantity,
                });

                Toast.show({
                    type: 'success',
                    text1: 'Venda registrada com sucesso!',
                });

                navigation.navigate('ProductsList');

                navigation.navigate('Sales', {
                    updatedAt: response.data.createdAt,
                });
            } catch (err) {
                ErrorCatcher(err, formRef);
            }
        },
        [product, soldQuantity, updateProductsStatus, sellMethod, navigation],
    );

    return (
        <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
        >
            <Container>
                <TitleTextContainer style={{ elevation: 10 }}>
                    <TitleText>Vender produto</TitleText>
                </TitleTextContainer>

                <Form
                    ref={formRef}
                    onSubmit={handleSubmit}
                    initialData={{
                        ...product,
                        price: formattedPrice,
                        quantity: product.quantity.toString(),
                    }}
                    style={{
                        alignItems: 'center',
                        width: '100%',
                    }}
                >
                    <Input name="name" icon="label-outline" editable={false} />

                    <Input name="price" icon="attach-money" editable={false} />

                    <Input name="brand" icon="tag" editable={false} />

                    <Input name="quantity" icon="inbox" editable={false} />

                    <ImageContainer>
                        {product.image ? (
                            <ImageHighlight
                                source={{
                                    uri: `${apiStaticUrl}/${product.image}`,
                                }}
                            />
                        ) : (
                            <Icon
                                name="local-offer"
                                size={56}
                                color="#1c274e"
                            />
                        )}
                    </ImageContainer>

                    <ProductSellContainer>
                        <Input
                            keyboardType="numeric"
                            name="soldQuantity"
                            placeholder="Quant. vendida"
                            icon="inbox"
                            style={{ marginRight: 100 }}
                            value={soldQuantity ? soldQuantity.toString() : ''}
                            onChangeText={value => handleQuantityChange(value)}
                        />

                        <TotalSellPrice>
                            <AuxiliarBar />
                            <TotalSellPriceText>
                                Preço:{'\n'}
                                {totalValue || '0,00 R$'}
                            </TotalSellPriceText>
                        </TotalSellPrice>
                    </ProductSellContainer>

                    <PickerView>
                        <PickerText>Selecione o método:</PickerText>
                        <Picker
                            selectedValue={sellMethod}
                            style={{
                                height: 50,
                                width: '44%',
                                marginRight: -2,
                            }}
                            onValueChange={itemValue =>
                                setSellMethod(String(itemValue))
                            }
                            mode="dropdown"
                        >
                            <Picker.Item
                                key="0"
                                label="Dinheiro"
                                value="money"
                            />
                            <Picker.Item key="1" label="Cartão" value="card" />
                        </Picker>
                    </PickerView>
                </Form>

                <Button
                    biggerText
                    onPress={() => formRef.current?.submitForm()}
                >
                    Confirmar venda
                </Button>
            </Container>
        </ScrollView>
    );
};

export default ProductSale;
