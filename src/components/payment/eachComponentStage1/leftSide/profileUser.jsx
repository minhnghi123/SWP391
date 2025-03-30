import ToUperCaseFirstLetter from '../../../../utils/upperCaseFirstLetter'
const ProfileUser = ({id,name,img,status,email}) => {
    return (

        <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center gap-6">
                <div className="relative">
                    <div className="w-24 h-24 rounded-full overflow-hidden">
                        <img
                            src={img}
                            alt="Patient"
                            className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-300"
                        />
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-7 h-7 bg-green-400 rounded-full border-4 border-white"></div>
                </div>
                <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                        <h2 className="text-xl font-bold text-gray-900">{ToUperCaseFirstLetter(name)}</h2>
                        <span className="px-4 py-1.5 bg-teal-50 text-teal-600 rounded-full text-sm font-medium">
                           {status}
                        </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500 max-sm:flex-col">
                        <div className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            <span>ID: {id}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                            <span>{email}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
export default ProfileUser