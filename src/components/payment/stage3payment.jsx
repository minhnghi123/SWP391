import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { FaCheckCircle, FaTimesCircle, FaClock, FaMapMarkerAlt, FaHistory, FaInfoCircle, FaShieldAlt } from "react-icons/fa";
import { House } from "lucide-react";
import formatDecimal from "../../utils/calculateMoney";

export default function Stage3Payment() {
    const navigate = useNavigate();
    const location = useLocation();
    const { status } = useParams();
    const user = useSelector((state) => state.account.user);
    const [err, setErr] = useState("");
    const [loading, setLoading] = useState(false);
    const orderData = useSelector((state) => state.order.orderData);
    console.log(orderData)
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
        }
    }, [location.search, orderData]);

    const currentData = status?.toLowerCase() === "pending" ? orderData : data;

    const getStatusConfig = () => {
        const configs = {
            success: {
                icon: <FaCheckCircle className="text-6xl" />,
                title: "Payment Successful!",
                description: "Your transaction has been completed.",
                bgColor: "bg-gradient-to-br from-green-50 to-green-100",
                textColor: "text-green-700",
                borderColor: "border-green-200",
                buttonColor: "bg-green-600 hover:bg-green-700",
                animation: "animate-pulse",
                iconBg: "bg-green-100"
            },
            failed: {
                icon: <FaTimesCircle className="text-6xl" />,
                title: "Payment Failed",
                description: "We couldn't process your payment.",
                bgColor: "bg-gradient-to-br from-red-50 to-red-100",
                textColor: "text-red-700",
                borderColor: "border-red-200",
                buttonColor: "bg-red-600 hover:bg-red-700",
                animation: "animate-shake",
                iconBg: "bg-red-100"
            },
            pending: {
                icon: <FaClock className="text-6xl" />,
                title: "Payment Pending",
                description: "Please complete your payment at the clinic.",
                bgColor: "bg-gradient-to-br from-yellow-50 to-yellow-100",
                textColor: "text-yellow-700",
                borderColor: "border-yellow-200",
                buttonColor: "bg-yellow-600 hover:bg-yellow-700",
                animation: "animate-spin-slow",
                iconBg: "bg-yellow-100"
            }
        };
        return configs[status?.toLowerCase()] || configs.failed;
    };

    const config = getStatusConfig();

    return (
        <div className=" min-h-screen bg-gray-50 flex items-center justify-center p-6">
            <div className="max-w-md w-full space-y-6">
                {/* Back Button */}
                <button
                    onClick={() => navigate('/')}
                    className="flex items-center text-gray-700 hover:text-gray-900 bg-white py-2 px-4 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
                >
                    <House className="mr-2" />
                    Home
                </button>

                {/* Main Card */}
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 transform hover:scale-[1.02] transition-transform duration-300">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center p-12">
                            <div className="w-16 h-16 border-4 border-t-blue-500 rounded-full animate-spin mb-4"></div>
                            <p className="text-gray-600 font-semibold">Processing...</p>
                        </div>
                    ) : err ? (
                        <div className="text-center p-12">
                            <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                <FaTimesCircle className="text-red-600 text-3xl" />
                            </div>
                            <p className="text-red-600 font-semibold mb-4">{err}</p>
                            <button
                                onClick={() => navigate(`/payment/${user?.id}`)}
                                className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 transition-all duration-300"
                            >
                                Try Again
                            </button>
                        </div>
                    ) : (
                        <>
                            {/* Status Header */}
                            <div className={`${config.bgColor} p-8 text-center relative`}>
                                <div className="absolute inset-0 opacity-20 bg-pattern-wave"></div>
                                <div className={`${config.iconBg} w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                                    <span className={config.textColor}>{config.icon}</span>
                                </div>
                                <h2 className="text-2xl font-bold text-gray-800 mb-2">{config.title}</h2>
                                <p className="text-gray-600">{config.description}</p>
                            </div>

                            {/* Payment Details */}
                            <div className="p-6 space-y-6">
                                {status === "success" && (
                                    <div className="bg-gray-50 rounded-xl p-6 shadow-inner">
                                        <div className="space-y-4">
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-500 flex items-center">
                                                    <FaShieldAlt className="mr-2 text-green-500" />
                                                    Transaction ID
                                                </span>
                                                <span className="font-mono text-gray-800">{currentData?.TrancasionID}</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-500">Booking ID</span>
                                                <span className="font-mono text-gray-800">{currentData?.BookingID}</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-500">Amount</span>
                                                <span className={`font-bold ${config.textColor}`}>
                                                    {formatDecimal(currentData?.Amount || 0)} VND
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {status === "pending" && (
                                    <>
                                        <div className="bg-gray-50 rounded-xl p-6 shadow-inner">
                                            <div className="space-y-4">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-gray-500">Amount</span>
                                                    <span className={`font-bold ${config.textColor}`}>
                                                        {formatDecimal(currentData?.totalPrice || 0)} VND
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-yellow-50 rounded-xl p-4 flex items-start text-yellow-700">
                                            <FaInfoCircle className="mr-3 mt-1 text-xl" />
                                            <div>
                                                <p className="font-semibold mb-2">Important Notes:</p>
                                                <ul className="list-disc pl-4 space-y-1">
                                                    <li>Complete payment within 48 hours</li>
                                                    <li>Visit any of our clinics</li>
                                                    <li>Provide booking ID at the counter</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </>
                                )}

                                {/* Action Buttons */}
                                <div className="space-y-4">
                                    {status === "success" && (
                                        <button
                                            onClick={() => navigate(`/pageProfile/tracking/${user?.id}`)}
                                            className={`${config.buttonColor} w-full text-white py-3 rounded-full font-semibold shadow-md hover:shadow-lg transition-all duration-300`}
                                        >
                                            Track Appointment
                                        </button>
                                    )}
                                    {status === "failed" && (
                                        <button
                                            onClick={() => navigate(`/payment/${user?.id}`)}
                                            className={`${config.buttonColor} w-full text-white py-3 rounded-full font-semibold shadow-md hover:shadow-lg transition-all duration-300`}
                                        >
                                            Try Again
                                        </button>
                                    )}
                                    {status === "pending" && (
                                        <>
                                            <button
                                                onClick={() => navigate(`/pageProfile/history/${user?.id}`)}
                                                className={`${config.buttonColor} w-full text-white py-3 rounded-full font-semibold shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center`}
                                            >
                                                <FaHistory className="mr-2" />
                                                View History
                                            </button>
                                            <button
                                                // onClick={() => navigate('/locations')}
                                                className="w-full bg-white border border-gray-300 text-gray-700 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 flex items-center justify-center"
                                            >
                                                <FaMapMarkerAlt className="mr-2" />
                                                Find Clinic
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}