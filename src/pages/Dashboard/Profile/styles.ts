import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const Container = styled.View`
    background-color: #49b454;
    flex: 1;
    flex-direction: column;
    align-items: center;
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
    margin-bottom: 50px;
`;

export const SignOutButtonText = styled.Text`
    font-family: 'Poppins-Bold';
    color: #ffffff;
    font-size: 15px;
    margin-top: 20px;
`;

export const ProfileImageContainer = styled.TouchableOpacity`
    margin-bottom: 60px;
`;

export const ProfileImage = styled.Image`
    width: 180px;
    height: 180px;
    border-radius: 90px;
`;
