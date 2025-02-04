import Avatar from '../../../assets/p15.jpg';
import { useState, useEffect } from 'react';
import { fetchData, updateData } from '../../../Api/axios';
import { useParams, useNavigate } from 'react-router-dom';

const Profile = ({ id }) => {
    const navigate = useNavigate()
    const [profileData, setProfileData] = useState({});
    const [edit, setEdit] = useState(false);
    const [note, setNote] = useState('');
    const handleEdit = (e) => {
        const { name, value } = e.target;
        setProfileData({ ...profileData, [name]: value });
    };

    useEffect(() => {
        fetchData(`user/${id}`)
            .then((res) => setProfileData(res.data))
            .catch((err) => console.log(err));
    }, []);

    const handleSave = (e) => {
        e.preventDefault();
        setEdit(false);
        updateData(`user`, id, profileData)
            .then((res) => setNote('Update success'))
            .catch((err) => setNote('Error updating data'));
    };
    const handleOpenEdit = () => {
        setEdit(true);
        setNote('');
    }


    return (
        <div className="w-full">
            {/* Profile Header Card */}
            <div className="bg-white rounded-xl shadow-sm mb-6 p-6">
                <div className="flex flex-col md:flex-row md:items-center md:space-x-6">
                    <div className="relative group">
                        <div className="w-28 h-28 md:w-32 md:h-32 rounded-xl overflow-hidden ring-2 ring-offset-2 ring-blue-100 shadow-md group-hover:shadow-lg transition-all duration-300">
                            <img
                                src={Avatar}
                                alt="Profile"
                                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                        <div className="absolute bottom-2 right-2 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>
                    <div className="mt-4 md:mt-0">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">{profileData.name}</h2>
                        <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-sm font-medium">
                            <span className="w-2 h-2 rounded-full bg-blue-500 mr-2"></span>
                            {profileData.status}
                        </div>
                    </div>
                </div>
            </div>

            {/* Profile Information */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-semibold text-gray-800">Personal Information</h3>
                    {!edit && (
                        <button
                            onClick={handleOpenEdit}
                            className="px-4 py-2 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors duration-200 flex items-center space-x-2"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                            <span>Edit</span>
                        </button>
                    )}
                </div>

                {edit ? (
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700">Email Address</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </span>
                                <input
                                    type="text"
                                    placeholder="Enter your email"
                                    value={profileData.email || ''}
                                    onChange={handleEdit}
                                    name="email"
                                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700">Phone Number</label>
                            <input
                                type="number"
                                placeholder="Enter your phone number"
                                value={profileData.phone || ''}
                                onChange={handleEdit}
                                name="phone"
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-sm font-semibold text-gray-700">Date of Birth</label>
                            <input
                                type="date"
                                value={profileData.dateOfBirth || ''}
                                onChange={handleEdit}
                                name="dateOfBirth"
                                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                            />
                        </div>
                        <div className='space-y-3'>
                            <label className='block text-sm font-semibold text-gray-700'>Gender</label>
                            <div className='flex flex-wrap gap-6'>
                                {['Male', 'Female', 'Other'].map((option) => (
                                    <label key={option} className="relative flex items-center group cursor-pointer">
                                        <input
                                            type="radio"
                                            name="gender"
                                            value={option.toLowerCase()}
                                            checked={profileData.gender === option.toLowerCase()}
                                            onChange={handleEdit}
                                            className="peer sr-only"
                                        />
                                        <div className="w-5 h-5 border-2 border-gray-300 rounded-full peer-checked:border-blue-500 peer-checked:bg-blue-500 transition-all duration-200"></div>
                                        <div className="absolute w-2.5 h-2.5 bg-white rounded-full left-[5px] top-[5px] peer-checked:scale-100 scale-0 transition-transform duration-200"></div>
                                        <span className="ml-3 text-gray-700 group-hover:text-gray-900">{option}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                        <div className="flex justify-end space-x-4 mt-6">
                            <button
                                onClick={() => setEdit(false)}
                                className="px-6 py-2 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            { label: 'Email', value: profileData.email, icon: 'mail' },
                            { label: 'Phone', value: profileData.phone, icon: 'phone' },
                            { label: 'Date of Birth', value: profileData.dateOfBirth, icon: 'calendar' },
                            { label: 'Gender', value: profileData.gender, icon: 'user' }
                        ].map((item) => (
                            <div key={item.label} className="flex items-start space-x-4 p-4 rounded-lg bg-gray-50">
                                <div className="p-2 bg-white rounded-lg shadow-sm">
                                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        {/* Add appropriate icon paths based on item.icon */}
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-gray-500">{item.label}</p>
                                    <p className="text-gray-800">{item.value}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Status Messages */}
                {note && (
                    <div className={`mt-4 p-3 rounded-lg text-sm ${
                        note === 'Update success' 
                            ? 'bg-green-50 text-green-700 border border-green-100' 
                            : 'bg-red-50 text-red-700 border border-red-100'
                    }`}>
                        {note}
                    </div>
                )}
            </div>

            {/* Security Section */}
            <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-semibold text-gray-800">Security Settings</h3>
                    <button className="px-4 py-2 text-sm bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors duration-200 flex items-center space-x-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                        </svg>
                        <span>Change Password</span>
                    </button>
                </div>
                <div className="p-4 bg-blue-50 rounded-lg">
                    <div className="flex items-center space-x-3 text-blue-600">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <p className="text-sm">Your account is secured with two-factor authentication</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
