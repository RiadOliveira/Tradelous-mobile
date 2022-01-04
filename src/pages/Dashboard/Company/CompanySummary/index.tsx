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
import api from '@services/api';
import Icon from 'react-native-vector-icons/MaterialIcons';
import convertCNPJ from '@utils/convertCNPJ';
import { useAuth } from '@hooks/auth';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useCallback } from 'react';
import Toast from 'react-native-toast-message';
import { FlatList } from 'react-native-gesture-handler';
import LoadingIndicator from '@components/LoadingIndicator';
import { useModal } from '@hooks/modal';

interface ICompany {
    id: string;
    name: string;
    cnpj: number;
    address: string;
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
    const { user, setUserCompany } = useAuth();
    const { showModal } = useModal();

    const { updatedAt } = (useRoute().params as { updatedAt: number }) || {
        updatedAt: 0,
    };
    const navigation = useNavigation();

    const [company, setCompany] = useState<ICompany>({} as ICompany);
    const [hasLoadedCompany, setHasLoadedCompany] = useState(false);
    const [employees, setEmployees] = useState<IEmployee[]>([]);

    const apiStaticUrl = useMemo(() => `${api.defaults.baseURL}/files`, []);

    useEffect(() => {
        api.get('/company').then(response => setCompany(response.data));
    }, [updatedAt]);

    useEffect(() => {
        api.get('/company/list-employees').then(response => {
            setEmployees(response.data);
        });
    }, [user]);

    useEffect(() => {
        if (company.id && !!employees.length) {
            setHasLoadedCompany(true);
        }
    }, [company, employees]);

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
        async (verifyPassword: string, employeeId: string): Promise<void> => {
            try {
                await api.post('/user/sessions', {
                    email: user.email,
                    password: verifyPassword,
                }); //In order to verify user's password to delete company.

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
        [user.email],
    );

    const handleLeaveCompany = useCallback(
        async (verifyPassword: string) => {
            try {
                await api.post('/user/sessions', {
                    email: user.email,
                    password: verifyPassword,
                }); //In order to verify user's password to leave company.

                await api.patch('/user/leave-company');

                Toast.show({
                    type: 'success',
                    text1: 'Sucesso na saída da empresa!',
                });

                setUserCompany(false);
            } catch {
                Toast.show({
                    type: 'error',
                    text1: 'Problema inesperado',
                    text2: 'Ocorreu um erro ao abandonar a empresa.',
                });
            }
        },
        [setUserCompany, user.email],
    );

    return (
        <>
            {!hasLoadedCompany ? (
                <LoadingIndicator />
            ) : (
                <Container>
                    <CompanyContainer>
                        <CompanyData>
                            <CompanyName>{company.name}</CompanyName>
                            <CompanyAdress>
                                {company.address}
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
                                    ? showModal({
                                          actionFunction: employeeId =>
                                              handleHireEmployee(
                                                  employeeId || '',
                                              ),
                                          text: {
                                              info:
                                                  'Insira o ID do funcionário que deseja contratar',
                                              firstButton: 'Confirmar',
                                          },
                                          inputProps: {
                                              placeholder: 'ID do funcionário',
                                              hasPasteButton: true,
                                              isSecureText: false,
                                          },
                                          iconName: 'tag',
                                      })
                                    : showModal({
                                          actionFunction: verifyPassword =>
                                              handleLeaveCompany(
                                                  verifyPassword || '',
                                              ),
                                          text: {
                                              info:
                                                  'Insira sua senha para confirmar a saída',
                                              firstButton: 'Confirmar',
                                          },
                                          inputProps: {
                                              placeholder: 'Senha',
                                              hasPasteButton: false,
                                              isSecureText: true,
                                          },
                                          iconName: 'tag',
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

                    <FlatList
                        data={orderedEmployees}
                        keyExtractor={employee => employee.id}
                        style={{
                            width: '100%',
                            paddingTop: 10,
                        }}
                        contentContainerStyle={{
                            alignItems: 'center',
                            paddingBottom: '8%',
                        }}
                        renderItem={({ item }) => (
                            <Employee>
                                <EmployeeData
                                    isAdmin={item.isAdmin}
                                    activeOpacity={0.8}
                                    disabled={!user.isAdmin || item.isAdmin}
                                    onPress={() =>
                                        showModal({
                                            actionFunction: verifyPassword =>
                                                handleFireEmployee(
                                                    verifyPassword || '',
                                                    item.id,
                                                ),
                                            text: {
                                                info:
                                                    'Insira sua senha para confirmar a demissão',
                                                firstButton: 'Confirmar',
                                            },
                                            inputProps: {
                                                placeholder: 'Senha',
                                                hasPasteButton: false,
                                                isSecureText: true,
                                            },
                                            iconName: 'tag',
                                        })
                                    }
                                >
                                    <EmployeeName>
                                        {item.name.length > 21
                                            ? `${item.name.substring(0, 21)}...`
                                            : item.name}
                                    </EmployeeName>
                                    <EmployeeEmail>{item.email}</EmployeeEmail>
                                </EmployeeData>

                                <EmployeeIcon isAdmin={item.isAdmin}>
                                    {item.avatar ? (
                                        <EmployeeImage
                                            source={{
                                                uri: `${apiStaticUrl}/avatar/${item.avatar}`,
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
                        )}
                    />
                </Container>
            )}
        </>
    );
};

export default CompanySummary;
