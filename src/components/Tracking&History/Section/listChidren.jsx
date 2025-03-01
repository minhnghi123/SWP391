import React, { useEffect, useState } from 'react';
import { Avatar, Dialog, DialogContent, DialogTitle, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import SortIcon from '@mui/icons-material/Sort';
import VisibilityIcon from '@mui/icons-material/Visibility';

const ListChildren = () => {
    const [children, setChildren] = useState([
        {
            id: 1,
            name: "Emma Thompson",
            dateOfBirth: "2017-05-15",
            gender: "Female",
            bloodType: "A+",
            allergies: "Peanuts",
            parentName: "John Thompson",
            parentPhone: "123-456-7890",
            status: "Active",
            lastCheckup: "2024-02-15"
        },
        {
            id: 2,
            name: "Emma Thompson",
            dateOfBirth: "2017-05-15",
            gender: "Female",
            bloodType: "A+",
            allergies: "Peanuts",
            parentName: "John Thompson",
            parentPhone: "123-456-7890"
        },
        {
            id: 3,
            name: "Emma Thompson",
            dateOfBirth: "2017-05-15",
            gender: "Female",
            bloodType: "A+",
            allergies: "Peanuts",
            parentName: "John Thompson",
            parentPhone: "123-456-7890"
        },
        {
            id: 4,
            name: "Emma Thompson",
            dateOfBirth: "2017-05-15",
            gender: "Female",
            bloodType: "A+",
            allergies: "Peanuts",
            parentName: "John Thompson",
            parentPhone: "123-456-7890"
        },
        // Add more mock data here
    ]);
    // useEffect(()=>{

    // },[])

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedChild, setSelectedChild] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        dateOfBirth: '',
        gender: '',
        bloodType: '',
        allergies: '',
        parentName: '',
        parentPhone: ''
    });

    // Calculate age from date of birth
    const calculateAge = (dateOfBirth) => {
        const today = new Date();
        const birthDate = new Date(dateOfBirth);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    // CRUD Operations
    const handleAdd = () => {
        setSelectedChild(null);
        setFormData({
            name: '',
            dateOfBirth: '',
            gender: '',
            bloodType: '',
            allergies: '',
            parentName: '',
            parentPhone: ''
        });
        setIsDialogOpen(true);
    };

    const handleEdit = (child) => {
        setSelectedChild(child);
        setFormData(child);
        setIsDialogOpen(true);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this child?')) {
            setChildren(children.filter(child => child.id !== id));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedChild) {
            // Edit existing child
            setChildren(children.map(child => 
                child.id === selectedChild.id ? { ...formData, id: child.id } : child
            ));
        } else {
            // Add new child
            setChildren([...children, { ...formData, id: Date.now() }]);
        }
        setIsDialogOpen(false);
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Header Section */}
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Children Management</h1>
                            <p className="mt-1 text-sm text-gray-500">
                                Manage and monitor children's information
                            </p>
                        </div>
                        <button
                            onClick={() => {
                                setSelectedChild(null);
                                setIsDialogOpen(true);
                            }}
                            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white 
                                     rounded-lg hover:bg-blue-700 transition duration-200 shadow-sm"
                        >
                            <AddIcon className="w-5 h-5 mr-2" />
                            Add New Child
                        </button>
                    </div>

                    {/* Search and Filters */}
                    <div className="mt-6 flex flex-col sm:flex-row gap-4">
                        <div className="relative flex-grow">
                            <input
                                type="text"
                                placeholder="Search children..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 
                                         focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        </div>
                        <div className="flex gap-2">
                            <Tooltip title="Filter list">
                                <button className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50">
                                    <FilterListIcon className="text-gray-600" />
                                </button>
                            </Tooltip>
                            <Tooltip title="Sort list">
                                <button className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50">
                                    <SortIcon className="text-gray-600" />
                                </button>
                            </Tooltip>
                        </div>
                    </div>
                </div>
            </div>

            {/* Children List */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {children.map((child) => (
                        <div key={child.id} 
                             className="bg-white rounded-xl shadow-sm border border-gray-200 hover:border-blue-300 
                                      transition-all duration-200 overflow-hidden">
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center space-x-4">
                                        <Avatar 
                                            className="w-12 h-12 bg-blue-500 text-xl font-semibold"
                                            alt={child.name}
                                        >
                                            {child.name[0]}
                                        </Avatar>
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900">{child.name}</h3>
                                            <p className="text-sm text-gray-500">
                                                {calculateAge(child.dateOfBirth)} years old
                                            </p>
                                        </div>
                                    </div>
                                    <span className="px-3 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full">
                                        {child.status}
                                    </span>
                                </div>

                                <div className="space-y-3">
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <p className="text-gray-500">Blood Type</p>
                                            <p className="font-medium text-gray-900">{child.bloodType}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-500">Gender</p>
                                            <p className="font-medium text-gray-900">{child.gender}</p>
                                        </div>
                                        <div className="col-span-2">
                                            <p className="text-gray-500">Allergies</p>
                                            <p className="font-medium text-gray-900">{child.allergies || 'None'}</p>
                                        </div>
                                        <div className="col-span-2">
                                            <p className="text-gray-500">Parent Contact</p>
                                            <p className="font-medium text-gray-900">
                                                {child.parentName} • {child.parentPhone}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-6 flex justify-between items-center pt-4 border-t border-gray-100">
                                    <p className="text-sm text-gray-500">
                                        Last checkup: {new Date(child.lastCheckup).toLocaleDateString()}
                                    </p>
                                    <div className="flex space-x-2">
                                        <Tooltip title="View Details">
                                            <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                                                <VisibilityIcon />
                                            </button>
                                        </Tooltip>
                                        <Tooltip title="Edit">
                                            <button 
                                                onClick={() => handleEdit(child)}
                                                className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg"
                                            >
                                                <EditIcon />
                                            </button>
                                        </Tooltip>
                                        <Tooltip title="Delete">
                                            <button 
                                                onClick={() => handleDelete(child.id)}
                                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                                            >
                                                <DeleteIcon />
                                            </button>
                                        </Tooltip>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {children.length === 0 && (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">👶</div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No Children Found</h3>
                        <p className="text-gray-500">Start by adding a child to your list.</p>
                    </div>
                )}
            </div>

            {/* Add/Edit Dialog */}
            <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} maxWidth="sm" fullWidth>
                <DialogTitle className="flex justify-between items-center">
                    {selectedChild ? 'Edit Child Information' : 'Add New Child'}
                    <button
                        onClick={() => setIsDialogOpen(false)}
                        className="p-1 hover:bg-gray-100 rounded-full"
                    >
                        <CloseIcon />
                    </button>
                </DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Child's Name
                                </label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Date of Birth
                                </label>
                                <input
                                    type="date"
                                    value={formData.dateOfBirth}
                                    onChange={(e) => setFormData({...formData, dateOfBirth: e.target.value})}
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Gender
                                </label>
                                <select
                                    value={formData.gender}
                                    onChange={(e) => setFormData({...formData, gender: e.target.value})}
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    required
                                >
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Blood Type
                                </label>
                                <select
                                    value={formData.bloodType}
                                    onChange={(e) => setFormData({...formData, bloodType: e.target.value})}
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    required
                                >
                                    <option value="">Select Blood Type</option>
                                    {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(type => (
                                        <option key={type} value={type}>{type}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Allergies
                                </label>
                                <input
                                    type="text"
                                    value={formData.allergies}
                                    onChange={(e) => setFormData({...formData, allergies: e.target.value})}
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter allergies (if any)"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Parent Name
                                </label>
                                <input
                                    type="text"
                                    value={formData.parentName}
                                    onChange={(e) => setFormData({...formData, parentName: e.target.value})}
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Parent Phone
                                </label>
                                <input
                                    type="tel"
                                    value={formData.parentPhone}
                                    onChange={(e) => setFormData({...formData, parentPhone: e.target.value})}
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>
                        </div>
                        <div className="flex justify-end space-x-3 pt-4">
                            <button
                                type="button"
                                onClick={() => setIsDialogOpen(false)}
                                className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
                            >
                                {selectedChild ? 'Update' : 'Add'}
                            </button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default ListChildren;