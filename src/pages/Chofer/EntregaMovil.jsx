import React, { useState } from 'react';
import { Navigation, MapPin, Package, RefreshCw, CheckCircle, Camera, ChevronRight, AlertTriangle, XCircle } from 'lucide-react';
import Button from '../../components/ui/Button';

const EntregaMovil = () => {
    const [paso, setPaso] = useState('ruta'); // 'ruta', 'formulario', 'incidencia', 'completado'
    const [firmado, setFirmado] = useState(false);
    const [cantEntregada, setCantEntregada] = useState(5);
    const [cantRecogida, setCantRecogida] = useState(5);

    const handleFinalizar = () => {
        if (!firmado) return alert("Falta la firma del cliente");
        setPaso('completado');
    };

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center">
            <div className="w-full max-w-md bg-white min-h-screen shadow-xl flex flex-col">

                {/* Header App Móvil */}
                <div className={`p-4 pt-8 flex justify-between items-center shadow-md text-white transition-colors ${paso === 'incidencia' ? 'bg-red-600' : 'bg-blue-700'}`}>
                    <div>
                        <h1 className="font-bold text-lg">{paso === 'incidencia' ? 'Reportar Problema' : 'Ruta #234'}</h1>
                        <p className="text-xs opacity-80">Camión: 2344-XTR</p>
                    </div>
                    <div className="text-right">
                        <div className="text-2xl font-bold">08:45</div>
                    </div>
                </div>

                <div className="flex-1 p-4 flex flex-col">

                    {/* VISTA 1: NAVEGACIÓN */}
                    {paso === 'ruta' && (
                        <div className="space-y-6">
                            <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 shadow-sm">
                                <p className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-2">Próxima Parada</p>
                                <h2 className="text-2xl font-bold text-gray-800 leading-tight mb-2">Clínica Incor</h2>
                                <div className="flex items-start gap-2 text-gray-600 mb-4">
                                    <MapPin size={18} /> <p>Av. Banzer y 4to Anillo</p>
                                </div>
                                <div className="flex gap-3">
                                    <Button variant="outline" className="flex-1 bg-white text-blue-700"><Navigation size={18} /> Waze</Button>
                                </div>
                            </div>

                            <div className="flex-1"></div>

                            <div className="space-y-3">
                                <Button onClick={() => setPaso('formulario')} className="w-full py-4 text-lg bg-green-600 hover:bg-green-700 shadow-lg">
                                    Llegué al destino
                                </Button>
                                {/* BOTÓN CASO DE USO 29: INCIDENCIA */}
                                <Button onClick={() => setPaso('incidencia')} variant="danger" className="w-full py-3 bg-red-100 text-red-700 border-red-200 hover:bg-red-200">
                                    <AlertTriangle size={18}/> Reportar Incidencia
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* VISTA 2: FORMULARIO ENTREGA (Normal) */}
                    {paso === 'formulario' && (
                        <div className="space-y-6">
                            <h2 className="text-xl font-bold text-gray-800 text-center">Registro de Entrega</h2>

                            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                                <label className="flex items-center gap-2 font-bold text-green-800 mb-4"><Package size={20}/> Entregados</label>
                                <div className="flex items-center justify-between bg-white rounded-lg p-2 border shadow-sm">
                                    <button onClick={() => setCantEntregada(c => Math.max(0, c-1))} className="w-12 h-12 bg-gray-100 text-2xl font-bold">-</button>
                                    <span className="text-3xl font-bold">{cantEntregada}</span>
                                    <button onClick={() => setCantEntregada(c => c+1)} className="w-12 h-12 bg-green-100 text-green-600 text-2xl font-bold">+</button>
                                </div>
                            </div>

                            <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
                                <label className="flex items-center gap-2 font-bold text-orange-800 mb-4"><RefreshCw size={20}/> Recogidos (Vacíos)</label>
                                <div className="flex items-center justify-between bg-white rounded-lg p-2 border shadow-sm">
                                    <button onClick={() => setCantRecogida(c => Math.max(0, c-1))} className="w-12 h-12 bg-gray-100 text-2xl font-bold">-</button>
                                    <span className="text-3xl font-bold">{cantRecogida}</span>
                                    <button onClick={() => setCantRecogida(c => c+1)} className="w-12 h-12 bg-orange-100 text-orange-600 text-2xl font-bold">+</button>
                                </div>
                            </div>

                            <div onClick={() => setFirmado(true)} className={`h-24 rounded-lg border-2 border-dashed flex items-center justify-center cursor-pointer ${firmado ? 'bg-blue-50 border-blue-500' : 'bg-gray-50'}`}>
                                {firmado ? <span className="text-blue-600 font-script text-2xl">Juan Perez</span> : <span className="text-gray-400">Toque para firmar</span>}
                            </div>

                            <Button onClick={handleFinalizar} disabled={!firmado} variant={firmado ? 'primary' : 'secondary'} className="w-full py-4 text-lg">Confirmar Entrega</Button>
                            <button onClick={() => setPaso('ruta')} className="w-full text-center text-gray-500 text-sm p-2">Cancelar</button>
                        </div>
                    )}

                    {/* VISTA 3: REGISTRAR INCIDENCIA (CU 29) */}
                    {paso === 'incidencia' && (
                        <div className="space-y-4">
                            <h3 className="font-bold text-red-700 text-lg">Seleccione el motivo:</h3>
                            {['Cliente Cerrado', 'Dirección Incorrecta', 'Acceso Bloqueado', 'Cliente Rechaza Pedido', 'Falla Mecánica'].map(motivo => (
                                <button key={motivo} onClick={() => { alert(`Incidencia registrada: ${motivo}`); setPaso('ruta'); }}
                                        className="w-full p-4 bg-white border border-gray-200 rounded-xl text-left font-semibold text-gray-700 hover:bg-red-50 hover:border-red-300 flex justify-between items-center shadow-sm">
                                    {motivo} <ChevronRight size={20} className="text-gray-400"/>
                                </button>
                            ))}
                            <Button onClick={() => setPaso('ruta')} variant="secondary" className="w-full mt-4">Volver</Button>
                        </div>
                    )}

                    {/* VISTA 4: COMPLETADO */}
                    {paso === 'completado' && (
                        <div className="flex flex-col items-center justify-center h-full space-y-8">
                            <CheckCircle size={80} className="text-green-500" />
                            <h2 className="text-2xl font-bold text-gray-800">¡Entrega Exitosa!</h2>
                            <Button onClick={() => { setPaso('ruta'); setFirmado(false); }} variant="primary" className="w-full py-4 text-lg">Siguiente Parada</Button>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default EntregaMovil;