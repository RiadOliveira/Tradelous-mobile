import React, { useMemo, useRef } from 'react';
import api from '@services/api';
import Button from '@components/Button';
import Input from '@components/Input';
import {
    Container,
    TitleTextContainer,
    TitleText,
    ImageContainer,
    ImageHighlight,
} from './styles';
import { ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useProducts } from '@hooks/products';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import { useCallback } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface IProduct {
    name: string;
    id: string;
    price: number;
    brand: string;
    quantity: number;
    image?: string;
}

//Needs a button to select the quantity of the product that will be sell.
const ProductSale: React.FC = () => {
    const product = useRoute().params as IProduct;
    const { updateProductsStatus } = useProducts();

    const navigation = useNavigation();
    const formRef = useRef<FormHandles>(null);

    const apiStaticUrl = useMemo(
        () => `${api.defaults.baseURL}/files/productImage`,
        [],
    );

    const formattedPrice = useMemo(
        () =>
            product
                ? `R$ ${Number(product.price)
                      .toPrecision(3)
                      .toString()
                      .replace('.', ',')}`
                : 0,
        [product],
    );

    const handleSubmit = useCallback(() => {
        console.log("Handle product's sale");
    }, []);

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
                    <Input
                        autoCorrect={false}
                        autoCapitalize="sentences"
                        name="name"
                        placeholder="Nome"
                        icon="label-outline"
                        editable={false}
                    />

                    <Input
                        keyboardType="numeric"
                        name="price"
                        placeholder="Preço (Use . para decimal)"
                        icon="attach-money"
                        editable={false}
                    />

                    <Input
                        autoCapitalize="words"
                        name="brand"
                        placeholder="Marca"
                        icon="tag"
                        editable={false}
                    />

                    <Input
                        keyboardType="numeric"
                        name="quantity"
                        placeholder="Quant. em estoque"
                        icon="inbox"
                        editable={false}
                    />

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
                </Form>

                <Button biggerText onPress={handleSubmit}>
                    Confirmar venda
                </Button>
            </Container>
        </ScrollView>
    );
};

export default ProductSale;
