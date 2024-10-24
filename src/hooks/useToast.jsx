import { useState, useContext, createContext } from "react";
import Toast from "../components/Toast";

const ToastContext = createContext({
  addToast: (message, type, duration) => {},
});

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type, duration = 3000) => {
    const id = Date.now();
    setToasts([...toasts, { id, message, type, isVisible: true }]);

    setTimeout(() => {
      setToasts((currentToasts) =>
        currentToasts.map((toast) =>
          toast.id === id ? { ...toast, isVisible: false } : toast
        )
      );

      setTimeout(() => {
        setToasts((currentToasts) =>
          currentToasts.filter((toast) => toast.id !== id)
        );
      }, 500);
    }, duration);
  };

  return (
    <ToastContext.Provider value={addToast}>
      {children}
      <div
        style={{
          zIndex: 99999999,
          position: "fixed",
          top: 20,
          right: 20,
          margin: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "5px",
        }}
      >
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            message={toast.message}
            role={toast.type}
            isVisible={toast.isVisible}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("need ToastProvider!");
  }

  return context;
};
