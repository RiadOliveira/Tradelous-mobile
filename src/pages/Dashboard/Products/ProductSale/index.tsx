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
    ProductAvailabilityText,
} from './styles';
import { Alert, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useAuth } from '@hooks/auth';
import { useCamera } from '@hooks/camera';
import api from '@services/api';
import Camera from '@components/Camera';
import Button from '@components/Button';
import { useProducts } from '@hooks/products';

interface IProduct {
    name: string;
    id: string;
    price: number;
    quantity: number;
    brand: string;
    barCode?: string;
    image?: string;
}

const ProductsSale: React.FC = () => {
    const { product } = useRoute().params as { product: IProduct };
    const { updateProductsStatus } = useProducts();

    const navigation = useNavigation();
    const { isCameraVisible, handleCameraVisibility } = useCamera();

    const [searchedText, setSearchedText] = useState('');
    const [isSearchFilled, setIsSearchFilled] = useState(false);
    const [isSearchFocused, setIsSearchFocused] = useState(false);

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

    return (
        <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
        >
            <Container></Container>
        </ScrollView>
    );
};

export default ProductsSale;
