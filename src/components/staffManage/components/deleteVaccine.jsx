import { Trash2 } from "lucide-react";
import axios from "axios";

const DeleteVaccineButton = ({ vaccineId, onDeleteSuccess }) => {
  const handleDeleteVaccine = async () => {
    try {
      const response = await axios.delete(`https://localhost:7280/api/Vaccine/delete-vaccine-by-id/${encodeURIComponent(vaccineId)}`);

      if (response.status === 200 || response.status === 204) {
        alert("✅ Vaccine deleted successfully!");
        window.location.reload(); // Reload trang sau khi thêm thành công
        if (onDeleteSuccess) onDeleteSuccess(vaccineId);
      } else {
        alert("❌ Failed to delete vaccine.");
      }
    } catch (error) {
      console.error("❌ Error deleting vaccine:", error);
      alert("❌ Error deleting vaccine.");
    }
  };

  return (
    <button
      onClick={() => handleDeleteVaccine()} // ✅ Truyền đúng vaccineId
      className="p-1.5 bg-rose-50 text-rose-600 rounded-md hover:bg-rose-100 transition-colors"
      title="Delete"
    >
      <Trash2 size={16} />
    </button>
  );
};

export default DeleteVaccineButton;
