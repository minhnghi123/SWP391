export default function formatDecimal(number) {
    if (number === undefined || number === null) {
        return '0';
    }
    return number.toLocaleString('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    });
}
