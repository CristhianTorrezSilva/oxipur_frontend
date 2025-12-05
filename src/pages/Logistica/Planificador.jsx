import React, { useState, useMemo } from 'react';
import { Map, Zap, Calendar, CheckSquare, AlertTriangle, User, Ban, Filter, RefreshCw, Wrench, UserX } from 'lucide-react'; // Agregué UserX
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
    const [filtroZona, setFiltroZona] = useState('Todas');

    // ESTADO DE VEHÍCULOS (Dinámico para averías)
    const [vehiculos, setVehiculos] = useState([
        { id: 1, placa: "2344-XTR", cap: 50, estado: "disponible" },
        { id: 2, placa: "4055-BBN", cap: 80, estado: "disponible" },
        { id: 3, placa: "1099-LPO", cap: 50, estado: "mantenimiento" },
    ]);

    // ESTADO DE CONDUCTORES (Dinámico para bajas/ausencias) - CASO DE USO 72
    const [conductores, setConductores] = useState([
        { id: 'C01', nombre: 'Juan Pérez', estado: 'Libre' },
        { id: 'C02', nombre: 'Carlos Mamani', estado: 'Libre' },
        { id: 'C03', nombre: 'Roberto Gomez', estado: 'Vacaciones' },
    ]);

    const pedidosPendientes = [
        { id: "PED-999", cliente: "Farmacia 24h", zona: "Norte", peso: 15, prio: "repro", desc: "15 cil", motivo: "Cliente Cerrado (Ayer)" },
        { id: "PED-104", cliente: "Clínica Incor", zona: "Norte", peso: 10, prio: "alta", desc: "10 cil" },
        { id: "PED-105", cliente: "Hospital Obrero", zona: "Centro", peso: 25, prio: "media", desc: "25 cil" },
        { id: "PED-106", cliente: "Consultorio Norte", zona: "Norte", peso: 5, prio: "baja", desc: "5 cil" },
        { id: "PED-107", cliente: "Particular - Juan", zona: "Sur", peso: 20, prio: "baja", desc: "20 cil" },
    ];

    const pedidosFiltrados = useMemo(() => {
        if (filtroZona === 'Todas') return pedidosPendientes;
        return pedidosPendientes.filter(p => p.zona === filtroZona);
    }, [filtroZona]);

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

    // ACCIÓN 1: Reportar Avería Vehículo
    const handleReportarAveria = (e, id) => {
        e.stopPropagation();
        if(confirm("¿Reportar falla mecánica en este vehículo?\n\nEsto lo marcará como INDISPONIBLE.")) {
            setVehiculos(vehiculos.map(v => v.id === id ? { ...v, estado: 'mantenimiento' } : v));
            if (selectedVehicle === id) { setSelectedVehicle(null); setRutaGenerada(false); }
        }
    };

    // ACCIÓN 2: Reportar Baja Conductor (CASO DE USO 72 - Reasignar Conductor)
    const handleReportarBaja = (e, id) => {
        e.stopPropagation();
        if(confirm("¿Marcar conductor como NO DISPONIBLE (Baja Médica/Falta)?\n\nEl sistema bloqueará su asignación temporalmente.")) {
            setConductores(conductores.map(c => c.id === id ? { ...c, estado: 'Baja Médica' } : c));
            if (selectedDriver === id) {
                setSelectedDriver(''); // Desvincula al conductor actual
                setRutaGenerada(false); // Obliga a regenerar
                alert("Conductor desvinculado de la ruta actual. Por favor seleccione un conductor alterno.");
            }
        }
    };

    const handleGenerarRuta = () => {
        if (!selectedVehicle) return alert("Falta asignar Vehículo");
        if (!selectedDriver) return alert("Falta asignar Conductor");
        if (selectedOrders.length === 0) return alert("Seleccione al menos un pedido.");
        if (capacidadExcedida) return alert("La carga excede la capacidad.");

        setRutaGenerada(true);
        if (rutaGenerada) {
            alert("Ruta actualizada y notificaciones enviadas al nuevo equipo asignado.");
        }
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

                {/* COLUMNA IZQUIERDA */}
                <div className="lg:col-span-5 space-y-6">

                    {/* PASO 1: Asignar Vehículo */}
                    <section>
                        <h3 className="font-bold text-gray-700 mb-3 flex items-center gap-2">
                            <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">1</span>
                            Asignar Vehículo
                        </h3>
                        <div className="space-y-3">
                            {vehiculos.map(v => {
                                const isAvailable = v.estado === 'disponible';
                                return (
                                    <div key={v.id} className={`relative transition-all group ${!isAvailable ? 'opacity-60 grayscale' : ''}`}>
                                        {!isAvailable && (
                                            <div className="absolute inset-0 z-10 bg-white/40 cursor-not-allowed flex items-center justify-center pointer-events-none">
                                                <span className="bg-red-100 text-red-800 text-xs font-bold px-2 py-1 rounded flex items-center gap-1 border border-red-200 shadow-sm"><Ban size={12}/> EN TALLER</span>
                                            </div>
                                        )}
                                        {isAvailable && (
                                            <button onClick={(e) => handleReportarAveria(e, v.id)} className="absolute top-2 right-2 z-20 p-1.5 bg-gray-100 text-gray-400 hover:bg-red-100 hover:text-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" title="Reportar Avería">
                                                <Wrench size={14} />
                                            </button>
                                        )}
                                        <VehicleCard
                                            {...v}
                                            chofer={selectedVehicle === v.id ? (selectedDriver ? nombreChoferSel : "Seleccione Chofer...") : null}
                                            isSelected={selectedVehicle === v.id}
                                            onSelect={() => { if (!isAvailable) { alert(`¡Error! Vehículo indisponible.`); return; } setSelectedVehicle(v.id); setRutaGenerada(false); }}
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </section>

                    {/* PASO 2: Asignar Conductor (CON BOTÓN DE BAJA) */}
                    <section>
                        <h3 className="font-bold text-gray-700 mb-3 flex items-center gap-2">
                            <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">2</span>
                            Asignar Conductor
                        </h3>
                        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                            <div className="grid grid-cols-2 gap-2">
                                {conductores.map(c => {
                                    const isLibre = c.estado === 'Libre';
                                    return (
                                        <div key={c.id} className="relative group">
                                            <button
                                                disabled={!isLibre}
                                                onClick={() => setSelectedDriver(c.id)}
                                                className={`w-full flex items-center gap-2 p-2 rounded-lg text-sm border transition-all ${selectedDriver === c.id ? 'bg-blue-50 border-blue-500 text-blue-700 font-bold ring-1 ring-blue-500' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'} ${!isLibre ? 'opacity-50 cursor-not-allowed bg-gray-100' : ''}`}
                                            >
                                                <User size={16}/>
                                                <div className="text-left">
                                                    <div>{c.nombre}</div>
                                                    <div className="text-[10px] uppercase font-bold text-xs">{c.estado}</div>
                                                </div>
                                            </button>

                                            {/* BOTÓN DE BAJA MÉDICA (Visible al hover si está libre) */}
                                            {isLibre && (
                                                <button
                                                    onClick={(e) => handleReportarBaja(e, c.id)}
                                                    className="absolute top-1 right-1 p-1 bg-white border border-gray-200 shadow-sm rounded-full text-gray-400 hover:text-red-600 hover:border-red-300 opacity-0 group-hover:opacity-100 transition-opacity"
                                                    title="Marcar como No Disponible"
                                                >
                                                    <UserX size={12}/>
                                                </button>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </section>

                    {/* PASO 3: Selección de Pedidos */}
                    <section>
                        <div className="flex justify-between items-end mb-3">
                            <h3 className="font-bold text-gray-700 flex items-center gap-2">
                                <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">3</span>
                                Asignar Pedidos
                            </h3>
                            <div className="flex items-center gap-2">
                                <Filter size={14} className="text-gray-500"/>
                                <select className="text-xs border rounded p-1 bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={filtroZona} onChange={(e) => setFiltroZona(e.target.value)}>
                                    <option value="Todas">Todas las Zonas</option>
                                    <option value="Norte">Zona Norte</option>
                                    <option value="Centro">Zona Centro</option>
                                    <option value="Sur">Zona Sur</option>
                                </select>
                            </div>
                        </div>

                        <Card>
                            <CardContent className="p-0 max-h-48 overflow-y-auto">
                                <table className="w-full text-sm">
                                    <thead className="bg-gray-50 text-gray-500 sticky top-0">
                                    <tr><th className="p-3 w-8"><CheckSquare size={16}/></th><th className="p-3 text-left">Cliente / Zona</th><th className="p-3 text-center">Carga</th></tr>
                                    </thead>
                                    <tbody className="divide-y">
                                    {pedidosFiltrados.length === 0 ? (
                                        <tr><td colSpan="3" className="p-4 text-center text-gray-400 italic">No hay pedidos pendientes.</td></tr>
                                    ) : (
                                        pedidosFiltrados.map(p => (
                                            <tr key={p.id} className={`hover:bg-gray-50 cursor-pointer ${selectedOrders.includes(p.id) ? 'bg-blue-50' : ''} ${p.prio === 'repro' ? 'bg-orange-50' : ''}`} onClick={() => toggleOrder(p.id)}>
                                                <td className="p-3"><input type="checkbox" checked={selectedOrders.includes(p.id)} onChange={() => {}} className="accent-blue-600 w-4 h-4 cursor-pointer"/></td>
                                                <td className="p-3">
                                                    <div className="font-medium flex items-center gap-2">{p.cliente}{p.prio === 'repro' && (<div className="flex items-center gap-1 text-[10px] bg-orange-200 text-orange-800 px-1.5 py-0.5 rounded font-bold border border-orange-300"><RefreshCw size={10} /> REPROGRAMAR</div>)}</div>
                                                    <div className="flex flex-col mt-1">
                                                        <div className="flex gap-2"><Badge variant="outline">{p.zona}</Badge>{p.prio === 'alta' && <span className="text-[10px] bg-red-100 text-red-600 px-1 rounded font-bold">URGENTE</span>}</div>
                                                        {p.prio === 'repro' && <span className="text-[10px] text-orange-700 italic mt-0.5">Motivo: {p.motivo}</span>}
                                                    </div>
                                                </td>
                                                <td className="p-3 text-center font-mono">{p.peso}</td>
                                            </tr>
                                        ))
                                    )}
                                    </tbody>
                                </table>
                            </CardContent>
                            <div className="p-4 border-t bg-gray-50">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-xs font-bold text-gray-500 uppercase">Carga Total:</span>
                                    <span className={`font-bold ${capacidadExcedida ? 'text-red-600' : 'text-gray-800'}`}>{cargaTotal} / {vehiculoActual ? vehiculoActual.cap : '-'}</span>
                                </div>
                                {vehiculoActual && (
                                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                        <div className={`h-full transition-all ${capacidadExcedida ? 'bg-red-500' : 'bg-green-500'}`} style={{ width: `${Math.min((cargaTotal / vehiculoActual.cap) * 100, 100)}%` }}></div>
                                    </div>
                                )}
                            </div>
                        </Card>
                    </section>

                    <Button variant="primary" className="w-full h-12 shadow-lg shadow-blue-200" onClick={handleGenerarRuta} disabled={!selectedVehicle || !selectedDriver || selectedOrders.length === 0 || capacidadExcedida}>
                        <Zap size={20} className={rutaGenerada ? "text-yellow-300" : ""} /> {rutaGenerada ? "Confirmar y Notificar" : "Generar Hoja de Ruta"}
                    </Button>
                </div>

                {/* COLUMNA DERECHA */}
                <div className="lg:col-span-7">
                    <Card className="h-full min-h-[600px] flex flex-col">
                        <CardHeader className="border-b"><CardTitle className="flex justify-between items-center"><span>Visualización de Ruta</span>{rutaGenerada && <Badge variant="success">Asignación Completa</Badge>}</CardTitle></CardHeader>
                        <CardContent className="p-0 flex-1 relative bg-slate-50">
                            {!rutaGenerada ? (
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 p-8 text-center">
                                    <Map size={64} className="mb-4 opacity-20" />
                                    <p>Seleccione recursos y pedidos para visualizar la ruta.</p>
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
                                            <h4 className="text-sm font-bold text-gray-500 uppercase">Vehículo: {vehiculoActual?.placa}</h4>
                                            <Badge variant="info">{nombreChoferSel}</Badge>
                                        </div>
                                        <RouteTimeline paradas={[
                                            { id: 1, direccion: "Central OXIPUR", cliente: "Carga de producto", estado: "completado", hora: "08:00" },
                                            { id: 2, direccion: "Itinerario Optimizado", cliente: `${selectedOrders.length} Paradas asignadas`, estado: "pendiente", hora: "09:00 - 13:00" }
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