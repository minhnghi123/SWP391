import CalculateAge from "../../../../utils/calculateYearOld"
const ListChild = ({ child, index, isSelected, handleChoose }) => {
    return (
        <div
            key={index}
            className={`relative group ${isSelected.some((children) => children.id === child.id)
                ? 'bg-gradient-to-r from-teal-50 to-teal-100/50'
                : 'bg-white hover:bg-gray-50'
                } rounded-2xl border border-gray-200 transition-all duration-300`}
        >
            <div className="p-5 flex items-center justify-between">
                {/* Left Section: Child Info */}
                <div className="flex items-center gap-5">
                    {/* Avatar Container */}
                    <div className={`relative ${child.gender === 0
                        ? 'bg-blue-100'
                        : 'bg-pink-100'
                        } w-14 h-14 rounded-xl flex items-center justify-center`}
                    >
                        <span className="text-2xl">
                            {child.gender === 0 ? '👦' : '👧'}
                        </span>
                        {isSelected.some((children) => children.id === child.id) && (
                            <div className="absolute -top-2 -right-2 w-5 h-5 bg-teal-500 rounded-full 
                                                                flex items-center justify-center border-2 border-white">
                                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                        strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                        )}
                    </div>

                    {/* Child Details */}
                    <div className="space-y-1">
                        <h4 className="text-lg font-semibold text-gray-900">
                            {child.name}
                        </h4>
                        <div className="flex items-center gap-4 text-sm">
                            <span className="text-gray-600">
                                {CalculateAge(child.dateOfBirth)} years old
                            </span>
                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium
                                                                ${child.gender === 0
                                    ? 'bg-blue-100 text-blue-700'
                                    : 'bg-pink-100 text-pink-700'}`}
                            >
                                {child.gender ===0 ?'Male':'Female'}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Right Section: Actions */}
                <div className="flex items-center gap-3">

                    <button
                        onClick={handleChoose}
                        className={`relative px-5 py-2 rounded-xl text-sm font-medium 
                                                            transition-all duration-300 ${isSelected.some((children) => children.id === child.id)
                                ? 'bg-teal-500 text-white hover:bg-teal-600'
                                : 'bg-white border border-gray-200 text-gray-700 hover:border-teal-500 hover:text-teal-500'
                            }`}
                    >
                        {isSelected.some((children) => children.id === child.id) ? 'Selected' : 'Select'}
                    </button>


                </div>
            </div>


        </div>
    )
}
export default ListChild