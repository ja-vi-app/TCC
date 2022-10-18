import { toast } from "react-toastify";
import { TOAST_TYPE } from "./Constants";

export function removeAllToaster() {
  toast.dismiss();
}

export const toasterModel = (message, type = "default", time = 5000) => {
  const toastProperties = {
    position: "top-center",
    autoClose: time,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    fontSize: "13px",
  };

  if (type === "default") {
    return toast(message, {
      ...toastProperties,
    });
  } else if (type === TOAST_TYPE.error) {
    toast.error(message, { ...toastProperties });
  } else if (type === TOAST_TYPE.success) {
    toast.success(message, { ...toastProperties });
  } else if (type === TOAST_TYPE.info) {
    toast.info(message, { ...toastProperties });
  } else if (type === "warning") {
    toast.warning(message, { ...toastProperties });
  }
};

export async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function isEmpty(value) {
  return value === "" || value === null || value === undefined;
}

export function isEmptyArray(array) {
  return !(Array.isArray(array) && array.length > 0);
}
