import React, { createContext, useState, useContext, useCallback } from 'react';
import Modal from '@components/Modal';
import TextPicker from '@components/TextPicker';

interface IModalProps {
    isVisible?: boolean;
    text?: {
        info: string;
        firstButton: string;
        secondButton?: string; //When is TextPicker
    };
    iconName?: string;
    willUnmount?: boolean; //If actionFunction unmount modal's parent.
    actionFunction?: (pickedText?: string) => Promise<void>; //PickedText when is TextPicker
    secondActionFunction?: () => Promise<void>;
    inputProps?: {
        placeholder: string;
        hasPasteButton: boolean;
        isSecureText: boolean;
    };
}

interface IModalContextData {
    modalProps: IModalProps;
    showModal: (ModalProps: Omit<IModalProps, 'isVisible'>) => void;
    hideModal: () => void;
}

const modalContext = createContext<IModalContextData>({} as IModalContextData);

const ModalContext: React.FC = ({ children }) => {
    const [modalProps, setModalProps] = useState<IModalProps>({
        isVisible: false,
    });

    const showModal = useCallback((props: Omit<IModalProps, 'isVisible'>) => {
        setModalProps({ ...props, isVisible: true });
    }, []);

    const hideModal = useCallback(
        () => setModalProps({ isVisible: false }),
        [],
    );

    return (
        <modalContext.Provider
            value={{
                modalProps,
                showModal,
                hideModal,
            }}
        >
            {children}
            <Modal />
            <TextPicker />
        </modalContext.Provider>
    );
};

const useModal = (): IModalContextData => useContext(modalContext);

export { ModalContext, useModal };
