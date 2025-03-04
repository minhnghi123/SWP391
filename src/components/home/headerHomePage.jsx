import { Link, useNavigate } from "react-router-dom";
import AvatarHomePage from "./avatarHomePage";
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { useDispatch, useSelector } from 'react-redux';

export default function Header() {
    const dispatch = useDispatch()
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

    const handleScroll = (id) => {
        document.getElementById(id)?.scrollIntoView({
            behavior: "smooth", // Cuộn mượt
            block: "start",    
        });
    };





    return (
        <div className="flex flex-row justify-between items-center px-8 py-6 mx-auto max-w-[1400px]
          border border-gray-200 rounded-3xl sticky top-0 left-0 right-0  bg-white z-50 shadow-lg mt-4
          animate-slideDown opacity-0 animation-delay-200 animate-fill-forwards">
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
                    <div className="w-10 h-10 cursor-pointer p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <NotificationsOutlinedIcon
                            className="text-gray-600 hover:text-blue-500 transition-colors mb-3"
                            fontSize="medium"
                        />
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

                {user?.id ? (
                    <AvatarHomePage />
                ) : (
                    <button onClick={() => navigate('/loginPage')}>Login</button>
                )}
            </div>
        </div>
    );
}