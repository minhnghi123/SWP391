import { User, Calendar, Plus, Edit, Trash2, Baby, Heart, Activity, Shield } from 'lucide-react';
import FormatDate from '../../../../utils/Date'
import CalculateAge from '../../../../utils/calculateYearOld'
import ModalDelete from './ModalDelete';
const ChildCart = ({ handleAddChild, sortchildren, handleEditChild, searchTerm, handleDeleteChild}) => {
    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'active': return 'bg-green-100 text-green-800';
            case 'under monitoring': return 'bg-yellow-100 text-yellow-800';
            case 'inactive': return 'bg-gray-100 text-gray-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };


    return (
        <>
          
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortchildren?.length === 0 ? (
                    <div className="col-span-full text-center py-12 bg-white rounded-lg border border-gray-200 shadow-sm animate-fade-in">
                        <Baby className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                        <h3 className="text-lg font-medium text-gray-800 mb-1">No children found</h3>
                        <p className="text-gray-500 mb-4">
                            {searchTerm ? "Try a different search term" : "Add your first child to get started"}
                        </p>
                        {!searchTerm && (
                            <button
                                onClick={handleAddChild}
                                className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors animate-pulse-once"
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
                            className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow card-hover animate-fade-in stagger-item"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className="p-5">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center">
                                        <div className="h-12 w-12 rounded-full overflow-hidden mr-3 bg-gray-100 ring-2 ring-gray-100 hover:ring-blue-200 transition-all duration-300">
                                            {child.avatar ? (
                                                <img
                                                    src={child.avatar}
                                                    alt={child.name}
                                                    className="h-full w-full object-cover"
                                                />
                                            ) : (
                                                <div className="h-full w-full flex items-center justify-center bg-blue-100 text-blue-500">
                                                    <User className="h-6 w-6" />
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-gray-900">{child.name}</h3>
                                            <div className="flex items-center mt-1">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(child.status)}`}>
                                                    {/* {getStatusIcon(child.status)} */}
                                                    {child.status}
                                                </span>
                                                <span className="ml-2 text-xs text-gray-500">
                                                    {CalculateAge(child.dateOfBirth)} year old
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex space-x-1">
                                        <button
                                            onClick={() => handleEditChild(child)}
                                            className="p-1 text-gray-400 hover:text-blue-600 rounded hover:bg-blue-50 transition-colors"
                                            aria-label="Edit"
                                        >
                                            <Edit className="h-4 w-4" />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteChild(child.id)}
                                            className="p-1 text-gray-400 hover:text-red-600 rounded hover:bg-red-50 transition-colors"
                                            aria-label="Delete"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-2 text-sm">
                                    <div className="flex items-center text-gray-600">
                                        <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                                        <span>Born: {FormatDate(child.dateOfBirth)}</span>
                                    </div>
                                    <div className={`flex items-center ${child.gender === 0 ? 'text-blue-500' : 'text-pink-500'}`}>
                                        <User className="h-4 w-4 mr-2 text-gray-400" />
                                        <span>Gender: {child.gender === 0 ? 'Male' : 'Female'}</span>
                                    </div>
                                </div>

                                {/* Health indicators */}
                                <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between">
                                    <div className="flex space-x-3">
                                        <div className="flex items-center text-xs text-gray-500">
                                            <Heart className="h-5 w-5 text-red-400 mr-1" />
                                            <span>Healthy</span>
                                        </div>
                                        <div className="flex items-center text-xs text-gray-500">
                                            <Shield className="h-5 w-5 text-green-400 mr-1" />
                                            <span>Vaccinated</span>
                                        </div>
                                    </div>
                                    <div className="text-xs text-gray-400">
                                        Added {FormatDate(child.createdAt)}
                                    </div>
                                </div>

                                {/* Quick actions */}
                                <div className="mt-4 pt-3 border-t border-gray-100 grid grid-cols-2 gap-2">
                                    <button className="flex items-center justify-center py-1 px-2 text-xs font-medium text-blue-600 bg-blue-50 rounded hover:bg-blue-100 transition-colors">
                                        <Activity className="h-3 w-3 mr-1" />
                                        Health Report
                                    </button>
                                    <button className="flex items-center justify-center py-1 px-2 text-xs font-medium text-purple-600 bg-purple-50 rounded hover:bg-purple-100 transition-colors">
                                        <Calendar className="h-3 w-3 mr-1" />
                                        Schedule Visit
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                )}

            </div>
        </>


    )
}
export default ChildCart