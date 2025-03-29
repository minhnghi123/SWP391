import React, { useState, useCallback, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { accountAction } from '../components/redux/reducers/accountSlice';
import useAxios from '../utils/useAxios';
import { Button } from "@/components/ui/button"; // shadcn/ui Button
import { AlertCircle } from "lucide-react"; // Lucide icons

const url = import.meta.env.VITE_BASE_URL_DB;

const ModalReloadPage = memo(({ isShow, onClose, onRefresh }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const api = useAxios();
    const user = useSelector((state) => state.account.user);
    const handleRefreshToken = useCallback(async () => {
        if (!user?.id) return;
        setLoading(true);
        setError(null);

        try {
            const res = await api.post(`${url}/User/get-refresh-token/${user.id}`);
            if (res.status === 200) {
                localStorage.setItem('authTokens', JSON.stringify(res.data.loginResponse));
                dispatch(accountAction.setUser(res.data.loginResponse));
            }
        } catch (error) {
            console.error("Error refreshing token:", error);
            setError("Failed to refresh token. Please try again.");
        } finally {
            setLoading(false);
        }
    }, [user?.id,dispatch]);

    const handleRefresh = useCallback(() => {
        handleRefreshToken();
        onRefresh();
        onClose();
    }, [handleRefreshToken, onRefresh, onClose]);

    const handleClose = useCallback(() => {
        dispatch(accountAction.clearUser());
        localStorage.removeItem('authTokens');
        navigate('/loginPage');
        onClose();
    }, [dispatch, navigate, onClose]);

    if (!isShow) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 border border-blue-100/50">
                <div className="flex flex-col items-center text-center">
                    {/* Icon */}
                    <div className="mb-6 p-4 rounded-full bg-blue-50/80 group hover:scale-110 transition-transform duration-300">
                        <AlertCircle className="w-12 h-12 text-blue-600" />
                    </div>

                    {/* Title */}
                    <h2 className="text-2xl font-bold text-blue-900 mb-3">Inactivity Warning</h2>
                    <div className="w-16 h-1 bg-blue-600 mx-auto mb-6 rounded-full" />

                    {/* Description */}
                    <p className="text-blue-800/80 mb-6 max-w-sm leading-relaxed">
                        You have been inactive for a while. Please refresh your token to continue using the application.
                    </p>

                    {/* Error Message */}
                    {error && (
                        <p className="text-red-500 mb-6 max-w-sm leading-relaxed">{error}</p>
                    )}

                    {/* Buttons */}
                    <div className="flex justify-center gap-4">
                        <Button
                            onClick={handleRefresh}
                            disabled={loading}
                            className="bg-blue-600 text-white hover:bg-blue-700 rounded-full px-6 py-2 flex items-center space-x-2 group disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <span>{loading ? 'Refreshing...' : 'Refresh Token'}</span>
                        </Button>
                        <Button
                            onClick={handleClose}
                            className="bg-gray-400 text-white hover:bg-gray-500 rounded-full px-6 py-2 flex items-center space-x-2 group"
                        >
                            <span>Close</span>
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default ModalReloadPage;