import { Link, useNavigate } from "react-router-dom";
import AvatarHomePage from "./avatarHomePage";
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { Menu, X } from "lucide-react";
import { FiHome, FiInfo, FiGrid, FiStar, FiPhone } from "react-icons/fi";

export default function Header() {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const cart = useSelector(state => [...state.vaccine.listVaccine, ...state.vaccine.listComboVaccine]);

    const navItems = [
        { label: "Home", id: "home", icon: FiHome },
        { label: "About", id: "about", icon: FiInfo },
        { label: "Variants", id: "variants", icon: FiGrid },
        { label: "Review", id: "feedback", icon: FiStar },
        { label: "Contact", id: "contact", icon: FiPhone },
    ];

    const handleScroll = (id) => {
        document.getElementById(id)?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
        setIsMenuOpen(false);
    };

    return (
        <>
            {/* Desktop Header */}
            <div className="hidden lg:block sticky top-0 left-0 right-0 z-50 px-4">
                <div className="max-w-[1400px] mx-auto mt-4">
                    <div className=" flex flex-row justify-between items-center px-8 py-6
                        border border-gray-200 rounded-3xl bg-white/95 backdrop-blur-sm shadow-lg">
                        <Link to="/">
                            <div className="cursor-pointer flex flex-row gap-2 items-center text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                                <div className="flex items-center space-x-2">
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-blue-400 flex items-center justify-center">
                                        <span className="text-2xl font-bold text-white">H</span>
                                    </div>
                                    <span className="text-xl font-bold text-gray-800">
                                        Health<span className="text-blue-500">Blue</span>
                                    </span>
                                </div>
                            </div>
                        </Link>

                        <div className="flex flex-row justify-between items-center gap-3">
                            <nav className="bg-gray-50/80 px-8 py-3 rounded-full shadow-sm backdrop-blur-sm">
                                <ul className="flex flex-row gap-8 items-center">
                                    {navItems.map((item, index) => (
                                        <li
                                            key={index}
                                            onClick={() => handleScroll(item.id)}
                                            className="text-center px-4 py-1.5 rounded-full text-gray-600 hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-400 font-medium cursor-pointer transition-all duration-300"
                                        >
                                            {item.label}
                                        </li>
                                    ))}
                                </ul>
                            </nav>

                            <div className="flex items-center space-x-4">
                                <Link to="/variantsPage" className="relative">
                                    <ShoppingCartOutlinedIcon className="w-6 h-6 text-gray-600 hover:text-blue-500 transition-colors duration-300" />
                                    {cart.length > 0 && (
                                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                            {cart.length}
                                        </span>
                                    )}
                                </Link>
                                <AvatarHomePage />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Button */}
            <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden fixed top-6 right-6 z-50 p-2.5 rounded-full bg-white shadow-lg menu-button hover:bg-gray-50 transition-colors duration-200"
            >
                {isMenuOpen ? <X className="h-6 w-6 text-gray-700" /> : <Menu className="h-6 w-6 text-gray-700" />}
            </button>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/50 z-40"
                    onClick={() => setIsMenuOpen(false)}
                />
            )}

            {/* Mobile Sidebar */}
            <div className={`lg:hidden fixed top-0 right-0 h-full w-72 bg-white z-50 shadow-xl transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex flex-col h-full">
                    {/* Sidebar Header */}
                    <div className="p-4 border-b">
                        <div className="flex flex-row items-center justify-between">
                            <div className="flex items-center justify-between mb-4">
                                <Link to="/" className="flex items-center space-x-2">
                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-blue-400 flex items-center justify-center">
                                        <span className="text-2xl font-bold text-white">H</span>
                                    </div>
                                    <span className="text-xl font-bold text-gray-800">
                                        Health<span className="text-blue-500">Blue</span>
                                    </span>
                                </Link>
                            </div>
                            <AvatarHomePage />

                        </div>
                        <div className="flex items-center justify-between bg-white p-4 rounded-xl shadow-md">
                            {/* Tiêu đề Total Vaccine */}
                            <h1 className="text-lg font-semibold text-gray-900">Total Vaccine:</h1>

                            {/* Giỏ hàng với hiệu ứng hover */}
                            <Link to="/variantsPage" className="relative group">
                                <ShoppingCartOutlinedIcon className="w-8 h-8 text-gray-700 group-hover:text-blue-600 transition-all duration-300" />

                                {/* Badge hiển thị số lượng */}
                                {cart.length > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-lg">
                                        {cart.length > 9 ? "9+" : cart.length}
                                    </span>
                                )}
                            </Link>
                        </div>

                    </div>

                    {/* Sidebar Navigation */}
                    <nav className="flex-1 overflow-y-auto">
                        <div className="px-4 py-6">
                            <div className="space-y-1">
                                {navItems.map((item, index) => {
                                    const Icon = item.icon;
                                    return (
                                        <button
                                            key={index}
                                            onClick={() => handleScroll(item.id)}
                                            className="flex items-center w-full px-4 py-3 text-base font-medium rounded-xl text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
                                        >
                                            <Icon className="h-5 w-5 mr-3" />
                                            {item.label}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </>
    );
}