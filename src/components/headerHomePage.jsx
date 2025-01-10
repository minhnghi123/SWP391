import { Link } from "react-router-dom";
import AvatarHomePage from "./avatarHomePage";

import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { useState, useEffect } from 'react';

// Add URL hash updating


// Add initial scroll to hash on load


export default function Header() {

    const [search, setSearch] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const handleSearch = (e) => {
        setSearch(e.target.value);
    }
    const handleOpen = () => {
        setIsOpen(!isOpen);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(search);
        setSearch('')
    }
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
            block: "start",     // Cuộn đến phần trên của phần tử
        });
    };

    return (
        <div className="flex flex-row justify-between items-center px-8 py-6 mx-auto max-w-7xl
          m-4 border border-gray-200 rounded-3xl fixed top-0 left-0 right-0  bg-white z-50 shadow-lg" >
            <div className=" flex flex-row gap-2 items-center text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
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
            <div className="flex flex-row justify-between items-center gap-3">
                <nav className="bg-gray-50/80 px-8 py-3 rounded-full shadow-sm backdrop-blur-sm w-full ">
                    <ul className="flex flex-row gap-8 items-center">
                        {!isOpen ? (
                            <>
                                {navItems.map((item, index) => (
                                    <li
                                        key={index}
                                        onClick={() => handleScroll(item.id)}
                                        className="px-4 py-1.5 rounded-full text-gray-600 hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-400 font-medium cursor-pointer transition-all duration-300"
                                    >
                                        {item.label}
                                    </li>
                                ))}
                                <li
                                    onClick={() => setIsOpen(true)}
                                    className="px-4 py-1.5 rounded-full text-gray-600 hover:text-white hover:bg-gradient-to-r hover:from-blue-500 hover:to-blue-400 font-medium cursor-pointer transition-all duration-300"
                                >
                                    <SearchOutlinedIcon />
                                </li>
                            </>
                        ) : (


                            <form
                                onSubmit={handleSubmit}
                                className="w-[630px] flex flex-row gap-2 items-center 
                                bg-gray-50 p-2 rounded-full shadow-md
                                transform hover:scale-[1.01] transition-all duration-300
                                "
                            >
                                {/* Input Field */}
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    onChange={handleSearch}
                                    value={search}
                                    className="flex-grow border-none bg-transparent px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                                />

                                {/* Search Button */}
                                <button
                                    type="submit"
                                    className="flex items-center justify-center w-10 h-10 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
                                >
                                    <SearchOutlinedIcon />
                                </button>

                                {/* Close Button */}
                                <button
                                    type="button"
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center justify-center w-10 h-10 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                                >
                                    <CloseOutlinedIcon />
                                </button>
                            </form>






                        )}
                    </ul>
                </nav>
                <AvatarHomePage />
            </div>



        </div >
    )
}