import { Trash2 } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DeleteVaccineButton = ({ vaccineId, isCombo = false, onDeleteSuccess }) => {
  const handleDelete = async () => {
    try {
      const url = isCombo
        ? `https://localhost:7280/api/VaccineCombo/soft-delete-combo/${encodeURIComponent(vaccineId)}`
        : `https://localhost:7280/api/Vaccine/soft-delete-vaccine/${encodeURIComponent(vaccineId)}`;

      const response = isCombo
        ? await axios.patch(url)
        : await axios.patch(url);

      if (response.status === 200 || response.status === 204) {
        toast.success(
          `${isCombo ? "Combo Vaccine" : "Vaccine"} deleted successfully!`,
          { autoClose: 3000 }
        );
        onDeleteSuccess(); // Gọi hàm callback sau khi xóa thành công
      } else {
        toast.error(
          `Failed to delete ${isCombo ? "combo vaccine" : "vaccine"}.`,
          { autoClose: 3000 }
        );
      }
    } catch (error) {
      console.error(
        `Error deleting ${isCombo ? "combo vaccine" : "vaccine"}:`,
        error
      );
      toast.error(`Error deleting ${isCombo ? "combo vaccine" : "vaccine"}.`);
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="p-1.5 bg-rose-50 text-rose-600 rounded-md hover:bg-rose-100 transition-colors"
      title="Delete"
    >
      <Trash2 size={16} />
    </button>
  );
};

export default DeleteVaccineButton;