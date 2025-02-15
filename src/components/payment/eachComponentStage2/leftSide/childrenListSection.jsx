import React from 'react';
import ChildrenList from './childrenList';
import { useDispatch } from 'react-redux';
import { childAction } from '../../../redux/reducers/selectChildren';

const ChildrenListSection = ({ childrenVaccines, valueSelectVaccine,advitory_detail}) => {
    const dipatch =useDispatch()
  return (
    <>
        {childrenVaccines.map((child) => (
            <ChildrenList key={child.id} child={child} valueSelectVaccine={valueSelectVaccine} handleRemmoveChildren={() =>dipatch(childAction.deleteChild(child.id))} advitory_detail={advitory_detail} />
        ))}
    </>
  );
};

export default ChildrenListSection;