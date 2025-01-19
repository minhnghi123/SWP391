import Avatar from '../../../assets/p15.jpg'
import axios from '../../../Api/axios'
import { useState, useEffect } from 'react'
import { fetchData } from '../../../Api/axios'
import { useParams } from 'react-router-dom'

const Profile = ({id}) => {
    // const { id } = useParams()
    const [profileData, setProfileData] = useState({})
    useEffect(() => {
        axios.get(`user/${id}`)
            .then((res) => setProfileData(res.data))
            .catch((err) => console.log(err))
    })
    const ProfileField = ({ label, value }) => (
        <div className="p-4 bg-white rounded-lg border border-gray-100 hover:border-blue-100 transition-colors duration-200">
            <p className="text-sm text-gray-500 mb-1">{label}</p>
            <p className="text-gray-800 font-medium">{value}</p>
        </div>
    );

    return (
        <div className="w-full mx-auto p-6">
            {/* Profile Header */}
            <div className="mb-8 flex items-center space-x-6">
                <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-offset-4 ring-blue-100">
                    <img
                        src={Avatar}
                        alt="Profile"
                        className="w-full h-full object-cover"
                    />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">{profileData.name}</h1>
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium">
                        <span className="w-2 h-2 rounded-full bg-green-500 mr-2"></span>
                        {profileData.status}
                    </div>
                </div>
            </div>

            {/* Profile Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ProfileField label="Email Address" value={profileData.email} />
                <ProfileField label="Phone Number" value={profileData.phone} />
                <ProfileField label="Date of Birth" value={profileData.dateOfBirth} />
                <ProfileField label="Gender" value={profileData.gender} />
                <ProfileField label="Member Since" value={profileData.createdAt} />

                {/* Action Buttons */}
                <div className="md:col-span-2 mt-4 flex space-x-4">
                    <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200">
                        Edit Profile
                    </button>
                    <button className="px-6 py-2 border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                        Change Password
                    </button>
                </div>
            </div>

            {/* Additional Information */}
            <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
                <h2 className="text-sm font-medium text-blue-800 mb-2">Account Information</h2>
                <p className="text-sm text-blue-600">
                    Your account is verified and active. You have full access to all features.
                </p>
            </div>
        </div>
    );
};

export default Profile;