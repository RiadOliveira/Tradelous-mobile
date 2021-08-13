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

interface ModalProps {
    isVisible?: boolean;
    text: string;
    iconProps: {
        name: string;
        color: string;
    };
    actionFunction?: () => Promise<void>;
    setVisibility({ visibility }: { visibility: boolean }): void;
}

const Modal: React.FC<ModalProps> = ({
    isVisible = false,
    text,
    iconProps,
    setVisibility,
    actionFunction,
}) => {
    const handleResponse = (response: boolean) => {
        setVisibility({ visibility: false });

        if (response && actionFunction) {
            actionFunction();
        }
    };

    return (
        <ModalContainer
            isVisible={isVisible}
            coverScreen={false}
            onBackButtonPress={() => handleResponse(false)}
            onBackdropPress={() => handleResponse(false)}
            style={{ justifyContent: 'center', alignItems: 'center' }}
            animationIn="fadeIn"
            animationOut="fadeOut"
        >
            <ModalView>
                <Icon name={iconProps.name} size={56} color={iconProps.color} />

                <ModalText>{text}</ModalText>

                <ButtonsContainer>
                    <ModalButton
                        style={{ backgroundColor: '#49b454' }}
                        onPress={() => handleResponse(true)}
                    >
                        <ModalButtonText>Sim</ModalButtonText>
                    </ModalButton>

                    <ModalButton
                        style={{ backgroundColor: '#c93c3c' }}
                        onPress={handleResponse}
                    >
                        <ModalButtonText>Não</ModalButtonText>
                    </ModalButton>
                </ButtonsContainer>
            </ModalView>
        </ModalContainer>
    );
};

export default Modal;
