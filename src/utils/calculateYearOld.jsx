export default function CalculateAge(dateOfBirth) {
    const birthDate = new Date(dateOfBirth);
    const today = new Date();

    // Tính tuổi theo năm
    let age = today.getFullYear() - birthDate.getFullYear();

    // Kiểm tra xem sinh nhật đã qua chưa
    const monthDifference = today.getMonth() - birthDate.getMonth();
    const dayDifference = today.getDate() - birthDate.getDate();

    if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
        age --;
    }

    // Nếu tuổi = 0, tính số tháng
    // if (age === 0) {
    //     let months = (today.getFullYear() - birthDate.getFullYear()) * 12 + (today.getMonth() - birthDate.getMonth());

    //     // Nếu chưa đủ ngày trong tháng này, trừ đi 1 tháng
    //     if (today.getDate() < birthDate.getDate()) {
    //         months--;
    //     }

    //     return `${months} month${months > 1 ? "s" : ""}`;

    // }

    return `${age} years old`;
}
