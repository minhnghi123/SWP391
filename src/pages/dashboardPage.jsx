import LeftSide from '../components/dashboard/LeftSide' 
import RightSide from '../components/dashboard/RightSide'
const dashboardPage = () => {
  return (
    <div className="flex min-h-screen bg-white">
      
      <div className="w-64">
        <LeftSide />
      </div>

      <div className="flex-1">
        <RightSide />
      </div>
    </div>
  );
};

export default dashboardPage;