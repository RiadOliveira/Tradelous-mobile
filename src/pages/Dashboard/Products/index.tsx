import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
    Container,
    Icon,
    SearchBarContainer,
    SearchBar,
    BarCodeButton,
    ProductContainer,
    ProductImageContainer,
    ProductImage,
    ProductData,
    ProductText,
    ProductPriceText,
    ProductAvailabilityText,
} from './styles';
import { ScrollView, View } from 'react-native';
import { useAuth } from '../../../hooks/auth';
import { useCamera } from '../../../hooks/camera';
import api from '../../../services/api';
import Camera from '../../../components/Camera';

interface IProduct {
    name: string;
    id: string;
    price: number;
    quantity: number;
    brand: string;
    qrcode?: string;
    image?: string;
}

const Products: React.FC = () => {
    const { user } = useAuth();
    const { isCameraVisible, handleCameraVisibility } = useCamera();

    const [companyProducts, setCompanyProducts] = useState<IProduct[]>([]);

    const [searchedText, setSearchedText] = useState('');
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

    const handleProductSearch = useCallback(searchText => {
        setSearchedText(searchText);
    }, []);

    const searchedProducts = useMemo(
        () =>
            companyProducts.filter(product =>
                product.name.toLowerCase().includes(searchedText.toLowerCase()),
            ),
        [searchedText, companyProducts],
    );

    return isCameraVisible ? (
        <Camera />
    ) : (
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
                            handleProductSearch(event);
                        }}
                        onFocus={() => {
                            handleSearchFocus();
                        }}
                        onBlur={() => {
                            handleSearchFocus();
                        }}
                        placeholder="Pesquisar produto..."
                    />

                    <BarCodeButton
                        onPress={() => handleCameraVisibility(true)}
                        activeOpacity={0.4}
                    >
                        <Icon name="qr-code-scanner" size={24} />
                    </BarCodeButton>
                </SearchBarContainer>

                {companyProducts ? (
                    searchedProducts.map((product, index) => (
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

                            <ProductData
                                style={{
                                    position: 'absolute',
                                    right: 20,
                                    alignItems: 'flex-end',
                                }}
                            >
                                <ProductText>{product.brand}</ProductText>
                                <ProductAvailabilityText
                                    hasInStock={product.quantity > 0}
                                >
                                    {product.quantity > 0
                                        ? 'Em estoque'
                                        : 'Em falta'}
                                </ProductAvailabilityText>
                            </ProductData>
                        </ProductContainer>
                    ))
                ) : (
                    <View></View>
                )}
            </Container>
        </ScrollView>
    );
};

export default Products;
