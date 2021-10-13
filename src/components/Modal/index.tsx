import React from 'react';
import { useModal } from '@hooks/modal';
import ModalContainer from 'react-native-modal';
import {
    ModalView,
    Icon,
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
            willUnmount,
        },
        hideModal,
    } = useModal();

    const handleResponse = (response: boolean) => {
        if (!willUnmount || !response) {
            hideModal();
        }

        if (response && actionFunction) {
            actionFunction();
        } else if (!response && secondActionFunction) {
            secondActionFunction();
        }
    };

    return (
        <ModalContainer
            isVisible={isVisible}
            coverScreen={false}
            onBackButtonPress={() => hideModal}
            onBackdropPress={() => hideModal}
            style={{
                justifyContent: 'center',
                alignItems: 'center',
            }}
            animationIn="fadeIn"
            animationOut="fadeOut"
        >
            <ModalView>
                {iconName && <Icon name={iconName} size={56} color="#fff" />}

                <ModalText>{text?.info}</ModalText>

                <ButtonsContainer>
                    <ModalButton
                        style={{ backgroundColor: '#49b454' }}
                        onPress={() => handleResponse(true)}
                    >
                        <ModalButtonText>{text?.firstButton}</ModalButtonText>
                    </ModalButton>

                    <ModalButton
                        style={{ backgroundColor: '#c93c3c' }}
                        onPress={() => handleResponse(false)}
                    >
                        <ModalButtonText>{text?.secondButton}</ModalButtonText>
                    </ModalButton>
                </ButtonsContainer>
            </ModalView>
        </ModalContainer>
    );
};

export default Modal;
