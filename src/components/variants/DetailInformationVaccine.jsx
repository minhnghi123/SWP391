import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Variants from '../home/Variants';
import axios, { fetchData } from '../../Api/axios';

const Detail = () => {
    const { idVaccine,type } = useParams();
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [vaccine, setVaccine] = useState(null); 

    useEffect(() => {
        fetchData(`${type}/${idVaccine}`)
            .then((res) => setVaccine(res.data))
            .catch((err) => setError(err));
    }, [idVaccine]);

    if (error) {
        return <div className="text-red-500 text-center mt-10">Error: {error.message}</div>;
    }

    if (!vaccine) {
        return <div className="text-center mt-10">Loading...</div>;
    }

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
            <button 
                onClick={() => navigate(-1)} 
                className="mb-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
                Back
            </button>

            <div className="flex flex-col md:flex-row items-center gap-6">
                <img 
                    src={vaccine.image} 
                    alt={vaccine.name} 
                    className="w-64 h-64 object-cover rounded-lg shadow-md"
                />
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">{vaccine.name}</h1>
                    <p className="text-gray-600 mt-4">{vaccine.description}</p>
                    <p className="text-gray-500 mt-2">Country of Origin: {vaccine.origin}</p>
                    <p className="text-xl text-pink-500 font-semibold mt-4">
                        Price: {vaccine.price} VND
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Detail;
