import React from 'react';

const Input = ({
                   label,
                   type = 'text',
                   placeholder = '',
                   value,
                   onChange,
                   name,
                   className = ''
               }) => {
    return (
        <div className={`flex flex-col gap-1 mb-4 ${className}`}>
            {label && <label className="text-sm font-semibold text-gray-700">{label}</label>}
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow"
            />
        </div>
    );
};

export default Input;