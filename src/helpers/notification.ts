import { notification } from 'antd';

export const showErrorNotification = (
  message: string,
  description = ''
): void => {
  notification.error({
    message,
    ...(description && { description }),
    placement: 'bottomRight',
  });
};
