import React, { useState, useMemo } from 'react';
import {
    Settings, User, Truck, Navigation, Flag,
    Wrench, UserX, UserCheck, Zap, Calendar, X
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import RouteTimeline from '../../components/logistic/RouteTimeline';

// --- UTILS: LÓGICA DE NEGOCIO ---

const INITIAL_WEIGHT_CONFIG = {
    peso10m3: 40,
    peso6m3: 25,
    pesoPortatil: 10
};

const calculateOrderWeight = (order, config) => {
    const weights = {
        '10m3': config.peso10m3,
        '6m3': config.peso6m3,
        'Portatil': config.pesoPortatil
    };
    const unitWeight = weights[order.tipo] || 0;
    return order.cant * unitWeight;
};

// Algoritmo Nearest Neighbor
const optimizeRoute = (selectedIds, allOrders, hubCoords = { x: 50, y: 50 }) => {
    let pending = allOrders.filter(p => selectedIds.includes(p.id));
    let currentPos = hubCoords;
    let orderedRoute = [];
    let totalDistance = 0;

    while (pending.length > 0) {
        pending.sort((a, b) => {
            const distA = Math.hypot(a.coords.x - currentPos.x, a.coords.y - currentPos.y);
            const distB = Math.hypot(b.coords.x - currentPos.x, b.coords.y - currentPos.y);
            return distA - distB;
        });

        const next = pending.shift();
        totalDistance += Math.hypot(next.coords.x - currentPos.x, next.coords.y - currentPos.y);
        orderedRoute.push(next);
        currentPos = next.coords;
    }
    totalDistance += Math.hypot(hubCoords.x - currentPos.x, hubCoords.y - currentPos.y);
    return { steps: orderedRoute, distance: Math.round(totalDistance) };
};

// --- SUB-COMPONENTES ---

const ConfigModal = ({ config, onSave, onClose }) => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm animate-in fade-in">
        <Card className="w-96 border-blue-200 shadow-2xl">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-md flex items-center gap-2"><Settings size={18}/> Configuración</CardTitle>
                <button onClick={onClose}><X size={18} className="text-gray-400 hover:text-red-500"/></button>
            </CardHeader>
            <CardContent className="space-y-4">
                {Object.keys(config).map(key => (
                    <div key={key} className="flex justify-between items-center">
                        <label className="text-sm capitalize">{key.replace('peso', 'Peso ')}</label>
                        <input
                            type="number"
                            className="w-20 p-1 border rounded text-right"
                            value={config[key]}
                            onChange={(e) => onSave(key, e.target.value)}
                        />
                    </div>
                ))}
                <Button variant="primary" className="w-full mt-4" onClick={onClose}>Aplicar</Button>
            </CardContent>
        </Card>
    </div>
);

// --- COMPONENTE PRINCIPAL ---

