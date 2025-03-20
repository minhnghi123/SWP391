import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";

import HeaderChildren from './HeaderChildren';
import ChildCart from './ChildCart';
import ModalCrudChild from './ModalCrudChild';
import ModalDelete from './ModalDelete';
import formatDate from '../../../../utils/Date';
import { fetchData, addData, updateData, deleteData } from '../../../../Api/axios'
import useAxios from '../../../../utils/useAxios'
const url = import.meta.env.VITE_BASE_URL_DB
export default function ListChildren({ id }) {
    const api = useAxios()
    const [listChildren, setListChildren] = useState([]);
    const [filteredChildren, setFilteredChildren] = useState([]);
    const [currentChild, setCurrentChild] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [activeFilter, setActiveFilter] = useState('all');
    const [deleteId, setDeleteId] = useState(null);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [trigger, setTrigger] = useState(false);
    const [err, setErr] = useState("");
    const defaultChild = { parentId: id, name: "", dateOfBirth: "", gender: "" };
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        if (!id) return;
        const fetchChildren = async () => {
            try {
                const res = await api.get(`${url}/Child/get-child-by-parents-id/${id}`);
                if (res.status === 200) setListChildren(res.data);
            } catch (error) {
                // setErr("Failed to fetch children data.");
                console.log(error);
            }
        };
        fetchChildren();
    }, [id, trigger]);

    useEffect(() => {
        setFilteredChildren(listChildren);
    }, [listChildren]);


    const handleOpenAddChildModal = () => {
        setCurrentChild(defaultChild);
        setIsEditing(false);
        setIsModalOpen(true);
    };


    const handleCreateChild = async (e) => {
        setIsLoading(true);
        e.preventDefault();
        if (![0, 1].includes(Number(currentChild.gender))) return setErr("Please choose a valid gender.");

        try {
            const res = await api.post(`${url}/Child/create-child`, currentChild);
            if (res.status === 200) {
                setListChildren([...listChildren, {
                    ...currentChild,
                    status: "Active"
                }]);
                setIsModalOpen(false);
                toast.success("Child added successfully!");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to create child.");
        } finally {
            setIsLoading(false);
        }
    };


    const handleOpenEditChildModal = (child) => {
        setCurrentChild({ ...child, dateOfBirth: formatDate(child.dateOfBirth) });
        setIsEditing(true);
        setIsModalOpen(true);
    };


    const handleUpdateChild = async (e) => {
        setIsLoading(true);
        e.preventDefault();
        if (![0, 1].includes(Number(currentChild.gender))) return setErr("Please choose a valid gender.");

        try {
            const res = await api.put(`${url}/Child/update-child/${currentChild.id}`, currentChild);
            if (res.status === 200) {
                setListChildren(listChildren.map(child => child.id === currentChild.id ? currentChild : child));
                setIsModalOpen(false);
                toast.success("Child updated successfully!");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update child.");
        } finally {
            setIsLoading(false);
        }
    };


    const handleOpenDeleteChildModal = (id) => {
        setDeleteId(id);
        setShowModalDelete(true);
    };


    const handleDeleteChild = async () => {
        setIsLoading(true);
        if (listChildren.find(child => child.id === deleteId && child.status.toLowerCase() === "tracking")) {
            toast.error("You cannot delete your active child.");
            setShowModalDelete(false);
            return;
        }
        try {
            const res = await api.patch(`${url}/Child/soft-delete-child/${deleteId}`);
            if (res.status === 200) {
                setListChildren(listChildren.filter(child => child.id !== deleteId));
                toast.success("Child deleted successfully!");
                setShowModalDelete(false);
                setDeleteId(null);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to delete child.");
        } finally {
            setIsLoading(false);
        }

    };


    const handleFilter = (status) => {
        setActiveFilter(status);
        if (status === 'all') {
            setFilteredChildren(listChildren);
        } else {
            setFilteredChildren(listChildren.filter(child => Number(child.gender) === (status === 'male' ? 0 : 1)));
        }
    };

    return (
        <>



            <ModalDelete
                isOpen={showModalDelete}
                onClose={() => setShowModalDelete(false)}
                onConfirm={handleDeleteChild}
                isLoading={isLoading}
            />


            <HeaderChildren
                activeFilter={activeFilter}
                handleAddChild={handleOpenAddChildModal}
                handleFilter={handleFilter}
            />


            <ChildCart
                handleAddChild={handleOpenAddChildModal}
                handleEditChild={handleOpenEditChildModal}
                sortchildren={filteredChildren}
                handleDeleteChild={handleOpenDeleteChildModal}
            />


            {isModalOpen && (
                <ModalCrudChild
                    setIsModalOpen={setIsModalOpen}
                    currentChild={currentChild}
                    isEditing={isEditing}
                    handleSaveChild={isEditing ? handleUpdateChild : handleCreateChild}
                    handleInputChange={(e) => setCurrentChild(prev => ({ ...prev, [e.target.name]: e.target.name === "gender" ? Number(e.target.value) : e.target.value }))}
                    err={err}
                    isLoading={isLoading}
                />
            )}
        </>
    );
}
