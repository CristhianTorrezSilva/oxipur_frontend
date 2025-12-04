import React from 'react';
import { Shield, User, Lock, MoreVertical } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/Table';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

const Usuarios = () => {
    const usuarios = [
        { id: 1, nombre: 'Admin General', email: 'admin@oxipur.bo', rol: 'Administrador', ultimoAcceso: 'Hace 5 min' },
        { id: 2, nombre: 'Carla Vendedora', email: 'ventas@oxipur.bo', rol: 'Enc. Ventas', ultimoAcceso: 'Hace 1 hora' },
        { id: 3, nombre: 'Mario Logística', email: 'logistica@oxipur.bo', rol: 'Enc. Logística', ultimoAcceso: 'Ayer' },
        { id: 4, nombre: 'Juan Chofer', email: 'juan@oxipur.bo', rol: 'Conductor', ultimoAcceso: 'Hace 20 min' },
    ];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Usuarios y Permisos</h2>
                    <p className="text-gray-500">Control de acceso al sistema</p>
                </div>
                <Button variant="primary"><User size={18} /> Crear Usuario</Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Personal Autorizado</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableHeader>Usuario</TableHeader>
                                <TableHeader>Rol / Permisos</TableHeader>
                                <TableHeader>Estado</TableHeader>
                                <TableHeader>Último Acceso</TableHeader>
                                <TableHeader>Acciones</TableHeader>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {usuarios.map((u) => (
                                <TableRow key={u.id}>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600">
                                                {u.nombre.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-bold text-sm">{u.nombre}</p>
                                                <p className="text-xs text-gray-400">{u.email}</p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={u.rol === 'Administrador' ? 'danger' : 'info'}>{u.rol}</Badge>
                                    </TableCell>
                                    <TableCell><span className="text-green-600 font-bold text-xs">● Activo</span></TableCell>
                                    <TableCell className="text-xs text-gray-500">{u.ultimoAcceso}</TableCell>
                                    <TableCell>
                                        <button className="text-gray-400 hover:text-blue-600"><MoreVertical size={18}/></button>
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

export default Usuarios;