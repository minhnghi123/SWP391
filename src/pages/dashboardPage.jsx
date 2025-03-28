import LeftSide from "../components/dashboard/LeftSide";
import RightSide from "../components/dashboard/RightSide";
import { useParams } from "react-router-dom";
import { useState } from "react";

const DashboardPage = () => {
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
          section={section || "dashboard"}
          isSidebarOpen={isSidebarOpen}
        />
      </div>
    </div>
  );
};

export default DashboardPage;