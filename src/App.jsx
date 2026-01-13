import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Layouts
import MainLayout from './components/layout/MainLayout';
import AuthLayout from './components/layout/AuthLayout';

// Autenticación
import Login from './pages/auth/Login';

// Vistas Operativas
import EntregaMovil from './pages/Chofer/EntregaMovil';
import Dashboard from './pages/Reportes/Dashboard';
import NuevoPedido from './pages/Ventas/NuevoPedido';
import ListaPedidos from './pages/Ventas/ListaPedidos';
import Planificador from './pages/Logistica/Planificador';
import GuiaDespacho from './pages/Logistica/GuiaDespacho';
import Zonas from './pages/Logistica/Zonas';
import Inventario from './pages/Almacen/Inventario';
import ListaReclamos from './pages/Reclamos/ListaReclamos';
import NuevoReclamo from './pages/Reclamos/NuevoReclamo';
import CentroReportes from './pages/Reportes/CentroReportes.jsx';
import ListaClientes from './pages/Clientes/ListaClientes';
import Usuarios from './pages/Admin/Usuarios';

/**
 * PENTESTER INSIGHT:
 * Un sistema real requiere un Wrapper de Protección.
 * Aquí simulamos la lógica que verificaría el JWT en el LocalStorage.
 */
const ProtectedRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem('oxipur_token'); // Simulación de sesión
    return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* --- SECCIÓN PÚBLICA / AUTH --- */}
                <Route element={<AuthLayout />}>
                    <Route path="/login" element={<Login />} />
                </Route>

                {/* --- SECCIÓN OPERATIVA MÓVIL (CHOFER) ---
                    Se separa del MainLayout porque usa una UI simplificada
                */}
                <Route path="/chofer/entrega" element={<EntregaMovil />} />

                {/* --- SECCIÓN ADMINISTRATIVA (PROTEGIDA) --- */}
                <Route element={
                    <ProtectedRoute>
                        <MainLayout />
                    </ProtectedRoute>
                }>
                    {/* Dashboard Principal */}
                    <Route path="/dashboard" element={<Dashboard />} />

                    {/* Módulo de Ventas y CRM */}
                    <Route path="/ventas">
                        <Route path="nuevo" element={<NuevoPedido />} />
                        <Route path="lista" element={<ListaPedidos />} />
                    </Route>
                    <Route path="/clientes" element={<ListaClientes />} />

                    {/* Módulo Logístico y Distribución */}
                    <Route path="/logistica">
                        <Route path="planificacion" element={<Planificador />} />
                        <Route path="despacho" element={<GuiaDespacho />} />
                        <Route path="zonas" element={<Zonas />} />
                    </Route>

                    {/* Módulo de Almacén e Inventario */}
                    <Route path="/almacen/inventario" element={<Inventario />} />

                    {/* Gestión de Post-Venta y Reclamos */}
                    <Route path="/reclamos">
                        <Route index element={<ListaReclamos />} />
                        <Route path="nuevo" element={<NuevoReclamo />} />
                    </Route>

                    {/* Business Intelligence y Administración */}
                    <Route path="/reportes" element={<CentroReportes />} />
                    <Route path="/admin/usuarios" element={<Usuarios />} />
                </Route>

                {/* --- FALLBACKS --- */}
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;