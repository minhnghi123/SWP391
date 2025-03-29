import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';

const FormAdvitory_detail = ({ advitory, resetForm, setInputAdvisory, handleInputAdvisory, checkSent, inputAdvisory }) => {
    // Kiểm tra nếu advitory là null hoặc một object rỗng
    const hasAdvitory = advitory && Object.keys(advitory).length > 0;

    return (
        <>
            {hasAdvitory || checkSent ? (
                <div className="flex items-center justify-between mt-6 bg-green-50 p-4 rounded-xl shadow-sm border border-green-200">
                    <div className="flex items-center space-x-3">
                        <CheckOutlinedIcon sx={{ color: 'green', fontSize: 24 }} />
                        <span className="text-green-800 font-medium text-sm sm:text-base">
                            Thank you for your support! Your request has been received.
                        </span>
                    </div>
                    <button
                        className="text-teal-600 font-medium hover:underline focus:outline-none"
                        onClick={resetForm}
                    >
                        Submit another request
                    </button>
                </div>
            ) : (
                <>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                        If you need advice, please fill in the form
                    </label>
                    <form onSubmit={handleInputAdvisory} className="flex flex-row items-center gap-2 mt-4">
                        <input
                            type="text"
                            value={inputAdvisory || ""}
                            onChange={(e) => setInputAdvisory(e.target.value)}
                            id="advisory"
                            name="advisory"
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 
focus:ring-2 focus:ring-teal-200 outline-none transition-all"
                            placeholder="Bạn cần hỗ trợ gì?"
                        />
                        <button
                            type="submit"
                            className="bg-teal-500 text-white px-4 py-3 rounded-xl hover:bg-teal-600 transition-all"
                        >
                            Send
                        </button>
                    </form>
                </>
            )}
        </>
    );
}

export default FormAdvitory_detail;
