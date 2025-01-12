import React from 'react';
import { X } from 'lucide-react';

interface ModalProps {
    open: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ open, onClose, title, children }) => {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative w-full max-w-md max-h-full p-6 bg-white rounded-lg shadow-lg overflow-y-auto">
                {title && (
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-semibold">{title}</h2>
                        <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
                            <X size={20} />
                        </button>
                    </div>
                )}
                <div>{children}</div>
            </div>
        </div>

    );
};

export default Modal;
