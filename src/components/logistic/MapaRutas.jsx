import React, { useState } from 'react';
import { MapPin, Navigation } from 'lucide-react';

const MapaRutas = ({
                       height = "h-96",
                       puntos = [] // Array de objetos { x: 50, y: 50, nombre: "Cliente A", tipo: "entrega" }
                   }) => {
    const [activePin, setActivePin] = useState(null);

    // Si no pasas puntos, usamos unos de prueba para que se vea algo en la demo
    const puntosDemo = puntos.length > 0 ? puntos : [
        { id: 1, x: 50, y: 50, nombre: "Central OXIPUR", tipo: "central" },
        { id: 2, x: 30, y: 40, nombre: "Clínica Incor", tipo: "entrega" },
        { id: 3, x: 70, y: 30, nombre: "Hospital Obrero", tipo: "entrega" },
        { id: 4, x: 60, y: 70, nombre: "Centro de Salud Norte", tipo: "entrega" },
    ];

    return (
        <div className={`relative w-full ${height} bg-slate-100 rounded-xl overflow-hidden border border-gray-300 shadow-inner group`}>

            {/* 1. Imagen de Fondo (Mapa Estático) */}
            <img
                src="https://upload.wikimedia.org/wikipedia/commons/e/ec/Map_of_Santa_Cruz_de_la_Sierra.png"
                alt="Mapa Base"
                className="w-full h-full object-cover opacity-60 group-hover:opacity-70 transition-opacity"
            />

            {/* 2. Grid decorativo para que parezca software técnico */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>

            {/* 3. Renderizado de Pines */}
            {puntosDemo.map((punto) => (
                <div
                    key={punto.id}
                    className="absolute transform -translate-x-1/2 -translate-y-full cursor-pointer transition-all hover:scale-110 z-10"
                    style={{ left: `${punto.x}%`, top: `${punto.y}%` }}
                    onMouseEnter={() => setActivePin(punto.id)}
                    onMouseLeave={() => setActivePin(null)}
                >
                    {/* El Icono del Pin */}
                    <div className={`relative ${punto.tipo === 'central' ? 'text-blue-700' : 'text-red-600'}`}>
                        {punto.tipo === 'central' ? (
                            <Navigation size={32} fill="currentColor" className="drop-shadow-lg" />
                        ) : (
                            <MapPin size={32} fill="currentColor" className="drop-shadow-lg" />
                        )}

                        {/* Efecto de onda (ping) para que parezca en vivo */}
                        <span className="absolute top-0 right-0 -mr-1 -mt-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-current"></span>
            </span>
                    </div>

                    {/* Tooltip (Información Flotante) */}
                    {activePin === punto.id && (
                        <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-40 bg-white p-2 rounded shadow-xl text-xs text-center border border-gray-200 z-20">
                            <p className="font-bold text-gray-800">{punto.nombre}</p>
                            <p className="text-gray-500 capitalize">{punto.tipo}</p>
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-white rotate-45 border-r border-b border-gray-200"></div>
                        </div>
                    )}
                </div>
            ))}

            {/* 4. Leyenda del Mapa */}
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur p-2 rounded-lg text-xs shadow border border-gray-200">
                <div className="flex items-center gap-2 mb-1">
                    <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                    <span>Central / Camión</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-600 rounded-full"></div>
                    <span>Punto de Entrega</span>
                </div>
            </div>
        </div>
    );
};

export default MapaRutas;