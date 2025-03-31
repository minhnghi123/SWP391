import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle, RefreshCcw } from "lucide-react";

const ModalRefund = ({ title, message, bookingId, refundPercentage, handleConfirm, handleCancel, loading }) => {
  return (
    <AlertDialog defaultOpen>
      <AlertDialogContent className="max-w-md p-0 overflow-hidden border border-blue-100 shadow-xl rounded-3xl">
        <AlertDialogHeader className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <AlertDialogTitle className="text-xl font-semibold flex items-center gap-3">
              <div className="p-2 bg-white/10 rounded-xl">
                <RefreshCcw className="h-5 w-5" />
              </div>
              {title || "Confirm Refund"}
            </AlertDialogTitle>
          </div>
          <AlertDialogDescription className="text-white/90 mt-3">
            {message || "Are you sure you want to refund this booking?"}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="p-6">
          <div className="text-center space-y-4 mb-6">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-50">
              <AlertTriangle className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">Booking #{bookingId}</h3>
          </div>

          <Card className="bg-blue-50/30 border border-blue-100 rounded-2xl shadow-sm">
            <CardContent className="p-4">
              {refundPercentage !== 0 && (
                <div className="flex justify-between items-center mb-3">
                  <span className="font-medium text-gray-700">Refund Amount:</span>
                  <span className="text-lg font-semibold text-blue-600">{refundPercentage}%</span>
                </div>
              )}
              {refundPercentage === 0 && (
                <div className="flex items-start gap-3 bg-red-50 border border-red-100 rounded-xl p-4">
                  <AlertTriangle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <span className="text-red-700 font-medium">
                    This booking has received at least two doses of vaccination. According to our policy, no refund is available.
                  </span>
                </div>
              )}
              {refundPercentage === 50 ? (
                <div className="flex items-start gap-3 bg-yellow-50 border border-yellow-100 rounded-xl p-4">
                  <AlertTriangle className="h-5 w-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                  <span className="text-yellow-700 font-medium">
                    This booking has received the first dose of vaccination. According to our policy, only a partial refund is available.
                  </span>
                </div>
              ) : refundPercentage === 100 ? (
                <div className="flex items-start gap-3 bg-green-50 border border-green-100 rounded-xl p-4">
                  <AlertTriangle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-green-700 font-medium">
                    This booking has not received any vaccination. According to our policy, a full refund is available.
                  </span>
                </div>
              ) : null}
            </CardContent>
          </Card>

          <AlertDialogFooter className="mt-6 flex gap-3">
            <AlertDialogCancel
              onClick={handleCancel}
              className="flex-1 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-xl border-0"
            >
              Cancel
            </AlertDialogCancel>
            {refundPercentage !== 0 && (
              <button
                onClick={() => handleConfirm(bookingId)}
                disabled={loading}
                className={`flex-1 px-6 py-2.5 text-white font-medium rounded-xl transition-all
                  ${loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                    <span>Processing...</span>
                  </div>
                ) : (
                  "Confirm Refund"
                )}
              </button>
            )}
          </AlertDialogFooter>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ModalRefund;
