import React, { useState } from 'react';
import { Save, ArrowLeft, Upload, Search, AlertTriangle, FileText, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Alert from '../../components/ui/Alert';

const NuevoReclamo = () => {
    const navigate = useNavigate();
    const [pedidoBusqueda, setPedidoBusqueda] = useState('');
    const [pedidoEncontrado, setPedidoEncontrado] = useState(null);
    const [evidencia, setEvidencia] = useState(null);

    // Simulación: Buscar Pedido (Precondición: Pedido existente)
    const buscarPedido = () => {
        if (pedidoBusqueda === 'PED-105') {
            setPedidoEncontrado({
                id: 'PED-105',
                cliente: 'Hospital Obrero',
                fecha: '04/12/2025',
                items: '25 Cilindros 10m3'
            });
        } else {
            alert("Pedido no encontrado. Intente con PED-105");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!pedidoEncontrado) return alert("Debe vincular un pedido válido.");

        // SISTEMA: Genera Ticket y notifica
        const ticketId = `REC-${Math.floor(Math.random() * 10000)}`;
        alert(`RECLAMO REGISTRADO CON ÉXITO.\n\nTicket Generado: #${ticketId}\nEstado: ABIERTO\nAsignado a: Mesa de Ayuda`);
        navigate('/reclamos');
    };

    return (
        <div className="max-w-4xl mx-auto space-y-6">

            <div className="flex items-center gap-4 mb-6">
                <Button variant="outline" onClick={() => navigate(-1)}>
                    <ArrowLeft size={18} /> Volver
                </Button>
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Registrar Nuevo Reclamo</h2>
                    <p className="text-gray-500">Atención al Cliente y Gestión de Calidad</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* COLUMNA IZQUIERDA: DATOS DEL PEDIDO (VINCULACIÓN) */}
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardHeader><CardTitle>1. Vinculación del Pedido</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex gap-2 items-end">
                                <div className="flex-1">
                                    <Input
                                        label="Número de Pedido / Guía"
                                        placeholder="Ej: PED-105"
                                        value={pedidoBusqueda}
                                        onChange={(e) => setPedidoBusqueda(e.target.value)}
                                    />
                                </div>
                                <Button type="button" variant="secondary" onClick={buscarPedido} className="mb-[2px]">
                                    <Search size={18}/> Buscar
                                </Button>
                            </div>

                            {/* RESULTADO DE BÚSQUEDA */}
                            {pedidoEncontrado && (
                                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 flex items-start gap-3 animate-in fade-in">
                                    <FileText className="text-blue-600 mt-1" size={20}/>
                                    <div>
                                        <p className="font-bold text-blue-800">Pedido: {pedidoEncontrado.id}</p>
                                        <p className="text-sm text-blue-600">Cliente: {pedidoEncontrado.cliente}</p>
                                        <p className="text-xs text-blue-500">Fecha: {pedidoEncontrado.fecha} — {pedidoEncontrado.items}</p>
                                    </div>
                                    <CheckCircle size={20} className="text-green-500 ml-auto" />
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader><CardTitle>2. Detalle del Problema</CardTitle></CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col gap-1">
                                    <label className="text-sm font-semibold text-gray-700">Tipo de Reclamo</label>
                                    <select className="p-2 border rounded-lg bg-white" required>
                                        <option value="">Seleccione...</option>
                                        <option value="calidad">Falla de Calidad (Fuga/Válvula)</option>
                                        <option value="logistica">Entrega Tardía / No Entregado</option>
                                        <option value="documentacion">Error en Factura/Guía</option>
                                        <option value="atencion">Mala Atención del Conductor</option>
                                    </select>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="text-sm font-semibold text-gray-700">Severidad</label>
                                    <select className="p-2 border rounded-lg bg-white" required>
                                        <option value="baja">Baja</option>
                                        <option value="media">Media</option>
                                        <option value="alta" className="text-red-600 font-bold">Alta (Crítico)</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className="text-sm font-semibold text-gray-700">Descripción Detallada</label>
                                <textarea className="p-3 border rounded-lg h-32 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Describa lo sucedido..." required></textarea>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* COLUMNA DERECHA: EVIDENCIA (ADJUNTOS PERMITIDOS) */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader><CardTitle>3. Evidencia</CardTitle></CardHeader>
                        <CardContent>
                            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => setEvidencia(true)}>
                                {evidencia ? (
                                    <div className="text-green-600">
                                        <CheckCircle size={40} className="mx-auto mb-2"/>
                                        <p className="font-bold">Archivo Cargado</p>
                                        <p className="text-xs">foto_cilindro.jpg</p>
                                    </div>
                                ) : (
                                    <div className="text-gray-400">
                                        <Upload size={40} className="mx-auto mb-2"/>
                                        <p className="font-bold text-gray-600">Subir Archivos</p>
                                        <p className="text-xs">Arrastre fotos o documentos aquí</p>
                                    </div>
                                )}
                            </div>
                            <p className="text-xs text-gray-400 mt-2 text-center">Formatos: JPG, PNG, PDF (Max 5MB)</p>
                        </CardContent>
                    </Card>

                    <Alert variant="warning" title="Aviso Importante">
                        <div className="flex items-start gap-2">
                            <AlertTriangle size={16} className="mt-0.5"/>
                            <span className="text-xs">Los reclamos de Alta Severidad notifican inmediatamente a la Gerencia Comercial.</span>
                        </div>
                    </Alert>

                    <Button type="submit" variant="primary" className="w-full h-12 text-lg shadow-lg">
                        <Save size={20} /> Registrar Reclamo
                    </Button>
                </div>

            </form>
        </div>
    );
};

export default NuevoReclamo;