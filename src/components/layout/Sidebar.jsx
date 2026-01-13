import React, { useMemo } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard, ShoppingCart, Truck, Package,
    Users, FileText, MessageSquareWarning, Map, LogOut, ShieldCheck
} from 'lucide-react';

// --- CONFIGURACIÓN DEL MENÚ (Datos estáticos fuera del componente) ---
// Esto facilita añadir nuevos ítems sin tocar la lógica visual.
const MENU_ITEMS = [
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
    {
        path: '/logistica/zonas', label: 'Config. Zonas', icon: <Map size={20} />,
        roles: ['admin', 'logistica']
    },
    // SECCIÓN ALMACÉN
    { section: 'ALMACÉN', roles: ['admin', 'almacen', 'logistica'] },
    {
        path: '/almacen/inventario', label: 'Inventario', icon: <Package size={20} />,
        roles: ['admin', 'almacen', 'logistica']
    },
    // SECCIÓN SOPORTE & ADMIN
    { section: 'SOPORTE', roles: ['admin', 'ventas', 'cliente'] },
    {
        path: '/reclamos', label: 'Reclamos', icon: <MessageSquareWarning size={20} />,
        roles: ['admin', 'ventas', 'cliente']
    },
    {
        path: '/reportes', label: 'Reportes', icon: <FileText size={20} />,
        roles: ['admin']
    },
    { section: 'ADMINISTRACIÓN', roles: ['admin'] },
    {
        path: '/admin/usuarios', label: 'Usuarios y Roles', icon: <ShieldCheck size={20} />,
        roles: ['admin']
    },
];

// --- SUB-COMPONENTES (Para mantener el código limpio) ---

const MenuItem = ({ item }) => (
    <NavLink
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
);

const MenuSection = ({ label }) => (
    <div className="px-3 mt-6 mb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
        {label}
    </div>
);

// --- COMPONENTE PRINCIPAL ---

const Sidebar = () => {
    const navigate = useNavigate();

    // Obtención segura de datos de sesión
    const rolUsuario = localStorage.getItem('userRole') || 'public';
    const nombreUsuario = localStorage.getItem('userName') || 'Invitado';

    const handleLogout = () => {
        // Limpieza profunda de sesión (Best Practice)
        localStorage.removeItem('oxipur_token');
        localStorage.removeItem('userRole');
        localStorage.removeItem('userName');
        navigate('/login');
    };

    // Optimización: Solo recalcula el menú si cambia el rol (Performance)
    const allowedMenuItems = useMemo(() => {
        return MENU_ITEMS.filter(item => item.roles.includes(rolUsuario));
    }, [rolUsuario]);

    return (
        <aside className="w-64 bg-slate-900 text-white h-screen flex flex-col fixed left-0 top-0 shadow-xl z-20">

            {/* 1. Header del Sidebar */}
            <div className="p-6 border-b border-slate-800 flex items-center gap-3">
                <div className="bg-blue-600 p-2 rounded-lg shadow-lg shadow-blue-900/50">
                    <span className="font-bold text-xl">OX</span>
                </div>
                <div>
                    <h1 className="text-lg font-bold tracking-wider">OXIPUR</h1>
                    <div className="flex items-center gap-1">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                        <p className="text-xs text-slate-400 capitalize">{rolUsuario}</p>
                    </div>
                </div>
            </div>

            {/* 2. Navegación Scrollable */}
            <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto custom-scrollbar">
                {allowedMenuItems.map((item, index) =>
                    item.section ? (
                        <MenuSection key={index} label={item.section} />
                    ) : (
                        <MenuItem key={index} item={item} />
                    )
                )}
            </nav>

            {/* 3. Footer de Usuario */}
            <div className="p-4 border-t border-slate-800 bg-slate-900">
                <div className="flex items-center justify-between p-2 bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors cursor-pointer group">
                    <div className="flex items-center gap-3 overflow-hidden">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-500 to-blue-400 flex items-center justify-center font-bold text-sm shrink-0 uppercase shadow-md">
                            {nombreUsuario.charAt(0)}
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-xs font-bold truncate group-hover:text-white text-slate-200">
                                {nombreUsuario}
                            </p>
                            <p className="text-[10px] text-slate-400 truncate">Sesión Segura</p>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="text-slate-400 hover:text-red-400 p-2 rounded-md transition-colors"
                        title="Cerrar Sesión Segura"
                    >
                        <LogOut size={18} />
                    </button>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;