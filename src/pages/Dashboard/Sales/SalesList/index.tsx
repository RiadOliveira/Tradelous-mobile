import React, { useEffect, useMemo, useState } from 'react';
import {
    Container,
    FilterContainer,
    PickerView,
    DatePickerButton,
    Sale,
    SaleData,
    SaleText,
    SaleImage,
    SaleIcon,
} from './styles';
import { ActivityIndicator, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useProducts } from '@hooks/products';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useAuth } from '@hooks/auth';
import { useCallback } from 'react';
import Toast from 'react-native-toast-message';
import api from '@services/api';
import DatePicker from '@components/DatePicker';
import formatPrice from '@utils/formatPrice';
import Modal from '@components/Modal';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface IEmployee {
    id: string;
    name: string;
    email: string;
    avatar: string;
    isAdmin: boolean;
}

interface IProduct {
    id: string;
    name: string;
    price: number;
    quantity: number;
    brand: string;
    image?: string;
}

interface ISale {
    id: string;
    companyId: string;
    employeeId: string;
    productId: string;
    date: string;
    method: 'money' | 'card';
    quantity: number;
    totalPrice: number;
    employee: IEmployee;
    product: IProduct;
}

interface ModalProps {
    actionFunction?: () => Promise<void>;
    secondActionFunction?: () => Promise<void>;
    text?: {
        info: string;
        firstButton: string;
        secondButton: string;
    };
    visibility: boolean;
}

type SearchType = 'day' | 'week' | 'month';

