import { Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAxios from "../../utils/useAxios";

const url = import.meta.env.VITE_BASE_URL_DB;

const DeleteAdmin = ({ id, isUser = false, onDeleteSuccess }) => {
  const api = useAxios();

  const handleDelete = async () => {
    try {
      // Xác định endpoint dựa trên loại entity (User hoặc Child)
      const endpoint = isUser
        ? `${url}/User/soft-delete-user/${encodeURIComponent(id)}`
        : `${url}/Child/soft-delete-child/${encodeURIComponent(id)}`;

      // Gửi yêu cầu PATCH để soft delete
      const response = await api.patch(endpoint);

      // Kiểm tra phản hồi thành công
      if (response.status === 200 || response.status === 204) {
        const successMessage = isUser
          ? "User deleted successfully!"
          : "Child deleted successfully!";
        toast.success(successMessage, { autoClose: 3000 });

        // Gọi callback nếu được cung cấp
        if (typeof onDeleteSuccess === "function") {
          onDeleteSuccess(id); // Truyền id để component cha xử lý
        }
      } else {
        throw new Error("Unexpected response status");
      }
    } catch (error) {
      const errorMessage = isUser
        ? "Failed to delete user"
        : "Failed to delete child";
      console.error(`${errorMessage}:`, error);
      toast.error(`${errorMessage}. Please try again.`, { autoClose: 3000 });
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