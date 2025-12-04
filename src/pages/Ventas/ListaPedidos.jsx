import React from 'react';
import { Eye, Check, X, Filter, Download } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card.jsx';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/Table.jsx';
import Badge from '../../components/ui/Badge.jsx';
import Button from '../../components/ui/Button.jsx';

const ListaPedidos = () => {

    // Datos MOCK (Falsos) para la presentación
    const pedidos = [
        { id: 'PED-001', cliente: 'Clínica Incor', fecha: '04/12/2025', cant: 20, tipo: 'Cilindro 6m3', estado: 'pendiente', urgencia: true },
        { id: 'PED-002', cliente: 'Hospital Japonés', fecha: '04/12/2025', cant: 50, tipo: 'Cilindro 10m3', estado: 'validado', urgencia: false },
        { id: 'PED-003', cliente: 'Centro Salud Norte', fecha: '03/12/2025', cant: 5, tipo: 'Portátil', estado: 'en-ruta', urgencia: true },
        { id: 'PED-004', cliente: 'Particular - Juan Perez', fecha: '03/12/2025', cant: 2, tipo: 'Cilindro 6m3', estado: 'entregado', urgencia: false },
        { id: 'PED-005', cliente: 'Industrias Venado', fecha: '02/12/2025', cant: 15, tipo: 'Industrial', estado: 'rechazado', urgencia: false },
    ];

    // Función auxiliar para elegir el color del Badge según el estado
    const getStatusBadge = (estado, urgencia) => {
        if (urgencia && estado !== 'entregado' && estado !== 'rechazado') {
            return <Badge variant="danger">URGENTE</Badge>;
        }
        switch (estado) {
            case 'pendiente': return <Badge variant="warning">Por Validar</Badge>;
            case 'validado': return <Badge variant="info">Listo p/ Despacho</Badge>;
            case 'en-ruta': return <Badge variant="info">En Camino</Badge>;
            case 'entregado': return <Badge variant="success">Entregado</Badge>;
            case 'rechazado': return <Badge variant="danger">Rechazado</Badge>;
            default: return <Badge>{estado}</Badge>;
        }
    };

    return (
        <div className="space-y-6">

            {/* Header con acciones principales */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Gestión de Pedidos</h2>
                    <p className="text-gray-500">Validación y seguimiento de solicitudes</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline"><Download size={16}/> Exportar</Button>
                    <Button variant="primary"><Filter size={16}/> Filtrar</Button>
                </div>
            </div>

            {/* Tabla Principal */}
            <Card>
                <CardHeader className="border-b-0 pb-0">
                    <CardTitle>Listado General</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableHeader>N° Pedido</TableHeader>
                                <TableHeader>Cliente</TableHeader>
                                <TableHeader>Producto / Cant.</TableHeader>
                                <TableHeader>Prioridad / Estado</TableHeader>
                                <TableHeader>Fecha</TableHeader>
                                <TableHeader>Acciones</TableHeader>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {pedidos.map((pedido) => (
                                <TableRow key={pedido.id}>
                                    <TableCell className="font-medium text-gray-900">{pedido.id}</TableCell>
                                    <TableCell>
                                        <div className="font-bold">{pedido.cliente}</div>
                                        <div className="text-xs text-gray-400">NIT: 345345001</div>
                                    </TableCell>
                                    <TableCell>
                                        {pedido.cant} x {pedido.tipo}
                                    </TableCell>
                                    <TableCell>
                                        {getStatusBadge(pedido.estado, pedido.urgencia)}
                                    </TableCell>
                                    <TableCell>{pedido.fecha}</TableCell>
                                    <TableCell>
                                        <div className="flex gap-2">
                                            {/* Solo mostramos botones de acción si está pendiente */}
                                            {pedido.estado === 'pendiente' ? (
                                                <>
                                                    <button className="p-1 text-green-600 hover:bg-green-50 rounded" title="Aprobar">
                                                        <Check size={18} />
                                                    </button>
                                                    <button className="p-1 text-red-600 hover:bg-red-50 rounded" title="Rechazar">
                                                        <X size={18} />
                                                    </button>
                                                </>
                                            ) : (
                                                <span className="text-xs text-gray-400 italic">Procesado</span>
                                            )}

                                            <button className="p-1 text-blue-600 hover:bg-blue-50 rounded ml-2" title="Ver Detalles">
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