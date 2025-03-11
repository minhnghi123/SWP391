import { Trash2 } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DeleteComponent = ({ id, onDeleteSuccess }) => {
  const handleDelete = async () => {
    if (!id) return toast.error("User ID is missing!");

    try {
      const response = await axios.patch(
        `https://localhost:7280/api/User/soft-delete-user/${id}`
      );

      if (response.status === 200 || response.status === 204) {
        toast.success("User deleted!");
        onDeleteSuccess(id);
      }
    } catch (error) {
      toast.error("Error deleting user!");
      console.error("Delete error:", status, error.message);
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
