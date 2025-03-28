import { CheckCircle, AlertCircle, XCircle } from 'lucide-react';
const ProgressBar = ({ vaccineName, current, total, percentage, doses }) => {
  const getStatusStyles = (status, isOverdue) => {

    if (isOverdue) {
      return {
        bgColor: "bg-amber-400",
        icon: <AlertCircle className="w-4 h-4 text-white" />,
        tooltip: "Overdue",
      };
    }

    // Xử lý các trạng thái khác
    switch (status.toLowerCase()) {
      case "success":
        return {
          bgColor: "bg-blue-500",
          icon: <CheckCircle className="w-4 h-4 text-white" />,
          tooltip: "Success",
        };
      case "cancel":
        return {
          bgColor: "bg-red-300", 
          bgImage: "bg-[linear-gradient(45deg,rgba(255,255,255,0.3)_0%,rgba(255,255,255,0.3)_10%,transparent_10%,transparent_50%,rgba(255,255,255,0.3)_50%,rgba(255,255,255,0.3)_60%,transparent_60%,transparent_100%)]", // Họa tiết sọc chéo giống hình
          bgSize: "bg-[size:8px_8px]",
          icon: <XCircle className="w-4 h-4 text-white" />,
          tooltip: "Canceled",
        };
      case "schedule":
      case "waiting":
        return {
          bgColor: "bg-gray-200", 
          icon: null,
          tooltip: status.charAt(0).toUpperCase() + status.slice(1),
        };
      default:
        return {
          bgColor: "bg-gray-200", 
          icon: null,
          tooltip: "Pending",
        };
    }
  };

 
  const isOverdue = (maximumIntervalDate, status) => {
    if (!maximumIntervalDate) return false;
    if (status.toLowerCase() !== "schedule" && status.toLowerCase() !== "waiting") return false;
    return new Date() > new Date(maximumIntervalDate);
  };

  return (
    <div>
      {/* Title and Percentage */}
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium text-gray-700">
          {vaccineName} ({current}/{total})
        </span>
        <span className="text-sm text-gray-500">{percentage}%</span>
      </div>

      {/* Progress Bar Container */}
      <div className="relative h-4 bg-gray-200 rounded-full flex overflow-hidden">
        {doses.map((dose, index) => {
          const isOverdueVaccine = isOverdue(dose.maximumIntervalDate, dose.status);
          const { bgColor, bgImage, bgSize, icon, tooltip } = getStatusStyles(dose.status, isOverdueVaccine);

          // Xác định border-radius cho từng đoạn
          let borderRadius = "";
          if (index === 0) {
            // Đoạn đầu tiên: bo góc trái
            borderRadius = "rounded-l-full";
          } else if (index === doses.length - 1) {
            // Đoạn cuối cùng: bo góc phải
            borderRadius = "rounded-r-full";
          }

          return (
            <div
              key={index}
              className={`h-full ${bgColor} ${bgImage || ''} ${bgSize || ''} flex items-center justify-center group relative transition-all duration-300 ${borderRadius}`}
              style={{ width: `${100 / total}%` }}
              title={`Dose ${index + 1}: ${tooltip}`}
            >
              {/* Icon trên đoạn ProgressBar */}
              {icon && (
                <div className="absolute w-4 h-4 bg-opacity-80 rounded-full flex items-center justify-center">
                  {icon}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressBar;