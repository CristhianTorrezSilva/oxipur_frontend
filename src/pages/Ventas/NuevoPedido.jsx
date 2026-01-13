import React, { useState, useMemo } from 'react';
import {
    Save, FileText, Search, AlertTriangle, Plus,
    Trash2, ShoppingCart, MapPin, Calendar
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card.jsx';
import Input from '../../components/ui/Input.jsx';
import Button from '../../components/ui/Button.jsx';
import Alert from '../../components/ui/Alert.jsx';

// --- CONSTANTES Y LÓGICA DE NEGOCIO ---

const PRODUCT_CATALOG = {
    '6m3': { nombre: 'Cilindro T-6m3 (Medicinal)', precio: 150 },
    '10m3': { nombre: 'Cilindro T-10m3 (Industrial)', precio: 280 },
    'portatil': { nombre: 'Kit Portátil (Mochila)', precio: 450 }
};

const TAX_RATE = 0.13;

// --- SUB-COMPONENTES PARA LIMPIEZA VISUAL ---

const LocationDisplay = ({ coords }) => (
    <div className="mt-2 flex items-center justify-between text-xs bg-white border px-3 py-2 rounded animate-in fade-in">
        <span className="font-mono text-gray-600">
            PUNTO DE ENTREGA: <b>X:{coords.lat}</b> | <b>Y:{coords.lng}</b>
        </span>
        <span className="text-green-600 font-bold flex items-center gap-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            GPS Activo
        </span>
    </div>
);

// --- COMPONENTE PRINCIPAL ---

const NuevoPedido = () => {
    // 1. Estados del Formulario
    const [orderData, setOrderData] = useState({
        client: '',
        contact: '',
        fechaReserva: '',
        direccion: '',
        esUrgente: false,
        coordenadas: { lat: null, lng: null }
    });

    // 2. Estados del Carrito
    const [items, setItems] = useState([]);
    const [selection, setSelection] = useState({ producto: '', cantidad: 1 });

    // 3. Cálculos (Memos)
    const totals = useMemo(() => {
        const subtotal = items.reduce((acc, item) => acc + item.subtotal, 0);
        const tax = subtotal * TAX_RATE;
        return { subtotal, tax, total: subtotal }; // El total ya incluye la suma de subtotales
    }, [items]);

    // 4. Handlers
    const updateOrder = (field, value) => {
        setOrderData(prev => ({ ...prev, [field]: value }));
    };

    const handleGetGPS = () => {
        // Simulación de georeferencia para el mapa cartesiano
        const lat = Math.floor(Math.random() * 80) + 10;
        const lng = Math.floor(Math.random() * 80) + 10;

        setOrderData(prev => ({
            ...prev,
            coordenadas: { lat, lng },
            direccion: `Ubicación Detectada (Sector ${lat > 50 ? 'Norte' : 'Sur'})`
        }));
    };

    const handleAddItem = () => {
        const { producto, cantidad } = selection;
        if (!producto || cantidad <= 0) return alert("Selección inválida");

        const info = PRODUCT_CATALOG[producto];
        const newItem = {
            id: Date.now(),
            nombre: info.nombre,
            cantidad: parseInt(cantidad),
            precioUnit: info.precio,
            subtotal: info.precio * cantidad
        };

        setItems(prev => [...prev, newItem]);
        setSelection({ producto: '', cantidad: 1 }); // Reset selección
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { fechaReserva, coordenadas } = orderData;

        if (!fechaReserva) return alert("Falta fecha de reserva");
        if (!coordenadas.lat) return alert("Falta georeferenciación GPS");
        if (items.length === 0) return alert("El pedido está vacío");

        console.log("Despachando a Logística:", { ...orderData, items, total: totals.total });
        alert("Pedido registrado y enviado al Planificador de Rutas.");
    };

    return (
        <div className="space-y-6">
            <header>
                <h2 className="text-2xl font-bold text-gray-800">Nueva Orden de Oxígeno</h2>
                <p className="text-gray-500 text-sm">Registro centralizado con validación de georeferencia.</p>
            </header>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                <div className="lg:col-span-2 space-y-6">
                    {/* SECCIÓN 1: CLIENTE Y GPS */}
                    <Card className="border-slate-100">
                        <CardHeader>
                            <CardTitle className="text-sm uppercase text-slate-400 tracking-wider flex items-center gap-2">
                                <MapPin size={16} /> Localización y Reserva
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input label="Cliente / NIT" placeholder="Ej: Hospital Municipal" />
                                <div className="flex flex-col gap-1">
                                    <label className="text-xs font-bold text-slate-600">Fecha de Entrega</label>
                                    <input
                                        type="date"
                                        className="p-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500"
                                        value={orderData.fechaReserva}
                                        onChange={e => updateOrder('fechaReserva', e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="bg-slate-50 p-4 rounded-xl border border-dashed border-slate-300">
                                <label className="text-xs font-black text-slate-500 mb-2 block uppercase">Punto de Entrega (GPS Obligatorio)</label>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        readOnly
                                        placeholder="Haga clic en Detectar para georeferenciar"
                                        className="flex-1 p-2 text-sm bg-white border rounded-lg"
                                        value={orderData.direccion}
                                    />
                                    <Button type="button" variant="outline" onClick={handleGetGPS} className="bg-white">
                                        <MapPin size={16} className="mr-2 text-red-500"/> Detectar
                                    </Button>
                                </div>
                                {orderData.coordenadas.lat && <LocationDisplay coords={orderData.coordenadas} />}
                            </div>
                        </CardContent>
                    </Card>

                    {/* SECCIÓN 2: CARRITO */}
                    <Card className="shadow-xl shadow-slate-100 border-blue-50">
                        <CardHeader className="border-b border-slate-50">
                            <CardTitle className="flex items-center gap-2 text-blue-700">
                                <ShoppingCart size={20}/> Detalle del Pedido
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                            {/* Selector de Producto */}
                            <div className="flex flex-col md:flex-row gap-3 mb-6 items-end bg-blue-50/30 p-4 rounded-lg">
                                <div className="flex-1">
                                    <label className="text-[10px] font-bold text-blue-600 uppercase">Producto</label>
                                    <select
                                        className="w-full p-2 border rounded-lg bg-white text-sm"
                                        value={selection.producto}
                                        onChange={e => setSelection({...selection, producto: e.target.value})}
                                    >
                                        <option value="">Seleccionar...</option>
                                        {Object.entries(PRODUCT_CATALOG).map(([key, val]) => (
                                            <option key={key} value={key}>{val.nombre} - Bs. {val.precio}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="w-24">
                                    <Input
                                        label="Cant."
                                        type="number"
                                        value={selection.cantidad}
                                        onChange={e => setSelection({...selection, cantidad: e.target.value})}
                                    />
                                </div>
                                <Button type="button" onClick={handleAddItem} variant="primary">
                                    <Plus size={18}/>
                                </Button>
                            </div>

                            {/* Tabla de Items */}
                            <div className="border rounded-xl overflow-hidden">
                                <table className="w-full text-sm">
                                    <thead className="bg-slate-50 text-slate-400 text-[10px] uppercase">
                                    <tr>
                                        <th className="p-3">Item</th>
                                        <th className="p-3 text-center">Cant.</th>
                                        <th className="p-3 text-right">Subtotal</th>
                                        <th className="p-3 text-center"></th>
                                    </tr>
                                    </thead>
                                    <tbody className="divide-y">
                                    {items.map(item => (
                                        <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                                            <td className="p-3 font-medium">{item.nombre}</td>
                                            <td className="p-3 text-center font-bold text-slate-600">{item.cantidad}</td>
                                            <td className="p-3 text-right font-mono font-bold">Bs. {item.subtotal}</td>
                                            <td className="p-3 text-center">
                                                <button
                                                    type="button"
                                                    onClick={() => setItems(items.filter(i => i.id !== item.id))}
                                                    className="text-slate-300 hover:text-red-500 transition-colors"
                                                >
                                                    <Trash2 size={16}/>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* COLUMNA LATERAL: RESUMEN Y ACCIONES */}
                <aside className="space-y-6">
                    {/* Switch de Urgencia */}
                    <Card className={orderData.esUrgente ? "border-red-200 bg-red-50/30" : "border-slate-100"}>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <AlertTriangle size={18} className={orderData.esUrgente ? "text-red-500" : "text-slate-400"} />
                                    <span className="text-sm font-bold">Prioridad Crítica</span>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => updateOrder('esUrgente', !orderData.esUrgente)}
                                    className={`w-10 h-5 rounded-full transition-colors relative ${orderData.esUrgente ? 'bg-red-500' : 'bg-slate-200'}`}
                                >
                                    <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${orderData.esUrgente ? 'left-6' : 'left-1'}`} />
                                </button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Resumen de Costos */}
                    <Card className="bg-slate-900 text-white">
                        <CardHeader>
                            <CardTitle className="text-xs text-slate-400 uppercase">Resumen Económico</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-400">Subtotal:</span>
                                <span>Bs. {totals.subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-400">IVA (13%):</span>
                                <span>Bs. {totals.tax.toFixed(2)}</span>
                            </div>
                            <div className="pt-3 border-t border-slate-700 flex justify-between items-end">
                                <span className="text-xs font-bold text-blue-400 uppercase">Total a Pagar</span>
                                <span className="text-2xl font-black">Bs. {totals.total}</span>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="space-y-3">
                        <Button type="submit" variant="primary" className="w-full h-14 text-lg shadow-xl shadow-blue-200 group">
                            <Save size={20} className="mr-2 group-hover:scale-110 transition-transform"/> Finalizar Reserva
                        </Button>
                        <Button type="button" variant="outline" className="w-full text-slate-400">
                            Descartar Cambios
                        </Button>
                    </div>
                </aside>
            </form>
        </div>
    );
};

export default NuevoPedido;