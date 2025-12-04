import React, { useState } from 'react';
import { Navigation, MapPin, Package, RefreshCw, CheckCircle, Camera, ChevronRight, Phone } from 'lucide-react';
import Button from '../../components/ui/Button.jsx';
import Input from '../../components/ui/Input.jsx';

const EntregaMovil = () => {
    // Estado del flujo: 'ruta' -> 'formulario' -> 'completado'
    const [paso, setPaso] = useState('ruta');
    const [firmado, setFirmado] = useState(false);
    const [cantEntregada, setCantEntregada] = useState(5);
    const [cantRecogida, setCantRecogida] = useState(5);

    // DATOS MOCK: La parada actual del chofer
    const paradaActual = {
        cliente: "Clínica Incor - Emergencias",
        direccion: "Av. Banzer y 4to Anillo",
        contacto: "Dr. Mamani",
        telefono: "770-55555",
        pedido: "PED-402",
        items: "5x Cilindros O2 Medicinal (6m3)"
    };

    const handleLlegada = () => {
        setPaso('formulario');
    };

    const handleFinalizar = () => {
        if (!firmado) return alert("Falta la firma del cliente");
        setPaso('completado');
    };

    const handleSiguiente = () => {
        // Reiniciar para demo
        alert("Cargando siguiente parada...");
        setPaso('ruta');
        setFirmado(false);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex justify-center">
            {/* Contenedor tipo Celular (Mobile First) */}
            <div className="w-full max-w-md bg-white min-h-screen shadow-xl flex flex-col">

                {/* Header App Móvil */}
                <div className="bg-blue-700 text-white p-4 pt-8 flex justify-between items-center shadow-md">
                    <div>
                        <h1 className="font-bold text-lg">Ruta #234</h1>
                        <p className="text-xs text-blue-200">Camión: 2344-XTR</p>
                    </div>
                    <div className="text-right">
                        <div className="text-2xl font-bold">08:45</div>
                        <p className="text-xs text-blue-200">EN TIEMPO</p>
                    </div>
                </div>

                {/* CONTENIDO CAMBIANTE SEGÚN EL PASO */}
                <div className="flex-1 p-4 flex flex-col">

                    {/* PASO 1: NAVEGACIÓN (GPS) */}
                    {paso === 'ruta' && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">

                            {/* Tarjeta de Próxima Parada */}
                            <div className="bg-blue-50 border border-blue-100 rounded-xl p-6 shadow-sm">
                                <p className="text-xs font-bold text-blue-600 uppercase tracking-wider mb-2">Próxima Parada (2.5 km)</p>
                                <h2 className="text-2xl font-bold text-gray-800 leading-tight mb-2">{paradaActual.cliente}</h2>
                                <div className="flex items-start gap-2 text-gray-600 mb-4">
                                    <MapPin className="mt-1 flex-shrink-0" size={18} />
                                    <p>{paradaActual.direccion}</p>
                                </div>

                                <div className="flex gap-3">
                                    <Button variant="outline" className="flex-1 bg-white border-blue-200 text-blue-700">
                                        <Phone size={18} /> Llamar
                                    </Button>
                                    <Button variant="primary" className="flex-1">
                                        <Navigation size={18} /> Waze
                                    </Button>
                                </div>
                            </div>

                            {/* Detalle del Pedido */}
                            <div className="bg-white border rounded-xl p-4">
                                <h3 className="font-bold text-gray-700 border-b pb-2 mb-2">Detalle de Entrega</h3>
                                <div className="flex justify-between items-center py-2">
                                    <div className="flex items-center gap-3">
                                        <div className="bg-gray-100 p-2 rounded-lg">
                                            <Package size={20} className="text-gray-600" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-sm">O2 Medicinal 6m3</p>
                                            <p className="text-xs text-gray-500">Cilindro T-6</p>
                                        </div>
                                    </div>
                                    <span className="font-bold text-xl">x5</span>
                                </div>
                            </div>

                            <div className="flex-1"></div>

                            <Button
                                onClick={handleLlegada}
                                className="w-full py-4 text-lg bg-green-600 hover:bg-green-700 shadow-lg shadow-green-200"
                            >
                                He llegado al destino
                            </Button>
                        </div>
                    )}

                    {/* PASO 2: FORMULARIO DE ENTREGA (Intercambio) */}
                    {paso === 'formulario' && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                            <h2 className="text-xl font-bold text-gray-800 text-center">Registro de Entrega</h2>

                            {/* Entregados */}
                            <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                                <label className="flex items-center gap-2 font-bold text-green-800 mb-4">
                                    <Package size={20} /> Cilindros Entregados (Llenos)
                                </label>
                                <div className="flex items-center justify-between bg-white rounded-lg p-2 border shadow-sm">
                                    <button
                                        onClick={() => setCantEntregada(c => Math.max(0, c-1))}
                                        className="w-12 h-12 rounded-lg bg-gray-100 font-bold text-2xl text-gray-600"
                                    >-</button>
                                    <span className="text-3xl font-bold text-gray-800">{cantEntregada}</span>
                                    <button
                                        onClick={() => setCantEntregada(c => c+1)}
                                        className="w-12 h-12 rounded-lg bg-green-100 font-bold text-2xl text-green-600"
                                    >+</button>
                                </div>
                            </div>

                            {/* Recogidos (Devoluciones) */}
                            <div className="bg-orange-50 border border-orange-200 rounded-xl p-4">
                                <label className="flex items-center gap-2 font-bold text-orange-800 mb-4">
                                    <RefreshCw size={20} /> Cilindros Recogidos (Vacíos)
                                </label>
                                <div className="flex items-center justify-between bg-white rounded-lg p-2 border shadow-sm">
                                    <button
                                        onClick={() => setCantRecogida(c => Math.max(0, c-1))}
                                        className="w-12 h-12 rounded-lg bg-gray-100 font-bold text-2xl text-gray-600"
                                    >-</button>
                                    <span className="text-3xl font-bold text-gray-800">{cantRecogida}</span>
                                    <button
                                        onClick={() => setCantRecogida(c => c+1)}
                                        className="w-12 h-12 rounded-lg bg-orange-100 font-bold text-2xl text-orange-600"
                                    >+</button>
                                </div>
                            </div>

                            {/* Evidencia / Firma */}
                            <div className="space-y-2">
                                <p className="font-bold text-gray-700 text-sm">Conformidad del Cliente</p>
                                <div
                                    onClick={() => setFirmado(true)}
                                    className={`
                    h-24 rounded-lg border-2 border-dashed flex flex-col items-center justify-center cursor-pointer transition-colors
                    ${firmado ? 'bg-blue-50 border-blue-500' : 'bg-gray-50 border-gray-300 hover:bg-gray-100'}
                  `}
                                >
                                    {firmado ? (
                                        <div className="text-blue-600 font-script text-2xl rotate-[-5deg]">Juan Perez</div>
                                    ) : (
                                        <>
                                            <p className="text-sm text-gray-400">Toque aquí para firmar</p>
                                        </>
                                    )}
                                </div>
                                <Button variant="outline" className="w-full text-sm py-2">
                                    <Camera size={16} /> Tomar Foto Guía Firmada
                                </Button>
                            </div>

                            <div className="pt-4">
                                <Button
                                    onClick={handleFinalizar}
                                    disabled={!firmado}
                                    variant={firmado ? 'primary' : 'secondary'}
                                    className="w-full py-4 text-lg"
                                >
                                    Confirmar Entrega
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* PASO 3: ÉXITO */}
                    {paso === 'completado' && (
                        <div className="flex flex-col items-center justify-center h-full space-y-8 animate-in zoom-in duration-300">
                            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-4">
                                <CheckCircle size={64} />
                            </div>

                            <div className="text-center">
                                <h2 className="text-2xl font-bold text-gray-800">¡Entrega Exitosa!</h2>
                                <p className="text-gray-500 mt-2">Los datos se han sincronizado con la central.</p>
                            </div>

                            <div className="bg-gray-50 p-6 rounded-xl w-full text-sm space-y-2">
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Tiempo de parada:</span>
                                    <span className="font-bold">12 min</span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Balance Carga:</span>
                                    <span className="font-bold text-blue-600">{cantEntregada} Entregados</span>
                                </div>
                                <div className="flex justify-between border-t pt-2">
                                    <span className="text-gray-500">Retorno:</span>
                                    <span className="font-bold text-orange-600">{cantRecogida} Vacíos</span>
                                </div>
                            </div>

                            <div className="w-full pt-8">
                                <Button onClick={handleSiguiente} variant="primary" className="w-full py-4 text-lg flex justify-between items-center px-6">
                                    Ir a Siguiente Parada
                                    <ChevronRight />
                                </Button>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default EntregaMovil;