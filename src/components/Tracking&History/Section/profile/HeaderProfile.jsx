import React from 'react';
import { Camera, Check } from 'lucide-react';
import Avatar from '../../../../assets/p15.jpg'
const ProfileHeader = ({ avatar, profileData, edit, handlePreviewAvatar }) => {
    return (
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-8 rounded-2xl shadow-xl mb-8 relative overflow-hidden">
            <div className="absolute inset-0 opacity-10" >
                <div className="absolute inset-0 bg-white opacity-20"
                    style={{ backgroundImage: 'radial-gradient(circle at 25px 25px, rgba(255,255,255,0.2) 2px, transparent 0)', backgroundSize: '50px 50px' }}></div>
            </div>

            <div className="flex items-center justify-between relative z-0">
                <div className="flex items-center gap-8">
                    <div className="relative group">
                        <img
                            className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-lg transition-all duration-300 group-hover:scale-105"
                            src={avatar?.preview || profileData?.avatar || Avatar}
                            alt="User Profile"
                        />
                        <div className="absolute w-6 h-6 rounded-full bg-green-400 right-1 bottom-1 border-2 border-white flex items-center justify-center">
                            <Check className="w-3 h-3 text-white" />
                        </div>
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold text-white mb-2">{profileData?.username || 'User'}</h2>
                        <div className="flex items-center gap-3">
                            <span className={`
                px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1.5
                ${profileData?.status?.toLowerCase() === 'active'
                                    ? 'bg-green-500/20 text-green-100 border border-green-400/30'
                                    : 'bg-gray-500/20 text-gray-100 border border-gray-400/30'}
              `}>
                                <span className={`w-2 h-2 rounded-full ${profileData?.status?.toLowerCase() === 'active' ? 'bg-green-400' : 'bg-gray-400'}`}></span>
                                {profileData?.status || 'Offline'}
                            </span>
                        </div>
                    </div>
                </div>

                {edit && (
                    <>
                        <button
                            onClick={() => document.getElementById('avatarInput')?.click()}
                            className="flex items-center gap-2 px-6 py-2.5 bg-white/15 hover:bg-white/25 text-white rounded-full 
                        transition-all duration-200 border border-white/20 backdrop-blur-sm shadow-lg"
                        >
                            <Camera className="w-4 h-4" />
                            <span>Change Photo</span>
                        </button>
                        <input type="file" id="avatarInput" className="hidden" onChange={handlePreviewAvatar} />
                    </>
                )}
            </div>
        </div>
    );
};

export default ProfileHeader;
