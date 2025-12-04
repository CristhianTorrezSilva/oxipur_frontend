import React from 'react';
import { TrendingUp, Users, Package, AlertOctagon, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';

const Dashboard = () => {
    // MOCK: Datos para el gráfico de barras (Ventas por mes)
    const ventasData = [
        { mes: 'Ago', valor: 45, label: '450' },
        { mes: 'Sep', valor: 60, label: '600' },
        { mes: 'Oct', valor: 85, label: '850' },
        { mes: 'Nov', valor: 70, label: '700' },
        { mes: 'Dic', valor: 95, label: '950' },
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Dashboard Gerencial</h2>
                    <p className="text-gray-500">Resumen operativo y comercial</p>
                </div>
                <div className="flex items-center gap-2 bg-white border px-3 py-2 rounded-lg text-sm text-gray-600 shadow-sm">
                    <Calendar size={16} />
                    <span>Últimos 6 meses</span>
                </div>
            </div>

            {/* 1. Tarjetas de KPIs (Indicadores) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="border-l-4 border-l-blue-600">
                    <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-sm font-medium text-gray-500 uppercase">Pedidos Mes</p>
                                <h3 className="text-3xl font-bold text-gray-800 mt-1">1,245</h3>
                            </div>
                            <div className="p-2 bg-blue-100 rounded text-blue-600">
                                <Package size={20} />
                            </div>
                        </div>
                        <p className="text-xs text-green-600 mt-4 font-bold flex items-center gap-1">
                            <TrendingUp size={12} /> +15% vs mes anterior
                        </p>
                    </CardContent>
                </Card>

                <Card className="border-l-4 border-l-green-600">
                    <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-sm font-medium text-gray-500 uppercase">Ingresos (Bs)</p>
                                <h3 className="text-3xl font-bold text-gray-800 mt-1">85.4k</h3>
                            </div>
                            <div className="p-2 bg-green-100 rounded text-green-600">
                                <TrendingUp size={20} />
                            </div>
                        </div>
                        <p className="text-xs text-green-600 mt-4 font-bold flex items-center gap-1">
                            <TrendingUp size={12} /> +8% proyección cumplida
                        </p>
                    </CardContent>
                </Card>

                <Card className="border-l-4 border-l-purple-600">
                    <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-sm font-medium text-gray-500 uppercase">Clientes Activos</p>
                                <h3 className="text-3xl font-bold text-gray-800 mt-1">320</h3>
                            </div>
                            <div className="p-2 bg-purple-100 rounded text-purple-600">
                                <Users size={20} />
                            </div>
                        </div>
                        <p className="text-xs text-gray-400 mt-4">5 nuevos esta semana</p>
                    </CardContent>
                </Card>

                <Card className="border-l-4 border-l-red-500">
                    <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-sm font-medium text-gray-500 uppercase">Incidencias</p>
                                <h3 className="text-3xl font-bold text-gray-800 mt-1">12</h3>
                            </div>
                            <div className="p-2 bg-red-100 rounded text-red-600">
                                <AlertOctagon size={20} />
                            </div>
                        </div>
                        <p className="text-xs text-red-600 mt-4 font-bold">-2% reducción quejas</p>
                    </CardContent>
                </Card>
            </div>

            {/* 2. Gráficos y Tablas Resumen */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* Gráfico de Barras CSS (Ventas) */}
                <Card className="h-96 flex flex-col">
                    <CardHeader>
                        <CardTitle>Volumen de Ventas (Cilindros)</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 flex items-end justify-between px-6 pb-2 gap-4">
                        {ventasData.map((data, index) => (
                            <div key={index} className="flex flex-col items-center w-full group cursor-pointer">
                                {/* Tooltip simulado */}
                                <div className="mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-xs px-2 py-1 rounded">
                                    {data.label} cil.
                                </div>
                                {/* Barra */}
                                <div
                                    className="w-full bg-blue-100 rounded-t-lg relative overflow-hidden group-hover:bg-blue-200 transition-colors"
                                    style={{ height: '200px' }}
                                >
                                    <div
                                        className="absolute bottom-0 w-full bg-blue-600 rounded-t-lg transition-all duration-1000 ease-out group-hover:bg-blue-700"
                                        style={{ height: `${data.valor}%` }}
                                    ></div>
                                </div>
                                {/* Etiqueta Eje X */}
                                <span className="mt-3 text-sm font-bold text-gray-600">{data.mes}</span>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                {/* Lista de Top Clientes */}
                <Card className="h-96">
                    <CardHeader>
                        <CardTitle>Top Clientes (Corporativo)</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[
                                { nombre: 'Clínica Incor', compras: 150, total: 'Bs 15,400' },
                                { nombre: 'Hospital Obrero', compras: 120, total: 'Bs 12,200' },
                                { nombre: 'Centro Salud Norte', compras: 85, total: 'Bs 8,500' },
                                { nombre: 'Industrias Venado', compras: 60, total: 'Bs 6,000' },
                                { nombre: 'Clínica Foianini', compras: 45, total: 'Bs 4,500' },
                            ].map((cliente, i) => (
                                <div key={i} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors border-b last:border-0">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center font-bold text-xs text-gray-600">
                                            {i + 1}
                                        </div>
                                        <div>
                                            <p className="font-bold text-sm text-gray-800">{cliente.nombre}</p>
                                            <p className="text-xs text-gray-400">{cliente.compras} pedidos</p>
                                        </div>
                                    </div>
                                    <span className="font-mono text-sm font-bold text-blue-700">{cliente.total}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Dashboard;