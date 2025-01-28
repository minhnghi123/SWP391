import { useNavigate } from "react-router-dom";

export default function HeaderPayment({ currentStep, setIsopenNextStep }) {
    const navigate = useNavigate();

    const StepCurrent = ({ step, description, title, d }) => {
        return (
            <div className="flex flex-col items-center relative">
                <div
                    className={`flex items-center justify-center w-20 h-20 rounded-full ${
                        step === currentStep
                            ? "bg-teal-500 text-white"
                            : "bg-gray-100 text-gray-400"
                    } mb-4 shadow-xl shadow-teal-100 transition-all duration-300 hover:scale-105`}
                >
                    <svg
                        className="w-10 h-10"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d={d}
                        />
                    </svg>
                </div>
                <div className="text-center">
                    <h3 className="text-base font-bold text-gray-900 mb-1">
                        {title}
                    </h3>
                    <p className="text-sm text-gray-500">{description}</p>
                </div>
                {/* Connector */}
                {step !== 3 && (
                    <div
                        className={`absolute top-10 left-[calc(100%+40px)] w-[calc(100%+32px)] h-1 ${
                            step === currentStep
                                ? "bg-gradient-to-r from-teal-500 to-gray-200"
                                : "bg-gray-200"
                        }`}
                    ></div>
                )}
            </div>
        );
    };

    return (
        <div className="bg-white shadow-md py-1 sm:px-6 lg:px-80">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8  ">
                <div className="flex justify-between items-center ">
                    {/* Back Button */}
                    <button
                        onClick={() =>
                            currentStep === 1
                                ? navigate(-1)
                                : setIsopenNextStep(currentStep - 1)
                        }
                        className="p-2 text-white bg-blue-500 rounded-lg"
                    >
                        Back
                    </button>

                    <div className="flex items-center gap-x-20 sm:gap-x-64">
                        {/* Step 1 */}
                        <StepCurrent
                            step={1}
                            title="Information"
                            description="Personal details"
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                        {/* Step 2 */}
                        <StepCurrent
                            step={2}
                            title="Payment"
                            description="Card details"
                            d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                        {/* Step 3 */}
                        <StepCurrent
                            step={3}
                            title="Confirmation"
                            description="Order complete"
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
