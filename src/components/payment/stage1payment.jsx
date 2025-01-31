import { useLayoutEffect, useState, useRef, useContext } from "react";
import Avatar from "../../assets/p3.jpg"
import { NumberOfPeopleContext } from "../Context/NumberOfPeopleVacines";

import ProfileUser from "./eachComponentStage1/leftSide/profileUser";
import FormAddChildren from "./eachComponentStage1/leftSide/formAddChildren";
import ChildCard from './eachComponentStage1/rightSide/ChildCard';
import ListChild from "./eachComponentStage1/leftSide/ListChild";
export default function BodyPaymentPage({ isopennextstep }) {
    // const [api, setApi] = useState([])
    const [isOpenFirst, setIsOpenFirst] = useState(false);

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
            advistory: ''

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

    const {
        isSelected,
        handleChoose
    } = useContext(NumberOfPeopleContext);



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
                        <ProfileUser
                            id={'PT-2024-089'}
                            name={'Alex Parker'}
                            email={'alex@example.com'}
                            status={'Active Patient'}
                            img={Avatar}
                        />




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

                            {/* List Children */}
                            <div className="grid gap-4">
                                {children.map((child, index) => (
                                  <ListChild key={index} child={child} isSelected={isSelected} handleChoose={()=>handleChoose(child)}/>
                                ))}
                            </div>

                            {/* Add Child Button*/}
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
                                <FormAddChildren
                                    handleOnchange={handleOnchange}
                                    handleSubmit={handleSubmit}
                                />
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
                                        {isSelected.map((child, index) => (
                                           <ChildCard key={child.id} child={child} handleChoose={handleChoose} />
                                        ))}
                                    </div>
                                    {/* Checkout Button */}
                                    <button onClick={handleNextStep} className="w-full mt-6 py-4 bg-gradient-to-r from-teal-500 to-teal-600 
                                            text-white rounded-xl font-medium shadow-lg hover:from-teal-600 hover:to-teal-700 
                                            transition-all duration-300">
                                        Proceed to Payment
                                    </button>



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
