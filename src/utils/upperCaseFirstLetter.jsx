const ToUpperCaseWords = (text) => {
  // Kiểm tra nếu text là chuỗi rỗng hoặc không phải chuỗi
  if (typeof text !== 'string' || !text.trim()) return '';

  const words = text.split(" ");
  return words
    .map(word => {
      if (word.length > 1) {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      } else {
        return word.toUpperCase(); // Trường hợp các từ đơn
      }
    })
    .join(" ");
};

export default ToUpperCaseWords;
