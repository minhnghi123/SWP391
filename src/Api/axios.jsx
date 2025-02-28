import axios from 'axios';

const baseURL = import.meta.env.VITE_BASE_URL_DB       
const client = axios.create({
    baseURL: `${baseURL}`, 
    timeout: 10000, 
    headers: {
        'Content-Type': 'application/json',
    },
});

// Hàm lấy danh sách dữ liệu
export const fetchData = async (endpoint) => {
    return  await client.get(`/${endpoint}`); 
};

// Hàm thêm mới dữ liệu
export const addData = async (endpoint, newData) => {
    return await client.post(`/${endpoint}`, newData); 
};

// Hàm cập nhật dữ liệu
export const updateData = async (endpoint, id, updatedData) => {
    return await client.put(`/${endpoint}/${id}`, updatedData);
};

// Hàm xóa dữ liệu
export const deleteData = async ( endpoint,id) => {
    return  await client.delete(`/${endpoint}/${id}`); 
};

export default client;