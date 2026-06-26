import { Alert as RNAlert, Platform } from 'react-native';

export interface AlertButton {
  text?: string;
  onPress?: () => void;
  style?: 'default' | 'cancel' | 'destructive';
}

export const Alert = {
  alert: (
    title: string,
    message?: string,
    buttons?: AlertButton[],
    options?: { cancelable?: boolean }
  ) => {
    if (Platform.OS === 'web') {
      const formattedMessage = message ? `${title}\n\n${message}` : title;
      if (buttons && buttons.length > 0) {
        // Find cancel and action buttons
        const cancelBtn = buttons.find(b => b.style === 'cancel');
        const confirmBtn = buttons.find(b => b.style !== 'cancel') || buttons[0];
        
        const result = window.confirm(formattedMessage);
        if (result) {
          if (confirmBtn && confirmBtn.onPress) confirmBtn.onPress();
        } else {
          if (cancelBtn && cancelBtn.onPress) cancelBtn.onPress();
        }
      } else {
        window.alert(formattedMessage);
      }
    } else {
      RNAlert.alert(title, message, buttons, options);
    }
  }
};
