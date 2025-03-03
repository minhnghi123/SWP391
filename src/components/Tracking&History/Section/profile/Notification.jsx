import React from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';

const Notification = ({ message }) => {
  if (!message) return null;

  const isSuccess = message.toLowerCase().includes('success');

  return (
    <div className={`
      mt-6 p-4 rounded-lg flex items-center gap-3 animate-fadeIn
      ${isSuccess 
        ? 'bg-green-50 text-green-700 border border-green-100' 
        : 'bg-red-50 text-red-700 border border-red-100'
      }
    `}>
      {isSuccess ? (
        <CheckCircle className="w-5 h-5 text-green-500" />
      ) : (
        <AlertCircle className="w-5 h-5 text-red-500" />
      )}
      <span>{message}</span>
    </div>
  );
};

export default Notification;
