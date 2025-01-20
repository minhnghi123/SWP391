import { useParams } from 'react-router-dom';
import LeftSide from '../components/Tracking&History/Lefside'
import RightSide from '../components/Tracking&History/RightSide'
const PageProfile = () => {
  const { section } = useParams();
  const id = 1
  return (
    <div className="flex min-h-screen bg-white">
      
      <div className="w-64">
        <LeftSide />
      </div>

      <div className="flex-1">
        <RightSide section={section || 'profile'} id={id} />
      </div>
    </div>
  );
};

export default PageProfile;

