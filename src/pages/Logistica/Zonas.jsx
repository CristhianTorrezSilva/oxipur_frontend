import React, { useState } from 'react';
import { Map, Clock, Edit, Plus, Save, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/Table';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import Input from '../../components/ui/Input';
import Badge from '../../components/ui/Badge';

const Zonas = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [editingZone, setEditingZone] = useState(null);

    // MOCK: Zonas definidas
    const [zonas, setZonas] = useState([
        { id: 1, nombre: 'Zona Norte', horario: '08:00 - 12:00', capacidad: 'Alta', color: 'bg-blue-100 text-blue-800' },
        { id: 2, nombre: 'Zona Centro', horario: '14:00 - 18:00', capacidad: 'Media', color: 'bg-green-100 text-green-800' },
        { id: 3, nombre: 'Zona Sur', horario: '08:00 - 16:00', capacidad: 'Baja', color: 'bg-orange-100 text-orange-800' },
    ]);

    const handleSave = (e) => {
        e.preventDefault();
        alert("Configuración de Zona guardada. Las reglas de validación se han actualizado.");
        setModalOpen(false);
    };

    const openEdit = (zona) => {
        setEditingZone(zona);
        setModalOpen(true);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Configuración de Zonas</h2>
                    <p className="text-gray-500">Definición de áreas geográficas y ventanas horarias</p>
                </div>
                <Button variant="primary" onClick={() => { setEditingZone(null); setModalOpen(true); }}>
                    <Plus size={18}/> Nueva Zona
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* LISTADO DE ZONAS */}
                <div className="lg:col-span-2">
                    <Card>
                        <CardHeader><CardTitle>Zonas Activas</CardTitle></CardHeader>
                        <CardContent>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableHeader>Zona</TableHeader>
                                        <TableHeader>Ventana Horaria</TableHeader>
                                        <TableHeader>Capacidad</TableHeader>
                                        <TableHeader>Acciones</TableHeader>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {zonas.map(z => (
                                        <TableRow key={z.id}>
                                            <TableCell>
                                        <span className={`px-2 py-1 rounded text-xs font-bold ${z.color}`}>
                                            {z.nombre}
                                        </span>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                                    <Clock size={16}/> {z.horario}
                                                </div>
                                            </TableCell>
                                            <TableCell>{z.capacidad}</TableCell>
                                            <TableCell>
                                                <button onClick={() => openEdit(z)} className="p-1 text-blue-600 hover:bg-blue-50 rounded mr-2"><Edit size={18}/></button>
                                                <button className="p-1 text-red-600 hover:bg-red-50 rounded"><Trash2 size={18}/></button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>

                {/* VISUALIZACIÓN RÁPIDA (Solo decorativo para que se vea pro) */}
                <div>
                    <Card className="h-full bg-slate-50 border-dashed">
                        <CardContent className="flex flex-col items-center justify-center h-full text-gray-400 py-12">
                            <Map size={48} className="mb-4 opacity-50"/>
                            <p className="text-center text-sm">El mapa de calor se actualizará<br/>al guardar los cambios.</p>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* MODAL DE EDICIÓN */}
            <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} title={editingZone ? "Editar Zona" : "Definir Nueva Zona"}>
                <form onSubmit={handleSave} className="space-y-4">
                    <Input label="Nombre de la Zona" placeholder="Ej: Zona Este - Parque Industrial" defaultValue={editingZone?.nombre} />

                    <div className="grid grid-cols-2 gap-4">
                        <Input label="Hora Inicio" type="time" defaultValue={editingZone ? editingZone.horario.split(' - ')[0] : "08:00"} />
                        <Input label="Hora Fin" type="time" defaultValue={editingZone ? editingZone.horario.split(' - ')[1] : "18:00"} />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-semibold text-gray-700">Capacidad de Atención</label>
                        <select className="p-2 border rounded-lg bg-white">
                            <option>Alta (Todos los días)</option>
                            <option>Media (Lunes, Miércoles, Viernes)</option>
                            <option>Baja (Solo Martes y Jueves)</option>
                        </select>
                    </div>

                    <div className="flex justify-end gap-2 mt-4">
                        <Button variant="secondary" onClick={() => setModalOpen(false)}>Cancelar</Button>
                        <Button type="submit" variant="primary">
                            <Save size={18}/> Guardar Parámetros
                        </Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default Zonas;