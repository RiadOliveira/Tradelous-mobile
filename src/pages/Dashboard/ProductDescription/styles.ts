import styled from 'styled-components/native';
import icon from 'react-native-vector-icons/MaterialIcons';
import { RectButton } from 'react-native-gesture-handler';

interface ProductImageContainerProps {
    hasImage: boolean;
}

export const Container = styled.View`
    background-color: #49b454;
    flex: 1;
    flex-direction: column;
    align-items: center;
`;

export const Icon = styled(icon)`
    margin-left: 10px;
    margin-right: 10px;
`;

export const BarCodeButton = styled.TouchableOpacity`
    padding: 7px 0px;
`;
