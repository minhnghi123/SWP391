import { useLayoutEffect, useState, useRef } from "react";
import Avatar from "../assets/p3.jpg"

import CalculateAge from "../utils/calculateYearOld"

export default function BodyPaymentPage({ isopennextstep }) {
    // const [api, setApi] = useState([])
    const [isOpenFirst, setIsOpenFirst] = useState(false); // 
    const [isSelected, setIsSelected] = useState([]); // add children
    const [isOpen, setIsOpen] = useState(false);

    const [children, setChildren] = useState([
        {
            id: 1,
            name: "Shu",
            datOfBrith: "2020-01-01",
            dateInject: "2020-01-01",
            gender: "Male",
            advistory: "yes"


        }
        , {
            id: 2,
            name: "Tam",
            datOfBrith: "2020-01-01",
            dateInject: "2020-01-01",
            gender: "Female",
            advistory: "no"

        }
    ]);
    const [inputDat, setData] = useState({
        id: children.length + 1,
        name: "",
        datOfBrith: "",
        dateInject: "",
        gender: "",
        advistory: ""
    })
    const handleChoose = (id) => {
        setIsSelected(prev => {
            const checkId = isSelected.includes(id);
            if (checkId) {
                return isSelected.filter(item => item !== id);
            } else {
                return [...prev, id];
            }
        })


    }


    const handleOnchange = (e) => {
        const { name, value } = e.target;
        setData(prevInput => ({ ...prevInput, [name]: value }));
    }
    const handleSubmit = (e) => {
        e.preventDefault();

        // Add new entry to children
        setChildren((prevInput) => {
            const id = prevInput.length + 1
            return [...prevInput, { ...inputDat, id }]
        })
        setData({
            id: children.length + 2, // Prepare for the next ID
            name: "",
            datOfBrith: "",
            dateInject: "",
            gender: "",
            advistory: "",
        });

        setIsOpenFirst(!isOpenFirst);
    };
    const handleNextStep = () => {
        isopennextstep(2)
    }


    return (
        <div className="min-h-screen  py-12">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-8 justify-center">
                    {/* left section */}
                    <div className="w-full lg:w-[550px] space-y-8">
                        {/* Welcome Section */}
                        <div className="bg-gradient-to-r from-teal-500 to-teal-600 rounded-3xl p-8 text-white">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h1 className="text-2xl font-bold mb-2">Welcome Back, Alex!</h1>
                                    <p className="text-teal-100">Complete your payment information below</p>
                                </div>
                                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                                        />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Patient Profile Card */}
                        <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
                            <div className="flex items-center gap-6">
                                <div className="relative">
                                    <div className="w-24 h-24 rounded-full overflow-hidden">
                                        <img
                                            src={Avatar}
                                            alt="Patient"
                                            className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-300"
                                        />
                                    </div>
                                    <div className="absolute -bottom-2 -right-2 w-7 h-7 bg-green-400 rounded-full border-4 border-white"></div>
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-2">
                                        <h2 className="text-xl font-bold text-gray-900">Alex Parker</h2>
                                        <span className="px-4 py-1.5 bg-teal-50 text-teal-600 rounded-full text-sm font-medium">
                                            Active Patient
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-4 text-sm text-gray-500">
                                        <div className="flex items-center gap-1">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                            <span>ID: PT-2024-089</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                            <span>alex@example.com</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>




                        <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 flex items-center gap-3">
                                        Children List
                                        <div className="flex items-center gap-2">
                                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-teal-100 text-sm font-medium text-teal-600">
                                                {isSelected.length}
                                            </span>
                                            <span className="text-sm font-medium text-gray-500">selected</span>
                                        </div>
                                    </h3>
                                    <p className="text-sm text-gray-500 mt-2">Select children for vaccination registration</p>
                                </div>

                                <button
                                    onClick={() => setIsOpenFirst(!isOpenFirst)}
                                    className="inline-flex items-center px-4 py-2 bg-teal-50 text-teal-600 
                                        rounded-full text-sm font-medium hover:bg-teal-100 transition-all"
                                >
                                    Add New Child
                                </button>
                            </div>

                            <div className="grid gap-4">
                                {children.map((child, index) => (
                                    <div
                                        key={index}
                                        className={`relative group ${isSelected.includes(child.id)
                                            ? 'bg-gradient-to-r from-teal-50 to-teal-100/50'
                                            : 'bg-white hover:bg-gray-50'
                                            } rounded-2xl border border-gray-200 transition-all duration-300`}
                                    >
                                        <div className="p-5 flex items-center justify-between">
                                            {/* Left Section: Child Info */}
                                            <div className="flex items-center gap-5">
                                                {/* Avatar Container */}
                                                <div className={`relative ${child.gender.toLowerCase() === 'male'
                                                    ? 'bg-blue-100'
                                                    : 'bg-pink-100'
                                                    } w-14 h-14 rounded-xl flex items-center justify-center`}
                                                >
                                                    <span className="text-2xl">
                                                        {child.gender.toLowerCase() === 'male' ? '👦' : '👧'}
                                                    </span>
                                                    {isSelected.includes(child.id) && (
                                                        <div className="absolute -top-2 -right-2 w-5 h-5 bg-teal-500 rounded-full 
                                                            flex items-center justify-center border-2 border-white">
                                                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor"
                                                                viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round"
                                                                    strokeWidth="2" d="M5 13l4 4L19 7" />
                                                            </svg>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Child Details */}
                                                <div className="space-y-1">
                                                    <h4 className="text-lg font-semibold text-gray-900">
                                                        {child.name}
                                                    </h4>
                                                    <div className="flex items-center gap-4 text-sm">
                                                        <span className="text-gray-600">
                                                            {CalculateAge(child.datOfBrith)} years old
                                                        </span>
                                                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium
                                                            ${child.gender.toLowerCase() === 'male'
                                                                ? 'bg-blue-100 text-blue-700'
                                                                : 'bg-pink-100 text-pink-700'}`}
                                                        >
                                                            {child.gender}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Right Section: Actions */}
                                            <div className="flex items-center gap-3">

                                                <button
                                                    onClick={() => handleChoose(child.id)}
                                                    className={`relative px-5 py-2 rounded-xl text-sm font-medium 
                                                        transition-all duration-300 ${isSelected.includes(child.id)
                                                            ? 'bg-teal-500 text-white hover:bg-teal-600'
                                                            : 'bg-white border border-gray-200 text-gray-700 hover:border-teal-500 hover:text-teal-500'
                                                        }`}
                                                >
                                                    {isSelected.includes(child.id) ? 'Selected' : 'Select'}
                                                </button>


                                            </div>
                                        </div>

                                        {/* Status Bar */}
                                        {/* <div className="px-5 pb-5 pt-2">
                                            <div className="flex items-center justify-between text-sm">
                                                <div className="flex items-center gap-4">
                                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full 
                                                        bg-green-100 text-green-700 font-medium text-xs">
                                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                        Vaccinations Complete: 2/4
                                                    </span>
                                                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full 
                                                        bg-yellow-100 text-yellow-700 font-medium text-xs">
                                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                        Next Due: 2 months
                                                    </span>
                                                </div>
                                            </div>
                                        </div> */}
                                    </div>
                                ))}
                            </div>

                            {/* Add Child Button (Large) */}
                            {children.length === 0 && (
                                <div className="mt-6 text-center">
                                    <button
                                        onClick={() => setIsOpenFirst(!isOpenFirst)}
                                        className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-teal-500 
                                            to-teal-600 text-white rounded-xl font-medium shadow-md hover:from-teal-600 
                                            hover:to-teal-700 transition-all duration-300"
                                    >
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                        </svg>
                                        Add Your First Child
                                    </button>
                                </div>
                            )}
                        </div>

                        {
                            isOpenFirst && (
                                <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
                                    {/* Header Section */}
                                    <div className="flex items-center justify-between mb-8">
                                        <div className="flex items-center gap-4">
                                            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-3 rounded-2xl">
                                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <h3 className="text-2xl font-bold text-gray-900">New Patient Registration</h3>
                                                <p className="text-sm text-gray-500 mt-1">Add a new child to your vaccination schedule</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span className="text-sm font-medium">Required Fields</span>
                                        </div>
                                    </div>

                                    <form className="space-y-6" onSubmit={handleSubmit}>
                                        {/* Name Input */}
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                                                Child's Full Name
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                placeholder="Enter child's name"
                                                onChange={handleOnchange}
                                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 
                                                    focus:ring-2 focus:ring-teal-200 outline-none transition-all"
                                            />
                                        </div>

                                        {/* Date Fields */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label htmlFor="datOfBrith" className="block text-sm font-medium text-gray-700 mb-2">
                                                    Date of Birth
                                                </label>
                                                <input
                                                    type="date"
                                                    id="datOfBrith"
                                                    name="datOfBrith"
                                                    onChange={handleOnchange}
                                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 
                                                        focus:ring-2 focus:ring-teal-200 outline-none transition-all"
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor="dateInject" className="block text-sm font-medium text-gray-700 mb-2">
                                                    Vaccination Date
                                                </label>
                                                <input
                                                    type="date"
                                                    id="dateInject"
                                                    name="dateInject"
                                                    onChange={handleOnchange}
                                                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 
                                                        focus:ring-2 focus:ring-teal-200 outline-none transition-all"
                                                />
                                            </div>
                                        </div>

                                        {/* Gender Selection */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-3">Gender</label>
                                            <div className="grid grid-cols-3 gap-4">
                                                {['Male', 'Female', 'Other'].map((gender) => (
                                                    <div key={gender} className="relative">
                                                        <input
                                                            type="radio"
                                                            id={gender}
                                                            name="gender"
                                                            value={gender}
                                                            onChange={handleOnchange}
                                                            className="peer hidden"
                                                        />
                                                        <label
                                                            htmlFor={gender}
                                                            className="block w-full px-4 py-3 text-center rounded-xl border border-gray-200 
                                                                cursor-pointer transition-all peer-checked:bg-teal-500 peer-checked:text-white 
                                                                peer-checked:border-teal-500 hover:border-teal-500"
                                                        >
                                                            {gender}
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Advisory Section */}
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-3">
                                                Does the child need special medical attention?
                                            </label>
                                            <div className="grid grid-cols-2 gap-4 mb-4">
                                                <button
                                                    type="button"
                                                    onClick={() => setIsOpen(true)}
                                                    className={`px-4 py-3 rounded-xl border ${isOpen
                                                        ? 'bg-teal-500 text-white border-teal-500'
                                                        : 'border-gray-200 hover:border-teal-500'} transition-all`}
                                                >
                                                    Yes
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => setIsOpen(false)}
                                                    className={`px-4 py-3 rounded-xl border ${!isOpen
                                                        ? 'bg-teal-500 text-white border-teal-500'
                                                        : 'border-gray-200 hover:border-teal-500'} transition-all`}
                                                >
                                                    No
                                                </button>
                                            </div>

                                            {isOpen && (
                                                <div className="mt-4">
                                                    <label htmlFor="advisory" className="block text-sm font-medium text-gray-700 mb-2">
                                                        Please provide medical details
                                                    </label>
                                                    <textarea
                                                        id="advisory"
                                                        name="advistory"
                                                        rows="4"
                                                        onChange={handleOnchange}
                                                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-teal-500 
                                                            focus:ring-2 focus:ring-teal-200 outline-none transition-all"
                                                        placeholder="Enter any relevant medical information..."
                                                    />
                                                </div>
                                            )}
                                        </div>

                                        {/* Submit Button */}
                                        <button
                                            type="submit"
                                            className="w-full py-4 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-xl 
                                                font-medium shadow-md hover:from-teal-600 hover:to-teal-700 transition-all duration-300"
                                        >
                                            Save Information
                                        </button>
                                    </form>
                                </div>
                            )
                        }






                    </div>
                    {/* right section */}
                    <div className="w-full lg:w-[650px] space-y-6">
                        <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100 sticky top-6">
                            {isSelected.length > 0 ? (
                                <>
                                    {/* Header */}
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="text-xl font-bold text-gray-900">Child Details</h3>
                                        <span className="px-4 py-1.5 bg-teal-50 text-teal-600 rounded-full text-sm font-medium">
                                            {isSelected.length} Selected
                                        </span>
                                    </div>

                                    {/* Detailed Child Information */}
                                    <div className="space-y-8">
                                        {children
                                            .filter(child => isSelected.includes(child.id))
                                            .map((child, index) => (
                                                <div key={index} className="bg-gray-50 rounded-2xl overflow-hidden border border-gray-200">
                                                    {/* Child Header with Photo */}
                                                    <div className="bg-gradient-to-r from-teal-500 to-teal-600 p-6 text-white">
                                                        <div className="flex items-center gap-4">
                                                            <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm 
                                                                flex items-center justify-center text-4xl">
                                                                {child.gender.toLowerCase() === 'male' ? '👦' : '👧'}
                                                            </div>
                                                            <div className="flex-1">
                                                                <h4 className="text-2xl font-bold">{child.name}</h4>
                                                                <div className="flex items-center gap-4 mt-2">
                                                                    <span className="flex items-center gap-1">
                                                                        {/* <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                                                d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
                                                                        </svg> */}
                                                                        {CalculateAge(child.datOfBrith)} years old
                                                                    </span>
                                                                    <span className="flex items-center gap-1">
                                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                                        </svg>
                                                                        {child.gender}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <button
                                                                onClick={() => handleChoose(child.id)}
                                                                className="p-2 hover:bg-white/10 rounded-xl transition-all"
                                                            >
                                                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                                        d="M6 18L18 6M6 6l12 12" />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </div>

                                                    {/* Medical Information */}
                                                    <div className="p-6 space-y-6">
                                                        {/* Vaccination History */}
                                                        <div>
                                                            <h5 className="font-semibold text-gray-900 mb-4">Vaccination History</h5>
                                                            <div className="space-y-3">
                                                                {[
                                                                    {
                                                                        name: 'DTaP (Diphtheria, Tetanus, Pertussis)',
                                                                        date: '2023-12-15',
                                                                        status: 'Completed',
                                                                        nextDue: '2024-06-15'
                                                                    },
                                                                    {
                                                                        name: 'MMR (Measles, Mumps, Rubella)',
                                                                        date: '2024-01-20',
                                                                        status: 'Scheduled',
                                                                        nextDue: null
                                                                    },
                                                                    {
                                                                        name: 'Hepatitis B',
                                                                        date: null,
                                                                        status: 'Pending',
                                                                        nextDue: '2024-03-01'
                                                                    }
                                                                ].map((vaccine, idx) => (
                                                                    <div key={idx} className="bg-white rounded-xl p-4 border border-gray-200">
                                                                        <div className="flex items-center justify-between mb-2">
                                                                            <span className="font-medium text-gray-900">{vaccine.name}</span>
                                                                            <span className={`px-3 py-1 rounded-full text-xs font-medium
                                                                                ${vaccine.status === 'Completed'
                                                                                    ? 'bg-green-100 text-green-700'
                                                                                    : vaccine.status === 'Scheduled'
                                                                                        ? 'bg-blue-100 text-blue-700'
                                                                                        : 'bg-yellow-100 text-yellow-700'
                                                                                }`}>
                                                                                {vaccine.status}
                                                                            </span>
                                                                        </div>
                                                                        <div className="flex items-center gap-4 text-sm text-gray-500">
                                                                            {vaccine.date && (
                                                                                <span className="flex items-center gap-1">
                                                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                                                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                                                    </svg>
                                                                                    Last: {vaccine.date}
                                                                                </span>
                                                                            )}
                                                                            {vaccine.nextDue && (
                                                                                <span className="flex items-center gap-1">
                                                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                                                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                                                    </svg>
                                                                                    Next due: {vaccine.nextDue}
                                                                                </span>
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </div>

                                                        {/* Health Information */}
                                                        <div>
                                                            <h5 className="font-semibold text-gray-900 mb-4">Information Details</h5>
                                                            <div className="bg-white rounded-xl p-4 border border-gray-200">
                                                                <div className="grid grid-cols-2 gap-6">
                                                                    <div className="space-y-1">
                                                                        <span className="text-sm text-gray-500">Full Name</span>
                                                                        <p className="font-medium text-gray-900">{child.name}</p>
                                                                    </div>

                                                                    <div className="space-y-1">
                                                                        <span className="text-sm text-gray-500">Date of Birth</span>
                                                                        <p className="font-medium text-gray-900">
                                                                            {new Date(child.datOfBrith).toLocaleDateString('en-US', {
                                                                                year: 'numeric',
                                                                                month: 'long',
                                                                                day: 'numeric'
                                                                            })}
                                                                        </p>
                                                                    </div>

                                                                    <div className="space-y-1">
                                                                        <span className="text-sm text-gray-500">Gender</span>
                                                                        <p className="font-medium text-gray-900 flex items-center gap-2">
                                                                            {child.gender}
                                                                            <span className={`inline-block w-2 h-2 rounded-full ${child.gender.toLowerCase() === 'male'
                                                                                ? 'bg-blue-400'
                                                                                : 'bg-pink-400'
                                                                                }`} />
                                                                        </p>
                                                                    </div>

                                                                    <div className="space-y-1">
                                                                        <span className="text-sm text-gray-500">Special Medical Attention</span>
                                                                        <p className={`font-medium ${child.advistory
                                                                            ? 'text-amber-600'
                                                                            : 'text-green-600'
                                                                            }`}>
                                                                            {child.advistory ? 'Required' : 'Not Required'}
                                                                        </p>
                                                                    </div>
                                                                </div>

                                                                {child.advistory && (
                                                                    <div className="mt-4 pt-4 border-t border-gray-100">
                                                                        <span className="text-sm text-gray-500">Medical Notes</span>
                                                                        <p className="mt-1 text-gray-700">{child.advistory}</p>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        </div>

                                                        {/* Upcoming Appointments */}
                                                        <div>
                                                            <h5 className="font-semibold text-gray-900 mb-4">Upcoming Appointments</h5>
                                                            <div className="bg-white rounded-xl p-4 border border-gray-200">
                                                                <div className="flex items-center gap-4">
                                                                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                                                                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                                        </svg>
                                                                    </div>
                                                                    <div>
                                                                        <h6 className="font-medium text-gray-900">Next Vaccination</h6>
                                                                        <p className="text-sm text-gray-500">March 15, 2024 at 10:00 AM</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Cost Summary */}
                                                    {/* <div className="border-t border-gray-200 p-6 bg-gray-50">
                                                        <div className="space-y-3">
                                                            <div className="flex justify-between text-sm">
                                                                <span className="text-gray-600">Basic Vaccination Package</span>
                                                                <span className="font-medium text-gray-900">{formatCurrency(100000)} VND</span>
                                                            </div>
                                                            {inputData.advisory === 'yes' && (
                                                                <div className="flex justify-between text-sm">
                                                                    <span className="text-gray-600">Consultation Fee</span>
                                                                    <span className="font-medium text-gray-900">{formatCurrency(50000)} VND</span>
                                                                </div>
                                                            )}
                                                            <div className="pt-3 border-t border-gray-200 flex justify-between">
                                                                <span className="font-medium text-gray-900">Subtotal</span>
                                                                <span className="font-semibold text-teal-600">
                                                                    {formatCurrency(100000 + (inputData.advisory === 'yes' ? 50000 : 0))} VND
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div> */}
                                                </div>
                                            ))}
                                    </div>

                                    {/* Total Summary */}
                                    <div className="mt-8 pt-6 border-t border-gray-200">
                                        {/* <div className="space-y-4">
                                            <div className="flex justify-between text-gray-600">
                                                <span>Total for {isSelected.length} children</span>
                                                <span>{formatCurrency(isSelected.length * (100000 + (inputData.advisory === 'yes' ? 50000 : 0)))} VND</span>
                                            </div>
                                            <div className="flex justify-between text-gray-600">
                                                <span>Tax (10%)</span>
                                                <span>{formatCurrency(isSelected.length * (100000 + (inputData.advisory === 'yes' ? 50000 : 0)) * 0.1)} VND</span>
                                            </div>
                                            <div className="flex justify-between text-xl font-bold pt-4 border-t border-gray-200">
                                                <span>Final Total</span>
                                                <span className="text-teal-600">
                                                    {formatCurrency(isSelected.length * (100000 + (inputData.advisory === 'yes' ? 50000 : 0)) * 1.1)} VND
                                                </span>
                                            </div>
                                        </div> */}

                                        {/* Checkout Button */}

                                        <button onClick={handleNextStep} className="w-full mt-6 py-4 bg-gradient-to-r from-teal-500 to-teal-600 
                                            text-white rounded-xl font-medium shadow-lg hover:from-teal-600 hover:to-teal-700 
                                            transition-all duration-300">
                                            Proceed to Payment
                                        </button>


                                    </div>
                                </>
                            ) : (
                                // Empty State
                                <div className="text-center py-12">
                                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                d="M12 9v3m0 0v3m0-3h3m-3 0H6" />
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No Children Selected</h3>
                                    <p className="text-gray-500">Please select children from the list to view their details</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}
