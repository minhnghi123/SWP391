const ProgressBar = ({ percentage, vaccineName, current, total}) => {

  return (
    <div className="mb-6">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium text-gray-700">
          {vaccineName} ({current}/{total})
        </span>
        <span className="text-sm text-gray-500">
          {percentage}%
        </span>
      </div>

      {/* Progress Bar Container */}
      <div className="relative h-4 bg-gray-200 rounded-full">
        {/* Filled Progress Bar */}
        <div
          className="h-full bg-blue-500 rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
    
      </div>


    </div>
  );
};
export default ProgressBar;