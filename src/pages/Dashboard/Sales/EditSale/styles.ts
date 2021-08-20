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
    color: #3680e0;
    font-family: Poppins-Bold;
    font-size: 20px;
`;

export const SaleSectionTitle = styled.View`
    align-items: flex-start;
`;

export const SaleSectionTitleText = styled.Text`
    align-items: flex-start;
`;

export const ProductContainer = styled.View`
    flex-direction: row;
    width: 75%;
    height: 64px;
    border-radius: 8px;
    background-color: #1c274e;
    align-items: center;
    margin-bottom: 16px;
`;

export const ProductImageContainer = styled.View`
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
