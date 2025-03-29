


import { feedbackTrackingActions } from '../reducers/feedbackTracking';
const url = import.meta.env.VITE_BASE_URL_DB;

export const fetchDataFeedback = (api, id) => {

    return async (dispatch) => {
        dispatch(feedbackTrackingActions.setLoading(true));
        try {
        
            const res = await api.get(`${url}/VaccinesTracking/get-by-parent-id/${id}`);
            if (res.status === 200 && res.data) {
                dispatch(feedbackTrackingActions.setFeedbackTracking(res.data));
            }
        } catch (err) {
            dispatch(feedbackTrackingActions.setError(err.message));
        } finally {
            dispatch(feedbackTrackingActions.setLoading(false));
        }
    };
};

export const fetchDataUser = (api) => {

    return async (dispatch) => {
        dispatch(feedbackTrackingActions.setLoading(true));
        try {
            const res = await api.get(`${url}/User/get-all-user`);
            if (res.status === 200 && res.data) {
                dispatch(feedbackTrackingActions.setUser(res.data));
            }
        } catch (err) {
            dispatch(feedbackTrackingActions.setError(err.message));
        } finally {
            dispatch(feedbackTrackingActions.setLoading(false));
        }
    };
};