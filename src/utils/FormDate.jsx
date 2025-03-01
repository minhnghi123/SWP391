const formatDate = (isoString) => {
    if (!isoString) return ""; // Tránh lỗi khi isoString là null hoặc undefined
    return isoString.split("T")[0]; 
};

export default formatDate;
