import React from 'react';
import { Container } from './styles';
import { ScrollView, View } from 'react-native';
import Button from '../../../components/Button';
import { useAuth } from '../../../hooks/auth';

const Products: React.FC = () => {
    const { signOut } = useAuth();

    return (
        <View>
            <Button
                onPress={() => {
                    signOut();
                }}
            >
                Página de Produtos
            </Button>
        </View>
    );
};

export default Products;
