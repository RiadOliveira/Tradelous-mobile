import React from 'react';
import { RectButtonProperties } from 'react-native-gesture-handler';
import { Container, Content } from './styles';

interface ButtonProps extends RectButtonProperties {
    smallerText?: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
    return (
        <Container {...props}>
            <Content>{children}</Content>
        </Container>
    );
};

export default Button;
