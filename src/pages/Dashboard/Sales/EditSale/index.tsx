import React, { useCallback, useMemo, useRef, useState } from 'react';
import {
    Container,
    TitleTextContainer,
    TitleText,
    SaleSectionTitle,
    SaleSectionsContainer,
    SaleSection,
    SaleSectionImageContainer,
    SaleSectionImage,
    SaleSectionSubText,
    SaleSectionText,
    ProductSellContainer,
    TotalSellPrice,
    AuxiliarBar,
    TotalSellPriceText,
    PickerView,
    PickerText,
} from './styles';
import { ScrollView } from 'react-native';
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
import { useProducts } from '@hooks/products';
import { Picker } from '@react-native-picker/picker';

interface IEmployee {
    name: string;
    email: string;
    avatar: string;
}

interface IProduct {
    name: string;
    price: number;
    quantity: number;
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

    const { updateProductsStatus } = useProducts();

    const [soldQuantity, setSoldQuantity] = useState(sale.quantity);
    const [totalValue, setTotalValue] = useState(
        formatPrice(sale.quantity * sale.product.price),
    );
    const [sellMethod, setSellMethod] = useState(sale.method);

    const formRef = useRef<FormHandles>(null);

    const apiStaticUrl = useMemo(() => `${api.defaults.baseURL}/files`, []);

    const handleQuantityChange = useCallback(
        (value: string) => {
            setSoldQuantity(Number(value));
            setTotalValue(formatPrice(Number(value) * sale.product.price));
        },
        [sale.product.price],
    );

    const handleSubmit = useCallback(
        async (data: { soldQuantity: number }) => {
            try {
                const schema = yup.object().shape({
                    soldQuantity: yup
                        .number()
                        .min(1, 'A quantidade vendida precisa ser no mínimo 1')
                        .max(
                            sale.quantity + sale.product.quantity,
                            'Quantidade requisitada maior que a disponível',
                        )
                        .required('Quantidade vendida obrigatória'),
                });

                await schema.validate(data, {
                    abortEarly: false,
                });

                const response = await api.put(`/sales/${sale.id}`, {
                    productId: sale.productId,
                    method: sellMethod,
                    quantity: data.soldQuantity,
                });

                let quantity = soldQuantity;

                if (soldQuantity > sale.quantity) {
                    quantity =
                        sale.product.quantity - (soldQuantity - sale.quantity);
                } else if (sale.quantity > soldQuantity) {
                    quantity =
                        sale.product.quantity + (sale.quantity - soldQuantity);
                }

                updateProductsStatus({
                    ...sale.product,
                    id: sale.productId,
                    quantity,
                });

                navigation.navigate('SalesList', {
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
        [
            sale.id,
            navigation,
            sale.quantity,
            sale.product,
            sale.productId,
            sellMethod,
            soldQuantity,
            updateProductsStatus,
        ],
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

                <SaleSectionsContainer>
                    <SaleSection>
                        <SaleSectionTitle>Funcionário</SaleSectionTitle>

                        <SaleSectionImageContainer>
                            {sale.employee.avatar ? (
                                <SaleSectionImage
                                    source={{
                                        uri: `${apiStaticUrl}/avatar/${sale.employee.avatar}`,
                                    }}
                                />
                            ) : (
                                <Icon name="person" size={90} color="#ffffff" />
                            )}
                        </SaleSectionImageContainer>

                        <SaleSectionText>
                            {sale.employee.name.length > 18
                                ? `${sale.employee.name.substring(0, 18)}...`
                                : sale.employee.name}
                        </SaleSectionText>

                        <SaleSectionSubText>
                            {sale.employee.email}
                        </SaleSectionSubText>
                    </SaleSection>

                    <SaleSection>
                        <SaleSectionTitle>Produto</SaleSectionTitle>

                        <SaleSectionImageContainer>
                            {sale.product.image ? (
                                <SaleSectionImage
                                    source={{
                                        uri: `${apiStaticUrl}/productImage/${sale.product.image}`,
                                    }}
                                />
                            ) : (
                                <Icon
                                    name="local-offer"
                                    size={90}
                                    color="#ffffff"
                                />
                            )}
                        </SaleSectionImageContainer>

                        <SaleSectionText>
                            {sale.product.name.length > 18
                                ? `${sale.product.name.substring(0, 18)}...`
                                : sale.product.name}
                        </SaleSectionText>
                        <SaleSectionSubText>
                            {`${sale.product.brand} - ${formatPrice(
                                sale.product.price,
                            )}`}
                        </SaleSectionSubText>
                    </SaleSection>
                </SaleSectionsContainer>

                <Form
                    ref={formRef}
                    onSubmit={handleSubmit}
                    style={{
                        alignItems: 'center',
                        width: '100%',
                    }}
                >
                    <ProductSellContainer>
                        <Input
                            keyboardType="numeric"
                            name="soldQuantity"
                            placeholder="Quant. vendida"
                            icon="inbox"
                            style={{ width: '82%' }}
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
                            }}
                            onValueChange={(itemValue: 'money' | 'card') =>
                                setSellMethod(itemValue)
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
                    Atualizar Venda
                </Button>
            </Container>
        </ScrollView>
    );
};

export default EditSale;
