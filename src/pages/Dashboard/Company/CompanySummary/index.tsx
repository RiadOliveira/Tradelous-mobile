import React, { useEffect, useMemo, useState } from 'react';
import {
    Container,
    CompanyContainer,
    LogoContainer,
    CompanyImage,
    CompanyData,
    CompanyName,
    CompanyAdress,
    EditButton,
    EditIcon,
    Employee,
    EmployeeData,
    EmployeeName,
    EmployeeEmail,
    EmployeeImage,
    EmployeeIcon,
} from './styles';
import { ActivityIndicator, ScrollView } from 'react-native';
import api from '@services/api';
import Icon from 'react-native-vector-icons/MaterialIcons';
import convertCNPJ from '@utils/convertCNPJ';
import { useAuth } from '@hooks/auth';
import { useNavigation, useRoute } from '@react-navigation/native';

interface ICompany {
    id: string;
    name: string;
    cnpj: number;
    adress: string;
    logo?: string;
}

interface IEmployee {
    id: string;
    name: string;
    email: string;
    avatar: string;
    isAdmin: boolean;
}

const CompanySummary: React.FC = () => {
    const { user } = useAuth();
    const { updatedAt } = (useRoute().params as { updatedAt: number }) || {
        updatedAt: 0,
    };
    const navigation = useNavigation();

    const [company, setCompany] = useState<ICompany>({} as ICompany);
    const [hasLoadedCompany, setHasLoadedCompany] = useState(false);
    const [employees, setEmployees] = useState<IEmployee[]>([]); //Needs to add on the screen.

    const apiStaticUrl = useMemo(() => `${api.defaults.baseURL}/files`, []);

    useEffect(() => {
        api.get('/company').then(response => setCompany(response.data));
    }, [updatedAt]);

    useEffect(() => {
        api.get('/company/list-employees').then(response => {
            setEmployees(response.data);
            setHasLoadedCompany(true);
        });
    }, [user]);

    const formattedCNPJ = useMemo(
        () => (company.cnpj ? convertCNPJ(company.cnpj) : 0),
        [company.cnpj],
    );

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
                    <CompanyContainer>
                        <CompanyData>
                            <CompanyName>{company.name}</CompanyName>
                            <CompanyAdress>
                                {company.adress}
                                {'\n'}
                                {formattedCNPJ}
                            </CompanyAdress>

                            {user.isAdmin && (
                                <EditButton
                                    onPress={() =>
                                        navigation.navigate(
                                            'EditCompany',
                                            company,
                                        )
                                    }
                                >
                                    <EditIcon
                                        name="edit"
                                        color="#ffffff"
                                        size={22}
                                    />
                                </EditButton>
                            )}
                        </CompanyData>

                        <LogoContainer>
                            {company.logo ? (
                                <CompanyImage
                                    source={{
                                        uri: `${apiStaticUrl}/logo/${company.logo}`,
                                    }}
                                />
                            ) : (
                                <Icon
                                    name="business"
                                    size={60}
                                    color="#ffffff"
                                />
                            )}
                        </LogoContainer>
                    </CompanyContainer>

                    {orderedEmployees.map(employee => (
                        <Employee key={employee.id}>
                            <EmployeeData
                                isAdmin={employee.isAdmin}
                                activeOpacity={0.7}
                                disabled={!user.isAdmin || employee.isAdmin}
                            >
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

export default CompanySummary;
