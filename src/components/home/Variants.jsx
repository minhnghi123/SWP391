import VaccineCard from './VaccineCard';
import ComboCard from './ComboCard';

const Variants = (props) => {
  const { type } = props;
  
  if (type === 'vaccine') {
    return <VaccineCard {...props} />;
  } else if (type === 'combo') {
    return <ComboCard {...props} />;
  }
  
  // Fallback to VaccineCard if type is not specified
  return <VaccineCard {...props} />;
};

export default Variants;