const Sales: React.FC = () => {
    const { user } = useAuth();
    const { productsStatus } = useProducts();
    const { updatedAt } = (useRoute().params as { updatedAt: Date }) || {
        updatedAt: 0,
    };

    const navigation = useNavigation();

    const [hasLoadedSales, setHasLoadedSales] = useState(false);
    const [searchType, setSearchType] = useState<SearchType>('day');

    const [sales, setSales] = useState<ISale[]>([]);
    const [dateOfSales, setDateofSales] = useState<Date>(new Date(Date.now()));
    const [datePickerVisibility, setDatePickerVisibility] = useState(false);

    const [modalProps, setModalProps] = useState<ModalProps>({
        visibility: false,
    });

    const apiStaticUrl = useMemo(() => `${api.defaults.baseURL}/files`, []);

    useEffect(() => {
        if (searchType == 'day') {
            api.get(
                `/sales/day/${dateOfSales.getDate()}-${
                    dateOfSales.getMonth() + 1
                }-${dateOfSales.getFullYear()}`,
            ).then(response => {
                setSales(response.data);

                if (!hasLoadedSales) {
                    setHasLoadedSales(true);
                }
            });
        } else if (searchType == 'month') {
            api.get(
                `/sales/month/${
                    dateOfSales.getMonth() + 1
                }-${dateOfSales.getFullYear()}`,
            ).then(response => {
                setSales(response.data);
            });
        } else {
            api.get(
                `/sales/week/${dateOfSales.getDate()}-${
                    dateOfSales.getMonth() + 1
                }-${dateOfSales.getFullYear()}`,
            ).then(response => {
                setSales(response.data);
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dateOfSales, searchType, updatedAt]);

    useEffect(() => {
        if (productsStatus !== 'noChanges' && productsStatus !== 'newProduct') {
            setSales(prevSales =>
                prevSales.map(sale => {
                    if (sale.productId == productsStatus.id) {
                        return {
                            ...sale,
                            product: productsStatus,
                        };
                    }

                    return sale;
                }),
            );
        }
    }, [productsStatus]);

    const formattedProductPrices = useMemo(
        () => sales.map(sale => formatPrice(sale.product.price)),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [productsStatus, sales],
    );

    const deleteSale = useCallback(async (saleId: string) => {
        try {
            await api.delete(`/sales/${saleId}`);

            setSales(sales => sales.filter(sale => sale.id !== saleId));

            Toast.show({
                type: 'success',
                text1: 'Venda deletada com sucesso!',
            });
        } catch (err) {
            Toast.show({
                type: 'error',
                text1: 'Problema inesperado.',
                text2: 'Ocorreu algum problema ao deletar a venda.',
            });
        }
    }, []);

    return (
        <>
            <Modal
                actionFunction={modalProps.actionFunction}
                secondActionFunction={modalProps.secondActionFunction}
                setVisibility={setModalProps}
                isVisible={modalProps.visibility}
                text={
                    modalProps.text ?? {
                        info: '',
                        firstButton: '',
                        secondButton: '',
                    }
                }
                iconProps={{ name: 'info', color: '#1c274e' }}
            />

            <DatePicker
                isVisible={datePickerVisibility}
                setDateFunction={setDateofSales}
                setVisibility={setDatePickerVisibility}
            />

            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                scrollEnabled={!datePickerVisibility && !modalProps.visibility}
            >
                {!hasLoadedSales ? (
                    <ActivityIndicator
                        size={64}
                        color="#374b92"
                        style={{ backgroundColor: '#49b454', flex: 1 }}
                    />
                ) : (
                    <Container>
                        <FilterContainer>
                            <Icon
                                name="filter-alt"
                                size={34}
                                color={'#374b92'}
                            />

                            <PickerView>
                                <Picker
                                    selectedValue={searchType}
                                    style={{
                                        height: '100%',
                                        width: '100%',
                                    }}
                                    mode="dropdown"
                                    onValueChange={itemValue =>
                                        setSearchType(itemValue as SearchType)
                                    }
                                >
                                    <Picker.Item
                                        key={'SearchType0'}
                                        label={'Diário'}
                                        value={'day'}
                                    />
                                    <Picker.Item
                                        key={'SearchType1'}
                                        label={'Semanal'}
                                        value={'week'}
                                    />
                                    <Picker.Item
                                        key={'SearchType2'}
                                        label={'Mensal'}
                                        value={'month'}
                                    />
                                </Picker>
                            </PickerView>

                            <DatePickerButton
                                activeOpacity={0.4}
                                onPress={() => setDatePickerVisibility(true)}
                            >
                                <Icon
                                    name="calendar-today"
                                    size={30}
                                    color={'#374b92'}
                                />
                            </DatePickerButton>
                        </FilterContainer>

                        {sales.map((sale, index) => (
                            <Sale
                                key={sale.id}
                                disabled={!user.isAdmin}
                                activeOpacity={0.7}
                                onPress={() =>
                                    setModalProps({
                                        visibility: true,
                                        text: {
                                            info:
                                                'O que deseja fazer com essa venda?',
                                            firstButton: 'Atualizar',
                                            secondButton: 'Deletar',
                                        },
                                        actionFunction: async () =>
                                            navigation.navigate('EditSale', {
                                                sale,
                                            }),
                                        secondActionFunction: () =>
                                            deleteSale(sale.id),
                                    })
                                }
                            >
                                <SaleIcon hasImage={!!sale.product.image}>
                                    {sale.product.image ? (
                                        <SaleImage
                                            source={{
                                                uri: `${apiStaticUrl}/productImage/${sale.product.image}`,
                                            }}
                                        />
                                    ) : (
                                        <Icon
                                            name="shopping-cart"
                                            size={40}
                                            color="#ffffff"
                                        />
                                    )}
                                </SaleIcon>

                                <SaleData style={{ marginLeft: '1%' }}>
                                    <SaleData
                                        style={{
                                            width: '100%',
                                            flexDirection: 'row',
                                        }}
                                    >
                                        <SaleText>{sale.product.name}</SaleText>
                                        <SaleText>
                                            Qntd: {sale.quantity}
                                        </SaleText>
                                        <SaleText>
                                            {formattedProductPrices[index]}
                                        </SaleText>
                                    </SaleData>

                                    <SaleData
                                        style={{
                                            width: '100%',
                                            flexDirection: 'row',
                                        }}
                                    >
                                        <SaleText>
                                            {sale.employee.name}
                                        </SaleText>

                                        <SaleText>{sale.date}</SaleText>
                                    </SaleData>
                                </SaleData>
                            </Sale>
                        ))}
                    </Container>
                )}
            </ScrollView>
        </>
    );
};

export default Sales;
