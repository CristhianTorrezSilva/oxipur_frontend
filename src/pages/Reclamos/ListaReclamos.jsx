import React from 'react';
import { Eye, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/Table';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';

const ListaReclamos = () => {
    // Datos simulados de reclamos anteriores
    const reclamos = [
        { id: 'REC-001', cliente: 'Clínica Incor', tipo: 'Fuga de Gas', fecha: '04/12/2025', estado: 'pendiente', prioridad: 'alta' },
        { id: 'REC-002', cliente: 'Particular - Ana Soria', tipo: 'Demora Entrega', fecha: '03/12/2025', estado: 'resuelto', prioridad: 'baja' },
        { id: 'REC-003', cliente: 'Hospital Obrero', tipo: 'Producto Defectuoso', fecha: '02/12/2025', estado: 'en-proceso', prioridad: 'media' },
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Bandeja de Reclamos</h2>
                    <p className="text-gray-500">Seguimiento de casos abiertos</p>
                </div>
                <Button variant="outline"><Filter size={16} /> Filtrar</Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Historial de Casos</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableHeader>Ticket</TableHeader>
                                <TableHeader>Cliente</TableHeader>
                                <TableHeader>Incidencia</TableHeader>
                                <TableHeader>Fecha</TableHeader>
                                <TableHeader>Estado</TableHeader>
                                <TableHeader>Acción</TableHeader>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {reclamos.map((rec) => (
                                <TableRow key={rec.id}>
                                    <TableCell className="font-mono text-gray-500">{rec.id}</TableCell>
                                    <TableCell className="font-medium">{rec.cliente}</TableCell>
                                    <TableCell>
                                        {rec.prioridad === 'alta' && <span className="text-red-500 font-bold mr-2">!</span>}
                                        {rec.tipo}
                                    </TableCell>
                                    <TableCell>{rec.fecha}</TableCell>
                                    <TableCell>
                                        {rec.estado === 'pendiente' && <Badge variant="danger">Pendiente</Badge>}
                                        {rec.estado === 'resuelto' && <Badge variant="success">Resuelto</Badge>}
                                        {rec.estado === 'en-proceso' && <Badge variant="warning">En Revisión</Badge>}
                                    </TableCell>
                                    <TableCell>
                                        <button className="text-blue-600 hover:bg-blue-50 p-2 rounded">
                                            <Eye size={18} />
                                        </button>
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

export default ListaReclamos;