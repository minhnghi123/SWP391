import { X, Save, Sparkles, Edit } from "lucide-react";


const ModalCrudChild = ({ setIsModalOpen, currentChild, isEditing, handleInputChange, handleSaveChild, err, isLoading }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in">
            <div className="bg-white rounded-lg w-full max-w-md p-6 shadow-xl animate-slide-in">
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium text-gray-900 flex items-center">
                        {isEditing ? (
                            <>
                                <Edit className="h-5 w-5 text-blue-500 mr-2" />
                                Edit Child Information
                            </>
                        ) : (
                            <>
                                <Sparkles className="h-5 w-5 text-blue-500 mr-2" />
                                Add New Child
                            </>
                        )}
                    </h3>
                    <button
                        onClick={() => setIsModalOpen(false)}
                        className="text-gray-400 hover:text-gray-500 transition-colors"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSaveChild}>
                    <div className="space-y-4">
                        {/* Full Name */}
                        <div className="floating-label">
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={currentChild?.name || ""}
                                onChange={handleInputChange}
                                required
                                placeholder=" "
                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all"
                            />
                            <label htmlFor="name" className="text-sm font-medium text-gray-700">
                                Full Name
                            </label>
                        </div>

                        {/* Date of Birth */}
                        <div>
                            <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-1">
                                Date of Birth
                            </label>
                            <input
                                type="date"
                                id="dateOfBirth"
                                name="dateOfBirth"
                                value={currentChild?.dateOfBirth ? new Date(currentChild.dateOfBirth).toISOString().split('T')[0] : ""}
                                onChange={handleInputChange}
                                max={new Date().toISOString().split('T')[0]}
                                required
                                className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all"
                            />
                        </div>

                        {/* Gender */}
                        <div>
                            <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
                                Gender
                            </label>
                            <select
                                id="gender"
                                name="gender"
                                value={currentChild?.gender ?? ""}
                                onChange={handleInputChange}
                                className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-all"
                            >
                                <option value="">Not specified</option>
                                <option value="0">Male</option>
                                <option value="1">Female</option>
                            </select>
                        </div>
                    </div>
                    {
                        err && <p className="text-red-300 text-sm">{err}</p>
                    }
                    {/* Buttons */}
                    <div className="mt-6 flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={() => setIsModalOpen(false)}
                            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all btn-hover"
                        >
                            <Save className="h-4 w-4 mr-1" />
                            {isLoading ? 'Loading...' : isEditing ? 'Update' : 'Save'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ModalCrudChild;
