import React from 'react';
import { AuthContext } from './auth';
import { CameraContext } from './camera';
import { ProductsContext } from './products';

const ContextsProvider: React.FC = ({ children }) => (
    <AuthContext>
        <CameraContext>
            <ProductsContext>{children}</ProductsContext>
        </CameraContext>
    </AuthContext>
);

export default ContextsProvider;
