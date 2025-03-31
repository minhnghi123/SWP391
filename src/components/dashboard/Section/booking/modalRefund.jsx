import React from "react";
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
import { AlertTriangle, RefreshCcw } from "lucide-react";

const ModalRefund = ({ title, message, bookingId, refundPercentage, handleConfirm, handleCancel, loading }) => {
  return (
    <AlertDialog defaultOpen> 
      <AlertDialogContent className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] flex flex-col border border-gray-100">
        {/* Header */}
        <AlertDialogHeader className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50">
          <AlertDialogTitle className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <RefreshCcw className="h-5 w-5 text-blue-600" />
            {title || "Confirm Refund"}
          </AlertDialogTitle>
          <button
            onClick={handleCancel}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close modal"
          >
            <svg className="h-5 w-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </AlertDialogHeader>

        {/* Main Content */}
        <div className="p-4 flex-1 overflow-y-auto">
          <div className="text-center space-y-4 mb-4">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-50">
              <AlertTriangle className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Booking #{bookingId}</h3>
            <AlertDialogDescription className="text-sm text-gray-600">
              {message || "Are you sure you want to refund this booking?"}
            </AlertDialogDescription>
          </div>

          {/* Refund Info */}
          <div className="bg-gray-50 p-3 rounded-xl space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-semibold text-gray-600">Refund Percentage:</span>
              <span className="font-bold text-blue-600">{refundPercentage}%</span>
            </div>
            {refundPercentage === 100 ? (
              <div className="text-sm text-gray-700 flex items-start gap-2 bg-green-50 border border-green-100 rounded-md p-2">
                <AlertTriangle className="h-4 w-4 text-blue-600 flex-shrink-0" />
                <span>
                  This booking qualifies for a full refund as it is in "Pending" status and within the 2-day window.
                </span>
              </div>
            ) : refundPercentage === 0 ? (
              <div className="text-sm text-gray-700 flex items-start gap-2 bg-red-50 border border-red-100 rounded-md p-2">
                <AlertTriangle className="h-4 w-4 text-red-600 flex-shrink-0" />
                <span>
                  This booking cannot be refunded. It must be in "Pending" status and created within the last 2 days.
                </span>
              </div>
            ) : null}
          </div>
        </div>

        {/* Footer */}
        <AlertDialogFooter className="p-4 border-t border-gray-100 flex justify-end gap-2">
          <AlertDialogCancel
            onClick={handleCancel}
            className="px-4 py-1 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm border-0"
          >
            Cancel
          </AlertDialogCancel>
          <button
            onClick={() => handleConfirm(bookingId)}
            disabled={loading || refundPercentage === 0}
            className={`px-4 py-1 rounded-lg text-sm font-medium transition-colors flex items-center gap-1 ${
              loading || refundPercentage === 0
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin h-4 w-4 text-white mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
                Processing...
              </>
            ) : (
              "Confirm Refund"
            )}
          </button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ModalRefund;