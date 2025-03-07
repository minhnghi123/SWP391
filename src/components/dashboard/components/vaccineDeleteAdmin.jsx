import { Trash2 } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DeleteVaccineButton = ({ vaccineId, onDeleteSuccess }) => {
  const handleDeleteVaccine = async () => {
    try {
      const response = await axios.patch(
        `https://localhost:7280/api/Vaccine/delete-vaccine-by-id/${encodeURIComponent(vaccineId)}`
      );

      if (response.status === 200 || response.status === 204) {
        toast.success(" Vaccine deleted successfully!", { autoClose: 5000 });
        setTimeout(() => {
          window.location.reload();
        }, 3000); // Reload sau 5 giây // Reload trang sau khi xoá thành công
        if (onDeleteSuccess) onDeleteSuccess(vaccineId);
      } else {
        toast.error(" Failed to delete vaccine.", { autoClose: 3000 });
      }
    } catch (error) {
      console.error(" Error deleting vaccine:", error);
      toast.error(" Error deleting vaccine.");
    }
  };

  return (
    <button
      onClick={() => handleDeleteVaccine()}
      className="p-1.5 bg-rose-50 text-rose-600 rounded-md hover:bg-rose-100 transition-colors"
      title="Delete"
    >
      <Trash2 size={16} />
    </button>
  );
};

export default DeleteVaccineButton;
