import LeftSide from "../components/dashboard/LeftSide";
import RightSide from "../components/dashboard/RightSide";
import { useParams } from "react-router-dom";
import { useState } from "react";

const DashboardPage = () => {
  const { section } = useParams();
  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-white">
      <div className="w-full lg:w-[210px] lg:min-w-[210px]">
        <LeftSide section={section} i />
      </div>

      <div className="flex-1 w-full">
        <RightSide section={section || 'dashboard'} />
      </div>
    </div>
  )
};

export default DashboardPage;