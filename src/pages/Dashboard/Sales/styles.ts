import styled from 'styled-components/native';
import icon from 'react-native-vector-icons/MaterialIcons';

export const Container = styled.View`
    background-color: #49b454;
    flex: 1;
    flex-direction: column;
    align-items: center;
    padding-bottom: 30px;
`;

export const FilterContainer = styled.View`
    background-color: #ffffff;
    width: 75%;
    height: 60px;
    align-items: center;
    justify-content: space-between;
    border-radius: 5px;
    flex-direction: row;
    padding: 1.8px;
    margin: 10% 0;
`;

export const Icon = styled(icon)`
    margin-left: 12px;
    margin-right: 12px;
`;

export const PickerView = styled.View`
    width: 44%;
    height: 50px;
`;

export const DatePickerButton = styled.TouchableOpacity``;

export const Sale = styled.View`
    width: 66%;
    flex-direction: row;
    position: relative;
    margin-bottom: 4%;
`;

export const SaleData = styled.View`
    background-color: #2c3f82;
    height: 60px;
    width: 97%;
    position: absolute;
    justify-content: center;
    align-items: flex-start;
    left: 5%;
    border-radius: 20px;
`;

export const SaleName = styled.Text`
    margin-left: 10px;
    font-family: Poppins-Bold;
    font-size: 14px;
    color: #ffffff;
    margin-left: 22%;
`;

export const SaleSub = styled.Text`
    margin-left: 10px;
    font-family: Poppins-Bold;
    font-size: 8.5px;
    color: #ffffff;
    margin-left: 22.5%;
`;

export const SaleImage = styled.Image`
    width: 58px;
    height: 58px;
    border-radius: 29px;
`;

export const SaleIcon = styled.View`
    width: 60px;
    height: 60px;
    background-color: #5170e0;
    border-radius: 30px;
    justify-content: center;
    align-items: center;
    border: 2px solid #2c3f82;
`;
