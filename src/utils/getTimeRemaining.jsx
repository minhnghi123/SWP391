export  const getTimeRemaining = (dueDate) => {
    if (!dueDate) return "Invalid date";
  
    const due = new Date(dueDate);
    const today = new Date();
    
    // Đặt thời gian về 0h để tránh lệch ngày do chênh lệch giờ
    today.setHours(0, 0, 0, 0);
    due.setHours(0, 0, 0, 0);
  
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
    if (diffDays < 0) return `${Math.abs(diffDays)} days overdue`;
    if (diffDays === 0) return "Due today";
    if (diffDays === 1) return "Due tomorrow";
    
    return `Due in ${diffDays} days`;
  };
  export default getTimeRemaining;