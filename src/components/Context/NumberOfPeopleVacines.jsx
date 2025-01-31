import React, { createContext, useState } from 'react';

export const NumberOfPeopleContext = createContext();

export function NumberOfPeopleProvider({ children }) {
    const [isSelected, setIsSelected] = useState([]); // add children buy vaccine
    const [isIDChildren, setisIDChildren] = useState();
    //remove and add
    const handleChoose = (selectChildren) => {
        setIsSelected((prev) => {
            let newArray; // contain children register
            const checkId = prev.some((item) => item.id === selectChildren.id);
            if (checkId) {
                newArray = prev.filter((item) => item.id !== selectChildren.id);

            } else {
                newArray = [...prev, selectChildren];
            }

            const newIDs = newArray.map(child => child.id);
            setisIDChildren(newIDs);
            newArray.length
                ? localStorage.setItem("childrenSelectedvaccines", JSON.stringify(newArray))
                : localStorage.removeItem("childrenSelectedvaccines");
            return newArray;
        });
    };


    const handleRemmoveChildren = (id) => {
        setIsSelected((prev) => {
            const removeChildren = prev.filter((child) => child.id !== id);
            const newIDs = removeChildren.map(child => child.id);
            setisIDChildren(newIDs);
            removeChildren.length
                ? localStorage.setItem("childrenSelectedvaccines", JSON.stringify(removeChildren))
                : localStorage.removeItem("childrenSelectedvaccines");

            return removeChildren;
        });
    };

    const value = {
        isSelected,
        handleChoose,
        handleRemmoveChildren,
        isIDChildren
    };
    return (
        <NumberOfPeopleContext.Provider value={value}>
            {children}
        </NumberOfPeopleContext.Provider>
    )





}
