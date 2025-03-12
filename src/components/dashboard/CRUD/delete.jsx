import { Trash2 } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DeleteComponent = ({ id, onDeleteSuccess }) => {
  const handleDelete = async () => {
    if (!id || isNaN(id)) return toast.error("Invalid User ID!");

    try {
      const response = await axios.patch(
        `https://localhost:7280/api/User/soft-delete-user/${id}`
      );

      if (response.status === 200 || response.status === 204) {
        toast.success("User deleted!");
        onDeleteSuccess(id);
      } else {
        throw new Error(`Unexpected response: ${response.status}`);
      }
    } catch (error) {
      toast.error("Error deleting user!");
      console.error("Delete error:", {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
      });
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="p-1.5 bg-rose-50 text-rose-600 rounded-md hover:bg-rose-100"
      title="Delete"
    >
      <Trash2 size={16} />
    </button>
  );
};

export default DeleteComponent;
