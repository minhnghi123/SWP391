import React, { useState, useEffect } from "react";
import useAxios from "../../../../utils/useAxios";
import UserChildren from "./ChildrenTable";

const ExpandedUser = ({ userId, onClose, onAddChildrenSuccess }) => {
  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const api = useAxios();
  const url = import.meta.env.VITE_BASE_URL_DB;

  useEffect(() => {
    const fetchChildren = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await api.get(`${url}/User/get-user-child/${userId}`);
        let childrenData = [];
        if (Array.isArray(response.data)) {
          childrenData = response.data;
        } else if (response.data && typeof response.data === "object") {
          childrenData = response.data.children || [response.data];
        } else {
          childrenData = [];
        }
        setChildren(childrenData);
      } catch (error) {
        setChildren([]);
      } finally {
        setLoading(false);
      }
    };

    fetchChildren();
  }, [userId]);

  return (
    <div className="px-4 py-4 bg-gray-50">
      {loading ? (
        <p className="text-gray-500">Loading children...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <UserChildren
          userId={userId}
          children={children}
          onAddChildrenSuccess={onAddChildrenSuccess}
        />
      )}
    </div>
  );
};

export default ExpandedUser;