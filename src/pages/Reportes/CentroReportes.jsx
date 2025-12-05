import React, { useState } from 'react';
import { Download, Printer, Search, FileText, Truck, Clock, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/Table';
import Button from '../../components/ui/Button';

const CentroReportes = () => {
    const [activeTab, setActiveTab] = useState('ventas'); // 'ventas', 'logistica', 'pendientes'

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Centro de Reportes</h2>
                    <p className="text-gray-500">Generación de informes estratégicos y operativos</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline"><Printer size={18} /> Imprimir</Button>
                    <Button variant="primary"><Download size={18} /> Exportar Excel</Button>
                </div>
            </div>

            {/* TABS DE NAVEGACIÓN (CASOS DE USO 34-38) */}
            <div className="flex gap-2 border-b border-gray-200 pb-1 overflow-x-auto">
                {[
                    { id: 'ventas', label: 'Ventas y Facturación', icon: <FileText size={16}/> },
                    { id: 'logistica', label: 'Logística y Entregas', icon: <Truck size={16}/> },
                    { id: 'pendientes', label: 'Pedidos Pendientes', icon: <Clock size={16}/> },
                    { id: 'reclamos', label: 'Reclamos Atendidos', icon: <CheckCircle size={16}/> },
                ].map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`
                    flex items-center gap-2 px-4 py-2 text-sm font-bold rounded-t-lg transition-colors
                    ${activeTab === tab.id ? 'bg-white border border-b-0 border-gray-200 text-blue-600' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'}
                `}
                    >
                        {tab.icon} {tab.label}
                    </button>
                ))}
            </div>

            <Card>
                <CardHeader className="flex flex-row justify-between items-center bg-gray-50/50">
                    <CardTitle className="capitalize">Reporte de {activeTab}</CardTitle>
                    <div className="relative w-64">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                        <input placeholder="Filtrar datos..." className="pl-8 h-9 w-full rounded-md border bg-white text-sm" />
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        {/* CONTENIDO DINÁMICO SEGÚN EL TAB SELECCIONADO */}

                        {activeTab === 'ventas' && (
                            <>
                                <TableHead><TableRow><TableHeader>Fecha</TableHeader><TableHeader>N° Factura</TableHeader><TableHeader>Cliente</TableHeader><TableHeader className="text-right">Total (Bs)</TableHeader></TableRow></TableHead>
                                <TableBody>
                                    <TableRow><TableCell>04/12/2025</TableCell><TableCell>FC-001</TableCell><TableCell>Clínica Incor</TableCell><TableCell className="text-right font-bold">1,200.00</TableCell></TableRow>
                                    <TableRow><TableCell>04/12/2025</TableCell><TableCell>FC-002</TableCell><TableCell>Juan Perez</TableCell><TableCell className="text-right font-bold">850.00</TableCell></TableRow>
                                </TableBody>
                            </>
                        )}

                        {activeTab === 'logistica' && (
                            <>
                                <TableHead><TableRow><TableHeader>Ruta</TableHeader><TableHeader>Vehículo</TableHeader><TableHeader>Chofer</TableHeader><TableHeader>Eficacia</TableHeader></TableRow></TableHead>
                                <TableBody>
                                    <TableRow><TableCell>Norte-01</TableCell><TableCell>Nissan Atlas</TableCell><TableCell>Juan Perez</TableCell><TableCell><span className="text-green-600 font-bold">100% (5/5)</span></TableCell></TableRow>
                                    <TableRow><TableCell>Sur-02</TableCell><TableCell>Toyota Dyna</TableCell><TableCell>Carlos M.</TableCell><TableCell><span className="text-orange-600 font-bold">80% (4/5)</span></TableCell></TableRow>
                                </TableBody>
                            </>
                        )}

                        {activeTab === 'pendientes' && (
                            <>
                                <TableHead><TableRow><TableHeader>Pedido</TableHeader><TableHeader>Cliente</TableHeader><TableHeader>Días Retraso</TableHeader><TableHeader>Motivo</TableHeader></TableRow></TableHead>
                                <TableBody>
                                    <TableRow><TableCell>PED-099</TableCell><TableCell>Hospital Obrero</TableCell><TableCell className="text-red-600 font-bold">2 días</TableCell><TableCell>Falta Stock</TableCell></TableRow>
                                    <TableRow><TableCell>PED-101</TableCell><TableCell>Consultorio Sur</TableCell><TableCell className="text-yellow-600 font-bold">1 día</TableCell><TableCell>Por Validar</TableCell></TableRow>
                                </TableBody>
                            </>
                        )}

                        {activeTab === 'reclamos' && (
                            <>
                                <TableHead><TableRow><TableHeader>Ticket</TableHeader><TableHeader>Tipo</TableHeader><TableHeader>Resolución</TableHeader><TableHeader>Tiempo</TableHeader></TableRow></TableHead>
                                <TableBody>
                                    <TableRow><TableCell>REC-001</TableCell><TableCell>Fuga Gas</TableCell><TableCell>Cambio Inmediato</TableCell><TableCell>2 horas</TableCell></TableRow>
                                    <TableRow><TableCell>REC-005</TableCell><TableCell>Demora</TableCell><TableCell>Descuento Nota Crédito</TableCell><TableCell>24 horas</TableCell></TableRow>
                                </TableBody>
                            </>
                        )}

                    </Table>
                </CardContent>
            </Card>
        </div>
    );
};

export default CentroReportes;