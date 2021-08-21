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
    iconName: string;
    actionFunction?: (pickedText: string) => Promise<void>;
    setVisibility({ visibility }: { visibility: boolean }): void;
}

const TextPicker: React.FC<TextPickerProps> = ({
    isVisible = false,
    text,
    iconName,
    setVisibility,
    actionFunction,
}) => {
    const [inputText, setInputText] = useState('');

    const handleResponse = () => {
        setVisibility({ visibility: false });

        if (actionFunction) {
            actionFunction(inputText);
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
                    size={90}
                    color="#fff"
                    style={{ marginTop: '4%' }}
                />

                <TextPickerInfo>{text.info}</TextPickerInfo>

                <InputContainer>
                    <TextPickerInput
                        selectionColor="#000000"
                        placeholder="ID do funcionário"
                        value={inputText}
                        onChangeText={text => setInputText(text)}
                    />

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
