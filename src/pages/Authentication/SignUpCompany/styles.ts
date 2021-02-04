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

export const LogoView = styled.View`
    margin-top: 60px;
    margin-bottom: 40px;
`;

export const LogoImage = styled.Image`
    width: 200px;
    height: 100px;
`;

export const PickerView = styled.View`
    background-color: #ffffff;
    width: 300px;
    height: 60px;
    align-items: center;
    border-radius: 5px;
    margin-bottom: 20px;
    flex-direction: row;
    justify-content: space-evenly;
    border: 1.8px solid #1c274e;
`;

export const PickerText = styled.Text`
    font-family: Poppins-SemiBold;
    font-size: 14px;
    margin-top: 5px;
`;

export const ImagePicker = styled.TouchableOpacity<ImagePickerProps>`
    width: 100px;
    height: 100px;
    background-color: #d8d8d8;
    border-radius: 20px;
    margin-bottom: 15px;
    justify-content: center;
    align-items: center;
    border: 1.5px solid #1c274e;
`;

export const ImageHighlight = styled.Image`
    width: 97.75px;
    height: 97.75px;
    border-radius: 20px;
`;
