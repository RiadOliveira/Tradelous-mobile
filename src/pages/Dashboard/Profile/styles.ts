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

export const SignOutButton = styled(RectButton)`
    background-color: #1c274e;
    width: 60px;
    height: 60px;
    padding: 0px 5px 5px 5px;
    border-radius: 30px;
    justify-content: center;
    align-items: center;
    margin-top: -20px;
    margin-bottom: 40px;
`;

export const SignOutButtonText = styled.Text`
    font-family: 'Poppins-Bold';
    color: #ffffff;
    font-size: 15px;
    margin-top: 20px;
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

export const ProfileImage = styled.Image`
    width: 180px;
    height: 180px;
    border-radius: 90px;
`;
