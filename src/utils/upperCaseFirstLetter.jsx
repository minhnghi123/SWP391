 const ToUpperCaseWords = (text) => {
    const words = text.split(" ");
    return words
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };
  export default ToUpperCaseWords
  