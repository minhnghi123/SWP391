import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandsHoldingChild } from '@fortawesome/free-solid-svg-icons';

const FeedbackParent = ({ image, description, babyName, parentName, randomNumber }) => {
    return (
        <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex flex-col h-full">
                {/* Icon */}
                <div className="mb-6">
                    <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center">
                        <FontAwesomeIcon
                            icon={faHandsHoldingChild}
                            className="text-blue-500 text-xl"
                        />
                    </div>
                </div>

                {/* Quote */}
                <div className="flex-grow">
                    <p className="text-gray-600 leading-relaxed italic mb-6">
                        {description}
                    </p>
                </div>

                {/* Author Info */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <img
                            src={image}
                            alt="Parent"
                            className="w-12 h-12 rounded-full object-cover border-2 border-blue-500"
                        />
                        <div>
                            <h4 className="font-semibold text-gray-800">{parentName}</h4>
                            <p className="text-sm text-gray-500">{babyName}</p>
                        </div>
                    </div>
                    <div className="flex gap-1">
                        {
                            randomNumber === 1 ?
                                [...Array(5)].map((_, index) => (
                                    <StarOutlinedIcon
                                        key={index}
                                        className={`w-5 h-5 ${index < 4 ? 'text-yellow-400' : 'text-gray-300'
                                            }`}
                                    />
                                )) : (
                                    [...Array(5)].map((_, index) => (
                                        <StarOutlinedIcon
                                            key={index}
                                            className="w-5 h-5 text-yellow-400"
                                        />
                                    ))
                                )
                        }


                    </div>
                </div>
            </div>
        </div>
    )
}

export default FeedbackParent;
