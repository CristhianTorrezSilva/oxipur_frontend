import React, { useState } from 'react';
import { Eye, Check, X, Filter, Download, FileText, Copy, Ban, Printer, Upload, DollarSign, PackageCheck, FileX, QrCode, Paperclip } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/Table';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import Input from '../../components/ui/Input';
import Alert from '../../components/ui/Alert';

const ListaPedidos = () => {
    // Estado inicial
    const [pedidos, setPedidos] = useState([
        { id: 'PED-001', cliente: 'Clínica Incor', fecha: '04/12/2025', cant: 20, tipo: 'Cilindro 6m3', estado: 'pendiente', urgencia: true, stockOk: true, total: 2400 },
        { id: 'PED-002', cliente: 'Hospital Japonés', fecha: '04/12/2025', cant: 50, tipo: 'Cilindro 10m3', estado: 'validado', urgencia: false, stockOk: true, total: 6000 },
        { id: 'PED-003', cliente: 'Centro Salud Norte', fecha: '03/12/2025', cant: 5, tipo: 'Portátil', estado: 'facturado', urgencia: true, stockOk: true, total: 500 },
        { id: 'PED-005', cliente: 'Industrias Venado', fecha: '02/12/2025', cant: 150, tipo: 'Industrial', estado: 'bloqueado', urgencia: false, stockOk: false, total: 18000 },
    ]);

    // Estados Modales
    const [modalFacturaOpen, setModalFacturaOpen] = useState(false);
    const [modalDocsOpen, setModalDocsOpen] = useState(false); // NUEVO: Modal para ver documentos
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

        // CASO DE USO 41: DESCARGAR / VER DOCUMENTOS
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
        alert(`FACTURA Y COMPROBANTE ASOCIADOS.\n\nEl sistema ha vinculado el archivo subido al pedido ${selectedPedido.id}.`);
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
                    <p className="text-gray-500">Validación, reserva de stock y facturación</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline"><Download size={16}/> Reporte</Button>
                    <Button variant="primary"><Filter size={16}/> Filtrar</Button>
                </div>
            </div>

            <Card>
                <CardHeader><CardTitle>Bandeja de Entrada</CardTitle></CardHeader>
                <CardContent>
                    <Table>
                        <TableHead>
                            <TableRow><TableHeader>Pedido</TableHeader><TableHeader>Cliente</TableHeader><TableHeader>Total (Bs)</TableHeader><TableHeader>Estado</TableHeader><TableHeader>Acciones</TableHeader></TableRow>
                        </TableHead>
                        <TableBody>
                            {pedidos.map((p) => (
                                <TableRow key={p.id} className={!p.stockOk ? "bg-red-50" : ""}>
                                    <TableCell><span className="font-mono font-bold">{p.id}</span><div className="text-xs text-gray-500">{p.cant} x {p.tipo}</div></TableCell>
                                    <TableCell>{p.cliente}</TableCell>
                                    <TableCell className="font-mono font-bold">{p.total}</TableCell>
                                    <TableCell>{getStatusBadge(p.estado, p.urgencia, p.stockOk)}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-1">
                                            {!p.stockOk && <div className="text-red-600 text-xs font-bold flex gap-1"><Ban size={16}/> Sin Stock</div>}

                                            {p.estado === 'pendiente' && p.stockOk && (
                                                <>
                                                    <button onClick={() => handleAccion('validar', p.id)} className="p-1.5 bg-green-100 text-green-700 rounded hover:bg-green-200"><PackageCheck size={16} /></button>
                                                    <button onClick={() => handleAccion('cancelar', p.id)} className="p-1.5 bg-red-100 text-red-700 rounded hover:bg-red-200"><X size={16} /></button>
                                                </>
                                            )}

                                            {p.estado === 'validado' && (
                                                <button onClick={() => handleAccion('facturar', p.id)} className="flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-bold hover:bg-blue-200">
                                                    <DollarSign size={14}/> Facturar
                                                </button>
                                            )}

                                            {p.estado === 'facturado' && (
                                                <button onClick={() => handleAccion('nota_credito', p.id)} className="p-1.5 text-red-500 hover:bg-red-50 rounded border border-red-100" title="Emitir Nota de Crédito"><FileX size={16}/></button>
                                            )}

                                            {/* BOTÓN OJO: VER Y DESCARGAR DOCUMENTOS */}
                                            <button onClick={() => handleAccion('ver_detalle', p.id)} className="p-1.5 text-gray-400 hover:text-blue-600 ml-1"><Eye size={18} /></button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* MODAL FACTURACIÓN (ASOCIAR COMPROBANTE) */}
            <Modal isOpen={modalFacturaOpen} onClose={() => setModalFacturaOpen(false)} title={`Emitir Factura: ${selectedPedido?.id}`}>
                <form onSubmit={handleConfirmarFactura} className="space-y-4">
                    <div className="bg-slate-50 p-4 rounded-lg border flex justify-between items-center text-sm">
                        <p className="flex justify-between w-32"><span>Subtotal:</span> <span>{(selectedPedido?.total * 0.87).toFixed(2)}</span></p>
                        <p className="flex justify-between w-32 text-gray-500"><span>IVA (13%):</span> <span>{(selectedPedido?.total * 0.13).toFixed(2)}</span></p>
                        <p className="flex justify-between w-32 font-bold text-lg"><span>Total:</span> <span>{selectedPedido?.total}</span></p>
                        <QrCode size={40} className="text-gray-800"/>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <Input label="Razón Social" defaultValue={selectedPedido?.cliente} />
                        <Input label="NIT / CI" defaultValue="102030444" />
                    </div>
                    {/* AQUÍ SE CUMPLE "SELECCIONAR COMPROBANTE" */}
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

            {/* MODAL VISUALIZACIÓN (CASO DE USO 41: DESCARGAR) */}
            <Modal isOpen={modalDocsOpen} onClose={() => setModalDocsOpen(false)} title={`Expediente: ${selectedPedido?.id}`}>
                <div className="space-y-4">
                    <Alert variant="info" title="Trazabilidad Documental">
                        Documentos asociados y validados por el sistema.
                    </Alert>

                    <div className="space-y-2">
                        {/* Documento 1: Factura */}
                        <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-100 text-blue-600 rounded"><FileText size={20}/></div>
                                <div>
                                    <p className="text-sm font-bold text-gray-800">Factura Electrónica</p>
                                    <p className="text-xs text-gray-500">FC-{selectedPedido?.id}-001.pdf</p>
                                </div>
                            </div>
                            <Button variant="outline" className="h-8 text-xs"><Download size={14} className="mr-1"/> Descargar</Button>
                        </div>

                        {/* Documento 2: Comprobante (Si está facturado) */}
                        {selectedPedido?.estado === 'facturado' ? (
                            <div className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-green-100 text-green-600 rounded"><Paperclip size={20}/></div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-800">Comprobante de Pago</p>
                                        <p className="text-xs text-gray-500">vaucher_banco.jpg (Asociado)</p>
                                    </div>
                                </div>
                                <Button variant="outline" className="h-8 text-xs"><Download size={14} className="mr-1"/> Descargar</Button>
                            </div>
                        ) : (
                            <p className="text-xs text-center text-gray-400 italic">Sin comprobante de pago asociado aún.</p>
                        )}
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