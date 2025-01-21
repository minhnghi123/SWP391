import { Link } from 'react-router-dom'

import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
const HeaderVariants = () => {
    return (
        <div className="flex flex-row justify-between items-center px-8 py-6 mx-auto max-w-[1400px]
          border border-gray-200 rounded-3xl fixed top-0 left-0 right-0  bg-white z-50 shadow-lg">
            <div className='flex flex-row items-center gap-3'>
                {/* logo */}
                <Link to="/">
                    <div className=" cursor-pointer flex flex-row gap-2 items-center text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
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
                {/* lich tu van */}
                <div className="flex items-center gap-4 p-4 ">
                    <div className="flex items-center justify-center  text-blue-500 rounded-full p-2">
                        <CalendarMonthOutlinedIcon className="w-8 h-8" />
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold text-gray-800">Giờ hành chính</h4>
                        <p className="text-sm text-gray-600">Thứ 2 - Thứ 6: 8:00 - 17:00</p>
                        <p className="text-sm text-gray-600">Thứ 7: 8:00 - 12:00</p>
                    </div>
                </div>

            </div>
            <div>

            </div>

        </div>
    )
}

export default HeaderVariants