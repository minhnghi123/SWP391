import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ToUpperCaseWords from '../../../../utils/upperCaseFirstLetter'
import CalculateAge from "../../../../utils/calculateYearOld"
import formatDecimal from '../../../../utils/calculateMoney';
import HeadsetMicOutlinedIcon from '@mui/icons-material/HeadsetMicOutlined';
import HeadsetOffOutlinedIcon from '@mui/icons-material/HeadsetOffOutlined';
const ChildrenList = ({ child, handleRemmoveChildren, valueSelectVaccine, advitory_detail }) => {

    return (
        <div className=" bg-white rounded-3xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
            {/* Child Header */}
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-full ${child.gender.toLowerCase() === 'male' ? 'bg-blue-50' : 'bg-pink-50'}`}>
                        <span className="text-3xl">
                            {child.gender.toLowerCase() === 'male' ? '👦' : '👧'}
                        </span>
                    </div>
                    <div>
                        <h2 className="text-2xl font-semibold text-gray-800 tracking-tight">
                            {ToUpperCaseWords(child.name)}
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">
                            {CalculateAge(child.dateOfBirth)} years old
                        </p>
                    </div>
                </div>
                <div className='flex flex-row gap-3 items-center'>
                    <span className="px-4 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 text-indigo-600 rounded-full text-sm font-semibold shadow-md transition-all duration-300">
                        {valueSelectVaccine.length} {valueSelectVaccine.length === 1 ? 'Vaccine' : 'Vaccines'}
                    </span>
                    <div onClick={handleRemmoveChildren} className="hover:bg-gray-300 rounded-full p-2 transition-all duration-300 ease-in-out transform hover:scale-105 cursor-pointer">
                        <DeleteOutlineOutlinedIcon className="w-5 h-5 text-gray-500 " />
                    </div>
                </div>
            </div>

            {/* Vaccine List */}
            <div className="space-y-4">
                {valueSelectVaccine.map((vaccine, idx) => (
                    <div key={idx} className="flex justify-between items-center p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-all">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div>
                                <p className="font-medium text-gray-900">{vaccine.name}</p>
                                <p className="text-sm text-gray-500">Vaccine</p>
                            </div>
                        </div>
                        <span className="text-lg font-semibold text-gray-900">
                            {formatDecimal(vaccine.price)} VNĐ
                        </span>
                    </div>
                ))}
            </div>

            <br />
            {/* Child Total */}
            {/* Service price */}
            <div className="flex justify-between items-center p-4 mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100 shadow-sm">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-200 flex items-center justify-center">
                        {
                            advitory_detail && Object.keys(advitory_detail).length > 0
                                ? <HeadsetMicOutlinedIcon />
                                : <HeadsetOffOutlinedIcon />
                        }
                    </div>
                    <div>
                        <p className="font-bold text-gray-900">Advitory</p>
                        <p className="text-sm text-gray-500">For {child.name}</p>
                    </div>
                </div>
                <span className="text-xl font-bold text-blue-600">
                    {formatDecimal(advitory_detail && Object.keys(advitory_detail).length > 0 ? 50000 : 0)} VNĐ
                </span>
            </div>

            {/* total */}
            <div className="flex justify-between items-center p-4 mt-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100 shadow-sm">

                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div>
                        <p className="font-bold text-gray-900">Subtotal</p>
                        <p className="text-sm text-gray-500">For {valueSelectVaccine.length === 1 ? 'vaccine' : 'vaccines'} </p>
                    </div>
                </div>
                <span className="text-xl font-bold text-blue-600">
                    {formatDecimal(valueSelectVaccine.reduce((total, v) => total + v.price, 0))} VNĐ
                </span>
            </div>
        </div>
    )
}
export default ChildrenList