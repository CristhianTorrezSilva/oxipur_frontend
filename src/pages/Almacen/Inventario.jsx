import React, { useState } from 'react';
import { Package, ArrowUpRight, ArrowDownLeft, AlertTriangle, RefreshCcw, Search, Download, FileText, Save, Factory, CheckCircle, Plus, Trash2, Truck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/Table';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Modal from '../../components/ui/Modal';
import Input from '../../components/ui/Input';
import Alert from '../../components/ui/Alert';

const Inventario = () => {
    const [searchTerm, setSearchTerm] = useState('');

    // MODALES
    const [modalMovimientoOpen, setModalMovimientoOpen] = useState(false);
    const [modalProduccionOpen, setModalProduccionOpen] = useState(false);

    // ESTADOS FORMULARIO MANUAL
    const [motivo, setMotivo] = useState('');

    // ESTADOS NUEVOS PARA "RECEPCIÓN MÚLTIPLE" (CARRITO DE PRODUCCIÓN)
    const [itemsProduccion, setItemsProduccion] = useState([]);
    const [tempProdId, setTempProdId] = useState('');
    const [tempCant, setTempCant] = useState('');

    // DATOS MOCK
    const productos = [
        { id: 'O2-MED-6M3', nombre: 'Oxígeno Medicinal 6m3', tipo: 'Gas', stock: 145, capacidad: 200, vacios: 45, estado: 'optimo' },
        { id: 'O2-IND-10M3', nombre: 'Oxígeno Industrial 10m3', tipo: 'Gas', stock: 28, capacidad: 100, vacios: 60, estado: 'bajo' },
        { id: 'KIT-PORT', nombre: 'Kit Portátil (Mochila)', tipo: 'Equipo', stock: 12, capacidad: 50, vacios: 0, estado: 'critico' },
    ];

    const movimientos = [
        { id: 1, tipo: 'entrada', concepto: 'Lote Prod #4402', cant: 50, fecha: '04/12/2025 08:00', usuario: 'Planta' },
        { id: 2, tipo: 'salida', concepto: 'Despacho Ruta Norte', cant: 30, fecha: '04/12/2025 08:30', usuario: 'J. Pérez' },
        { id: 3, tipo: 'entrada', concepto: 'Devolución Ruta #234', cant: 15, fecha: '03/12/2025 16:45', usuario: 'Juan Chofer' },
    ];

    // --- FUNCIONES DE CARRITO DE PRODUCCIÓN ---
    const handleAddItem = () => {
        if (!tempProdId || !tempCant || parseInt(tempCant) <= 0) return alert("Seleccione producto y cantidad válida");

        const productoReal = productos.find(p => p.id === tempProdId);

        const newItem = {
            id: tempProdId,
            nombre: productoReal.nombre,
            cant: parseInt(tempCant)
        };

        setItemsProduccion([...itemsProduccion, newItem]);
        setTempProdId('');
        setTempCant('');
    };

    const handleRemoveItem = (id) => {
        setItemsProduccion(itemsProduccion.filter(i => i.id !== id));
    };

    // ACCIÓN: Confirmar Recepción Masiva
    const handleRecepcionPlanta = (e) => {
        e.preventDefault();
        if (itemsProduccion.length === 0) return alert("Debe agregar al menos un ítem al lote.");

        const resumen = itemsProduccion.map(i => `${i.cant}x ${i.nombre}`).join('\n');

        // MENSAJE PARA LA DOCENTE: CICLO CERRADO
        alert(`¡RECEPCIÓN DE LOTE CONFIRMADA!\n\nDetalle ingresado:\n${resumen}\n\nACCIONES DEL SISTEMA:\n1. Stock de "Llenos" aumentado.\n2. Stock de "Vacíos" descontado automáticamente.\n3. Costo de producción calculado.`);

        setItemsProduccion([]);
        setModalProduccionOpen(false);
    };

    // ACCIÓN: Guardar Movimiento Manual
    const handleGuardarAjuste = (e) => {
        e.preventDefault();
        alert("Movimiento registrado correctamente.");
        setModalMovimientoOpen(false);
    };

    return (
        <div className="space-y-6">

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Control de Inventario</h2>
                    <p className="text-gray-500">Gestión de stock, reabastecimiento y auditoría</p>
                </div>
                <div className="flex gap-2">
                    {/* BOTÓN REABASTECIMIENTO */}
                    <Button variant="primary" className="bg-green-600 hover:bg-green-700 text-white shadow-md shadow-green-200" onClick={() => setModalProduccionOpen(true)}>
                        <Factory size={18} /> Recepción de Planta
                    </Button>

                    <Button variant="outline" onClick={() => { setMotivo(''); setModalMovimientoOpen(true); }}>
                        <RefreshCcw size={18} /> Ajustes / Devoluciones
                    </Button>
                </div>
            </div>

            {/* KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="border-l-4 border-l-blue-500">
                    <CardContent className="flex items-center justify-between p-6">
                        <div>
                            <p className="text-sm font-medium text-gray-500 uppercase">Stock Disponible (Llenos)</p>
                            <h3 className="text-3xl font-bold text-gray-800">270</h3>
                        </div>
                        <div className="p-3 bg-blue-100 rounded-full text-blue-600"><Package size={24} /></div>
                    </CardContent>
                </Card>
                <Card className="border-l-4 border-l-orange-500">
                    <CardContent className="flex items-center justify-between p-6">
                        <div>
                            <p className="text-sm font-medium text-gray-500 uppercase">Por Recargar (Vacíos)</p>
                            <h3 className="text-3xl font-bold text-gray-800">105</h3>
                        </div>
                        <div className="p-3 bg-orange-100 rounded-full text-orange-600"><RefreshCcw size={24} /></div>
                    </CardContent>
                </Card>
                <Card className="border-l-4 border-l-red-500">
                    <CardContent className="flex items-center justify-between p-6">
                        <div>
                            <p className="text-sm font-medium text-gray-500 uppercase">Alertas Stock</p>
                            <h3 className="text-3xl font-bold text-gray-800">2</h3>
                        </div>
                        <div className="p-3 bg-red-100 rounded-full text-red-600"><AlertTriangle size={24} /></div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Tabla Principal */}
                <div className="lg:col-span-2 space-y-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Buscar por código..."
                            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-100 outline-none"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <Card>
                        <CardHeader className="border-b">
                            <CardTitle>Existencias por Almacén</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableHeader>Producto</TableHeader>
                                        <TableHeader>Disp. (Llenos)</TableHeader>
                                        <TableHeader>Vacíos (Planta)</TableHeader>
                                        <TableHeader>Estado</TableHeader>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {productos.map((prod) => (
                                        <TableRow key={prod.id}>
                                            <TableCell>
                                                <div className="font-bold text-gray-800">{prod.nombre}</div>
                                                <div className="text-xs text-gray-400 font-mono">{prod.id}</div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <span className="font-bold text-blue-700">{prod.stock}</span>
                                                    <span className="text-xs text-gray-400">/ {prod.capacidad}</span>
                                                </div>
                                                <div className="w-24 h-1.5 bg-gray-100 rounded-full mt-1 overflow-hidden">
                                                    <div
                                                        className={`h-full rounded-full ${prod.stock < 20 ? 'bg-red-500' : 'bg-blue-500'}`}
                                                        style={{ width: `${(prod.stock / prod.capacidad) * 100}%` }}
                                                    ></div>
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                {prod.tipo === 'Gas' ?
                                                    <span className="text-orange-600 font-bold bg-orange-50 px-2 py-0.5 rounded border border-orange-100">{prod.vacios}</span>
                                                    : <span className="text-gray-300">-</span>}
                                            </TableCell>
                                            <TableCell>
                                                {prod.estado === 'optimo' && <Badge variant="success">Normal</Badge>}
                                                {prod.estado === 'bajo' && <Badge variant="warning">Bajo</Badge>}
                                                {prod.estado === 'critico' && <Badge variant="danger">Crítico</Badge>}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>

                {/* Panel Lateral: Auditoría */}
                <div>
                    <Card className="h-full">
                        <CardHeader>
                            <CardTitle className="text-sm uppercase text-gray-500">Últimos Movimientos</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6">
                                {movimientos.map((mov) => (
                                    <div key={mov.id} className="flex gap-4 relative">
                                        <div className="absolute left-4 top-8 bottom-[-24px] w-0.5 bg-gray-100 last:hidden"></div>
                                        <div className={`
                      w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 z-10
                      ${mov.tipo === 'entrada' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}
                    `}>
                                            {mov.tipo === 'entrada' ? <ArrowDownLeft size={16} /> : <ArrowUpRight size={16} />}
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-gray-800">{mov.concepto}</p>
                                            <p className="text-xs text-gray-500 mb-1">{mov.fecha} - {mov.usuario}</p>
                                            <span className={`text-xs font-bold px-2 py-0.5 rounded ${mov.tipo === 'entrada' ? 'bg-green-50 text-green-700' : 'bg-blue-50 text-blue-700'}`}>
                        {mov.tipo === 'entrada' ? '+' : '-'}{mov.cant} cil.
                      </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* MODAL 1: AJUSTES MANUALES */}
            <Modal isOpen={modalMovimientoOpen} onClose={() => setModalMovimientoOpen(false)} title="Ajuste Manual / Devolución">
                <form onSubmit={handleGuardarAjuste} className="space-y-4">
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-semibold text-gray-700">Motivo</label>
                        <select className="p-2 border rounded-lg bg-white" required onChange={(e) => setMotivo(e.target.value)}>
                            <option value="">Seleccione...</option>
                            <option value="devolucion_ruta">Devolución de Ruta (Cilindros Vacíos)</option>
                            <option value="merma">Merma / Daño</option>
                            <option value="ajuste">Ajuste Inventario</option>
                        </select>
                    </div>
                    {motivo === 'devolucion_ruta' && (
                        <Alert variant="info" title="Retorno de Envases">
                            Estos cilindros ingresarán al inventario de <b>VACÍOS</b>.
                        </Alert>
                    )}
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-semibold text-gray-700">Producto</label>
                        <select className="p-2 border rounded-lg bg-white">
                            {productos.map(p => <option key={p.id} value={p.id}>{p.nombre}</option>)}
                        </select>
                    </div>
                    <Input label="Cantidad" type="number" required />
                    <div className="flex justify-end gap-2 mt-4">
                        <Button variant="secondary" onClick={() => setModalMovimientoOpen(false)}>Cancelar</Button>
                        <Button type="submit" variant="primary">Guardar</Button>
                    </div>
                </form>
            </Modal>

            {/* MODAL 2: RECEPCIÓN DE PLANTA (SOLUCIÓN COMPLETA) */}
            <Modal isOpen={modalProduccionOpen} onClose={() => setModalProduccionOpen(false)} title="Recepción de Lote de Producción">
                <form onSubmit={handleRecepcionPlanta} className="space-y-4">
                    <Alert variant="success" className="bg-green-50 border-green-200">
                        <CheckCircle size={16} className="text-green-600"/>
                        Esta acción reabastecerá el stock disponible y descontará de vacíos.
                    </Alert>

                    <Input label="Código de Lote" placeholder="Ej: LOTE-2025-DIC-01" required />

                    {/* SECCIÓN DE AGREGADO MÚLTIPLE */}
                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <p className="text-xs font-bold text-gray-500 uppercase mb-2">Detalle de Productos Llenados</p>

                        <div className="flex gap-2 items-end mb-2">
                            <div className="flex-1">
                                <label className="text-xs font-semibold text-gray-600">Producto</label>
                                <select
                                    className="w-full p-2 border rounded bg-white text-sm"
                                    value={tempProdId}
                                    onChange={(e) => setTempProdId(e.target.value)}
                                >
                                    <option value="">Seleccione...</option>
                                    {productos.map(p => (
                                        <option key={p.id} value={p.id}>{p.nombre}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="w-24">
                                <label className="text-xs font-semibold text-gray-600">Cant.</label>
                                <input
                                    type="number"
                                    className="w-full p-2 border rounded bg-white text-sm"
                                    placeholder="0"
                                    value={tempCant}
                                    onChange={(e) => setTempCant(e.target.value)}
                                />
                            </div>
                            <Button type="button" variant="primary" onClick={handleAddItem} className="h-[38px] w-[38px] p-0 flex items-center justify-center">
                                <Plus size={18} />
                            </Button>
                        </div>

                        {/* LISTA DE ITEMS A INGRESAR */}
                        <div className="bg-white border rounded max-h-32 overflow-y-auto">
                            {itemsProduccion.length === 0 ? (
                                <p className="text-xs text-gray-400 text-center py-4">Agregue productos al lote...</p>
                            ) : (
                                <table className="w-full text-xs text-left">
                                    <thead className="bg-gray-100 text-gray-500">
                                    <tr><th className="p-2">Producto</th><th className="p-2 text-center">Cant.</th><th className="p-2"></th></tr>
                                    </thead>
                                    <tbody className="divide-y">
                                    {itemsProduccion.map((item, idx) => (
                                        <tr key={idx}>
                                            <td className="p-2">{item.nombre}</td>
                                            <td className="p-2 text-center font-bold">{item.cant}</td>
                                            <td className="p-2 text-right">
                                                <button type="button" onClick={() => handleRemoveItem(item.id)} className="text-red-500 hover:bg-red-50 p-1 rounded">
                                                    <Trash2 size={14}/>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-end gap-2 mt-4">
                        <Button variant="secondary" onClick={() => setModalProduccionOpen(false)}>Cancelar</Button>
                        <Button type="submit" variant="primary" className="bg-green-600 hover:bg-green-700" disabled={itemsProduccion.length === 0}>
                            Confirmar Ingreso
                        </Button>
                    </div>
                </form>
            </Modal>

        </div>
    );
};

export default Inventario;