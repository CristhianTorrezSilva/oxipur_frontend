import React, { useState } from 'react';
import { Map, Zap, Calendar, CheckSquare, AlertTriangle, User, Ban } from 'lucide-react'; // Agregué Ban (Icono prohibido)
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import MapaRutas from '../../components/logistic/MapaRutas';
import VehicleCard from '../../components/logistic/VehicleCard';
import RouteTimeline from '../../components/logistic/RouteTimeline';

const Planificador = () => {
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [selectedDriver, setSelectedDriver] = useState('');
    const [selectedOrders, setSelectedOrders] = useState([]);
    const [rutaGenerada, setRutaGenerada] = useState(false);

    // MOCK: Camiones (El ID 3 está en mantenimiento)
    const vehiculos = [
        { id: 1, placa: "2344-XTR", cap: 50, estado: "disponible" },
        { id: 2, placa: "4055-BBN", cap: 80, estado: "disponible" },
        { id: 3, placa: "1099-LPO", cap: 50, estado: "mantenimiento" }, // ESTE NO DEBERÍA PODER USARSE
    ];

    const conductores = [
        { id: 'C01', nombre: 'Juan Pérez', estado: 'Libre' },
        { id: 'C02', nombre: 'Carlos Mamani', estado: 'Libre' },
        { id: 'C03', nombre: 'Roberto Gomez', estado: 'Vacaciones' },
    ];

    const pedidosPendientes = [
        { id: "PED-104", cliente: "Clínica Incor", zona: "Norte", peso: 10, prio: "alta", desc: "10 cil" },
        { id: "PED-105", cliente: "Hospital Obrero", zona: "Centro", peso: 25, prio: "media", desc: "25 cil" },
        { id: "PED-106", cliente: "Consultorio Norte", zona: "Norte", peso: 5, prio: "baja", desc: "5 cil" },
        { id: "PED-107", cliente: "Particular - Juan", zona: "Sur", peso: 20, prio: "baja", desc: "20 cil" },
    ];

    const toggleOrder = (id) => {
        if (selectedOrders.includes(id)) {
            setSelectedOrders(selectedOrders.filter(o => o !== id));
        } else {
            setSelectedOrders([...selectedOrders, id]);
        }
        setRutaGenerada(false);
    };

    const cargaTotal = selectedOrders.reduce((acc, id) => {
        const pedido = pedidosPendientes.find(p => p.id === id);
        return acc + (pedido ? pedido.peso : 0);
    }, 0);

    const vehiculoActual = vehiculos.find(v => v.id === selectedVehicle);
    const capacidadExcedida = vehiculoActual && cargaTotal > vehiculoActual.cap;

    const nombreChoferSel = conductores.find(c => c.id === selectedDriver)?.nombre || "Sin Asignar";

    const handleGenerarRuta = () => {
        if (!selectedVehicle) return alert("Falta asignar Vehículo");
        if (!selectedDriver) return alert("Falta asignar Conductor");
        if (selectedOrders.length === 0) return alert("Seleccione al menos un pedido.");
        if (capacidadExcedida) return alert("La carga excede la capacidad.");

        setRutaGenerada(true);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Planificador de Distribución</h2>
                    <p className="text-gray-500">Asignación manual de recursos y rutas</p>
                </div>
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border shadow-sm">
                    <Calendar size={18} className="text-gray-500"/>
                    <span className="font-semibold text-gray-700">04 de Diciembre, 2025</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                {/* COLUMNA IZQUIERDA: Selección de Recursos */}
                <div className="lg:col-span-5 space-y-6">

                    {/* PASO 1: Asignar Vehículo (CORREGIDO) */}
                    <section>
                        <h3 className="font-bold text-gray-700 mb-3 flex items-center gap-2">
                            <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">1</span>
                            Asignar Vehículo
                        </h3>
                        <div className="space-y-3">
                            {vehiculos.map(v => {
                                const isAvailable = v.estado === 'disponible';
                                return (
                                    <div key={v.id} className={`relative transition-all ${!isAvailable ? 'opacity-50 grayscale' : ''}`}>
                                        {/* BLOQUEO VISUAL SI NO ESTÁ DISPONIBLE */}
                                        {!isAvailable && (
                                            <div className="absolute inset-0 z-10 bg-white/20 cursor-not-allowed flex items-center justify-center">
                            <span className="bg-red-100 text-red-800 text-xs font-bold px-2 py-1 rounded flex items-center gap-1 border border-red-200">
                                <Ban size={12}/> NO DISPONIBLE
                            </span>
                                            </div>
                                        )}

                                        <VehicleCard
                                            {...v}
                                            chofer={selectedVehicle === v.id ? (selectedDriver ? nombreChoferSel : "Seleccione Chofer...") : null}
                                            isSelected={selectedVehicle === v.id}
                                            onSelect={() => {
                                                if (!isAvailable) {
                                                    alert(`¡Error! El vehículo ${v.placa} está en ${v.estado} y no puede ser asignado.`);
                                                    return;
                                                }
                                                setSelectedVehicle(v.id);
                                                setRutaGenerada(false);
                                            }}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </section>

                    {/* PASO 2: Asignar Conductor */}
                    <section>
                        <h3 className="font-bold text-gray-700 mb-3 flex items-center gap-2">
                            <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">2</span>
                            Asignar Conductor
                        </h3>
                        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                            <label className="text-sm font-semibold text-gray-600 mb-2 block">Conductores Disponibles:</label>
                            <div className="grid grid-cols-2 gap-2">
                                {conductores.map(c => (
                                    <button
                                        key={c.id}
                                        disabled={c.estado !== 'Libre'}
                                        onClick={() => setSelectedDriver(c.id)}
                                        className={`
                                flex items-center gap-2 p-2 rounded-lg text-sm border transition-all
                                ${selectedDriver === c.id
                                            ? 'bg-blue-50 border-blue-500 text-blue-700 font-bold ring-1 ring-blue-500'
                                            : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}
                                ${c.estado !== 'Libre' ? 'opacity-50 cursor-not-allowed bg-gray-100' : ''}
                            `}
                                    >
                                        <User size={16}/>
                                        <div className="text-left">
                                            <div>{c.nombre}</div>
                                            <div className="text-[10px] uppercase">{c.estado}</div>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* PASO 3: Selección de Pedidos */}
                    <section>
                        <h3 className="font-bold text-gray-700 mb-3 flex items-center gap-2">
                            <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">3</span>
                            Asignar Pedidos
                        </h3>
                        <Card>
                            <CardContent className="p-0 max-h-48 overflow-y-auto">
                                <table className="w-full text-sm">
                                    <thead className="bg-gray-50 text-gray-500 sticky top-0">
                                    <tr>
                                        <th className="p-3 w-8"><CheckSquare size={16}/></th>
                                        <th className="p-3 text-left">Cliente</th>
                                        <th className="p-3 text-center">Carga</th>
                                    </tr>
                                    </thead>
                                    <tbody className="divide-y">
                                    {pedidosPendientes.map(p => (
                                        <tr
                                            key={p.id}
                                            className={`hover:bg-gray-50 cursor-pointer ${selectedOrders.includes(p.id) ? 'bg-blue-50' : ''}`}
                                            onClick={() => toggleOrder(p.id)}
                                        >
                                            <td className="p-3">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedOrders.includes(p.id)}
                                                    onChange={() => {}}
                                                    className="accent-blue-600 w-4 h-4 cursor-pointer"
                                                />
                                            </td>
                                            <td className="p-3">
                                                <div className="font-medium">{p.cliente}</div>
                                                {p.prio === 'alta' && <span className="text-[10px] bg-red-100 text-red-600 px-1 rounded font-bold">URGENTE</span>}
                                            </td>
                                            <td className="p-3 text-center font-mono">{p.peso}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </CardContent>
                            {/* Resumen de Carga */}
                            <div className="p-4 border-t bg-gray-50">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-xs font-bold text-gray-500 uppercase">Carga Total:</span>
                                    <span className={`font-bold ${capacidadExcedida ? 'text-red-600' : 'text-gray-800'}`}>
                        {cargaTotal} / {vehiculoActual ? vehiculoActual.cap : '-'}
                    </span>
                                </div>
                                {vehiculoActual && (
                                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full transition-all ${capacidadExcedida ? 'bg-red-500' : 'bg-green-500'}`}
                                            style={{ width: `${Math.min((cargaTotal / vehiculoActual.cap) * 100, 100)}%` }}
                                        ></div>
                                    </div>
                                )}
                            </div>
                        </Card>
                    </section>

                    <Button
                        variant="primary"
                        className="w-full h-12 shadow-lg shadow-blue-200"
                        onClick={handleGenerarRuta}
                        disabled={!selectedVehicle || !selectedDriver || selectedOrders.length === 0 || capacidadExcedida}
                    >
                        <Zap size={20} className={rutaGenerada ? "text-yellow-300" : ""} />
                        {rutaGenerada ? "Ruta Confirmada" : "Generar Hoja de Ruta"}
                    </Button>
                </div>

                {/* COLUMNA DERECHA: Resultado Visual */}
                <div className="lg:col-span-7">
                    <Card className="h-full min-h-[600px] flex flex-col">
                        <CardHeader className="border-b">
                            <CardTitle className="flex justify-between items-center">
                                <span>Visualización de Ruta</span>
                                {rutaGenerada && <Badge variant="success">Asignación Completa</Badge>}
                            </CardTitle>
                        </CardHeader>

                        <CardContent className="p-0 flex-1 relative bg-slate-50">
                            {!rutaGenerada ? (
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 p-8 text-center">
                                    <Map size={64} className="mb-4 opacity-20" />
                                    <p>Configure los recursos (Vehículo y Conductor) y asigne los pedidos para visualizar la ruta.</p>
                                </div>
                            ) : (
                                <div className="flex flex-col h-full">
                                    <div className="h-2/3 border-b border-gray-200 relative">
                                        <MapaRutas height="h-full" puntos={[
                                            { id: 1, x: 50, y: 50, nombre: "Central", tipo: "central" },
                                            { id: 2, x: 30, y: 40, nombre: "Cliente 1", tipo: "entrega" },
                                            { id: 3, x: 60, y: 70, nombre: "Cliente 2", tipo: "entrega" }
                                        ]} />
                                    </div>
                                    <div className="flex-1 p-6 overflow-y-auto bg-white">
                                        <div className="flex justify-between items-center mb-4">
                                            <h4 className="text-sm font-bold text-gray-500 uppercase">Resumen de Asignación</h4>
                                            <Badge variant="info">{nombreChoferSel}</Badge>
                                        </div>
                                        <RouteTimeline paradas={[
                                            { id: 1, direccion: "Central OXIPUR", cliente: "Carga de producto", estado: "completado", hora: "08:00" },
                                            { id: 2, direccion: "Ruta Generada", cliente: `${selectedOrders.length} Clientes Asignados`, estado: "pendiente", hora: "09:00 - 12:00" }
                                        ]} />
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