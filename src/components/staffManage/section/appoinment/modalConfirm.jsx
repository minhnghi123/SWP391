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
    <AlertDialog open={true}>
      <AlertDialogContent className="max-w-md p-0 overflow-hidden border border-blue-100 shadow-xl rounded-3xl">
        <AlertDialogHeader className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 text-white">
          <AlertDialogTitle className="text-xl font-semibold flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-xl">
              <AlertCircle className="h-5 w-5" />
            </div>
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-white/90 mt-3">
            {message}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="p-6">
          <div className="text-center space-y-4 mb-6">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-50">
              <AlertCircle className="h-8 w-8 text-blue-600" />
            </div>
            <p className="text-gray-600 max-w-sm mx-auto">
              Please confirm that you want to proceed with this action. This cannot be undone.
            </p>
          </div>

          <AlertDialogFooter className="mt-6 flex gap-3">
            <AlertDialogCancel
              onClick={handleCancel}
              className="flex-1 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-xl border-0"
              disabled={loading}
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirm}
              className={`flex-1 text-white font-medium rounded-xl transition-all ${
                loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
              }`}
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                  <span>Processing...</span>
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