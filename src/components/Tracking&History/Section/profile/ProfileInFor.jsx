import React, { memo } from 'react';
import { User, Mail, Cake, Phone, UserCircle2, Calendar } from 'lucide-react';
import ToUpperCase from '../../../../utils/upperCaseFirstLetter'
import FormDate from '../../../../utils/Date'

const ProfileInfo = ({ profileData }) => {
  const profileItems = [
    {
      icon: <User className="w-5 h-5" />,
      label: 'Full Name',
      value: ToUpperCase(profileData?.name) || 'Not specified'
    },
    {

      icon: <Phone className="w-5 h-5" />,
      label: 'Phone',
      value:  profileData?.phoneNumber || 'XXXXXXXXXX'
    },
    {
      icon: <Mail className="w-5 h-5" />,
      label: 'Email',
      value: profileData?.gmail || 'Not specified'
     
    },
    {

      icon: <UserCircle2 className="w-5 h-5" />,
      label: 'Gender',
      value: profileData?.gender === 0 ? 'Male' : 'Female' || 'Not specified'
    },
    {
      icon: <Cake className="w-5 h-5" />,
      label: 'Date of Birth',
      value: FormDate(profileData?.dateOfBirth) || 'Not specified'
    },
    {
      icon: <Calendar className="w-5 h-5" />,
      label: 'Account Created',
      value: FormDate(profileData?.createdAt) || 'Not specified'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {profileItems.map((item, index) => (
        <div key={index} className="flex items-center p-5 bg-gray-50 rounded-lg hover:shadow-md transition-all duration-200 border border-gray-100">
          <div className="p-3 bg-white rounded-lg shadow-sm text-blue-600 border border-blue-100">
            {item.icon}
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-500 mb-0.5">{item.label}</p>
            <p className="text-gray-800 font-medium">{item.value || 'Not specified'}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default memo(ProfileInfo);
