import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Truck, Package, Briefcase, ChevronRight, Lock, ArrowLeft, Smartphone, Key } from 'lucide-react';
import Button from '../../components/ui/Button';
import Alert from '../../components/ui/Alert';

const Login = () => {
    const navigate = useNavigate();

    // ESTADOS DEL PROCESO DE LOGIN
    const [step, setStep] = useState('roles'); // 'roles' | 'credentials' | 'mfa'
    const [selectedUser, setSelectedUser] = useState(null);
    const [password, setPassword] = useState('');
    const [mfaCode, setMfaCode] = useState('');
    const [loading, setLoading] = useState(false);

    // MOCK: Roles Disponibles
    const roles = [
        { id: 'admin', label: 'Administrador', name: 'Admin General', email: 'admin@oxipur.bo', icon: <Shield size={20}/>, route: '/dashboard', color: 'bg-slate-800' },
        { id: 'ventas', label: 'Enc. Ventas', name: 'Carla Vendedora', email: 'ventas@oxipur.bo', icon: <Briefcase size={20}/>, route: '/ventas/lista', color: 'bg-blue-600' },
        { id: 'logistica', label: 'Enc. Logística', name: 'Mario Logística', email: 'logistica@oxipur.bo', icon: <Truck size={20}/>, route: '/logistica/planificacion', color: 'bg-indigo-600' },
        { id: 'almacen', label: 'Enc. Almacén', name: 'Pedro Almacén', email: 'almacen@oxipur.bo', icon: <Package size={20}/>, route: '/almacen/inventario', color: 'bg-orange-600' },
        { id: 'chofer', label: 'Conductor', name: 'Juan Chofer', email: 'chofer@oxipur.bo', icon: <Truck size={20}/>, route: '/chofer/entrega', color: 'bg-gray-600' },
    ];

    // PASO 1 -> 2: SELECCIONAR USUARIO
    const handleSelectUser = (rol) => {
        setSelectedUser(rol);
        setStep('credentials');
        setPassword('');
    };

    // PASO 2 -> 3: VALIDAR CREDENCIALES
    const handleValidateCredentials = (e) => {
        e.preventDefault();
        if(password.length < 4) return alert("Contraseña inválida");

        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setStep('mfa');
        }, 800);
    };

    // PASO 3 -> FIN: VALIDAR MFA Y ENTRAR
    const handleValidateMFA = (e) => {
        e.preventDefault();
        if(mfaCode.length < 4) return alert("Código MFA inválido");

        setLoading(true);

        localStorage.setItem('userRole', selectedUser.id);
        localStorage.setItem('userName', selectedUser.name);

        setTimeout(() => {
            navigate(selectedUser.route);
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center p-400 font-sans">
            <div className="w-full max-w-[1800px] bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
                <div className="flex flex-col lg:flex-row min-h-[500px]">

                    {/* Lado Izquierdo: Branding */}
                    <div className="lg:w-5/12 bg-gradient-to-br from-blue-900 to-blue-800 p-8 lg:p-100 text-white flex flex-col justify-between relative overflow-hidden">
                        {/* Decoraciones de fondo */}
                        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 bg-white opacity-5 rounded-full blur-3xl pointer-events-none"></div>
                        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-56 h-56 bg-blue-400 opacity-10 rounded-full blur-3xl pointer-events-none"></div>

                        <div className="relative z-10">
                            <div className="w-14 h-14 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center mb-6 border border-white/20">
                                <span className="text-2xl font-bold tracking-tighter">OX</span>
                            </div>
                            <h1 className="text-3xl lg:text-4xl font-bold mb-3 leading-tight">
                                Acceso Seguro<br/>OXIPUR
                            </h1>
                            <p className="text-blue-100 text-sm lg:text-base leading-relaxed">
                                Plataforma integral con autenticación reforzada y control de acceso basado en roles (RBAC).
                            </p>
                        </div>

                        <div className="text-xs text-blue-3000/80 mt-8 flex items-center gap-2 relative z-10">
                            <Shield size={14}/>
                            <span>Conexión Cifrada SSL/TLS</span>
                        </div>
                    </div>

                    {/* Lado Derecho: Flujo de Autenticación */}
                    <div className="lg:w-7/120 p-6 lg:p-10 bg-slate-50 flex flex-col justify-center">

                        {/* VISTA 1: SELECCIÓN DE ROL */}
                        {step === 'roles' && (
                            <div className="animate-in fade-in duration-300">
                                <div className="mb-5">
                                    <h2 className="text-xl lg:text-2xl font-bold text-slate-800">Bienvenido</h2>
                                    <p className="text-slate-500 text-sm">Seleccione su perfil para iniciar sesión:</p>
                                </div>
                                <div className="space-y-2.5">
                                    {roles.map((rol) => (
                                        <button
                                            key={rol.id}
                                            onClick={() => handleSelectUser(rol)}
                                            className="group w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-300 hover:-translate-y-0.5"
                                        >
                                            <div className={`shrink-0 w-10 h-10 rounded-lg flex items-center justify-center text-white shadow-sm ${rol.color}`}>
                                                {rol.icon}
                                            </div>
                                            <div className="flex-1 text-left min-w-0">
                                                <p className="font-semibold text-slate-800 text-sm">{rol.label}</p>
                                                <p className="text-xs text-slate-500 truncate">{rol.name}</p>
                                            </div>
                                            <ChevronRight size={18} className="text-slate-300 group-hover:text-blue-500 shrink-0"/>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* VISTA 2: CREDENCIALES */}
                        {step === 'credentials' && selectedUser && (
                            <form onSubmit={handleValidateCredentials} className="animate-in fade-in duration-300">
                                <button
                                    type="button"
                                    onClick={() => setStep('roles')}
                                    className="flex items-center gap-1 text-sm text-slate-500 hover:text-blue-600 mb-4"
                                >
                                    <ArrowLeft size={16}/> Cambiar usuario
                                </button>

                                <div className="text-center mb-6">
                                    <div className={`w-14 h-14 mx-auto rounded-xl flex items-center justify-center text-white text-xl font-bold mb-2 ${selectedUser.color}`}>
                                        {selectedUser.name.charAt(0)}
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-800">{selectedUser.name}</h3>
                                    <p className="text-sm text-slate-500">{selectedUser.email}</p>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className="text-sm font-semibold text-slate-700 block mb-1.5">Contraseña</label>
                                        <div className="relative">
                                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                            <input
                                                type="password"
                                                className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                                placeholder="••••••••"
                                                autoFocus
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <label className="flex items-center gap-2 cursor-pointer text-slate-600">
                                            <input type="checkbox" className="rounded text-blue-600 border-slate-300"/> Recordarme
                                        </label>
                                        <a href="#" className="text-blue-600 hover:underline">¿Olvidaste tu clave?</a>
                                    </div>
                                </div>

                                <Button type="submit" variant="primary" className="w-full h-11 text-base mt-6" disabled={loading}>
                                    {loading ? 'Verificando...' : 'Iniciar Sesión'}
                                </Button>

                                <div className="mt-4 text-center">
                                    <span className="text-xs bg-slate-100 text-slate-500 px-3 py-1.5 rounded-full border border-slate-200 inline-block">
                                        Último acceso exitoso: Ayer, 14:30 PM
                                    </span>
                                </div>
                            </form>
                        )}

                        {/* VISTA 3: MFA */}
                        {step === 'mfa' && (
                            <form onSubmit={handleValidateMFA} className="animate-in fade-in duration-300 text-center">
                                <div className="w-14 h-14 bg-blue-50 rounded-full flex items-center justify-center mx-auto text-blue-600 mb-4">
                                    <Smartphone size={28}/>
                                </div>

                                <div className="mb-6">
                                    <h3 className="text-lg font-bold text-slate-800">Verificación en 2 Pasos</h3>
                                    <p className="text-sm text-slate-500 mt-1.5">
                                        Hemos enviado un código de 6 dígitos a su dispositivo móvil registrado terminando en **89.
                                    </p>
                                </div>

                                <div className="py-3">
                                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                                        Código de Seguridad
                                    </label>
                                    <input
                                        type="text"
                                        maxLength="6"
                                        className="w-full max-w-xs mx-auto block text-center text-2xl font-mono tracking-[0.4em] py-3 border-b-2 border-slate-300 focus:border-blue-600 outline-none bg-transparent transition-colors"
                                        placeholder="000000"
                                        autoFocus
                                        value={mfaCode}
                                        onChange={(e) => setMfaCode(e.target.value)}
                                    />
                                </div>

                                <div className="my-4">
                                    <Alert variant="info">
                                        <Key size={14} className="inline mr-1"/> Su token de sesión expira en 8 horas.
                                    </Alert>
                                </div>

                                <Button type="submit" variant="primary" className="w-full h-11 text-base" disabled={loading}>
                                    {loading ? 'Autenticando...' : 'Verificar y Acceder'}
                                </Button>

                                <button
                                    type="button"
                                    onClick={() => setStep('credentials')}
                                    className="text-sm text-slate-400 hover:text-slate-600 mt-4 inline-block"
                                >
                                    Volver a credenciales
                                </button>
                            </form>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;