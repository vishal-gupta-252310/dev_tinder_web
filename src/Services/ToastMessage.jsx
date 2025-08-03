import { toast } from "react-toastify";

const ToastService = {
  success: (message, options = {}) => {
    toast.success(message, { ...options });
  },
  error: (message, options = {}) => {
    toast.error(message, { ...options });
  },
  info: (message, options = {}) => {
    toast.info(message, { ...options });
  },
  warn: (message, options = {}) => {
    toast.warn(message, { ...options });
  },
};

export default ToastService;
