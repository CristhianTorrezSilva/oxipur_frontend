import React, { useState } from 'react';
import { UserPlus, Search, Edit, Trash2, Phone } from 'lucide-react'; // Eliminé imports no usados para limpiar
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/Table';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Modal from '../../components/ui/Modal';

const ListaClientes = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingClient, setEditingClient] = useState(null);

    // 1. ESTADO PARA EL BUSCADOR
    const [searchTerm, setSearchTerm] = useState('');

    // MOCK DATA
    const clientes = [
        { id: 1, empresa: 'Clínica Incor', nit: '1020304022', contacto: 'Dr. Mamani', tel: '770-12345', zona: 'Norte', estado: 'Activo' },
        { id: 2, empresa: 'Hospital Obrero', nit: '5002001011', contacto: 'Lic. Perez', tel: '3-345000', zona: 'Centro', estado: 'Activo' },
        { id: 3, empresa: 'Juan Perez (Particular)', nit: '3453455', contacto: 'Juan Perez', tel: '600-99999', zona: 'Sur', estado: 'Inactivo' },
    ];

    // 2. LÓGICA DE FILTRADO (Busca por Empresa O por NIT)
    const clientesFiltrados = clientes.filter(cliente =>
        cliente.empresa.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cliente.nit.includes(searchTerm)
    );

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
                    <div className="w-64 relative">
                        {/* 3. INPUT CONECTADO AL ESTADO */}
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                            <Search size={16} />
                        </div>
                        <Input
                            placeholder="Buscar por NIT o Nombre..."
                            className="mb-0 pl-10" // Agregué padding left para que no pise el ícono si quieres poner uno
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
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
                            {/* 4. RENDERIZAR LA LISTA FILTRADA EN LUGAR DE LA ORIGINAL */}
                            {clientesFiltrados.length > 0 ? (
                                clientesFiltrados.map((c) => (
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
                                ))
                            ) : (
                                // Mensaje cuando no hay resultados
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                                        No se encontraron clientes con ese criterio.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

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