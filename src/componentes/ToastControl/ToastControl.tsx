import React from "react";
import "./ToastControl.css";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const showToast = (type: string, message : string ) : void => {
  switch (type) {
    case 'sucesso':
      toast.success(message);
      break;
    case 'aviso':
      toast.warn(message);
      break;
    case 'erro':
      toast.error(message);
      break;
    default:
      toast(message);
      break;
  }
};
function ToastControl() : JSX.Element {
  return <ToastContainer />;
}

export default ToastControl