import React, { useState } from 'react';
import { MessageSquareWarning, Save, User, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Alert from '../../components/ui/Alert';

const NuevoReclamo = () => {
    const [tipoIncidencia, setTipoIncidencia] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Reclamo registrado correctamente. Se ha enviado una notificación al Supervisor.");
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Registrar Reclamo</h2>
                    <p className="text-gray-500">Módulo de Atención al Cliente y Soporte</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Formulario Principal */}
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <User size={20} className="text-blue-600"/> Datos del Afectado
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input label="Buscar Cliente / Código" placeholder="Ej: CLI-4005" />
                                <Input label="Nombre de Contacto" placeholder="Quien realiza la queja" />
                                <Input label="Teléfono de Referencia" placeholder="770-00000" />
                                <Input label="Pedido Relacionado (Opcional)" placeholder="Ej: PED-2231" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <MessageSquareWarning size={20} className="text-red-600"/> Detalle de la Incidencia
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="mb-4">
                                <label className="text-sm font-semibold text-gray-700 block mb-2">Tipo de Reclamo</label>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                    {['Demora Entrega', 'Producto Defectuoso', 'Fuga de Gas', 'Error Facturación', 'Mala Atención'].map((tipo) => (
                                        <div
                                            key={tipo}
                                            onClick={() => setTipoIncidencia(tipo)}
                                            className={`
                        cursor-pointer border rounded-lg p-3 text-sm text-center transition-all hover:shadow-md
                        ${tipoIncidencia === tipo ? 'bg-red-50 border-red-500 text-red-700 font-bold' : 'bg-white text-gray-600'}
                      `}
                                        >
                                            {tipo}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="mb-4">
                                <label className="text-sm font-semibold text-gray-700">Descripción Detallada</label>
                                <textarea
                                    className="w-full mt-1 p-3 border border-gray-300 rounded-lg h-32 focus:ring-2 focus:ring-blue-500 outline-none"
                                    placeholder="Describa lo sucedido con el mayor detalle posible..."
                                ></textarea>
                            </div>

                            {/* Lógica Visual: Si es Fuga, es Urgente */}
                            {tipoIncidencia === 'Fuga de Gas' && (
                                <div className="animate-in fade-in slide-in-from-top-2">
                                    <Alert variant="error" title="Protocolo de Seguridad Activado">
                                        <div className="flex items-start gap-2">
                                            <AlertTriangle size={16} className="mt-1" />
                                            <p>Esta incidencia se marcará automáticamente como <strong>CRÍTICA</strong>. Se requiere envío inmediato de técnico.</p>
                                        </div>
                                    </Alert>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* Panel Lateral: Resumen */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Acciones</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <Button type="submit" variant="primary" className="w-full h-12">
                                <Save size={18} /> Registrar Incidencia
                            </Button>
                            <Button type="button" variant="secondary" className="w-full">
                                Cancelar
                            </Button>
                        </CardContent>
                    </Card>
                </div>

            </form>
        </div>
    );
};

export default NuevoReclamo;