import { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { accountAction } from '../../../redux/reducers/accountSlice';
import { Pencil } from 'lucide-react';
import ProfileHeader from './HeaderProfile'
import ProfileForm from './ProfileForm'
import ProfileInfo from './ProfileInFor'
import Notification from './Notification'
import { fetchData, addData, deleteData, updateData } from '../../../../Api/axios'
import useAxios from '../../../../utils/useAxios'
const url = import.meta.env.VITE_BASE_URL_DB
const Profile = ({ id }) => {
    const dispatch = useDispatch();
    const api = useAxios()
    const [profileData, setProfileData] = useState(null);
    const [editProfile, setEditProfile] = useState(null);
    const [edit, setEdit] = useState(false);
    const [note, setNote] = useState('');
    const [avatar, setAvatar] = useState(null);
    const [updateTrigger, setUpdateTrigger] = useState(false);
    // Xóa preview khi component unmount
    useEffect(() => {
        return () => {
            if (avatar?.preview) URL.revokeObjectURL(avatar.preview);
        };
    }, [avatar]);

    // Xử lý preview avatar
    const handlePreviewAvatar = (e) => {
        const file = e.target.files[0];
        if (file) {
            file.preview = URL.createObjectURL(file);
            setAvatar(file);
            setEditProfile(prev => ({ ...prev, avatar: file.preview }));
        }
    };

    // Fetch user data từ API
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await api.get(`${url}/User/get-user-by-id/${id}`);
                if (res?.status === 200 && res?.data) {
                    setProfileData(res.data.user);
                    setEditProfile(res.data.user);

                }
            } catch (error) {
                console.error("Error fetching profile:", error);
            }
        };

        if (id) fetchProfile();
    }, [id, updateTrigger]);
    // Xử lý chỉnh sửa dữ liệu
    const handleEdit = (e) => {
        const { name, value } = e.target;
        setEditProfile(prevState => ({ ...prevState, [name]: value }));
    };

    // Xử lý lưu thông tin người dùng
    const handleSave = async (e) => {
        e.preventDefault();

        if (!id) {
            setNote("Invalid user ID");
            return;
        }

        try {
            let imageUrl = profileData.avatar || '';

            
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
            if (editProfile.gender === undefined || editProfile.gender === null || editProfile.gender === '') {
                setNote('Plase choose your gender , You are gay???')
                return;
            }


            const updatedProfile = {
                name: editProfile.name?.trim(),
                phoneNumber: editProfile.phoneNumber?.trim(),
                gmail: editProfile.gmail?.trim(),
                gender: editProfile.gender,
                dateOfBirth: editProfile.dateOfBirth ? new Date(editProfile.dateOfBirth).toISOString() : null,
                avatar: imageUrl

            };

            // console.log(updatedProfile)
            // Gửi dữ liệu cập nhật lên server
            const response = await api.put(`${url}/User/update-user/${id}`, updatedProfile);
            if (response?.status === 200) {
                setNote("Profile updated successfully");
                setEdit(false);
                setTimeout(() => setNote(""), 3000);

                //fetch 
                setUpdateTrigger(prev => !prev);

                // Cập nhật Redux store

                dispatch(
                    accountAction.setUser({
                        id: profileData.id,
                        name: updatedProfile.name,
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
        <div className="max-w-7xl mx-auto h-auto">
            {/* Profile Header */}
            <ProfileHeader
                avatar={avatar}
                profileData={profileData}
                edit={edit}
                handlePreviewAvatar={handlePreviewAvatar}
            />
            {/* Profile Content */}
            <div className="bg-white rounded-xl shadow-lg p-8">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-semibold text-gray-800">Personal Information</h2>
                    {!edit && (
                        <button
                            onClick={() => setEdit(true)}
                            className="px-5 py-2.5 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 
                  transition-all duration-200 flex items-center gap-2 font-medium"
                        >
                            <Pencil className="w-4 h-4" />
                            Edit Profile
                        </button>
                    )}
                </div>

                {edit ? (
                    <ProfileForm
                        editProfile={editProfile}
                        profileData={profileData}
                        handleEdit={handleEdit}
                        handleSave={handleSave}
                        setEdit={setEdit}
                    />
                ) : (
                    <ProfileInfo
                        profileData={profileData}
                    />
                )}

                <Notification message={note} />
            </div>
        </div>

    );
};

export default Profile;