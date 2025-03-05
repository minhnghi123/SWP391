export default function formatDateTime(dateTimeString, hoursToAdd = 0) {
    if (!dateTimeString) return ""; // Trả về rỗng nếu không có dữ liệu

    const date = new Date(dateTimeString); // Chuyển đổi thành đối tượng Date
    if (isNaN(date.getTime())) return ""; // Kiểm tra nếu là "Invalid Date"

    date.setHours(date.getHours() + hoursToAdd); // Cộng thêm số giờ nếu có

    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}`;
}
