import React from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
