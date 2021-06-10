import React, { createContext, useCallback, useContext, useState } from 'react';

interface IProduct {
    name: string;
    id: string;
    price: number;
    quantity: number;
    brand: string;
    barCode?: string;
    image?: string;
}

interface ProductsContextInterface {
    productsStatus: IProduct | 'newProduct' | 'noChanges'; //IProduct when modified some product (contains the product).
    updateProductsStatus(products: IProduct | 'newProduct' | 'noChanges'): void;
}

const productsContext = createContext<ProductsContextInterface>(
    {} as ProductsContextInterface,
);

const ProductsContext: React.FC = ({ children }) => {
    const [productsStatus, setProductsStatus] = useState<
        IProduct | 'newProduct' | 'noChanges'
    >('noChanges');

    const updateProductsStatus = useCallback(
        (product: IProduct | 'newProduct' | 'noChanges') => {
            setProductsStatus(product);
        },
        [],
    );

    return (
        <productsContext.Provider
            value={{ productsStatus, updateProductsStatus }}
        >
            {children}
        </productsContext.Provider>
    );
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useProducts = () => useContext(productsContext);

export { ProductsContext, useProducts };
