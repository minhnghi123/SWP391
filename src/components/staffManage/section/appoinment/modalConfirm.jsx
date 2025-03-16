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
import { AlertCircle } from "lucide-react";

const ModalConfirm = ({ title, message, handleConfirm, handleCancel, loading }) => {
  return (
    <AlertDialog defaultOpen>
      <AlertDialogContent className="max-w-[500px] p-0 overflow-hidden border border-gray-200">
        <AlertDialogHeader className="p-6 pb-4">
          <AlertDialogTitle className="text-xl font-semibold flex items-center gap-2 text-blue-700">
            <AlertCircle className="h-5 w-5" />
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-600 mt-2">
            {message}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="p-6 pt-0">
          <AlertDialogFooter className="mt-4 flex space-x-3">
            <AlertDialogCancel
              onClick={handleCancel}
              className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:ring-2 focus:ring-gray-200"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirm}
              className="flex-1 bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Processing...
                </div>
              ) : (
                "Confirm"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ModalConfirm;
