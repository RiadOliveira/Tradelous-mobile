import Clipboard from '@react-native-clipboard/clipboard';
import React from 'react';
import { useState } from 'react';
import ModalContainer from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
    TextPickerView,
    TextPickerInfo,
    InputContainer,
    TextPickerInput,
    PasteButton,
    ConfirmButton,
    ConfirmButtonText,
} from './styles';

interface TextPickerProps {
    isVisible?: boolean;
    text: {
        info: string;
        buttonText: string;
    };
    inputProps: {
        placeholder: string;
        hasPasteButton: boolean;
        isSecureText: boolean;
    };
    iconName: string;
    willUnmount?: boolean; //If actionFunction unmount modal's parent.
    actionFunction?: (pickedText: string) => Promise<void>;
    setVisibility({ visibility }: { visibility: boolean }): void;
}

const TextPicker: React.FC<TextPickerProps> = ({
    isVisible = false,
    text,
    iconName,
    inputProps,
    willUnmount = false,
    setVisibility,
    actionFunction,
}) => {
    const [inputText, setInputText] = useState('');

    const handleResponse = async () => {
        if (actionFunction) {
            actionFunction(inputText);

            if (!willUnmount) {
                setInputText('');
            }
        }
    };

    return (
        <ModalContainer
            isVisible={isVisible}
            coverScreen={false}
            onBackButtonPress={() => setVisibility({ visibility: false })}
            onBackdropPress={() => setVisibility({ visibility: false })}
            style={{
                justifyContent: 'center',
                alignItems: 'center',
            }}
            animationIn="fadeIn"
            animationOut="fadeOut"
        >
            <TextPickerView>
                <Icon
                    name={iconName}
                    size={80}
                    color="#fff"
                    style={{ marginTop: '4%' }}
                />

                <TextPickerInfo>{text.info}</TextPickerInfo>

                <InputContainer>
                    <TextPickerInput
                        hasPasteButton={inputProps.hasPasteButton}
                        autoCapitalize="none"
                        autoCorrect={false}
                        returnKeyType="send"
                        selectionColor="#000000"
                        placeholder={inputProps.placeholder}
                        value={inputText}
                        onChangeText={text => setInputText(text)}
                        onSubmitEditing={handleResponse}
                        secureTextEntry={inputProps.isSecureText}
                    />

                    {inputProps.hasPasteButton && (
                        <PasteButton
                            activeOpacity={0.75}
                            onPress={() =>
                                Clipboard.getString().then(response =>
                                    setInputText(response),
                                )
                            }
                        >
                            <Icon name="content-paste" color="#fff" size={24} />
                        </PasteButton>
                    )}
                </InputContainer>

                <ConfirmButton
                    style={{ backgroundColor: '#45a84f' }}
                    onPress={handleResponse}
                >
                    <ConfirmButtonText>{text.buttonText}</ConfirmButtonText>
                </ConfirmButton>
            </TextPickerView>
        </ModalContainer>
    );
};

export default TextPicker;
