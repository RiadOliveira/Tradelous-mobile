import React, { ReactNode } from 'react';
import Toast, { BaseToast, BaseToastProps } from 'react-native-toast-message';

const toastConfig = {
    success: ({ text1, ...rest }: BaseToastProps): ReactNode => (
        <BaseToast
            {...rest}
            style={{ borderLeftColor: '#1c274e', elevation: 10 }}
            contentContainerStyle={{ paddingHorizontal: 15 }}
            text1Style={{
                fontSize: 16,
            }}
            text1={text1}
            onTrailingIconPress={Toast.hide}
        />
    ),
};

export default toastConfig;
