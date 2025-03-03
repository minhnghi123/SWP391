
import axios from "axios";
import { profilechildrenAction } from "../reducers/ProfileChildrenUserSlice";



export const fetchData = (id) => {
    return async (dispatch) => { 
        try {
            const res = await axios.get(`http://localhost:5272/api/Child/get-child-by-parents-id/${id}`);

            if (res.status === 200 && res.data) {
                dispatch(profilechildrenAction.replaceData(res.data));
            }
        } catch (err) {
            console.error("Fetch Error:", err);
        }
    };
};
