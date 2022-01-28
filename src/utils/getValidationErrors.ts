import { ValidationError } from 'yup';

interface IErrors {
    [key: string]: string;
}

const getValidationErrors = (error: ValidationError): IErrors => {
    const errors: IErrors = {};

    error.inner.forEach(err => {
        if (err.path) errors[err.path] = err.message;
    });

    return errors;
};

export default getValidationErrors;
