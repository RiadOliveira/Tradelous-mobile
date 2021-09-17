import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

interface ImagePickerProps {
    selectedImage: string;
}

export const Container = styled.View`
    background-color: #49b454;
    flex: 1;
    flex-direction: column;
    align-items: center;
    padding: 30px 0;
`;

export const ImagePicker = styled.TouchableOpacity<ImagePickerProps>`
    background-color: #d8d8d8;
    margin-bottom: 40px;
    border-radius: 100px;

    justify-content: center;
    align-items: center;
    padding: ${props => (!!props.selectedImage ? '0px' : '25px')};

    border: 2px solid #1c274e;
`;

export const ImageContainer = styled.View``;

export const CompanyLogo = styled.Image`
    width: 192px;
    height: 192px;
    border-radius: 96px;
`;

export const DeleteImageButton = styled(RectButton)`
    position: absolute;
    right: 10px;
    bottom: 40px;
    background-color: #de4343;
    border-radius: 25px;
    padding: 2px;
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

export const ButtonsContainer = styled.View`
    width: 80%;
    margin-top: 14px;
    flex-direction: row;
    justify-content: space-between;
`;
