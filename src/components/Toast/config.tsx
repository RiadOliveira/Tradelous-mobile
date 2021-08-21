import React, { ReactNode } from 'react';
import Toast, { BaseToast, BaseToastProps } from 'react-native-toast-message';

type PropsWithColor = BaseToastProps & {
    color: string;
};

const BaseToastCompoent: React.FC<PropsWithColor> = ({
    text1,
    text2,
    color,
    ...rest
}: PropsWithColor) => (
    <BaseToast
        {...rest}
        style={{
            borderLeftColor: color,
            elevation: 10,
        }}
        contentContainerStyle={{
            paddingHorizontal: 15,
            width: '100%',
        }}
        text1Style={{
            fontSize: text2 ? 14 : 16,
            width: 310,
        }}
        text1={text1}
        text2Style={{
            fontSize: 12,
            color: '#696969',
            width: 310,
        }}
        text2={text2}
        onTrailingIconPress={Toast.hide}
    />
);

const toastConfig = {
    success: (props: BaseToastProps): ReactNode => (
        <BaseToastCompoent color="#1b6b1b" {...props} />
    ),
    error: (props: BaseToastProps): ReactNode => (
        <BaseToastCompoent color="#de4343" {...props} />
    ),
    info: (props: BaseToastProps): ReactNode => (
        <BaseToastCompoent color="#1c274e" {...props} />
    ),
};

export default toastConfig;
