import React from 'react';
import ChildrenList from './childrenList';

const ChildrenListSection = ({ childrenVaccines, valueSelectVaccine, handleRemmoveChildren }) => (
    <>
        {childrenVaccines.map((child) => (
            <ChildrenList key={child.id} child={child} valueSelectVaccine={valueSelectVaccine} handleRemmoveChildren={()=>handleRemmoveChildren(child.id)} />
        ))}
    </>
);

export default ChildrenListSection;