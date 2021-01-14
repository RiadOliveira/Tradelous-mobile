import React from 'react';
import {RectButtonProperties} from 'react-native-gesture-handler';
import {Container, Content} from './styles';

const Button: React.FC<RectButtonProperties> = ({children, ...props}) => {
    return (
        <Container {...props}>
            <Content>{children}</Content>
        </Container>
    );
};

export default Button;
