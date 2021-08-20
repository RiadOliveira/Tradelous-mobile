import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

interface SearchInputProps {
    isFocused: boolean;
}

interface ProductAvailabilityProps {
    hasInStock: boolean;
}

export const Container = styled.View`
    background-color: #49b454;
    flex: 1;
    flex-direction: column;
    align-items: center;
    padding-bottom: 30px;
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

export const BarCodeButton = styled.TouchableOpacity`
    padding: 7px 0px;
`;

export const ProductContainer = styled(RectButton)`
    flex-direction: row;
    width: 75%;
    height: 64px;
    border-radius: 8px;
    background-color: #1c274e;
    align-items: center;
    margin-bottom: 16px;
`;

export const ProductImageContainer = styled.View`
    height: 100%;
    justify-content: center;

    margin-right: 10px;
    margin-left: 10px;
`;

export const ProductImage = styled.Image`
    width: 44px;
    height: 44px;
    border-radius: 20px;
`;

export const ProductData = styled.View`
    margin-top: 1%;
    width: 72%;
    justify-content: space-between;
`;

export const ProductText = styled.Text`
    font-family: Poppins-Regular;
    color: #ffffff;
    font-size: 11px;
`;

export const ProductAvailabilityText = styled.Text<ProductAvailabilityProps>`
    font-family: Poppins-Regular;
    color: #ffffff;
    font-size: 11px;

    color: ${props => (props.hasInStock ? '#68e043' : '#eb2a2a')};
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
