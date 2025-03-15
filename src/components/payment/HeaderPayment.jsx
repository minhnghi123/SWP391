import React from "react";
import { useNavigate } from "react-router-dom";
import { Stethoscope, CreditCard, CheckCircle, ChevronLeft } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { currenStepAction } from "../redux/reducers/currentStepSlice";

const steps = [
    { id: 1, title: "Patient Info", description: "Child's medical details", icon: Stethoscope },
    { id: 2, title: "Payment", description: "Secure online payment", icon: CreditCard },
    { id: 3, title: "Confirmation", description: "Appointment booked", icon: CheckCircle },
];

const StepIcon = ({ Icon, isActive, isCompleted }) => (
    <div
        className={`w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center rounded-full transition-all duration-300 ${
            isActive
                ? "bg-gradient-to-br from-blue-500 to-blue-400 text-white shadow-lg ring-4 ring-blue-100"
                : isCompleted
                    ? "bg-gradient-to-br from-green-500 to-green-400 text-white shadow-md"
                    : "bg-gray-100 text-gray-400"
        }`}
    >
        <Icon className="w-6 h-6 sm:w-8 sm:h-8" />
    </div>
);

const StepConnector = ({ isCompleted }) => (
    <div className="hidden sm:block absolute top-1/2 left-[calc(50%+2rem)] right-[calc(50%+2rem)] h-1 -translate-y-1/2">
        <div
            className={`h-full ${
                isCompleted ? "bg-gradient-to-r from-green-500 to-green-400" : "bg-gray-200"
            } transition-all duration-300 rounded-full`}
        />
    </div>
);

export default function HeaderPayment() {
    const dispatch = useDispatch()
    const currentStep = useSelector((state) => state.payment.currentStep)
    const navigate = useNavigate()
    return (
        <header className="bg-white shadow-xl py-8 px-4 sm:px-6 lg:px-8 rounded-3xl mx-auto max-w-[1400px] mt-4 animate-slideDown border border-gray-100">
            <div className="max-w-7xl mx-auto relative">
                {/* Back Button */}
                {
                    currentStep !== 3 && <button
                        onClick={currentStep !== 1 ? () => dispatch(currenStepAction.decreaseStep()) : ()=>navigate('/variantsPage')}
                        className="absolute bottom-[50%] flex items-center gap-2 px-4 py-2 bg-white text-gray-700 rounded-xl shadow-md hover:bg-gray-50 hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 border border-gray-200"
                    >
                        <ChevronLeft className="w-5 h-5 text-blue-500" />
                        <span className="font-medium">Back</span>
                    </button>
                }

                {/* Progress Navigation */}
                <nav aria-label="Progress" className="py-2">
                    <ol className="flex items-center justify-between w-full max-w-4xl mx-auto">
                        {steps.map((step, stepIdx) => (
                            <li key={step.id} className="relative flex flex-col items-center text-center">
                                <StepIcon
                                    Icon={step.icon}
                                    isActive={currentStep === step.id}
                                    isCompleted={currentStep > step.id}
                                />
                                <div className="mt-4">
                                    <p
                                        className={`text-sm font-medium ${
                                            currentStep >= step.id ? "text-blue-600" : "text-gray-500"
                                        }`}
                                    >
                                        Step {step.id}
                                    </p>
                                    <p className="text-sm font-bold text-gray-800">{step.title}</p>
                                    <p className="text-xs text-gray-500 mt-1 hidden sm:block">{step.description}</p>
                                </div>
                                {stepIdx < steps.length - 1 && (
                                    <StepConnector isCompleted={currentStep > step.id} />
                                )}
                            </li>
                        ))}
                    </ol>
                </nav>
            </div>
        </header>
    );
}
