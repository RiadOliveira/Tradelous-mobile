import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const Container = styled.View`
    background-color: #49b454;
    flex: 1;
    flex-direction: column;
    align-items: center;
    padding-bottom: 30px;
`;

export const LogoView = styled.View`
    margin-top: 60px;
    margin-bottom: 40px;
`;

export const LogoImage = styled.Image`
    width: 220px;
    height: 130px;
`;

export const PickerView = styled.View`
    background-color: #ffffff;
    width: 75%;
    height: 60px;
    align-items: center;
    border-radius: 5px;
    margin-bottom: 25px;
    flex-direction: row;
    justify-content: space-evenly;
    border: 1.8px solid #1c274e;
`;

export const PickerText = styled.Text`
    font-family: Poppins-SemiBold;
    font-size: 14px;
    margin-top: 5px;
`;

export const ImageContainer = styled.View`
    position: relative;
    margin-bottom: 10px;
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
