import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format, set } from 'date-fns';
import useAxios from '../../utils/useAxios'
import { useSelector } from 'react-redux';
const url = import.meta.env.VITE_BASE_URL_DB;
const mockNotifications = [
    {
        id: 1,
        type: 'appointment',
        title: 'Appointment Reminder',
        message: 'Your vaccination appointment is scheduled for tomorrow at 2:00 PM',
        timestamp: new Date(),
        read: false,
    },
    {
        id: 2,
        type: 'update',
        title: 'Vaccine Status Update',
        message: 'Your vaccination certificate is ready for download',
        timestamp: new Date(),
        read: true,
    }
];


const NotificationItem = ({ notification, onRead }) => {
    const { type, title, message, timestamp, read } = notification;
    const typeStyles = {
        appointment: { icon: '🗓️', color: 'blue' },
        update: { icon: '📋', color: 'green' }
    };
    const style = typeStyles[type] || { icon: '📢', color: 'gray' };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={`p-3 border-b hover:bg-gray-50 cursor-pointer ${!read && 'bg-blue-50/30'}`}
            onClick={() => onRead(notification.id)}
        >
            <div className="flex gap-3">
                <span className="text-xl">{style.icon}</span>
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                        <h3 className="font-medium text-gray-900 truncate">{title}</h3>
                        {!read && <span className="w-2 h-2 bg-blue-500 rounded-full" />}
                    </div>
                    <p className="text-sm text-gray-600 line-clamp-2">{message}</p>
                    <span className="text-xs text-gray-400">
                        {format(timestamp, 'MMM d, h:mm a')}
                    </span>
                </div>
            </div>
        </motion.div>
    );
};

const ModalNotification = ({ isOpen, onClose }) => {
    const user = useSelector((state) => state.account.user)
    const [notifications, setNotifications] = useState(mockNotifications);
    const [filter, setFilter] = useState('all');
    const [loading, setLoading] = useState(false)
    const api = useAxios()
    const [err,setErr]= useState(null)
    const handleMarkAsRead = (id) => {
        setNotifications(notifications.map(n =>
            n.id === id ? { ...n, read: true } : n
        ));
    };
    // useEffect(() => {
    //     const fetchData = async () => {
    //         setLoading(true)
    //         try {
                
    //         } catch (error) {
    //             setErr('Faild fetch data')
    //         }finally{
    //             setLoading(false)
    //         }
    //     }
    //     fetchData()
    // }, [id,loading])
    const handleMarkAllAsRead = () => {
        setNotifications(notifications.map(n => ({ ...n, read: true })));
    };

    const filteredNotifications = notifications.filter(n =>
        filter === 'all' ? true : filter === 'unread' ? !n.read : n.type === filter
    );

    const unreadCount = notifications.filter(n => !n.read).length;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border overflow-hidden"
                >
                    {/* Header */}
                    <div className="p-3 border-b">
                        <div className="flex justify-between items-center">
                            <h2 className="font-semibold text-gray-800">
                                Notifications
                                {unreadCount > 0 && (
                                    <span className="ml-2 px-2 py-0.5 text-xs bg-blue-100 text-blue-600 rounded-full">
                                        {unreadCount}
                                    </span>
                                )}
                            </h2>
                            <button
                                onClick={handleMarkAllAsRead}
                                className="text-sm text-blue-600 hover:text-blue-700"
                            >
                                Clear all
                            </button>
                        </div>

                        {/* Simple Filter */}
                        <div className="flex gap-2 mt-2">
                            {['all', 'unread'].map((f) => (
                                <button
                                    key={f}
                                    onClick={() => setFilter(f)}
                                    className={`px-2 py-1 text-xs rounded-full capitalize
                                        ${filter === f
                                            ? 'bg-blue-100 text-blue-600'
                                            : 'text-gray-600 hover:bg-gray-100'
                                        }`}
                                >
                                    {f}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Notifications */}
                    <div className="max-h-[300px] overflow-y-auto">
                        {filteredNotifications.length === 0 ? (
                            <div className="p-4 text-center text-gray-500">
                                <span className="text-2xl">🔔</span>
                                <p className="mt-1 text-sm">No notifications</p>
                            </div>
                        ) : (
                            filteredNotifications.map(notification => (
                                <NotificationItem
                                    key={notification.id}
                                    notification={notification}
                                    onRead={handleMarkAsRead}
                                />
                            ))
                        )}
                    </div>

                    {/* Footer */}
                    <div className="p-2 border-t bg-gray-50">
                        <button
                            onClick={onClose}
                            className="w-full px-3 py-1.5 text-sm text-gray-600 hover:text-gray-700"
                        >
                            Close
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ModalNotification; 