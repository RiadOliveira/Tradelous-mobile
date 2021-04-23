import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
    Container,
    Icon,
    SearchBarContainer,
    SearchBar,
    ProductContainer,
    ProductImageContainer,
    ProductImage,
    ProductData,
    ProductText,
    ProductPriceText,
} from './styles';
import { ScrollView, View } from 'react-native';
import { useAuth } from '../../../hooks/auth';
import api from '../../../services/api';

interface IProduct {
    name: string;
    id: string;
    price: number;
    brand: string;
    qrcode?: string;
    image?: string;
}

const Products: React.FC = () => {
    const { user } = useAuth();
    const [companyProducts, setCompanyProducts] = useState<IProduct[]>([]);

    //const [searchedText, setSearchedText] = useState('');
    const [isSearchFilled, setIsSearchFilled] = useState(false);
    const [isSearchFocused, setIsSearchFocused] = useState(false);

    useEffect(() => {
        if (user.companyId) {
            api.get(`/products/${user.companyId}`).then(response => {
                setCompanyProducts(response.data);
            });
        }
    }, [user.companyId]);

    const apiStaticUrl = useMemo(
        () => `${api.defaults.baseURL}/files/productImage`,
        [],
    );

    const formattedPrices = useMemo(
        () =>
            companyProducts.map(
                product => `R$ ${product.price.toString().replace('.', ',')}`,
            ),
        [companyProducts],
    );

    const handleChangeSearch = useCallback((event: string) => {
        if (event) {
            setIsSearchFilled(true);
        } else {
            setIsSearchFilled(false);
        }
    }, []);

    const handleSearchFocus = useCallback(() => {
        setIsSearchFocused(value => !value);
    }, []);

    return user.companyId ? (
        <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
        >
            <Container>
                <SearchBarContainer
                    isFocused={isSearchFocused}
                    isFilled={isSearchFilled}
                >
                    <Icon
                        name="search"
                        size={24}
                        color={
                            isSearchFocused || isSearchFilled
                                ? '#374b92'
                                : 'black'
                        }
                    />
                    <SearchBar
                        onChangeText={event => {
                            handleChangeSearch(event);
                        }}
                        onFocus={() => {
                            handleSearchFocus();
                        }}
                        onBlur={() => {
                            handleSearchFocus();
                        }}
                        placeholder="Pesquisar produto..."
                    />

                    <Icon name="qr-code-scanner" size={24} />
                </SearchBarContainer>

                {companyProducts ? (
                    companyProducts.map((product, index) => (
                        <ProductContainer key={product.id}>
                            <ProductImageContainer hasImage={!!product.image}>
                                {product.image ? (
                                    <ProductImage
                                        source={{
                                            uri: `${apiStaticUrl}/${product.image}`,
                                        }}
                                    />
                                ) : (
                                    <Icon
                                        name="local-offer"
                                        size={44}
                                        color="#ffffff"
                                    />
                                )}
                            </ProductImageContainer>

                            <ProductData>
                                <ProductText>{product.name}</ProductText>
                                <ProductPriceText>
                                    {formattedPrices[index]}
                                </ProductPriceText>
                            </ProductData>

                            <ProductText style={{ marginLeft: '9%' }}>
                                {product.brand}
                            </ProductText>
                        </ProductContainer>
                    ))
                ) : (
                    <View></View>
                )}
            </Container>
        </ScrollView>
    ) : (
        <Container></Container>
    );
};

export default Products;
