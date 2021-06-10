import styled from 'styled-components/native';

export const Container = styled.View`
    background-color: #49b454;
    flex: 1;
    flex-direction: column;
    align-items: center;
    padding-bottom: 30px;
`;

export const CompanyContainer = styled.View`
    width: 66%;
    flex-direction: row;
    align-items: center;
    margin-top: 10%;
    position: relative;
`;

export const ImageContainer = styled.View``;

export const CompanyImage = styled.Image`
    width: 100px;
    height: 100px;
    border-radius: 50px;
`;

export const CompanyIcon = styled.View`
    width: 100px;
    height: 100px;
    background-color: #5170e0;
    border-radius: 50px;
    justify-content: center;
    align-items: center;
`;

export const CompanyData = styled.View`
    background-color: #1c274e;
    height: 100px;
    width: 90%;
    justify-content: center;
    align-items: flex-end;
    position: absolute;
    left: 12%;
    border-radius: 20px;
`;

export const CompanyName = styled.Text`
    margin-left: 10px;
    font-family: Poppins-Bold;
    font-size: 16px;
    color: #ffffff;
    margin-right: 22%;
`;

export const CompanyCNPJ = styled.Text`
    margin-left: 10px;
    font-family: Poppins-Bold;
    font-size: 10px;
    color: #ffffff;
    margin-right: 16%;
`;
