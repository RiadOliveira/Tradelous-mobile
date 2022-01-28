import { FormHandles } from '@unform/core';
import getValidationErrors from '@utils/getValidationErrors';
import React from 'react';
import Toast from 'react-native-toast-message';
import * as yup from 'yup';

const ErrorCatcher = (
    err: Error | yup.ValidationError,
    formRef: React.RefObject<FormHandles>,
): void => {
    if (err instanceof yup.ValidationError) {
        const validationErrors = getValidationErrors(err);
        const validationKeys = Object.keys(validationErrors);

        formRef.current?.setErrors(validationErrors);

        Toast.show({
            type: 'error',
            text1: 'Problema na validação',
            text2: `${validationErrors[validationKeys[0]]}.`,
        });

        return;
    }

    Toast.show({
        type: 'error',
        text1: 'Problema inesperado',
        text2: 'Ocorreu alguma falha, por favor, tente novamente.',
    });
};

export default ErrorCatcher;
