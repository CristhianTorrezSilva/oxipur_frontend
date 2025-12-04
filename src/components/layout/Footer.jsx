import React from 'react';

const Footer = () => {
    return (
        <footer className="py-4 text-center text-xs text-gray-400">
            <p>&copy; {new Date().getFullYear()} OXIPUR S.R.L. - Sistema de Gestión de Pedidos y Distribución</p>
        </footer>
    );
};

export default Footer;