import { ValidationError } from 'yup';

interface Errors {
    [key: string]: string;
}

export default function getValidationErrors(error: ValidationError): Errors {
    const errors: Errors = {};

    error.inner.forEach(err => {
        console.log(err.path);
        errors[err.path] = err.message;
    });

    return errors;
}
