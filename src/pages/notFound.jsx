import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button"; // shadcn/ui Button
import { Frown } from "lucide-react"; // Lucide icons

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/50 to-white flex flex-col">
      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-2 sm:p-4 md:p-6">
        <div className="w-full max-w-[90%] sm:max-w-md bg-white rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 border border-blue-100/50">
          <div className="flex flex-col items-center text-center">
            {/* Icon */}
            <div className="mb-4 sm:mb-6 p-3 sm:p-4 rounded-full bg-blue-50/80 group hover:scale-110 transition-transform duration-300">
              <Frown className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-blue-600" />
            </div>

            {/* Title */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-900 mb-2 sm:mb-3">Page Not Found</h1>
            <div className="w-12 sm:w-16 h-1 bg-blue-600 mx-auto mb-4 sm:mb-6 rounded-full" />

            {/* Description */}
            <p className="text-sm sm:text-base text-blue-800/80 mb-6 sm:mb-8 max-w-sm leading-relaxed">
              Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
            </p>

            {/* Button */}
            <Button
              asChild
              className="w-full sm:w-auto bg-blue-600 text-white hover:bg-blue-700 rounded-full px-4 sm:px-6 py-2 flex items-center justify-center space-x-2 group text-sm sm:text-base"
            >
              <Link to="/">Back to Home</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}