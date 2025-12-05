import React, { useState } from 'react';
import { Shield, User, Lock, Edit, CheckCircle, Eye, Save, Plus, Key, UserX, UserCheck, Mail, List } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/Table';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';
import Modal from '../../components/ui/Modal';
import Input from '../../components/ui/Input';
import Alert from '../../components/ui/Alert';

const Usuarios = () => {
    const [activeTab, setActiveTab] = useState('usuarios'); // 'usuarios' | 'roles'

    // ESTADOS MODALES
    const [userModalOpen, setUserModalOpen] = useState(false);
    const [roleModalOpen, setRoleModalOpen] = useState(false); // NUEVO: Modal para roles
    const [auditModalOpen, setAuditModalOpen] = useState(false);

    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedRole, setSelectedRole] = useState(null);

    // MOCK: Usuarios
    const [usuarios, setUsuarios] = useState([
        { id: 1, nombre: 'Admin General', email: 'admin@oxipur.bo', rol: 'Administrador', estado: 'Activo' },
        { id: 2, nombre: 'Carla Vendedora', email: 'ventas@oxipur.bo', rol: 'Enc. Ventas', estado: 'Activo' },
        { id: 3, nombre: 'Juan Chofer', email: 'juan@oxipur.bo', rol: 'Conductor', estado: 'Inactivo' },
    ]);

    // MOCK: Roles con Versiones (CASO DE USO 39)
    const [rolesDefinidos, setRolesDefinidos] = useState([
        { id: 'admin', nombre: 'Administrador', usuarios: 1, version: 'v1.2' },
        { id: 'ventas', nombre: 'Enc. Ventas', usuarios: 1, version: 'v1.0' },
        { id: 'logistica', nombre: 'Enc. Logística', usuarios: 0, version: 'v1.1' },
        { id: 'chofer', nombre: 'Conductor', usuarios: 10, version: 'v2.0' },
    ]);

    // --- LÓGICA DE USUARIOS ---
    const handleSaveUser = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);

        if (selectedUser) {
            setUsuarios(usuarios.map(u => u.id === selectedUser.id ? { ...u, ...data } : u));
            alert("Usuario actualizado. Relación rol-usuario refrescada.");
        } else {
            const newUser = { id: Date.now(), ...data, estado: 'Activo' };
            setUsuarios([...usuarios, newUser]);
            alert("Usuario creado. Credenciales enviadas.");
        }
        setUserModalOpen(false);
    };

    const handleToggleStatus = (id, currentStatus) => {
        const nuevoEstado = currentStatus === 'Activo' ? 'Inactivo' : 'Activo';
        if(confirm(`¿Confirmar cambio de estado a ${nuevoEstado}?`)) {
            setUsuarios(usuarios.map(u => u.id === id ? { ...u, estado: nuevoEstado } : u));
        }
    };

    const handleResetPassword = (email) => {
        if(confirm(`¿Forzar reseteo de contraseña?`)) alert(`Token de reseteo enviado a ${email}`);
    };

    // --- LÓGICA DE ROLES (CASO DE USO: GESTIONAR ROLES) ---
    const handleOpenRoleModal = (role = null) => {
        setSelectedRole(role);
        setRoleModalOpen(true);
    };

    const handleSaveRole = (e) => {
        e.preventDefault();
        // SISTEMA: Valida permisos y versiona el rol
        if (selectedRole) {
            alert(`Rol "${selectedRole.nombre}" actualizado a nueva versión (v${(parseFloat(selectedRole.version.substring(1)) + 0.1).toFixed(1)}). Caché de permisos invalidada.`);
        } else {
            alert("Nuevo rol creado y políticas aplicadas.");
        }
        setRoleModalOpen(false);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Seguridad y Acceso</h2>
                    <p className="text-gray-500">Gestión integral de usuarios, roles y permisos</p>
                </div>
            </div>

            {/* TABS */}
            <div className="flex gap-2 border-b border-gray-200">
                <button onClick={() => setActiveTab('usuarios')} className={`px-4 py-2 text-sm font-bold border-b-2 transition-colors ${activeTab === 'usuarios' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500'}`}>
                    <User size={16} className="inline mr-2"/> Usuarios
                </button>
                <button onClick={() => setActiveTab('roles')} className={`px-4 py-2 text-sm font-bold border-b-2 transition-colors ${activeTab === 'roles' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500'}`}>
                    <Shield size={16} className="inline mr-2"/> Roles y Permisos
                </button>
            </div>

            {/* TAB 1: USUARIOS */}
            {activeTab === 'usuarios' && (
                <Card>
                    <CardHeader className="flex flex-row justify-between items-center">
                        <CardTitle>Usuarios del Sistema</CardTitle>
                        <Button variant="primary" onClick={() => { setSelectedUser(null); setUserModalOpen(true); }}>
                            <Plus size={16}/> Nuevo Usuario
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHead><TableRow><TableHeader>Usuario</TableHeader><TableHeader>Rol</TableHeader><TableHeader>Estado</TableHeader><TableHeader>Acciones</TableHeader></TableRow></TableHead>
                            <TableBody>
                                {usuarios.map(u => (
                                    <TableRow key={u.id} className={u.estado === 'Inactivo' ? 'bg-gray-50 opacity-60' : ''}>
                                        <TableCell>
                                            <div className="font-bold">{u.nombre}</div>
                                            <div className="text-xs text-gray-400 flex items-center gap-1"><Mail size={10}/> {u.email}</div>
                                        </TableCell>
                                        <TableCell><Badge variant="outline">{u.rol}</Badge></TableCell>
                                        <TableCell>{u.estado === 'Activo' ? <Badge variant="success">Activo</Badge> : <Badge variant="danger">Inactivo</Badge>}</TableCell>
                                        <TableCell>
                                            <div className="flex gap-2">
                                                <button onClick={() => { setSelectedUser(u); setUserModalOpen(true); }} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded border" title="Editar"><Edit size={16}/></button>
                                                <button onClick={() => handleResetPassword(u.email)} className="p-1.5 text-orange-600 hover:bg-orange-50 rounded border" title="Reset Clave"><Key size={16}/></button>
                                                <button onClick={() => handleToggleStatus(u.id, u.estado)} className="p-1.5 text-red-600 hover:bg-red-50 rounded border" title="Activar/Desactivar"><UserX size={16}/></button>
                                                <button onClick={() => { setSelectedUser(u); setAuditModalOpen(true); }} className="p-1.5 text-gray-500 hover:bg-gray-100 rounded border" title="Auditar Permisos"><Eye size={16}/></button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            )}

            {/* TAB 2: ROLES (CON MATRIZ DE PERMISOS) */}
            {activeTab === 'roles' && (
                <Card>
                    <CardHeader className="flex flex-row justify-between items-center">
                        <CardTitle>Definición de Roles</CardTitle>
                        <Button variant="primary" onClick={() => handleOpenRoleModal(null)}>
                            <Plus size={16}/> Crear Rol
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHead><TableRow><TableHeader>Rol</TableHeader><TableHeader>Usuarios Asignados</TableHeader><TableHeader>Versión Política</TableHeader><TableHeader>Acciones</TableHeader></TableRow></TableHead>
                            <TableBody>
                                {rolesDefinidos.map(r => (
                                    <TableRow key={r.id}>
                                        <TableCell className="font-bold">{r.nombre}</TableCell>
                                        <TableCell>{r.usuarios}</TableCell>
                                        <TableCell><span className="font-mono text-xs bg-gray-100 px-2 py-1 rounded">{r.version}</span></TableCell>
                                        <TableCell>
                                            <button onClick={() => handleOpenRoleModal(r)} className="text-blue-600 hover:underline text-sm font-medium flex items-center gap-1">
                                                <List size={14}/> Configurar Permisos
                                            </button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            )}

            {/* MODAL USUARIO */}
            <Modal isOpen={userModalOpen} onClose={() => setUserModalOpen(false)} title={selectedUser ? "Editar Usuario" : "Crear Usuario"}>
                <form onSubmit={handleSaveUser} className="space-y-4">
                    <Input name="nombre" label="Nombre" defaultValue={selectedUser?.nombre} required />
                    <Input name="email" label="Email" defaultValue={selectedUser?.email} required />
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-semibold text-gray-700">Rol</label>
                        <select name="rol" className="p-2 border rounded-lg bg-white" defaultValue={selectedUser?.rol || ''}>
                            {rolesDefinidos.map(r => <option key={r.id} value={r.nombre}>{r.nombre}</option>)}
                        </select>
                    </div>
                    <div className="flex justify-end gap-2 mt-4"><Button variant="secondary" onClick={() => setUserModalOpen(false)}>Cancelar</Button><Button type="submit" variant="primary">Guardar</Button></div>
                </form>
            </Modal>

            {/* MODAL ROL (MATRIZ DE PERMISOS) - AQUÍ ESTÁ LA CLAVE DEL CASO DE USO */}
            <Modal isOpen={roleModalOpen} onClose={() => setRoleModalOpen(false)} title={selectedRole ? `Editar Política: ${selectedRole.nombre}` : "Nuevo Rol"}>
                <form onSubmit={handleSaveRole} className="space-y-4">
                    <Input label="Nombre del Rol" defaultValue={selectedRole?.nombre} />
                    <Alert variant="info" title="Control de Versiones">
                        Al guardar, se generará una nueva versión y se auditará el cambio.
                    </Alert>

                    <div className="border rounded-lg overflow-hidden">
                        <table className="w-full text-xs text-left">
                            <thead className="bg-gray-100 font-bold text-gray-600">
                            <tr><th className="p-2">Módulo</th><th className="p-2 text-center">Leer</th><th className="p-2 text-center">Crear</th><th className="p-2 text-center">Editar</th><th className="p-2 text-center">Eliminar</th></tr>
                            </thead>
                            <tbody className="divide-y">
                            {['Ventas', 'Logística', 'Almacén', 'Admin'].map(mod => (
                                <tr key={mod}>
                                    <td className="p-2 font-medium">{mod}</td>
                                    <td className="p-2 text-center"><input type="checkbox" defaultChecked /></td>
                                    <td className="p-2 text-center"><input type="checkbox" defaultChecked={mod !== 'Admin'} /></td>
                                    <td className="p-2 text-center"><input type="checkbox" defaultChecked={mod !== 'Admin'} /></td>
                                    <td className="p-2 text-center"><input type="checkbox" /></td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="flex justify-end gap-2 mt-4"><Button variant="secondary" onClick={() => setRoleModalOpen(false)}>Cancelar</Button><Button type="submit" variant="primary">Guardar Política</Button></div>
                </form>
            </Modal>

            {/* MODAL AUDITORÍA (PERMISOS EFECTIVOS) */}
            <Modal isOpen={auditModalOpen} onClose={() => setAuditModalOpen(false)} title="Auditoría de Permisos Efectivos">
                <div className="space-y-4">
                    <div className="flex items-center gap-3 mb-4 bg-gray-50 p-3 rounded border">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-600">{selectedUser?.nombre.charAt(0)}</div>
                        <div><h4 className="font-bold">{selectedUser?.nombre}</h4><p className="text-xs text-gray-500">Rol: {selectedUser?.rol}</p></div>
                    </div>

                    <h4 className="text-xs font-bold text-gray-500 uppercase border-b pb-1">Lista de Permisos Efectivos (Calculado)</h4>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                        {['ventas.read', 'ventas.write', 'logistica.read', 'almacen.read'].map(p => (
                            <div key={p} className="flex justify-between items-center text-sm"><span className="font-mono">{p}</span><span className="text-green-600 text-xs font-bold">CONCEDIDO</span></div>
                        ))}
                        <div className="flex justify-between items-center text-sm"><span className="font-mono text-gray-400">admin.delete</span><span className="text-red-500 text-xs font-bold">DENEGADO (Política)</span></div>
                    </div>
                    <Button className="w-full mt-2" onClick={() => setAuditModalOpen(false)}>Cerrar Auditoría</Button>
                </div>
            </Modal>

        </div>
    );
};

export default Usuarios;