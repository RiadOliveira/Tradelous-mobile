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

export const ImagePicker = styled.TouchableOpacity`
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

export const BarCodeScannerContainer = styled.View`
    background-color: #ffffff;
    width: 75%;
    height: 60px;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    margin-bottom: 25px;
    flex-direction: row;
    padding: 1.8px;

    position: relative;
`;

export const BarCodeValue = styled.Text`
    font-family: Poppins-Regular;
    font-size: 15px;
    color: #8e8e8e;
    margin-top: 1%;
`;

export const BarCodeButton = styled.TouchableOpacity`
    position: absolute;
    right: 12px;
`;
