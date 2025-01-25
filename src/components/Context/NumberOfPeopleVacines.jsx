import React, { createContext, useState } from 'react';

export const NumberOfPeopleContext = createContext();

 export function NumberOfPeopleProvider({ children }) {
    const [isSelected, setIsSelected] = useState([]); // add children buy vaccine

    //remove and add
    const handleChoose = (id) => {
        setIsSelected(prev => {
            const checkId = isSelected.includes(id);
            if (checkId) {
                return isSelected.filter(item => item !== id);
            } else {
                return [...prev, id];
            }
        })


    }

    const value = {
      isSelected,
      handleChoose
    };
    

    return (
        <NumberOfPeopleContext.Provider value={value}>
            {children}
        </NumberOfPeopleContext.Provider>
    )





}
