import { Trash2 } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DeleteComponent = ({
  id,
  endpoint,
  entityName = "item", // Tên mặc định nếu không truyền
  onDeleteSuccess,
}) => {
  const handleDelete = async () => {
    if (!id || isNaN(id)) {
      toast.error(`Invalid ${entityName} ID!`);
      return;
    }

    try {
      const response = await axios.patch(endpoint.replace("{id}", id));

      if (response.status === 200 || response.status === 204) {
        toast.success(`${entityName} deleted successfully!`);
        onDeleteSuccess(id);
      } else {
        throw new Error(`Unexpected response status: ${response.status}`);
      }
    } catch (error) {
      toast.error(`Failed to delete ${entityName}!`);
      console.error(`Delete ${entityName} error:`, {
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
      title={`Delete ${entityName}`}
    >
      <Trash2 size={16} />
    </button>
  );
};

export default DeleteComponent;