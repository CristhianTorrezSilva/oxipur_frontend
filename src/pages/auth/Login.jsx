import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Shield, Truck, Package, Users, Briefcase } from 'lucide-react';
import Button from '../../components/ui/Button';

const Login = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(null);

    // Función para simular el login según el rol
    const handleRoleLogin = (rol, nombre, rutaInicial) => {
        setLoading(rol);

        // Guardamos en la "memoria" del navegador quién está logueado
        localStorage.setItem('userRole', rol);
        localStorage.setItem('userName', nombre);

        setTimeout(() => {
            navigate(rutaInicial);
        }, 800);
    };

    const roles = [
        { id: 'admin', label: 'Administrador', name: 'Admin General', icon: <Shield size={20}/>, route: '/dashboard', color: 'bg-slate-800 text-white' },
        { id: 'ventas', label: 'Enc. Ventas', name: 'Carla Vendedora', icon: <Briefcase size={20}/>, route: '/ventas/lista', color: 'bg-blue-600 text-white' },
        { id: 'logistica', label: 'Enc. Logística', name: 'Mario Logística', icon: <Truck size={20}/>, route: '/logistica/planificacion', color: 'bg-indigo-600 text-white' },
        { id: 'almacen', label: 'Enc. Almacén', name: 'Pedro Almacén', icon: <Package size={20}/>, route: '/almacen/inventario', color: 'bg-orange-600 text-white' },
        { id: 'cliente', label: 'Cliente', name: 'Clínica Incor', icon: <Users size={20}/>, route: '/ventas/lista', color: 'bg-green-600 text-white' },
        { id: 'chofer', label: 'Conductor', name: 'Juan Chofer', icon: <Truck size={20}/>, route: '/chofer/entrega', color: 'bg-gray-400 text-white' },
    ];

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 bg-white rounded-2xl shadow-xl overflow-hidden">

                {/* Lado Izquierdo: Branding */}
                <div className="bg-blue-900 p-12 text-white flex flex-col justify-center">
                    <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                        <span className="text-3xl font-bold">OX</span>
                    </div>
                    <h1 className="text-4xl font-bold mb-2">OXIPUR S.R.L.</h1>
                    <p className="text-blue-200 text-lg mb-8">Sistema de Gestión de Pedidos y Distribución de Oxígeno Medicinal.</p>
                    <div className="text-sm text-blue-400 mt-auto">
                        © 2025 Proyecto de Sistemas de Información
                    </div>
                </div>

                {/* Lado Derecho: Selector de Roles */}
                <div className="p-1 flex flex-col justify-center">
                    <h2 className="text-2xl font-bold text-black-800 mb-6 text-center">Seleccione un Rol para Ingresar</h2>

                    <div className="grid grid-cols-1 gap-3">
                        {roles.map((rol) => (
                            <button
                                key={rol.id}
                                onClick={() => handleRoleLogin(rol.id, rol.name, rol.route)}
                                disabled={loading !== null}
                                className={`
                  flex items-center gap-4 p-4 rounded-xl transition-all hover:scale-[1.02] active:scale-95 shadow-sm
                  ${rol.color} hover:opacity-90
                  ${loading === rol.id ? 'opacity-70 cursor-wait' : ''}
                `}
                            >
                                <div className="bg-white/20 p-1 rounded-lg">
                                    {rol.icon}
                                </div>
                                <div className="text-left">
                                    <p className="font-bold text-white">{rol.label}</p>
                                    <p className="text-white opacity-800">Ingresar como {rol.name}</p>
                                </div>
                                {loading === rol.id && <span className="ml-auto text-xs animate-pulse">Cargando...</span>}
                            </button>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Login;