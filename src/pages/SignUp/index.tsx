import React from 'react';
import {Container, LogoView, LogoImage} from './styles';

const SignUp: React.FC = () => (
    <Container>
        <LogoView>
            <LogoImage
                source={{
                    uri:
                        'https://e7.pngegg.com/pngimages/823/944/png-clipart-horseshoe-magnet-refrigerator-magnet-magnet-technic-cartoon.png',
                }}
            />
        </LogoView>
    </Container>
);

export default SignUp;
