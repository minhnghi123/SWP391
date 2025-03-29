import { feedbackTrackingActions } from '../reducers/feedbackTracking';
const url = import.meta.env.VITE_BASE_URL_DB;

export const fetchFeedback = (api) => {
    return async (dispatch) => {
        dispatch(feedbackTrackingActions.setLoading(true));
        try {
            const res = await api.get(`${url}/Feedback/get-all-feedback`);
            if (res.status === 200 && res.data) {
                dispatch(feedbackTrackingActions.setFeedback(res.data.filter(item => item.ratingScore > 3)));
            }
        } catch (err) {
            dispatch(feedbackTrackingActions.setError(err.message));
        } finally {
            dispatch(feedbackTrackingActions.setLoading(false));
        }
    };
};

export const fetchDataFeedback = (api) => {
    return async (dispatch) => {
        dispatch(feedbackTrackingActions.setLoading(true));
        try {
            const res = await api.get(`${url}/VaccinesTracking/get-all-staff`);
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

export const postFeedback = (api, data) => {
    return async (dispatch) => {
        dispatch(feedbackTrackingActions.setLoading(true));
        try {
            const res = await api.post(`${url}/Feedback/create-feedback`, data);
            if (res.status === 200 && res.data) {
                dispatch(feedbackTrackingActions.setPostFeedback(res.data));
                return true;
            }
        } catch (err) {
            dispatch(feedbackTrackingActions.setError(err.message));
            return false;
        } finally {
            dispatch(feedbackTrackingActions.setLoading(false));
        }
    };
};

