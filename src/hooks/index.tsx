import React from 'react';
import { AuthContext } from './auth';
import { CameraContext } from './camera';
import { ModalContext } from './modal';
import { ProductsContext } from './products';

const ContextsProvider: React.FC = ({ children }) => (
    <AuthContext>
        <CameraContext>
            <ProductsContext>
                <ModalContext>{children}</ModalContext>
            </ProductsContext>
        </CameraContext>
    </AuthContext>
);

export default ContextsProvider;
