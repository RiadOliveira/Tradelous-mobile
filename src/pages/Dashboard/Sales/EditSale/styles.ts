import styled from 'styled-components/native';

export const Container = styled.View`
    background-color: #49b454;
    flex: 1;
    align-items: center;
    padding-bottom: 30px;
`;

export const TitleTextContainer = styled.View`
    margin: 10% 0;
    background-color: #1c274e;
    padding: 10px 30px;
    border-radius: 10px;
`;

export const TitleText = styled.Text`
    color: #fff;
    font-family: Poppins-Bold;
    font-size: 20px;
`;

export const SaleSectionsContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    width: 82%;
    height: 31%;

    margin-bottom: 16%;
`;

export const SaleSection = styled.View`
    border-radius: 8px;
    width: 44%;
    height: 100%;
    justify-content: space-evenly;

    background-color: #1c274e;
    align-items: center;
`;

export const SaleSectionTitle = styled.Text`
    font-family: Poppins-Bold;
    font-size: 14px;
    color: #ffffff;
    line-height: 20px;
    margin-top: -4%;

    border-bottom-width: 1px;
    border-bottom-color: #fff;
`;

export const SaleSectionImageContainer = styled.View`
    justify-content: center;
`;

export const SaleSectionImage = styled.Image`
    width: 90px;
    height: 90px;
    border-radius: 45px;
`;

export const SaleSectionText = styled.Text`
    font-family: Poppins-SemiBold;
    color: #ffffff;
    font-size: 11px;
`;

export const SaleSectionSubText = styled.Text`
    font-family: Poppins-SemiBold;
    color: #ffffff;
    font-size: 7.5px;

    margin-top: -13%;
`;

export const ProductSellContainer = styled.View`
    position: relative;
`;

export const TotalSellPrice = styled.View`
    position: absolute;
    right: 0;
    top: 0;
    background-color: #1c274e;
    border-radius: 5px;
    height: 60px;
    width: 22%;
    justify-content: center;
    align-items: center;
`;

export const AuxiliarBar = styled.View`
    height: 60px;
    width: 4px;
    background-color: #1c274e;
    position: absolute;
    left: 0;
`;

export const TotalSellPriceText = styled.Text`
    font-family: Poppins-Bold;
    color: #ffffff;
    font-size: 12px;
    text-align: center;
`;

export const PickerView = styled.View`
    background-color: #ffffff;
    width: 82%;
    height: 60px;

    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 14%;

    border-radius: 5px;
    border: 1.8px solid #1c274e;
`;

export const PickerText = styled.Text`
    font-family: Poppins-SemiBold;
    font-size: 14px;
    margin-top: 5px;
    margin-left: 10px;
`;
