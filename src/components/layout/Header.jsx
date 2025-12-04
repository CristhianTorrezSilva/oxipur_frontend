import React from 'react';
import { Bell, Search, User } from 'lucide-react';

const Header = () => {
    // Leemos el nombre del usuario guardado
    const userName = localStorage.getItem('userName') || 'Usuario';
    const userRole = localStorage.getItem('userRole') || 'Invitado';

    return (
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-10 shadow-sm">

            {/* Search Bar */}
            <div className="w-96 hidden md:block">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Buscar..."
                        className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all text-sm"
                    />
                </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
                <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
                    <Bell size={20} />
                    <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                </button>

                <div className="h-8 w-px bg-gray-200 mx-1"></div>

                {/* User Profile Dinámico */}
                <div className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-1.5 rounded-lg transition-colors">
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-bold text-gray-800">{userName}</p>
                        <p className="text-xs text-green-600 font-medium capitalize">{userRole}</p>
                    </div>
                    <div className="w-9 h-9 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center border border-blue-200 uppercase font-bold">
                        {userName.charAt(0)}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;