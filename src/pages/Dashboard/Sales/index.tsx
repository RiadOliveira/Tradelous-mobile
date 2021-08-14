import React, { useEffect, useMemo, useState } from 'react';
import {
    Container,
    FilterContainer,
    Icon,
    PickerView,
    DatePickerButton,
    Sale,
    SaleData,
    SaleText,
    SaleImage,
    SaleIcon,
} from './styles';
import { ActivityIndicator, ScrollView } from 'react-native';
import api from '@services/api';
import DatePicker from '@components/DatePicker';
import { Picker } from '@react-native-picker/picker';
import { useProducts } from '@hooks/products';
import formatPrice from '@utils/formatPrice';

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
    const { productsStatus } = useProducts();

    const [hasLoadedSales, setHasLoadedSales] = useState(false);
    const [searchType, setSearchType] = useState<SearchType>('day');

    const [sales, setSales] = useState<ISale[]>([]);
    const [dateOfSales, setDateofSales] = useState<Date>(new Date(Date.now()));
    const [datePickerVisibility, setDatePickerVisibility] = useState(false);

    const apiStaticUrl = useMemo(() => `${api.defaults.baseURL}/files`, []);

    useEffect(() => {
        if (searchType == 'day') {
            api.get(
                `/sales/day/${dateOfSales.getDate()}-${
                    dateOfSales.getMonth() + 1
                }`,
            ).then(response => {
                setSales(response.data);

                if (!hasLoadedSales) {
                    setHasLoadedSales(true);
                }
            });
        } else if (searchType == 'month') {
            api.get(`/sales/month/${dateOfSales.getMonth() + 1}`).then(
                response => {
                    setSales(response.data);
                },
            );
        } else {
            api.get(
                `/sales/week/${dateOfSales.getFullYear()}-${dateOfSales.getDate()}-${
                    dateOfSales.getMonth() + 1
                }`,
            ).then(response => {
                setSales(response.data);
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dateOfSales, searchType]);

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

                    {sales.map((sale, index) => (
                        <Sale key={sale.id}>
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

                            <SaleData>
                                <SaleData
                                    style={{
                                        width: '100%',
                                        flexDirection: 'row',
                                    }}
                                >
                                    <SaleText>{sale.product.name}</SaleText>
                                    <SaleText>Qntd: {sale.quantity}</SaleText>
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
                                    <SaleText>{sale.employee.name}</SaleText>

                                    <SaleText>{sale.date}</SaleText>
                                </SaleData>
                            </SaleData>
                        </Sale>
                    ))}
                </Container>
            )}
        </ScrollView>
    );
};

export default Sales;
