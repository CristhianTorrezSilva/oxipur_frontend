import React, { useState } from 'react';
import { Navigation, MapPin, Package, RefreshCw, CheckCircle, Camera, ChevronRight, AlertTriangle, XCircle, ArrowLeft } from 'lucide-react';
import Button from '../../components/ui/Button';

const EntregaMovil = () => {
    const [paso, setPaso] = useState('ruta'); // 'ruta', 'formulario', 'incidencia', 'detalle_incidencia', 'completado'
    const [firmado, setFirmado] = useState(false);
    const [cantEntregada, setCantEntregada] = useState(5);
    const [cantRecogida, setCantRecogida] = useState(5);

    // ESTADOS PARA INCIDENCIA (Caso de Uso 29)
    const [motivoIncidencia, setMotivoIncidencia] = useState('');
    const [fotoEvidencia, setFotoEvidencia] = useState(false);

    const handleFinalizar = () => {
        if (!firmado) return alert("Falta la firma del cliente");
        setPaso('completado');
    };

    const handleSeleccionarMotivo = (motivo) => {
        setMotivoIncidencia(motivo);
        setPaso('detalle_incidencia'); // Vamos al paso de evidencia
    };

    const handleConfirmarIncidencia = () => {
        if (!fotoEvidencia) return alert("Debe adjuntar evidencia fotográfica (Requisito del Sistema).");
        alert(`INCIDENCIA REGISTRADA.\n\nMotivo: ${motivoIncidencia}\nEvidencia: Adjunta\nEstado: Alerta enviada a Logística y Ventas.`);
        setPaso('ruta');
        setFotoEvidencia(false);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center font-sans">
            <div className="w-full max-w-md bg-white min-h-screen shadow-xl flex flex-col">

                {/* Header App Móvil */}
                <div className={`p-4 pt-8 flex justify-between items-center shadow-md text-white transition-colors ${paso.includes('incidencia') ? 'bg-red-600' : 'bg-blue-700'}`}>
                    <div>
                        <h1 className="font-bold text-lg">
                            {paso === 'ruta' ? 'Ruta #234' :
                                paso === 'formulario' ? 'Entrega en Curso' :
                                    'Reportar Problema'}
                        </h1>
                        <p className="text-xs opacity-80">Camión: 2344-XTR</p>
                    </div>
                    <div className="text-right">
                        <div className="text-2xl font-bold">09:15</div>
                    </div>
                </div>

                <div className="flex-1 p-4 flex flex-col overflow-y-auto">

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
                                    <Button variant="outline" className="flex-1 bg-white text-blue-700 border-blue-200"><Navigation size={18} /> Waze</Button>
                                </div>
                            </div>

                            <div className="flex-1"></div>

                            <div className="space-y-3 mt-auto">
                                <Button onClick={() => setPaso('formulario')} className="w-full py-4 text-lg bg-green-600 hover:bg-green-700 shadow-lg">
                                    Llegué al destino
                                </Button>
                                {/* BOTÓN CASO DE USO 29: INCIDENCIA */}
                                <Button onClick={() => setPaso('incidencia')} variant="danger" className="w-full py-3 bg-red-50 text-red-700 border border-red-200 hover:bg-red-100">
                                    <AlertTriangle size={18}/> No se pudo entregar
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* VISTA 2: FORMULARIO ENTREGA (Flujo Feliz) */}
                    {paso === 'formulario' && (
                        <div className="space-y-6">
                            <Button variant="ghost" onClick={() => setPaso('ruta')} className="text-gray-500 pl-0"><ArrowLeft size={16}/> Volver</Button>

                            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                                <label className="flex items-center gap-2 font-bold text-green-800 mb-4"><Package size={20}/> Entregados</label>
                                <div className="flex items-center justify-between bg-white rounded-lg p-2 border shadow-sm">
                                    <button onClick={() => setCantEntregada(c => Math.max(0, c-1))} className="w-12 h-12 bg-gray-100 text-2xl font-bold rounded">-</button>
                                    <span className="text-3xl font-bold">{cantEntregada}</span>
                                    <button onClick={() => setCantEntregada(c => c+1)} className="w-12 h-12 bg-green-100 text-green-600 text-2xl font-bold rounded">+</button>
                                </div>
                            </div>

                            <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
                                <label className="flex items-center gap-2 font-bold text-orange-800 mb-4"><RefreshCw size={20}/> Recogidos (Vacíos)</label>
                                <div className="flex items-center justify-between bg-white rounded-lg p-2 border shadow-sm">
                                    <button onClick={() => setCantRecogida(c => Math.max(0, c-1))} className="w-12 h-12 bg-gray-100 text-2xl font-bold rounded">-</button>
                                    <span className="text-3xl font-bold">{cantRecogida}</span>
                                    <button onClick={() => setCantRecogida(c => c+1)} className="w-12 h-12 bg-orange-100 text-orange-600 text-2xl font-bold rounded">+</button>
                                </div>
                            </div>

                            <div onClick={() => setFirmado(true)} className={`h-24 rounded-lg border-2 border-dashed flex items-center justify-center cursor-pointer transition-colors ${firmado ? 'bg-blue-50 border-blue-500' : 'bg-gray-50 border-gray-300'}`}>
                                {firmado ? <span className="text-blue-600 font-script text-2xl italic">Firma Recibida</span> : <span className="text-gray-400 flex items-center gap-2"><p>Toque para firmar</p></span>}
                            </div>

                            <Button onClick={handleFinalizar} disabled={!firmado} variant={firmado ? 'primary' : 'secondary'} className="w-full py-4 text-lg shadow-md">Confirmar Entrega</Button>
                        </div>
                    )}

                    {/* VISTA 3: SELECCIONAR MOTIVO INCIDENCIA */}
                    {paso === 'incidencia' && (
                        <div className="space-y-4">
                            <Button variant="ghost" onClick={() => setPaso('ruta')} className="text-gray-500 pl-0"><ArrowLeft size={16}/> Cancelar</Button>
                            <h3 className="font-bold text-gray-800 text-lg px-1">Seleccione el motivo:</h3>
                            {['Cliente Cerrado / No contesta', 'Dirección Incorrecta', 'Acceso Bloqueado', 'Cliente Rechaza Pedido', 'Falla Mecánica', 'Fuerza Mayor (Clima/Bloqueo)'].map(motivo => (
                                <button key={motivo} onClick={() => handleSeleccionarMotivo(motivo)}
                                        className="w-full p-4 bg-white border border-gray-200 rounded-xl text-left font-semibold text-gray-700 hover:bg-red-50 hover:border-red-300 flex justify-between items-center shadow-sm transition-all active:scale-95">
                                    {motivo} <ChevronRight size={20} className="text-gray-400"/>
                                </button>
                            ))}
                        </div>
                    )}

                    {/* VISTA 4: DETALLE Y EVIDENCIA (AQUÍ ESTÁ LO QUE PIDE EL DOC) */}
                    {paso === 'detalle_incidencia' && (
                        <div className="space-y-6">
                            <div className="bg-red-50 p-4 rounded-xl border border-red-100">
                                <p className="text-xs text-red-500 font-bold uppercase">Motivo Seleccionado</p>
                                <p className="text-lg font-bold text-red-800">{motivoIncidencia}</p>
                            </div>

                            {/* 1. CAPTURA DE EVIDENCIA */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Evidencia Fotográfica (Obligatorio)</label>
                                <div
                                    onClick={() => setFotoEvidencia(true)}
                                    className={`h-32 rounded-xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-all ${fotoEvidencia ? 'bg-gray-800 border-gray-800' : 'bg-gray-50 border-gray-300 hover:bg-gray-100'}`}
                                >
                                    {fotoEvidencia ? (
                                        <div className="relative w-full h-full flex items-center justify-center">
                                            <img src="https://placehold.co/400x300/333/999?text=FOTO+EVIDENCIA" alt="Evidencia" className="w-full h-full object-cover rounded-lg opacity-50" />
                                            <CheckCircle className="absolute text-white w-12 h-12" />
                                        </div>
                                    ) : (
                                        <>
                                            <Camera size={32} className="text-gray-400 mb-2"/>
                                            <span className="text-sm text-gray-500">Tomar Foto</span>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* 2. CANTIDADES AFECTADAS / OBSERVACIONES */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Observaciones / Cantidad Afectada</label>
                                <textarea
                                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-red-500 outline-none text-sm"
                                    rows="3"
                                    placeholder="Ej: Pedido rechazado totalmente. 10 cilindros retornan a planta."
                                ></textarea>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <Button variant="secondary" onClick={() => setPaso('incidencia')} className="flex-1">Atrás</Button>
                                <Button variant="danger" onClick={handleConfirmarIncidencia} className="flex-[2] bg-red-600 text-white shadow-lg shadow-red-200">
                                    Confirmar Incidencia
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* VISTA 5: COMPLETADO */}
                    {paso === 'completado' && (
                        <div className="flex flex-col items-center justify-center h-full space-y-8 animate-in zoom-in">
                            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
                                <CheckCircle size={60} className="text-green-600" />
                            </div>
                            <div className="text-center">
                                <h2 className="text-2xl font-bold text-gray-800">¡Entrega Exitosa!</h2>
                                <p className="text-gray-500">Datos sincronizados con central.</p>
                            </div>
                            <Button onClick={() => { setPaso('ruta'); setFirmado(false); }} variant="primary" className="w-full py-4 text-lg shadow-lg">Siguiente Parada</Button>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default EntregaMovil;