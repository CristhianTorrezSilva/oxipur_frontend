import React from 'react';

// El contenedor principal
export const Card = ({ children, className = '' }) => {
    return (
        <div className={`bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden ${className}`}>
            {children}
        </div>
    );
};

// Cabecera de la tarjeta
export const CardHeader = ({ children, className = '' }) => {
    return (
        <div className={`px-6 py-4 border-b border-gray-100 ${className}`}>
            {children}
        </div>
    );
};

// Título de la tarjeta
export const CardTitle = ({ children, className = '' }) => {
    return (
        <h3 className={`text-lg font-bold text-gray-800 ${className}`}>
            {children}
        </h3>
    );
};

// Cuerpo/Contenido de la tarjeta
export const CardContent = ({ children, className = '' }) => {
    return (
        <div className={`p-6 ${className}`}>
            {children}
        </div>
    );
};