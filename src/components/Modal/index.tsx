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
    text: {
        info: string;
        firstButton: string;
        secondButton: string;
    };
    iconName: string;
    willUnmount?: boolean; //If actionFunction unmount modal's parent.
    actionFunction?: () => Promise<void>;
    secondActionFunction?: () => Promise<void>;
    setVisibility({ visibility }: { visibility: boolean }): void;
}

const Modal: React.FC<ModalProps> = ({
    isVisible = false,
    text,
    iconName,
    willUnmount = false,
    setVisibility,
    actionFunction,
    secondActionFunction,
}) => {
    const handleResponse = (response: boolean) => {
        if (!willUnmount || !response) {
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
            onBackButtonPress={() => setVisibility({ visibility: false })}
            onBackdropPress={() => setVisibility({ visibility: false })}
            style={{
                justifyContent: 'center',
                alignItems: 'center',
            }}
            animationIn="fadeIn"
            animationOut="fadeOut"
        >
            <ModalView>
                <Icon name={iconName} size={56} color="#fff" />

                <ModalText>{text.info}</ModalText>

                <ButtonsContainer>
                    <ModalButton
                        style={{ backgroundColor: '#49b454' }}
                        onPress={() => handleResponse(true)}
                    >
                        <ModalButtonText>{text.firstButton}</ModalButtonText>
                    </ModalButton>

                    <ModalButton
                        style={{ backgroundColor: '#c93c3c' }}
                        onPress={() => handleResponse(false)}
                    >
                        <ModalButtonText>{text.secondButton}</ModalButtonText>
                    </ModalButton>
                </ButtonsContainer>
            </ModalView>
        </ModalContainer>
    );
};

export default Modal;
