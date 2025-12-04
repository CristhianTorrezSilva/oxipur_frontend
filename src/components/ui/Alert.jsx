import React from 'react';
import { AlertCircle, CheckCircle, Info } from 'lucide-react'; // Asegúrate de tener lucide-react instalado

const Alert = ({ title, children, variant = 'info', className = '' }) => {

    const styles = {
        info: "bg-blue-50 text-blue-800 border-blue-200",
        success: "bg-green-50 text-green-800 border-green-200",
        warning: "bg-yellow-50 text-yellow-800 border-yellow-200",
        error: "bg-red-50 text-red-800 border-red-200"
    };

    const icons = {
        info: <Info className="w-5 h-5" />,
        success: <CheckCircle className="w-5 h-5" />,
        warning: <AlertCircle className="w-5 h-5" />,
        error: <AlertCircle className="w-5 h-5" />
    };

    return (
        <div className={`flex gap-3 p-4 border rounded-lg ${styles[variant]} ${className}`}>
            <div className="flex-shrink-0 mt-0.5">
                {icons[variant]}
            </div>
            <div>
                {title && <h5 className="font-bold mb-1">{title}</h5>}
                <div className="text-sm opacity-90">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Alert;