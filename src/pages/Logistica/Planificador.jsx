import React, { useState, useMemo } from 'react';
import { Map, Zap, Calendar, CheckSquare, Settings, User, Ban, Filter, RefreshCw, Wrench, UserX, Truck, Navigation, X, Flag } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import RouteTimeline from '../../components/logistic/RouteTimeline';

// --- COMPONENTE MODAL DE CONFIGURACIÓN ---
const ConfigPanel = ({ config, setConfig, onClose }) => {
    const handleChange = (key, value) => {
        setConfig({ ...config, [key]: parseInt(value) || 0 });
    };
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
            <div className="bg-white p-6 rounded-xl shadow-2xl w-96 border border-blue-200 animate-in fade-in zoom-in-95">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-gray-800 flex items-center gap-2"><Settings size={18}/> Parametrización Logística</h3>
                    <button onClick={onClose}><X size={18} className="text-gray-400 hover:text-red-500"/></button>
                </div>
                <p className="text-xs text-gray-500 mb-4">Ajuste la ponderación volumétrica (puntos de carga) para el algoritmo de capacidad.</p>
                <div className="space-y-3">
                    <div className="flex justify-between items-center">
                        <label className="text-sm font-medium">Peso Cil. 10m3</label>
                        <input type="number" value={config.peso10m3} onChange={(e) => handleChange('peso10m3', e.target.value)} className="w-20 p-1 border rounded text-right font-mono"/>
                    </div>
                    <div className="flex justify-between items-center">
                        <label className="text-sm font-medium">Peso Cil. 6m3</label>
                        <input type="number" value={config.peso6m3} onChange={(e) => handleChange('peso6m3', e.target.value)} className="w-20 p-1 border rounded text-right font-mono"/>
                    </div>
                    <div className="flex justify-between items-center">
                        <label className="text-sm font-medium">Peso Portátil</label>
                        <input type="number" value={config.pesoPortatil} onChange={(e) => handleChange('pesoPortatil', e.target.value)} className="w-20 p-1 border rounded text-right font-mono"/>
                    </div>
                </div>
                <div className="mt-6 pt-4 border-t flex justify-end">
                    <Button variant="primary" onClick={onClose}>Aplicar Cambios</Button>
                </div>
            </div>
        </div>
    );
};

