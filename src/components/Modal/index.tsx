import { useModal } from '@hooks/modal';
import React from 'react';
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
            setVisibility,
            text,
            willUnmount,
        },
    } = useModal();

    const handleResponse = (response: boolean) => {
        if ((!willUnmount || !response) && setVisibility) {
            setVisibility({ visibility: false });
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
            onBackButtonPress={() =>
                setVisibility && setVisibility({ visibility: false })
            }
            onBackdropPress={() =>
                setVisibility && setVisibility({ visibility: false })
            }
            style={{
                justifyContent: 'center',
                alignItems: 'center',
            }}
            animationIn="fadeIn"
            animationOut="fadeOut"
        >
            <ModalView>
                <Icon name={iconName || ''} size={56} color="#fff" />

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
