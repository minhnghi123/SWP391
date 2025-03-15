const NoSelectChildren = () => {
    return (
        <div className="text-center py-12 bg-white rounded-3xl ">
            <div className="w-16 h-16 bg-[#E8F5F6] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-[#00a0aa]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                        d="M12 9v3m0 0v3m0-3h3m-3 0H6" />
                </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Children Selected</h3>
            <p className="text-gray-500">Please select children from the list to view their details</p>
        </div>
    )
}
export default NoSelectChildren;