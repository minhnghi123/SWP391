import ListChild from "./ListChild";
const ChildrenList = ({ listChildren, child, handleAddChildren, isOpenFirst, setIsOpenFirst, isVaccineSuitableForAnyChild, isComboSuitableForAnyChild }) => {
    return (
        <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                        Children List
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#E8F5F6] text-sm font-medium text-[#00a0aa]">
                            {/* {child.length} */}
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
                    <div className="text-center py-6 text-gray-500">Not Found</div>
                )}
            </div>

            {/* If no children */}
            {child?.length === 0 && (
                <div className="mt-6 text-center">
                    <button
                        onClick={() => setIsOpenFirst(!isOpenFirst)}
                        className="px-6 py-3 bg-gradient-to-r from-[#00a0aa] to-[#3AC5C9] text-white rounded-xl font-medium shadow-md hover:opacity-90 transition-all"
                    >
                        Add Your First Child
                    </button>
                </div>
            )}
        </div>
    );
};
export default ChildrenList;