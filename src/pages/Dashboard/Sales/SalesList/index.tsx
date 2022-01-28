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
import { Picker } from '@react-native-picker/picker';
import { IProduct, useProducts } from '@hooks/products';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '@hooks/auth';
import { useCallback } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { useModal } from '@hooks/modal';
import { format } from 'date-fns';

import Toast from 'react-native-toast-message';
import api from '@services/api';
import DatePicker from '@components/DatePicker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LoadingIndicator from '@components/LoadingIndicator';
import formatPrice from '@utils/formatPrice';

interface IEmployee {
    name: string;
    email: string;
    avatar: string;
    isAdmin: boolean;
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
    const { user } = useAuth();
    const { showModal } = useModal();
    const { productsStatus, updateProductsStatus } = useProducts();
    const navigation = useNavigation();

    const [hasLoadedSales, setHasLoadedSales] = useState(false);
    const [searchType, setSearchType] = useState<SearchType>('day');

    const [sales, setSales] = useState<ISale[]>([]);
    const [dateOfSales, setDateofSales] = useState<string>(
        format(new Date(Date.now()), 'dd-MM-yyyy'),
    );
    const [datePickerVisibility, setDatePickerVisibility] = useState(false);

    const apiStaticUrl = useMemo(() => `${api.defaults.baseURL}/files`, []);

    // Gets all sales.
    useEffect(() => {
        api.get<ISale[]>(`/sales/${searchType}/${dateOfSales}`).then(
            ({ data }) => {
                setSales(data);
                if (!hasLoadedSales) setHasLoadedSales(true);
            },
        );
    }, [dateOfSales, hasLoadedSales, searchType]);

    // Gets sales when searchType and search's date changes.
    useEffect(() => {
        if (typeof productsStatus !== 'string') {
            api.get<ISale[]>(
                `/sales/${searchType}/${dateOfSales}`,
            ).then(({ data }) => setSales(data));
        }
    }, [dateOfSales, productsStatus, searchType]);

    //When a product is modified, update the product on it's sales.
    useEffect(() => {
        if (typeof productsStatus !== 'string') {
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

    const deleteSale = useCallback(
        async (selectedSale: ISale) => {
            try {
                await api.delete(`/sales/${selectedSale.id}`);

                setSales(sales =>
                    sales.filter(sale => sale.id !== selectedSale.id),
                );

                updateProductsStatus({
                    ...selectedSale.product,
                    id: selectedSale.productId,
                    quantity:
                        selectedSale.product.quantity + selectedSale.quantity,
                });

                Toast.show({
                    type: 'success',
                    text1: 'Venda deletada com sucesso!',
                });
            } catch (err) {
                Toast.show({
                    type: 'error',
                    text1: 'Problema inesperado.',
                    text2: 'Ocorreu algum problema na exclusão da venda.',
                });
            }
        },
        [updateProductsStatus],
    );

    return (
        <Container>
            {!hasLoadedSales && <LoadingIndicator />}

            <DatePicker
                isVisible={datePickerVisibility}
                setDateFunction={setDateofSales}
                setVisibility={setDatePickerVisibility}
            />

            <FilterContainer>
                <Icon name="filter-alt" size={34} color={'#374b92'} />

                <PickerView>
                    <Picker
                        selectedValue={searchType}
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
                    <Icon name="calendar-today" size={30} color={'#374b92'} />
                </DatePickerButton>
            </FilterContainer>

            <FlatList
                data={sales}
                keyExtractor={sale => sale.id}
                style={{
                    width: '100%',
                    paddingTop: 10,
                }}
                contentContainerStyle={{
                    alignItems: 'center',
                    paddingBottom: '8%',
                }}
                renderItem={({ item: sale }) => (
                    <Sale
                        disabled={!user.isAdmin}
                        activeOpacity={0.7}
                        onPress={() =>
                            showModal({
                                actionFunction: async () =>
                                    navigation.navigate('EditSale', {
                                        sale,
                                    }),
                                secondActionFunction: () => deleteSale(sale),
                                text: {
                                    info: 'O que deseja fazer com essa venda?',
                                    firstButton: 'Atualizar',
                                    secondButton: 'Deletar',
                                },
                                iconName: 'info',
                            })
                        }
                    >
                        <SaleIcon hasImage={!!sale.product.image}>
                            {sale.product.image ? (
                                <SaleImage
                                    source={{
                                        uri: `${apiStaticUrl}/product-image/${sale.product.image}`,
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

                        <SaleData
                            style={{
                                flexDirection: 'column',
                            }}
                        >
                            <SaleData>
                                <SaleText>
                                    {sale.product.name.length > 16
                                        ? `${sale.product.name.substring(
                                              0,
                                              13,
                                          )}...`
                                        : sale.product.name}
                                </SaleText>

                                <SaleText>
                                    {formatPrice(sale.totalPrice)}
                                </SaleText>
                            </SaleData>

                            <SaleData>
                                <SaleText>
                                    {sale.employee.name.length > 19
                                        ? `${sale.employee.name.substring(
                                              0,
                                              19,
                                          )}...`
                                        : sale.employee.name}
                                </SaleText>

                                <SaleText>{sale.date}</SaleText>
                            </SaleData>
                        </SaleData>
                    </Sale>
                )}
            />
        </Container>
    );
};

export default Sales;
