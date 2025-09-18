import { notifications } from "@mantine/notifications";

const useToast = () => {
  const showToast = (options: ToastType) => {
    notifications.show({
      title: options.title,
      message: options.message,
      color: options.color,
      position: "top-right",
      autoClose: options.autoClose,
      withCloseButton: options.withCloseButton,
      loading: options.loading,
    });
  };

  const clearToasts = () => {
    notifications.clean();
  };

  return { showToast, clearToasts };
};

export default useToast;
