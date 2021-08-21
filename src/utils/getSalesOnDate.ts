import api from '@services/api';

interface IEmployee {
    name: string;
    email: string;
    avatar: string;
    isAdmin: boolean;
}

interface IProduct {
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

const getSalesOnDate = async (
    searchType: 'day' | 'month' | 'week',
    date: Date,
): Promise<ISale[]> => {
    switch (searchType) {
        case 'day': {
            const response = await api.get<ISale[]>(
                `/sales/day/${date.getDate()}-${
                    date.getMonth() + 1
                }-${date.getFullYear()}`,
            );

            return response.data;
        }

        case 'month': {
            const response = await api.get<ISale[]>(
                `/sales/month/${date.getMonth() + 1}-${date.getFullYear()}`,
            );

            return response.data;
        }

        case 'week': {
            const response = await api.get<ISale[]>(
                `/sales/week/${date.getDate()}-${
                    date.getMonth() + 1
                }-${date.getFullYear()}`,
            );

            return response.data;
        }
    }
};

export default getSalesOnDate;
