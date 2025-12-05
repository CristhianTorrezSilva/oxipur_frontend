import React, { useState } from 'react';
import { Printer, ArrowLeft, Share2, PackageCheck, Clock, ShieldCheck, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

const GuiaDespacho = () => {
    const navigate = useNavigate();

    // ESTADO: Controla si la guía está en modo "Emitido" o "Despachado"
    const [estadoDespacho, setEstadoDespacho] = useState('emitido');
    const [horaSalida, setHoraSalida] = useState(null);

    const handlePrint = () => {
        window.print();
    };

    // ACCIÓN: Confirmar que el camión salió
    const handleConfirmarDespacho = () => {
        const confirmacion = confirm("¿Confirmar salida de almacén?\n\nAl aceptar, confirma que ha verificado físicamente las cantidades.");

        if (confirmacion) {
            const hora = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            setHoraSalida(hora);
            setEstadoDespacho('despachado');
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen p-8 flex flex-col items-center gap-6">

            {/* --- BLOQUE NUEVO: PANEL DE CONTROL DE ALMACÉN --- */}
            <div className="w-full max-w-4xl bg-white p-4 rounded-xl shadow-md border-l-4 border-blue-600 flex justify-between items-center print:hidden">
                <div>
                    <h3 className="font-bold text-gray-800">Control de Salida</h3>
                    <p className="text-sm text-gray-500">
                        {estadoDespacho === 'emitido'
                            ? 'Verificar carga y confirmar salida.'
                            : `Salida registrada a las ${horaSalida}`}
                    </p>
                </div>
                <div>
                    {estadoDespacho === 'emitido' ? (
                        <Button
                            variant="primary"
                            onClick={handleConfirmarDespacho}
                            className="bg-green-600 hover:bg-green-700 text-white"
                        >
                            <PackageCheck size={18} /> Confirmar Despacho Físico
                        </Button>
                    ) : (
                        <div className="flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-lg font-bold border border-green-200">
                            <CheckCircle size={20} /> EN RUTA
                        </div>
                    )}
                </div>
            </div>

            {/* BARRA DE HERRAMIENTAS (Botones normales) */}
            <div className="w-full max-w-4xl flex justify-between items-center print:hidden">
                <Button variant="outline" onClick={() => navigate(-1)}>
                    <ArrowLeft size={18} /> Volver
                </Button>
                <div className="flex gap-2">
                    <Button variant="secondary">
                        <Share2 size={18} /> Enviar a Chofer
                    </Button>
                    {/* OJO: Aquí debe decir "Imprimir Copia" en la nueva versión */}
                    <Button variant="outline" onClick={handlePrint}>
                        <Printer size={18} /> Imprimir Copia
                    </Button>
                </div>
            </div>

            {/* HOJA DE PAPEL */}
            <div className="bg-white w-full max-w-4xl shadow-2xl p-12 min-h-[1100px] text-gray-800 relative overflow-hidden print:w-full print:shadow-none">

                {/* SELLO GIGANTE (Solo aparece si está despachado) */}
                {estadoDespacho === 'despachado' && (
                    <div className="absolute top-10 right-10 border-4 border-green-600 text-green-600 font-black text-4xl p-4 opacity-30 rotate-[-15deg] pointer-events-none">
                        DESPACHADO
                        <p className="text-sm text-center mt-1">{horaSalida}</p>
                    </div>
                )}

                {/* Cabecera */}
                <div className="flex justify-between items-start border-b-2 border-gray-800 pb-6 mb-8">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-blue-700 text-white flex items-center justify-center text-2xl font-bold rounded">OX</div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">OXIPUR S.R.L.</h1>
                            <p className="text-sm text-gray-500">Parque Industrial Mz. 5</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <h2 className="text-xl font-bold uppercase text-gray-400">Guía de Despacho</h2>
                        <p className="text-3xl font-mono text-red-600 font-bold">N° 0004582</p>
                        {/* El estado cambia dinámicamente */}
                        <Badge variant={estadoDespacho === 'despachado' ? 'success' : 'warning'}>
                            {estadoDespacho === 'despachado' ? 'EN RUTA' : 'PENDIENTE SALIDA'}
                        </Badge>
                    </div>
                </div>

                {/* Resto del documento... (Datos, Tabla, Firmas) */}
                <div className="grid grid-cols-2 gap-8 mb-8 bg-gray-50 p-6 rounded-lg border border-gray-100">
                    <div>
                        <p className="text-xs font-bold text-gray-400 uppercase mb-1">Responsable</p>
                        <p className="text-lg font-bold">Juan Pérez</p>
                    </div>
                    <div className="text-right">
                        <p className="text-xs font-bold text-gray-400 uppercase mb-1">Vehículo</p>
                        <p className="text-lg font-bold">Nissan Atlas</p>
                    </div>
                    <div>
                        <p className="text-xs font-bold text-gray-400 uppercase mb-1">Hora Salida</p>
                        <p className="font-mono text-blue-600 font-bold">
                            {estadoDespacho === 'despachado' ? `${new Date().toLocaleDateString()} - ${horaSalida}` : '--:--'}
                        </p>
                    </div>
                </div>

                {/* Tabla de Carga */}
                <div className="mb-8">
                    <h3 className="font-bold text-gray-800 border-b border-gray-200 pb-2 mb-4 uppercase text-sm">Carga Verificada</h3>
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                        <tr><th className="p-3">Código</th><th className="p-3">Descripción</th><th className="p-3 text-right">Cant.</th><th className="p-3 text-right">Check</th></tr>
                        </thead>
                        <tbody>
                        <tr className="border-b"><td className="p-3">CIL-MED-6</td><td className="p-3">Oxígeno Medicinal 6m3</td><td className="p-3 text-right font-bold">30</td><td className="p-3 text-right"><ShieldCheck size={16} className="inline text-gray-400"/></td></tr>
                        <tr className="border-b"><td className="p-3">CIL-IND-10</td><td className="p-3">Oxígeno Industrial 10m3</td><td className="p-3 text-right font-bold">10</td><td className="p-3 text-right"><ShieldCheck size={16} className="inline text-gray-400"/></td></tr>
                        </tbody>
                    </table>
                </div>

                {/* Firmas */}
                <div className="grid grid-cols-3 gap-12 mt-20">
                    <div className="text-center">
                        <div className="border-b border-gray-400 h-16"></div>
                        <p className="mt-2 text-xs font-bold uppercase text-gray-500">Almacén</p>
                        {/* Firma digital aparece al despachar */}
                        <p className="text-xs text-green-600 font-bold h-4">{estadoDespacho === 'despachado' ? 'FIRMADO DIGITALMENTE' : ''}</p>
                    </div>
                    <div className="text-center"><div className="border-b border-gray-400 h-16"></div><p className="mt-2 text-xs font-bold uppercase text-gray-500">Conductor</p></div>
                    <div className="text-center"><div className="border-b border-gray-400 h-16"></div><p className="mt-2 text-xs font-bold uppercase text-gray-500">Seguridad</p></div>
                </div>

            </div>
        </div>
    );
};

export default GuiaDespacho;