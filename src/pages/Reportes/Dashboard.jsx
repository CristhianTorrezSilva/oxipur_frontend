import React, { useState } from 'react';
import {
    TrendingUp, Users, Package, Truck, Calendar, Download,
    Mail, PieChart, BarChart2, Activity, AlertCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import Input from '../../components/ui/Input';

const Dashboard = () => {
    // ESTADOS PARA EL CASO DE USO 35
    const [periodo, setPeriodo] = useState('este_mes');
    const [modalAgendarOpen, setModalAgendarOpen] = useState(false);

    // Acción: Agendar Reporte (Requisito del CU)
    const handleAgendarReporte = (e) => {
        e.preventDefault();
        alert("Reporte programado exitosamente.\n\nSe enviará automáticamente cada Lunes a las 08:00 AM a la gerencia.");
        setModalAgendarOpen(false);
    };

    return (
        <div className="space-y-6">

            {/* HEADER DEL REPORTE OPERATIVO */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Reporte Operativo General</h2>
                    <p className="text-gray-500">Vista ejecutiva consolidada de desempeño</p>
                </div>

                <div className="flex flex-wrap gap-2">
                    {/* SELECTOR DE PERIODO (ACCIÓN DEL ACTOR) */}
                    <select
                        className="bg-white border border-gray-300 text-gray-700 text-sm rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-500"
                        value={periodo}
                        onChange={(e) => setPeriodo(e.target.value)}
                    >
                        <option value="hoy">Hoy</option>
                        <option value="esta_semana">Esta Semana</option>
                        <option value="este_mes">Este Mes</option>
                        <option value="anio">Año en curso</option>
                    </select>

                    {/* BOTÓN AGENDAR (ACCIÓN DEL ACTOR) */}
                    <Button variant="outline" onClick={() => setModalAgendarOpen(true)}>
                        <Mail size={18} /> Agendar Envío
                    </Button>

                    <Button variant="primary">
                        <Download size={18} /> Exportar PDF
                    </Button>
                </div>
            </div>

            {/* 1. KPIs CONSOLIDADOS (INTEGRACIÓN DE MÓDULOS) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Ventas */}
                <Card className="border-l-4 border-l-blue-500 shadow-sm">
                    <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-xs font-bold text-gray-500 uppercase">Ingresos Totales</p>
                                <h3 className="text-2xl font-bold text-gray-800">Bs 45,200</h3>
                                <span className="text-xs text-green-600 font-bold flex items-center gap-1"><TrendingUp size={12}/> +12% vs meta</span>
                            </div>
                            <div className="p-2 bg-blue-50 rounded-lg text-blue-600"><BarChart2 size={20}/></div>
                        </div>
                    </CardContent>
                </Card>

                {/* Logística */}
                <Card className="border-l-4 border-l-purple-500 shadow-sm">
                    <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-xs font-bold text-gray-500 uppercase">Entregas a Tiempo</p>
                                <h3 className="text-2xl font-bold text-gray-800">98.5%</h3>
                                <span className="text-xs text-purple-600 font-bold">120 Rutas completadas</span>
                            </div>
                            <div className="p-2 bg-purple-50 rounded-lg text-purple-600"><Truck size={20}/></div>
                        </div>
                    </CardContent>
                </Card>

                {/* Almacén */}
                <Card className="border-l-4 border-l-orange-500 shadow-sm">
                    <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-xs font-bold text-gray-500 uppercase">Rotación Stock</p>
                                <h3 className="text-2xl font-bold text-gray-800">Rápida</h3>
                                <span className="text-xs text-orange-600 font-bold">45 Cilindros críticos</span>
                            </div>
                            <div className="p-2 bg-orange-50 rounded-lg text-orange-600"><Package size={20}/></div>
                        </div>
                    </CardContent>
                </Card>

                {/* Calidad / Reclamos */}
                <Card className="border-l-4 border-l-red-500 shadow-sm">
                    <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-xs font-bold text-gray-500 uppercase">Incidencias</p>
                                <h3 className="text-2xl font-bold text-gray-800">3 Activas</h3>
                                <span className="text-xs text-red-600 font-bold">Tiempo resp: 2.4h</span>
                            </div>
                            <div className="p-2 bg-red-50 rounded-lg text-red-600"><AlertCircle size={20}/></div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* 2. GRÁFICOS Y ANÁLISIS (VISUALIZAR) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* Gráfico de Tendencia (Simulado visualmente) */}
                <Card>
                    <CardHeader><CardTitle>Tendencia Operativa Mensual</CardTitle></CardHeader>
                    <CardContent>
                        <div className="h-64 flex items-end justify-between gap-2 px-4 pb-4 border-b border-gray-100">
                            {[35, 45, 30, 60, 75, 50, 65, 80].map((h, i) => (
                                <div key={i} className="w-full bg-blue-100 hover:bg-blue-200 rounded-t-sm relative group transition-all" style={{ height: `${h}%` }}>
                                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                        {h}%
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex justify-between text-xs text-gray-400 mt-2 px-2">
                            <span>Sem 1</span><span>Sem 2</span><span>Sem 3</span><span>Sem 4</span>
                        </div>
                    </CardContent>
                </Card>

                {/* Resumen de Actividad Reciente */}
                <Card>
                    <CardHeader><CardTitle>Bitácora de Eventos Recientes</CardTitle></CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[
                                { time: '10:30 AM', event: 'Cierre de Ruta Norte', user: 'Mario Logística', type: 'log' },
                                { time: '09:15 AM', event: 'Alerta Stock Crítico: O2 Portátil', user: 'Sistema', type: 'alert' },
                                { time: '08:45 AM', event: 'Pedido Grande Confirmado (Hosp. Japonés)', user: 'Carla Ventas', type: 'sale' },
                                { time: '08:00 AM', event: 'Inicio de Turno Operativo', user: 'Admin', type: 'info' },
                            ].map((item, i) => (
                                <div key={i} className="flex items-start gap-3 pb-3 border-b border-gray-50 last:border-0 last:pb-0">
                                    <div className="text-xs font-mono text-gray-400 w-16 pt-1">{item.time}</div>
                                    <div>
                                        <p className="text-sm font-medium text-gray-700">{item.event}</p>
                                        <p className="text-xs text-gray-400">Usuario: {item.user}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* MODAL PARA AGENDAR REPORTE (REQUISITO: "Agendar/Programar") */}
            <Modal isOpen={modalAgendarOpen} onClose={() => setModalAgendarOpen(false)} title="Programar Envío de Reporte">
                <form onSubmit={handleAgendarReporte} className="space-y-4">
                    <p className="text-sm text-gray-600">Configure la frecuencia para recibir este reporte operativo automáticamente por correo.</p>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-semibold text-gray-700">Frecuencia</label>
                        <select className="p-2 border rounded-lg bg-white">
                            <option>Diario (Al cierre)</option>
                            <option>Semanal (Lunes AM)</option>
                            <option>Mensual (Día 1)</option>
                        </select>
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-semibold text-gray-700">Destinatarios (Separar por coma)</label>
                        <Input placeholder="gerencia@oxipur.bo, operaciones@oxipur.bo" />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-semibold text-gray-700">Formato</label>
                        <div className="flex gap-4">
                            <label className="flex items-center gap-2"><input type="radio" name="fmt" defaultChecked/> PDF (Ejecutivo)</label>
                            <label className="flex items-center gap-2"><input type="radio" name="fmt"/> Excel (Data)</label>
                        </div>
                    </div>

                    <div className="flex justify-end gap-2 mt-4">
                        <Button variant="secondary" onClick={() => setModalAgendarOpen(false)}>Cancelar</Button>
                        <Button type="submit" variant="primary">Guardar Programación</Button>
                    </div>
                </form>
            </Modal>

        </div>
    );
};

export default Dashboard;