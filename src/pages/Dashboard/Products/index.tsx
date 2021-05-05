import React, {
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import {
    Container,
    Icon,
    ReturnButton,
    FlashButton,
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
import { ScrollView, View, BackHandler } from 'react-native';
import { RNCamera } from 'react-native-camera';
import BarcodeMask from 'react-native-barcode-mask';
import { useAuth } from '../../../hooks/auth';
import api from '../../../services/api';

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
    const camera = useRef<RNCamera>(null);

    const [companyProducts, setCompanyProducts] = useState<IProduct[]>([]);

    const [searchedText, setSearchedText] = useState('');
    const [isSearchFilled, setIsSearchFilled] = useState(false);
    const [isSearchFocused, setIsSearchFocused] = useState(false);

    const [isCameraVisible, setIsCameraVisible] = useState(false);
    const [isFlashEnabled, setIsFlashEnabled] = useState(false);

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

    const handleCameraVisibility = useCallback(() => {
        setIsCameraVisible(true);

        BackHandler.addEventListener('hardwareBackPress', () => {
            setIsCameraVisible(false);

            BackHandler.removeEventListener('hardwareBackPress', () => null);

            return null;
        });
    }, []);

    const handleCameraFlash = useCallback(() => {
        setIsFlashEnabled(flashValue => !flashValue);
    }, []);

    return isCameraVisible ? (
        <>
            <RNCamera
                ref={camera}
                captureAudio={false}
                style={{ flex: 1 }}
                onBarCodeRead={event => {
                    //It needs to create a external function to handle barCode read.
                    console.log(event.data);
                    setIsCameraVisible(false);
                }}
                flashMode={isFlashEnabled ? 'torch' : 'off'}
            >
                <BarcodeMask
                    animatedLineColor="#49b454"
                    animatedLineWidth={'95%'}
                    lineAnimationDuration={2500}
                    height="25%"
                    width="80%"
                />
            </RNCamera>
            <ReturnButton
                activeOpacity={0.4}
                onPress={() => {
                    setIsCameraVisible(false);
                }}
            >
                <Icon name="arrow-back" size={32} color="#ffffff" />
            </ReturnButton>

            <FlashButton
                activeOpacity={0.4}
                onPress={() => {
                    handleCameraFlash();
                }}
            >
                {isFlashEnabled ? (
                    <Icon name="flash-on" size={32} color="#ffffff" />
                ) : (
                    <Icon name="flash-off" size={32} color="#ffffff" />
                )}
            </FlashButton>
        </>
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
                        onPress={() => handleCameraVisibility()}
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
