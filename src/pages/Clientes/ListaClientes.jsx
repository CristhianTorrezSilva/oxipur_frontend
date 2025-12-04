import React, { useState } from 'react';
import { UserPlus, Search, Edit, Trash2, MapPin, Phone, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/Table';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Modal from '../../components/ui/Modal'; // Asegúrate de tener este componente

const ListaClientes = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingClient, setEditingClient] = useState(null);

    // MOCK DATA
    const clientes = [
        { id: 1, empresa: 'Clínica Incor', nit: '1020304022', contacto: 'Dr. Mamani', tel: '770-12345', zona: 'Norte', estado: 'Activo' },
        { id: 2, empresa: 'Hospital Obrero', nit: '5002001011', contacto: 'Lic. Perez', tel: '3-345000', zona: 'Centro', estado: 'Activo' },
        { id: 3, empresa: 'Juan Perez (Particular)', nit: '3453455', contacto: 'Juan Perez', tel: '600-99999', zona: 'Sur', estado: 'Inactivo' },
    ];

    const handleOpenModal = (cliente = null) => {
        setEditingClient(cliente);
        setIsModalOpen(true);
    };

    const handleSave = (e) => {
        e.preventDefault();
        alert(editingClient ? "Cliente Actualizado Correctamente" : "Nuevo Cliente Registrado");
        setIsModalOpen(false);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Cartera de Clientes</h2>
                    <p className="text-gray-500">Gestión de información comercial y contractual</p>
                </div>
                <Button variant="primary" onClick={() => handleOpenModal()}>
                    <UserPlus size={18} /> Nuevo Cliente
                </Button>
            </div>

            <Card>
                <CardHeader className="flex flex-row justify-between items-center">
                    <CardTitle>Listado General</CardTitle>
                    <div className="w-64">
                        <Input placeholder="Buscar por NIT o Nombre..." className="mb-0" />
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableHeader>Empresa / Razón Social</TableHeader>
                                <TableHeader>NIT / CI</TableHeader>
                                <TableHeader>Contacto</TableHeader>
                                <TableHeader>Zona</TableHeader>
                                <TableHeader>Estado</TableHeader>
                                <TableHeader>Acciones</TableHeader>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {clientes.map((c) => (
                                <TableRow key={c.id}>
                                    <TableCell className="font-bold">{c.empresa}</TableCell>
                                    <TableCell className="font-mono">{c.nit}</TableCell>
                                    <TableCell>
                                        <div className="text-sm">{c.contacto}</div>
                                        <div className="text-xs text-gray-400 flex items-center gap-1"><Phone size={10}/> {c.tel}</div>
                                    </TableCell>
                                    <TableCell>{c.zona}</TableCell>
                                    <TableCell>
                    <span className={`px-2 py-1 rounded text-xs font-bold ${c.estado === 'Activo' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                      {c.estado}
                    </span>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex gap-2">
                                            <button onClick={() => handleOpenModal(c)} className="p-1 text-blue-600 hover:bg-blue-50 rounded"><Edit size={18}/></button>
                                            <button className="p-1 text-red-600 hover:bg-red-50 rounded"><Trash2 size={18}/></button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* MODAL DE REGISTRO/EDICIÓN */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={editingClient ? "Actualizar Datos de Cliente" : "Registrar Nuevo Cliente"}
            >
                <form onSubmit={handleSave} className="space-y-4">
                    <Input label="Razón Social / Nombre" defaultValue={editingClient?.empresa} />
                    <div className="grid grid-cols-2 gap-4">
                        <Input label="NIT / CI" defaultValue={editingClient?.nit} />
                        <Input label="Teléfono" defaultValue={editingClient?.tel} />
                    </div>
                    <Input label="Dirección Completa" placeholder="Av. Principal #123" />
                    <Input label="Persona de Contacto" defaultValue={editingClient?.contacto} />
                    <div className="flex justify-end gap-2 mt-4">
                        <Button variant="secondary" onClick={() => setIsModalOpen(false)}>Cancelar</Button>
                        <Button type="submit" variant="primary">Guardar Cambios</Button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default ListaClientes;