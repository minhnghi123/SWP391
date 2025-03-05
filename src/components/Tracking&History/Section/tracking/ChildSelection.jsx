import { User } from 'lucide-react';
import toUpperCaseWords from '../../../../utils/upperCaseFirstLetter';
export default function ChildSelection({children, selectedChild, setSelectedChild}) {
    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4 overflow-x-auto scrollbar-hide">
        {children.map((child) => (
          <button
            key={child.id}
            onClick={() => setSelectedChild(child.id)}
            className={`p-4 rounded-lg transition-transform transform hover:scale-105 duration-200 ${selectedChild === child.id
                ? "bg-indigo-50 shadow-lg border-l-4 border-indigo-600"
                : "bg-white shadow-sm hover:shadow-md border-l-4 border-transparent"
              }`}
          >
            <div className="flex items-center">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center ${child.gender === "Male" ? "bg-blue-200 text-blue-700" : "bg-pink-200 text-pink-700"
                  }`}
              >
                <User size={24} />
              </div>
              <div className="ml-4 text-left">
                <p className={`font-semibold ${selectedChild === child.id ? "text-indigo-800" : "text-gray-800"}`}>
                  {child?.name}
                </p>
                <div className="flex items-center mt-1">
                  <span className={`text-sm ${child.gender === "Male" ? "text-blue-600" : "text-pink-600"}`}>
                    {toUpperCaseWords(child?.gender || 'male')}
                  </span>
                  <span className="mx-2 text-gray-400">•</span>
                  <span className="text-sm text-gray-600">{child?.age || '9'}</span>
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    )
}
