import React, { useState, useEffect } from "react";
import AddChildren from "../children/addChild";
import Delete from "../../delete";
import UpdateChild from "../children/updateChildren";

const UserChildren = ({ userId, children: initialChildren, onAddChildrenSuccess }) => {
  const [children, setChildren] = useState(initialChildren); // Local state to manage children

  useEffect(() => {
    setChildren(initialChildren); // Sync with prop changes
  }, [initialChildren]);

  const handleUpdateSuccess = (updatedChild) => {
    // Update the local children array with the new data
    setChildren((prevChildren) =>
      prevChildren.map((child) =>
        child.id === updatedChild.id ? updatedChild : child
      )
    );
    if (typeof onAddChildrenSuccess === "function") {
      onAddChildrenSuccess(); // Notify parent to re-fetch or update if needed
    }
  };

  return (
    <div className="ml-12">
      <div className="flex gap-4 mb-4">
        <AddChildren parentId={userId} onAddSuccess={onAddChildrenSuccess} />
      </div>
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left text-sm font-semibold text-gray-600">
              ID
            </th>
            <th className="p-2 text-left text-sm font-semibold text-gray-600">
              Name
            </th>
            <th className="p-2 text-left text-sm font-semibold text-gray-600">
              DOB
            </th>
            <th className="p-2 text-left text-sm font-semibold text-gray-600">
              Gender
            </th>
            <th className="p-2 text-left text-sm font-semibold text-gray-600">
              Status
            </th>
            <th className="p-2 text-left text-sm font-semibold text-gray-600">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {children && children.length > 0 ? (
            children.map((child) => (
              <tr key={child.id} className="border-b hover:bg-gray-50">
                <td className="p-2 text-sm text-gray-600">{child.id}</td>
                <td className="p-2 text-sm text-gray-600">{child.name}</td>
                <td className="p-2 text-sm text-gray-600">
                  {child.dateOfBirth
                    ? new Date(child.dateOfBirth).toLocaleDateString()
                    : "N/A"}
                </td>
                <td className="p-2 text-sm text-gray-600">
                  {child.gender === 0
                    ? "Male"
                    : child.gender === 1
                    ? "Female"
                    : "Other"}
                </td>
                <td className="p-1">
                  <span
                    className={`inline-block px-2 py-1 text-sm font-medium rounded-full ${
                      (child.status || "active").toLowerCase() === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {child.status || "UNKNOWN"}
                  </span>
                </td>
                <td className="p-2 text-sm text-gray-600">
                  <UpdateChild
                    child={child}
                    userId={userId}
                    onUpdateSuccess={handleUpdateSuccess}
                  />
                  <Delete
                    id={child.id}
                    isUser={false}
                    onDeleteSuccess={onAddChildrenSuccess}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="p-2 text-center text-gray-500">
                This user has no children.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserChildren;