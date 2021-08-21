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
    HireButtonContainer,
    HireButton,
    HireButtonText,
    HireButtonIcon,
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
import Modal from '@components/Modal';
import { useCallback } from 'react';
import Toast from 'react-native-toast-message';
import TextPicker from '@components/TextPicker';

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

interface IModalProps {
    visibility: boolean;
    actionFunction?: () => Promise<void>;
}

interface ITextPickerProps {
    visibility: boolean;
    actionFunction?: (employeeId: string) => Promise<void>;
}

const CompanySummary: React.FC = () => {
    const { user } = useAuth();
    const { updatedAt } = (useRoute().params as { updatedAt: number }) || {
        updatedAt: 0,
    };
    const navigation = useNavigation();

    const [company, setCompany] = useState<ICompany>({} as ICompany);
    const [hasLoadedCompany, setHasLoadedCompany] = useState(false);
    const [employees, setEmployees] = useState<IEmployee[]>([]);

    const [modalProps, setModalProps] = useState<IModalProps>({
        visibility: false,
    });

    const [textPickerProps, setTextPickerProps] = useState<ITextPickerProps>({
        visibility: false,
    });

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

    const handleHireEmployee = useCallback(
        async (employeeId: string): Promise<void> => {
            const response = await api.patch<IEmployee>(
                `/company/hire-employee/${employeeId}`,
            );

            setEmployees(employees => [...employees, response.data]);

            Toast.show({
                type: 'success',
                text1: 'Funcionário contratado com sucesso!',
            });
        },
        [],
    );

    const handleFireEmployee = useCallback(
        async (employeeId: string): Promise<void> => {
            await api.patch(`/company/fire-employee/${employeeId}`);

            setEmployees(employees =>
                employees.filter(employee => employee.id !== employeeId),
            );

            Toast.show({
                type: 'success',
                text1: 'Funcionário demitido com sucesso!',
            });
        },
        [],
    );

    return (
        <>
            <Modal
                actionFunction={modalProps.actionFunction}
                setVisibility={setModalProps}
                isVisible={modalProps.visibility}
                text={{
                    info: 'Tem certeza que deseja demitir esse funcionário?',
                    firstButton: 'Sim',
                    secondButton: 'Não',
                }}
                iconName="delete"
            />

            <TextPicker
                actionFunction={textPickerProps.actionFunction}
                setVisibility={setTextPickerProps}
                isVisible={textPickerProps.visibility}
                text={{
                    info: 'Insira o ID do funcionário que deseja contratar',
                    buttonText: 'Confirmar',
                }}
                iconName="tag"
            />

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
                                        <Icon
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

                        {user.isAdmin && (
                            <HireButtonContainer>
                                <HireButton
                                    activeOpacity={0.7}
                                    onPress={() =>
                                        setTextPickerProps({
                                            visibility: true,
                                            actionFunction: (
                                                employeeId: string,
                                            ) => handleHireEmployee(employeeId),
                                        })
                                    }
                                >
                                    <HireButtonText>
                                        Contratar funcionário
                                    </HireButtonText>
                                </HireButton>

                                <HireButtonIcon>
                                    <Icon
                                        name="person-add"
                                        size={30}
                                        color="#ffffff"
                                    />
                                </HireButtonIcon>
                            </HireButtonContainer>
                        )}

                        {orderedEmployees.map(employee => (
                            <Employee key={employee.id}>
                                <EmployeeData
                                    isAdmin={employee.isAdmin}
                                    activeOpacity={0.7}
                                    disabled={!user.isAdmin || employee.isAdmin}
                                    onPress={() =>
                                        setModalProps({
                                            visibility: true,
                                            actionFunction: () =>
                                                handleFireEmployee(employee.id),
                                        })
                                    }
                                >
                                    <EmployeeName>
                                        {employee.name.length > 21
                                            ? `${employee.name.substring(
                                                  0,
                                                  21,
                                              )}...`
                                            : employee.name}
                                    </EmployeeName>
                                    <EmployeeEmail>
                                        {employee.email}
                                    </EmployeeEmail>
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
        </>
    );
};

export default CompanySummary;
