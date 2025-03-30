import LeftSide from "../components/staffManage/LeftSide";
import RightSide from "../components/staffManage/RightSide";
import { useParams } from "react-router-dom";
import { useState } from "react";

const StaffPage = () => {
  const { section } = useParams();
  

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-white">
      <div className="w-full lg:w-[210px] lg:min-w-[210px]">
        <LeftSide section={section} />
      </div>

      <div className="flex-1 w-full">
        <RightSide section={section || 'dashboardStaff'} />
      </div>
    </div>
  );
};

export default StaffPage;