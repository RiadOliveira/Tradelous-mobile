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

    const { fieldName, defaultValue, registerField } = useField(name);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const inputRef = useRef<any>(null);
    const inputValueRef = useRef({ value: defaultValue });

    const handleFocus = useCallback(() => {
        setIsSelected(true);
    }, []);

    const handleBlur = useCallback(() => {
        setIsSelected(false);
    }, []);

    const handleTextChanging = useCallback((event: string) => {
        if (event) {
            setIsFilled(true);
        } else {
            setIsFilled(false);
        }
    }, []);

    useImperativeHandle(ref, () => ({
        focus() {
            inputRef.current.focus();
        },
    }));

    useEffect(() => {
        registerField({
            name: fieldName,
            ref: inputValueRef.current,
            path: 'value',
            clearValue() {
                inputValueRef.current.value = '';
                inputRef.current.clear();
            },
            setValue(value) {
                inputValueRef.current.value = value;
                inputRef.current.setNativeProps({ text: value });
            },
        });
    }, [fieldName, registerField]);

    return (
        <Container isSelected={isSelected} isFilled={isFilled}>
            <Icon
                color={isFilled ? '#374b92' : '#000000'}
                size={24}
                name={icon}
            />
            <Content
                onFocus={handleFocus}
                onBlur={handleBlur}
                placeholder={props.placeholder}
                onChangeText={value => {
                    inputValueRef.current.value = value;
                    handleTextChanging(value);
                }}
                selectionColor="#000000"
                ref={inputRef}
                {...props}
            />
        </Container>
    );
};

export default forwardRef(Input);
