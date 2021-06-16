import styled, { css } from 'styled-components/native';
import icon from 'react-native-vector-icons/MaterialIcons';
import { RectButton } from 'react-native-gesture-handler';

interface SearchInputProps {
    isFocused: boolean;
}

interface ProductImageContainerProps {
    hasImage: boolean;
}

interface ProductAvailabilityProps {
    hasInStock: boolean;
}

export const Container = styled.View`
    background-color: #49b454;
    flex: 1;
    flex-direction: column;
    align-items: center;
`;

export const SearchBarContainer = styled.View<SearchInputProps>`
    background-color: #ffffff;
    width: 75%;
    height: 60px;
    align-items: center;
    border-radius: 5px;
    flex-direction: row;
    padding: 1.8px;
    margin: 10% 0;

    border: ${props => (props.isFocused ? '1.5px solid #1c274e' : 'none')};
`;

export const SearchBar = styled.TextInput`
    font-family: Poppins-Regular;
    font-size: 15px;
    flex: 1;
    margin-top: 5px;
`;

export const Icon = styled(icon)`
    margin-left: 12px;
    margin-right: 12px;
`;

export const BarCodeButton = styled.TouchableOpacity`
    padding: 7px 0px;
`;

export const ProductContainer = styled(RectButton)`
    flex-direction: row;
    width: 75%;
    height: 64px;
    border-radius: 15px;
    background-color: #5170e0;
    align-items: center;
    margin-bottom: 12px;
`;

export const ProductImageContainer = styled.View<ProductImageContainerProps>`
    height: 100%;
    justify-content: center;
    margin-right: 5px;
    margin-left: 5px;

    ${props =>
        props.hasImage
            ? css`
                  margin-right: 10px;
                  margin-left: 10px;
              `
            : null}
`;

export const ProductImage = styled.Image`
    width: 48px;
    height: 48px;
    border-radius: 24px;
`;

export const ProductData = styled.View`
    justify-content: center;
`;

export const ProductText = styled.Text`
    font-family: Poppins-Regular;
    color: #ffffff;
    font-size: 12px;
    margin-bottom: -3px;
`;

export const ProductPriceText = styled.Text`
    font-family: Poppins-Regular;
    color: #ffffff;
    font-size: 10px;
`;

export const ProductAvailabilityText = styled.Text<ProductAvailabilityProps>`
    font-family: Poppins-Regular;
    color: #ffffff;
    font-size: 12px;
    margin-bottom: -3px;

    color: ${props => (props.hasInStock ? '#68e043' : '#ba1818')};
`;

export const NoProductsContainer = styled.View`
    height: 100%;
    width: 80%;
    justify-content: center;
    align-items: center;
`;

export const NoProductsText = styled.Text`
    font-family: Poppins-Bold;
    color: #1c274e;
    font-size: 16px;
    text-align: center;

    margin-bottom: 20px;
`;
