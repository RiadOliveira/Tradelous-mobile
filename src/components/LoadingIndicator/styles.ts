import styled from 'styled-components';
import { ActivityIndicator } from 'react-native';

export const Container = styled(ActivityIndicator)`
    background-color: #49b454;
    position: absolute;

    width: 100%;
    height: 100%;
    z-index: 1;
`;
