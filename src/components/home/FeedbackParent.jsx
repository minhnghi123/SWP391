import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandsHoldingChild } from '@fortawesome/free-solid-svg-icons';

const FeedbackParent = ({ image, description,  username, randomNumber }) => {
    
    return (
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <div className="flex flex-col h-full">
                {/* Icon */}
                <div className="mb-4 md:mb-6 flex justify-center">
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-blue-50 rounded-full flex items-center justify-center">
                        <FontAwesomeIcon
                            icon={faHandsHoldingChild}
                            className="text-blue-600 text-xl md:text-2xl"
                        />
                    </div>
                </div>

                {/* Quote */}
                <div className="flex-grow">
                    <p className="text-gray-700 leading-relaxed italic mb-6 text-base md:text-lg">
                        {description}
                    </p>
                </div>

                {/* Author Info */}
                <div className="flex flex-col items-center">
                    <div className="flex items-center gap-4 mb-4 md:mb-0">
                        <img
                            src={image}
                            alt="Parent"
                            className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover border-2 border-blue-600 shadow-sm"
                        />
                        <div>
                            <h4 className="font-semibold text-gray-900 text-lg md:text-xl">{username}</h4>
                        </div>
                    </div>
                    <div className="flex gap-1 mt-2">
                        {[...Array(5)].map((_, index) => (
                            <StarOutlinedIcon
                                key={index}
                                className={`w-5 h-5 md:w-6 md:h-6 ${index < randomNumber ? 'text-yellow-500' : 'text-gray-400'}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FeedbackParent;