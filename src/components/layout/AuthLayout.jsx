import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Logo central */}
                <div className="flex justify-center mb-8">
                    <div className="bg-blue-600 text-white p-3 rounded-xl shadow-lg flex items-center gap-3">
                        <span className="font-bold text-2xl tracking-tighter">OX</span>
                        <span className="font-medium">OXIPUR S.R.L.</span>
                    </div>
                </div>

                {/* Contenido (Login o Vista Móvil) */}
                <Outlet />
            </div>
        </div>
    );
};

export default AuthLayout;