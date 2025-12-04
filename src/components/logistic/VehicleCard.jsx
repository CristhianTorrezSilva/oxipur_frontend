import React from 'react';
import { Truck, User, BatteryCharging } from 'lucide-react';

const VehicleCard = ({ placa, chofer, capacidad, estado = 'disponible', onSelect, isSelected }) => {

    const statusColors = {
        disponible: "bg-green-100 text-green-700",
        "en-ruta": "bg-blue-100 text-blue-700",
        mantenimiento: "bg-orange-100 text-orange-700"
    };

    return (
        <div
            onClick={onSelect}
            className={`
        border rounded-xl p-4 cursor-pointer transition-all hover:shadow-md
        ${isSelected ? 'border-blue-500 ring-1 ring-blue-500 bg-blue-50' : 'border-gray-200 bg-white'}
      `}
        >
            <div className="flex justify-between items-start mb-3">
                <div className="p-2 bg-gray-100 rounded-lg text-gray-600">
                    <Truck size={24} />
                </div>
                <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${statusColors[estado]}`}>
          {estado}
        </span>
            </div>

            <h3 className="font-bold text-lg text-gray-900 mb-1">{placa}</h3>

            <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                    <User size={14} />
                    <span>{chofer || "Sin Chofer Asignado"}</span>
                </div>
                <div className="flex items-center gap-2">
                    <BatteryCharging size={14} />
                    <span>Capacidad: {capacidad} cil.</span>
                </div>
            </div>
        </div>
    );
};

export default VehicleCard;