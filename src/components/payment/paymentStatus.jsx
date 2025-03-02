import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { currenStepAction } from "../redux/reducers/currentStepSlice";
import { useEffect, useState } from "react";
import axios from "axios";
import { FaCheckCircle, FaTimesCircle, FaArrowLeft, FaEnvelope } from "react-icons/fa";
import formatDecimal from "../../utils/calculateMoney";

export default function PaymentStatus() {
    const navigate = useNavigate();
    const { status } = useParams();
    const user = useSelector((state) => state.account.user);
    const dispatch = useDispatch();
    const [data, setData] = useState(null);
    const [err, setErr] = useState("");
    const [loading, setLoading] = useState(false);



    const fetchOrderDetail = async () => {
        if (!user?.id) return;
        setLoading(true);
        try {
            const res = await axios.get(`/OrderDetail/${user.id}`);
            if (res.status === 200 && res.data) {
                setData(res.data);
            } else {
                setData(null);
                setErr("No Data");
            }
        } catch (error) {
            setErr("Failed to fetch data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrderDetail();
    }, [user?.id]);

    const handleTrackVaccine = () => {
        navigate(`/pageProfile/tracking/${user?.id}`);
    };

    const handleTryAgain = () => {
        dispatch(currenStepAction.decreaseStep());
        navigate(`/paymentPage/${user?.id}`);
    };
    //cash
  
    return (
        <div className="max-h-screen bg-gray-50 flex items-center justify-center p-12">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
                {/* Hiển thị trạng thái tải */}
                {loading ? (
                    <div className="text-center">
                        <p className="text-gray-600">Loading order details...</p>
                    </div>
                ) : err ? (
                    <div className="text-center">
                        <p className="text-red-500">{err}</p>
                    </div>
                ) : (
                    <>
                        {status?.toLowerCase() === "success" ? (
                            <div className="text-center">
                                <div className="animate-bounce inline-block mb-6">
                                    <FaCheckCircle className="text-emerald-500 text-6xl" />
                                </div>
                                <h1 className="text-2xl font-bold text-gray-800 mb-4">
                                    Payment Successful!
                                </h1>
                                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                                    <div className="flex justify-between mb-2">
                                        <span className="text-gray-600">Transaction ID:</span>
                                        {/* <span className="text-gray-800 font-medium">{data?.trancasionID || "N/A"}</span> */}
                                        <span className="text-gray-800 font-medium">1740501466406</span>
                                    </div>
                                    <div className="flex justify-between mb-2">
                                        <span className="text-gray-600">Payment Method:</span>
                                        <span className="text-gray-800 font-medium">
                                            {/* {data?.method === 1 && "Paypal"}
                                            {data?.method === 2 && "MoMo"}
                                            {data?.method === 3 && "VnPay"} */}
                                            MoMo
                                        </span>
                                    </div>
                                    <div className="flex justify-between mb-2">
                                        <span className="text-gray-600">Amount:</span>
                                        <span className="text-gray-800 font-medium">

                                            {/* {formatDecimal(data?.amount || 0)} VND */}
                                            {formatDecimal(50000)}
                                        </span>
                                    </div>
                                    <div className="flex justify-between mb-2">
                                        <span className="text-gray-600">Status:</span>
                                        <span className="text-gray-800 font-medium">
                                            Complete
                                        </span>
                                    </div>
                                </div>
                                <p className="text-gray-600 mb-8">
                                    Your vaccination appointment has been confirmed. We look forward to seeing you!
                                </p>
                                <button
                                    onClick={handleTrackVaccine}
                                    className="w-full bg-emerald-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-emerald-600 transition-colors"
                                    aria-label="Track your vaccine"
                                >
                                    Track Your Vaccine
                                </button>
                            </div>
                        ) : status?.toLowerCase() === "failed" ? (
                            <div className="text-center">
                                <div className="animate-shake inline-block mb-6">
                                    <FaTimesCircle className="text-red-500 text-6xl" />
                                </div>
                                <h1 className="text-2xl font-bold text-gray-800 mb-4">
                                    Payment Failed
                                </h1>
                                <p className="text-gray-600 mb-8">
                                    We apologize, but something went wrong with your payment. Please try again.
                                </p>
                                <button
                                    onClick={handleTryAgain}
                                    className="w-full bg-red-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-red-600 transition-colors"
                                    aria-label="Try payment again"
                                >
                                    Try Again
                                </button>
                            </div>
                        ) : (
                        status?.toLowerCase() === "pending"
                        )}
                    </>
                )}

                {/* Support Section */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                    <p className="text-center text-gray-600 text-sm mb-4">
                        Need assistance?
                    </p>
                    <a
                        href="mailto:support@example.com"
                        className="flex items-center justify-center text-gray-600 hover:text-gray-800 transition-colors"
                        aria-label="Contact support"
                    >
                        <FaEnvelope className="mr-2" />
                        Contact Support
                    </a>
                </div>
            </div>
        </div>
    );
}
