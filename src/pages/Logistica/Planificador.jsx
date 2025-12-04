import React, { useState } from 'react';
import { Map, Zap, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card.jsx';
import Button from '../../components/ui/Button.jsx';
import Badge from '../../components/ui/Badge.jsx';
import MapaRutas from '../../components/logistic/MapaRutas.jsx';
import VehicleCard from '../../components/logistic/VehicleCard.jsx';
import RouteTimeline from '../../components/logistic/RouteTimeline.jsx';

const Planificador = () => {
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [rutaGenerada, setRutaGenerada] = useState(false);

    // MOCK: Camiones
    const vehiculos = [
        { id: 1, placa: "2344-XTR", chofer: "Juan Pérez", cap: 50, estado: "disponible" },
        { id: 2, placa: "4055-BBN", chofer: "Carlos Mamani", cap: 80, estado: "en-ruta" },
        { id: 3, placa: "1099-LPO", chofer: "Roberto Gomez", cap: 50, estado: "mantenimiento" },
    ];

    // MOCK: Pedidos Pendientes
    const pedidosPendientes = [
        { id: "PED-104", cliente: "Clínica Incor", zona: "Norte", peso: "10 cil", prio: "alta" },
        { id: "PED-105", cliente: "Hospital Obrero", zona: "Centro", peso: "25 cil", prio: "media" },
        { id: "PED-106", cliente: "Consultorio Norte", zona: "Norte", peso: "5 cil", prio: "baja" },
    ];

    // MOCK: Datos de la ruta generada (Simulación)
    const paradasSimuladas = [
        { id: 1, direccion: "Planta OXIPUR (Partida)", cliente: "Base Central", estado: "completado", hora: "08:00" },
        { id: 2, direccion: "Av. Banzer 4to Anillo", cliente: "Clínica Incor", estado: "pendiente", hora: "08:45" },
        { id: 3, direccion: "Calle Independencia #55", cliente: "Consultorio Norte", estado: "pendiente", hora: "09:20" },
        { id: 4, direccion: "3er Anillo Interno", cliente: "Hospital Obrero", estado: "pendiente", hora: "10:15" },
    ];

    const puntosMapa = [
        { id: 1, x: 50, y: 50, nombre: "Central OXIPUR", tipo: "central" },
        { id: 2, x: 55, y: 30, nombre: "Clínica Incor", tipo: "entrega" },
        { id: 3, x: 60, y: 35, nombre: "Consultorio Norte", tipo: "entrega" },
        { id: 4, x: 45, y: 40, nombre: "Hospital Obrero", tipo: "entrega" },
    ];

    const handleGenerarRuta = () => {
        if (!selectedVehicle) {
            alert("Por favor seleccione un vehículo disponible primero.");
            return;
        }
        setRutaGenerada(true);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Planificador de Distribución</h2>
                    <p className="text-gray-500">Asignación de unidades y optimización de entregas</p>
                </div>
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border shadow-sm">
                    <Calendar size={18} className="text-gray-500"/>
                    <span className="font-semibold text-gray-700">04 de Diciembre, 2025</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                {/* COLUMNA IZQUIERDA: Selección de Recursos */}
                <div className="lg:col-span-4 space-y-6">

                    {/* 1. Selección de Vehículo */}
                    <section>
                        <h3 className="font-bold text-gray-700 mb-3 flex items-center gap-2">
                            <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">1</span>
                            Seleccionar Unidad
                        </h3>
                        <div className="space-y-3">
                            {vehiculos.map(v => (
                                <VehicleCard
                                    key={v.id}
                                    {...v}
                                    isSelected={selectedVehicle === v.id}
                                    onSelect={() => setSelectedVehicle(v.id)}
                                />
                            ))}
                        </div>
                    </section>

                    {/* 2. Lista de Pedidos (Simplificada) */}
                    <section>
                        <h3 className="font-bold text-gray-700 mb-3 flex items-center gap-2">
                            <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">2</span>
                            Pedidos para Hoy
                        </h3>
                        <Card>
                            <CardContent className="p-0">
                                <table className="w-full text-sm">
                                    <thead className="bg-gray-50 text-gray-500">
                                    <tr>
                                        <th className="p-3 text-left">Cliente</th>
                                        <th className="p-3">Zona</th>
                                        <th className="p-3">Carga</th>
                                    </tr>
                                    </thead>
                                    <tbody className="divide-y">
                                    {pedidosPendientes.map(p => (
                                        <tr key={p.id} className="hover:bg-gray-50">
                                            <td className="p-3">
                                                <div className="font-medium">{p.cliente}</div>
                                                {p.prio === 'alta' && <span className="text-[10px] bg-red-100 text-red-600 px-1 rounded font-bold">URGENTE</span>}
                                            </td>
                                            <td className="p-3 text-center text-gray-500">{p.zona}</td>
                                            <td className="p-3 text-center">{p.peso}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </CardContent>
                        </Card>
                    </section>

                    <Button
                        variant="primary"
                        className="w-full h-12 shadow-lg shadow-blue-200"
                        onClick={handleGenerarRuta}
                    >
                        <Zap size={20} className={rutaGenerada ? "text-yellow-300" : ""} />
                        {rutaGenerada ? "Recalcular Ruta" : "Generar Ruta Óptima"}
                    </Button>
                </div>

                {/* COLUMNA DERECHA: Resultado Visual */}
                <div className="lg:col-span-8">
                    <Card className="h-full min-h-[600px] flex flex-col">
                        <CardHeader className="border-b">
                            <CardTitle className="flex justify-between items-center">
                                <span>Mapa de Ruta - Zona Norte</span>
                                {rutaGenerada && <Badge variant="success">Ruta Optimizada</Badge>}
                            </CardTitle>
                        </CardHeader>

                        <CardContent className="p-0 flex-1 relative bg-slate-50">
                            {!rutaGenerada ? (
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
                                    <Map size={64} className="mb-4 opacity-20" />
                                    <p>Seleccione un vehículo y genere la ruta para visualizar</p>
                                </div>
                            ) : (
                                <div className="flex flex-col h-full">
                                    {/* Mapa Arriba */}
                                    <div className="h-2/3 border-b border-gray-200">
                                        <MapaRutas height="h-full" puntos={puntosMapa} />
                                    </div>

                                    {/* Timeline Abajo */}
                                    <div className="flex-1 p-6 overflow-y-auto bg-white">
                                        <h4 className="text-sm font-bold text-gray-500 uppercase mb-4">Secuencia de Entregas</h4>
                                        <RouteTimeline paradas={paradasSimuladas} />
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

            </div>
        </div>
    );
};

export default Planificador;