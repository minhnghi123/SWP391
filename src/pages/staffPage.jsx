import LeftSide from "../components/staffManage/LeftSide";
import RightSide from "../components/staffManage/RightSide";
import { useParams } from "react-router-dom";
const staffPage = () => {
  const { section } = useParams();
  return (
    <div className="flex min-h-screen bg-white">

      <div className=" w-[210px] ">
        <LeftSide section={section} />
      </div>

      <div className="flex-1">
        <RightSide section={section || 'dashboardStaff'} />
      </div>
    </div>



  );
};
export default staffPage;
