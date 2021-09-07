import styled from 'styled-components/native';

interface SaleIconProps {
    hasImage: boolean;
}

export const Container = styled.View`
    background-color: #49b454;
    flex: 1;
    flex-direction: column;
    align-items: center;
`;

export const FilterContainer = styled.View`
    background-color: #ffffff;
    width: 75%;
    height: 64px;
    align-items: center;
    justify-content: space-around;
    border-radius: 5px;
    flex-direction: row;
    padding: 1.8px;
    margin: 10% 0;

    border: 1.5px solid #1c274e;
`;

export const PickerView = styled.View`
    width: 48%;
    height: 42px;
    border: 2px solid #374b92;
    border-radius: 15px;

    justify-content: center;
`;

export const DatePickerButton = styled.TouchableOpacity``;

export const Sale = styled.TouchableOpacity`
    flex-direction: row;
    width: 58%;
    height: 64px;
    border-radius: 8px;
    background-color: #1c274e;
    align-items: center;
    margin-bottom: 16px;
`;

export const SaleData = styled.View`
    margin-top: 1%;
    flex-direction: row;
    justify-content: space-between;
    width: 94%;
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

    margin-right: 10px;
    margin-left: 10px;
`;
