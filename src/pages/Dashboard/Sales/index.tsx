import React, { useEffect, useMemo, useState } from 'react';
import {
    Container,
    FilterContainer,
    Icon,
    PickerView,
    DatePickerButton,
    Sale,
    SaleData,
    SaleName,
    SaleSub,
    SaleImage,
    SaleIcon,
} from './styles';
import { ActivityIndicator, ScrollView } from 'react-native';
import api from '@services/api';
import DatePicker from '@components/DatePicker';
import { Picker } from '@react-native-picker/picker';

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

type SearchType = 'day' | 'week' | 'month';

const Sales: React.FC = () => {
    const [hasLoadedSales, setHasLoadedSales] = useState(false);
    const [searchType, setSearchType] = useState<SearchType>('day');

    const [sales, setSales] = useState<ISale[]>([]);
    const [dateOfSales, setDateofSales] = useState<Date>(new Date(Date.now()));
    const [datePickerVisibility, setDatePickerVisibility] = useState(false);

    const apiStaticUrl = useMemo(() => `${api.defaults.baseURL}/files`, []);

    useEffect(() => {
        setHasLoadedSales(false);

        if (searchType == 'day') {
            api.get(
                `/sales/day/${dateOfSales.getDate()}-${
                    dateOfSales.getMonth() + 1
                }`,
            ).then(response => {
                setSales(response.data);
                setHasLoadedSales(true);
            });
        } else if (searchType == 'month') {
            api.get(`/sales/month/${dateOfSales.getMonth() + 1}`).then(
                response => {
                    setSales(response.data);
                    setHasLoadedSales(true);
                },
            );
        } else {
            api.get(
                `/sales/week/${dateOfSales.getFullYear()}-${dateOfSales.getDate()}-${
                    dateOfSales.getMonth() + 1
                }`,
            ).then(response => {
                setSales(response.data);
                setHasLoadedSales(true);
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dateOfSales]);

    return (
        <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
        >
            {!hasLoadedSales ? (
                <ActivityIndicator
                    size={64}
                    color="#374b92"
                    style={{ backgroundColor: '#49b454', flex: 1 }}
                />
            ) : (
                <Container>
                    <DatePicker
                        dateState={dateOfSales}
                        isVisible={datePickerVisibility}
                        setDateFunction={setDateofSales}
                        setVisibility={setDatePickerVisibility}
                    />

                    <FilterContainer>
                        <Icon name="filter-alt" size={30} color={'#374b92'} />

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

                    {sales.map(sale => (
                        <Sale key={sale.id}>
                            <SaleData>
                                <SaleName>{sale.product.name}</SaleName>
                                <SaleSub>{sale.employee.email}</SaleSub>
                            </SaleData>

                            <SaleIcon>
                                {sale.product.image ? (
                                    <SaleImage
                                        source={{
                                            uri: `${apiStaticUrl}/avatar/${sale.product.image}`,
                                        }}
                                    />
                                ) : (
                                    <Icon
                                        name="person"
                                        size={30}
                                        color="#ffffff"
                                    />
                                )}
                            </SaleIcon>
                        </Sale>
                    ))}
                </Container>
            )}
        </ScrollView>
    );
};

export default Sales;
