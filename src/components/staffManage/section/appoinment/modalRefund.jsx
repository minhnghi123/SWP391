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
import { AlertTriangle, RefreshCcw, X } from "lucide-react";

const ModalRefund = ({ title, message, bookingId, refundPercentage, handleConfirm, handleCancel, loading }) => {

  return (
    <AlertDialog defaultOpen>
      <AlertDialogContent className="max-w-md p-0 overflow-hidden border border-blue-100 shadow-md">
        <AlertDialogHeader className="bg-gradient-to-r from-blue-500 to-blue-600 p-5 text-white">
          <div className="flex items-center justify-between">
            <AlertDialogTitle className="text-xl font-semibold flex items-center gap-2">
              <RefreshCcw className="h-5 w-5" />
              {title || "Confirm Refund"}
            </AlertDialogTitle>
          </div>
          <AlertDialogDescription className="text-white/90 mt-2">
            {message || "Are you sure you want to refund this booking?"}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="p-5">
          <div className="text-center space-y-4 mb-4">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-100">
              <AlertTriangle className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">Booking #{bookingId}</h3>
          </div>

          <Card className="my-4 bg-blue-50/30 border border-blue-100">
            <CardContent className="pt-4">
              {
                refundPercentage !== 0 && (
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-gray-700">Refund Amount:</span>
                    <span className="font-bold text-blue-600">{refundPercentage}%</span>
                  </div>
                )
              }
              {
                refundPercentage === 0 && (
                  <div className="text-sm text-gray-700 mt-2 flex items-start gap-2 bg-red-50 border border-red-100 rounded-md p-3">
                    <AlertTriangle className="h-5 w-5 text-red-500 flex-shrink-0" />
                    <span className="text-red-700 font-medium" >
                      This booking has recevied at least two doses of vaccination. According to our policy, no refund anything.
                    </span>
                  </div>
                )
              }
              {
                refundPercentage === 50 ? (
                  <div className="text-sm text-gray-700 mt-2 flex items-start gap-2 bg-yellow-50 border border-yellow-100 rounded-md p-3">
                    <AlertTriangle className="h-5 w-5 text-yellow-500 flex-shrink-0" />
                    <span className="text-yellow-700 font-medium" >
                      This booking has received the first dose of vaccination. According to our policy, only a partial refund is available.
                    </span>
                  </div>
                ) : refundPercentage === 100 ? (
                  <div className="text-sm text-gray-700 mt-2 flex items-start gap-2 bg-green-50 border border-green-100 rounded-md p-3">
                    <AlertTriangle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-green-700 font-medium" >
                      This booking has not received any vaccination. According to our policy, a full refund is available.
                    </span>
                  </div>
                ) : null
              }
            </CardContent>
          </Card>

          <AlertDialogFooter className="mt-4 flex gap-3">
            <AlertDialogCancel
              onClick={handleCancel}
              className="flex-1 border-blue-200 text-blue-700 hover:bg-blue-50 hover:text-blue-800"
            >
              Cancel
            </AlertDialogCancel>
            {
              refundPercentage !== 0 && (
                <button
                  onClick={() => handleConfirm(bookingId)}
                  disabled={loading}
                  className={`flex-1 px-4 py-2 text-white font-medium rounded-md transition duration-200 
      ${loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}
    `}
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                      </svg>
                      Processing...
                    </div>
                  ) : (
                    "Confirm Refund"
                  )}
                </button>


              )
            }
          </AlertDialogFooter>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ModalRefund;
