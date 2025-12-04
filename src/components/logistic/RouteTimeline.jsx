import React from 'react';
import { CheckCircle2, Clock, MapPin } from 'lucide-react';

const RouteTimeline = ({ paradas = [] }) => {
    // Datos demo si no llegan props
    const paradasDemo = paradas.length > 0 ? paradas : [
        { id: 1, direccion: "Av. Banzer 4to Anillo", cliente: "Clínica Nuclear", estado: "completado", hora: "08:30" },
        { id: 2, direccion: "Calle René Moreno #23", cliente: "Consultorio Dr. Paz", estado: "en-curso", hora: "09:45" },
        { id: 3, direccion: "Barrio Hamacas", cliente: "Paciente Domiciliario", estado: "pendiente", hora: "10:30" },
    ];

    return (
        <div className="space-y-0">
            {paradasDemo.map((parada, index) => {
                const isLast = index === paradasDemo.length - 1;

                // Estilos según estado
                let colorClass = "bg-gray-200 text-gray-400"; // Pendiente
                let icon = <Clock size={16} />;

                if (parada.estado === 'completado') {
                    colorClass = "bg-green-100 text-green-600 border-green-200";
                    icon = <CheckCircle2 size={16} />;
                } else if (parada.estado === 'en-curso') {
                    colorClass = "bg-blue-100 text-blue-600 border-blue-200 animate-pulse";
                    icon = <MapPin size={16} />;
                }

                return (
                    <div key={parada.id} className="flex gap-4">
                        {/* Columna Izquierda: Línea de Tiempo */}
                        <div className="flex flex-col items-center">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 z-10 ${colorClass} bg-white`}>
                                {icon}
                            </div>
                            {!isLast && (
                                <div className="w-0.5 h-full bg-gray-200 -my-1"></div>
                            )}
                        </div>

                        {/* Columna Derecha: Contenido */}
                        <div className="pb-8 pt-1 flex-1">
                            <div className="flex justify-between items-start">
                                <h4 className="font-bold text-gray-800 text-sm">{parada.cliente}</h4>
                                <span className="text-xs font-mono text-gray-500 bg-gray-100 px-2 py-0.5 rounded">
                  {parada.hora}
                </span>
                            </div>
                            <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                                <MapPin size={12} />
                                {parada.direccion}
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default RouteTimeline;