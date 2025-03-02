import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";

import HeaderChildren from './HeaderChildren';
import ChildCart from './ChildCart';
import ModalCrudChild from './ModalCrudChild';
import ModalDelete from './ModalDelete';
import formatDate from '../../../../utils/Date';
import { fetchData, addData, updateData, deleteData } from '../../../../Api/axios'
export default function ListChildren({ id }) {
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
    useEffect(() => {
        if (!id) return;
        const fetchChildren = async () => {
            try {
                const res = await fetchData(`Child/get-child-by-parents-id/${id}`);
                if (res.status === 200) setListChildren(res.data);
            } catch (error) {
                setErr("Failed to fetch children data.");
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
        e.preventDefault();
        if (![0, 1].includes(Number(currentChild.gender))) return setErr("Please choose a valid gender.");

        try {
            const res = await addData("Child/create-child", currentChild);
            if (res.status === 200) {
                setTrigger(prev => !prev);
                setIsModalOpen(false);
                toast.success("Child added successfully!");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to create child.");
        }
    };


    const handleOpenEditChildModal = (child) => {
        setCurrentChild({ ...child, dateOfBirth: formatDate(child.dateOfBirth) });
        setIsEditing(true);
        setIsModalOpen(true);
    };


    const handleUpdateChild = async (e) => {
        e.preventDefault();
        if (![0, 1].includes(Number(currentChild.gender))) return setErr("Please choose a valid gender.");

        try {
            const res = await updateData(`Child/update-child`, currentChild.id, currentChild);
            if (res.status === 200) {
                setTrigger(prev => !prev);
                setIsModalOpen(false);
                toast.success("Child updated successfully!");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update child.");
        }
    };


    const handleOpenDeleteChildModal = (id) => {
        setDeleteId(id);
        setShowModalDelete(true);
    };


    const handleDeleteChild = async () => {
        try {
            const res = await deleteData(`Child/delete-child`,deleteId);
            if (res.status === 200) {
                setTrigger(prev => !prev);
                toast.success("Child deleted successfully!");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to delete child.");
        }
        setShowModalDelete(false);
        setDeleteId(null);
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
            <ToastContainer />


            <ModalDelete
                isOpen={showModalDelete}
                onClose={() => setShowModalDelete(false)}
                onConfirm={handleDeleteChild}
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
                />
            )}
        </>
    );
}
