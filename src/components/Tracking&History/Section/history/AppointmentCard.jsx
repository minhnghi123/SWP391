import { AccessTimeOutlined, ChildCareOutlined, KeyboardArrowDown, KeyboardArrowRight } from '@mui/icons-material';
import formatDateTime from '../../../../utils/Date';
import { useState } from 'react';
import formatCurrency from '../../../../utils/calculateMoney';
import PaymentModal from './PaymentModal';
import useAxios from '../../../../utils/useAxios';
import { toast } from 'react-toastify';
import ModalRefund from '../../../staffManage/section/appoinment/modalRefund';

const url = import.meta.env.VITE_BASE_URL_DB;

const AppointmentCard = ({ bill, VaccineItem, STATUS_CONFIG, id, setTrigger }) => {
    const totalChild = bill.childrenList.map(child => child.id);
    const appointmentDate = formatDateTime(bill.arrivedAt);
    const [isExpanded, setIsExpanded] = useState(false);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [modalRefund, setModalRefund] = useState(false);
    const [refundPercentage, setRefundPercentage] = useState(0);
    const [loading, setLoading] = useState(false);

    const totalVaccines = bill.vaccineList.length + bill.comboList.length;
    const api = useAxios();

    const handleRefundBooking = async (bookingId) => {
        if (!bookingId) return;

        try {
            setLoading(true);
            const response = await api.post(`${url}/Payment/refund`, {
                bookingID: bookingId,
                paymentStatusEnum: refundPercentage === 50 ? 0 : 1
            });

            if (response.status === 200) {
                toast.success("Refunded successfully!");
                setTrigger(true);
                setModalRefund(false);
                setRefundPercentage(0);
            } else {
                toast.error("Refund failed.");
            }
        } catch (error) {
            toast.error("Refund failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const initiateRefund = async (bookingId) => {
        if (!bookingId) return;
        setModalRefund(true);
        setLoading(true);
        try {
            const res = await api.get(`${url}/VaccinesTracking/get-by-booking-id/${bookingId}`);
            if (res.status === 200) {
                const trackingData = res.data;
                const checkFirstDose = trackingData.some(item => item.bookingId ==bookingId && item.previousVaccination === 0 && item.status.toLowerCase() === "success")
                if (checkFirstDose) {
                  const hasNextVaccine = trackingData.some(item => item.bookingId == bookingId && item.previousVaccination !== 0 && item.status.toLowerCase() === "success")
                  setRefundPercentage(hasNextVaccine ? 0 : 50);
                } else {
                  setRefundPercentage(100);
                }
            }
        } catch (error) {
            toast.error("Failed to check refund eligibility.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100">
            <div className="flex justify-between items-start mb-5">
                <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        {bill.childrenList.map(child => child.name).join(', ')}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <ChildCareOutlined className="w-4 h-4 text-blue-500" />
                        <span>Vaccination Schedule</span>
                    </div>
                </div>
                <span
                    className={`${STATUS_CONFIG[bill.status].color} px-4 py-1.5 rounded-full text-sm font-medium inline-flex items-center gap-2 shadow-sm`}
                    role="status"
                >
                    {STATUS_CONFIG[bill.status].icon}
                    {STATUS_CONFIG[bill.status].text}
                </span>
            </div>

            <div className="space-y-4 mb-6">
                <div className="flex items-center text-gray-700 bg-gray-50 p-3 rounded-lg">
                    <AccessTimeOutlined className="w-5 h-5 mr-3 text-blue-500" />
                    <div className="flex-1">
                        <p className="font-medium">{appointmentDate}</p>
                    </div>
                </div>

                <div className="bg-gray-50 rounded-lg overflow-hidden">
                    <button
                        className="w-full flex items-center justify-between p-4 cursor-pointer hover:bg-gray-100 transition-colors duration-200"
                        onClick={() => setIsExpanded(!isExpanded)}
                        aria-expanded={isExpanded}
                        aria-controls="vaccine-list"
                    >
                        <div className="flex items-center gap-3">
                            <h4 className="text-sm font-medium text-gray-700">Vaccine List</h4>
                            <span className="text-xs bg-blue-100 text-blue-800 px-2.5 py-1 rounded-full font-medium">
                                {totalVaccines}
                            </span>
                        </div>
                        {isExpanded ? (
                            <KeyboardArrowDown className="text-gray-500 transition-transform duration-200" />
                        ) : (
                            <KeyboardArrowRight className="text-gray-500 transition-transform duration-200" />
                        )}
                    </button>
                    <div
                        id="vaccine-list"
                        className={`transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}
                    >
                        <div className="p-4 pt-0 space-y-2">
                            {bill.vaccineList.map((vaccine, index) => (
                                <VaccineItem key={`vaccine-${index}`} vaccine={vaccine} totalChild={totalChild} />
                            ))}
                            {bill.comboList.map((combo, index) => (
                                <VaccineItem key={`combo-${index}`} vaccine={combo} totalChild={totalChild} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-100 pt-4">
                <div className="flex flex-wrap justify-between items-center gap-3 mb-4">
                    <div className="text-sm text-gray-600">
                        <span className="font-medium">Payment Method:</span>{' '}
                        {bill.paymentName === 'Does not purchase yet' ? 'Not yet' : bill.paymentName}
                    </div>
                    <div className="text-lg font-bold text-blue-600">
                        {formatCurrency(bill.amount)} VND
                    </div>
                </div>

                {bill.status.toLowerCase() === 'pending' && (
                    <button
                        onClick={() => setIsOpenModal(true)}
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2.5 px-4 rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md"
                        aria-label="Proceed to payment"
                    >
                        Proceed to Payment
                    </button>
                )}

                {bill?.status?.toLowerCase() === "success" &&
                    (bill.paymentName.toLowerCase() === 'momo' || bill.paymentName.toLowerCase() === 'paypal') &&
                    (new Date() - new Date(bill.createdAt)) <= 48 * 60 * 60 * 1000 && (
                        <button
                            onClick={() => initiateRefund(bill.id)}
                            className="w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2.5 px-4 rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md"
                            aria-label="Request Refund"
                        >
                            Refund
                        </button>
                    )}

                {bill?.status?.toLowerCase() === "success" &&
                    bill.paymentName.toLowerCase() === 'vnpay' &&
                    (new Date() - new Date(bill.createdAt)) <= 48 * 60 * 60 * 1000 && (
                        <p className="text-red-500 text-sm text-center">
                            If you cancel the booking, please visit a Healthcare Blue location for a cash refund
                        </p>
                    )}
            </div>

            {isOpenModal && (
                <PaymentModal onClose={() => setIsOpenModal(false)} bill={bill} id={id} />
            )}

            {modalRefund && (
                <ModalRefund
                    title="Confirm Refund Booking"
                    message="Are you sure you want to refund this booking?"
                    handleConfirm={handleRefundBooking}
                    handleCancel={() => setModalRefund(false)}
                    loading={loading}
                    bookingId={bill?.id}
                    refundPercentage={refundPercentage}
                />
            )}
        </div>
    );
};

export default AppointmentCard; 