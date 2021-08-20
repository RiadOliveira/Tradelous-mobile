import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
    Container,
    SearchBarContainer,
    SearchBar,
    BarCodeButton,
    ProductContainer,
    ProductImageContainer,
    ProductImage,
    ProductData,
    ProductText,
    ProductAvailabilityText,
    NoProductsContainer,
    NoProductsText,
} from './styles';
import { ScrollView, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '@hooks/auth';
import { useCamera } from '@hooks/camera';
import { useProducts } from '@hooks/products';

import api from '@services/api';
import Camera from '@components/Camera';
import Button from '@components/Button';
import Toast from 'react-native-toast-message';
import formatPrice from '@utils/formatPrice';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface IProduct {
    name: string;
    id: string;
    price: number;
    quantity: number;
    brand: string;
    barCode?: string;
    image?: string;
}

const ProductsList: React.FC = () => {
    const { user } = useAuth();
    const { productsStatus, updateProductsStatus } = useProducts();

    const navigation = useNavigation();
    const { isCameraVisible, handleCameraVisibility } = useCamera();

    const [companyProducts, setCompanyProducts] = useState<IProduct[]>([]);
    const [hasLoadedProducts, setHasLoadedProducts] = useState(false);

    const [searchedText, setSearchedText] = useState('');
    const [isSearchFilled, setIsSearchFilled] = useState(false);
    const [isSearchFocused, setIsSearchFocused] = useState(false);

    useEffect(() => {
        if (
            user.companyId &&
            (productsStatus == 'newProduct' || companyProducts.length === 0)
        ) {
            api.get('/products').then(response => {
                setCompanyProducts(response.data);
                setHasLoadedProducts(true);
            });
        } else if (
            productsStatus !== 'noChanges' &&
            productsStatus !== 'newProduct'
        ) {
            if (productsStatus.id.includes('deleted')) {
                //To delete a product needs to pass deleted + product.id to productsStatus.
                const deletedProductId = productsStatus.id.split(' ')[1]; //Gets the id.

                setCompanyProducts(
                    products =>
                        products.filter(
                            product => product.id !== deletedProductId,
                        ), //Update state without api recall.
                );
            } else {
                setCompanyProducts(products =>
                    products.map(product =>
                        product.id !== productsStatus.id
                            ? product
                            : productsStatus,
                    ),
                );
            }
        }

        updateProductsStatus('noChanges');
    }, [
        user.companyId,
        productsStatus,
        companyProducts.length,
        updateProductsStatus,
    ]);

    const apiStaticUrl = useMemo(
        () => `${api.defaults.baseURL}/files/productImage`,
        [],
    );

    const formattedPrices = useMemo(
        () => companyProducts.map(product => formatPrice(product.price)),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [companyProducts, productsStatus],
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
        barCode => {
            const findedProductIndex = companyProducts.findIndex(
                product => product.barCode == barCode,
            );

            handleCameraVisibility(false);

            if (findedProductIndex == -1) {
                Toast.show({
                    type: 'error',
                    text1: 'Código de barras inválido',
                    text2:
                        'Não foi encontrado nenhum produto com o código escaneado.',
                });
            } else {
                navigation.navigate(
                    'ProductDescription',
                    companyProducts[findedProductIndex],
                );
            }
        },
        [companyProducts, handleCameraVisibility, navigation],
    );

    const handleProductSelection = useCallback(
        product => navigation.navigate('ProductDescription', product),
        [navigation],
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
            {!hasLoadedProducts ? (
                <ActivityIndicator
                    size={64}
                    color="#374b92"
                    style={{ backgroundColor: '#49b454', flex: 1 }}
                />
            ) : (
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
                                    <Icon
                                        name="qr-code-scanner"
                                        size={24}
                                        color="#374b92"
                                    />
                                </BarCodeButton>
                            </SearchBarContainer>

                            {searchedProducts.map((product, index) => (
                                <ProductContainer
                                    onPress={() =>
                                        handleProductSelection(product)
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
                                                size={40}
                                                color="#ffffff"
                                            />
                                        )}
                                    </ProductImageContainer>

                                    <ProductData style={{ marginLeft: '1%' }}>
                                        <ProductText>
                                            {product.name}
                                        </ProductText>

                                        <ProductData
                                            style={{
                                                flexDirection: 'row',
                                                width: '98%',
                                            }}
                                        >
                                            <ProductText>
                                                {formattedPrices[index]}
                                            </ProductText>

                                            <ProductText>
                                                {product.brand}
                                            </ProductText>

                                            <ProductAvailabilityText
                                                hasInStock={
                                                    product.quantity > 0
                                                }
                                            >
                                                {product.quantity > 0
                                                    ? 'Em estoque'
                                                    : 'Em falta'}
                                            </ProductAvailabilityText>
                                        </ProductData>
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
                                    navigation.navigate('RegisterProduct')
                                }
                            >
                                Cadastrar Produto
                            </Button>
                        </NoProductsContainer>
                    )}
                </Container>
            )}
        </ScrollView>
    );
};

export default ProductsList;
