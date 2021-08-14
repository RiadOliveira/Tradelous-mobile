import React from 'react';
import { addYears } from 'date-fns';
import ModalContainer from 'react-native-modal';
import DatePickerComponent from 'react-native-date-picker';

import {
    DatePickerView,
    DatePickerButton,
    DatePickerButtonText,
} from './styles';
import { useState } from 'react';
import { useCallback } from 'react';

interface DatePickerProps {
    isVisible?: boolean;
    setVisibility(visibility: boolean): void;
    setDateFunction(date: Date): void;
}

const DatePicker: React.FC<DatePickerProps> = ({
    isVisible = false,
    setVisibility,
    setDateFunction,
}) => {
    const [dateValue, setDateValue] = useState(new Date(Date.now()));

    const actualDay = new Date(Date.now()).getDate();
    const actualMonth = new Date(Date.now()).getMonth() + 1;
    const actualYear = new Date(Date.now()).getFullYear();

    const confirmPicker = useCallback(() => {
        setDateFunction(dateValue);
        setVisibility(false);
    }, [dateValue, setDateFunction, setVisibility]);

    return (
        <ModalContainer
            isVisible={isVisible}
            coverScreen={false}
            onBackButtonPress={() => setVisibility(false)}
            onBackdropPress={() => setVisibility(false)}
            style={{
                justifyContent: 'flex-start',
                alignItems: 'center',
                marginTop: '50%',
            }}
            animationIn="fadeIn"
            animationOut="fadeOut"
        >
            <DatePickerView>
                <DatePickerComponent
                    mode="date"
                    androidVariant="nativeAndroid"
                    date={dateValue}
                    onDateChange={date => setDateValue(date)}
                    minimumDate={addYears(
                        new Date(actualYear, actualMonth, actualDay),
                        -1,
                    )}
                    maximumDate={new Date(Date.now())}
                />

                <DatePickerButton onPress={confirmPicker}>
                    <DatePickerButtonText>Confirmar</DatePickerButtonText>
                </DatePickerButton>
            </DatePickerView>
        </ModalContainer>
    );
};

export default DatePicker;
