import React from 'react';
import { addYears } from 'date-fns';
import ModalContainer from 'react-native-modal';
import DatePickerComponent from 'react-native-date-picker';

import {
    DatePickerView,
    DatePickerButton,
    DatePickerButtonText,
} from './styles';

interface DatePickerProps {
    isVisible?: boolean;
    dateState: Date;
    setVisibility(visibility: boolean): void;
    setDateFunction(date: Date): void;
}

const DatePicker: React.FC<DatePickerProps> = ({
    isVisible = false,
    dateState = new Date(Date.now()),
    setVisibility,
    setDateFunction,
}) => {
    const actualDay = new Date(Date.now()).getDate();
    const actualMonth = new Date(Date.now()).getMonth() + 1;
    const actualYear = new Date(Date.now()).getFullYear();

    return (
        <ModalContainer
            isVisible={isVisible}
            coverScreen={false}
            onBackButtonPress={() => setVisibility(false)}
            onBackdropPress={() => setVisibility(false)}
            style={{ justifyContent: 'center', alignItems: 'center' }}
            animationIn="fadeIn"
            animationOut="fadeOut"
        >
            <DatePickerView>
                <DatePickerComponent
                    mode="date"
                    androidVariant="nativeAndroid"
                    date={dateState}
                    onDateChange={date => setDateFunction(date)}
                    minimumDate={addYears(
                        new Date(actualYear, actualMonth, actualDay),
                        -1,
                    )}
                    maximumDate={new Date(Date.now())}
                />

                <DatePickerButton onPress={() => setVisibility(false)}>
                    <DatePickerButtonText>Confirmar</DatePickerButtonText>
                </DatePickerButton>
            </DatePickerView>
        </ModalContainer>
    );
};

export default DatePicker;
