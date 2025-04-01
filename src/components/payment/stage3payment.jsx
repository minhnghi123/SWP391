import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState, memo } from "react";
import { FaCheckCircle, FaTimesCircle, FaClock, FaHistory, FaInfoCircle } from "react-icons/fa";
import { House, CreditCard } from "lucide-react";
import formatDecimal from "../../utils/calculateMoney";
import { useDispatch } from "react-redux";
import { childAction } from "../redux/reducers/selectChildren";
import { vaccineAction } from "../../components/redux/reducers/selectVaccine";
import { methodPaymentAction } from "../../components/redux/reducers/methodPaymentlice";

const Stage3Payment = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { status } = useParams();
    const user = useSelector((state) => state.account.user);
    const locationBooking = useSelector((state) => state.location.location);
    const [data, setData] = useState({
        OrderId: "",
        Amount: 0,
        BookingID: "",
        Message: "",
        TrancasionID: ""
    });

    // splite data from url
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        setData({
            OrderId: queryParams.get("OrderId") || "N/A",
            Amount: Number(queryParams.get("Amount")) || 0,
            BookingID: queryParams.get("BookingID") || "N/A",
            Message: queryParams.get("Message") || "N/A",
            TrancasionID: queryParams.get("TrancasionID") || "N/A"
        });


    }, [location.search]);

    // remove data from stage 2 if success
    const removeDataStage2 = () => {
        dispatch(childAction.completePayment())
        dispatch(vaccineAction.completePayment())
        dispatch(methodPaymentAction.resetMethodPayment())
    }

    useEffect(() => {
        if (status?.toLowerCase() === "success") {
            removeDataStage2()
        }
    }, [status])
    const handleBack = () => {
        if (locationBooking === 1) {
            navigate(`/payment/${user?.id}`)
        } else {
            navigate(`/pageProfile/history/${user?.id}`)
        }
    }
    console.log('locationBooking', locationBooking)
    const getStatusConfig = () => {
        switch (status?.toLowerCase()) {
            case "success":
                return {
                    icon: <FaCheckCircle className="text-5xl text-green-500" />,
                    title: "Payment Successful!",
                    message: "Your vaccination appointment has been confirmed.",
                    color: "text-green-600",
                    bgColor: "bg-gradient-to-br from-green-50 to-green-100",
                    borderColor: "border-green-200",
                    buttonColor: "bg-gradient-to-r from-green-600 to-green-500",
                    iconBg: "bg-green-100"
                };
            case "failed":
                return {
                    icon: <FaTimesCircle className="text-5xl text-red-500" />,
                    title: "Payment Failed",
                    message: "We couldn't process your payment. Please try again.",
                    color: "text-red-600",
                    bgColor: "bg-gradient-to-br from-red-50 to-red-100",
                    borderColor: "border-red-200",
                    buttonColor: "bg-gradient-to-r from-red-600 to-red-500",
                    iconBg: "bg-red-100"
                };
            case "pending":
            default:
                return {
                    icon: <FaClock className="text-5xl text-yellow-500" />,
                    title: "Payment Pending",
                    message: "Your payment is being processed. Please wait.",
                    color: "text-yellow-600",
                    bgColor: "bg-gradient-to-br from-yellow-50 to-yellow-100",
                    borderColor: "border-yellow-200",
                    buttonColor: "bg-gradient-to-r from-yellow-600 to-yellow-500",
                    iconBg: "bg-yellow-100"
                };
        }
    };

    const config = getStatusConfig();

    return (

        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 my-12">
            <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
                {/* Header */}
                <div className={`${config.bgColor} ${config.borderColor} border-b px-8 py-10 text-center`}>
                    <div className="flex justify-center mb-6">
                        <div className={`${config.iconBg} w-24 h-24 rounded-full flex items-center justify-center shadow-inner`}>
                            {config.icon}
                        </div>
                    </div>
                    <h1 className={`text-3xl font-bold ${config.color}`}>{config.title}</h1>
                    <p className="text-gray-600 mt-3 text-lg">{config.message}</p>
                </div>

                {/* Content */}
                <div className="p-8 md:p-10 space-y-8">
                    {/* Order Details */}
                    {
                        status?.toLowerCase() !== "failed" && (
                            <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl p-8 border border-blue-100 shadow-md">
                                <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                                    <CreditCard className="mr-3 text-blue-500" />
                                    Payment Details
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                                        <p className="text-sm text-gray-500 mb-1">Order ID</p>
                                        <div className="relative group">
                                            <p className="font-medium text-gray-800 cursor-help">
                                                {data.OrderId.length > 20 
                                                    ? `${data.OrderId.substring(0, 10)}...${data.OrderId.substring(data.OrderId.length - 10)}`
                                                    : data.OrderId
                                                }
                                            </p>
                                            {data.OrderId.length > 20 && (
                                                <div className="absolute -top-2 left-0 w-full opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                                    <div className="bg-gray-800 text-white text-xs rounded px-2 py-1 whitespace-nowrap">
                                                        {data.OrderId}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                                        <p className="text-sm text-gray-500 mb-1">Amount</p>
                                     {
                                        data.OrderId.substring(0,4).toLowerCase() === "payid" ? (
                                            <p className="font-bold text-blue-600">{formatDecimal(data.Amount*23000)} VND</p>
                                        ) : (
                                            <p className="font-bold text-blue-600">{formatDecimal(data.Amount)} VND</p>
                                        )
                                     }
                                    </div>
                                    <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                                        <p className="text-sm text-gray-500 mb-1">Booking ID</p>
                                        <p className="font-medium text-gray-800">{data.BookingID}</p>
                                    </div>
                                    <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                                        <p className="text-sm text-gray-500 mb-1">Transaction ID</p>
                                        <p className="font-medium text-gray-800">{data.TrancasionID}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    }

                    {/* Pending Instructions */}
                    {status?.toLowerCase() === "pending" && (
                        <div className="bg-gradient-to-br from-white to-yellow-50 rounded-2xl p-8 border border-yellow-200 flex items-start shadow-md">
                            <FaInfoCircle className="mr-4 mt-1 text-2xl text-yellow-500 flex-shrink-0" />
                            <div>
                                <p className="font-bold mb-4 text-yellow-800 text-lg">Important Notes:</p>
                                <ul className="space-y-4">
                                    <li className="flex items-center">
                                        <span className="mr-3 bg-yellow-200 text-yellow-800 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">1</span>
                                        <span>Complete payment within <span className="font-bold">48 hours</span> to secure your appointment</span>
                                    </li>
                                    <li className="flex items-center">
                                        <span className="mr-3 bg-yellow-200 text-yellow-800 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">2</span>
                                        <span>Visit any of our partnered clinics with your <span className="font-bold">booking confirmation</span></span>
                                    </li>
                                    <li className="flex items-center">
                                        <span className="mr-3 bg-yellow-200 text-yellow-800 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold flex-shrink-0">3</span>
                                        <span>Provide your <span className="font-bold">Booking ID</span> at the reception counter</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    )}

                    {/* Failed Message */}
                    {status?.toLowerCase() === "failed" && (
                        <div className="bg-gradient-to-br from-white to-red-50 rounded-2xl p-8 border border-red-200 flex items-start shadow-md">
                            <FaInfoCircle className="mr-4 text-2xl text-red-500 flex-shrink-0" />
                            <div>
                                <p className="font-bold mb-3 text-red-800 text-lg">Payment could not be processed</p>
                                <p className="text-red-600 mb-3">This could be due to insufficient funds, network issues, or card restrictions. Please try again with a different payment method.</p>
                                <p className="text-gray-600">If you continue to experience issues, please contact our support team at <span className="font-bold text-blue-600">ttei891@gmail.com</span></p>
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
                                onClick={handleBack}
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
                            </>
                        )}

                        {/* Home Button */}
                        <button
                            onClick={() => navigate('/')}
                            className="w-full bg-white border border-blue-200 text-blue-600 py-3 rounded-xl font-medium hover:bg-blue-50 transition-all duration-300 flex items-center justify-center mt-2 transform hover:scale-105"
                        >
                            <House className="mr-2" />
                            Return to Home
                        </button>
                    </div>
                </div>
            </div>

            {/* Footer */}

        </div>

    );
}

export default memo(Stage3Payment)