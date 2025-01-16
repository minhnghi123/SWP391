 export default function CalculateAge  (dateOfBirth)  {
    const birthDate = new Date(dateOfBirth); // Chuyển đổi chuỗi ngày sinh thành đối tượng Date
    const today = new Date(); // Lấy ngày hiện tại

    // Tính chênh lệch năm
    let age = today.getFullYear() - birthDate.getFullYear();

    // Điều chỉnh nếu sinh nhật trong năm nay chưa xảy ra
    const monthDifference = today.getMonth() - birthDate.getMonth();
    const dayDifference = today.getDate() - birthDate.getDate();
    
    if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
        age--; // Nếu chưa tới sinh nhật trong năm nay, giảm tuổi đi 1
    }

    return age;
};