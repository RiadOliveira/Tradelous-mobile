import React, { useEffect, useMemo, useState } from 'react';
import {
    Container,
    TitleTextContainer,
    TitleText,
    CompanyContainer,
    ImageContainer,
    CompanyImage,
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

const Company: React.FC = () => {
    const [company, setCompany] = useState<CompanyData>({} as CompanyData);
    const apiStaticUrl = useMemo(
        () => `${api.defaults.baseURL}/files/logo`,
        [],
    );

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
                <TitleTextContainer style={{ elevation: 10 }}>
                    <TitleText>Dados da empresa</TitleText>
                </TitleTextContainer>

                <CompanyContainer>
                    <ImageContainer>
                        {company.logo ? (
                            <CompanyImage
                                source={{
                                    uri: `${apiStaticUrl}/${company.logo}`,
                                }}
                            />
                        ) : (
                            <Icon name="business" size={32} />
                        )}
                    </ImageContainer>

                    <CompanyData>
                        <CompanyName>{company.name}</CompanyName>
                        <CompanyCNPJ>{formattedCNPJ}</CompanyCNPJ>
                    </CompanyData>
                </CompanyContainer>
            </Container>
        </ScrollView>
    );
};

export default Company;
