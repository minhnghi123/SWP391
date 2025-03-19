import { toast } from "react-toastify";
import useAxios from "../../../../utils/useAxios";
import { ArchiveRestore } from 'lucide-react';

const url = import.meta.env.VITE_BASE_URL_DB;


const restoreCombo = ({comboId, onRestoreSuccess}) => {
    const api = useAxios();
    const handleRestore = async () => {
        try {
            const response = await api.patch(`${url}/VaccineCombo/reatore-combo/${encodeURIComponent(comboId)}`);
            if (response.status === 200 || response.status === 204) {
                toast.success("Combo restored successfully!", { autoClose: 3000 });
                onRestoreSuccess(comboId);
            } else {
                throw new Error("Unexpected response status");
            }
        } catch (error) {
            console.error("Failed to restore combo:", error);
            toast.error("Failed to restore combo. Please try again.", { autoClose: 3000 });
        }
    }
  return(
    <div>
      <button
        onClick={handleRestore}
        className="p-1.5 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition-colors"
        title="Restore"
      >
        <ArchiveRestore size={16} />
      </button>
    </div>
  )
};

export default restoreCombo;