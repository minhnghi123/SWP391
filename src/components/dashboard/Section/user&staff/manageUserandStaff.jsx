import { useState } from "react";
import User from "./manageUser";
import Staff from "./manageStaff";
import {User2Icon} from "lucide-react";
const ManageUser = () => {
  const [view, setView] = useState("user");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm border border-gray-100">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 text-blue-500 rounded-lg shadow-sm">
              <User2Icon className="w-5 h-5 text-blue-500" />
            </div>
            <h1 className="text-2xl font-bold text-blue-500">
              User Management
            </h1>
          </div>
          <span className="text-sm text-gray-500">
            {new Date().toLocaleDateString()}
          </span>
        </div>

        {/* Tabs */}
        <div className="mt-4 flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => setView("user")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              view === "user"
                ? "text-blue-500 text-blue shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-teal-50 hover:text-blue-600 border border-gray-200"
            }`}
          >
            <User2Icon className="w-4 h-4" />
            User
          </button>
          <button
            onClick={() => setView("staff")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              view === "staff"
                ? "text-blue-500 text-blue text-blue shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-teal-50 hover:text-blue-600 border border-gray-200"
            }`}
          >
            <User2Icon className="w-4 h-4" />
            Staff
          </button>
        </div>
      </div>

      {/* Content Area */}
      {view === "user" && <User />}
      {view === "staff" && <Staff />}
    </div>
  );
};

export default ManageUser;
