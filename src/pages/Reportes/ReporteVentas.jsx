import React from 'react';
import { Download, Printer, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/Table';
import Button from '../../components/ui/Button';

const ReporteVentas = () => {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Reporte Detallado de Ventas</h2>
                    <p className="text-gray-500">Histórico de transacciones y facturación</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline"><Printer size={18} /> Imprimir</Button>
                    <Button variant="primary"><Download size={18} /> Exportar Excel</Button>
                </div>
            </div>

            <Card>
                <CardHeader className="flex flex-row justify-between items-center">
                    <CardTitle>Transacciones de Diciembre</CardTitle>
                    <div className="relative w-64">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                        <input placeholder="Filtrar reporte..." className="pl-8 h-9 w-full rounded-md border border-gray-300 bg-white px-3 py-1 text-sm shadow-sm transition-colors focus:outline-none focus:ring-1 focus:ring-blue-500" />
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableHeader>Fecha</TableHeader>
                                <TableHeader>N° Doc</TableHeader>
                                <TableHeader>Cliente</TableHeader>
                                <TableHeader>Producto</TableHeader>
                                <TableHeader className="text-right">Cantidad</TableHeader>
                                <TableHeader className="text-right">Total (Bs)</TableHeader>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>04/12/2025</TableCell>
                                <TableCell className="font-mono">FC-00123</TableCell>
                                <TableCell>Clínica Incor</TableCell>
                                <TableCell>Oxígeno Med. 6m3</TableCell>
                                <TableCell className="text-right">10</TableCell>
                                <TableCell className="text-right font-bold">1,200.00</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>04/12/2025</TableCell>
                                <TableCell className="font-mono">FC-00124</TableCell>
                                <TableCell>Juan Pérez (Particular)</TableCell>
                                <TableCell>Kit Portátil</TableCell>
                                <TableCell className="text-right">1</TableCell>
                                <TableCell className="text-right font-bold">850.00</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>03/12/2025</TableCell>
                                <TableCell className="font-mono">FC-00122</TableCell>
                                <TableCell>Hospital Japonés</TableCell>
                                <TableCell>Oxígeno Ind. 10m3</TableCell>
                                <TableCell className="text-right">25</TableCell>
                                <TableCell className="text-right font-bold">3,750.00</TableCell>
                            </TableRow>
                            {/* Fila de Total */}
                            <TableRow className="bg-gray-50 border-t-2 border-gray-200">
                                <TableCell colSpan={4} className="text-right font-bold uppercase text-gray-600">Total Periodo:</TableCell>
                                <TableCell className="text-right font-bold text-gray-800">36</TableCell>
                                <TableCell className="text-right font-bold text-blue-700 text-lg">Bs 5,800.00</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
};

export default ReporteVentas;