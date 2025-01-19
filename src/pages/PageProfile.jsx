import { useParams } from 'react-router-dom';
import LeftSide from '../components/Tracking&History/Lefside'
import RightSide from '../components/Tracking&History/RightSide'
const PageProfile = () => {
  const { section } = useParams();

  return (
    <div className="flex min-h-screen bg-white">
  
      <div className="w-64">
        <LeftSide section={section || 'profile'} /> 
      </div>

      <div className="flex-1">
        <RightSide section={section || 'profile'} />
      </div>
    </div>
  );
};

export default PageProfile;
