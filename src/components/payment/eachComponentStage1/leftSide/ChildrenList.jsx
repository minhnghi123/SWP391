import ListChild from "./ListChild";
const ChildrenList = ({ listChildren, child, handleAddChildren, isOpenFirst, setIsOpenFirst }) => {
    return (
        <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h3 className="text-xl font-bold text-gray-900 flex items-center gap-3">
                        Children List
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-teal-100 text-sm font-medium text-teal-600">
                            {listChildren.length}
                        </span>
                    </h3>
                    <p className="text-sm text-gray-500 mt-2">
                        Select children for vaccination registration
                    </p>
                </div>

                <button
                    onClick={() => setIsOpenFirst(!isOpenFirst)}
                    className="px-4 py-2 bg-teal-50 text-teal-600 rounded-full text-sm font-medium hover:bg-teal-100 transition-all"
                >
                    Add New Child
                </button>
            </div>

            {/* Danh sách trẻ */}
            <div className="grid gap-4">
                {child && child.length > 0 ? (
                    child.map((child) => (
                        <ListChild
                            key={child.id}
                            child={child}
                            isSelected={listChildren}
                            handleChoose={() => handleAddChildren(child)}
                        />
                    ))
                ) : (
                    <div>Not Found</div>
                )}
            </div>

            {/* Nếu không có trẻ nào */}
            {child?.length === 0 && (
                <div className="mt-6 text-center">
                    <button
                        onClick={() => setIsOpenFirst(!isOpenFirst)}
                        className="px-6 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-xl font-medium shadow-md hover:from-teal-600 hover:to-teal-700 transition-all"
                    >
                        Add Your First Child
                    </button>
                </div>
            )}
        </div>
    );
};
export default ChildrenList;