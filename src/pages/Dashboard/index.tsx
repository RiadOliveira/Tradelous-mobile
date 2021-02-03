import React from 'react';
import { Container } from './styles';
import { ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Button from '../../components/Button';
import { useAuth } from '../../hooks/auth';

const Dashboard: React.FC = () => {
    const navigation = useNavigation();
    const { signOut } = useAuth();

    return (
        <ScrollView
            contentContainerStyle={{ flex: 1 }}
            style={{ flex: 1 }}
            keyboardShouldPersistTaps="handled"
        >
            <Container>
                <Button
                    onPress={() => {
                        signOut();
                    }}
                >
                    Sair
                </Button>
            </Container>
        </ScrollView>
    );
};

export default Dashboard;
