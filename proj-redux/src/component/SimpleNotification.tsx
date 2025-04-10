import { useEffect } from "react";

interface NotificationProps {
    message: string; 
    type?: "success" | "error" | "info"; 
    onClose: () => void
}

export interface NotificationType {
    message: string; 
    type?: "success" | "error" | "info"; 
}

export const SimpleNotification = ({ message, type = "success", onClose }: NotificationProps) => {
    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => onClose, 3000); 
            return () => clearTimeout(timer);
        }
    }, [message]);
    return (
        <div
            className={`fixed top-22 right-5 z-50 px-4 py-3 text-white rounded-md shadow-lg transition-transform duration-500 ${
                message ? "translate-x-0 opacity-100" : "translate-x-5 opacity-0"
            } ${
                type === "success" ? "bg-green-500" : type === "error" ? "bg-red-500" : "bg-blue-500"
            }`}
        >
            <div className="flex items-center">
                <span>{message}</span>
                <button className="text-white hover:text-gray-200" onClick={onClose}>×</button>
            </div>
        </div>
    );
};