const Planificador = () => {
    // 1. Estados de Datos
    const [vehiculos, setVehiculos] = useState([
        { id: 1, placa: "2344-XTR", cap: 1000, modelo: "Nissan Atlas", estado: "disponible" },
        { id: 2, placa: "4055-BBN", cap: 2500, modelo: "Volvo FH", estado: "disponible" },
        { id: 3, placa: "1099-LPO", cap: 800, modelo: "Suzuki Carry", estado: "mantenimiento" },
    ]);

    const [conductores, setConductores] = useState([
        { id: 'C01', nombre: 'Juan Pérez', estado: 'Libre' },
        { id: 'C02', nombre: 'Carlos Mamani', estado: 'Libre' },
        { id: 'C03', nombre: 'Roberto Gomez', estado: 'Baja Médica' }, // Ejemplo inicial
    ]);

    const [pedidos] = useState([
        { id: "PED-999", cliente: "Farmacia 24h", zona: "Norte", tipo: "10m3", cant: 5, coords: { x: 20, y: 30 } },
        { id: "PED-104", cliente: "Clínica Incor", zona: "Norte", tipo: "10m3", cant: 20, coords: { x: 30, y: 60 } },
        { id: "PED-105", cliente: "Hospital Obrero", zona: "Centro", tipo: "10m3", cant: 40, coords: { x: 60, y: 80 } },
        { id: "PED-106", cliente: "Consultorio Norte", zona: "Norte", tipo: "Portatil", cant: 10, coords: { x: 30, y: 20 } },
        { id: "PED-107", cliente: "Particular - Juan", zona: "Sur", tipo: "6m3", cant: 10, coords: { x: 80, y: 20 } },
    ]);

    // 2. Estados de Selección y UI
    const [selectedVehicleId, setSelectedVehicleId] = useState(null);
    const [selectedDriverId, setSelectedDriverId] = useState('');
    const [selectedOrderIds, setSelectedOrderIds] = useState([]);
    const [filterZone, setFilterZone] = useState('Todas');
    const [weightConfig, setWeightConfig] = useState(INITIAL_WEIGHT_CONFIG);
    const [showConfig, setShowConfig] = useState(false);
    const [calculatedRoute, setCalculatedRoute] = useState(null);

    // 3. Memos
    const filteredOrders = useMemo(() =>
            filterZone === 'Todas' ? pedidos : pedidos.filter(p => p.zona === filterZone)
        , [filterZone, pedidos]);

    const totalWeight = useMemo(() =>
            selectedOrderIds.reduce((acc, id) => {
                const order = pedidos.find(p => p.id === id);
                return acc + calculateOrderWeight(order, weightConfig);
            }, 0)
        , [selectedOrderIds, pedidos, weightConfig]);

    const currentVehicle = vehiculos.find(v => v.id === selectedVehicleId);
    const isOverCapacity = currentVehicle && totalWeight > currentVehicle.cap;

    // 4. Handlers de Acción
    const handleToggleOrder = (id) => {
        setSelectedOrderIds(prev => prev.includes(id) ? prev.filter(oid => oid !== id) : [...prev, id]);
        setCalculatedRoute(null);
    };

    const handleGenerateRoute = () => {
        const result = optimizeRoute(selectedOrderIds, pedidos);
        setCalculatedRoute(result);
        alert(`Ruta optimizada: ${result.distance} unidades de distancia.`);
    };

    const handleVehicleMaintenance = (e, id) => {
        e.stopPropagation();
        if(confirm("¿Cambiar estado de mantenimiento del vehículo?")) {
            setVehiculos(prev => prev.map(v =>
                v.id === id ? {...v, estado: v.estado === 'disponible' ? 'mantenimiento' : 'disponible'} : v
            ));
            if(selectedVehicleId === id) setSelectedVehicleId(null);
        }
    };

    // --- NUEVO: GESTIÓN DE ESTADO DEL CONDUCTOR ---
    const handleToggleDriverStatus = (e, id) => {
        e.stopPropagation();

        // Lógica de cambio de estado
        setConductores(prev => prev.map(c => {
            if (c.id === id) {
                const isAvailable = c.estado === 'Libre';
                return { ...c, estado: isAvailable ? 'Baja Médica' : 'Libre' };
            }
            return c;
        }));

        // Si el conductor seleccionado pasa a NO disponible, lo deseleccionamos
        if (selectedDriverId === id) {
            setSelectedDriverId('');
        }
    };

    return (
        <div className="space-y-6">
            {showConfig && (
                <ConfigModal
                    config={weightConfig}
                    onSave={(k, v) => setWeightConfig({...weightConfig, [k]: Number(v)})}
                    onClose={() => setShowConfig(false)}
                />
            )}

            <div className="flex justify-between items-center">
                <header>
                    <h2 className="text-2xl font-bold text-gray-800">Planificador Logístico</h2>
                    <p className="text-gray-500 text-sm italic">Optimización de carga y rutas mediante Nearest Neighbor.</p>
                </header>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={() => setShowConfig(true)}><Settings size={18} /> Configurar Pesos</Button>
                    <div className="bg-white border px-4 py-2 rounded-lg shadow-sm flex items-center gap-2">
                        <Calendar size={18} className="text-blue-500"/>
                        <span className="font-mono text-sm">2026-01-13</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                {/* --- PANEL IZQUIERDO --- */}
                <aside className="lg:col-span-5 space-y-6">

                    {/* 1. VEHÍCULOS */}
                    <section className="space-y-3">
                        <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">1. Selección de Transporte</h3>
                        {vehiculos.map(v => (
                            <div
                                key={v.id}
                                onClick={() => v.estado === 'disponible' && setSelectedVehicleId(v.id)}
                                className={`p-3 rounded-xl border transition-all cursor-pointer flex justify-between items-center group
                                    ${selectedVehicleId === v.id ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200' : 'bg-white border-gray-100 hover:border-blue-200'}
                                    ${v.estado !== 'disponible' ? 'opacity-60 bg-gray-50 cursor-not-allowed' : ''}
                                `}
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`p-2 rounded-lg ${v.estado === 'disponible' ? 'bg-slate-100 text-slate-600' : 'bg-red-50 text-red-400'}`}>
                                        <Truck size={20}/>
                                    </div>
                                    <div>
                                        <p className="font-bold text-sm text-gray-700">{v.modelo}</p>
                                        <p className="text-[10px] font-mono text-gray-400">{v.placa} | Cap: {v.cap}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Badge variant={v.estado === 'disponible' ? 'success' : 'danger'}>{v.estado}</Badge>
                                    <button onClick={(e) => handleVehicleMaintenance(e, v.id)} className="text-gray-300 hover:text-orange-500 transition-colors" title="Cambiar Estado">
                                        <Wrench size={16}/>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </section>

                    {/* 2. CONDUCTORES (ACTUALIZADO CON BAJA MÉDICA) */}
                    <section className="space-y-3">
                        <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">2. Asignación de Personal</h3>
                        <div className="grid grid-cols-1 gap-2 bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
                            {conductores.map(c => {
                                const isAvailable = c.estado === 'Libre';
                                return (
                                    <div key={c.id} className="flex items-center gap-2">
                                        <button
                                            disabled={!isAvailable}
                                            onClick={() => setSelectedDriverId(c.id)}
                                            className={`flex-1 flex items-center justify-between p-2 rounded-lg border text-xs transition-all text-left
                                                ${selectedDriverId === c.id ? 'bg-blue-600 border-blue-600 text-white shadow-md' : 'bg-white border-gray-100 text-gray-600 hover:bg-gray-50'}
                                                ${!isAvailable ? 'opacity-50 bg-gray-50 cursor-not-allowed border-dashed' : ''}
                                            `}
                                        >
                                            <div className="flex items-center gap-2">
                                                <User size={16}/>
                                                <span className={!isAvailable ? 'line-through decoration-red-500' : ''}>{c.nombre}</span>
                                            </div>
                                            <span className={`font-bold text-[10px] uppercase px-1.5 py-0.5 rounded ${isAvailable ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                {c.estado}
                                            </span>
                                        </button>

                                        {/* Botón de cambio de estado (Baja / Alta) */}
                                        <button
                                            onClick={(e) => handleToggleDriverStatus(e, c.id)}
                                            className={`p-2 rounded-lg border transition-colors ${isAvailable ? 'text-gray-400 border-transparent hover:text-red-500 hover:bg-red-50' : 'text-green-600 bg-green-50 border-green-200 hover:bg-green-100'}`}
                                            title={isAvailable ? "Marcar Baja Médica / Ausencia" : "Dar de Alta / Disponible"}
                                        >
                                            {isAvailable ? <UserX size={16}/> : <UserCheck size={16}/>}
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    </section>

                    {/* 3. CARGA */}
                    <section className="space-y-3">
                        <div className="flex justify-between items-end">
                            <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">3. Consolidación de Pedidos</h3>
                            <select className="text-[10px] border rounded bg-white px-2 py-1" value={filterZone} onChange={e => setFilterZone(e.target.value)}>
                                <option>Todas</option><option>Norte</option><option>Centro</option><option>Sur</option>
                            </select>
                        </div>
                        <Card className="border-gray-100 shadow-sm overflow-hidden">
                            <div className="max-h-48 overflow-y-auto border-b">
                                <table className="w-full text-[11px] text-left">
                                    <thead className="bg-gray-50 sticky top-0 text-gray-400 font-bold uppercase">
                                    <tr><th className="p-2 w-10"></th><th className="p-2">Cliente</th><th className="p-2 text-right">Peso</th></tr>
                                    </thead>
                                    <tbody className="divide-y">
                                    {filteredOrders.map(p => (
                                        <tr key={p.id} onClick={() => handleToggleOrder(p.id)} className={`cursor-pointer hover:bg-slate-50 ${selectedOrderIds.includes(p.id) ? 'bg-blue-50/50' : ''}`}>
                                            <td className="p-2 text-center"><input type="checkbox" checked={selectedOrderIds.includes(p.id)} readOnly className="accent-blue-500"/></td>
                                            <td className="p-2"><p className="font-bold">{p.cliente}</p><p className="text-[9px] text-gray-400">{p.zona}</p></td>
                                            <td className="p-2 text-right font-mono font-bold text-blue-600">{calculateOrderWeight(p, weightConfig)}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="p-3 bg-slate-50">
                                <div className="flex justify-between text-[10px] font-bold mb-1">
                                    <span className="text-gray-400 uppercase">Progreso de Carga</span>
                                    <span className={isOverCapacity ? "text-red-500" : "text-blue-700"}>
                                        {totalWeight} / {currentVehicle?.cap || 0} pts
                                    </span>
                                </div>
                                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                                    <div
                                        className={`h-full transition-all duration-700 ${isOverCapacity ? 'bg-red-500' : 'bg-blue-500'}`}
                                        style={{ width: `${Math.min((totalWeight / (currentVehicle?.cap || 1)) * 100, 100)}%` }}
                                    ></div>
                                </div>
                            </div>
                        </Card>
                    </section>

                    <Button
                        className="w-full h-12 shadow-xl shadow-blue-100 group"
                        variant="primary"
                        onClick={handleGenerateRoute}
                        disabled={!selectedVehicleId || !selectedDriverId || selectedOrderIds.length === 0 || isOverCapacity}
                    >
                        <Zap size={20} className="group-hover:animate-bounce"/> Calcular Despacho Óptimo
                    </Button>
                </aside>

                {/* --- PANEL DERECHO (MAPA) --- */}
                <main className="lg:col-span-7 space-y-4">
                    <Card className="h-full border-gray-100 flex flex-col min-h-[650px] overflow-hidden">
                        <CardHeader className="bg-gray-50 border-b py-3">
                            <CardTitle className="text-xs text-gray-400 flex items-center justify-between uppercase tracking-tighter">
                                Monitor de Ruta en Tiempo Real
                                {calculatedRoute && <span className="text-green-600 flex items-center gap-1"><div className="w-2 h-2 bg-green-500 rounded-full animate-ping"/> Online</span>}
                            </CardTitle>
                        </CardHeader>

                        <div className="flex-1 bg-slate-900 relative p-6 flex items-center justify-center">
                            <div className="relative w-full aspect-square max-w-lg bg-slate-800 rounded-2xl border-[10px] border-slate-700 shadow-inner overflow-hidden">
                                {/* Grid */}
                                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '25px 25px' }}></div>

                                {/* HUB */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
                                    <div className="w-6 h-6 bg-blue-500 rounded-lg border-2 border-white flex items-center justify-center shadow-lg shadow-blue-500/40">
                                        <Flag size={12} className="text-white"/>
                                    </div>
                                </div>

                                {/* RUTAS SVG */}
                                <svg className="absolute inset-0 w-full h-full z-10" viewBox="0 0 100 100" preserveAspectRatio="none">
                                    {calculatedRoute && (
                                        <polyline
                                            points={`50,50 ${calculatedRoute.steps.map(s => `${s.coords.x},${s.coords.y}`).join(' ')} 50,50`}
                                            fill="none" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="4 2" className="animate-[dash_20s_linear_infinite]"
                                        />
                                    )}
                                </svg>

                                {/* PINS */}
                                {pedidos.map(p => {
                                    const isSelected = selectedOrderIds.includes(p.id);
                                    const stepIdx = calculatedRoute?.steps.findIndex(s => s.id === p.id);
                                    if (!isSelected && !calculatedRoute) return null;

                                    return (
                                        <div
                                            key={p.id}
                                            className={`absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-500 z-20 ${isSelected ? 'scale-110' : 'opacity-20 scale-75'}`}
                                            style={{ left: `${p.coords.x}%`, top: `${p.coords.y}%` }}
                                        >
                                            <div className="flex flex-col items-center">
                                                <div className={`p-1.5 rounded-full border-2 shadow-xl ${stepIdx >= 0 ? 'bg-green-500 border-white' : 'bg-slate-600 border-slate-400'}`}>
                                                    <Navigation size={12} className="text-white fill-white"/>
                                                </div>
                                                {stepIdx >= 0 && <span className="mt-1 bg-green-600 text-[8px] font-bold text-white px-1.5 rounded-full">#{stepIdx + 1}</span>}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="h-48 border-t overflow-y-auto bg-white p-2">
                            {calculatedRoute ? (
                                <RouteTimeline paradas={[
                                    { id: 'S', cliente: 'Base Central', direccion: 'Hub Oxipur', hora: 'Inicio', estado: 'completado' },
                                    ...calculatedRoute.steps.map((s, i) => ({
                                        id: s.id, cliente: s.cliente, direccion: s.zona, hora: `Punto ${i+1}`, estado: 'pendiente'
                                    }))
                                ]} />
                            ) : (
                                <div className="h-full flex items-center justify-center text-gray-300 text-xs italic">
                                    Esperando definición de ruta...
                                </div>
                            )}
                        </div>
                    </Card>
                </main>
            </div>
        </div>
    );
};

export default Planificador;