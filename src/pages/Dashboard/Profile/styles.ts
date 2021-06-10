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
    padding-bottom: 30px;
`;

export const Header = styled.View`
    width: 100%;
    height: 8%;
    align-items: flex-end;
`;

export const SignOutButton = styled(RectButton)`
    background-color: #1c274e;
    width: 75px;
    height: 70px;
    border-radius: 20px;
    margin-top: -15px;
    margin-right: -15px;

    position: relative;
`;

export const SignOutButtonText = styled.Text`
    font-family: 'Poppins-Bold';
    color: #ffffff;
    font-size: 16px;
    position: absolute;
    bottom: 18%;
    left: 18%;
`;

export const ImagePicker = styled.TouchableOpacity<ImagePickerProps>`
    background-color: #d8d8d8;
    border-radius: 100px;
    margin-bottom: 40px;
    justify-content: center;
    align-items: center;
    padding: ${props => (!!props.selectedImage ? '0px' : '10px')};
    border: 1px solid #1c274e;
`;

export const ImageContainer = styled.View``;

export const ProfileImage = styled.Image`
    width: 180px;
    height: 180px;
    border-radius: 90px;
`;

export const DeleteImageButton = styled(RectButton)`
    position: absolute;
    right: 10px;
    bottom: 40px;
    background-color: #de4343;
    border-radius: 25px;
    padding: 2px;
`;
