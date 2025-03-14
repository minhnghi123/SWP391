import { Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAxios from "../../../utils/useAxios";

const url = import.meta.env.VITE_BASE_URL_DB;

const DeleteAdmin = ({ id, isCombo = false, isUser = false, onDeleteSuccess }) => {
  const api = useAxios();

  const handleDelete = async () => {
    try {
      // Define the endpoint based on whether it's a user, combo vaccine, or single vaccine
      const endpoint = isUser
        ? `${url}/User/soft-delete-user/${encodeURIComponent(id)}`
        : isCombo
          ? `${url}/VaccineCombo/soft-delete-combo/${encodeURIComponent(id)}`
          : `${url}/Vaccine/soft-delete-vaccine/${encodeURIComponent(id)}`;

      // Make the PATCH request using the axios instance from useAxios
      const response = await api.patch(endpoint);

      if (response.status === 200 || response.status === 204) {
        const successMessage = isUser
          ? "User deleted successfully!"
          : isCombo
            ? "Combo Vaccine deleted successfully!"
            : "Vaccine deleted successfully!";
        toast.success(successMessage, { autoClose: 3000 });
        if (onDeleteSuccess) onDeleteSuccess(); // Call the callback if provided
      } else {
        const errorMessage = isUser
          ? "Failed to delete user."
          : isCombo
            ? "Failed to delete combo vaccine."
            : "Failed to delete vaccine.";
        toast.error(errorMessage, { autoClose: 3000 });
      }
    } catch (error) {
      const errorMessage = isUser
        ? "Error deleting user"
        : isCombo
          ? "Error deleting combo vaccine"
          : "Error deleting vaccine";
      console.error(`${errorMessage}:`, error);
      toast.error(`${errorMessage}.`, { autoClose: 3000 });
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

export default DeleteAdmin;