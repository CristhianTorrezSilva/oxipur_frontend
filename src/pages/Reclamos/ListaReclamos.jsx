import React, { useState } from 'react';
import { Plus, Filter, Download, Eye, MessageSquare, CheckCircle, AlertTriangle, UserCog, Save, X, Search, FileText, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/Table';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Modal from '../../components/ui/Modal';
import Alert from '../../components/ui/Alert';

const ListaReclamos = () => {
    const navigate = useNavigate();

    // ESTADOS
    const [assignModalOpen, setAssignModalOpen] = useState(false);
    const [resolveModalOpen, setResolveModalOpen] = useState(false);
    const [historyModalOpen, setHistoryModalOpen] = useState(false); // NUEVO: Modal de Historial
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [searchTerm, setSearchTerm] = useState(''); // NUEVO: Estado para el buscador

    // Estados formularios
    const [asignadoA, setAsignadoA] = useState('');
    const [nuevaPrioridad, setNuevaPrioridad] = useState('');
    const [accionCorrectiva, setAccionCorrectiva] = useState('');
    const [tipoSolucion, setTipoSolucion] = useState('');

    // Datos MOCK
    const [reclamos, setReclamos] = useState([
        { id: 'REC-4091', cliente: 'Clínica Incor', tipo: 'Calidad', asunto: 'Válvula defectuosa', fecha: '04/12/2025', estado: 'pendiente', severidad: 'alta', responsable: 'Sin Asignar' },
        { id: 'REC-4092', cliente: 'Hospital Obrero', tipo: 'Logística', asunto: 'Demora en entrega', fecha: '03/12/2025', estado: 'en-proceso', severidad: 'media', responsable: 'Mario Logística' },
        { id: 'REC-4090', cliente: 'Juan Pérez', tipo: 'Facturación', asunto: 'Error en NIT', fecha: '01/12/2025', estado: 'resuelto', severidad: 'baja', responsable: 'Admin' },
    ]);

    // FILTRO EN VIVO (CASO DE USO: CONSULTAR CON FILTROS)
    const reclamosFiltrados = reclamos.filter(r =>
        r.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.tipo.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // --- HANDLERS ---
    const handleOpenAssign = (ticket) => {
        setSelectedTicket(ticket);
        setAsignadoA(ticket.responsable === 'Sin Asignar' ? '' : ticket.responsable);
        setNuevaPrioridad(ticket.severidad);
        setAssignModalOpen(true);
    };

    const handleOpenResolve = (ticket) => {
        setSelectedTicket(ticket);
        setResolveModalOpen(true);
        setAccionCorrectiva('');
        setTipoSolucion('');
    };

    // NUEVO: VER HISTORIAL (CASO DE USO 75)
    const handleViewHistory = (ticket) => {
        setSelectedTicket(ticket);
        setHistoryModalOpen(true);
    };

    const handleSaveAssignment = (e) => {
        e.preventDefault();
        setReclamos(reclamos.map(r => r.id === selectedTicket.id ? { ...r, responsable: asignadoA, severidad: nuevaPrioridad, estado: 'en-proceso' } : r));
        setAssignModalOpen(false);
        alert(`Ticket asignado a ${asignadoA}. Notificación enviada.`);
    };

    const handleConfirmResolution = (e) => {
        e.preventDefault();
        setReclamos(reclamos.map(r => r.id === selectedTicket.id ? { ...r, estado: 'resuelto' } : r));
        setResolveModalOpen(false);
        alert(`Reclamo resuelto. Notificación enviada al cliente.`);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Gestión de Reclamos</h2>
                    <p className="text-gray-500">Atención al cliente y resolución de incidencias</p>
                </div>
                <div className="flex gap-2">
                    {/* BOTÓN EXPORTAR (REQUISITO NO FUNCIONAL) */}
                    <Button variant="outline"><Download size={18} /> Exportar</Button>
                    <Button variant="primary" onClick={() => navigate('/reclamos/nuevo')}>
                        <Plus size={18} /> Nuevo Reclamo
                    </Button>
                </div>
            </div>

            {/* KPIs (Omitidos por brevedad, se mantienen igual que antes) */}

            <Card>
                <CardHeader className="flex flex-row justify-between items-center bg-gray-50/50">
                    <CardTitle>Bandeja de Tickets</CardTitle>

                    {/* BUSCADOR (CASO DE USO: FILTROS DE BÚSQUEDA) */}
                    <div className="relative w-64">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                        <input
                            placeholder="Buscar cliente, ID o tipo..."
                            className="pl-8 h-9 w-full rounded-md border bg-white text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHead>
                            <TableRow><TableHeader>Ticket</TableHeader><TableHeader>Cliente</TableHeader><TableHeader>Asunto / Responsable</TableHeader><TableHeader>Estado</TableHeader><TableHeader>Acciones</TableHeader></TableRow>
                        </TableHead>
                        <TableBody>
                            {reclamosFiltrados.map((r) => (
                                <TableRow key={r.id}>
                                    <TableCell><span className="font-mono font-bold text-gray-700">{r.id}</span><div className="text-xs text-gray-400">{r.fecha}</div></TableCell>
                                    <TableCell className="font-medium">{r.cliente}</TableCell>
                                    <TableCell>
                                        <div className="font-bold text-sm">{r.asunto}</div>
                                        <div className="text-xs flex gap-2 mt-1"><span className="text-gray-500">Resp: </span><span className={`font-bold ${r.responsable === 'Sin Asignar' ? 'text-red-500' : 'text-blue-600'}`}>{r.responsable}</span></div>
                                    </TableCell>
                                    <TableCell>
                                        {r.estado === 'pendiente' && <Badge variant="danger">Abierto</Badge>}
                                        {r.estado === 'en-proceso' && <Badge variant="warning">En Proceso</Badge>}
                                        {r.estado === 'resuelto' && <Badge variant="success">Cerrado</Badge>}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex gap-2">
                                            {r.estado !== 'resuelto' && (
                                                <>
                                                    <button onClick={() => handleOpenAssign(r)} className="p-1.5 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 border border-blue-200" title="Asignar"><UserCog size={16}/></button>
                                                    <button onClick={() => handleOpenResolve(r)} className="p-1.5 bg-green-50 text-green-700 rounded hover:bg-green-100 border border-green-200" title="Resolver"><CheckCircle size={16}/></button>
                                                </>
                                            )}
                                            {/* BOTÓN VER HISTORIAL (CASO DE USO 75) */}
                                            <button onClick={() => handleViewHistory(r)} className="p-1.5 text-gray-400 hover:text-blue-600 rounded hover:bg-gray-100" title="Ver Historial Completo"><Eye size={16}/></button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* --- MODALES DE ASIGNACIÓN Y RESOLUCIÓN (Igual que antes) --- */}
            <Modal isOpen={assignModalOpen} onClose={() => setAssignModalOpen(false)} title={`Asignar Ticket: ${selectedTicket?.id}`}>
                <form onSubmit={handleSaveAssignment} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-semibold text-gray-700">Prioridad</label>
                            <select className="p-2 border rounded-lg bg-white" value={nuevaPrioridad} onChange={(e) => setNuevaPrioridad(e.target.value)}><option value="baja">Baja</option><option value="media">Media</option><option value="alta">Alta</option></select>
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-sm font-semibold text-gray-700">Responsable</label>
                            <select className="p-2 border rounded-lg bg-white" required value={asignadoA} onChange={(e) => setAsignadoA(e.target.value)}>
                                <option value="">Seleccione...</option><option value="Mario Logística">Enc. Logística</option><option value="Pedro Almacén">Enc. Almacén</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex justify-end gap-2 mt-4"><Button variant="secondary" onClick={() => setAssignModalOpen(false)}>Cancelar</Button><Button type="submit" variant="primary">Guardar</Button></div>
                </form>
            </Modal>

            <Modal isOpen={resolveModalOpen} onClose={() => setResolveModalOpen(false)} title={`Resolver Reclamo: ${selectedTicket?.id}`}>
                <form onSubmit={handleConfirmResolution} className="space-y-4">
                    <Alert variant="success" title="Cierre de Ticket">Está por cerrar el reclamo de <b>{selectedTicket?.cliente}</b>.</Alert>
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-semibold text-gray-700">Tipo de Resolución</label>
                        <select className="p-2 border rounded-lg bg-white" required onChange={(e) => setTipoSolucion(e.target.value)}>
                            <option value="">Seleccione...</option><option value="cambio_producto">Cambio de Producto</option><option value="nota_credito">Nota de Crédito</option><option value="visita_tecnica">Visita Técnica</option>
                        </select>
                    </div>
                    <textarea className="w-full p-3 border rounded-lg h-24 text-sm" placeholder="Describa la solución..." required onChange={(e) => setAccionCorrectiva(e.target.value)}></textarea>
                    <div className="flex justify-end gap-2 mt-4"><Button variant="secondary" onClick={() => setResolveModalOpen(false)}>Cancelar</Button><Button type="submit" variant="primary">Confirmar Resolución</Button></div>
                </form>
            </Modal>

            {/* --- NUEVO MODAL: HISTORIAL DEL RECLAMO (CASO DE USO 75) --- */}
            <Modal isOpen={historyModalOpen} onClose={() => setHistoryModalOpen(false)} title={`Historial: ${selectedTicket?.id}`}>
                <div className="space-y-6">
                    {/* Encabezado */}
                    <div className="bg-gray-50 p-4 rounded-lg border flex justify-between">
                        <div>
                            <p className="text-xs text-gray-500 uppercase font-bold">Cliente</p>
                            <p className="font-bold">{selectedTicket?.cliente}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-xs text-gray-500 uppercase font-bold">Fecha Creación</p>
                            <p className="font-mono">{selectedTicket?.fecha}</p>
                        </div>
                    </div>

                    {/* LÍNEA DE TIEMPO (Timeline) */}
                    <div className="relative border-l-2 border-gray-200 ml-3 space-y-6 pl-6 py-2">

                        {/* Evento 1: Creación */}
                        <div className="relative">
                            <div className="absolute -left-[31px] bg-blue-500 h-4 w-4 rounded-full border-2 border-white"></div>
                            <p className="text-sm font-bold text-gray-800">Reclamo Registrado</p>
                            <p className="text-xs text-gray-500">Por: Encargado de Ventas</p>
                            <div className="mt-2 bg-gray-50 p-2 rounded text-xs border flex items-center gap-2">
                                <FileText size={14} className="text-blue-500"/>
                                Evidencia adjunta: <b>foto_daño.jpg</b>
                            </div>
                        </div>

                        {/* Evento 2: Asignación (Si aplica) */}
                        {selectedTicket?.responsable !== 'Sin Asignar' && (
                            <div className="relative">
                                <div className="absolute -left-[31px] bg-yellow-500 h-4 w-4 rounded-full border-2 border-white"></div>
                                <p className="text-sm font-bold text-gray-800">Asignado a Responsable</p>
                                <p className="text-xs text-gray-500">Asignado a: <b>{selectedTicket?.responsable}</b></p>
                                <p className="text-xs text-gray-500">Prioridad: {selectedTicket?.severidad.toUpperCase()}</p>
                            </div>
                        )}

                        {/* Evento 3: Resolución (Si aplica) */}
                        {selectedTicket?.estado === 'resuelto' && (
                            <div className="relative">
                                <div className="absolute -left-[31px] bg-green-500 h-4 w-4 rounded-full border-2 border-white"></div>
                                <p className="text-sm font-bold text-green-700">Reclamo Resuelto</p>
                                <p className="text-xs text-gray-500">Acción Correctiva Aplicada</p>
                                <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                                    <Clock size={12}/> Tiempo total: 48 horas
                                </p>
                            </div>
                        )}
                    </div>

                    <div className="flex justify-end pt-4 border-t">
                        <Button variant="secondary" onClick={() => setHistoryModalOpen(false)}>Cerrar Historial</Button>
                    </div>
                </div>
            </Modal>

        </div>
    );
};

export default ListaReclamos;