const Planificador = () => {
    // ESTADOS
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [selectedDriver, setSelectedDriver] = useState('');
    const [selectedOrders, setSelectedOrders] = useState([]);
    const [rutaGenerada, setRutaGenerada] = useState(false);
    const [filtroZona, setFiltroZona] = useState('Todas');

    // ESTADOS DE INGENIERÍA
    const [showConfig, setShowConfig] = useState(false);
    const [rutaCalculada, setRutaCalculada] = useState(null);
    const [isEditingCap, setIsEditingCap] = useState(null);

    // CONFIGURACIÓN DE PESOS
    const [configPuntos, setConfigPuntos] = useState({
        peso10m3: 40,
        peso6m3: 25,
        pesoPortatil: 10
    });

    // MOCK: VEHÍCULOS
    const [vehiculos, setVehiculos] = useState([
        { id: 1, placa: "2344-XTR", cap: 1000, modelo: "Nissan Atlas (Mediano)", estado: "disponible" },
        { id: 2, placa: "4055-BBN", cap: 2500, modelo: "Volvo FH (Grande)", estado: "disponible" },
        { id: 3, placa: "1099-LPO", cap: 800, modelo: "Suzuki Carry (Pequeño)", estado: "mantenimiento" },
    ]);

    // MOCK: CONDUCTORES
    const [conductores, setConductores] = useState([
        { id: 'C01', nombre: 'Juan Pérez', estado: 'Libre' },
        { id: 'C02', nombre: 'Carlos Mamani', estado: 'Libre' },
        { id: 'C03', nombre: 'Roberto Gomez', estado: 'Vacaciones' },
    ]);

    // MOCK: PEDIDOS CON COORDENADAS (0-100 para el plano cartesiano)
    const pedidosPendientes = [
        { id: "PED-999", cliente: "Farmacia 24h", zona: "Norte", tipo: "10m3", cant: 5, coords: { x: 20, y: 30 }, desc: "5x Cilindros 10m3", motivo: "Cliente Cerrado", prio: "repro" },
        { id: "PED-104", cliente: "Clínica Incor", zona: "Norte", tipo: "10m3", cant: 20, coords: { x: 30, y: 60 }, desc: "20x Cilindros 10m3", prio: "alta" },
        { id: "PED-105", cliente: "Hospital Obrero", zona: "Centro", tipo: "10m3", cant: 40, coords: { x: 60, y: 80 }, desc: "40x Cilindros 10m3", prio: "media" },
        { id: "PED-106", cliente: "Consultorio Norte", zona: "Norte", tipo: "Portatil", cant: 10, coords: { x: 30, y: 20 }, desc: "10x Portátiles", prio: "baja" },
        { id: "PED-107", cliente: "Particular - Juan", zona: "Sur", tipo: "6m3", cant: 10, coords: { x: 80, y: 20 }, desc: "10x Cilindros 6m3", prio: "baja" },
    ];

    // CÁLCULO DE PESO
    const getPesoPedido = (p) => {
        let unitWeight = 0;
        if (p.tipo === "10m3") unitWeight = configPuntos.peso10m3;
        if (p.tipo === "6m3") unitWeight = configPuntos.peso6m3;
        if (p.tipo === "Portatil") unitWeight = configPuntos.pesoPortatil;
        if (unitWeight === 0 && p.desc.includes("10m3")) unitWeight = configPuntos.peso10m3;
        return p.cant * unitWeight;
    };

    const pedidosFiltrados = useMemo(() => {
        if (filtroZona === 'Todas') return pedidosPendientes;
        return pedidosPendientes.filter(p => p.zona === filtroZona);
    }, [filtroZona, pedidosPendientes]);

    const toggleOrder = (id) => {
        if (selectedOrders.includes(id)) {
            setSelectedOrders(selectedOrders.filter(o => o !== id));
        } else {
            setSelectedOrders([...selectedOrders, id]);
        }
        setRutaGenerada(false);
        setRutaCalculada(null);
    };

    // LÓGICA DE CAPACIDAD
    const cargaTotal = selectedOrders.reduce((acc, id) => {
        const pedido = pedidosPendientes.find(p => p.id === id);
        return acc + getPesoPedido(pedido);
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
    const handleReportarAveria = (e, id) => {
        e.stopPropagation();
        if(confirm("¿Reportar falla mecánica? El vehículo quedará inactivo.")) {
            setVehiculos(vehiculos.map(v => v.id === id ? { ...v, estado: 'mantenimiento' } : v));
            if (selectedVehicle === id) setSelectedVehicle(null);
        }
    };

    const handleReportarBaja = (e, id) => {
        e.stopPropagation();
        if(confirm("¿Marcar conductor como NO DISPONIBLE (Baja Médica/Falta)?")) {
            setConductores(conductores.map(c => c.id === id ? { ...c, estado: 'Baja Médica' } : c));
            if (selectedDriver === id) {
                setSelectedDriver('');
                setRutaGenerada(false);
                alert("Conductor desvinculado.");
            }
        }
    };

    const handleGenerarRuta = () => {
        if (selectedOrders.length === 0) return alert("Seleccione pedidos");

        // Algoritmo "Nearest Neighbor"
        let nodosPendientes = pedidosPendientes.filter(p => selectedOrders.includes(p.id));
        let nodoActual = { x: 50, y: 50 }; // HUB CENTRAL
        let rutaOrdenada = [];
        let distanciaTotal = 0;

        while (nodosPendientes.length > 0) {
            nodosPendientes.sort((a, b) => {
                const distA = Math.sqrt(Math.pow(a.coords.x - nodoActual.x, 2) + Math.pow(a.coords.y - nodoActual.y, 2));
                const distB = Math.sqrt(Math.pow(b.coords.x - nodoActual.x, 2) + Math.pow(b.coords.y - nodoActual.y, 2));
                return distA - distB;
            });

            const siguiente = nodosPendientes.shift();
            const dist = Math.sqrt(Math.pow(siguiente.coords.x - nodoActual.x, 2) + Math.pow(siguiente.coords.y - nodoActual.y, 2));

            distanciaTotal += dist;
            rutaOrdenada.push({ ...siguiente });
            nodoActual = siguiente.coords;
        }

        // Retorno a base
        const distRetorno = Math.sqrt(Math.pow(50 - nodoActual.x, 2) + Math.pow(50 - nodoActual.y, 2));
        distanciaTotal += distRetorno;

        setRutaCalculada({
            pasos: rutaOrdenada,
            distanciaTotal: Math.round(distanciaTotal)
        });
        setRutaGenerada(true);
        alert(`Ruta Optimizada Generada (Distancia: ${Math.round(distanciaTotal)} u).\nItinerario creado.`);
    };

    const handleCapChange = (id, newVal) => {
        setVehiculos(vehiculos.map(v => v.id === id ? { ...v, cap: parseInt(newVal) || 0 } : v));
    };

    return (
        <div className="space-y-6 relative">
            {showConfig && <ConfigPanel config={configPuntos} setConfig={setConfigPuntos} onClose={() => setShowConfig(false)} />}

            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Planificador de Distribución</h2>
                    <p className="text-gray-500">Asignación de carga basada en volumen ($m^3$) y algoritmos de ruta.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={() => setShowConfig(true)}>
                        <Settings size={18} /> Config. Ponderación
                    </Button>
                    <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border shadow-sm">
                        <Calendar size={18} className="text-gray-500"/>
                        <span className="font-semibold text-gray-700">04 Dic, 2025</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                {/* COLUMNA IZQUIERDA (CONTROLES) */}
                <div className="lg:col-span-5 space-y-6">
                    {/* 1. VEHÍCULOS */}
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
                                        <div className="text-right" onClick={(e) => e.stopPropagation()}>
                                            <Badge variant={isAvailable ? "success" : "danger"}>{isAvailable ? "Disponible" : "Taller"}</Badge>
                                            <div className="mt-1 flex justify-end">
                                                {isEditingCap === v.id ? (
                                                    <input
                                                        type="number"
                                                        className="w-16 text-right text-xs border border-blue-400 rounded px-1"
                                                        autoFocus
                                                        value={v.cap}
                                                        onChange={(e) => handleCapChange(v.id, e.target.value)}
                                                        onBlur={() => setIsEditingCap(null)}
                                                    />
                                                ) : (
                                                    <span
                                                        className="text-xs font-bold text-gray-600 hover:text-blue-600 border-b border-dotted border-gray-400 cursor-text"
                                                        onClick={() => setIsEditingCap(v.id)}
                                                        title="Clic para editar capacidad"
                                                    >
                                                        Cap: {v.cap} pts
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                        {isAvailable && (
                                            <button onClick={(e) => handleReportarAveria(e, v.id)} className="absolute -top-2 -right-2 bg-white text-gray-400 hover:text-red-500 border shadow-sm rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity z-10" title="Reportar Avería">
                                                <Wrench size={12}/>
                                            </button>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </section>

                    {/* 2. CONDUCTORES */}
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
                                            {isLibre && (
                                                <button onClick={(e) => handleReportarBaja(e, c.id)} className="absolute top-1/2 -translate-y-1/2 right-[-10px] translate-x-full lg:translate-x-0 lg:right-2 p-1.5 bg-white border border-gray-200 shadow-sm rounded-full text-gray-400 hover:text-red-600 hover:border-red-300 opacity-0 group-hover:opacity-100 transition-opacity z-10" title="Marcar Baja">
                                                    <UserX size={14}/>
                                                </button>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </section>

                    {/* 3. CARGA */}
                    <section className="flex-1 flex flex-col">
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="font-bold text-gray-700 text-sm uppercase">3. Carga ({selectedOrders.length})</h3>
                            <div className="flex items-center gap-2">
                                <Filter size={14} className="text-gray-500"/>
                                <select className="text-xs border rounded p-1 bg-white" value={filtroZona} onChange={(e) => setFiltroZona(e.target.value)}>
                                    <option value="Todas">Todas Zonas</option>
                                    <option value="Norte">Norte</option>
                                    <option value="Centro">Centro</option>
                                    <option value="Sur">Sur</option>
                                </select>
                            </div>
                        </div>

                        <Card className="flex-1 flex flex-col overflow-hidden border-blue-200 shadow-sm">
                            <div className="max-h-60 overflow-y-auto">
                                <table className="w-full text-sm">
                                    <thead className="bg-gray-50 text-gray-500 sticky top-0">
                                    <tr><th className="p-2 w-8"><CheckSquare size={14}/></th><th className="p-2 text-left">Pedido / Ubicación</th><th className="p-2 text-right">Peso</th></tr>
                                    </thead>
                                    <tbody className="divide-y">
                                    {pedidosFiltrados.map(p => {
                                        const pesoCalc = getPesoPedido(p);
                                        return (
                                            <tr key={p.id}
                                                onClick={() => toggleOrder(p.id)}
                                                className={`hover:bg-blue-50 cursor-pointer transition-colors ${selectedOrders.includes(p.id) ? 'bg-blue-50' : ''}`}
                                            >
                                                <td className="p-2"><input type="checkbox" checked={selectedOrders.includes(p.id)} readOnly className="accent-blue-600"/></td>
                                                <td className="p-2">
                                                    <div className="font-bold text-xs">{p.cliente}</div>
                                                    <div className="text-[10px] text-gray-500 flex items-center gap-1">
                                                        <Navigation size={10}/> [{p.coords.x}, {p.coords.y}] {p.zona}
                                                    </div>
                                                </td>
                                                <td className="p-2 text-right font-mono text-xs font-bold">{pesoCalc}</td>
                                            </tr>
                                        );
                                    })}
                                    </tbody>
                                </table>
                            </div>

                            <div className="p-4 bg-slate-50 border-t border-slate-200">
                                <div className="flex justify-between items-center mb-1 text-xs font-bold">
                                    <span className="text-gray-500">OCUPACIÓN</span>
                                    <span className={capacidadExcedida ? "text-red-600" : "text-gray-700"}>
                                        {cargaTotal} / {vehiculoActual ? vehiculoActual.cap : '---'} pts
                                    </span>
                                </div>
                                <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                                    <div
                                        className={`h-full transition-all duration-500 ${barraColor}`}
                                        style={{ width: vehiculoActual ? `${porcentajeCarga}%` : '0%' }}
                                    ></div>
                                </div>
                                {capacidadExcedida && <p className="text-[10px] text-red-500 mt-1 font-bold text-center">¡CAPACIDAD EXCEDIDA!</p>}
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
                        {rutaGenerada ? "Ruta Calculada" : "Calcular Ruta Óptima"}
                    </Button>
                </div>

                {/* --- COLUMNA DERECHA: MAPA REALISTA (MEJORADO) --- */}
                <div className="lg:col-span-7">
                    <Card className="h-full min-h-[600px] flex flex-col bg-white">
                        <CardHeader className="border-b py-3 bg-gray-50">
                            <CardTitle className="text-sm flex justify-between items-center">
                                <span>Mapa de Ruta (Geoespacial)</span>
                                {rutaGenerada && <Badge variant="success">Algoritmo Finalizado</Badge>}
                            </CardTitle>
                        </CardHeader>

                        <div className="flex-1 bg-slate-900 relative overflow-hidden flex flex-col items-center justify-center p-4">
                            <div className="relative w-full max-w-md aspect-square bg-slate-800 rounded-xl border-4 border-slate-700 shadow-2xl">
                                {/* GRID DE FONDO (Estilo Plano Cartesiano) */}
                                <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'linear-gradient(#334155 1px, transparent 1px), linear-gradient(90deg, #334155 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

                                {/* CENTRAL (50, 50) */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 flex flex-col items-center">
                                    <div className="w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-lg shadow-blue-500/50 animate-pulse"></div>
                                    <span className="text-[10px] font-bold text-white mt-1 bg-black/50 px-1 rounded">OXIPUR</span>
                                </div>

                                {/* PUNTOS DE CLIENTES */}
                                {pedidosPendientes.map(p => {
                                    const isSelected = selectedOrders.includes(p.id);
                                    // Si hay ruta, ver si este punto es parte de ella y qué orden tiene
                                    const indexInRoute = rutaCalculada?.pasos.findIndex(paso => paso.id === p.id);

                                    return (
                                        <div key={p.id}
                                             className={`absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-500 z-20
                                                ${isSelected ? 'opacity-100' : 'opacity-30'}
                                            `}
                                             style={{ left: `${p.coords.x}%`, top: `${p.coords.y}%` }}
                                        >
                                            {/* PIN MARKER */}
                                            {isSelected ? (
                                                <div className="flex flex-col items-center">
                                                    <div className={`w-8 h-8 flex items-center justify-center -mb-1
                                                        ${indexInRoute !== undefined && indexInRoute >= 0 ? 'text-white' : 'text-yellow-400'}
                                                    `}>
                                                        <Map size={32} fill={indexInRoute !== undefined && indexInRoute >= 0 ? '#10b981' : '#facc15'} />
                                                        {indexInRoute !== undefined && indexInRoute >= 0 && (
                                                            <span className="absolute text-[10px] font-bold mt-[-4px] text-black">{indexInRoute + 1}</span>
                                                        )}
                                                    </div>
                                                    <span className="text-[8px] text-white bg-black/70 px-1 rounded whitespace-nowrap">{p.cliente}</span>
                                                </div>
                                            ) : (
                                                <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                                            )}
                                        </div>
                                    );
                                })}

                                {/* LÍNEA DE RUTA ESTILO GOOGLE MAPS */}
                                {rutaCalculada && (
                                    <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 100 100" preserveAspectRatio="none">
                                        {/* Sombra de la ruta (Glow) */}
                                        <polyline
                                            points={`50,50 ${rutaCalculada.pasos.map(step => `${step.coords.x},${step.coords.y}`).join(' ')} 50,50`}
                                            fill="none"
                                            stroke="#3b82f6"
                                            strokeWidth="3"
                                            strokeOpacity="0.3"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        {/* Línea Principal Azul Sólida */}
                                        <polyline
                                            points={`50,50 ${rutaCalculada.pasos.map(step => `${step.coords.x},${step.coords.y}`).join(' ')} 50,50`}
                                            fill="none"
                                            stroke="#3b82f6"
                                            strokeWidth="1"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="drop-shadow-md"
                                        />
                                    </svg>
                                )}
                            </div>
                        </div>

                        <div className="h-1/3 bg-white border-t p-0 overflow-y-auto">
                            {rutaCalculada ? (
                                <RouteTimeline paradas={[
                                    { id: 0, direccion: "Central OXIPUR", cliente: "Inicio de Ruta", estado: "completado", hora: "08:00 AM" },
                                    ...rutaCalculada.pasos.map((paso, i) => ({
                                        id: i + 1,
                                        direccion: `Coord: [${paso.coords.x}, ${paso.coords.y}] - ${paso.zona}`,
                                        cliente: paso.cliente,
                                        estado: "pendiente",
                                        hora: `+${Math.round(i * 30 + 30)} min`
                                    })),
                                    { id: 99, direccion: "Central OXIPUR", cliente: "Retorno a Base", estado: "pendiente", hora: "Fin" }
                                ]} />
                            ) : (
                                <div className="flex items-center justify-center h-full text-gray-400 text-sm italic">
                                    Seleccione pedidos y calcule la ruta para ver el itinerario.
                                </div>
                            )}
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Planificador;