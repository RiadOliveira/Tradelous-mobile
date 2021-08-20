import styled, { css } from 'styled-components/native';
import icon from 'react-native-vector-icons/MaterialIcons';

interface SaleIconProps {
    hasImage: boolean;
}

export const Container = styled.View`
    background-color: #49b454;
    flex: 1;
    flex-direction: column;
    align-items: center;
    padding-bottom: 30px;
`;

export const FilterContainer = styled.View`
    background-color: #ffffff;
    width: 75%;
    height: 64px;
    align-items: center;
    justify-content: space-between;
    border-radius: 5px;
    flex-direction: row;
    padding: 1.8px;
    margin: 10% 0;

    border: 1.5px solid #1c274e;
`;

export const Icon = styled(icon)`
    margin-left: 12px;
    margin-right: 12px;
`;

export const PickerView = styled.View`
    width: 45%;
    height: 42px;
    border: 2px solid #374b92;
    border-radius: 15px;
`;

export const DatePickerButton = styled.TouchableOpacity``;

export const Sale = styled.TouchableOpacity`
    flex-direction: row;
    width: 75%;
    height: 64px;
    border-radius: 8px;
    background-color: #1c274e;
    align-items: center;
    margin-bottom: 16px;
`;

export const SaleData = styled.View`
    margin-top: 1%;
    width: 72%;
    justify-content: space-between;
`;

export const SaleText = styled.Text`
    font-family: Poppins-Regular;
    color: #ffffff;
    font-size: 11px;
`;

export const SaleImage = styled.Image`
    width: 44px;
    height: 44px;
    border-radius: 20px;
`;

export const SaleIcon = styled.View<SaleIconProps>`
    height: 100%;
    justify-content: center;

    ${props =>
        props.hasImage
            ? css`
                  margin-right: 12px;
                  margin-left: 10px;
              `
            : null}
`;
