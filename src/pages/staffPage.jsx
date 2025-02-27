import LeftSide from '../components/staffManage/LeftSide' 
import RightSide from '../components/staffManage/RightSide'
import { AuthProvider } from '../components/Services/AuthLogin';
const staffPage = () => {
  return (
    <AuthProvider>
    <div className="flex min-h-screen bg-white">
      <div className="w-64">
        <LeftSide />
      </div>
      <div className="flex-1">
        <RightSide />
      </div>
    </div>
    </AuthProvider>
  );
};
export default staffPage;

