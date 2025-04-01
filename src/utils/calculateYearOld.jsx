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
    return `${age} years old`;
}
