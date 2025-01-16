export default function formatDecimal(number) {
    return number.toLocaleString('en-US', {
        minimumFractionDigits: 0, 
        maximumFractionDigits: 0 
    });
}

