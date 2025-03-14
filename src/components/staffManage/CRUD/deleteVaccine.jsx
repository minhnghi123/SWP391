import { Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAxios from "../../../utils/useAxios";

const url = import.meta.env.VITE_BASE_URL_DB;

const DeleteVaccineButton = ({ vaccineId, isCombo = false, onDeleteSuccess }) => {
  const api = useAxios();

  const handleDelete = async () => {
    try {
      // Define the endpoint based on whether it's a combo or single vaccine
      const endpoint = isCombo
        ? `${url}/VaccineCombo/soft-delete-combo/${encodeURIComponent(vaccineId)}`
        : `${url}/Vaccine/soft-delete-vaccine/${encodeURIComponent(vaccineId)}`;

      // Make the PATCH request using the axios instance from useAxios
      const response = await api.patch(endpoint);

      if (response.status === 200 || response.status === 204) {
        toast.success(
          `${isCombo ? "Combo Vaccine" : "Vaccine"} deleted successfully!`,
          { autoClose: 3000 }
        );
        if (onDeleteSuccess) onDeleteSuccess(); // Call the callback if provided
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
      toast.error(
        `Error deleting ${isCombo ? "combo vaccine" : "vaccine"}.`,
        { autoClose: 3000 }
      );
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