import { Link } from "react-router-dom";

import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
export default function Header() {
    const nav = ["Home", "About", "Variants","Review", "Contact",<SearchOutlinedIcon/>]
    return (
        <div className="flex flex-row justify-between items-center px-8 py-6 mx-auto max-w-7xl
          m-4 border border-gray-200 rounded-3xl fixed top-0 left-0 right-0  bg-white z-50 shadow-lg">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            <div className="flex items-center space-x-2">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-blue-400 flex items-center justify-center">
                            <span className="text-2xl font-bold text-white">H</span>
                        </div>
                        <span className="text-xl font-bold text-gray-800">
                            Health<span className="text-blue-500">Blue</span>
                        </span>
                    </div>
            </div>
            <div className="flex flex-row justify-between items-center">
                <nav className="bg-gray-50/80 px-8 py-3 rounded-full shadow-sm backdrop-blur-sm">
                    <ul className="flex flex-row gap-8 items-center">
                        {
                            nav.map((item, index) => (
                                <li key={index}
                                    className="px-4 py-1.5 rounded-full text-gray-600 hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-400 font-medium cursor-pointer transition-all duration-300"
                                >
                                    {item}
                                </li>
                            ))
                        }
                    </ul>
                </nav>
                <div className="flex items-center gap-2 ">
                    <div className="cursor-pointer p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <NotificationsOutlinedIcon
                            className="text-gray-600 hover:text-blue-500 transition-colors"
                            fontSize="medium"
                        />
                    </div>
                    <Link
                        to="/loginPage"
                        className="px-6 py-2.5 bg-gradient-to-r from-blue-500 to-blue-400 text-white rounded-full hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300 font-medium"
                    >
                        Login
                    </Link>
                </div>
            </div>
          
           

        </div>
    )
}