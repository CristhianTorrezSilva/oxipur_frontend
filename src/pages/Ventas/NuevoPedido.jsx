import React, { useState } from 'react';
import { Save, FileText, Search, AlertTriangle, Plus, Trash2, ShoppingCart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card.jsx';
import Input from '../../components/ui/Input.jsx';
import Button from '../../components/ui/Button.jsx';
import Alert from '../../components/ui/Alert.jsx';

const NuevoPedido = () => {
    // ESTADOS
    const [esUrgente, setEsUrgente] = useState(false);

    // ESTADO PARA EL "CARRITO" DE ITEMS (SOLUCIÓN A LA QUEJA DE LA DOCENTE)
    const [items, setItems] = useState([]);

    // Estado temporal para el input actual
    const [tempProducto, setTempProducto] = useState('');
    const [tempCantidad, setTempCantidad] = useState(1);

    // DICCIONARIO DE PRECIOS SIMULADOS
    const precios = {
        '6m3': { nombre: 'Cilindro T-6m3 (Medicinal)', precio: 150 },
        '10m3': { nombre: 'Cilindro T-10m3 (Industrial)', precio: 280 },
        'portatil': { nombre: 'Kit Portátil (Mochila)', precio: 450 }
    };

    // ACCIÓN: AGREGAR ITEM A LA LISTA
    const handleAddItem = () => {
        if (!tempProducto || tempCantidad <= 0) return alert("Seleccione un producto y cantidad válida");

        const productoInfo = precios[tempProducto];
        const subtotal = productoInfo.precio * tempCantidad;

        const newItem = {
            id: Date.now(), // ID temporal único
            codigo: tempProducto,
            nombre: productoInfo.nombre,
            cantidad: parseInt(tempCantidad),
            precioUnit: productoInfo.precio,
            subtotal: subtotal
        };

        setItems([...items, newItem]);

        // Resetear inputs temporales
        setTempProducto('');
        setTempCantidad(1);
    };

    // ACCIÓN: ELIMINAR ITEM
    const handleRemoveItem = (id) => {
        setItems(items.filter(item => item.id !== id));
    };

    // CALCULAR TOTAL DEL PEDIDO
    const totalPedido = items.reduce((acc, item) => acc + item.subtotal, 0);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (items.length === 0) return alert("Debe agregar al menos un ítem al pedido.");

        alert(`¡Pedido Multiproducto Registrado! \nTotal a Pagar: Bs ${totalPedido}\n\nEl sistema ha generado la orden con ${items.length} líneas de detalle.`);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Nuevo Pedido</h2>
                    <p className="text-gray-500">Creación de orden de compra estandarizada</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* COLUMNA IZQUIERDA: Cliente y Selección de Productos */}
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

                    {/* 2. Selección de Productos (SOLUCIÓN PEDIDOS MIXTOS) */}
                    <Card className="border-blue-100 shadow-md">
                        <CardHeader className="bg-blue-50/50 pb-2">
                            <CardTitle className="flex items-center gap-2 text-blue-800">
                                <ShoppingCart size={20}/>
                                Armado del Pedido
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-4">

                            {/* FORMULARIO DE AGREGACIÓN */}
                            <div className="flex flex-col md:flex-row gap-4 items-end mb-6 bg-slate-50 p-4 rounded-lg border border-slate-200">
                                <div className="flex-1 w-full">
                                    <label className="text-sm font-semibold text-gray-700 mb-1 block">Tipo de Cilindro</label>
                                    <select
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
                                        value={tempProducto}
                                        onChange={(e) => setTempProducto(e.target.value)}
                                    >
                                        <option value="">Seleccione producto...</option>
                                        <option value="6m3">Cilindro T-6m3 (Bs 150)</option>
                                        <option value="10m3">Cilindro T-10m3 (Bs 280)</option>
                                        <option value="portatil">Kit Portátil (Bs 450)</option>
                                    </select>
                                </div>
                                <div className="w-full md:w-32">
                                    <Input
                                        label="Cantidad"
                                        type="number"
                                        min="1"
                                        value={tempCantidad}
                                        onChange={(e) => setTempCantidad(e.target.value)}
                                    />
                                </div>
                                <Button
                                    type="button"
                                    onClick={handleAddItem}
                                    variant="primary"
                                    className="mb-[2px]" // Ajuste visual
                                >
                                    <Plus size={18} className="mr-1"/> Agregar
                                </Button>
                            </div>

                            {/* TABLA DE ITEMS AGREGADOS */}
                            <div className="rounded-lg border border-gray-200 overflow-hidden">
                                <table className="w-full text-sm text-left">
                                    <thead className="bg-gray-100 text-gray-700 font-bold uppercase text-xs">
                                    <tr>
                                        <th className="p-3">Descripción</th>
                                        <th className="p-3 text-center">Cant.</th>
                                        <th className="p-3 text-right">P. Unit</th>
                                        <th className="p-3 text-right">Subtotal</th>
                                        <th className="p-3 text-center">Acción</th>
                                    </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                    {items.length === 0 ? (
                                        <tr>
                                            <td colSpan="5" className="p-8 text-center text-gray-400 italic">
                                                No hay productos en el pedido aún.
                                            </td>
                                        </tr>
                                    ) : (
                                        items.map((item) => (
                                            <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                                                <td className="p-3 font-medium text-gray-800">{item.nombre}</td>
                                                <td className="p-3 text-center bg-gray-50 font-bold">{item.cantidad}</td>
                                                <td className="p-3 text-right text-gray-600">{item.precioUnit} Bs</td>
                                                <td className="p-3 text-right font-bold text-blue-700">{item.subtotal} Bs</td>
                                                <td className="p-3 text-center">
                                                    <button
                                                        type="button"
                                                        onClick={() => handleRemoveItem(item.id)}
                                                        className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1 rounded transition-colors"
                                                    >
                                                        <Trash2 size={16}/>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                    </tbody>
                                    {/* FOOTER CON TOTALES */}
                                    {items.length > 0 && (
                                        <tfoot className="bg-gray-50 border-t border-gray-200">
                                        <tr>
                                            <td colSpan="3" className="p-3 text-right font-bold text-gray-600">TOTAL ESTIMADO:</td>
                                            <td className="p-3 text-right font-bold text-xl text-green-700">{totalPedido} Bs</td>
                                            <td></td>
                                        </tr>
                                        </tfoot>
                                    )}
                                </table>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* COLUMNA DERECHA: Urgencia y Resumen */}
                <div className="space-y-6">

                    {/* Panel de Prioridad */}
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
                                        Prioridad Alta activada.
                                    </Alert>
                                    <div className="border-2 border-dashed border-red-300 rounded-lg p-4 text-center bg-white">
                                        <FileText className="mx-auto text-red-400 mb-2" />
                                        <p className="text-sm font-medium text-gray-600">Subir Receta Médica</p>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Resumen Final */}
                    <Card>
                        <CardHeader><CardTitle>Resumen de Orden</CardTitle></CardHeader>
                        <CardContent className="space-y-3">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Ítems Totales:</span>
                                <span className="font-bold">{items.length} líneas</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Impuestos (13%):</span>
                                <span className="font-bold">{(totalPedido * 0.13).toFixed(2)} Bs</span>
                            </div>
                            <div className="border-t pt-3 flex justify-between items-center">
                                <span className="font-bold text-gray-800">Total a Pagar</span>
                                <span className="font-bold text-2xl text-blue-600">{totalPedido} Bs</span>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex flex-col gap-3">
                        <Button type="submit" variant="primary" className="w-full h-12 text-lg shadow-lg shadow-blue-200">
                            <Save size={20} />
                            Generar Pedido
                        </Button>
                        <Button type="button" variant="secondary" className="w-full">
                            Cancelar Operación
                        </Button>
                    </div>
                </div>

            </form>
        </div>
    );
};

export default NuevoPedido;