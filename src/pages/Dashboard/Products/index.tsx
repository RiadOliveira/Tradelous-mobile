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
    NoProductsContainer,
    NoProductsText,
} from './styles';
import { Alert, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useAuth } from '../../../hooks/auth';
import { useCamera } from '../../../hooks/camera';
import api from '../../../services/api';
import Camera from '../../../components/Camera';
import ProductDescription from '../ProductDescription';
import Button from '../../../components/Button';

interface IProduct {
    name: string;
    id: string;
    price: number;
    quantity: number;
    brand: string;
    barCode?: string;
    image?: string;
}

const Products: React.FC = () => {
    const { user } = useAuth();
    const route = useRoute();
    const navigation = useNavigation();
    const { isCameraVisible, handleCameraVisibility } = useCamera();

    const [companyProducts, setCompanyProducts] = useState<IProduct[]>([]);
    const [selectedProductIndex, setSelectedProductIndex] = useState<
        number | undefined
    >(-1);

    const [searchedText, setSearchedText] = useState('');
    const [isSearchFilled, setIsSearchFilled] = useState(false);
    const [isSearchFocused, setIsSearchFocused] = useState(false);

    useEffect(() => {
        if (user.companyId) {
            api.get(`/products/${user.companyId}`).then(response => {
                setCompanyProducts(response.data);
            });
        }
    }, [user.companyId, route.params]);

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

    const handleBarCodeRead = useCallback(
        barCode =>
            setSelectedProductIndex(() => {
                handleCameraVisibility(false);

                const findedProduct = companyProducts.findIndex(
                    product => product.barCode == barCode,
                );

                if (findedProduct == -1) {
                    Alert.alert(
                        'Código de barras inválido',
                        'Não foi encontrado nenhum produto com o código escaneado.',
                    );
                }

                return findedProduct != -1 ? findedProduct : -1;
            }),
        [companyProducts, handleCameraVisibility],
    );

    const handleProductSelection = useCallback(
        id =>
            setSelectedProductIndex(() => {
                const findedProduct = companyProducts.findIndex(
                    product => product.id == id,
                );

                return findedProduct != -1 ? findedProduct : undefined;
            }),
        [companyProducts],
    );

    return isCameraVisible ? (
        <Camera
            onBarCodeRead={event => {
                handleBarCodeRead(event.data);
            }}
        />
    ) : (
        <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
        >
            {selectedProductIndex == -1 ? (
                <Container>
                    {companyProducts.length != 0 ? (
                        <>
                            <SearchBarContainer isFocused={isSearchFocused}>
                                <Icon
                                    name="search"
                                    size={24}
                                    color={isSearchFilled ? '#374b92' : 'black'}
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

                            {searchedProducts.map((product, index) => (
                                <ProductContainer
                                    onPress={() =>
                                        handleProductSelection(product.id)
                                    }
                                    key={product.id}
                                >
                                    <ProductImageContainer
                                        hasImage={!!product.image}
                                    >
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
                                        <ProductText>
                                            {product.name}
                                        </ProductText>
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
                                        <ProductText>
                                            {product.brand}
                                        </ProductText>
                                        <ProductAvailabilityText
                                            hasInStock={product.quantity > 0}
                                        >
                                            {product.quantity > 0
                                                ? 'Em estoque'
                                                : 'Em falta'}
                                        </ProductAvailabilityText>
                                    </ProductData>
                                </ProductContainer>
                            ))}
                        </>
                    ) : (
                        <NoProductsContainer>
                            {/*Page with message for companies that not have products registered yet.*/}
                            <Icon name="info" size={100} color="#1c274e" />
                            <NoProductsText>
                                Parece que sua empresa ainda não cadastrou
                                nenhum produto, pressione o botão abaixo para
                                começar agora!
                            </NoProductsText>

                            <Button
                                biggerText
                                onPress={() =>
                                    navigation.navigate('Cadastrar produto')
                                }
                            >
                                Cadastrar Produto
                            </Button>
                        </NoProductsContainer>
                    )}
                </Container>
            ) : (
                <ProductDescription />
            )}
        </ScrollView>
    );
};

export default Products;
