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
    ActionButtonContainer,
    ActionButton,
    ActionButtonText,
    ActionButtonIcon,
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
    infoText?: string;
}

interface ITextPickerProps {
    visibility: boolean;
    actionFunction?: (employeeId: string) => Promise<void>;
}

const CompanySummary: React.FC = () => {
    const { user, setUserCompany } = useAuth();
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
            try {
                const response = await api.patch<IEmployee>(
                    `/company/hire-employee/${employeeId}`,
                );

                setEmployees(employees => [...employees, response.data]);

                Toast.show({
                    type: 'success',
                    text1: 'Funcionário contratado com sucesso!',
                });
            } catch {
                Toast.show({
                    type: 'error',
                    text1: 'Erro ao contratar funcionário',
                    text2: 'Verifique se você inseriu o ID corretamente.',
                });
            }
        },
        [],
    );

    const handleFireEmployee = useCallback(
        async (employeeId: string): Promise<void> => {
            try {
                await api.patch(`/company/fire-employee/${employeeId}`);

                setEmployees(employees =>
                    employees.filter(employee => employee.id !== employeeId),
                );

                Toast.show({
                    type: 'success',
                    text1: 'Funcionário demitido com sucesso!',
                });
            } catch {
                Toast.show({
                    type: 'error',
                    text1: 'Problema inesperado',
                    text2: 'Ocorreu um erro ao demitir o funcionário.',
                });
            }
        },
        [],
    );

    const handleLeaveCompany = useCallback(async () => {
        try {
            await api.patch('/user/leave-company');

            Toast.show({
                type: 'success',
                text1: 'Sucesso na saída da empresa!',
            });

            setUserCompany(false, undefined);
        } catch {
            Toast.show({
                type: 'error',
                text1: 'Problema inesperado',
                text2: 'Ocorreu um erro ao abandonar a empresa.',
            });
        }
    }, [setUserCompany]);

    return (
        <>
            <Modal
                actionFunction={modalProps.actionFunction}
                setVisibility={setModalProps}
                isVisible={modalProps.visibility}
                text={{
                    info: modalProps.infoText || '',
                    firstButton: 'Sim',
                    secondButton: 'Não',
                }}
                iconName={user.isAdmin ? 'delete' : 'logout'}
                willUnmount={!user.isAdmin}
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

                        <ActionButtonContainer>
                            <ActionButton
                                isAdmin={user.isAdmin}
                                activeOpacity={0.8}
                                onPress={() =>
                                    user.isAdmin
                                        ? setTextPickerProps({
                                              visibility: true,
                                              actionFunction: (
                                                  employeeId: string,
                                              ) =>
                                                  handleHireEmployee(
                                                      employeeId,
                                                  ),
                                          })
                                        : setModalProps({
                                              visibility: true,
                                              actionFunction: () =>
                                                  handleLeaveCompany(),
                                              infoText:
                                                  'Tem certeza que deseja abandonar essa empresa?',
                                          })
                                }
                            >
                                <ActionButtonText>
                                    {user.isAdmin
                                        ? 'Contratar funcionário'
                                        : 'Abandonar empresa'}
                                </ActionButtonText>
                            </ActionButton>

                            <ActionButtonIcon isAdmin={user.isAdmin}>
                                <Icon
                                    name={user.isAdmin ? 'person-add' : 'clear'}
                                    size={30}
                                    color="#ffffff"
                                />
                            </ActionButtonIcon>
                        </ActionButtonContainer>

                        {orderedEmployees.map(employee => (
                            <Employee key={employee.id}>
                                <EmployeeData
                                    isAdmin={employee.isAdmin}
                                    activeOpacity={0.8}
                                    disabled={!user.isAdmin || employee.isAdmin}
                                    onPress={() =>
                                        setModalProps({
                                            visibility: true,
                                            actionFunction: () =>
                                                handleFireEmployee(employee.id),
                                            infoText:
                                                'Tem certeza que deseja demitir esse funcionário?',
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
