import { BiMale, BiFemale } from "react-icons/bi";
import { Plus } from 'lucide-react';
export default function HeaderChildren({ handleFilter, handleAddChild, activeFilter }) {
    return (
        <div className="flex flex-row  border-b items-center justify-between p-3 mb-4" >
            <div className="flex items-center gap-4 w-full md:w-auto">
                <div className="flex gap-2">
                    <button
                        onClick={() => handleFilter("all")}
                        className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${activeFilter === "all" ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md" : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"}`}
                        aria-label="Show all items"
                    >
                        All
                    </button>
                    <button
                        onClick={() => handleFilter("male")}
                        className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center gap-2 ${activeFilter === "male" ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md" : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"}`}
                        aria-label="Filter by male"
                    >
                        <BiMale className="text-lg" />
                        Male
                    </button>
                    <button
                        onClick={() => handleFilter("female")}
                        className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 flex items-center gap-2 ${activeFilter === "female" ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md" : "bg-white text-gray-600 hover:bg-gray-50 border border-gray-200"}`}
                        aria-label="Filter by female"
                    >
                        <BiFemale className="text-lg" />
                        Female
                    </button>
                </div>
            </div>

            <button
                onClick={handleAddChild}
                className="w-full md:w-auto flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg md:rounded-full text-sm font-semibold shadow-sm hover:shadow-md transition-all"
            >
                <Plus className="h-5 w-5 stroke-[2.5]" />
                <span>Add Child</span>
            </button>
        </div>
    )
}