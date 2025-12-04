import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard, ShoppingCart, Truck, Package,
    Users, FileText, MessageSquareWarning, Map, LogOut, ShieldCheck
} from 'lucide-react';

const Sidebar = () => {
    const navigate = useNavigate();
    const rolUsuario = localStorage.getItem('userRole') || 'admin';
    const nombreUsuario = localStorage.getItem('userName') || 'Usuario';

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    const allMenuItems = [
        {
            path: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} />,
            roles: ['admin', 'ventas', 'logistica']
        },

        // SECCIÓN VENTAS
        { section: 'VENTAS', roles: ['admin', 'ventas', 'cliente'] },
        {
            path: '/ventas/nuevo', label: 'Nuevo Pedido', icon: <ShoppingCart size={20} />,
            roles: ['admin', 'ventas', 'cliente']
        },
        {
            path: '/ventas/lista', label: 'Mis Pedidos', icon: <FileText size={20} />,
            roles: ['admin', 'ventas', 'cliente']
        },
        {
            path: '/clientes', label: 'Cartera Clientes', icon: <Users size={20} />,
            roles: ['admin', 'ventas']
        },

        // SECCIÓN LOGÍSTICA
        { section: 'LOGÍSTICA', roles: ['admin', 'logistica'] },
        {
            path: '/logistica/planificacion', label: 'Planificar Rutas', icon: <Map size={20} />,
            roles: ['admin', 'logistica']
        },
        {
            path: '/logistica/despacho', label: 'Guías Despacho', icon: <Truck size={20} />,
            roles: ['admin', 'logistica']
        },

        // SECCIÓN ALMACÉN
        { section: 'ALMACÉN', roles: ['admin', 'almacen', 'logistica'] },
        {
            path: '/almacen/inventario', label: 'Inventario', icon: <Package size={20} />,
            roles: ['admin', 'almacen', 'logistica']
        },

        // SECCIÓN SOPORTE
        { section: 'SOPORTE', roles: ['admin', 'ventas', 'cliente'] },
        {
            path: '/reclamos', label: 'Reclamos', icon: <MessageSquareWarning size={20} />,
            roles: ['admin', 'ventas', 'cliente']
        },
        {
            path: '/reportes', label: 'Reportes', icon: <FileText size={20} />,
            roles: ['admin']
        },

        // --- AQUÍ ESTABA LO QUE FALTABA ---
        // SECCIÓN ADMIN (Solo para el rol admin)
        { section: 'ADMINISTRACIÓN', roles: ['admin'] },
        {
            path: '/admin/usuarios', label: 'Usuarios y Roles', icon: <ShieldCheck size={20} />,
            roles: ['admin']
        },
    ];

    const menuFiltrado = allMenuItems.filter(item => item.roles.includes(rolUsuario));

    return (
        <aside className="w-64 bg-slate-900 text-white h-screen flex flex-col fixed left-0 top-0 shadow-xl z-20 overflow-y-auto">
            {/* Logo */}
            <div className="p-6 border-b border-slate-800 flex items-center gap-3">
                <div className="bg-blue-600 p-2 rounded-lg">
                    <span className="font-bold text-xl">OX</span>
                </div>
                <div>
                    <h1 className="text-lg font-bold tracking-wider">OXIPUR</h1>
                    <p className="text-xs text-slate-400 capitalize">{rolUsuario}</p>
                </div>
            </div>

            {/* Navegación Dinámica */}
            <nav className="flex-1 py-6 px-3 space-y-1">
                {menuFiltrado.map((item, index) => (
                    item.section ? (
                        <div key={index} className="px-3 mt-6 mb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                            {item.section}
                        </div>
                    ) : (
                        <NavLink
                            key={index}
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                                    isActive
                                        ? 'bg-blue-600 text-white shadow-md'
                                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                                }`
                            }
                        >
                            {item.icon}
                            <span className="font-medium">{item.label}</span>
                        </NavLink>
                    )
                ))}
            </nav>

            {/* Footer del Sidebar */}
            <div className="p-4 border-t border-slate-800">
                <div className="flex items-center justify-between p-2 bg-slate-800 rounded-lg">
                    <div className="flex items-center gap-2 overflow-hidden">
                        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center font-bold text-xs shrink-0 uppercase">
                            {nombreUsuario.charAt(0)}
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-xs font-bold truncate">{nombreUsuario}</p>
                            <p className="text-[10px] text-slate-400 truncate capitalize">{rolUsuario}</p>
                        </div>
                    </div>
                    <button onClick={handleLogout} className="text-slate-400 hover:text-white p-1" title="Cerrar Sesión">
                        <LogOut size={16} />
                    </button>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;