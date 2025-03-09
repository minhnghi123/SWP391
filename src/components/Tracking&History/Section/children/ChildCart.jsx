import { User, Calendar, Plus, Edit, Trash2, Baby, Heart, Activity, Shield } from 'lucide-react';
import FormatDate from '../../../../utils/Date'
import CalculateAge from '../../../../utils/calculateYearOld'
import ModalDelete from './ModalDelete';

const ChildCart = ({ handleAddChild, sortchildren, handleEditChild, searchTerm, handleDeleteChild}) => {
    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'active': return 'bg-blue-100 text-blue-800';
            case 'under monitoring': return 'bg-amber-100 text-amber-800';
            case 'inactive': return 'bg-slate-100 text-slate-800';
            default: return 'bg-slate-100 text-slate-800';
        }
    };

    return (
        <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortchildren?.length === 0 ? (
                    <div className="col-span-full text-center py-16 bg-white rounded-xl border border-blue-100 shadow-sm hover:shadow-md transition-all duration-300">
                        <Baby className="h-16 w-16 text-blue-400 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-blue-900 mb-2">No children found</h3>
                        <p className="text-blue-600 mb-6">
                            {searchTerm ? "Try a different search term" : "Add your first child to get started"}
                        </p>
                        {!searchTerm && (
                            <button
                                onClick={handleAddChild}
                                className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 shadow-sm hover:shadow"
                            >
                                <Plus className="h-5 w-5 mr-2" />
                                Add Child
                            </button>
                        )}
                    </div>
                ) : (
                    sortchildren?.map((child, index) => (
                        <div
                            key={child.id}
                            className="bg-white rounded-xl border border-blue-50 overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className="p-6">
                                <div className="flex items-start justify-between mb-5">
                                    <div className="flex items-center">
                                        <div className="h-14 w-14 rounded-full overflow-hidden mr-4 bg-blue-50 ring-2 ring-blue-100 hover:ring-blue-300 transition-all duration-300">
                                            {child.avatar ? (
                                                <img
                                                    src={child.avatar}
                                                    alt={child.name}
                                                    className="h-full w-full object-cover"
                                                />
                                            ) : (
                                                <div className="h-full w-full flex items-center justify-center bg-blue-100 text-blue-500">
                                                    <User className="h-7 w-7" />
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-blue-900">{child.name}</h3>
                                            <div className="flex items-center mt-1.5">
                                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(child.status)}`}>
                                                    {child.status}
                                                </span>
                                                <span className="ml-2 text-sm text-blue-600 font-medium">
                                                    {CalculateAge(child.dateOfBirth)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => handleEditChild(child)}
                                            className="p-2 text-blue-500 hover:text-blue-700 rounded-lg hover:bg-blue-50 transition-colors"
                                            aria-label="Edit"
                                        >
                                            <Edit className="h-5 w-5" />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteChild(child.id)}
                                            className="p-2 text-red-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                                            aria-label="Delete"
                                        >
                                            <Trash2 className="h-5 w-5" />
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-3 text-sm">
                                    <div className="flex items-center text-blue-700">
                                        <Calendar className="h-5 w-5 mr-3 text-blue-400" />
                                        <span>Born: {FormatDate(child.dateOfBirth)}</span>
                                    </div>
                                    <div className={`flex items-center ${child.gender === 0 ? 'text-blue-600' : 'text-pink-500'}`}>
                                        <User className="h-5 w-5 mr-3 text-blue-400" />
                                        <span>Gender: {child.gender === 0 ? 'Male' : 'Female'}</span>
                                    </div>
                                </div>

                                <div className="mt-5 pt-4 border-t border-blue-50">
                                    <div className="flex justify-between items-center mb-4">
                                        <div className="flex space-x-4">
                                            <div className="flex items-center text-sm text-blue-600">
                                                <Heart className="h-5 w-5 text-blue-400 mr-2" />
                                                <span>Healthy</span>
                                            </div>
                                            <div className="flex items-center text-sm text-blue-600">
                                                <Shield className="h-5 w-5 text-blue-400 mr-2" />
                                                <span>Vaccinated</span>
                                            </div>
                                        </div>
                                        <div className="text-xs text-blue-400">
                                            Added {FormatDate(child.createdAt)}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3">
                                        <button className="flex items-center justify-center py-2 px-4 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-all duration-300 hover:shadow-sm">
                                            <Activity className="h-4 w-4 mr-2" />
                                            Health Report
                                        </button>
                                        <button className="flex items-center justify-center py-2 px-4 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all duration-300 hover:shadow-sm">
                                            <Calendar className="h-4 w-4 mr-2" />
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