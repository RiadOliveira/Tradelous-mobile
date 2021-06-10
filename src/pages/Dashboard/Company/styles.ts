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

export const CompanyContainer = styled.View`
    width: 66%;
    flex-direction: row;
    align-items: center;
`;

export const ImageContainer = styled.View``;

export const CompanyImage = styled.Image`
    width: 60px;
    height: 60px;
    border-radius: 30px;
`;

export const CompanyData = styled.View``;

export const CompanyName = styled.Text`
    margin-left: 10px;
    font-family: Poppins-Bold;
    font-size: 16px;
    color: #ffffff;
`;

export const CompanyCNPJ = styled.Text`
    margin-left: 10px;
    font-family: Poppins-Bold;
    font-size: 10px;
    color: #ffffff;
`;
