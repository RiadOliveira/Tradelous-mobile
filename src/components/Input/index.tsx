import React, {useCallback, useState} from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {TextInputProps, TextInputChangeEventData} from 'react-native';
import {Container, Content, Icon} from './styles';

interface InputProps extends TextInputProps {
    name: string;
    icon: string;
}

const Input: React.FC<InputProps> = ({...props}) => {
    const [isSelected, setIsSelected] = useState(false);
    const [isFilled, setIsFilled] = useState(false);

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

    return (
        <Container isSelected={isSelected} isFilled={isFilled}>
            <Icon
                color={isFilled ? '#374b92' : '#000000'}
                size={24}
                name={props.icon}
            />
            <Content
                onFocus={handleFocus}
                onBlur={handleBlur}
                placeholder={props.name}
                onChangeText={(event) => {
                    handleTextChanging(event);
                }}
                selectionColor="#000000"
                {...props}
            />
        </Container>
    );
};

export default Input;
