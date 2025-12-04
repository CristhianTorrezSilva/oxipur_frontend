import React from 'react';
import { Printer, ArrowLeft, Share2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// IMPORTS DE UI (Faltaba Badge)
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

const GuiaDespacho = () => {
    const navigate = useNavigate();

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="bg-gray-100 min-h-screen p-8 flex flex-col items-center gap-6">

            {/* Barra de Herramientas Flotante */}
            <div className="w-full max-w-4xl flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-200 print:hidden">
                <Button variant="outline" onClick={() => navigate(-1)}>
                    <ArrowLeft size={18} /> Volver
                </Button>
                <div className="flex gap-2">
                    <Button variant="secondary">
                        <Share2 size={18} /> Compartir
                    </Button>
                    <Button variant="primary" onClick={handlePrint}>
                        <Printer size={18} /> Imprimir Guía
                    </Button>
                </div>
            </div>

            {/* LA HOJA DE PAPEL (A4 Simulado) */}
            <div className="bg-white w-full max-w-4xl shadow-2xl p-12 min-h-[1100px] text-gray-800 print:shadow-none print:w-full">

                {/* Cabecera Documento */}
                <div className="flex justify-between items-start border-b-2 border-gray-800 pb-6 mb-8">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-blue-700 text-white flex items-center justify-center text-2xl font-bold rounded">
                            OX
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">OXIPUR S.R.L.</h1>
                            <p className="text-sm text-gray-500">Parque Industrial Mz. 5 - Santa Cruz, Bolivia</p>
                            <p className="text-sm text-gray-500">Telf: (3) 345-0099 | info@oxipur.bo</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <h2 className="text-xl font-bold uppercase text-gray-400">Guía de Despacho</h2>
                        <p className="text-3xl font-mono text-red-600 font-bold">N° 0004582</p>
                        <p className="text-xs text-gray-400 mt-1">AUTORIZACIÓN: 450012001</p>
                    </div>
                </div>

                {/* Datos Generales */}
                <div className="grid grid-cols-2 gap-8 mb-8 bg-gray-50 p-6 rounded-lg border border-gray-100">
                    <div>
                        <p className="text-xs font-bold text-gray-400 uppercase mb-1">Responsable de Transporte</p>
                        <p className="text-lg font-bold">Juan Pérez</p>
                        <p className="text-sm text-gray-600">Licencia: 3453455-SC</p>
                    </div>
                    <div className="text-right">
                        <p className="text-xs font-bold text-gray-400 uppercase mb-1">Vehículo Asignado</p>
                        <p className="text-lg font-bold">Nissan Atlas - Blanco</p>
                        <p className="text-sm text-gray-600">Placa: 2344-XTR</p>
                    </div>
                    <div>
                        <p className="text-xs font-bold text-gray-400 uppercase mb-1">Fecha de Emisión</p>
                        <p className="font-mono">04/12/2025 - 07:30 AM</p>
                    </div>
                    <div className="text-right">
                        <p className="text-xs font-bold text-gray-400 uppercase mb-1">Zona de Ruta</p>
                        {/* Aquí es donde fallaba antes sin el import */}
                        <Badge variant="info">ZONA NORTE - RUTA 2</Badge>
                    </div>
                </div>

                {/* Detalle de Carga */}
                <div className="mb-8">
                    <h3 className="font-bold text-gray-800 border-b border-gray-200 pb-2 mb-4 uppercase text-sm">Inventario Cargado</h3>
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                        <tr>
                            <th className="p-3">Código</th>
                            <th className="p-3">Descripción</th>
                            <th className="p-3 text-right">Cantidad</th>
                            <th className="p-3 text-right">Peso Unit.</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                        <tr>
                            <td className="p-3 font-mono">CIL-MED-6</td>
                            <td className="p-3">Cilindro Oxígeno Medicinal 6m3 (Lleno)</td>
                            <td className="p-3 text-right font-bold">30</td>
                            <td className="p-3 text-right">45 kg</td>
                        </tr>
                        <tr>
                            <td className="p-3 font-mono">CIL-IND-10</td>
                            <td className="p-3">Cilindro Oxígeno Industrial 10m3 (Lleno)</td>
                            <td className="p-3 text-right font-bold">10</td>
                            <td className="p-3 text-right">60 kg</td>
                        </tr>
                        <tr>
                            <td className="p-3 font-mono">KIT-PORT</td>
                            <td className="p-3">Kit Portátil Mochila</td>
                            <td className="p-3 text-right font-bold">5</td>
                            <td className="p-3 text-right">5 kg</td>
                        </tr>
                        </tbody>
                        <tfoot className="bg-gray-50 font-bold border-t-2 border-gray-300">
                        <tr>
                            <td colSpan="2" className="p-3 text-right">TOTAL CARGA</td>
                            <td className="p-3 text-right">45 Unid.</td>
                            <td className="p-3 text-right">2000 kg Aprx.</td>
                        </tr>
                        </tfoot>
                    </table>
                </div>

                {/* Hoja de Ruta Resumida */}
                <div className="mb-12">
                    <h3 className="font-bold text-gray-800 border-b border-gray-200 pb-2 mb-4 uppercase text-sm">Puntos de Entrega (Hoja de Ruta)</h3>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between p-2 border-b border-gray-100">
                            <span>1. Clínica Incor</span>
                            <span className="text-gray-500">Av. Banzer</span>
                        </div>
                        <div className="flex justify-between p-2 border-b border-gray-100">
                            <span>2. Consultorio Norte</span>
                            <span className="text-gray-500">Calle Independencia</span>
                        </div>
                        <div className="flex justify-between p-2 border-b border-gray-100">
                            <span>3. Hospital Obrero</span>
                            <span className="text-gray-500">3er Anillo</span>
                        </div>
                    </div>
                </div>

                {/* Firmas */}
                <div className="grid grid-cols-3 gap-12 mt-20">
                    <div className="text-center">
                        <div className="border-b border-gray-400 h-16"></div>
                        <p className="mt-2 text-xs font-bold uppercase text-gray-500">Encargado de Almacén</p>
                        <p className="text-xs text-gray-400">Despacho</p>
                    </div>
                    <div className="text-center">
                        <div className="border-b border-gray-400 h-16"></div>
                        <p className="mt-2 text-xs font-bold uppercase text-gray-500">Conductor</p>
                        <p className="text-xs text-gray-400">Recepción Conforme</p>
                    </div>
                    <div className="text-center">
                        <div className="border-b border-gray-400 h-16"></div>
                        <p className="mt-2 text-xs font-bold uppercase text-gray-500">Seguridad</p>
                        <p className="text-xs text-gray-400">Control Salida</p>
                    </div>
                </div>

                <div className="mt-12 text-center text-[10px] text-gray-400">
                    <p>Este documento es una representación del sistema. OXIPUR S.R.L. - Generado el 04/12/2025</p>
                </div>

            </div>
        </div>
    );
};

export default GuiaDespacho;