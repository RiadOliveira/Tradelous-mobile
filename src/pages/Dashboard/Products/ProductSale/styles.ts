import styled from 'styled-components/native';

export const Container = styled.View`
    background-color: #49b454;
    flex: 1;
    flex-direction: column;
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

export const ImageContainer = styled.View`
    width: 100px;
    height: 100px;
    background-color: #d8d8d8;
    border-radius: 20px;
    margin-bottom: 25px;
    justify-content: center;
    align-items: center;
    border: 1.5px solid #1c274e;
`;

export const ImageHighlight = styled.Image`
    width: 97.75px;
    height: 97.75px;
    border-radius: 20px;
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
    width: 75%;
    height: 60px;
    align-items: center;
    border-radius: 5px;
    margin-bottom: 25px;
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
