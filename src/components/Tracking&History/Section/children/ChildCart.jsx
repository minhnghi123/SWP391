import { User, Calendar, Plus, Edit, Trash2, Baby, Heart, Activity, Shield } from 'lucide-react';
import FormatDate from '../../../../utils/Date'
import CalculateAge from '../../../../utils/calculateYearOld'
// import ModalDelete from './ModalDelete';
import FemaleOutlinedIcon from '@mui/icons-material/FemaleOutlined';
import MaleOutlinedIcon from '@mui/icons-material/MaleOutlined';
import ToUperCaseFirstLetter from '@/utils/upperCaseFirstLetter';
const ChildCart = ({ handleAddChild, sortchildren, handleEditChild, searchTerm, handleDeleteChild}) => {
    console.log(sortchildren)
    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'active': return 'bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-800 border border-emerald-200';
            case 'tracking': return 'bg-amber-100 text-amber-800 border border-amber-200';
            case 'inactive': return 'bg-gradient-to-r from-slate-100 to-gray-100 text-gray-800 border border-gray-200';
            default: return 'bg-gradient-to-r from-slate-100 to-gray-100 text-gray-800 border border-gray-200';
        }
    };

    return (
        <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sortchildren?.length === 0 ? (
                    <div className="col-span-full text-center py-12 bg-white rounded-xl border border-sky-100 shadow-md hover:shadow-lg transition-all duration-300">
                        <Baby className="h-16 w-16 text-sky-500 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent mb-2">No children found</h3>
                        <p className="text-sky-600 mb-6">
                            {searchTerm ? "Try a different search term" : "Add your first child to get started"}
                        </p>
                        {!searchTerm && (
                            <button
                                onClick={handleAddChild}
                                className="inline-flex items-center bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 hover:shadow-md"
                            >
                                <Plus className="h-4 w-4 mr-2" />
                                Add Child
                            </button>
                        )}
                    </div>
                ) : (
                    sortchildren?.map((child, index) => (
                        <div
                            key={child.id}
                            className="group bg-white rounded-xl border border-sky-100 overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className="p-4">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center">
                                        <div className={`h-12 w-12 rounded-lg overflow-hidden mr-3 ${
                                            child.gender === 0 
                                            ? 'bg-gradient-to-r from-sky-100 to-blue-100 ring-1 ring-sky-200 group-hover:ring-sky-300' 
                                            : 'bg-gradient-to-r from-pink-100 to-rose-100 ring-1 ring-pink-200 group-hover:ring-pink-300'
                                        } transition-all duration-300`}>
                                            <div className="h-full w-full flex items-center justify-center">
                                                {child.gender === 0 ? 
                                                    <MaleOutlinedIcon className="h-6 w-6 text-sky-500" /> : 
                                                    <FemaleOutlinedIcon className="h-6 w-6 text-pink-500" />
                                                }
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-base font-semibold text-gray-900 mb-1">{ToUperCaseFirstLetter(child.name)}</h3>
                                            <div className="flex items-center gap-2">
                                                <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${getStatusColor(child?.status)}`}>
                                                    {child?.status}
                                                </span>
                                                <span className="text-xs text-gray-600 font-medium">
                                                    {CalculateAge(child?.dateOfBirth)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex space-x-1">
                                        <button
                                            onClick={() => handleEditChild(child)}
                                            className="p-1.5 text-gray-500 hover:text-sky-600 rounded-md hover:bg-sky-50 transition-colors"
                                            aria-label="Edit"
                                        >
                                            <Edit className="h-4 w-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteChild(child.id)}
                                            className="p-1.5 text-gray-500 hover:text-rose-600 rounded-md hover:bg-rose-50 transition-colors"
                                            aria-label="Delete"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                                    <div className="flex items-center bg-gray-50 p-2 rounded-md">
                                        <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                                        <span className="text-gray-700">{FormatDate(child.dateOfBirth)}</span>
                                    </div>
                                    <div className={`flex items-center p-2 rounded-md ${
                                        child.gender === 0 
                                        ? 'bg-sky-50 text-sky-700' 
                                        : 'bg-pink-50 text-pink-700'
                                    }`}>
                                        {child.gender === 0 ? 
                                            <MaleOutlinedIcon className="h-4 w-4 mr-2" /> :
                                            <FemaleOutlinedIcon className="h-4 w-4 mr-2" />
                                        }
                                        <span>{child.gender === 0 ? 'Male' : 'Female'}</span>
                                    </div>
                                </div>

                                <div className="border-t border-gray-100 pt-3">
                                    <div className="flex justify-between items-center mb-3">
                                        <div className="flex space-x-2">
                                            <div className="flex items-center text-xs bg-emerald-50 px-2 py-1 rounded-md text-emerald-700">
                                                <Heart className="h-3 w-3 mr-1 text-emerald-500" />
                                                <span>Healthy</span>
                                            </div>
                                            <div className="flex items-center text-xs bg-blue-50 px-2 py-1 rounded-md text-blue-700">
                                                <Shield className="h-3 w-3 mr-1 text-blue-500" />
                                                <span>Vaccinated</span>
                                            </div>
                                        </div>
                                        <div className="text-[10px] text-gray-400">
                                            {FormatDate(child.createdAt)}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-2">
                                        <button className="flex items-center justify-center py-1.5 px-3 text-xs font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors">
                                            <Activity className="h-3 w-3 mr-1" />
                                            Health Report
                                        </button>
                                        <button className="flex items-center justify-center py-1.5 px-3 text-xs font-medium text-white bg-gradient-to-r from-sky-500 to-blue-600 rounded-md hover:from-sky-600 hover:to-blue-700 transition-colors">
                                            <Calendar className="h-3 w-3 mr-1" />
                                            Schedule Visit
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default ChildCart