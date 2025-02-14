import LeftSide from '../components/dashboard/LeftSide' 
import RightSide from '../components/dashboard/RightSide'
import { AuthProvider } from '../components/Services/AuthLogin';
const dashboardPage = () => {
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
export default dashboardPage;

