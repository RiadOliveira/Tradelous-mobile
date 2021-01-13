import React from 'react';
import {Container, LogoView, LogoImage} from './styles';

const SignUp: React.FC = () => (
    <Container>
        <LogoView>
            <LogoImage
                source={{
                    uri:
                        'https://s3-sa-east-1.amazonaws.com/projetos-artes/fullsize%2F2017%2F08%2F22%2F23%2FLogo-164750_454671_231322223_2120246239.jpg',
                }}
            />
        </LogoView>
    </Container>
);

export default SignUp;
