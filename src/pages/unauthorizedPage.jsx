import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button"; // shadcn/ui Button
import { Lock } from "lucide-react"; // Lucide icons

export default function Unauthorized() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen  flex items-center justify-center p-4">
            {/* Navigation Bar */}
            {/* Main Content */}
            <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 border border-blue-100/50">
                <div className="flex flex-col items-center text-center">
                    {/* Icon */}
                    <div className="mb-6 p-4 rounded-full bg-red-50/80 group hover:scale-110 transition-transform duration-300">
                        <Lock className="w-12 h-12 text-red-500" />
                    </div>
                    {/* Title */}
                    <h1 className="text-3xl font-bold text-blue-900 mb-3">Access Denied</h1>
                    <div className="w-16 h-1 bg-blue-600 mx-auto mb-6 rounded-full" />

                    {/* Description */}
                    <p className="text-blue-800/80 mb-8 max-w-sm leading-relaxed">
                        You don't have permission to access this page. If you believe this is an error, please contact your administrator.
                    </p>

                    {/* Button */}
                    <Button
                        onClick={() => navigate("/")}
                        className="bg-blue-600 text-white hover:bg-blue-700 rounded-full px-6 py-2 flex items-center space-x-2 group"
                    >
                        <span>Return to Home</span>
                    </Button>
                </div>
            </div>
        </div>
    );
}