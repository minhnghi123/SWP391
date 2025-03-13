import { Trash2 } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAxios from "../../../utils/useAxios";
import { urPK } from "@mui/x-date-pickers/locales";
const url = import.meta.env.VITE_BASE_URL_DB;

const DeleteVaccineButton = ({ vaccineId, isCombo = false, onDeleteSuccess }) => {
  const api = useAxios();
  const handleDelete = async () => {
    try {
      const url = isCombo
        ? `${url}/VaccineCombo/soft-delete-combo/${encodeURIComponent(vaccineId)}`
        : `${url}/Vaccine/soft-delete-vaccine/${encodeURIComponent(vaccineId)}`;

      const response = isCombo
        ? await api.patch(url)
        : await api.patch(url);

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