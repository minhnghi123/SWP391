import LeftSide from "../components/staffManage/LeftSide";
import RightSide from "../components/staffManage/RightSide";
import { useParams } from "react-router-dom";
import { useState } from "react";

const StaffPage = () => {
  const { section } = useParams();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-white">
      {/* LeftSide (Sidebar) */}
      <LeftSide
        section={section}
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />

      {/* RightSide (Main Content) */}
      <div className="flex-1">
        <RightSide
          section={section || "dashboardStaff"}
          isSidebarOpen={isSidebarOpen}
        />
      </div>
    </div>
  );
};

export default StaffPage;