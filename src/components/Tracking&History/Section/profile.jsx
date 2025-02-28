import { useState, useEffect } from 'react';
import { fetchData, updateData } from '../../../Api/axios';
import { useNavigate } from 'react-router-dom';
import Avatar from '../../../assets/p15.jpg';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import CakeIcon from '@mui/icons-material/Cake';
import PersonIcon from '@mui/icons-material/Person';
import ToUpperCaseWords from '../../../utils/upperCaseFirstLetter'
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Input } from '@mui/material';
import { accountAction } from '../../redux/reducers/accountSlice';
const Profile = ({ id }) => {
    const dispatch = useDispatch();
    const [profileData, setProfileData] = useState({});
    const [edit, setEdit] = useState(false);
    const [note, setNote] = useState('');
    const [avatar, setAvatar] = useState(null);

    useEffect(() => {
        return () => {
            avatar && URL.revokeObjectURL(avatar.preview);
        };
    }, [avatar]);

    const handlePreviewAvatar = (e) => {
        const file = e.target.files[0];
        if (file) {
            file.preview = URL.createObjectURL(file);
            setAvatar(file);
        }
    };

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await axios.get(`http://localhost:5272/api/User/get-user-by-id/${id}`);
                if (res?.status === 200 && res?.data) {
                    setProfileData(res?.data?.user);
                }
            } catch (error) {
                console.error("Error fetching profile:", error);
            }
        };

        if (id) fetchProfile();
    }, [id]);

    const handleEdit = (e) => {
        const { name, value } = e.target;
        setProfileData({ ...profileData, [name]: value });
    };


    const handleSave = async (e) => {
        e.preventDefault();
        if (!id) {
            setNote("Invalid user ID");
            return;
        }
        try {
            let imageUrl = profileData.avatar;

            if (avatar) {
                const formData = new FormData();
                formData.append("file", avatar);
                formData.append("upload_preset", "First_time_using");
                formData.append("cloud_name", "dzmx76ojp");

                const uploadResponse = await axios.post(
                    "https://api.cloudinary.com/v1_1/dzmx76ojp/image/upload",
                    formData
                );

                imageUrl = uploadResponse.data.secure_url;
            }


            const value = {
                name: profileData.name?.trim(),
                phoneNumber: profileData.phoneNumber?.trim(),
                gmail: profileData.gmail?.trim(),
                gender: profileData.gender !== undefined ?
                    (profileData.gender === "Male" ? 0 : profileData.gender === "Female" ? 1 : profileData.gender)
                    : undefined,
                dateOfBirth: profileData.dateOfBirth
                    ? new Date(profileData.dateOfBirth).toISOString()
                    : null,
                avatar: imageUrl
            };


            const response = await axios.post(
                `http://localhost:5272/api/User/update-user/${id}`,
                value
            );

            if (response?.status === 200) {
                setNote("Profile updated successfully");
                setEdit(false);
                setTimeout(() => setNote(""), 3000);

                dispatch(
                    accountAction.setUser({
                        id: profileData.id,
                        name: profileData.name,
                        role: profileData.role,
                        avatar: imageUrl
                    })
                );
            }
        } catch (err) {
            setNote(err.response?.data?.message || "Error updating profile");
        }
    };





    return (
        <div className="max-w-6xl mx-auto">
            {/* Profile Header */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-8 rounded-2xl shadow-lg mb-8">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-8">
                        <div className="relative">
                            {avatar?.preview ? (
                                <img
                                    className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg transition-transform hover:scale-105"
                                    src={avatar.preview}
                                    alt="User Profile Picture"
                                />
                            ) : (
                                <img
                                    className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg transition-transform hover:scale-105"
                                    src={profileData.avatar || Avatar}
                                    alt="Profile Picture"
                                />
                            )}
                            <div className="absolute w-5 h-5 rounded-full bg-green-400 right-1 bottom-1 border-2 border-white"></div>
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-1">{profileData.username}</h2>
                            <div className="flex items-center gap-3">


                                <p className={`${ToUpperCaseWords(profileData.status) === 'Active'
                                    ? 'bg-green-500 text-white'
                                    : 'bg-gray-500 text-white'
                                    } px-3 py-1 rounded-full text-sm font-medium`}>
                                    {ToUpperCaseWords(profileData.status)}
                                </p>
                            </div>
                        </div>
                    </div>
                    {
                        edit &&
                        <>
                            <button
                                onClick={() => document.getElementById('avatarInput').click()}
                                className="flex items-center gap-2 px-6 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all duration-200 border border-white/20 backdrop-blur-sm"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                Change Photo
                            </button>
                            <input type="file" id="avatarInput" className="hidden" onChange={handlePreviewAvatar} />
                        </>
                    }
                </div>
            </div>

            {/* Profile Content */}
            <div className="bg-white rounded-xl shadow-lg p-8 ">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800">Personal Information</h2>
                    {!edit && (
                        <button
                            onClick={() => setEdit(true)}
                            className="px-5 py-2.5 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 
                            transition-all duration-200 flex items-center gap-2 font-medium"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                            Edit Profile
                        </button>
                    )}
                </div>

                {edit ? (
                    <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Cột 1 */}
                        <div className="space-y-4">
                            {/* Full Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={ToUpperCaseWords(profileData.name) || ''}
                                    onChange={handleEdit}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={profileData.gmail || ''}
                                    onChange={handleEdit}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>

                            {/* Date of Birth */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                                <input
                                    type="date"
                                    name="dateOfBirth"
                                    value={profileData.dateOfBirth ? profileData.dateOfBirth.split("T")[0] : ""}
                                    onChange={handleEdit}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />

                            </div>
                        </div>

                        {/* Cột 2 */}
                        <div className="space-y-4">
                            {/* Phone */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                                <input
                                    type="number"
                                    name="phone"
                                    value={profileData.phoneNumber || ''}
                                    onChange={handleEdit}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                />
                            </div>

                            {/* Gender */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                                <select
                                    name="gender"
                                    value={profileData.gender === 0 ? 'Male' : 'Female' || ''}
                                    onChange={handleEdit}
                                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                >
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>
                        </div>

                        {/* Create Account (chỉ hiển thị, không chỉnh sửa) */}
                        <div className="col-span-full">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Create Account</label>
                            <p className="px-4 py-2 border border-gray-200 rounded-lg bg-gray-100 text-gray-600">
                                {profileData.createdAt || 'Not specified'}
                            </p>
                        </div>

                        {/* Nút thao tác */}
                        <div className="col-span-full flex justify-end space-x-4 mt-6">
                            <button
                                type="button"
                                onClick={() => setEdit(false)}
                                className="px-6 py-2 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Save Changes
                            </button>
                        </div>
                    </form>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {[
                            { icon: <AccountCircleOutlinedIcon />, label: 'Full Name', value: ToUpperCaseWords(profileData.name) },
                            { icon: <EmailIcon />, label: 'Email', value: profileData.gmail },
                            { icon: <CakeIcon />, label: 'Date of Birth', value: profileData.dateOfBirth },
                            { icon: <PhoneIcon />, label: 'Phone', value: profileData.phoneNumber },
                            { icon: <PersonIcon />, label: 'Gender', value: profileData.gender === 0 ? 'Male' : 'Female' },
                            { icon: <CalendarTodayOutlinedIcon />, label: 'Create Account', value: profileData.createdAt }
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
                    <div className={`mt-6 p-4 rounded-lg ${note.includes('success')
                        ? 'bg-green-50 text-green-700 border border-green-100'
                        : 'bg-red-50 text-red-700 border border-red-100'
                        }`}>
                        {note}
                    </div>
                )}
            </div>



            {/* Additional tabs content can be added here */}
        </div>
    );
};

export default Profile;