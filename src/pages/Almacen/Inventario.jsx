import React, { useState } from 'react';
import { Package, ArrowUpRight, ArrowDownLeft, AlertTriangle, RefreshCcw, Search, Download, FileText, Save, Truck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/Table';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Modal from '../../components/ui/Modal';
import Input from '../../components/ui/Input';
import Alert from '../../components/ui/Alert';

const Inventario = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [modalOpen, setModalOpen] = useState(false);

    // Estado para el formulario
    const [tipoAjuste, setTipoAjuste] = useState('entrada');
    const [motivo, setMotivo] = useState('');

    // DATOS MOCK
    const productos = [
        { id: 'O2-MED-6M3', nombre: 'Oxígeno Medicinal 6m3', tipo: 'Gas', stock: 145, capacidad: 200, vacios: 45, estado: 'optimo' },
        { id: 'O2-IND-10M3', nombre: 'Oxígeno Industrial 10m3', tipo: 'Gas', stock: 28, capacidad: 100, vacios: 60, estado: 'bajo' },
        { id: 'KIT-PORT', nombre: 'Kit Portátil (Mochila)', tipo: 'Equipo', stock: 12, capacidad: 50, vacios: 0, estado: 'critico' },
        { id: 'VAL-REG', nombre: 'Válvula Reguladora', tipo: 'Accesorio', stock: 85, capacidad: 100, vacios: 0, estado: 'optimo' },
    ];

    const movimientos = [
        { id: 1, tipo: 'entrada', concepto: 'Recarga Planta', cant: 50, fecha: '04/12/2025 08:00', usuario: 'Ops. Planta' },
        { id: 2, tipo: 'salida', concepto: 'Despacho Ruta Norte', cant: 30, fecha: '04/12/2025 08:30', usuario: 'J. Pérez' },
        { id: 3, tipo: 'entrada', concepto: 'Devolución Ruta #234', cant: 15, fecha: '03/12/2025 16:45', usuario: 'Juan Chofer' }, // Ejemplo de devolución registrada
    ];

    const handleGuardarAjuste = (e) => {
        e.preventDefault();
        alert("Movimiento registrado. Stock actualizado y trazabilidad guardada en bitácora.");
        setModalOpen(false);
    };

    return (
        <div className="space-y-6">

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Control de Inventario</h2>
                    <p className="text-gray-500">Gestión de stock, ajustes y auditoría</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline"><FileText size={18} /> PDF</Button>
                    <Button variant="outline"><Download size={18} /> Excel</Button>
                    <Button variant="primary" onClick={() => { setMotivo(''); setModalOpen(true); }}>
                        <RefreshCcw size={18} /> Registrar Movimiento
                    </Button>
                </div>
            </div>

            {/* KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="border-l-4 border-l-blue-500">
                    <CardContent className="flex items-center justify-between p-6">
                        <div>
                            <p className="text-sm font-medium text-gray-500 uppercase">Stock Disponible</p>
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
                                        <TableHeader>Vacíos</TableHeader>
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
                                                    <span className="font-bold">{prod.stock}</span>
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
                                                {prod.tipo === 'Gas' ? <span className="text-orange-600 font-medium">{prod.vacios} unid.</span> : <span className="text-gray-300">-</span>}
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
                            <CardTitle className="text-sm uppercase text-gray-500">Auditoría de Movimientos</CardTitle>
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

            {/* MODAL INTELIGENTE (CASO DE USO 14 y 58: DEVOLUCIÓN DE CILINDROS) */}
            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title="Registrar Movimiento / Devolución">
                <form onSubmit={handleGuardarAjuste} className="space-y-4">

                    {/* Selección de Motivo */}
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-semibold text-gray-700">Motivo del Movimiento</label>
                        <select
                            className="p-2 border rounded-lg bg-white"
                            required
                            onChange={(e) => {
                                setMotivo(e.target.value);
                                // Si es devolución, automáticamente es una ENTRADA al almacén
                                if (e.target.value === 'devolucion_ruta') setTipoAjuste('entrada');
                            }}
                        >
                            <option value="">Seleccione...</option>
                            <option value="devolucion_ruta">Devolución de Ruta (Retorno Camión)</option>
                            <option value="ajuste_auditoria">Ajuste por Auditoría</option>
                            <option value="merma">Merma / Daño</option>
                        </select>
                    </div>

                    {/* LÓGICA CONDICIONAL VISUAL: SI ES DEVOLUCIÓN, PIDE LA GUÍA */}
                    {motivo === 'devolucion_ruta' && (
                        <div className="animate-in fade-in slide-in-from-top-2">
                            <Alert variant="info" title="Asociación de Entrega">
                                Ingrese el número de Guía o Ruta para vincular la devolución.
                            </Alert>
                            <div className="mt-2">
                                <Input label="N° Guía de Despacho / Ruta" placeholder="Ej: G-4582" icon={<Truck size={16}/>} />
                            </div>
                        </div>
                    )}

                    {/* Selección de Tipo (Deshabilitado si es devolución porque es fijo Entrada) */}
                    <div className="flex gap-4 mb-2">
                        <label className={`flex items-center gap-2 ${motivo === 'devolucion_ruta' ? 'opacity-100' : 'cursor-pointer'}`}>
                            <input type="radio" name="tipo" checked={tipoAjuste === 'entrada'} onChange={() => setTipoAjuste('entrada')} disabled={motivo === 'devolucion_ruta'} />
                            <span className="text-sm font-bold text-green-700">Entrada (Sumar al Stock)</span>
                        </label>
                        <label className={`flex items-center gap-2 ${motivo === 'devolucion_ruta' ? 'opacity-30' : 'cursor-pointer'}`}>
                            <input type="radio" name="tipo" checked={tipoAjuste === 'salida'} onChange={() => setTipoAjuste('salida')} disabled={motivo === 'devolucion_ruta'} />
                            <span className="text-sm font-bold text-red-700">Salida (Restar del Stock)</span>
                        </label>
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-semibold text-gray-700">Producto / Cilindro</label>
                        <select className="p-2 border rounded-lg bg-white" required>
                            {productos.map(p => (
                                <option key={p.id} value={p.id}>{p.nombre}</option>
                            ))}
                        </select>
                    </div>

                    <Input label="Cantidad (Unidades)" type="number" placeholder="0" required />

                    <div className="flex justify-end gap-2 mt-4">
                        <Button variant="secondary" onClick={() => setModalOpen(false)}>Cancelar</Button>
                        <Button type="submit" variant="primary">
                            <Save size={18}/> {motivo === 'devolucion_ruta' ? 'Confirmar Devolución' : 'Guardar Ajuste'}
                        </Button>
                    </div>
                </form>
            </Modal>

        </div>
    );
};

export default Inventario;