import React, { useState } from 'react';
import {
    Search, UserPlus, Shield, CheckCircle,
    XCircle, MoreVertical, Edit, UserX
} from 'lucide-react';
import Button from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';

// --- DATOS MOCK (Simulación DB) ---
const INITIAL_USERS = [
    { id: 1, nombre: 'Admin General', email: 'admin@oxipur.com', rol: 'admin', estado: 'activo', ultimoAcceso: '2023-10-25 10:42' },
    { id: 2, nombre: 'Juan Chofer', email: 'juan.perez@oxipur.com', rol: 'chofer', estado: 'activo', ultimoAcceso: '2023-10-25 08:15' },
    { id: 3, nombre: 'Carla Ventas', email: 'carla@oxipur.com', rol: 'ventas', estado: 'inactivo', ultimoAcceso: '2023-09-10 14:00' },
    { id: 4, nombre: 'Mario Logística', email: 'mario@oxipur.com', rol: 'logistica', estado: 'activo', ultimoAcceso: '2023-10-24 18:30' },
];

const Usuarios = () => {
    const [usuarios, setUsuarios] = useState(INITIAL_USERS);
    const [busqueda, setBusqueda] = useState('');

    // --- LÓGICA DE NEGOCIO SEGURA ---

    // Función para "Dar de Baja" o Reactivar (Soft Delete)
    const toggleEstadoUsuario = (id) => {
        setUsuarios(prev => prev.map(user => {
            if (user.id === id) {
                const nuevoEstado = user.estado === 'activo' ? 'inactivo' : 'activo';
                // En un sistema real, aquí harías una petición PUT al backend
                return { ...user, estado: nuevoEstado };
            }
            return user;
        }));
    };

    // Filtrado en tiempo real
    const usuariosFiltrados = usuarios.filter(user =>
        user.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        user.rol.toLowerCase().includes(busqueda.toLowerCase())
    );

    // --- COMPONENTES VISUALES ---

    const RoleBadge = ({ rol }) => {
        const colors = {
            admin: 'bg-purple-100 text-purple-700 border-purple-200',
            chofer: 'bg-blue-100 text-blue-700 border-blue-200',
            ventas: 'bg-orange-100 text-orange-700 border-orange-200',
            logistica: 'bg-cyan-100 text-cyan-700 border-cyan-200',
        };
        return (
            <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase border ${colors[rol] || 'bg-gray-100 text-gray-600'}`}>
                {rol}
            </span>
        );
    };

    const StatusBadge = ({ estado }) => (
        <span className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full w-fit ${
            estado === 'activo' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
        }`}>
            {estado === 'activo' ? <CheckCircle size={12}/> : <XCircle size={12}/>}
            {estado === 'activo' ? 'Acceso Permitido' : 'Acceso Bloqueado'}
        </span>
    );

    return (
        <div className="space-y-6 animate-in fade-in duration-500">

            {/* Header de la Página */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                        <Shield className="text-blue-600" /> Administración de Usuarios
                    </h1>
                    <p className="text-slate-500 text-sm">Gestión de accesos, roles y auditoría de personal.</p>
                </div>
                <Button variant="primary" className="shadow-lg shadow-blue-500/20">
                    <UserPlus size={18} className="mr-2" /> Nuevo Usuario
                </Button>
            </div>

            {/* Barra de Búsqueda y Filtros */}
            <Card className="p-4 bg-white shadow-sm border border-slate-200">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input
                        type="text"
                        placeholder="Buscar por nombre, rol o email..."
                        className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                    />
                </div>
            </Card>

            {/* Tabla de Usuarios */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 text-slate-500 font-semibold uppercase tracking-wider border-b border-slate-200">
                        <tr>
                            <th className="p-4">Usuario</th>
                            <th className="p-4">Rol / Permisos</th>
                            <th className="p-4">Estado Actual</th>
                            <th className="p-4">Última Sesión</th>
                            <th className="p-4 text-right">Acciones</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                        {usuariosFiltrados.map((user) => (
                            <tr key={user.id} className="hover:bg-slate-50 transition-colors group">
                                <td className="p-4">
                                    <div className="font-bold text-slate-800">{user.nombre}</div>
                                    <div className="text-xs text-slate-400">{user.email}</div>
                                </td>
                                <td className="p-4">
                                    <RoleBadge rol={user.rol} />
                                </td>
                                <td className="p-4">
                                    <StatusBadge estado={user.estado} />
                                </td>
                                <td className="p-4 text-slate-500 tabular-nums">
                                    {user.ultimoAcceso}
                                </td>
                                <td className="p-4 text-right">
                                    <div className="flex justify-end gap-2">
                                        {/* Botón Editar */}
                                        <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Editar datos">
                                            <Edit size={18} />
                                        </button>

                                        {/* Botón DAR DE BAJA / REACTIVAR */}
                                        <button
                                            onClick={() => toggleEstadoUsuario(user.id)}
                                            className={`p-2 rounded-lg transition-colors border ${
                                                user.estado === 'activo'
                                                    ? 'text-red-500 border-red-100 hover:bg-red-50 hover:border-red-200'
                                                    : 'text-green-600 border-green-100 hover:bg-green-50 hover:border-green-200'
                                            }`}
                                            title={user.estado === 'activo' ? "Dar de baja (Bloquear acceso)" : "Reactivar acceso"}
                                        >
                                            {user.estado === 'activo' ? <UserX size={18} /> : <CheckCircle size={18} />}
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                {usuariosFiltrados.length === 0 && (
                    <div className="p-8 text-center text-slate-400">
                        No se encontraron usuarios con ese criterio.
                    </div>
                )}
            </div>
        </div>
    );
};

export default Usuarios;