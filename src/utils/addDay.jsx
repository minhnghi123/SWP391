// Hàm tiện ích: Cộng thêm số ngày vào một đối tượng Date
export default function addDays(date, days) {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}
