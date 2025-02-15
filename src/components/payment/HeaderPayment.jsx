import { useNavigate } from "react-router-dom";
import { ArrowLeft, Stethoscope, CreditCard, CheckCircle } from "lucide-react";

export default function HeaderPayment({ currentStep, setIsopenNextStep }) {
    const navigate = useNavigate();

    const steps = [
        { id: 1, title: "Patient Info", description: "Child’s medical details", icon: <Stethoscope className="w-6 h-6" /> },
        { id: 2, title: "Payment", description: "Secure online payment", icon: <CreditCard className="w-6 h-6" /> },
        { id: 3, title: "Confirmation", description: "Appointment booked", icon: <CheckCircle className="w-6 h-6" /> }
    ];

    return (
        <div className="bg-white shadow-md py-6 px-4 sm:px-8 lg:px-16">
            <div className="max-w-4xl mx-auto flex flex-col items-center space-y-6">

                {/* Back Button */}
                <button
                    onClick={() =>
                        currentStep === 1 ? navigate(-1) : setIsopenNextStep(currentStep - 1)
                    }
                    className="self-start flex items-center gap-3 text-white bg-blue-600 p-2 rounded-lg hover:bg-blue-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-300 transition ease-in-out duration-200"
                >
                   
                    <span className="font-medium">Back</span>
                </button>


                {/* Steps */}
                <div className="flex justify-between w-full max-w-lg space-x-6">
                    {steps.map((step, index) => (
                        <div key={step.id} className="flex flex-col items-center relative">

                            {/* Step Circle */}
                            <div
                                className={`w-14 h-14 flex items-center justify-center rounded-full text-lg font-bold transition-all duration-300
                                ${currentStep === step.id
                                        ? "bg-blue-500 text-white shadow-lg"
                                        : currentStep > step.id
                                            ? "bg-blue-200 text-blue-600"
                                            : "bg-gray-100 text-gray-400"}`}
                            >
                                {step.icon}
                            </div>

                            {/* Step Title */}
                            <div className="text-center mt-2">
                                <h3 className="text-sm font-semibold text-gray-900">{step.title}</h3>
                                <p className="text-xs text-gray-500">{step.description}</p>
                            </div>

                            {/* Connector Line */}
                            {index !== steps.length - 1 && (
                                <div className={`absolute top-7 left-[100%] w-16 h-[3px] 
                                ${currentStep > step.id ? "bg-blue-500" : "bg-gray-300"}`}>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}