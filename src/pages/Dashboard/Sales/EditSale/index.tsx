import React, { useCallback, useMemo, useRef } from 'react';
import {
    Container,
    TitleTextContainer,
    TitleText,
    SaleSectionTitle,
    SaleSectionTitleText,
    ProductContainer,
    ProductImageContainer,
    ProductImage,
    ProductData,
    ProductText,
} from './styles';
import { ScrollView, TextInput } from 'react-native';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/mobile';
import { useNavigation, useRoute } from '@react-navigation/core';

import api from '@services/api';
import Button from '@components/Button';
import Input from '@components/Input';
import * as yup from 'yup';
import Toast from 'react-native-toast-message';
import ErrorCatcher from '@errors/errorCatcher';
import Icon from 'react-native-vector-icons/MaterialIcons';
import formatPrice from '@utils/formatPrice';

interface IEmployee {
    id: string;
    name: string;
    email: string;
    avatar: string;
}

interface IProduct {
    id: string;
    name: string;
    price: number;
    brand: string;
    image?: string;
}

interface ISale {
    id: string;
    companyId: string;
    employeeId: string;
    productId: string;
    date: string;
    method: 'money' | 'card';
    quantity: number;
    totalPrice: number;
    employee: IEmployee;
    product: IProduct;
}

const EditSale: React.FC = () => {
    const navigation = useNavigation();

    const { sale } = useRoute().params as { sale: ISale };

    const formRef = useRef<FormHandles>(null);
    const priceInput = useRef<TextInput>(null);
    const brandInput = useRef<TextInput>(null);
    const quantityInput = useRef<TextInput>(null);

    const apiStaticUrl = useMemo(
        () => `${api.defaults.baseURL}/files/productImage`,
        [],
    );

    const handleSubmit = useCallback(
        async (data: ISale) => {
            try {
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

                const response = await api.put(`/sales/${sale.id}`, data);

                navigation.navigate('SalesList', {
                    saleId: sale.id,
                    updatedAt: response.data.updatedAt,
                });

                Toast.show({
                    type: 'success',
                    text1: 'Venda atualizado com sucesso!',
                });
            } catch (err) {
                ErrorCatcher(err, formRef);
            }
        },
        [sale.id, navigation],
    );

    return (
        <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
        >
            <Container>
                <TitleTextContainer style={{ elevation: 10 }}>
                    <TitleText>Dados da venda</TitleText>
                </TitleTextContainer>

                <Form
                    ref={formRef}
                    initialData={{
                        ...sale,
                        product: `${sale.product.name} - ${sale.product.brand}`,
                    }}
                    onSubmit={handleSubmit}
                    style={{
                        alignItems: 'center',
                        width: '100%',
                    }}
                >
                    <SaleSectionTitle>
                        <SaleSectionTitleText>Produto</SaleSectionTitleText>
                    </SaleSectionTitle>
                    <ProductContainer>
                        <ProductImageContainer>
                            {sale.product.image ? (
                                <ProductImage
                                    source={{
                                        uri: `${apiStaticUrl}/${sale.product.image}`,
                                    }}
                                />
                            ) : (
                                <Icon
                                    name="local-offer"
                                    size={40}
                                    color="#ffffff"
                                />
                            )}
                        </ProductImageContainer>

                        <ProductData style={{ marginLeft: '1%' }}>
                            <ProductText>{sale.product.name}</ProductText>

                            <ProductData
                                style={{
                                    flexDirection: 'row',
                                    width: '98%',
                                }}
                            >
                                <ProductText>{sale.product.brand}</ProductText>

                                <ProductText>
                                    {formatPrice(sale.product.price)}
                                </ProductText>
                            </ProductData>
                        </ProductData>
                    </ProductContainer>

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
                </Form>

                <Button
                    biggerText
                    onPress={() => formRef.current?.submitForm()}
                >
                    Atualizar Venda
                </Button>
            </Container>
        </ScrollView>
    );
};

export default EditSale;
