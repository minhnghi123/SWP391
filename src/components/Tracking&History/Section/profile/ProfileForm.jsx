import React from 'react';
import { Save, X } from 'lucide-react';
import ToUpperCase from '../../../../utils/upperCaseFirstLetter'
import FormDate from '../../../../utils/FormDate'
import formatDate from '../../../../utils/Date';
const ProfileForm = ({ editProfile, profileData, handleEdit, handleSave, setEdit }) => {
    return (
        <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-5">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
                    <input
                        type="text"
                        name="name"
                        value={ToUpperCase(editProfile.name) || ''}
                        onChange={handleEdit}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                        placeholder="Enter your full name"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
                    <input
                        type="email"
                        name="gmail"
                        value={editProfile.gmail || ''}
                        onChange={handleEdit}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                        placeholder="your.email@example.com"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Date of Birth</label>
                    <input
                        type="date"
                        name="dateOfBirth"
                        value={FormDate(editProfile.dateOfBirth)}
                        onChange={handleEdit}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    />
                </div>
            </div>

            <div className="space-y-5">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Phone Number</label>
                    <input
                        type="tel"
                        name="phoneNumber"
                        value={editProfile.phoneNumber || ''}
                        onChange={handleEdit}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                        placeholder="+1 (555) 123-4567"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Gender</label>
                    <select
                        name="gender"
                        value={editProfile.gender} 
                        onChange={handleEdit}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    >
                        <option value="">Select Gender</option>
                        <option value="0">Male</option>
                        <option value="1">Female</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">Account Created</label>
                    <div className="px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-600">
                        {formatDate(profileData.createdAt) || 'Not specified'}
                    </div>
                </div>
            </div>

            <div className="col-span-full flex justify-end space-x-4 mt-4">
                <button
                    type="button"
                    onClick={() => setEdit(false)}
                    className="px-6 py-2.5 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
                >
                    <X className="w-4 h-4" />
                    <span>Cancel</span>
                </button>
                <button
                    type="submit"
                    className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 shadow-md"
                >
                    <Save className="w-4 h-4" />
                    <span>Save Changes</span>
                </button>
            </div>
        </form>
    );
};

export default ProfileForm;
