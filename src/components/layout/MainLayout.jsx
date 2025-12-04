import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar.jsx';
import Header from './Header.jsx';
import Footer from './Footer.jsx';

const MainLayout = () => {
    return (
        <div className="flex h-screen bg-slate-50 overflow-hidden">
            {/* Sidebar fijo a la izquierda */}
            <Sidebar />

            {/* Contenedor principal a la derecha */}
            <div className="flex-1 flex flex-col ml-64 min-w-0 transition-all duration-300">

                {/* Header fijo arriba */}
                <Header />

                {/* Área de contenido con scroll */}
                <main className="flex-1 overflow-y-auto p-6 scroll-smooth">
                    <div className="max-w-7xl mx-auto min-h-[calc(100vh-140px)]">
                        {/* Aquí se renderizan las páginas (NuevoPedido, Dashboard, etc.) */}
                        <Outlet />
                    </div>
                    <Footer />
                </main>
            </div>
        </div>
    );
};

export default MainLayout;