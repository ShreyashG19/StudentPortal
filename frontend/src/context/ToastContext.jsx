import React, { createContext, useContext } from "react";
import toast, { Toaster } from "react-hot-toast";

const ToastContext = createContext();

export function ToastProvider({ children }) {
    let loadingToastId;
    const showSuccess = (message) => {
        if (loadingToastId) {
            toast.dismiss(loadingToastId);
        }
        toast.success(message);
        loadingToastId = undefined;
    };
    const showError = (message) => {
        if (loadingToastId) {
            toast.dismiss(loadingToastId);
        }
        toast.error(message);
        loadingToastId = undefined;
    };
    const showLoading = (message) => {
        loadingToastId = toast.loading(message);
    };
    const showInfo = (message) => {
        if (loadingToastId) {
            toast.dismiss(loadingToastId);
        }
        toast(message);
        loadingToastId = undefined;
    };

    return (
        <ToastContext.Provider
            value={{ showSuccess, showError, showInfo, showLoading }}
        >
            {children}
            {/* Add toaster container once at the root */}
            <Toaster
                position="top-center"
                toastOptions={{
                    style: {
                        fontSize: "14px",
                        borderRadius: "8px",
                        padding: "10px 16px",
                    },
                }}
            />
        </ToastContext.Provider>
    );
}

export const useToast = () => useContext(ToastContext);
