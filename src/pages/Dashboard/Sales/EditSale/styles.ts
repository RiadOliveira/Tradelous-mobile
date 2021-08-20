import styled from 'styled-components/native';

export const Container = styled.View`
    background-color: #49b454;
    flex: 1;
    flex-direction: column;
    align-items: center;
    padding-bottom: 30px;
`;

export const TitleTextContainer = styled.View`
    margin: 10% 0 8%;
    background-color: #1c274e;
    padding: 10px 30px;
    border-radius: 10px;
`;

export const TitleText = styled.Text`
    color: #3680e0;
    font-family: Poppins-Bold;
    font-size: 20px;
`;

export const SaleSectionTitle = styled.View`
    align-items: flex-start;
    width: 75%;
    justify-content: center;
`;

export const SaleSectionTitleText = styled.Text`
    font-family: 'Poppins-Bold';
    font-size: 16px;
    color: #ffffff;
    background-color: #1c274e;

    border-radius: 8px;
    padding: 4px 8px 0.6px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
`;

export const SaleSection = styled.View`
    flex-direction: row;
    width: 75%;
    height: 64px;
    border-radius: 8px;
    background-color: #1c274e;
    align-items: center;
    margin-bottom: 16px;

    border-top-left-radius: 0;
`;

export const SaleSectionImageContainer = styled.View`
    justify-content: center;

    margin-right: 10px;
    margin-left: 10px;
`;

export const SaleSectionImage = styled.Image`
    width: 44px;
    height: 44px;
    border-radius: 20px;
`;

export const SaleSectionData = styled.View`
    margin-top: 1%;
    width: 72%;
    justify-content: space-between;
`;

export const SaleSectionText = styled.Text`
    font-family: Poppins-Regular;
    color: #ffffff;
    font-size: 11px;
`;

export const ProductSellContainer = styled.View`
    position: relative;
    margin-top: 8%;
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
    width: 75%;
    height: 60px;
    align-items: center;
    border-radius: 5px;
    flex-direction: row;
    justify-content: space-between;
    border: 1.8px solid #1c274e;
`;

export const PickerText = styled.Text`
    font-family: Poppins-SemiBold;
    font-size: 14px;
    margin-top: 5px;
    margin-left: 10px;
`;
