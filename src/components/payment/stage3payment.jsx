import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { FaCheckCircle, FaTimesCircle, FaClock, FaMapMarkerAlt, FaHistory, FaInfoCircle, FaShieldAlt } from "react-icons/fa";
import { House, Baby, Syringe, Calendar, CreditCard } from "lucide-react";
import formatDecimal from "../../utils/calculateMoney";
import { useDispatch } from "react-redux";
import { childAction } from "../redux/reducers/selectChildren";
import { vaccineAction } from "../../components/redux/reducers/selectVaccine";
import { arriveActions } from "../../components/redux/reducers/arriveDate";
import { methodPaymentAction } from "../../components/redux/reducers/methodPaymentlice";

export default function Stage3Payment() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { status } = useParams();
    const user = useSelector((state) => state.account.user);
    const [err, setErr] = useState("");
    const [loading, setLoading] = useState(false);
    const orderData = useSelector((state) => state.order.orderData);
    const [data, setData] = useState({
        OrderId: "",
        Amount: 0,
        BookingID: "",
        Message: "",
        TrancasionID: ""
    });

    useEffect(() => {
        if (!orderData) {
            const queryParams = new URLSearchParams(location.search);
            setData({
                OrderId: queryParams.get("OrderId") || "N/A",
                Amount: queryParams.get("Amount") || 0,
                BookingID: queryParams.get("BookingID") || "N/A",
                Message: queryParams.get("Message") || "N/A",
                TrancasionID: queryParams.get("TrancasionID") || "N/A"
            });
        } else {
            setData({
                OrderId: orderData.orderId,
                Amount: orderData.amount,
                BookingID: orderData.bookingID,
                Message: orderData.message,
                TrancasionID: orderData.trancasionID
            })
        }
    }, [location.search, orderData]);

    const removeDataStage2 = () => {
        dispatch(childAction.completePayment())
        dispatch(vaccineAction.completePayment())
        dispatch(arriveActions.resetArriveDate())
        dispatch(methodPaymentAction.resetMethodPayment())
        dispatch(childAction.resetForm())
    }

    useEffect(() => {
        if (status?.toLowerCase() === "success") {
            removeDataStage2()
        }
    }, [status])

    const getStatusConfig = () => {
        const configs = {
            success: {
                icon: <FaCheckCircle className="text-6xl" />,
                iconComponent: <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center animate-pulse">
                    <FaCheckCircle className="text-4xl text-blue-600" />
                </div>,
                title: "Payment Successful!",
                description: "Your vaccination appointment has been confirmed.",
                bgColor: "bg-gradient-to-r from-blue-50 to-blue-100",
                textColor: "text-blue-700",
                borderColor: "border-blue-200",
                buttonColor: "bg-blue-600 hover:bg-blue-700",
                animation: "animate-bounce",
                confetti: true
            },
            failed: {
                icon: <FaTimesCircle className="text-6xl" />,
                iconComponent: <div className="w-20 h-20 rounded-full bg-red-100 flex items-center justify-center animate-bounce">
                    <FaTimesCircle className="text-4xl text-red-600" />
                </div>,
                title: "Payment Failed",
                description: "We couldn't process your vaccination payment.",
                bgColor: "bg-gradient-to-r from-red-50 to-red-100",
                textColor: "text-red-700",
                borderColor: "border-red-200",
                buttonColor: "bg-red-600 hover:bg-red-700",
                animation: "animate-shake"
            },
            pending: {
                icon: <FaClock className="text-6xl" />,
                iconComponent: <div className="w-20 h-20 rounded-full bg-yellow-100 flex items-center justify-center animate-pulse">
                    <FaClock className="text-4xl text-yellow-600" />
                </div>,
                title: "Payment Pending",
                description: "Please complete your vaccination payment at the clinic.",
                bgColor: "bg-gradient-to-r from-yellow-50 to-yellow-100",
                textColor: "text-yellow-700",
                borderColor: "border-yellow-200",
                buttonColor: "bg-yellow-600 hover:bg-yellow-700",
                animation: "animate-pulse"
            }
        };
        return configs[status?.toLowerCase()] || configs.failed;
    };

    const config = getStatusConfig();

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-6">
            <div className="max-w-md w-full space-y-6">
                {/* Logo and Brand */}
                <div className="flex items-center justify-center mb-6">
                    <div className="bg-white p-3 rounded-full shadow-md">
                        <Syringe className="text-blue-600 w-8 h-8" />
                    </div>
                    <span className="ml-3 text-2xl font-bold text-blue-800">KidVaccine</span>
                </div>

                {/* Main Card with floating effect */}
                <div className={`bg-white rounded-3xl shadow-xl overflow-hidden border ${config.borderColor} transform hover:translate-y-1 transition-all duration-500 animate-fadeIn`}>
                    {/* Status Header */}
                    <div className={`${config.bgColor} p-8 text-center relative overflow-hidden`}>
                        {/* Background pattern */}
                        <div className="absolute inset-0 opacity-20">
                            <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                <pattern id="vaccinePattern" patternUnits="userSpaceOnUse" width="10" height="10">
                                    <circle cx="5" cy="5" r="1" fill="currentColor" className="text-blue-700 opacity-20" />
                                </pattern>
                                <rect width="100%" height="100%" fill="url(#vaccinePattern)" />
                            </svg>
                        </div>
                        
                        {/* Icon with animation */}
                        <div className="flex justify-center mb-4">
                            {config.iconComponent}
                        </div>
                        
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">{config.title}</h2>
                        <p className="text-gray-600">{config.description}</p>
                    </div>

                    {/* Payment Details */}
                    <div className="p-6 space-y-6">
                        {(status?.toLowerCase() === "success" || status?.toLowerCase() === "pending") && (
                            <div className="bg-white rounded-2xl p-6 shadow-md border border-blue-100 transform transition-all duration-300 hover:shadow-lg">
                                <div className="space-y-4">
                                    {/* Transaction Details */}
                                    <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                                        <span className="text-gray-500 flex items-center">
                                            <FaShieldAlt className="mr-2 text-blue-500" />
                                            Transaction ID
                                        </span>
                                        <span className="font-mono text-gray-800 bg-blue-50 py-1 px-2 rounded-lg">{data?.TrancasionID || "N/A"}</span>
                                    </div>
                                    
                                    <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                                        <span className="text-gray-500 flex items-center">
                                            <FaHistory className="mr-2 text-blue-500" />
                                            Order ID
                                        </span>
                                        <span className="font-mono text-gray-800 bg-blue-50 py-1 px-2 rounded-lg">{data?.OrderId || "N/A"}</span>
                                    </div>
                                    
                                    <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                                        <span className="text-gray-500 flex items-center">
                                            <FaInfoCircle className="mr-2 text-blue-500" />
                                            Booking ID
                                        </span>
                                        <span className="font-mono text-gray-800 bg-blue-50 py-1 px-2 rounded-lg">{data?.BookingID || "N/A"}</span>
                                    </div>
                                    
                                    <div className="flex justify-between items-center pb-3 border-b border-gray-100">
                                        <span className="text-gray-500 flex items-center">
                                            <CreditCard className="mr-2 text-blue-500" />
                                            Amount
                                        </span>
                                        <span className="font-bold text-lg bg-blue-100 text-blue-700 py-1 px-3 rounded-lg">
                                            {formatDecimal(data?.Amount || 0)} VND
                                        </span>
                                    </div>
                                    
                                    {data?.Message && data.Message !== "N/A" && (
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-500">Message</span>
                                            <span className="text-gray-800 italic">{data.Message}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Pending Instructions */}
                        {status?.toLowerCase() === "pending" && (
                            <div className="bg-yellow-50 rounded-2xl p-5 border border-yellow-200 flex items-start animate-pulse">
                                <FaInfoCircle className="mr-3 mt-1 text-xl text-yellow-600" />
                                <div>
                                    <p className="font-semibold mb-2 text-yellow-800">Important Notes:</p>
                                    <ul className="space-y-2">
                                        <li className="flex items-center">
                                            <span className="mr-2 bg-yellow-200 text-yellow-800 rounded-full w-5 h-5 flex items-center justify-center text-xs">1</span>
                                            Complete payment within 48 hours
                                        </li>
                                        <li className="flex items-center">
                                            <span className="mr-2 bg-yellow-200 text-yellow-800 rounded-full w-5 h-5 flex items-center justify-center text-xs">2</span>
                                            Visit any of our partnered clinics
                                        </li>
                                        <li className="flex items-center">
                                            <span className="mr-2 bg-yellow-200 text-yellow-800 rounded-full w-5 h-5 flex items-center justify-center text-xs">3</span>
                                            Provide booking ID at the counter
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        )}

                        {/* Success Message */}
                        {status?.toLowerCase() === "success" && (
                            <div className="bg-blue-50 rounded-2xl p-5 border border-blue-200 flex items-start">
                                <Baby className="mr-3 text-blue-600" />
                                <div>
                                    <p className="font-semibold mb-2 text-blue-800">Your child's vaccination is confirmed!</p>
                                    <p className="text-blue-600">Please arrive 15 minutes before your appointment time. Don't forget to bring your child's vaccination record.</p>
                                </div>
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="space-y-4 pt-4">
                            {status?.toLowerCase() === "success" && (
                                <button
                                    onClick={() => navigate(`/pageProfile/tracking/${user?.id}`)}
                                    className={`w-full ${config.buttonColor} text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center transform hover:scale-105`}
                                >
                                    <FaHistory className="mr-2" />
                                    Track Appointment
                                </button>
                            )}
                            
                            {status?.toLowerCase() === "failed" && (
                                <button
                                    onClick={() => navigate(`/payment/${user?.id}`)}
                                    className={`w-full ${config.buttonColor} text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center transform hover:scale-105`}
                                >
                                    <CreditCard className="mr-2" />
                                    Try Payment Again
                                </button>
                            )}
                            
                            {status?.toLowerCase() === "pending" && (
                                <>
                                    <button
                                        onClick={() => navigate(`/pageProfile/history/${user?.id}`)}
                                        className={`w-full ${config.buttonColor} text-white py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center transform hover:scale-105`}
                                    >
                                        <FaHistory className="mr-2" />
                                        View Appointment History
                                    </button>
                                    
                                    <button
                                        className="w-full bg-white border border-yellow-300 text-yellow-700 py-4 rounded-xl font-semibold hover:bg-yellow-50 transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg transform hover:scale-105"
                                    >
                                        <FaMapMarkerAlt className="mr-2" />
                                        Find Nearest Clinic
                                    </button>
                                </>
                            )}
                            
                            {/* Home Button */}
                            <button
                                onClick={() => navigate('/')}
                                className="w-full bg-white border border-blue-200 text-blue-600 py-3 rounded-xl font-medium hover:bg-blue-50 transition-all duration-300 flex items-center justify-center mt-2"
                            >
                                <House className="mr-2" />
                                Return to Home
                            </button>
                        </div>
                    </div>
                </div>
                
                {/* Footer */}
                <div className="text-center text-gray-500 text-sm mt-6">
                    <p>© 2025 KidVaccine - Keeping children safe and healthy</p>
                </div>
            </div>
        </div>
    );
}