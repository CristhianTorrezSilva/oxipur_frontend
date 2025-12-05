import React, { useState } from 'react';
import { Eye, Check, X, Filter, Download, FileText, Copy, Ban, Printer, Upload, DollarSign, PackageCheck } from 'lucide-react'; // Agregué PackageCheck
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/Table';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import Input from '../../components/ui/Input';
import Alert from '../../components/ui/Alert';

const ListaPedidos = () => {
    // Estado inicial de pedidos
    const [pedidos, setPedidos] = useState([
        { id: 'PED-001', cliente: 'Clínica Incor', fecha: '04/12/2025', cant: 20, tipo: 'Cilindro 6m3', estado: 'pendiente', urgencia: true, stockOk: true },
        { id: 'PED-002', cliente: 'Hospital Japonés', fecha: '04/12/2025', cant: 50, tipo: 'Cilindro 10m3', estado: 'validado', urgencia: false, stockOk: true },
        { id: 'PED-003', cliente: 'Centro Salud Norte', fecha: '03/12/2025', cant: 5, tipo: 'Portátil', estado: 'facturado', urgencia: true, stockOk: true },
        { id: 'PED-005', cliente: 'Industrias Venado', fecha: '02/12/2025', cant: 150, tipo: 'Industrial', estado: 'bloqueado', urgencia: false, stockOk: false },
    ]);

    const [modalFacturaOpen, setModalFacturaOpen] = useState(false);
    const [selectedPedido, setSelectedPedido] = useState(null);

    // Simulaciones de acciones
    const handleAccion = (accion, id) => {
        // CASO DE USO: RESERVAR STOCK PARA PEDIDO
        if (accion === 'validar') {
            // Simulamos el proceso del sistema descrito en el documento
            const confirmacion = confirm(`¿Confirmar reserva de stock para el pedido ${id}? \n\nEl sistema marcará las cantidades como reservadas en almacén.`);
            if (confirmacion) {
                // Actualizamos el estado visualmente
                const nuevosPedidos = pedidos.map(p =>
                    p.id === id ? { ...p, estado: 'validado' } : p
                );
                setPedidos(nuevosPedidos);
                alert("¡Éxito! Stock reservado y pedido validado para despacho.");
            }
        }

        if (accion === 'facturar') {
            setSelectedPedido(id);
            setModalFacturaOpen(true);
        }
        if (accion === 'duplicar') alert(`Pedido ${id} duplicado con éxito.`);
        if (accion === 'cancelar' && confirm("¿Cancelar pedido? Se liberará el stock reservado.")) { // Ajuste en texto
            alert("Pedido Cancelado y Stock Liberado");
        }
    };

    const handleConfirmarFactura = (e) => {
        e.preventDefault();
        alert(`Factura generada y comprobante asociado al pedido ${selectedPedido}`);
        setModalFacturaOpen(false);
    };

    const getStatusBadge = (estado, urgencia, stockOk) => {
        if (!stockOk) return <Badge variant="danger">STOCK INSUFICIENTE</Badge>;
        if (urgencia && estado !== 'entregado' && estado !== 'facturado') return <Badge variant="danger">URGENTE</Badge>;

        switch (estado) {
            case 'pendiente': return <Badge variant="warning">Por Validar</Badge>;
            case 'validado': return <Badge variant="info">Stock Reservado</Badge>; // CAMBIO VISUAL CLAVE
            case 'facturado': return <Badge variant="success">Facturado</Badge>;
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
                            <TableRow>
                                <TableHeader>Pedido</TableHeader>
                                <TableHeader>Cliente</TableHeader>
                                <TableHeader>Estado</TableHeader>
                                <TableHeader>Acciones</TableHeader>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {pedidos.map((p) => (
                                <TableRow key={p.id} className={!p.stockOk ? "bg-red-50" : ""}>
                                    <TableCell>
                                        <span className="font-mono font-bold">{p.id}</span>
                                        <div className="text-xs text-gray-500">{p.cant} x {p.tipo}</div>
                                    </TableCell>
                                    <TableCell>{p.cliente}</TableCell>
                                    <TableCell>{getStatusBadge(p.estado, p.urgencia, p.stockOk)}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-1">
                                            {!p.stockOk && <div className="text-red-600 text-xs font-bold flex gap-1"><Ban size={16}/> Sin Stock</div>}

                                            {/* BOTÓN DE VALIDAR / RESERVAR STOCK */}
                                            {p.estado === 'pendiente' && p.stockOk && (
                                                <>
                                                    <button
                                                        onClick={() => handleAccion('validar', p.id)}
                                                        className="p-1.5 bg-green-100 text-green-700 rounded hover:bg-green-200 transition-colors"
                                                        title="Validar y Reservar Stock" // Tooltip Clave
                                                    >
                                                        <PackageCheck size={16} /> {/* Icono cambiado para representar Stock */}
                                                    </button>
                                                    <button onClick={() => handleAccion('cancelar', p.id)} className="p-1.5 bg-red-100 text-red-700 rounded hover:bg-red-200"><X size={16} /></button>
                                                </>
                                            )}

                                            {p.estado === 'validado' && (
                                                <>
                                                    <button onClick={() => handleAccion('facturar', p.id)} className="flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-bold hover:bg-blue-200">
                                                        <DollarSign size={14}/> Facturar
                                                    </button>
                                                    <button onClick={() => handleAccion('duplicar', p.id)} className="p-1.5 text-gray-500 hover:bg-gray-100 rounded"><Copy size={16} /></button>
                                                </>
                                            )}

                                            <button className="p-1.5 text-gray-400 hover:text-blue-600 ml-1"><Eye size={18} /></button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* MODAL FACTURACIÓN */}
            <Modal isOpen={modalFacturaOpen} onClose={() => setModalFacturaOpen(false)} title={`Facturación: ${selectedPedido}`}>
                <form onSubmit={handleConfirmarFactura} className="space-y-4">
                    <Alert variant="info" title="Información Fiscal">
                        Se generará la Factura N° 9901 y se enviará al SIN.
                    </Alert>
                    <div className="grid grid-cols-2 gap-4">
                        <Input label="Razón Social" defaultValue="Hospital Japonés" />
                        <Input label="NIT" defaultValue="102030444" />
                    </div>

                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center bg-gray-50">
                        <Upload className="mx-auto text-gray-400 mb-2" />
                        <p className="text-sm font-bold text-gray-600">Adjuntar Comprobante de Pago / Voucher</p>
                        <p className="text-xs text-gray-400">Transferencia Bancaria o Cheque</p>
                        <button type="button" className="mt-2 text-xs text-blue-600 underline">Seleccionar Archivo</button>
                    </div>

                    <div className="flex justify-end gap-2 mt-4">
                        <Button variant="secondary" onClick={() => setModalFacturaOpen(false)}>Cancelar</Button>
                        <Button type="submit" variant="primary"><Printer size={18}/> Emitir y Asociar</Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default ListaPedidos;