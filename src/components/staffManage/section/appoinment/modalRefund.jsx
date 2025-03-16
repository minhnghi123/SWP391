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
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl font-semibold flex items-center gap-2 text-blue-700">
            <RefreshCcw className="h-5 w-5" />
            {title || "Confirm Refund"}
          </AlertDialogTitle>
          <div className="text-center space-y-4">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 mb-4">
              <AlertTriangle className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">Booking #{bookingId}</h3>
            <AlertDialogDescription className="text-gray-600">
              {message || "Are you sure you want to refund this booking?"}
            </AlertDialogDescription>
          </div>
        </AlertDialogHeader>

        <Card className="my-4 bg-gray-50 border border-gray-200">
          <CardContent className="pt-4">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium text-gray-700">Refund Amount:</span>
              <span className="font-bold text-blue-600">{refundPercentage}%</span>
            </div>
            {
              refundPercentage === 50 ? (
                <div className="text-sm text-gray-500 mt-2 flex items-start gap-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-500 flex-shrink-0" />
                  <span>
                    This booking has received the first dose of vaccination. According to our policy, only a partial refund is available.
                  </span>
                </div>
              ) : refundPercentage === 100 ? (
                <div className="text-sm text-gray-500 mt-2 flex items-start gap-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-500 flex-shrink-0" />
                  <span>
                    This booking has not received any vaccination. According to our policy, a full refund is available.
                  </span>
                </div>
              ) : null
            }

          </CardContent>
        </Card>

        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={handleCancel}
            className="border-gray-300 text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            className="bg-blue-600 text-white hover:bg-blue-700"
          >
            {
              loading ? "Processing..." : "Confirm Refund"
            }
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ModalRefund;
