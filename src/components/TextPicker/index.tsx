import { useModal } from '@hooks/modal';
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

const TextPicker: React.FC = () => {
    const {
        modalProps: { isVisible, actionFunction, iconName, text, inputProps },
        hideModal,
    } = useModal();

    const [inputText, setInputText] = useState('');

    const handleResponse = async () => {
        hideModal();
        setInputText('');

        if (actionFunction) {
            actionFunction(inputText);
        }
    };

    const handleCloseModal = () => {
        hideModal();
        setInputText('');
    };

    return (
        <>
            {inputProps && (
                <ModalContainer
                    isVisible={isVisible}
                    coverScreen={false}
                    onBackButtonPress={handleCloseModal}
                    onBackdropPress={handleCloseModal}
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    animationIn="fadeIn"
                    animationOut="fadeOut"
                >
                    <TextPickerView>
                        {iconName && (
                            <Icon
                                name={iconName}
                                size={80}
                                color="#fff"
                                style={{ marginTop: '4%' }}
                            />
                        )}

                        <TextPickerInfo>{text?.info}</TextPickerInfo>

                        <InputContainer>
                            <TextPickerInput
                                hasPasteButton={
                                    inputProps?.hasPasteButton || false
                                }
                                autoCapitalize="none"
                                autoCorrect={false}
                                returnKeyType="send"
                                selectionColor="#000000"
                                placeholder={inputProps?.placeholder}
                                value={inputText}
                                onChangeText={text => setInputText(text)}
                                onSubmitEditing={handleResponse}
                                secureTextEntry={inputProps?.isSecureText}
                            />

                            {inputProps?.hasPasteButton && (
                                <PasteButton
                                    activeOpacity={0.75}
                                    onPress={() =>
                                        Clipboard.getString().then(response =>
                                            setInputText(response),
                                        )
                                    }
                                >
                                    <Icon
                                        name="content-paste"
                                        color="#fff"
                                        size={24}
                                    />
                                </PasteButton>
                            )}
                        </InputContainer>

                        <ConfirmButton
                            style={{ backgroundColor: '#45a84f' }}
                            onPress={handleResponse}
                        >
                            <ConfirmButtonText>
                                {text?.firstButton}
                            </ConfirmButtonText>
                        </ConfirmButton>
                    </TextPickerView>
                </ModalContainer>
            )}
        </>
    );
};

export default TextPicker;
