import React, { useState } from 'react';
import { Eye, X, Filter, Download, FileText, Ban, Printer, Upload, DollarSign, PackageCheck, FileX, QrCode, Paperclip } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/Table';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import Input from '../../components/ui/Input';
import Alert from '../../components/ui/Alert';

const ListaPedidos = () => {
    // DATOS MOCK: Ahora soportan 'items' (Array) en lugar de un solo tipo
    // Esto demuestra que el backend soporta pedidos complejos
    const [pedidos, setPedidos] = useState([
        {
            id: 'PED-001',
            cliente: 'Clínica Incor',
            fecha: '04/12/2025',
            items: [{ cant: 5, tipo: 'Cilindro 6m3' }, { cant: 2, tipo: 'Cilindro 10m3' }], // MIXTO
            estado: 'pendiente',
            urgencia: true,
            stockOk: true,
            total: 2400
        },
        {
            id: 'PED-002',
            cliente: 'Hospital Japonés',
            fecha: '04/12/2025',
            items: [{ cant: 50, tipo: 'Cilindro 10m3' }], // SIMPLE
            estado: 'validado',
            urgencia: false,
            stockOk: true,
            total: 6000
        },
        {
            id: 'PED-003',
            cliente: 'Centro Salud Norte',
            fecha: '03/12/2025',
            items: [{ cant: 5, tipo: 'Portátil' }],
            estado: 'facturado',
            urgencia: true,
            stockOk: true,
            total: 500
        },
        {
            id: 'PED-005',
            cliente: 'Industrias Venado',
            fecha: '02/12/2025',
            items: [{ cant: 150, tipo: 'Industrial 10m3' }],
            estado: 'bloqueado',
            urgencia: false,
            stockOk: false,
            total: 18000
        },
    ]);

    const [modalFacturaOpen, setModalFacturaOpen] = useState(false);
    const [modalDocsOpen, setModalDocsOpen] = useState(false);
    const [selectedPedido, setSelectedPedido] = useState(null);

    // --- ACCIONES ---
    const handleAccion = (accion, id) => {
        const pedido = pedidos.find(p => p.id === id);

        if (accion === 'validar') {
            if (confirm(`¿Confirmar reserva de stock para el pedido ${id}?`)) {
                setPedidos(pedidos.map(p => p.id === id ? { ...p, estado: 'validado' } : p));
            }
        }

        if (accion === 'facturar') {
            setSelectedPedido(pedido);
            setModalFacturaOpen(true);
        }

        if (accion === 'ver_detalle') {
            setSelectedPedido(pedido);
            setModalDocsOpen(true);
        }

        if (accion === 'nota_credito') {
            if(confirm(`¿Emitir NOTA DE CRÉDITO para ${id}?`)) {
                alert(`Nota de Crédito generada. Factura anulada.`);
                setPedidos(pedidos.map(p => p.id === id ? { ...p, estado: 'anulado' } : p));
            }
        }

        if (accion === 'cancelar' && confirm("¿Cancelar pedido?")) {
            alert("Pedido Cancelado");
        }
    };

    const handleConfirmarFactura = (e) => {
        e.preventDefault();
        alert(`FACTURA EMITIDA.\nSe ha generado el XML para impuestos.`);
        setPedidos(pedidos.map(p => p.id === selectedPedido.id ? { ...p, estado: 'facturado' } : p));
        setModalFacturaOpen(false);
    };

    const getStatusBadge = (estado, urgencia, stockOk) => {
        if (!stockOk) return <Badge variant="danger">STOCK INSUFICIENTE</Badge>;
        switch (estado) {
            case 'pendiente': return <Badge variant="warning">Por Validar</Badge>;
            case 'validado': return <Badge variant="info">Stock Reservado</Badge>;
            case 'facturado': return <Badge variant="success">Facturado</Badge>;
            case 'anulado': return <Badge variant="danger">Anulado (NC)</Badge>;
            case 'bloqueado': return <Badge variant="danger">Bloqueado</Badge>;
            default: return <Badge>{estado}</Badge>;
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Gestión de Pedidos</h2>
                    <p className="text-gray-500">Bandeja de entrada de solicitudes</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline"><Download size={16}/> Exportar</Button>
                    <Button variant="primary"><Filter size={16}/> Filtrar</Button>
                </div>
            </div>

            <Card>
                <CardHeader><CardTitle>Pedidos Recientes</CardTitle></CardHeader>
                <CardContent>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableHeader>ID Pedido</TableHeader>
                                <TableHeader>Detalle de Productos</TableHeader> {/* CAMBIO DE NOMBRE COLUMNA */}
                                <TableHeader>Cliente</TableHeader>
                                <TableHeader>Total</TableHeader>
                                <TableHeader>Estado</TableHeader>
                                <TableHeader>Acciones</TableHeader>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {pedidos.map((p) => (
                                <TableRow key={p.id} className={!p.stockOk ? "bg-red-50" : ""}>
                                    <TableCell>
                                        <span className="font-mono font-bold text-blue-600">{p.id}</span>
                                        <div className="text-[10px] text-gray-400">{p.fecha}</div>
                                    </TableCell>

                                    {/* CELDA DE ITEMS (SOLUCIÓN VISUAL) */}
                                    <TableCell>
                                        <div className="flex flex-col gap-1">
                                            {p.items.map((item, idx) => (
                                                <div key={idx} className="text-xs bg-gray-100 px-2 py-1 rounded-md w-fit border border-gray-200">
                                                    <span className="font-bold">{item.cant}</span> x {item.tipo}
                                                </div>
                                            ))}
                                            {p.items.length > 1 && (
                                                <span className="text-[10px] text-gray-400 italic">Pedido Mixto</span>
                                            )}
                                        </div>
                                    </TableCell>

                                    <TableCell className="font-medium">{p.cliente}</TableCell>
                                    <TableCell className="font-mono font-bold">{p.total} Bs</TableCell>
                                    <TableCell>{getStatusBadge(p.estado, p.urgencia, p.stockOk)}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-1">
                                            {!p.stockOk && <div className="text-red-600 text-xs font-bold flex gap-1"><Ban size={16}/> Sin Stock</div>}

                                            {p.estado === 'pendiente' && p.stockOk && (
                                                <>
                                                    <button onClick={() => handleAccion('validar', p.id)} className="p-1.5 bg-green-100 text-green-700 rounded hover:bg-green-200" title="Validar Stock"><PackageCheck size={16} /></button>
                                                    <button onClick={() => handleAccion('cancelar', p.id)} className="p-1.5 bg-red-100 text-red-700 rounded hover:bg-red-200"><X size={16} /></button>
                                                </>
                                            )}

                                            {p.estado === 'validado' && (
                                                <button onClick={() => handleAccion('facturar', p.id)} className="flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-bold hover:bg-blue-200">
                                                    <DollarSign size={14}/> Facturar
                                                </button>
                                            )}

                                            {p.estado === 'facturado' && (
                                                <button onClick={() => handleAccion('nota_credito', p.id)} className="p-1.5 text-red-500 hover:bg-red-50 rounded border border-red-100" title="Nota de Crédito"><FileX size={16}/></button>
                                            )}

                                            <button onClick={() => handleAccion('ver_detalle', p.id)} className="p-1.5 text-gray-400 hover:text-blue-600 ml-1"><Eye size={18} /></button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* MODAL FACTURACIÓN */}
            <Modal isOpen={modalFacturaOpen} onClose={() => setModalFacturaOpen(false)} title={`Emitir Factura: ${selectedPedido?.id}`}>
                <form onSubmit={handleConfirmarFactura} className="space-y-4">
                    <div className="bg-slate-50 p-4 rounded-lg border flex justify-between items-center text-sm">
                        <p className="font-bold text-lg">Total a Facturar: {selectedPedido?.total} Bs</p>
                        <QrCode size={40} className="text-gray-800"/>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <Input label="Razón Social" defaultValue={selectedPedido?.cliente} />
                        <Input label="NIT / CI" defaultValue="102030444" />
                    </div>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center bg-gray-50">
                        <Upload className="mx-auto text-gray-400 mb-2" />
                        <p className="text-sm font-bold text-gray-600">Adjuntar Comprobante de Pago</p>
                        <button type="button" className="mt-2 text-xs text-blue-600 underline">Seleccionar Archivo</button>
                    </div>
                    <div className="flex justify-end gap-2 mt-4">
                        <Button variant="secondary" onClick={() => setModalFacturaOpen(false)}>Cancelar</Button>
                        <Button type="submit" variant="primary"><Printer size={18}/> Emitir y Asociar</Button>
                    </div>
                </form>
            </Modal>

            {/* MODAL DOCUMENTOS */}
            <Modal isOpen={modalDocsOpen} onClose={() => setModalDocsOpen(false)} title={`Detalle: ${selectedPedido?.id}`}>
                <div className="space-y-4">
                    <h4 className="font-bold text-sm text-gray-700">Ítems del Pedido:</h4>
                    <div className="bg-gray-50 p-3 rounded border">
                        <ul className="list-disc list-inside text-sm">
                            {selectedPedido?.items?.map((it, i) => (
                                <li key={i}>{it.cant} unidades de <strong>{it.tipo}</strong></li>
                            ))}
                        </ul>
                    </div>

                    <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 mt-4">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-100 text-blue-600 rounded"><FileText size={20}/></div>
                            <div>
                                <p className="text-sm font-bold text-gray-800">Orden de Compra</p>
                                <p className="text-xs text-gray-500">OC-Generada-Sistema.pdf</p>
                            </div>
                        </div>
                        <Button variant="outline" className="h-8 text-xs"><Download size={14} className="mr-1"/> Descargar</Button>
                    </div>

                    <div className="flex justify-end pt-2">
                        <Button variant="secondary" onClick={() => setModalDocsOpen(false)}>Cerrar</Button>
                    </div>
                </div>
            </Modal>

        </div>
    );
};

export default ListaPedidos;