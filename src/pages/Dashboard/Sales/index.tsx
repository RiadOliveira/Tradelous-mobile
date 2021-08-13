import React, { useEffect, useMemo, useState } from 'react';
import {
    Container,
    Sale,
    SaleData,
    SaleName,
    SaleSub,
    SaleImage,
    SaleIcon,
} from './styles';
import { ActivityIndicator, ScrollView } from 'react-native';
import api from '@services/api';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DatePicker from '@components/DatePicker';

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

const Sales: React.FC = () => {
    const [hasLoadedSales, setHasLoadedSales] = useState(false);

    const [sales, setSales] = useState<ISale[]>([]);
    const [dateOfSales, setDateofSales] = useState<Date>(new Date(Date.now()));
    const [datePickerVisibility, setDatePickerVisibility] = useState(true);

    const apiStaticUrl = useMemo(() => `${api.defaults.baseURL}/files`, []);

    useEffect(() => {
        api.get(
            `/sales/day/${dateOfSales.getDate()}-${dateOfSales.getMonth() + 1}`,
        ).then(response => {
            setSales(response.data);
            setHasLoadedSales(true);
        });
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
