import axios from 'axios';

        
const client = axios.create({
    baseURL: 'http://localhost:3000', 
    timeout: 10000, 
    // headers: {
    //     'Content-Type': 'application/json',
    // },
});

// Hàm lấy danh sách dữ liệu
export const fetchData = (endpoint) => {
    return client.get(`/${endpoint}`); 
};

// Hàm thêm mới dữ liệu
export const addData = async (endpoint, newData) => {
    //call api get data
    const res = await fetchData(endpoint)
    const item = res.data

    // find max id
    const maxId = Math.max(...item.map((item => item.id)))
    newData.id = maxId + 1


    return client.post(`/${endpoint}`, newData); 
};

// Hàm cập nhật dữ liệu
export const updateData = (endpoint, id, updatedData) => {
    return client.put(`/${endpoint}/${id}`, updatedData);
};

// Hàm xóa dữ liệu
export const deleteData = ( endpoint,id) => {
    return client.delete(`/${endpoint}/${id}`); 
};

export default client;

