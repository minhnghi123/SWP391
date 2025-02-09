import { useState, useEffect } from 'react';
import { fetchData, updateData } from '../../../Api/axios';
import { useNavigate } from 'react-router-dom';
import Avatar from '../../../assets/p15.jpg';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import CakeIcon from '@mui/icons-material/Cake';
import PersonIcon from '@mui/icons-material/Person';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';
import SecurityIcon from '@mui/icons-material/Security';
import NotificationsIcon from '@mui/icons-material/Notifications';

const Profile = ({ id }) => {
    const navigate = useNavigate();
    const [profileData, setProfileData] = useState({});
    const [activeTab, setActiveTab] = useState('personal');
    const [edit, setEdit] = useState(false);
    const [note, setNote] = useState('');
   
    useEffect(() => {
        fetchData(`user/${id}`)
            .then((res) => setProfileData(res.data))
            .catch((err) => console.log(err));
    }, [id]);

    const handleEdit = (e) => {
        const { name, value } = e.target;
        setProfileData({ ...profileData, [name]: value });
    };

    const handleSave = async (e) => {
        e.preventDefault();
        try {
            await updateData(`user`, id, profileData);
            setNote('Profile updated successfully');
            setEdit(false);
            setTimeout(() => setNote(''), 3000);
        } catch (err) {
            setNote('Error updating profile');
        }
    };

    const tabs = [
        { id: 'personal', label: 'Personal Info' },
        { id: 'security', label: 'Security' },
        { id: 'notifications', label: 'Notifications' },
    ];

    return (
        <div className="max-w-6xl mx-auto">
            {/* Profile Header */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-8 mb-6 text-white">
                <div className="flex flex-col md:flex-row items-center md:space-x-8">
                    <div className="relative group mb-4 md:mb-0">
                        <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-white/30 shadow-xl">
                            <img
                                src={Avatar}
                                alt="Profile"
                                className="w-full h-full object-cover transform group-hover:scale-105 transition-all duration-300"
                            />
                        </div>
                        <button className="absolute bottom-0 right-0 bg-white text-blue-600 p-2 rounded-full shadow-lg hover:bg-blue-50 transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </button>
                    </div>
                    <div className="text-center md:text-left">
                        <h1 className="text-3xl font-bold mb-2">{profileData.name}</h1>
                        <p className="text-blue-100 mb-4">{profileData.role || 'Healthcare Professional'}</p>
                        <div className="flex flex-wrap justify-center md:justify-start gap-3">
                            <span className="px-4 py-1.5 bg-white/20 rounded-full text-sm backdrop-blur-sm">
                                {profileData.specialization || 'General Practice'}
                            </span>
                            <span className="px-4 py-1.5 bg-white/20 rounded-full text-sm backdrop-blur-sm">
                                ID: #{profileData.id}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="bg-white rounded-xl shadow-sm mb-6">
                <div className="border-b">
                    <nav className="flex overflow-x-auto">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-6 py-4 text-sm font-medium whitespace-nowrap border-b-2 transition-colors
                                    ${activeTab === tab.id
                                        ? 'border-blue-500 text-blue-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </nav>
                </div>
            </div>

            {/* Content Sections */}
            {activeTab === 'personal' && (
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold text-gray-800">Personal Information</h2>
                        {!edit && (
                            <button
                                onClick={() => setEdit(true)}
                                className="px-4 py-2 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 
                                         transition-colors flex items-center space-x-2"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                </svg>
                                <span>Edit Profile</span>
                            </button>
                        )}
                    </div>

                    {edit ? (
                        <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Edit Form Fields */}
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={profileData.name || ''}
                                        onChange={handleEdit}
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 
                                                 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={profileData.email || ''}
                                        onChange={handleEdit}
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 
                                                 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                                {/* Add more form fields as needed */}
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={profileData.phone || ''}
                                        onChange={handleEdit}
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 
                                                 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Specialization</label>
                                    <input
                                        type="text"
                                        name="specialization"
                                        value={profileData.specialization || ''}
                                        onChange={handleEdit}
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 
                                                 focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                            </div>

                            <div className="col-span-full flex justify-end space-x-4 mt-6">
                                <button
                                    type="button"
                                    onClick={() => setEdit(false)}
                                    className="px-6 py-2 border border-gray-200 text-gray-600 rounded-lg 
                                             hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                                             transition-colors"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[
                                { icon: <EmailIcon />, label: 'Email', value: profileData.email },
                                { icon: <PhoneIcon />, label: 'Phone', value: profileData.phone },
                                { icon: <LocationOnIcon />, label: 'Location', value: profileData.location },
                                { icon: <WorkIcon />, label: 'Specialization', value: profileData.specialization },
                                { icon: <CakeIcon />, label: 'Date of Birth', value: profileData.dateOfBirth },
                                { icon: <PersonIcon />, label: 'Gender', value: profileData.gender }
                            ].map((item, index) => (
                                <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg">
                                    <div className="p-2 bg-white rounded-lg shadow-sm text-blue-500">
                                        {item.icon}
                                    </div>
                                    <div className="ml-4">
                                        <p className="text-sm font-medium text-gray-500">{item.label}</p>
                                        <p className="text-gray-800">{item.value || 'Not specified'}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {note && (
                        <div className={`mt-6 p-4 rounded-lg ${
                            note.includes('success') 
                                ? 'bg-green-50 text-green-700 border border-green-100' 
                                : 'bg-red-50 text-red-700 border border-red-100'
                        }`}>
                            {note}
                        </div>
                    )}
                </div>
            )}

            {/* Additional tabs content can be added here */}
        </div>
    );
};

export default Profile;