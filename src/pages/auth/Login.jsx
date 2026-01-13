import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, Smartphone, User, ArrowRight, AlertCircle } from 'lucide-react';
import Button from '../../components/ui/Button';

// --- LÓGICA DE NEGOCIO Y SEGURIDAD ---

// Base de datos simulada con las rutas corregidas según tu App.jsx
const MOCK_DB = {
    'admin': { role: 'admin', name: 'Admin General', route: '/dashboard' }, // Corregido: va a Dashboard
    'ventas': { role: 'ventas', name: 'Carla Vendedora', route: '/ventas/lista' },
    'logistica': { role: 'logistica', name: 'Mario Logística', route: '/logistica/planificacion' },
    'almacen': { role: 'almacen', name: 'Pedro Almacén', route: '/almacen/inventario' },
    'chofer': { role: 'chofer', name: 'Juan Chofer', route: '/chofer/entrega' }
};

// Función de sanitización (Pentesting: evitar XSS básico)
const sanitizeInput = (input) => {
    return input.replace(/[<>/'"();]/g, "").trim().toLowerCase();
};

const Login = () => {
    const navigate = useNavigate();

    // ESTADOS
    const [step, setStep] = useState('credentials'); // 'credentials' | 'mfa'
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [mfaCode, setMfaCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // PASO 1: VALIDAR CREDENCIALES
    const handleLogin = (e) => {
        e.preventDefault();
        setError('');

        // 1. Sanitización de entrada
        const cleanUser = sanitizeInput(username);

        if (!cleanUser || !password) {
            return setError('Por favor complete todos los campos.');
        }

        setLoading(true);

        // 2. Simulación de petición al Backend
        setTimeout(() => {
            const userFound = MOCK_DB[cleanUser];

            if (userFound && password.length > 0) {
                setLoading(false);
                setStep('mfa');
            } else {
                setLoading(false);
                // Pentesting Tip: Mensaje genérico para evitar enumeración de usuarios
                setError('Credenciales inválidas o acceso no autorizado.');
            }
        }, 800);
    };

    // PASO 2: VALIDAR MULTI-FACTOR AUTH (MFA)
    const handleValidateMFA = (e) => {
        e.preventDefault();

        // Validación básica de longitud
        if(mfaCode.length < 4) return alert("Código inválido (mínimo 4 dígitos)");

        setLoading(true);
        const cleanUser = sanitizeInput(username);
        const userData = MOCK_DB[cleanUser];

        setTimeout(() => {
            // --- FIX CRÍTICO: GUARDAR EL TOKEN QUE ESPERA APP.JSX ---
            localStorage.setItem('oxipur_token', 'jwt_session_valid_secure_hash');

            // Guardar datos de usuario para la UI
            localStorage.setItem('userRole', userData.role);
            localStorage.setItem('userName', userData.name);

            navigate(userData.route);
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 font-sans">
            <div className="w-full max-w-[1000px] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col lg:flex-row min-h-[600px]">

                {/* Lado Izquierdo: Branding Institucional (DISEÑO ORIGINAL) */}
                <div className="lg:w-1/2 bg-gradient-to-br from-blue-900 to-blue-700 p-12 text-white flex flex-col justify-between relative overflow-hidden">
                    <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-blue-400 opacity-10 rounded-full blur-3xl"></div>

                    <div className="relative z-10">
                        <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center mb-8 border border-white/20 shadow-lg">
                            <span className="text-3xl font-bold tracking-tighter">OX</span>
                        </div>
                        <h1 className="text-4xxl font-bold mb-4 leading-tight">
                            Portal <br/>OXIPUR S.R.L.
                        </h1>
                        <p className="text-blue-100 text-lg leading-relaxed opacity-90">
                            Gestión integral de pedidos, logística y distribución de oxígeno medicinal.
                        </p>
                    </div>

                    <div className="relative z-10 text-sm text-blue-200 flex items-center gap-2">
                        <Shield size={16} />
                        <span>Acceso restringido solo a personal autorizado.</span>
                    </div>
                </div>

                {/* Lado Derecho: Formulario (LÓGICA ACTUALIZADA) */}
                <div className="lg:w-1/2 p-12 bg-white flex flex-col justify-center">

                    {step === 'credentials' ? (
                        <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                            <h2 className="text-2xl font-bold text-slate-800 mb-2">Iniciar Sesión</h2>
                            <p className="text-slate-500 mb-8">Ingrese sus credenciales de red para continuar.</p>

                            <form onSubmit={handleLogin} className="space-y-5">
                                {error && (
                                    <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm flex items-center gap-2 border border-red-100">
                                        <AlertCircle size={16}/> {error}
                                    </div>
                                )}

                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Usuario / ID Corporativo</label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                        <input
                                            type="text"
                                            className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                            placeholder="Ej: ventas, admin, logistica"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            autoFocus
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">Contraseña</label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                        <input
                                            type="password"
                                            className="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                            placeholder="••••••••"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center justify-between text-sm">
                                    <label className="flex items-center gap-2 cursor-pointer text-slate-600">
                                        <input type="checkbox" className="rounded text-blue-600 border-slate-300"/>
                                        Recordar dispositivo
                                    </label>
                                    <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">Recuperar acceso</a>
                                </div>

                                <Button
                                    type="submit"
                                    variant="primary"
                                    className="w-full h-12 text-base shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-all"
                                    disabled={loading}
                                >
                                    {loading ? 'Verificando...' : 'Ingresar al Sistema'}
                                </Button>
                            </form>

                            {/* DEMO HINT - Mantenido para pruebas */}
                            <div className="mt-8 pt-6 border-t border-slate-100 text-center">
                                <p className="text-xs text-slate-400 uppercase tracking-wider mb-2">Usuarios Demo (Dev Mode)</p>
                                <div className="flex justify-center gap-2 text-xs text-slate-500 font-mono">
                                    <span className="bg-slate-100 px-2 py-1 rounded">admin</span>
                                    <span className="bg-slate-100 px-2 py-1 rounded">ventas</span>
                                    <span className="bg-slate-100 px-2 py-1 rounded">logistica</span>
                                </div>
                            </div>
                        </div>
                    ) : (
                        // VISTA MFA (DOBLE FACTOR)
                        <form onSubmit={handleValidateMFA} className="animate-in fade-in zoom-in-95 duration-300 text-center max-w-xs mx-auto">
                            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto text-blue-600 mb-6 shadow-sm">
                                <Smartphone size={32}/>
                            </div>

                            <h3 className="text-xl font-bold text-slate-800 mb-2">Verificación de Seguridad</h3>
                            <p className="text-sm text-slate-500 mb-8">
                                Ingrese el código temporal generado por su aplicación autenticadora.
                            </p>

                            <div className="mb-8">
                                <input
                                    type="text"
                                    maxLength="6"
                                    className="w-full text-center text-3xl font-mono tracking-[0.5em] py-3 border-b-2 border-slate-300 focus:border-blue-600 outline-none bg-transparent transition-colors"
                                    placeholder="000000"
                                    autoFocus
                                    value={mfaCode}
                                    onChange={(e) => setMfaCode(e.target.value)}
                                />
                            </div>

                            <Button type="submit" variant="primary" className="w-full h-12" disabled={loading}>
                                {loading ? 'Validando...' : 'Verificar Acceso'}
                            </Button>

                            <button
                                type="button"
                                onClick={() => { setStep('credentials'); setPassword(''); }}
                                className="text-sm text-slate-400 hover:text-slate-600 mt-6 inline-flex items-center gap-1"
                            >
                                <ArrowRight size={14} className="rotate-180"/> Volver al login
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Login;