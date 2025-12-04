import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock, ArrowRight } from 'lucide-react';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Alert from '../../components/ui/Alert';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // SIMULACIÓN DE LOGIN (Para la defensa)
        setTimeout(() => {
            // 1. Si el usuario escribe algo relacionado a chofer, lo mandamos a la vista móvil
            if (email.toLowerCase().includes('chofer')) {
                navigate('/chofer/entrega');
            }
            // 2. Cualquier otro usuario entra al sistema administrativo
            else if (email && password) {
                navigate('/dashboard');
            }
            // 3. Validación simple
            else {
                setError('Por favor ingrese sus credenciales');
                setLoading(false);
            }
        }, 1000); // Pequeño retraso para que parezca que "piensa"
    };

    return (
        <div className="flex flex-col items-center justify-center w-full">
            {/* Tarjeta de Login */}
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">

                {/* Cabecera */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-blue-600 text-white text-2xl font-bold mb-4 shadow-lg shadow-blue-200">
                        OX
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">Bienvenido a OXIPUR</h2>
                    <p className="text-gray-500 mt-2 text-sm">Sistema de Gestión de Pedidos y Distribución</p>
                </div>

                {/* Formulario */}
                <form onSubmit={handleLogin} className="space-y-6">

                    {error && <Alert variant="error">{error}</Alert>}

                    <div className="space-y-4">
                        <Input
                            label="Correo Electrónico"
                            placeholder="admin@oxipur.bo"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            // Icono simulado dentro del input (opcional visualmente)
                        />

                        <div className="relative">
                            <Input
                                label="Contraseña"
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <div className="text-right mt-1">
                                <a href="#" className="text-xs text-blue-600 hover:underline">¿Olvidaste tu contraseña?</a>
                            </div>
                        </div>
                    </div>

                    <Button
                        type="submit"
                        variant="primary"
                        className="w-full h-12 text-lg shadow-lg shadow-blue-100"
                        disabled={loading}
                    >
                        {loading ? 'Ingresando...' : 'Iniciar Sesión'}
                        {!loading && <ArrowRight size={20} />}
                    </Button>

                </form>

                {/* TRUCO PARA LA DEMO: Accesos Rápidos */}
                <div className="mt-8 pt-6 border-t border-gray-100">
                    <p className="text-xs text-center text-gray-400 uppercase font-bold mb-3">Accesos Directos (Demo)</p>
                    <div className="grid grid-cols-2 gap-3">
                        <button
                            onClick={() => { setEmail('admin@oxipur.bo'); setPassword('123456'); }}
                            className="text-xs p-2 bg-gray-50 hover:bg-gray-100 rounded text-gray-600 border transition-colors"
                        >
                            Soy Administrador
                        </button>
                        <button
                            onClick={() => { setEmail('chofer@oxipur.bo'); setPassword('123456'); }}
                            className="text-xs p-2 bg-gray-50 hover:bg-gray-100 rounded text-gray-600 border transition-colors"
                        >
                            Soy Chofer (Móvil)
                        </button>
                    </div>
                </div>

            </div>

            <p className="mt-8 text-center text-gray-400 text-sm">
                &copy; 2025 OXIPUR S.R.L. - Versión 1.0.0
            </p>
        </div>
    );
};

export default Login;