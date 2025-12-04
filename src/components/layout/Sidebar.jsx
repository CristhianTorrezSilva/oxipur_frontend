import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    ShoppingCart,
    Truck,
    Package,
    Users,
    FileText,
    MessageSquareWarning,
    Settings,
    Map
} from 'lucide-react';

const Sidebar = () => {
    const menuItems = [
        { path: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },

        // Subsistema Ventas
        { section: 'VENTAS' },
        { path: '/ventas/nuevo', label: 'Nuevo Pedido', icon: <ShoppingCart size={20} /> },
        { path: '/ventas/lista', label: 'Lista de Pedidos', icon: <FileText size={20} /> },
        { path: '/clientes', label: 'Clientes', icon: <Users size={20} /> },

        // Subsistema Logística
        { section: 'LOGÍSTICA' },
        { path: '/logistica/planificacion', label: 'Planificar Rutas', icon: <Map size={20} /> },
        { path: '/logistica/despacho', label: 'Guías Despacho', icon: <Truck size={20} /> },

        // Subsistema Almacén
        { section: 'ALMACÉN' },
        { path: '/almacen/inventario', label: 'Inventario', icon: <Package size={20} /> },

        // Subsistema Soporte
        { section: 'SOPORTE' },
        { path: '/reclamos', label: 'Reclamos', icon: <MessageSquareWarning size={20} /> },
        { path: '/reportes', label: 'Reportes', icon: <FileText size={20} /> },
    ];

    return (
        <aside className="w-64 bg-slate-900 text-white h-screen flex flex-col fixed left-0 top-0 shadow-xl z-20 overflow-y-auto">
            {/* Logo Area */}
            <div className="p-6 border-b border-slate-800 flex items-center gap-3">
                <div className="bg-blue-600 p-2 rounded-lg">
                    <span className="font-bold text-xl">OX</span>
                </div>
                <div>
                    <h1 className="text-lg font-bold tracking-wider">OXIPUR</h1>
                    <p className="text-xs text-slate-400">Sistema de Gestión</p>
                </div>
            </div>

            {/* Menu Items */}
            <nav className="flex-1 py-6 px-3 space-y-1">
                {menuItems.map((item, index) => (
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
                <div className="flex items-center gap-3 p-2 bg-slate-800 rounded-lg">
                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center font-bold">
                        A
                    </div>
                    <div className="overflow-hidden">
                        <p className="text-sm font-medium truncate">Admin Oxipur</p>
                        <p className="text-xs text-slate-400 truncate">admin@oxipur.bo</p>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;