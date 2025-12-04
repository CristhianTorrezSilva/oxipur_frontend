import React, { useState } from 'react';
import { Save, FileText, Search, AlertTriangle, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card.jsx';
import Input from '../../components/ui/Input.jsx';
import Button from '../../components/ui/Button.jsx';
import Alert from '../../components/ui/Alert.jsx';

const NuevoPedido = () => {
    // Estados para simular interactividad en la demo
    const [esUrgente, setEsUrgente] = useState(false);
    const [stockStatus, setStockStatus] = useState(null); // 'checking', 'available', 'low'
    const [producto, setProducto] = useState('');

    // Simulación: Cuando seleccionan un producto, verificamos stock
    const handleProductChange = (e) => {
        setProducto(e.target.value);
        if (e.target.value) {
            setStockStatus('checking');
            setTimeout(() => {
                setStockStatus('available'); // Simulamos que siempre hay stock para la demo
            }, 800);
        } else {
            setStockStatus(null);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("¡Pedido Registrado Exitosamente! Pasando a etapa de validación...");
    };

    return (
        <div className="space-y-6">
            {/* Encabezado de la página */}
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Nuevo Pedido</h2>
                    <p className="text-gray-500">Registrar solicitud de oxígeno medicinal</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* COLUMNA IZQUIERDA: Datos del Cliente y Producto */}
                <div className="lg:col-span-2 space-y-6">

                    {/* 1. Datos del Cliente */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Search size={20} className="text-blue-600"/>
                                Información del Cliente
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <Input label="Buscar Cliente (NIT/Nombre)" placeholder="Ej: Clínica Incor..." />
                                <Input label="Contacto Solicitante" placeholder="Dr. Juan Pérez" />
                                <Input label="Dirección de Entrega" placeholder="Av. Doble Vía La Guardia, Km 5" className="md:col-span-2" />
                            </div>
                        </CardContent>
                    </Card>

                    {/* 2. Detalle del Pedido */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <FileText size={20} className="text-blue-600"/>
                                Detalle del Producto
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div className="flex flex-col gap-1">
                                    <label className="text-sm font-semibold text-gray-700">Tipo de Cilindro</label>
                                    <select
                                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
                                        onChange={handleProductChange}
                                    >
                                        <option value="">Seleccione...</option>
                                        <option value="6m3">Cilindro T-6m3 (Oxígeno Medicinal)</option>
                                        <option value="10m3">Cilindro T-10m3 (Oxígeno Industrial)</option>
                                        <option value="portatil">Kit Portátil (Mochila)</option>
                                    </select>
                                </div>
                                <Input label="Cantidad Requerida" type="number" placeholder="0" />
                            </div>

                            {/* Simulación de Consulta de Stock en Tiempo Real */}
                            {stockStatus === 'checking' && (
                                <Alert variant="info" title="Verificando Inventario...">
                                    Consultando disponibilidad en almacén central...
                                </Alert>
                            )}
                            {stockStatus === 'available' && (
                                <Alert variant="success" title="Stock Disponible">
                                    Hay 150 unidades disponibles para despacho inmediato.
                                </Alert>
                            )}
                        </CardContent>
                    </Card>
                </div>

                {/* COLUMNA DERECHA: Urgencia y Resumen */}
                <div className="space-y-6">

                    {/* Panel de Prioridad (Caso de Uso Clave) */}
                    <Card className={`border-2 ${esUrgente ? 'border-red-400 bg-red-50' : 'border-transparent'}`}>
                        <CardContent className="pt-6">
                            <div className="flex items-center justify-between mb-4">
                                <label className="font-bold text-gray-800">¿Es Urgencia Médica?</label>
                                <div
                                    className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors ${esUrgente ? 'bg-red-500' : 'bg-gray-300'}`}
                                    onClick={() => setEsUrgente(!esUrgente)}
                                >
                                    <div className={`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform ${esUrgente ? 'translate-x-6' : ''}`}></div>
                                </div>
                            </div>

                            {esUrgente && (
                                <div className="animate-in fade-in slide-in-from-top-2">
                                    <Alert variant="error" className="mb-4 bg-white">
                                        <AlertTriangle size={16} />
                                        Se dará prioridad alta en la ruta de distribución.
                                    </Alert>

                                    <div className="border-2 border-dashed border-red-300 rounded-lg p-4 text-center bg-white">
                                        <FileText className="mx-auto text-red-400 mb-2" />
                                        <p className="text-sm font-medium text-gray-600">Arrastre la Receta Médica aquí</p>
                                        <p className="text-xs text-gray-400">(Requerido por normativa)</p>
                                        <button type="button" className="mt-2 text-xs text-blue-600 underline">O seleccione archivo</button>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Botones de Acción */}
                    <div className="flex flex-col gap-3">
                        <Button type="submit" variant="primary" className="w-full h-12 text-lg">
                            <Save size={20} />
                            Registrar Pedido
                        </Button>
                        <Button variant="secondary" className="w-full">
                            Cancelar
                        </Button>
                    </div>
                </div>

            </form>
        </div>
    );
};

export default NuevoPedido;