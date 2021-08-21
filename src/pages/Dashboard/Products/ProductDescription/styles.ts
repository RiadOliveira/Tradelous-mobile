import { RectButton } from 'react-native-gesture-handler';
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

export const ProductQuantityContainer = styled.View`
    position: relative;
`;

export const SellProductButton = styled(RectButton)`
    position: absolute;
    right: 0;
    top: 0;
    background-color: #de4343;
    border-radius: 5px;
    height: 60px;
    width: 18%;
    justify-content: center;
    align-items: center;
`;

export const AuxiliarBar = styled.View`
    height: 60px;
    width: 4px;
    background-color: #de4343;
    position: absolute;
    left: 0;
`;

export const SellProductButtonText = styled.Text`
    font-family: Poppins-Bold;
    color: #ffffff;
    font-size: 13px;
`;

export const ImageContainer = styled.View`
    position: relative;
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

export const DeleteImageButton = styled(RectButton)`
    position: absolute;
    right: -10px;
    bottom: 13px;
    background-color: #de4343;
    border-radius: 25px;
    padding: 2px;
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

export const ButtonsContainer = styled.View`
    width: 80%;
    margin-top: 10px;
    flex-direction: row;
    justify-content: space-between;
`;
