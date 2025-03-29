import React from 'react';
import ChildrenList from './childrenList';
import { useDispatch } from 'react-redux';
import { childAction } from '../../../redux/reducers/selectChildren';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ChildrenListSection = ({ childrenVaccines, listVaccine, advitory_detail,id}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
          if (childrenVaccines.length === 0) {
              dispatch(childAction.resetArriveDate());
              dispatch(childAction.resetForm());
        }
    }, [childrenVaccines]);

    if (childrenVaccines.length === 0) {
        return (
            <div className="bg-white rounded-3xl p-20 shadow-lg border border-gray-200 text-center">
                <div className="flex flex-col items-center justify-center space-y-4">
                    <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center">
                        <span className="text-4xl">👶</span>
                    </div>
                    <h2 className="text-2xl font-semibold text-gray-800">No Children Selected</h2>
                    <p className="text-gray-500 max-w-md">
                        You haven't selected any children for vaccination yet. Please add children to proceed with the booking.
                    </p>
                    <button
                        onClick={() => navigate(`/information/${id}`)}
                        className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-300 flex items-center space-x-2"
                    >
                        <span>Add Children</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />

                        </svg>
                    </button>
                </div>
            </div>
        );
    }

    return (
        <>
            {childrenVaccines.map((child) => (
                <ChildrenList 
                    key={child.id} 
                    child={child} 
                    listVaccine={listVaccine} 
                    handleRemmoveChildren={() => dispatch(childAction.deleteChild(child.id))} 
                    advitory_detail={advitory_detail} 
                    
                />
            ))}
        </>
    );
};

export default ChildrenListSection;