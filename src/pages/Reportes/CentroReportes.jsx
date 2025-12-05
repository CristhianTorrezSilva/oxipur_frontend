import React, { useState } from 'react';
import { Download, Printer, Search, FileText, Truck, Clock, CheckCircle, TrendingUp, ThumbsUp, AlertCircle, BarChart2, MapPin, Percent } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/Table';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

const CentroReportes = () => {
    const [activeTab, setActiveTab] = useState('ventas'); // 'ventas', 'logistica', 'pendientes', 'reclamos'

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Centro de Reportes</h2>
                    <p className="text-gray-500">Generación de informes estratégicos y operativos</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline"><Printer size={18} /> Imprimir Reporte</Button>
                    <Button variant="primary"><Download size={18} /> Exportar Excel</Button>
                </div>
            </div>

            {/* TABS DE NAVEGACIÓN */}
            <div className="flex gap-2 border-b border-gray-200 pb-1 overflow-x-auto">
                {[
                    { id: 'ventas', label: 'Ventas y Facturación', icon: <FileText size={16}/> },
                    { id: 'logistica', label: 'Logística y Operaciones', icon: <Truck size={16}/> },
                    { id: 'pendientes', label: 'Pedidos Pendientes', icon: <Clock size={16}/> },
                    { id: 'reclamos', label: 'Calidad y Reclamos', icon: <CheckCircle size={16}/> },
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

            {/* --- SECCIÓN KPIs: LOGÍSTICA (CASO DE USO: GENERAR REPORTE LOGÍSTICA) --- */}
            {activeTab === 'logistica' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-in slide-in-from-top-2">
                    <Card className="bg-indigo-50 border-indigo-100">
                        <CardContent className="p-4 flex items-center justify-between">
                            <div>
                                <p className="text-xs font-bold text-indigo-700 uppercase">Cumplimiento Horario</p>
                                <h3 className="text-2xl font-bold text-gray-800">96.5%</h3>
                                <p className="text-xs text-indigo-600">Entregas en ventana</p>
                            </div>
                            <div className="p-3 bg-indigo-200 text-indigo-700 rounded-full"><Clock size={24}/></div>
                        </CardContent>
                    </Card>
                    <Card className="bg-blue-50 border-blue-100">
                        <CardContent className="p-4 flex items-center justify-between">
                            <div>
                                <p className="text-xs font-bold text-blue-700 uppercase">Uso de Capacidad</p>
                                <h3 className="text-2xl font-bold text-gray-800">82%</h3>
                                <p className="text-xs text-blue-600">Eficiencia de carga</p>
                            </div>
                            <div className="p-3 bg-blue-200 text-blue-700 rounded-full"><Truck size={24}/></div>
                        </CardContent>
                    </Card>
                    <Card className="bg-orange-50 border-orange-100">
                        <CardContent className="p-4 flex items-center justify-between">
                            <div>
                                <p className="text-xs font-bold text-orange-700 uppercase">Reasignaciones</p>
                                <h3 className="text-2xl font-bold text-gray-800">3</h3>
                                <p className="text-xs text-orange-600">Incidencias mecánicas</p>
                            </div>
                            <div className="p-3 bg-orange-200 text-orange-700 rounded-full"><AlertCircle size={24}/></div>
                        </CardContent>
                    </Card>
                </div>
            )}

            {/* --- SECCIÓN KPIs: RECLAMOS (YA LO TENÍAMOS) --- */}
            {activeTab === 'reclamos' && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-in slide-in-from-top-2">
                    <Card className="bg-green-50 border-green-100">
                        <CardContent className="p-4 flex items-center justify-between">
                            <div><p className="text-xs font-bold text-green-700 uppercase">Tasa Resolución</p><h3 className="text-2xl font-bold text-gray-800">92%</h3></div>
                            <div className="p-3 bg-green-200 text-green-700 rounded-full"><CheckCircle size={24}/></div>
                        </CardContent>
                    </Card>
                    <Card className="bg-blue-50 border-blue-100">
                        <CardContent className="p-4 flex items-center justify-between">
                            <div><p className="text-xs font-bold text-blue-700 uppercase">Tiempo Promedio</p><h3 className="text-2xl font-bold text-gray-800">2.4 Días</h3></div>
                            <div className="p-3 bg-blue-200 text-blue-700 rounded-full"><Clock size={24}/></div>
                        </CardContent>
                    </Card>
                    <Card className="bg-purple-50 border-purple-100">
                        <CardContent className="p-4 flex items-center justify-between">
                            <div><p className="text-xs font-bold text-purple-700 uppercase">Satisfacción</p><h3 className="text-2xl font-bold text-gray-800">4.8/5.0</h3></div>
                            <div className="p-3 bg-purple-200 text-purple-700 rounded-full"><ThumbsUp size={24}/></div>
                        </CardContent>
                    </Card>
                </div>
            )}

            <Card>
                <CardHeader className="flex flex-row justify-between items-center bg-gray-50/50">
                    <CardTitle className="capitalize">Detalle: Reporte de {activeTab}</CardTitle>
                    <div className="relative w-64">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                        <input placeholder="Filtrar reporte..." className="pl-8 h-9 w-full rounded-md border bg-white text-sm" />
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        {/* TABLA VENTAS */}
                        {activeTab === 'ventas' && (
                            <>
                                <TableHead><TableRow><TableHeader>Fecha</TableHeader><TableHeader>N° Factura</TableHeader><TableHeader>Cliente</TableHeader><TableHeader className="text-right">Total (Bs)</TableHeader></TableRow></TableHead>
                                <TableBody>
                                    <TableRow><TableCell>04/12/2025</TableCell><TableCell>FC-001</TableCell><TableCell>Clínica Incor</TableCell><TableCell className="text-right font-bold">1,200.00</TableCell></TableRow>
                                    <TableRow><TableCell>04/12/2025</TableCell><TableCell>FC-002</TableCell><TableCell>Juan Perez</TableCell><TableCell className="text-right font-bold">850.00</TableCell></TableRow>
                                </TableBody>
                            </>
                        )}

                        {/* TABLA LOGÍSTICA (ACTUALIZADA PARA EL CASO DE USO) */}
                        {activeTab === 'logistica' && (
                            <>
                                <TableHead><TableRow><TableHeader>Ruta / Guía</TableHeader><TableHeader>Zona</TableHeader><TableHeader>Conductor / Vehículo</TableHeader><TableHeader>Capacidad Usada</TableHeader><TableHeader>Incidencias</TableHeader></TableRow></TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>
                                            <span className="font-bold block">Ruta Norte-01</span>
                                            <span className="text-xs text-gray-500">G-4582</span>
                                        </TableCell>
                                        <TableCell><Badge variant="outline">Zona Norte</Badge></TableCell>
                                        <TableCell>
                                            <div className="text-sm">Juan Pérez</div>
                                            <div className="text-xs text-gray-500">Nissan Atlas</div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden"><div className="h-full bg-green-500" style={{width: '90%'}}></div></div>
                                                <span className="text-xs font-bold">90%</span>
                                            </div>
                                        </TableCell>
                                        <TableCell><span className="text-green-600 font-bold text-xs">Sin Incidencias</span></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <span className="font-bold block">Ruta Sur-02</span>
                                            <span className="text-xs text-gray-500">G-4583</span>
                                        </TableCell>
                                        <TableCell><Badge variant="outline">Zona Sur</Badge></TableCell>
                                        <TableCell>
                                            <div className="text-sm">Carlos M.</div>
                                            <div className="text-xs text-gray-500">Toyota Dyna</div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden"><div className="h-full bg-yellow-500" style={{width: '60%'}}></div></div>
                                                <span className="text-xs font-bold">60%</span>
                                            </div>
                                        </TableCell>
                                        <TableCell><span className="text-red-500 font-bold text-xs">1 Reasignación</span></TableCell>
                                    </TableRow>
                                </TableBody>
                            </>
                        )}

                        {/* TABLA PENDIENTES */}
                        {activeTab === 'pendientes' && (
                            <>
                                <TableHead><TableRow><TableHeader>Pedido</TableHeader><TableHeader>Cliente</TableHeader><TableHeader>Días Retraso</TableHeader><TableHeader>Motivo</TableHeader></TableRow></TableHead>
                                <TableBody>
                                    <TableRow><TableCell>PED-099</TableCell><TableCell>Hospital Obrero</TableCell><TableCell className="text-red-600 font-bold">2 días</TableCell><TableCell>Falta Stock</TableCell></TableRow>
                                    <TableRow><TableCell>PED-101</TableCell><TableCell>Consultorio Sur</TableCell><TableCell className="text-yellow-600 font-bold">1 día</TableCell><TableCell>Por Validar</TableCell></TableRow>
                                </TableBody>
                            </>
                        )}

                        {/* TABLA RECLAMOS */}
                        {activeTab === 'reclamos' && (
                            <>
                                <TableHead><TableRow><TableHeader>Ticket</TableHeader><TableHeader>Tipo</TableHeader><TableHeader>Resolución</TableHeader><TableHeader>Tiempo</TableHeader><TableHeader>Encuesta</TableHeader></TableRow></TableHead>
                                <TableBody>
                                    <TableRow><TableCell>REC-001</TableCell><TableCell>Fuga Gas</TableCell><TableCell>Cambio Inmediato</TableCell><TableCell>2h</TableCell><TableCell>★★★★★</TableCell></TableRow>
                                    <TableRow><TableCell>REC-005</TableCell><TableCell>Demora</TableCell><TableCell>Nota Crédito</TableCell><TableCell>24h</TableCell><TableCell>★★★★☆</TableCell></TableRow>
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