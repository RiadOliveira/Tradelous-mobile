import React from 'react';
import { useModal } from '@hooks/modal';
import IconComponent from 'react-native-vector-icons/MaterialIcons';
import ModalContainer from 'react-native-modal';
import {
    ModalView,
    ModalText,
    ButtonsContainer,
    ModalButton,
    ModalButtonText,
} from './styles';

const Modal: React.FC = () => {
    const {
        modalProps: {
            isVisible,
            actionFunction,
            iconName,
            secondActionFunction,
            text,
            inputProps,
        },
        hideModal,
    } = useModal();

    const handleResponse = (response: boolean) => {
        hideModal();

        if (response && actionFunction) {
            actionFunction();
        } else if (!response && secondActionFunction) {
            secondActionFunction();
        }
    };

    return (
        <>
            {!inputProps && (
                <ModalContainer
                    isVisible={isVisible}
                    coverScreen={false}
                    onBackButtonPress={hideModal}
                    onBackdropPress={hideModal}
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    animationIn="fadeIn"
                    animationOut="fadeOut"
                >
                    <ModalView>
                        {iconName && (
                            <IconComponent
                                name={iconName}
                                size={64}
                                color="#fff"
                            />
                        )}

                        <ModalText>{text?.info}</ModalText>

                        <ButtonsContainer>
                            <ModalButton
                                style={{ backgroundColor: '#49b454' }}
                                onPress={() => handleResponse(true)}
                            >
                                <ModalButtonText>
                                    {text?.firstButton}
                                </ModalButtonText>
                            </ModalButton>

                            <ModalButton
                                style={{ backgroundColor: '#c93c3c' }}
                                onPress={() => handleResponse(false)}
                            >
                                <ModalButtonText>
                                    {text?.secondButton}
                                </ModalButtonText>
                            </ModalButton>
                        </ButtonsContainer>
                    </ModalView>
                </ModalContainer>
            )}
        </>
    );
};

export default Modal;
