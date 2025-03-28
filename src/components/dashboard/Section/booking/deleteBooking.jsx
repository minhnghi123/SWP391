import { Trash2 } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAxios from "../../../../utils/useAxios";
const url = import.meta.env.VITE_BASE_URL_DB;

const DeleteBooking = ({ bookingId, onDeleteSuccess }) => {
  const api = useAxios();

  const handleDelete = async () => {
    try {
      const response = await api.delete(
        `${url}/Booking/soft-delete-booking/${bookingId}`
      );

      if (response.status === 200 || response.status === 204) {
        toast.success("Delete Booking Successfull");
        if (onDeleteSuccess) onDeleteSuccess(); // Call the callback if provided
      } else {
        toast.error("Delete Booking Faild");
      }
    } catch (error) {
      toast.error("Delete Faild");
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="p-1.5 text-rose-600 rounded-md hover:bg-rose-100 transition-colors"
      title="Delete"
    >
      <Trash2 size={16} />
    </button>
  );
};

export default DeleteBooking;
