import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button"; // shadcn/ui Button
import { Lock } from "lucide-react"; // Lucide icons

export default function Unauthorized() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center p-2 sm:p-4 md:p-6">
            {/* Navigation Bar */}
            {/* Main Content */}
            <div className="w-full max-w-[90%] sm:max-w-md bg-white rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 border border-blue-100/50">
                <div className="flex flex-col items-center text-center">
                    {/* Icon */}
                    <div className="mb-4 sm:mb-6 p-3 sm:p-4 rounded-full bg-red-50/80 group hover:scale-110 transition-transform duration-300">
                        <Lock className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-red-500" />
                    </div>
                    {/* Title */}
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-900 mb-2 sm:mb-3">Access Denied</h1>
                    <div className="w-12 sm:w-16 h-1 bg-blue-600 mx-auto mb-4 sm:mb-6 rounded-full" />

                    {/* Description */}
                    <p className="text-sm sm:text-base text-blue-800/80 mb-6 sm:mb-8 max-w-sm leading-relaxed">
                        You don't have permission to access this page. If you believe this is an error, please contact your administrator.
                    </p>

                    {/* Button */}
                    <Button
                        onClick={() => navigate("/")}
                        className="w-full sm:w-auto bg-blue-600 text-white hover:bg-blue-700 rounded-full px-4 sm:px-6 py-2 flex items-center justify-center space-x-2 group text-sm sm:text-base"
                    >
                        <span>Return to Home</span>
                    </Button>
                </div>
            </div>
        </div>
    );
}