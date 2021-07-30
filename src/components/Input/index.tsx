import { useField } from '@unform/core';
import React, {
    useCallback,
    useEffect,
    useRef,
    useState,
    useImperativeHandle,
    forwardRef,
} from 'react';
import { TextInputProps } from 'react-native';
import { Container, Content, Icon } from './styles';

interface InputProps extends TextInputProps {
    name: string;
    icon: string;
}

interface InputRef {
    focus(): void;
}

const Input: React.ForwardRefRenderFunction<InputRef, InputProps> = (
    { name, icon, ...props },
    ref,
) => {
    const [isSelected, setIsSelected] = useState(false);
    const [isFilled, setIsFilled] = useState(false);
    const [isErrored, setIsErrored] = useState(false);

    const { fieldName, defaultValue, registerField, error } = useField(name);

    useEffect(() => {
        setIsErrored(!!error);
    }, [error]);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const inputRef = useRef<any>(null);
    const inputValueRef = useRef({ value: defaultValue });

    const handleFocus = useCallback(() => {
        setIsSelected(true);
    }, []);

    const handleBlur = useCallback(() => {
        setIsSelected(false);
    }, []);

    const handleTextChanging = useCallback((value: string) => {
        if (value) {
            setIsFilled(true);
        } else {
            setIsFilled(false);
        }
    }, []);

    useImperativeHandle(
        ref,
        () => ({
            focus() {
                inputRef.current.focus();
            },
        }),
        [],
    );

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputValueRef.current,
            path: 'value',
            clearValue() {
                inputValueRef.current.value = '';
                inputRef.current.clear();
                setIsFilled(false);
                setIsErrored(false);
            },
            setValue(value) {
                inputValueRef.current.value = value;
                inputRef.current.setNativeProps({ text: value });
            },
        });
    }, [fieldName, registerField]);

    useEffect(() => {
        //In order to verify changes when the value is modified on parent.
        inputValueRef.current.value = props.value ?? defaultValue;
        handleTextChanging(props.value ?? defaultValue);
    }, [props.value, handleTextChanging, defaultValue]);

    return (
        <Container
            isSelected={isSelected}
            isFilled={isFilled}
            isErrored={isErrored}
        >
            <Icon
                color={isFilled ? '#4058af' : '#000000'}
                size={24}
                name={icon}
            />
            <Content
                onFocus={handleFocus}
                onBlur={handleBlur}
                placeholder={props.placeholder}
                defaultValue={defaultValue}
                onChangeText={value => {
                    inputValueRef.current.value = value;
                    handleTextChanging(value);
                }}
                selectionColor="#000000"
                ref={inputRef}
                style={{
                    color:
                        props.editable == undefined ?? props.editable
                            ? '#000000'
                            : '#bababa',
                }}
                {...props}
            />
        </Container>
    );
};

export default forwardRef(Input);
