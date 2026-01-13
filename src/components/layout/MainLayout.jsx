import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar.jsx';
import Header from './Header.jsx';
import Footer from './Footer.jsx';

const MainLayout = () => {
    return (
        <div className="flex h-screen bg-slate-50 overflow-hidden">
            {/* Navegación Lateral (Fija) */}
            <Sidebar />

            {/* Wrapper del Contenido */}
            <div className="flex-1 flex flex-col ml-64 min-w-0 transition-all duration-300">

                {/* Barra Superior */}
                <Header />

                {/* Área de Trabajo (Scrollable) */}
                <main className="flex-1 overflow-y-auto p-6 scroll-smooth">
                    <div className="max-w-7xl mx-auto min-h-[calc(100vh-140px)]">
                        {/* Inyección de vistas dinámicas */}
                        <Outlet />
                    </div>
                    <Footer />
                </main>
            </div>
        </div>
    );
};

export default MainLayout;