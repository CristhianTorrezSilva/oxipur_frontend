import React, { useState, useMemo } from 'react';
import { Map, Zap, Calendar, CheckSquare, AlertTriangle, User, Ban, Filter, RefreshCw, Wrench, UserX, Truck, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Alert from '../../components/ui/Alert';
import MapaRutas from '../../components/logistic/MapaRutas'; // Si no tienes este componente, coméntalo o crea uno vacío
import VehicleCard from '../../components/logistic/VehicleCard';
import RouteTimeline from '../../components/logistic/RouteTimeline';

const Planificador = () => {
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [selectedDriver, setSelectedDriver] = useState('');
    const [selectedOrders, setSelectedOrders] = useState([]);
    const [rutaGenerada, setRutaGenerada] = useState(false);
    const [filtroZona, setFiltroZona] = useState('Todas');

    // MOCK: VEHÍCULOS (La 'cap' es la Capacidad en Puntos de Carga simulados)
    const [vehiculos, setVehiculos] = useState([
        { id: 1, placa: "2344-XTR", cap: 1000, modelo: "Nissan Atlas (Mediano)", estado: "disponible" },
        { id: 2, placa: "4055-BBN", cap: 2500, modelo: "Volvo FH (Grande)", estado: "disponible" },
        { id: 3, placa: "1099-LPO", cap: 800, modelo: "Suzuki Carry (Pequeño)", estado: "mantenimiento" },
    ]);

    // MOCK: CONDUCTORES (Restaurado para Caso de Uso 72)
    const [conductores, setConductores] = useState([
        { id: 'C01', nombre: 'Juan Pérez', estado: 'Libre' },
        { id: 'C02', nombre: 'Carlos Mamani', estado: 'Libre' },
        { id: 'C03', nombre: 'Roberto Gomez', estado: 'Vacaciones' },
    ]);

    // MOCK: PEDIDOS (El 'peso' simula el volumen para la Docente)
    const pedidosPendientes = [
        { id: "PED-999", cliente: "Farmacia 24h", zona: "Norte", peso: 150, prio: "repro", desc: "5x Cilindros 10m3", motivo: "Cliente Cerrado" },
        { id: "PED-104", cliente: "Clínica Incor", zona: "Norte", peso: 800, prio: "alta", desc: "20x Cilindros 10m3 + 10x 6m3" },
        { id: "PED-105", cliente: "Hospital Obrero", zona: "Centro", peso: 1200, prio: "media", desc: "40x Cilindros 10m3" },
        { id: "PED-106", cliente: "Consultorio Norte", zona: "Norte", peso: 100, prio: "baja", desc: "10x Portátiles (Mochila)" },
        { id: "PED-107", cliente: "Particular - Juan", zona: "Sur", peso: 300, prio: "baja", desc: "10x Cilindros 6m3" },
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

    // LÓGICA DE CAPACIDAD (VOLUMEN)
    const cargaTotal = selectedOrders.reduce((acc, id) => {
        const pedido = pedidosPendientes.find(p => p.id === id);
        return acc + (pedido ? pedido.peso : 0);
    }, 0);

    const vehiculoActual = vehiculos.find(v => v.id === selectedVehicle);
    const capacidadMaxima = vehiculoActual ? vehiculoActual.cap : 1;
    const porcentajeCarga = Math.min((cargaTotal / capacidadMaxima) * 100, 100);
    const capacidadExcedida = vehiculoActual && cargaTotal > vehiculoActual.cap;

    let barraColor = "bg-green-500";
    if (porcentajeCarga > 75) barraColor = "bg-yellow-500";
    if (capacidadExcedida) barraColor = "bg-red-600";

    const nombreChoferSel = conductores.find(c => c.id === selectedDriver)?.nombre || "Sin Asignar";

    // --- ACCIONES ---

    // 1. Reportar Avería Vehículo
    const handleReportarAveria = (e, id) => {
        e.stopPropagation();
        if(confirm("¿Reportar falla mecánica? El vehículo quedará inactivo.")) {
            setVehiculos(vehiculos.map(v => v.id === id ? { ...v, estado: 'mantenimiento' } : v));
            if (selectedVehicle === id) setSelectedVehicle(null);
        }
    };

    // 2. Reportar Baja Conductor (TU CÓDIGO RESTAURADO - CASO DE USO 72)
    const handleReportarBaja = (e, id) => {
        e.stopPropagation();
        if(confirm("¿Marcar conductor como NO DISPONIBLE (Baja Médica/Falta)?\n\nEl sistema bloqueará su asignación temporalmente.")) {
            setConductores(conductores.map(c => c.id === id ? { ...c, estado: 'Baja Médica' } : c));
            // Si el conductor dado de baja estaba seleccionado, lo deseleccionamos
            if (selectedDriver === id) {
                setSelectedDriver('');
                setRutaGenerada(false);
                alert("Conductor desvinculado de la ruta actual por baja médica.");
            }
        }
    };

    const handleGenerarRuta = () => {
        setRutaGenerada(true);
        alert("¡Ruta Optimizada Generada!\nSe ha notificado al conductor y a almacén.");
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Planificador de Distribución</h2>
                    <p className="text-gray-500">Asignación de carga basada en volumen ($m^3$) y disponibilidad de personal.</p>
                </div>
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border shadow-sm">
                    <Calendar size={18} className="text-gray-500"/>
                    <span className="font-semibold text-gray-700">04 Dic, 2025</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                {/* COLUMNA IZQUIERDA: CONTROLES */}
                <div className="lg:col-span-5 space-y-6">

                    {/* 1. SELECCIONAR VEHÍCULO */}
                    <section>
                        <h3 className="font-bold text-gray-700 mb-2 text-sm uppercase">1. Vehículo Disponible</h3>
                        <div className="space-y-2">
                            {vehiculos.map(v => {
                                const isAvailable = v.estado === 'disponible';
                                return (
                                    <div key={v.id}
                                         onClick={() => isAvailable && setSelectedVehicle(v.id)}
                                         className={`relative p-3 rounded-lg border cursor-pointer transition-all flex justify-between items-center group
                                            ${selectedVehicle === v.id ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500' : 'bg-white border-gray-200 hover:border-blue-300'}
                                            ${!isAvailable ? 'opacity-60 bg-gray-50 pointer-events-none' : ''}
                                         `}
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`p-2 rounded-full ${isAvailable ? 'bg-blue-100 text-blue-600' : 'bg-gray-200 text-gray-500'}`}>
                                                <Truck size={20}/>
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-800">{v.modelo}</p>
                                                <p className="text-xs text-gray-500">Placa: {v.placa}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <Badge variant={isAvailable ? "success" : "danger"}>{isAvailable ? "Disponible" : "Taller"}</Badge>
                                            <p className="text-xs font-bold text-gray-600 mt-1">Cap: {v.cap} pts</p>
                                        </div>

                                        {/* Botón Avería */}
                                        {isAvailable && (
                                            <button onClick={(e) => handleReportarAveria(e, v.id)} className="absolute -top-2 -right-2 bg-white text-gray-400 hover:text-red-500 border shadow-sm rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity" title="Reportar Avería">
                                                <Wrench size={12}/>
                                            </button>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </section>

                    {/* 2. SELECCIONAR CONDUCTOR (CON BOTÓN DE BAJA RESTAURADO) */}
                    <section>
                        <h3 className="font-bold text-gray-700 mb-2 text-sm uppercase">2. Conductor</h3>
                        <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-sm">
                            <div className="grid grid-cols-1 gap-2">
                                {conductores.map(c => {
                                    const isLibre = c.estado === 'Libre';
                                    const isSelected = selectedDriver === c.id;
                                    return (
                                        <div key={c.id} className="relative group">
                                            <button
                                                disabled={!isLibre}
                                                onClick={() => setSelectedDriver(c.id)}
                                                className={`w-full flex items-center justify-between p-2 rounded-lg text-sm border transition-all 
                                                    ${isSelected ? 'bg-blue-50 border-blue-500 text-blue-700 font-bold ring-1 ring-blue-500' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'} 
                                                    ${!isLibre ? 'opacity-50 cursor-not-allowed bg-gray-100' : ''}`}
                                            >
                                                <div className="flex items-center gap-2">
                                                    <User size={16}/>
                                                    <span>{c.nombre}</span>
                                                </div>
                                                <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${isLibre ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                    {c.estado}
                                                </span>
                                            </button>

                                            {/* BOTÓN DE BAJA MÉDICA (Visible al hover si está libre) */}
                                            {isLibre && (
                                                <button
                                                    onClick={(e) => handleReportarBaja(e, c.id)}
                                                    className="absolute top-1/2 -translate-y-1/2 right-[-10px] translate-x-full lg:translate-x-0 lg:right-2 p-1.5 bg-white border border-gray-200 shadow-sm rounded-full text-gray-400 hover:text-red-600 hover:border-red-300 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                                                    title="Marcar como No Disponible (Baja)"
                                                >
                                                    <UserX size={14}/>
                                                </button>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </section>

                    {/* 3. SELECCIONAR PEDIDOS (CON BARRA DE CAPACIDAD) */}
                    <section className="flex-1 flex flex-col">
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="font-bold text-gray-700 text-sm uppercase">3. Carga ({selectedOrders.length})</h3>
                            <div className="flex gap-2 text-xs">
                                <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded border border-blue-200">10m3 = 40 pts</span>
                                <span className="bg-gray-100 text-gray-800 px-2 py-0.5 rounded border border-gray-200">Portátil = 10 pts</span>
                            </div>
                        </div>

                        <Card className="flex-1 flex flex-col overflow-hidden border-blue-200 shadow-sm">
                            <div className="max-h-60 overflow-y-auto">
                                <table className="w-full text-sm">
                                    <thead className="bg-gray-50 text-gray-500 sticky top-0">
                                    <tr><th className="p-2 w-8"><CheckSquare size={14}/></th><th className="p-2 text-left">Detalle Carga</th><th className="p-2 text-right">Peso Vol.</th></tr>
                                    </thead>
                                    <tbody className="divide-y">
                                    {pedidosFiltrados.map(p => (
                                        <tr key={p.id}
                                            onClick={() => toggleOrder(p.id)}
                                            className={`hover:bg-blue-50 cursor-pointer transition-colors ${selectedOrders.includes(p.id) ? 'bg-blue-50' : ''}`}
                                        >
                                            <td className="p-2"><input type="checkbox" checked={selectedOrders.includes(p.id)} readOnly className="accent-blue-600"/></td>
                                            <td className="p-2">
                                                <div className="font-bold text-xs">{p.cliente}</div>
                                                <div className="text-[10px] text-gray-500">{p.desc}</div>
                                            </td>
                                            <td className="p-2 text-right font-mono text-xs font-bold">{p.peso}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* BARRA DE CAPACIDAD INTELIGENTE (Para la Docente) */}
                            <div className="p-4 bg-slate-50 border-t border-slate-200">
                                <div className="flex justify-between items-center mb-1 text-xs font-bold">
                                    <span className="text-gray-500">OCUPACIÓN DEL CAMIÓN</span>
                                    <span className={capacidadExcedida ? "text-red-600" : "text-gray-700"}>
                                        {cargaTotal} / {vehiculoActual ? vehiculoActual.cap : '---'} pts
                                    </span>
                                </div>
                                <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                                    <div
                                        className={`h-full transition-all duration-500 ${barraColor} flex items-center justify-center`}
                                        style={{ width: vehiculoActual ? `${porcentajeCarga}%` : '0%' }}
                                    >
                                        {capacidadExcedida && <span className="text-[10px] text-white font-bold animate-pulse">¡EXCESO!</span>}
                                    </div>
                                </div>
                                {capacidadExcedida && (
                                    <p className="text-[10px] text-red-500 mt-1 font-bold text-center">
                                        La carga seleccionada excede la capacidad volumétrica del vehículo.
                                    </p>
                                )}
                            </div>
                        </Card>
                    </section>

                    <Button
                        variant="primary"
                        className="w-full h-12 shadow-md"
                        onClick={handleGenerarRuta}
                        disabled={!selectedVehicle || !selectedDriver || selectedOrders.length === 0 || capacidadExcedida}
                    >
                        <Zap size={20} className={rutaGenerada ? "text-yellow-300" : ""} />
                        {rutaGenerada ? "Ruta Confirmada" : "Optimizar y Asignar Ruta"}
                    </Button>
                </div>

                {/* COLUMNA DERECHA: MAPA */}
                <div className="lg:col-span-7">
                    <Card className="h-full min-h-[600px] flex flex-col bg-white">
                        <CardHeader className="border-b py-3 bg-gray-50">
                            <CardTitle className="text-sm flex justify-between items-center">
                                <span>Visualización Geográfica</span>
                                {rutaGenerada && <Badge variant="success">Listo para Despacho</Badge>}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0 flex-1 relative">
                            {!rutaGenerada ? (
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 p-8 text-center bg-slate-50">
                                    <Map size={64} className="mb-4 opacity-20" />
                                    <p>Configure los parámetros a la izquierda para generar la ruta óptima.</p>
                                </div>
                            ) : (
                                <div className="flex flex-col h-full">
                                    {/* MOCK DEL MAPA */}
                                    <div className="h-2/3 bg-blue-50/30 relative border-b">
                                        <div className="absolute inset-0 flex items-center justify-center text-blue-200 font-bold text-4xl opacity-20 select-none">MAPA INTERACTIVO</div>
                                        {/* Puntos simulados en el mapa */}
                                        <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg transform -translate-x-1/2 -translate-y-1/2" title="Central"></div>
                                        <div className="absolute top-1/3 left-1/3 w-3 h-3 bg-red-500 rounded-full border-2 border-white shadow hover:scale-150 transition-transform cursor-pointer" title="Cliente 1"></div>
                                        <div className="absolute bottom-1/4 right-1/4 w-3 h-3 bg-red-500 rounded-full border-2 border-white shadow hover:scale-150 transition-transform cursor-pointer" title="Cliente 2"></div>
                                    </div>

                                    {/* ITINERARIO */}
                                    <div className="flex-1 p-6 overflow-y-auto bg-white">
                                        <h4 className="text-xs font-bold text-gray-400 uppercase mb-4">Secuencia de Entrega Sugerida</h4>
                                        <RouteTimeline paradas={[
                                            { id: 1, direccion: "Central OXIPUR (Parque Industrial)", cliente: "Carga de producto", estado: "completado", hora: "08:00 AM" },
                                            { id: 2, direccion: "Av. Banzer Km 4 (Clínica Incor)", cliente: "Entrega Prioritaria", estado: "pendiente", hora: "08:45 AM" },
                                            { id: 3, direccion: "Calle Republiquetas #44", cliente: "Hospital Obrero", estado: "pendiente", hora: "09:30 AM" },
                                            { id: 4, direccion: "Retorno a Central", cliente: "Fin de Ruta", estado: "pendiente", hora: "10:15 AM" }
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