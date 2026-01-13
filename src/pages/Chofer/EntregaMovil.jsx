import React, { useState } from 'react';
import { MapPin, Phone, CheckCircle, Clock, Navigation, Package, Camera } from 'lucide-react';
import { Card, CardContent } from '../../components/ui/Card';
import Button from '../../components/ui/Button';

// --- DATOS MOCK (Simulación de Backend) ---
const INITIAL_ROUTE = [
    {
        id: 101,
        cliente: 'Hospital Japonés',
        direccion: 'Av. Japón 3er Anillo',
        items: '5x Cilindros O2 (10m3)',
        estado: 'pendiente',
        lat: -17.76, lng: -63.18
    },
    {
        id: 102,
        cliente: 'Clínica Foianini',
        direccion: 'Av. Irala esq. Chuquisaca',
        items: '2x Kit Portátil',
        estado: 'pendiente',
        lat: -17.78, lng: -63.19
    },
    {
        id: 103,
        cliente: 'Consultorio Dr. Paz',
        direccion: 'Calle Warnes #450',
        items: '1x Cilindro O2 (6m3)',
        estado: 'completado',
        lat: -17.79, lng: -63.17
    }
];

// --- SUB-COMPONENTES (Para mantener el código limpio) ---

const StatusBadge = ({ estado }) => {
    const styles = {
        pendiente: "bg-yellow-100 text-yellow-700 border-yellow-200",
        completado: "bg-green-100 text-green-700 border-green-200"
    };

    return (
        <span className={`px-2 py-1 rounded-full text-xs font-bold border ${styles[estado] || styles.pendiente} uppercase tracking-wide flex items-center gap-1 w-fit`}>
            {estado === 'completado' ? <CheckCircle size={12}/> : <Clock size={12}/>}
            {estado}
        </span>
    );
};

const OrderCard = ({ pedido, onEntregar }) => (
    <Card className="mb-4 border-l-4 border-l-blue-500 shadow-sm hover:shadow-md transition-shadow">
        <CardContent className="p-5">
            <div className="flex justify-between items-start mb-3">
                <div>
                    <h3 className="font-bold text-gray-800 text-lg">{pedido.cliente}</h3>
                    <p className="text-gray-500 text-sm flex items-center gap-1">
                        <MapPin size={14} className="text-blue-500"/> {pedido.direccion}
                    </p>
                </div>
                <StatusBadge estado={pedido.estado} />
            </div>

            <div className="bg-slate-50 p-3 rounded-lg mb-4 border border-slate-100">
                <div className="flex items-center gap-2 text-sm text-gray-700 font-medium">
                    <Package size={16} className="text-slate-400"/>
                    {pedido.items}
                </div>
            </div>

            {pedido.estado === 'pendiente' && (
                <div className="grid grid-cols-2 gap-3">
                    <Button variant="outline" className="text-xs h-10 border-blue-200 text-blue-700 hover:bg-blue-50">
                        <Navigation size={16} className="mr-2"/> GPS
                    </Button>
                    <Button
                        onClick={() => onEntregar(pedido.id)}
                        className="text-xs h-10 bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200"
                    >
                        <CheckCircle size={16} className="mr-2"/> Confirmar
                    </Button>
                </div>
            )}

            {pedido.estado === 'completado' && (
                <div className="w-full bg-green-50 text-green-700 text-center py-2 rounded text-xs font-bold border border-green-100">
                    Entrega Validada Digitalmente
                </div>
            )}
        </CardContent>
    </Card>
);

// --- COMPONENTE PRINCIPAL ---

const EntregaMovil = () => {
    const [pedidos, setPedidos] = useState(INITIAL_ROUTE);
    const [tab, setTab] = useState('ruta'); // 'ruta' | 'historial'

    // Lógica de negocio: Cambio de estado con validación simulada
    const handleConfirmarEntrega = (id) => {
        if (!window.confirm("¿Confirmar entrega en ubicación actual? \n(Se registrarán coordenadas GPS)")) return;

        setPedidos(prev => prev.map(p =>
            p.id === id ? { ...p, estado: 'completado' } : p
        ));
    };

    // Filtros derivados (Clean Code: Evitar múltiples estados para listas)
    const pendientes = pedidos.filter(p => p.estado === 'pendiente');
    const completados = pedidos.filter(p => p.estado === 'completado');

    return (
        <div className="min-h-screen bg-slate-100 pb-20">
            {/* Header Móvil */}
            <div className="bg-blue-700 text-white p-6 rounded-b-[2rem] shadow-xl relative overflow-hidden">
                <div className="relative z-10">
                    <h1 className="text-2xl font-bold">Ruta #405</h1>
                    <p className="text-blue-200 text-sm">Chofer: Juan Pérez | Camión: Nissan Cóndor</p>

                    <div className="mt-4 flex gap-4 text-sm font-medium">
                        <div className="bg-white/10 px-3 py-1 rounded-lg backdrop-blur-sm">
                            📦 {pendientes.length} Pendientes
                        </div>
                        <div className="bg-white/10 px-3 py-1 rounded-lg backdrop-blur-sm">
                            ✅ {completados.length} Listos
                        </div>
                    </div>
                </div>
                {/* Decoración de fondo */}
                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
            </div>

            {/* Contenedor Principal */}
            <div className="p-4 -mt-6">

                {/* Tabs de Navegación */}
                <div className="flex bg-white rounded-xl p-1 shadow-md mb-6">
                    <button
                        onClick={() => setTab('ruta')}
                        className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${tab === 'ruta' ? 'bg-blue-100 text-blue-700 shadow-sm' : 'text-gray-400'}`}
                    >
                        Ruta Activa
                    </button>
                    <button
                        onClick={() => setTab('historial')}
                        className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${tab === 'historial' ? 'bg-blue-100 text-blue-700 shadow-sm' : 'text-gray-400'}`}
                    >
                        Historial
                    </button>
                </div>

                {/* Lista de Pedidos */}
                <div className="space-y-4 animate-in slide-in-from-bottom-4 duration-500">
                    {tab === 'ruta' ? (
                        pendientes.length > 0 ? (
                            pendientes.map(pedido => (
                                <OrderCard key={pedido.id} pedido={pedido} onEntregar={handleConfirmarEntrega} />
                            ))
                        ) : (
                            <div className="text-center py-10 text-gray-400">
                                <CheckCircle size={48} className="mx-auto mb-2 text-green-400 opacity-50"/>
                                <p>¡Ruta completada con éxito!</p>
                            </div>
                        )
                    ) : (
                        completados.map(pedido => (
                            <OrderCard key={pedido.id} pedido={pedido} />
                        ))
                    )}
                </div>
            </div>

            {/* Botón Flotante SOS (Detalle de seguridad) */}
            <button className="fixed bottom-4 right-4 bg-red-600 text-white p-4 rounded-full shadow-lg hover:bg-red-700 transition-colors z-50">
                <Phone size={24} />
            </button>
        </div>
    );
};

export default EntregaMovil;