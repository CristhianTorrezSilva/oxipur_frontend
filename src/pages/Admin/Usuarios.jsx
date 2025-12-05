import React, { useState } from 'react';
import { Shield, User, Lock, MoreVertical, Edit, Trash2, CheckCircle, XCircle, Eye, Save, Plus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/Table';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Modal from '../../components/ui/Modal';
import Input from '../../components/ui/Input';
import Alert from '../../components/ui/Alert';

const Usuarios = () => {
    const [activeTab, setActiveTab] = useState('usuarios'); // 'usuarios' | 'roles'
    const [modalOpen, setModalOpen] = useState(false);
    const [modalAuditOpen, setModalAuditOpen] = useState(false);
    const [selectedRole, setSelectedRole] = useState(null);

    // MOCK: Usuarios
    const usuarios = [
        { id: 1, nombre: 'Admin General', email: 'admin@oxipur.bo', rol: 'Administrador', estado: 'Activo' },
        { id: 2, nombre: 'Carla Vendedora', email: 'ventas@oxipur.bo', rol: 'Enc. Ventas', estado: 'Activo' },
        { id: 3, nombre: 'Juan Chofer', email: 'juan@oxipur.bo', rol: 'Conductor', estado: 'Inactivo' },
    ];

    // MOCK: Roles y Permisos (Matriz)
    const rolesDefinidos = [
        { id: 'admin', nombre: 'Administrador', usuarios: 1, version: 'v1.2' },
        { id: 'ventas', nombre: 'Enc. Ventas', usuarios: 3, version: 'v1.0' },
        { id: 'logistica', nombre: 'Enc. Logística', usuarios: 2, version: 'v1.1' },
        { id: 'chofer', nombre: 'Conductor', usuarios: 10, version: 'v2.0' },
    ];

    // Acción: Simular Revocar/Asignar
    const handleRevoke = (nombre) => {
        if(confirm(`¿Revocar acceso y eliminar rol al usuario ${nombre}?`)) {
            alert("Rol revocado. Se ha invalidado la caché de permisos del usuario.");
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Seguridad y Acceso</h2>
                    <p className="text-gray-500">Gestión de identidad, roles y auditoría de permisos</p>
                </div>
            </div>

            {/* PESTAÑAS DE NAVEGACIÓN */}
            <div className="flex gap-2 border-b border-gray-200">
                <button
                    onClick={() => setActiveTab('usuarios')}
                    className={`px-4 py-2 text-sm font-bold border-b-2 transition-colors ${activeTab === 'usuarios' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                >
                    <User size={16} className="inline mr-2"/> Usuarios Asignados
                </button>
                <button
                    onClick={() => setActiveTab('roles')}
                    className={`px-4 py-2 text-sm font-bold border-b-2 transition-colors ${activeTab === 'roles' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                >
                    <Shield size={16} className="inline mr-2"/> Definición de Roles
                </button>
            </div>

            {/* VISTA 1: GESTIÓN DE USUARIOS (Asignar/Revocar/Auditar) */}
            {activeTab === 'usuarios' && (
                <Card>
                    <CardHeader className="flex flex-row justify-between">
                        <CardTitle>Usuarios del Sistema</CardTitle>
                        <Button variant="primary"><User size={16}/> Nuevo Usuario</Button>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableHeader>Usuario</TableHeader>
                                    <TableHeader>Rol Asignado</TableHeader>
                                    <TableHeader>Estado</TableHeader>
                                    <TableHeader>Acciones</TableHeader>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {usuarios.map(u => (
                                    <TableRow key={u.id}>
                                        <TableCell>
                                            <div className="font-bold">{u.nombre}</div>
                                            <div className="text-xs text-gray-400">{u.email}</div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="info">{u.rol}</Badge>
                                        </TableCell>
                                        <TableCell>
                                            {u.estado === 'Activo' ? <span className="text-green-600 font-bold text-xs">● Activo</span> : <span className="text-red-400 font-bold text-xs">● Inactivo</span>}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex gap-2">
                                                <button onClick={() => setModalAuditOpen(true)} className="p-1 text-blue-600 hover:bg-blue-50 rounded" title="Auditar Permisos Efectivos">
                                                    <Eye size={18}/>
                                                </button>
                                                <button className="p-1 text-gray-500 hover:bg-gray-100 rounded" title="Editar Asignación">
                                                    <Edit size={18}/>
                                                </button>
                                                <button onClick={() => handleRevoke(u.nombre)} className="p-1 text-red-500 hover:bg-red-50 rounded" title="Revocar Rol">
                                                    <Lock size={18}/>
                                                </button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            )}

            {/* VISTA 2: GESTIÓN DE ROLES (Crear/Editar/Versionar) */}
            {activeTab === 'roles' && (
                <Card>
                    <CardHeader className="flex flex-row justify-between">
                        <CardTitle>Roles y Políticas</CardTitle>
                        <Button variant="primary" onClick={() => { setSelectedRole(null); setModalOpen(true); }}>
                            <Plus size={16}/> Crear Nuevo Rol
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableHeader>Nombre del Rol</TableHeader>
                                    <TableHeader>Usuarios</TableHeader>
                                    <TableHeader>Versión</TableHeader>
                                    <TableHeader>Acciones</TableHeader>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rolesDefinidos.map(r => (
                                    <TableRow key={r.id}>
                                        <TableCell className="font-bold">{r.nombre}</TableCell>
                                        <TableCell>{r.usuarios} usuarios</TableCell>
                                        <TableCell><span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">{r.version}</span></TableCell>
                                        <TableCell>
                                            <button onClick={() => { setSelectedRole(r); setModalOpen(true); }} className="text-blue-600 hover:underline text-sm font-medium">
                                                Configurar Permisos
                                            </button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            )}

            {/* MODAL 1: CREAR/EDITAR ROL (Matriz de Permisos) */}
            <Modal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                title={selectedRole ? `Editar Rol: ${selectedRole.nombre}` : "Crear Nuevo Rol"}
            >
                <div className="space-y-4">
                    <Input label="Nombre del Rol" defaultValue={selectedRole?.nombre} />
                    <div className="bg-yellow-50 p-3 rounded border border-yellow-200 text-xs text-yellow-800 mb-2">
                        <Shield size={14} className="inline mr-1"/>
                        Al guardar, se generará una nueva versión del rol y se actualizará la caché.
                    </div>

                    <div className="border rounded-lg overflow-hidden">
                        <table className="w-full text-xs text-left">
                            <thead className="bg-gray-100 font-bold text-gray-600">
                            <tr>
                                <th className="p-2">Módulo</th>
                                <th className="p-2 text-center">Ver</th>
                                <th className="p-2 text-center">Crear</th>
                                <th className="p-2 text-center">Editar</th>
                                <th className="p-2 text-center">Eliminar</th>
                            </tr>
                            </thead>
                            <tbody className="divide-y">
                            {['Ventas', 'Logística', 'Inventario', 'Usuarios'].map(mod => (
                                <tr key={mod}>
                                    <td className="p-2 font-medium">{mod}</td>
                                    <td className="p-2 text-center"><input type="checkbox" defaultChecked /></td>
                                    <td className="p-2 text-center"><input type="checkbox" defaultChecked={mod !== 'Usuarios'} /></td>
                                    <td className="p-2 text-center"><input type="checkbox" defaultChecked={mod !== 'Usuarios'} /></td>
                                    <td className="p-2 text-center"><input type="checkbox" /></td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex justify-end gap-2 mt-4">
                        <Button variant="secondary" onClick={() => setModalOpen(false)}>Cancelar</Button>
                        <Button variant="primary" onClick={() => { alert("Rol guardado y versionado."); setModalOpen(false); }}>
                            <Save size={16}/> Guardar Rol
                        </Button>
                    </div>
                </div>
            </Modal>

            {/* MODAL 2: AUDITORÍA DE PERMISOS (Punto 4 de tu lista) */}
            <Modal isOpen={modalAuditOpen} onClose={() => setModalAuditOpen(false)} title="Auditoría de Permisos Efectivos">
                <div className="space-y-4">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-600">A</div>
                        <div>
                            <h4 className="font-bold">Admin General</h4>
                            <p className="text-xs text-gray-500">Rol: Administrador (Heredado)</p>
                        </div>
                    </div>

                    <Alert variant="success" title="Estado de Cumplimiento">
                        Los permisos efectivos coinciden con la política de seguridad v1.2.
                    </Alert>

                    <div className="space-y-2 max-h-60 overflow-y-auto">
                        <p className="text-xs font-bold text-gray-500 uppercase">Permisos Efectivos:</p>
                        {['ventas.read', 'ventas.write', 'logistica.read', 'logistica.write', 'admin.users.manage'].map(p => (
                            <div key={p} className="flex justify-between items-center p-2 bg-gray-50 rounded border border-gray-100 text-sm">
                                <span className="font-mono text-gray-600">{p}</span>
                                <CheckCircle size={14} className="text-green-500"/>
                            </div>
                        ))}
                    </div>

                    <Button className="w-full mt-2" onClick={() => setModalAuditOpen(false)}>Cerrar Auditoría</Button>
                </div>
            </Modal>

        </div>
    );
};

export default Usuarios;