import { User } from 'lucide-react';
import toUpperCaseWords from '../../../../utils/upperCaseFirstLetter';
import formatDate from '../../../../utils/calculateYearOld';
export default function ChildSelection({ children, selectedChild, setSelectedChild }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mb-4">
      {children.map((child) => (
        <button
          key={child.id}
          onClick={() => setSelectedChild(child.id)}
          className={`
                  flex flex-col items-center gap-3 p-4 rounded-lg transition-all duration-200
                  ${selectedChild === child.id
              ? 'bg-blue-50 ring-2 ring-blue-500 shadow-md'
              : 'hover:bg-gray-50 hover:shadow-md'}
                `}
        >
          <div className={`
                  p-3 rounded-full transition-colors duration-200
                  ${selectedChild === child.id
              ? 'bg-blue-500 text-white'
              : 'bg-gray-100 text-gray-600'}
                `}>
            <User size={32} />
          </div>
          <p className={`
                  font-medium transition-colors duration-200
                  ${selectedChild === child.id ? 'text-blue-600' : 'text-gray-700'}
                `}>
            {child.name}
          </p>
        </button>
      ))}
    </div>
  )
}
