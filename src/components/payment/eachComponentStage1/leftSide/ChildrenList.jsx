import ListChild from "./ListChild";

const ChildrenList = ({ loading, listChildren, child, handleAddChildren, isOpenFirst, setIsOpenFirst, isVaccineSuitableForAnyChild, isComboSuitableForAnyChild }) => {
    if (loading) {
        return <div className="text-center py-6 text-gray-500">Loading...</div>;
    }

    return (
        <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                        Children List
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#E8F5F6] text-sm font-medium text-[#00a0aa]">
                            {child?.length}
                        </span>
                    </h3>
                    <p className="text-sm text-gray-500 mt-2">
                        Select children for vaccination registration
                    </p>
                </div>

                <button
                    onClick={() => setIsOpenFirst(!isOpenFirst)}
                    className="px-4 py-2 bg-[#E8F5F6] text-[#00a0aa] rounded-full text-sm font-medium hover:bg-[#d0ebec] transition-all"
                >
                    Add New Child
                </button>
            </div>

            {/* Children list */}
            <div className="grid gap-4">
                {child && child.length > 0 ? (
                    child.map((child) => (
                        <ListChild
                            key={child.id}
                            child={child}
                            isSelected={listChildren}
                            handleChoose={() => handleAddChildren(child)}
                            isVaccineSuitableForAnyChild={isVaccineSuitableForAnyChild}
                            isComboSuitableForAnyChild={isComboSuitableForAnyChild}
                        />
                    ))
                ) : (
                    <div className="mt-6 flex flex-col items-center justify-center text-center">
                        {/* Optional Illustration/Icon */}
                        <svg
                            className="w-24 h-24 text-gray-300 mb-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                            />
                        </svg>

                        {/* Message */}
                        <h4 className="text-lg font-semibold text-gray-700 mb-2">
                            No Children Added Yet
                        </h4>
                        <p className="text-sm text-gray-500 mb-6 max-w-md">
                            Get started by adding your first child to manage their vaccination schedule easily and efficiently.
                        </p>

                        {/* Enhanced Button */}
                        {/* <button
                            onClick={() => setIsOpenFirst(!isOpenFirst)}
                            className="px-8 py-3 bg-gradient-to-r from-[#00a0aa] to-[#3AC5C9] text-white rounded-xl font-medium shadow-lg hover:shadow-xl hover:opacity-95 transition-all transform hover:scale-105"
                        >
                            Add Your First Child
                        </button> */}
                    </div>
                )}
            </div>



        </div>
    );
};

export default ChildrenList;