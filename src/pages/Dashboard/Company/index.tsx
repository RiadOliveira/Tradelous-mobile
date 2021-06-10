import React, { useEffect, useMemo, useState } from 'react';
import {
    Container,
    CompanyContainer,
    ImageContainer,
    CompanyImage,
    CompanyIcon,
    CompanyData,
    CompanyName,
    CompanyCNPJ,
} from './styles';
import { ScrollView } from 'react-native';
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
    name: string;
    email: string;
    avatar: string;
    isAdmin: boolean;
}

const Company: React.FC = () => {
    const [company, setCompany] = useState<CompanyData>({} as CompanyData);
    const [employees, setEmployees] = useState<Employee[]>([]); //Needs to add on the screen.

    const apiStaticUrl = useMemo(() => `${api.defaults.baseURL}/files`, []);

    useEffect(() => {
        api.get('/company').then(response => setCompany(response.data));
    }, []);

    const formattedCNPJ = useMemo(
        () => (company.cnpj ? convertCNPJ(company.cnpj) : 0),
        [company.cnpj],
    );

    return (
        <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
        >
            <Container>
                <CompanyContainer>
                    <CompanyData>
                        <CompanyName>{company.name}</CompanyName>
                        <CompanyCNPJ>{formattedCNPJ}</CompanyCNPJ>
                    </CompanyData>

                    <ImageContainer>
                        {!company.logo ? (
                            <CompanyImage
                                source={{
                                    uri: `${apiStaticUrl}/logo/${company.logo}`,
                                }}
                            />
                        ) : (
                            <CompanyIcon>
                                <Icon
                                    name="business"
                                    size={50}
                                    color="#ebebeb"
                                />
                            </CompanyIcon>
                        )}
                    </ImageContainer>
                </CompanyContainer>
            </Container>
        </ScrollView>
    );
};

export default Company;
