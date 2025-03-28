import { Link, useNavigate } from "react-router-dom";
import AvatarHomePage from "./avatarHomePage";
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useDispatch, useSelector } from 'react-redux';
import ModalNotification from './modalNotification';
import { useState, useRef, useEffect } from 'react';
import { FaBars, FaTimes } from "react-icons/fa";

export default function Header() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cart = useSelector(state => [...state.vaccine.listVaccine, ...state.vaccine.listComboVaccine]);
    const user = useSelector((state) => state.account.user);
    const navItems = [
        { label: "Home", id: "home" },
        { label: "About", id: "about" },
        { label: "Variants", id: "variants" },
        { label: "Review", id: "feedback" },
        { label: "Contact", id: "contact" },
    ];

    const [isNotificationOpen, setIsNotificationOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false); // Thêm trạng thái cho menu mobile
    const notificationRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (notificationRef.current && !notificationRef.current.contains(event.target)) {
                setIsNotificationOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleScroll = (id) => {
        document.getElementById(id)?.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
        setIsMenuOpen(false); // Đóng menu mobile khi chọn mục
    };

    return (
        <div className="sticky top-0 z-40 bg-white shadow-lg mx-4 md:mx-auto max-w-[1400px] rounded-3xl mt-4 animate-slideDown opacity-0 animation-delay-200 animate-fill-forwards">
            <div className="flex flex-row justify-between items-center px-4 py-4 md:px-8 md:py-6">
                {/* Logo */}
                <Link to="/">
                    <div className="cursor-pointer flex flex-row gap-2 items-center">
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-gradient-to-r from-blue-500 to-blue-400 flex items-center justify-center">
                                <span className="text-xl md:text-2xl font-bold text-white">H</span>
                            </div>
                            <span className="text-lg md:text-xl font-bold text-gray-800">
                                Health<span className="text-blue-500">Blue</span>
                            </span>
                        </div>
                    </div>
                </Link>

            <div className="flex flex-row justify-between items-center gap-3">
                <nav className="bg-gray-50/80 px-8 py-3 rounded-full shadow-sm backdrop-blur-sm w-full">
                    <ul className="flex flex-row gap-8 items-center">
                        {navItems.map((item, index) => (
                            <li
                                key={index}
                                onClick={() => handleScroll(item.id)}
                                className="px-4 py-1.5 rounded-full text-gray-600 hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-400 font-medium cursor-pointer transition-all duration-300"
                            >
                                {item.label}
                            </li>
                        ))}
                    </ul>
                </nav>
                <div onClick={() => navigate('/variantsPage')} className="relative hover:bg-slate-100 shadow-sm rounded-[50%] p-1">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full">
                        <ShoppingCartOutlinedIcon className="text-gray-600" />
                    </div>
                    {cart && cart.length > 0 && (
                        <p className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-md">
                            {cart.length}
                        </p>
                    )}
                </div>
                {/* <div className="relative" ref={notificationRef}>
                    <div
                        className="w-10 h-10 cursor-pointer p-2 hover:bg-gray-100 rounded-full transition-colors relative"
                        onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                    >
                        <NotificationsOutlinedIcon
                            className="text-gray-600 hover:text-blue-500 transition-colors"
                            fontSize="medium"
                        />
                        <span className="absolute top-1 left-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                            2
                        </span>
                    </div>
                    <ModalNotification
                        isOpen={isNotificationOpen}
                        onClose={() => setIsNotificationOpen(false)}
                    />
                </div> */}

                {user?.id ? (
                    <AvatarHomePage />
                ) : (
                    <button
                        onClick={() => navigate("/loginPage")}
                        className="px-5 py-2 bg-gradient-to-r from-blue-500 to-blue-400 text-white rounded-full font-medium hover:shadow-md transition-all duration-300"
                    >
                        Login
                    </button>
                )}
            </div>
            </div>
        </div>
    );
}