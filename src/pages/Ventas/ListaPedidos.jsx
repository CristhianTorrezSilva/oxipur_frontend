import React, { useState } from 'react';
import { Eye, Check, X, Filter, Download, FileText, Copy, AlertCircle, Ban, Printer } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/Table';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Alert from '../../components/ui/Alert';

const ListaPedidos = () => {
    const [pedidos, setPedidos] = useState([
        { id: 'PED-001', cliente: 'Clínica Incor', fecha: '04/12/2025', cant: 20, tipo: 'Cilindro 6m3', estado: 'pendiente', urgencia: true, stockOk: true },
        { id: 'PED-002', cliente: 'Hospital Japonés', fecha: '04/12/2025', cant: 50, tipo: 'Cilindro 10m3', estado: 'validado', urgencia: false, stockOk: true },
        { id: 'PED-003', cliente: 'Centro Salud Norte', fecha: '03/12/2025', cant: 5, tipo: 'Portátil', estado: 'facturado', urgencia: true, stockOk: true },
        { id: 'PED-005', cliente: 'Industrias Venado', fecha: '02/12/2025', cant: 150, tipo: 'Industrial', estado: 'bloqueado', urgencia: false, stockOk: false }, // CASO FALTA STOCK
    ]);

    // Simulaciones de acciones
    const handleAccion = (accion, id) => {
        if (accion === 'facturar') alert(`Generando Factura Electrónica para ${id}...`);
        if (accion === 'duplicar') alert(`Pedido ${id} duplicado con éxito. Se ha creado PED-NEW.`);
        if (accion === 'cancelar') {
            if(confirm("¿Seguro que desea cancelar este pedido antes del despacho?")) {
                alert("Pedido Cancelado");
            }
        }
    };

    const getStatusBadge = (estado, urgencia, stockOk) => {
        if (!stockOk) return <Badge variant="danger">STOCK INSUFICIENTE</Badge>;
        if (urgencia && estado !== 'entregado' && estado !== 'facturado') return <Badge variant="danger">URGENTE</Badge>;

        switch (estado) {
            case 'pendiente': return <Badge variant="warning">Por Validar</Badge>;
            case 'validado': return <Badge variant="info">Listo p/ Despacho</Badge>;
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
                    <p className="text-gray-500">Validación, facturación y seguimiento</p>
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
                                <TableHeader>Acciones Rápidas</TableHeader>
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

                                            {/* ACCIONES VARIABLES SEGÚN ESTADO */}

                                            {/* Caso 1: Falta Stock (Bloqueado) */}
                                            {!p.stockOk && (
                                                <div className="flex items-center text-red-600 text-xs font-bold gap-1">
                                                    <Ban size={16}/> Esperando Stock
                                                </div>
                                            )}

                                            {/* Caso 2: Pendiente (Validar / Editar / Cancelar) */}
                                            {p.estado === 'pendiente' && p.stockOk && (
                                                <>
                                                    <button onClick={() => handleAccion('validar', p.id)} className="p-1.5 bg-green-100 text-green-700 rounded hover:bg-green-200" title="Validar Pedido">
                                                        <Check size={16} />
                                                    </button>
                                                    <button onClick={() => handleAccion('cancelar', p.id)} className="p-1.5 bg-red-100 text-red-700 rounded hover:bg-red-200" title="Cancelar Pedido">
                                                        <X size={16} />
                                                    </button>
                                                    <button className="p-1.5 text-gray-500 hover:bg-gray-100 rounded" title="Editar Pedido">
                                                        <FileText size={16} />
                                                    </button>
                                                </>
                                            )}

                                            {/* Caso 3: Validado (Facturar / Duplicar) */}
                                            {p.estado === 'validado' && (
                                                <>
                                                    <button onClick={() => handleAccion('facturar', p.id)} className="flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-bold hover:bg-blue-200">
                                                        <Printer size={14}/> Facturar
                                                    </button>
                                                    <button onClick={() => handleAccion('duplicar', p.id)} className="p-1.5 text-gray-500 hover:bg-gray-100 rounded" title="Duplicar Pedido">
                                                        <Copy size={16} />
                                                    </button>
                                                </>
                                            )}

                                            {/* Botón Ver Detalle (Siempre visible) */}
                                            <button className="p-1.5 text-gray-400 hover:text-blue-600 ml-1">
                                                <Eye size={18} />
                                            </button>

                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
};

export default ListaPedidos;