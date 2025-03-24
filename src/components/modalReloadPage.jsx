import React, { useState, useCallback, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'; 
import { accountAction } from '../components/redux/reducers/accountSlice';
import useAxios from '../utils/useAxios'; 

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
    }, [user?.id, api, dispatch]);

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
            <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-md w-full">
                <h2 className="text-lg font-semibold mb-4">Cảnh báo không hoạt động</h2>
                <p className="mb-4">Bạn đã không hoạt động trong thời gian qua. Vui lòng làm mới token để tiếp tục sử dụng.</p>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <div className="flex justify-center gap-4">
                    <button
                        onClick={handleRefresh} 
                        disabled={loading}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? 'Đang làm mới...' : 'Làm mới token'}
                    </button>
                    <button
                        onClick={handleClose}
                        className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition-colors"
                    >
                       Close
                    </button>
                </div>
            </div>
        </div>
    );
});

export default ModalReloadPage;
