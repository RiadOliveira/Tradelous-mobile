import React, { useEffect, useMemo, useState } from 'react';
import {
    Container,
    CompanyContainer,
    LogoContainer,
    CompanyImage,
    CompanyData,
    CompanyName,
    CompanyCNPJ,
    Employee,
    EmployeeData,
    EmployeeName,
    EmployeeId,
    EmployeeImage,
    EmployeeIcon,
} from './styles';
import { ActivityIndicator, ScrollView } from 'react-native';
import api from '@services/api';
import Icon from 'react-native-vector-icons/MaterialIcons';
import convertCNPJ from '@utils/convertCNPJ';

interface CompanyData {
    name: string;
    cnpj: number;
    adress: string;
    logo?: string;
}

interface Employee {
    id: string;
    name: string;
    email: string;
    avatar: string;
    isAdmin: boolean;
}

const Company: React.FC = () => {
    const [company, setCompany] = useState<CompanyData>({} as CompanyData);
    const [hasLoadedCompany, setHasLoadedCompany] = useState(false);
    const [employees, setEmployees] = useState<Employee[]>([]); //Needs to add on the screen.

    const apiStaticUrl = useMemo(() => `${api.defaults.baseURL}/files`, []);

    useEffect(() => {
        api.get('/company').then(response => {
            setCompany(response.data);
        });
    }, []);

    useEffect(() => {
        api.get('/company/list-employees').then(response => {
            setEmployees(response.data);
            setHasLoadedCompany(true);
        });
    }, []);

    const formattedCNPJ = useMemo(
        () => (company.cnpj ? convertCNPJ(company.cnpj) : 0),
        [company.cnpj],
    );

    const orderedEmployees = useMemo(() => {
        const admin =
            employees.find(employee => employee.isAdmin) || ({} as Employee); //Always will have a admin.

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
                            <CompanyCNPJ>{formattedCNPJ}</CompanyCNPJ>
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
                                    size={50}
                                    color="#ebebeb"
                                />
                            )}
                        </LogoContainer>
                    </CompanyContainer>

                    {orderedEmployees.map(employee => (
                        <Employee key={employee.id}>
                            <EmployeeData isAdmin={employee.isAdmin}>
                                <EmployeeName>{employee.name}</EmployeeName>
                                <EmployeeId>{employee.email}</EmployeeId>
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
                                        color="#ebebeb"
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

export default Company;
