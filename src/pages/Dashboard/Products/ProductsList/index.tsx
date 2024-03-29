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
    NoProductsContainer,
    NoProductsText,
} from './styles';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '@hooks/auth';
import { useCamera } from '@hooks/camera';
import { IProduct, useProducts } from '@hooks/products';

import api from '@services/api';
import Button from '@components/Button';
import Toast from 'react-native-toast-message';
import formatPrice from '@utils/formatPrice';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { FlatList } from 'react-native-gesture-handler';
import LoadingIndicator from '@components/LoadingIndicator';

const ProductsList: React.FC = () => {
    const { user } = useAuth();
    const { productsStatus, updateProductsStatus } = useProducts();

    const navigation = useNavigation();
    const { showCamera, setBarCodeReadFunction } = useCamera();

    const [companyProducts, setCompanyProducts] = useState<IProduct[]>([]);
    const [hasLoadedProducts, setHasLoadedProducts] = useState(false);

    const [searchedText, setSearchedText] = useState('');
    const [isSearchFilled, setIsSearchFilled] = useState(false);
    const [isSearchFocused, setIsSearchFocused] = useState(false);

    useEffect(() => {
        if (
            user.companyId &&
            (productsStatus === 'newProduct' || companyProducts.length === 0)
        ) {
            //If has a new product or hasn't get the products yet.
            api.get('/products').then(({ data }) => {
                setCompanyProducts(data);
                setHasLoadedProducts(true);
            });
        } else if (typeof productsStatus !== 'string') {
            //If selected product has been deleted.
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
        () => `${api.defaults.baseURL}/files/product-image`,
        [],
    );

    const formattedPrices = useMemo(
        () => companyProducts.map(product => formatPrice(product.price)),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [companyProducts, productsStatus],
    );

    const handleChangeSearch = useCallback((event: string) => {
        if (event) setIsSearchFilled(true);
        else setIsSearchFilled(false);
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
        [companyProducts, navigation],
    );

    const handleProductSelection = useCallback(
        product => navigation.navigate('ProductDescription', product),
        [navigation],
    );

    return (
        <Container>
            {!hasLoadedProducts && <LoadingIndicator />}

            {companyProducts.length != 0 ? (
                <>
                    <SearchBarContainer isFocused={isSearchFocused}>
                        <Icon
                            name="search"
                            size={24}
                            color={isSearchFilled ? '#374b92' : 'black'}
                            style={{ marginLeft: 10, marginRight: 10 }}
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
                            onPress={() => {
                                showCamera();
                                setBarCodeReadFunction(handleBarCodeRead);
                            }}
                            activeOpacity={0.4}
                        >
                            <Icon
                                name="qr-code-scanner"
                                size={24}
                                color="#374b92"
                                style={{
                                    marginLeft: 10,
                                    marginRight: 10,
                                }}
                            />
                        </BarCodeButton>
                    </SearchBarContainer>

                    <FlatList
                        style={{
                            width: '100%',
                            paddingTop: 10,
                        }}
                        contentContainerStyle={{
                            alignItems: 'center',
                            paddingBottom: '8%',
                        }}
                        showsVerticalScrollIndicator={false}
                        data={searchedProducts}
                        keyExtractor={product => product.id}
                        renderItem={({ item, index }) => (
                            <ProductContainer
                                onPress={() => handleProductSelection(item)}
                            >
                                <ProductImageContainer>
                                    {item.image ? (
                                        <ProductImage
                                            source={{
                                                uri: `${apiStaticUrl}/${item.image}`,
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
                                    <ProductText>{item.name}</ProductText>

                                    <ProductData
                                        style={{
                                            flexDirection: 'row',
                                            width: '94%',
                                        }}
                                    >
                                        <ProductText>{item.brand}</ProductText>

                                        <ProductText>
                                            {formattedPrices[index]}
                                        </ProductText>
                                    </ProductData>
                                </ProductData>
                            </ProductContainer>
                        )}
                    />
                </>
            ) : (
                <NoProductsContainer>
                    {/*Page with message for companies that not have products registered yet.*/}
                    <Icon name="info" size={100} color="#1c274e" />
                    <NoProductsText>
                        Parece que sua empresa ainda não cadastrou nenhum
                        produto, pressione o botão abaixo para começar agora!
                    </NoProductsText>

                    <Button
                        onPress={() => navigation.navigate('RegisterProduct')}
                    >
                        Cadastrar Produto
                    </Button>
                </NoProductsContainer>
            )}
        </Container>
    );
};

export default ProductsList;
