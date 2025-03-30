import { useParams } from 'react-router-dom';
import LeftSide from '../components/Tracking&History/Lefside'
import RightSide from '../components/Tracking&History/RightSide'
const PageProfile = () => {
  const { section, id } = useParams();
  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-white">
      <div className="w-full lg:w-[210px] lg:min-w-[210px]">
        <LeftSide section={section} id={id} />
      </div>

      <div className="flex-1 w-full">
        <RightSide section={section || 'profile'} id={id} />
      </div>
    </div>
  );
};

export default PageProfile;

