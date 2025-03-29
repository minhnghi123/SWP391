
// import { createAsyncThunk } from '@reduxjs/toolkit';
import { dataUserAction } from '../reducers/dataUser';
const url = import.meta.env.VITE_BASE_URL_DB;

export const fetchData = (api, id) => {

    return async (dispatch) => {
        dispatch(dataUserAction.setLoading(true));
        try {
            const res = await api.get(`${url}/User/get-user-by-id/${id}`);
            if (res.status === 200 && res.data) {
                dispatch(dataUserAction.setData({
                    profileData: res.data.user,
                    editProfile: res.data.user
                }));
            }
        } catch (err) {
            dispatch(dataUserAction.setError(err.message));
        } finally {
            dispatch(dataUserAction.setLoading(false));
        }
    };
};
export const postData = (id, avatar, editProfile, api, profileData,setNote) => {
    return async (dispatch) => {
        dispatch(dataUserAction.setLoading(true));

        if (!id) {
            dispatch(dataUserAction.setError("Invalid user ID"));
            return;
        }

        try {
            let imageUrl = profileData.avatar || "";

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

            if (!editProfile.gender) {
                dispatch(dataUserAction.setError("Please choose your gender"));
                return;
            }

            const updatedProfile = {
                name: editProfile.name?.trim(),
                phoneNumber: editProfile.phoneNumber?.trim(),
                gmail: editProfile.gmail?.trim(),
                gender: editProfile.gender,
                dateOfBirth: editProfile.dateOfBirth
                    ? new Date(editProfile.dateOfBirth).toISOString()
                    : null,
                avatar: imageUrl,
            };

            const response = await api.put(`${url}/User/update-user/${id}`, updatedProfile);

            if (response?.status === 200) {
                setNote("Profile updated successfully");
                dispatch(dataUserAction.replaceProfile(updatedProfile));

                // Cập nhật thông tin user trong Redux store
                dispatch(
                    accountAction.setUser({
                        id: profileData.id,
                        name: updatedProfile.name,
                        role: profileData.role,
                        avatar: imageUrl,
                    })
                );
            }
        } catch (err) {
            dispatch(dataUserAction.setError(err.response?.data?.message || "Error updating profile"));
        } finally {
            dispatch(dataUserAction.setLoading(false));
        }
    };
};