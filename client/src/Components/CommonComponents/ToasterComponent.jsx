import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToasterComponent = () => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={true}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      theme="dark"
      pauseOnFocusLoss
      draggable
      pauseOnHover
    />
  );
};

export default ToasterComponent;
