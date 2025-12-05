import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// 1. Layouts
import MainLayout from './components/layout/MainLayout';
import AuthLayout from './components/layout/AuthLayout';

// 2. Páginas Auth & Chofer
import Login from './pages/auth/Login';
import EntregaMovil from './pages/Chofer/EntregaMovil';

// 3. Páginas del Sistema (Admin/Ventas/Logística)
import Dashboard from './pages/Reportes/Dashboard';
import NuevoPedido from './pages/Ventas/NuevoPedido';
import ListaPedidos from './pages/Ventas/ListaPedidos';
import Planificador from './pages/Logistica/Planificador';
import GuiaDespacho from './pages/Logistica/GuiaDespacho';
import Inventario from './pages/Almacen/Inventario';
import NuevoReclamo from './pages/Reclamos/NuevoReclamo';
import ListaReclamos from './pages/Reclamos/ListaReclamos';
import CentroReportes from './pages/Reportes/CentroReportes.jsx';
import Zonas from './pages/Logistica/Zonas';

// 4. NUEVAS PÁGINAS (Clientes y Usuarios)
import ListaClientes from './pages/Clientes/ListaClientes';
import Usuarios from './pages/Admin/Usuarios';

function App() {
    return (
        <BrowserRouter>
            <Routes>

                {/* Rutas Públicas / Pantalla Completa */}
                <Route element={<AuthLayout />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/chofer/entrega" element={<EntregaMovil />} />
                </Route>

                {/* Rutas Privadas con Menú Lateral */}
                <Route element={<MainLayout />}>

                    <Route path="/dashboard" element={<Dashboard />} />

                    {/* Ventas y Clientes */}
                    <Route path="/ventas/nuevo" element={<NuevoPedido />} />
                    <Route path="/ventas/lista" element={<ListaPedidos />} />

                    {/* AQUÍ ESTABA EL ERROR, AHORA APUNTA AL COMPONENTE REAL: */}
                    <Route path="/clientes" element={<ListaClientes />} />

                    {/* Logística */}
                    <Route path="/logistica/planificacion" element={<Planificador />} />
                    <Route path="/logistica/despacho" element={<GuiaDespacho />} />
                    <Route path="/logistica/zonas" element={<Zonas />} />

                    {/* Almacén */}
                    <Route path="/almacen/inventario" element={<Inventario />} />

                    {/* Soporte */}
                    <Route path="/reclamos" element={<ListaReclamos />} />
                    <Route path="/reclamos/nuevo" element={<NuevoReclamo />} />

                    {/* Reportes y Admin */}
                    <Route path="/reportes" element={<CentroReportes />} />
                    <Route path="/admin/usuarios" element={<Usuarios />} />

                </Route>

                {/* Redirecciones */}
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="*" element={<Navigate to="/login" replace />} />

            </Routes>
        </BrowserRouter>
    );
}

export default App;