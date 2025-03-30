


import { historyTrackingActions } from "../reducers/historyTrackingSlice";

const url = import.meta.env.VITE_BASE_URL_DB;

export const fetchHistoryTracking = (api, id) => {
    return async (dispatch) => {
        dispatch(historyTrackingActions.setLoading(true));
        try {
            const response = await api.get(`${url}/VaccinesTracking/get-by-parent-id/${id}`);
            dispatch(historyTrackingActions.setHistoryTracking(response.data));
        } catch (error) {
            dispatch(historyTrackingActions.setError(error.message));
        } finally {
            dispatch(historyTrackingActions.setLoading(false));
        }

    }
}
export const fetchBooking = (api, id) => {
    return async (dispatch) => {
        dispatch(historyTrackingActions.setLoading(true));
        try {
            const response = await api.get(`${url}/Booking/booking-history/${id}`);
            dispatch(historyTrackingActions.setBooking(response.data));
        } catch (error) {
            dispatch(historyTrackingActions.setError(error.message));
        } finally {
            dispatch(historyTrackingActions.setLoading(false));
        }

    }
}

