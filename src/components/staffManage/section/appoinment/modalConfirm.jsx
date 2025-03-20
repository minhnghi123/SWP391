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
    <AlertDialog open={true}> {/* Sử dụng open thay vì defaultOpen để kiểm soát trạng thái */}
      <AlertDialogContent className="max-w-[500px] p-0 overflow-hidden border border-blue-100 shadow-md">
        <AlertDialogHeader className="bg-gradient-to-r from-blue-500 to-blue-600 p-5 text-white">
          <AlertDialogTitle className="text-xl font-semibold flex items-center gap-2">
            <AlertCircle className="h-5 w-5" />
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-white/90 mt-2">
            {message}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="p-6">
          <AlertDialogFooter className="mt-4 flex space-x-3">
            <AlertDialogCancel
              onClick={handleCancel}
              className="flex-1 border-blue-200 text-blue-700 hover:bg-blue-50 hover:text-blue-800 focus:ring-2 focus:ring-blue-200"
              disabled={loading} // Vô hiệu hóa nút Cancel khi đang loading
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirm} // Sử dụng hàm bất đồng bộ
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