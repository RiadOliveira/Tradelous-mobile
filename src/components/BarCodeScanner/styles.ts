import styled from 'styled-components/native';

export const Container = styled.View`
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

export const BarCodeValueButton = styled.TouchableOpacity`
    margin-top: 1%;

    max-width: 68%;
    text-align: center;
`;

export const BarCodeValue = styled.Text`
    font-family: Poppins-Regular;
    font-size: 13px;
    color: #8e8e8e;
`;

export const BarCodeButton = styled.TouchableOpacity`
    position: absolute;
    right: 12px;
`;
