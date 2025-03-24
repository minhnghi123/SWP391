import LeftSide from "../components/dashboard/LeftSide";
import RightSide from "../components/dashboard/RightSide";
import { useParams } from "react-router-dom";
const dashboardPage = () => {
  const { section } = useParams();
  return (
    <div className="flex min-h-screen bg-white">

      <div className=" w-[210px] ">
        <LeftSide section={section} />
      </div>

      <div className="flex-1">
        <RightSide section={section || 'dashboard'} />
      </div>
    </div>



  );
};
export default dashboardPage;
