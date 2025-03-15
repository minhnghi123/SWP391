import CalculateAge from "../../../../utils/calculateYearOld"
const ListChild = ({ child, index, isSelected, handleChoose, isVaccineSuitableForAnyChild, isComboSuitableForAnyChild }) => {
    // Check if the child is suitable for any vaccine or combo
    const isVaccineSuitable = isVaccineSuitableForAnyChild ? isVaccineSuitableForAnyChild(child) : true;
    const isComboSuitable = isComboSuitableForAnyChild ? isComboSuitableForAnyChild(child) : true;
    const isSuitableForVaccination = isVaccineSuitable || isComboSuitable;
    
    // Determine if the child is already selected
    const isChildSelected = isSelected.some((children) => children.id === child.id);
    
    return (
        <div
            key={index}
            className={`relative group ${isChildSelected
                ? 'bg-gradient-to-r from-[#E8F5F6] to-[#F0F9FA]'
                : isSuitableForVaccination 
                  ? 'bg-white hover:bg-gray-50'
                  : 'bg-red-50'
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
                        {isChildSelected && (
                            <div className="absolute -top-2 -right-2 w-5 h-5 bg-[#00a0aa] rounded-full 
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
                                {CalculateAge(child.dateOfBirth)}
                            </span>
                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium
                                ${child.gender === 0
                                    ? 'bg-blue-100 text-blue-700'
                                    : 'bg-pink-100 text-pink-700'}`}
                            >
                                {child.gender === 0 ? 'Male' : 'Female'}
                            </span>
                        </div>
                        
                        {/* Add warning if child is not suitable */}
                        {!isSuitableForVaccination && (
                            <div className="mt-1">
                                <span className="text-red-500 text-xs font-medium">
                                    Not eligible for available vaccines
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Section: Actions */}
                <div className="flex items-center gap-3">
                    <button
                        onClick={isSuitableForVaccination ? handleChoose : undefined}
                        disabled={!isSuitableForVaccination}
                        className={`relative px-5 py-2 rounded-xl text-sm font-medium 
                            transition-all duration-300 ${
                                isChildSelected
                                    ? 'bg-[#00a0aa] text-white hover:opacity-90'
                                    : isSuitableForVaccination
                                        ? 'bg-white border border-gray-200 text-gray-700 hover:border-[#00a0aa] hover:text-[#00a0aa]'
                                        : 'bg-gray-100 border border-gray-200 text-gray-400 cursor-not-allowed'
                            }`}
                    >
                        {isChildSelected ? 'Selected' : isSuitableForVaccination ? 'Select' : 'Not Eligible'}
                    </button>
                </div>
            </div>
        </div>
    )
}
export default ListChild