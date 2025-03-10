import { User, Baby, Calendar } from 'lucide-react';
import toUpperCaseWords from '../../../../utils/upperCaseFirstLetter';
import calculateAge from '../../../../utils/calculateYearOld';

export default function ChildSelection({ children, selectedChild, setSelectedChild }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {children.map((child) => (
        <button
          key={child.id}
          onClick={() => setSelectedChild(child.id)}
          className={`
            flex items-center gap-3 p-4 rounded-xl border
            bg-white hover:bg-gray-50 transition-colors duration-150
            ${selectedChild === child.id 
              ? 'border-blue-500 shadow-md shadow-blue-100' 
              : 'border-gray-200'}
          `}
        >
          {/* Avatar */}
          <div className={`
            p-2 rounded-full
            ${selectedChild === child.id 
              ? 'bg-blue-500 text-white' 
              : 'bg-gray-100 text-gray-600'}
          `}>
            <User className="w-5 h-5" />
          </div>

          {/* Info */}
          <div className="text-left">
            <h3 className="text-sm font-semibold text-gray-900">
              {toUpperCaseWords(child.name)}
            </h3>
            <div className="flex items-center gap-2 text-xs mt-1.5">
              <span className="flex items-center gap-1 text-gray-600">
                <Calendar className="w-3 h-3" />
                {calculateAge(child.dateOfBirth)}
              </span>
              <span className={`
                flex items-center gap-1 font-medium
                ${child.gender === 0 ? 'text-blue-600' : 'text-pink-600'}
              `}>
                <Baby className="w-3 h-3" />
                {child.gender === 0 ? 'Boy' : 'Girl'}
              </span>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}