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
