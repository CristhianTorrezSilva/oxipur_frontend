import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// 1. Importamos los Layouts
import MainLayout from './components/layout/MainLayout';
import AuthLayout from './components/layout/AuthLayout';

// 2. Importamos las Páginas (Auth & Chofer)
import Login from './pages/auth/Login';
import EntregaMovil from './pages/Chofer/EntregaMovil';

// 3. Importamos Páginas del Sistema (Admin)
import Dashboard from './pages/Reportes/Dashboard'; // El Dashboard principal está en Reportes
import NuevoPedido from './pages/Ventas/NuevoPedido';
import ListaPedidos from './pages/Ventas/ListaPedidos';
import Planificador from './pages/Logistica/Planificador';
import GuiaDespacho from './pages/Logistica/GuiaDespacho';
import Inventario from './pages/Almacen/Inventario';
import NuevoReclamo from './pages/Reclamos/NuevoReclamo';
import ListaReclamos from './pages/Reclamos/ListaReclamos';
import ReporteVentas from './pages/Reportes/ReporteVentas';

// 4. Importamos el CSS
import './index.css';

function App() {
    return (
        <BrowserRouter>
            <Routes>

                {/* GRUPO 1: Rutas Públicas o Pantalla Completa (Sin Sidebar) */}
                <Route element={<AuthLayout />}>
                    <Route path="/login" element={<Login />} />
                    {/* La vista del chofer usa este layout para parecer una App Móvil en el celular */}
                    <Route path="/chofer/entrega" element={<EntregaMovil />} />
                </Route>


                {/* GRUPO 2: Rutas Privadas del Sistema (Con Sidebar y Header) */}
                <Route element={<MainLayout />}>

                    {/* Dashboard Principal */}
                    <Route path="/dashboard" element={<Dashboard />} />

                    {/* Subsistema de Ventas */}
                    <Route path="/ventas/nuevo" element={<NuevoPedido />} />
                    <Route path="/ventas/lista" element={<ListaPedidos />} />
                    <Route path="/clientes" element={<div className="p-8 text-center text-gray-500">Módulo de Clientes (Similar a Lista de Pedidos)</div>} />

                    {/* Subsistema de Logística */}
                    <Route path="/logistica/planificacion" element={<Planificador />} />
                    <Route path="/logistica/despacho" element={<GuiaDespacho />} />

                    {/* Subsistema de Almacén */}
                    <Route path="/almacen/inventario" element={<Inventario />} />

                    {/* Subsistema de Reclamos / Soporte */}
                    <Route path="/reclamos" element={<ListaReclamos />} />
                    <Route path="/reclamos/nuevo" element={<NuevoReclamo />} /> {/* Opcional si quieres acceso directo */}

                    {/* Subsistema de Reportes */}
                    <Route path="/reportes" element={<ReporteVentas />} />

                </Route>


                {/* GRUPO 3: Redirección por defecto */}
                {/* Si entran a la raíz "/", los mandamos al Login */}
                <Route path="/" element={<Navigate to="/login" replace />} />

                {/* Ruta 404 para cualquier url desconocida */}
                <Route path="*" element={<Navigate to="/login" replace />} />

            </Routes>
        </BrowserRouter>
    );
}

export default App;