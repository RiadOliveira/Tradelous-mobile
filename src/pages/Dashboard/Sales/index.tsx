import React, { useEffect, useMemo, useState } from 'react';
import {
    Container,
    Employee,
    EmployeeData,
    EmployeeName,
    EmployeeEmail,
    EmployeeImage,
    EmployeeIcon,
} from './styles';
import { ActivityIndicator, ScrollView } from 'react-native';
import { useAuth } from '@hooks/auth';
import api from '@services/api';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface IEmployee {
    id: string;
    name: string;
    email: string;
    avatar: string;
    isAdmin: boolean;
}

const Sales: React.FC = () => {
    const { user } = useAuth();

    const [hasLoadedCompany, setHasLoadedCompany] = useState(false);
    const [employees, setEmployees] = useState<IEmployee[]>([]); //Needs to add on the screen.

    const apiStaticUrl = useMemo(() => `${api.defaults.baseURL}/files`, []);

    useEffect(() => {
        api.get('/company/list-employees').then(response => {
            setEmployees(response.data);
            setHasLoadedCompany(true);
        });
    }, [user]);

    const orderedEmployees = useMemo(() => {
        const admin =
            employees.find(employee => employee.isAdmin) || ({} as IEmployee); //Always will have a admin.

        const allEmployees = employees.filter(employee => !employee.isAdmin);

        return [admin, ...allEmployees];
    }, [employees]);

    return (
        <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
        >
            {!hasLoadedCompany ? (
                <ActivityIndicator
                    size={64}
                    color="#374b92"
                    style={{ backgroundColor: '#49b454', flex: 1 }}
                />
            ) : (
                <Container>
                    {orderedEmployees.map(employee => (
                        <Employee key={employee.id}>
                            <EmployeeData isAdmin={employee.isAdmin}>
                                <EmployeeName>{employee.name}</EmployeeName>
                                <EmployeeEmail>{employee.email}</EmployeeEmail>
                            </EmployeeData>

                            <EmployeeIcon isAdmin={employee.isAdmin}>
                                {employee.avatar ? (
                                    <EmployeeImage
                                        source={{
                                            uri: `${apiStaticUrl}/avatar/${employee.avatar}`,
                                        }}
                                    />
                                ) : (
                                    <Icon
                                        name="person"
                                        size={30}
                                        color="#ffffff"
                                    />
                                )}
                            </EmployeeIcon>
                        </Employee>
                    ))}
                </Container>
            )}
        </ScrollView>
    );
};

export default Sales;
