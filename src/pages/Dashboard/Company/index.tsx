import React from 'react';
import { Container } from './styles';
import { Alert, Dimensions, ScrollView } from 'react-native';
import { useAuth } from '@hooks/auth';
import api from '@services/api';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width } = Dimensions.get('screen');

const Company: React.FC = () => {
    const { user } = useAuth();

    return (
        <ScrollView
            contentContainerStyle={{
                width,
            }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
        >
            <Container></Container>
        </ScrollView>
    );
};

export default Company;
