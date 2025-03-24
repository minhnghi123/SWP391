"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  User,
  Phone,
  Clock,
  CreditCard,
  Check,
  X,
  AlertCircle,
  Shield,
  Package,
  Syringe,
  Percent,
  CalendarClock,
  Wallet,
  FileText,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import formatCurrency from '../../../utils/calculateMoney'
import formatDate from "../../../utils/Date";
// Helper function to format currency
// const formatCurrency = (amount) => {
//   return new Intl.NumberFormat("vi-VN").format(amount);
// };

// // Helper function to format date
// const formatDate = (dateString) => {
//   if (!dateString) return "N/A";
//   return format(new Date(dateString), "MMM dd, yyyy • HH:mm");
// };

// Helper function to get gender text
const getGenderText = (gender) => {
  if (gender === 1) return "Male";
  if (gender === 2) return "Female";
  return "Other";
};

// Helper function to get status badge
const getStatusBadge = (status) => {
  const statusMap = {
    PENDING: { bg: "bg-amber-100", text: "text-amber-800", label: "Pending" },
    COMPLETED: { bg: "bg-emerald-100", text: "text-emerald-800", label: "Completed" },
    CANCELLED: { bg: "bg-rose-100", text: "text-rose-800", label: "Cancelled" },
    REFUNDED: { bg: "bg-slate-100", text: "text-slate-800", label: "Refunded" },
  };

  const statusInfo = statusMap[status] || { bg: "bg-slate-100", text: "text-slate-800", label: status };

  return (
    <Badge className={`${statusInfo.bg} ${statusInfo.text} px-2.5 py-1 rounded-md font-medium`}>
      {statusInfo.label}
    </Badge>
  );
};

const BookingDetailsModal = ({ isOpen, onClose, booking}) => {
  const [activeTab, setActiveTab] = useState("overview");

  if (!booking) return null;

  // Calculate total from individual vaccines
  const vaccineTotal = booking.vaccineList?.reduce((sum, vaccine) => sum + vaccine.price, 0) || 0;

  // Calculate total from combos
  const comboTotal = booking.comboList?.reduce((sum, combo) => sum + combo.finalPrice, 0) || 0;

  // Calculate total savings from discounts
  const savings = booking.comboList?.reduce((sum, combo) => {
    return sum + (combo.totalPrice - combo.finalPrice);
  }, 0) || 0;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto p-0 bg-white rounded-lg">
        {/* Header with gradient background */}
        <div className="bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 p-6 rounded-t-lg">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <DialogTitle className="text-2xl font-bold text-white flex items-center gap-2">
                <FileText className="h-6 w-6" />
                Booking #{booking.id}
              </DialogTitle>
              <DialogDescription className="text-blue-100 mt-1">
                Created on {formatDate(booking.createdAt)}
              </DialogDescription>
            </div>
            <Badge
              className={`
                ${booking.status === "COMPLETED" ? "bg-emerald-500" : ""}
                ${booking.status === "PENDING" ? "bg-amber-500" : ""}
                ${booking.status === "CANCELLED" ? "bg-rose-500" : ""}
                ${booking.status === "REFUNDED" ? "bg-slate-500" : ""}
                text-white px-3 py-1.5 text-sm font-medium rounded-full
              `}
            >
              {booking.status}
            </Badge>
          </div>
        </div>

        {/* Summary bar */}
        <div className="bg-slate-50 px-6 py-3 border-b border-slate-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-blue-500" />
              <div className="text-sm">
                <span className="text-slate-500 block">Parent</span>
                <span className="font-medium text-slate-800">{booking.parentName}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-blue-500" />
              <div className="text-sm">
                <span className="text-slate-500 block">Phone</span>
                <span className="font-medium text-slate-800">{booking.phoneNumber}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <CalendarClock className="h-4 w-4 text-blue-500" />
              <div className="text-sm">
                <span className="text-slate-500 block">Arrived</span>
                <span className="font-medium text-slate-800">{formatDate(booking.arrivedAt).split("•")[0]}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Wallet className="h-4 w-4 text-blue-500" />
              <div className="text-sm">
                <span className="text-slate-500 block">Payment</span>
                <span className="font-medium text-slate-800">{booking.paymentMethod}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs navigation */}
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="p-6">
          <TabsList className="grid grid-cols-3 mb-6 bg-slate-100 p-1 rounded-lg">
            <TabsTrigger
              value="overview"
              className="rounded-md data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-sm"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="children"
              className="rounded-md data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-sm"
            >
              Children
            </TabsTrigger>
            <TabsTrigger
              value="vaccines"
              className="rounded-md data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-sm"
            >
              Vaccines
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6 mt-0 animate-in fade-in-50 duration-300">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Left column */}
              <div className="md:col-span-2 space-y-6">
                {/* Booking Summary */}
                <Card className="border-slate-200 shadow-sm overflow-hidden">
                  <CardHeader className="bg-slate-50 border-b border-slate-100 pb-4">
                    <CardTitle className="text-lg text-slate-800 flex items-center gap-2">
                      <FileText className="h-5 w-5 text-blue-500" />
                      Booking Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="p-4 border-b border-slate-100">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium text-slate-700">Advisory Details</h4>
                      </div>
                      <p className="text-slate-600 text-sm">{booking.advisoryDetail || "No advisory details provided."}</p>
                    </div>

                    <div className="p-4 border-b border-slate-100">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium text-slate-700">Children</h4>
                        <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200">
                          {booking.childrenList?.length || 0} Children
                        </Badge>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {booking.childrenList?.map((child) => (
                          <div key={child.childId} className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-full">
                            <Avatar className="h-6 w-6 bg-blue-100 text-blue-700">
                              <AvatarFallback>{child.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className="text-sm font-medium text-slate-700">{child.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium text-slate-700">Vaccines</h4>
                        <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200">
                          {(booking.vaccineList?.length || 0) + (booking.comboList?.length || 0)} Items
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        {booking.vaccineList?.map((vaccine) => (
                          <div key={vaccine.id} className="flex justify-between items-center text-sm">
                            <div className="flex items-center gap-2">
                              <Syringe className="h-3.5 w-3.5 text-blue-500" />
                              <span className="text-slate-700">{vaccine.name}</span>
                            </div>
                            <span className="font-medium text-slate-700">{formatCurrency(vaccine.price)} VND</span>
                          </div>
                        ))}
                        {booking.comboList?.map((combo) => (
                          <div key={combo.id} className="flex justify-between items-center text-sm">
                            <div className="flex items-center gap-2">
                              <Package className="h-3.5 w-3.5 text-indigo-500" />
                              <span className="text-slate-700">{combo.name}</span>
                            </div>
                            <div className="text-right">
                              <span className="font-medium text-slate-700">{formatCurrency(combo.finalPrice)} VND</span>
                              {combo.discount > 0 && (
                                <span className="text-xs text-emerald-600 ml-2">-{combo.discount}%</span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Timeline */}
                <Card className="border-slate-200 shadow-sm">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-md text-slate-800 flex items-center gap-2">
                      <Clock className="h-5 w-5 text-blue-500" />
                      Booking Timeline
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="relative pl-6 border-l border-slate-200 space-y-4 py-2">
                      <div className="relative">
                        <div className="absolute -left-[25px] h-4 w-4 rounded-full bg-blue-500"></div>
                        <div className="space-y-1">
                          <p className="text-sm font-medium text-slate-800">Booking Created</p>
                          <p className="text-xs text-slate-500">{formatDate(booking.createdAt)}</p>
                        </div>
                      </div>
                      <div className="relative">
                        <div className="absolute -left-[25px] h-4 w-4 rounded-full bg-emerald-500"></div>
                        <div className="space-y-1">
                          <p className="text-sm font-medium text-slate-800">Customer Arrived</p>
                          <p className="text-xs text-slate-500">{formatDate(booking.arrivedAt)}</p>
                        </div>
                      </div>
                      {booking.status === "COMPLETED" && (
                        <div className="relative">
                          <div className="absolute -left-[25px] h-4 w-4 rounded-full bg-indigo-500"></div>
                          <div className="space-y-1">
                            <p className="text-sm font-medium text-slate-800">Booking Completed</p>
                            <p className="text-xs text-slate-500">Service successfully delivered</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right column */}
              <div className="space-y-6">
                {/* Payment Summary */}
                <Card className="border-slate-200 shadow-sm overflow-hidden">
                  <CardHeader className="bg-slate-50 border-b border-slate-100 pb-4">
                    <CardTitle className="text-md text-slate-800 flex items-center gap-2">
                      <CreditCard className="h-5 w-5 text-blue-500" />
                      Payment Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="space-y-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Individual Vaccines</span>
                        <span className="font-medium text-slate-700">{formatCurrency(vaccineTotal)} VND</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Vaccine Packages</span>
                        <span className="font-medium text-slate-700">{formatCurrency(comboTotal)} VND</span>
                      </div>
                      {savings > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-emerald-600">Savings from Discounts</span>
                          <span className="font-medium text-emerald-600">-{formatCurrency(savings)} VND</span>
                        </div>
                      )}
                      <Separator className="my-2" />
                      <div className="flex justify-between">
                        <span className="font-medium text-slate-800">Total Amount</span>
                        <span className="font-bold text-blue-700 text-lg">{formatCurrency(booking.amount)} VND</span>
                      </div>
                      <div className="pt-2">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-slate-600">Payment Method</span>
                          <span className="font-medium text-slate-700">{booking.paymentMethod}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-600">Payment Status</span>
                          <Badge
                            className={`
                              ${booking.status === "COMPLETED" ? "bg-emerald-100 text-emerald-700" : ""}
                              ${booking.status === "PENDING" ? "bg-amber-100 text-amber-700" : ""}
                              ${booking.status === "REFUNDED" ? "bg-slate-100 text-slate-700" : ""}
                            `}
                          >
                            {booking.status === "COMPLETED"
                              ? "Paid"
                              : booking.status === "PENDING"
                              ? "Pending"
                              : booking.status === "REFUNDED"
                              ? "Refunded"
                              : booking.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Parent Information */}
                <Card className="border-slate-200 shadow-sm">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-md text-slate-800 flex items-center gap-2">
                      <User className="h-5 w-5 text-blue-500" />
                      Parent Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="space-y-4">
                      <div className="space-y-1">
                        <p className="text-sm text-slate-500">Full Name</p>
                        <p className="font-medium text-slate-800">{booking.parentName}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-slate-500">Phone Number</p>
                        <p className="font-medium text-slate-800 flex items-center">
                          <Phone className="h-3.5 w-3.5 inline-block mr-1 text-blue-400" />
                          {booking.phoneNumber}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-slate-500">Parent ID</p>
                        <p className="font-medium text-slate-800">#{booking.parentId}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Children Tab */}
          <TabsContent value="children" className="space-y-6 mt-0 animate-in fade-in-50 duration-300">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold text-slate-800">Children Information</h3>
              <Badge className="bg-blue-100 text-blue-700">{booking.childrenList?.length || 0} Children</Badge>
            </div>

            {booking.childrenList?.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {booking.childrenList.map((child) => (
                  <Card key={child.childId} className="border-slate-200 shadow-sm overflow-hidden">
                    <CardHeader className="pb-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-slate-100">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10 bg-blue-100 text-blue-700 border-2 border-white shadow-sm">
                            <AvatarFallback>{child.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle className="text-md text-slate-800">{child.name}</CardTitle>
                            <CardDescription className="text-slate-500">Child ID: #{child.childId}</CardDescription>
                          </div>
                        </div>
                        <Badge
                          className={`
                            ${child.gender === 1 ? "bg-blue-100 text-blue-700" : ""}
                            ${child.gender === 2 ? "bg-pink-100 text-pink-700" : ""}
                            ${!child.gender ? "bg-slate-100 text-slate-700" : ""}
                          `}
                        >
                          {getGenderText(child.gender)}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <p className="text-sm text-slate-500">Age</p>
                          <p className="font-semibold text-slate-800">{child.age} years old</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm text-slate-500">Gender</p>
                          <p className="font-semibold text-slate-800">{getGenderText(child.gender)}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 px-4 bg-slate-50 rounded-lg border border-slate-200">
                <AlertCircle className="h-12 w-12 text-slate-300 mb-4" />
                <h3 className="text-lg font-medium text-slate-700 mb-1">No children information</h3>
                <p className="text-slate-500 text-center max-w-md">
                  There are no children registered for this booking.
                </p>
              </div>
            )}
          </TabsContent>

          {/* Vaccines Tab */}
          <TabsContent value="vaccines" className="space-y-6 mt-0 animate-in fade-in-50 duration-300">
            <div className="space-y-8">
              {/* Individual Vaccines */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                    <Syringe className="h-5 w-5 text-blue-500" />
                    Individual Vaccines
                  </h3>
                  <Badge className="bg-blue-100 text-blue-700">{booking.vaccineList?.length || 0} Vaccines</Badge>
                </div>

                {booking.vaccineList?.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {booking.vaccineList.map((vaccine) => (
                      <Card key={vaccine.id} className="border-slate-200 shadow-sm overflow-hidden">
                        <CardHeader className="pb-3 flex flex-row items-center justify-between space-y-0">
                          <div>
                            <CardTitle className="text-md text-blue-700">{vaccine.name}</CardTitle>
                            <CardDescription className="text-slate-500 mt-1">Vaccine ID: #{vaccine.id}</CardDescription>
                          </div>
                          <Shield className="h-8 w-8 text-blue-100" />
                        </CardHeader>
                        <CardContent className="pt-0">
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="text-xs text-slate-500">Price</p>
                              <p className="font-bold text-blue-700 text-lg">{formatCurrency(vaccine.price)} VND</p>
                            </div>
                            <Badge className="bg-emerald-100 text-emerald-700">Individual</Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 px-4 bg-slate-50 rounded-lg border border-slate-200">
                    <AlertCircle className="h-10 w-10 text-slate-300 mb-2" />
                    <p className="text-slate-500">No individual vaccines selected</p>
                  </div>
                )}
              </div>

              {/* Vaccine Combos */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                    <Package className="h-5 w-5 text-indigo-500" />
                    Vaccine Packages
                  </h3>
                  <Badge className="bg-indigo-100 text-indigo-700">{booking.comboList?.length || 0} Packages</Badge>
                </div>

                {booking.comboList?.length > 0 ? (
                  <div className="space-y-6">
                    {booking.comboList.map((combo) => (
                      <Card key={combo.id} className="border-slate-200 shadow-sm overflow-hidden">
                        <CardHeader className="pb-3 bg-gradient-to-r from-indigo-50 to-blue-50 border-b border-slate-100">
                          <div className="flex justify-between items-center">
                            <div>
                              <CardTitle className="text-md text-indigo-700">{combo.name}</CardTitle>
                              <CardDescription className="text-slate-500 mt-1">Package ID: #{combo.id}</CardDescription>
                            </div>
                            {combo.discount > 0 && (
                              <Badge className="bg-emerald-100 text-emerald-700 flex items-center gap-1">
                                <Percent className="h-3 w-3" />
                                {combo.discount}% Discount
                              </Badge>
                            )}
                          </div>
                        </CardHeader>
                        <CardContent className="p-0">
                          <div className="p-4 border-b border-slate-100">
                            <div className="flex justify-between items-center mb-2">
                              <div className="space-y-1">
                                <p className="text-xs text-slate-500">Original Price</p>
                                <p className="font-medium text-slate-700">
                                  {formatCurrency(combo.totalPrice)} VND
                                  {combo.discount > 0 && (
                                    <span className="text-xs text-slate-500 line-through ml-2">
                                      {formatCurrency(combo.totalPrice)} VND
                                    </span>
                                  )}
                                </p>
                              </div>
                              <div className="space-y-1 text-right">
                                <p className="text-xs text-slate-500">Final Price</p>
                                <p className="font-bold text-indigo-700 text-lg">{formatCurrency(combo.finalPrice)} VND</p>
                              </div>
                            </div>
                            {combo.discount > 0 && (
                              <div className="mt-2">
                                <div className="flex justify-between text-xs mb-1">
                                  <span className="text-slate-500">Discount Applied</span>
                                  <span className="text-emerald-600">
                                    -{formatCurrency(combo.totalPrice - combo.finalPrice)} VND
                                  </span>
                                </div>
                                <Progress
                                  value={combo.discount}
                                  className="h-1.5 bg-slate-100"
                                  indicatorClassName="bg-emerald-500"
                                />
                              </div>
                            )}
                          </div>

                          <div className="p-4">
                            <h4 className="text-sm font-medium text-slate-700 mb-3">Included Vaccines</h4>
                            <div className="space-y-2">
                              {combo.vaccineResponeBooking?.map((vaccine) => (
                                <div key={vaccine.id} className="flex justify-between items-center text-sm">
                                  <div className="flex items-center gap-2">
                                    <Syringe className="h-3.5 w-3.5 text-indigo-500" />
                                    <span className="text-slate-700">{vaccine.name}</span>
                                  </div>
                                  <span className="font-medium text-slate-700">{formatCurrency(vaccine.price)} VND</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 px-4 bg-slate-50 rounded-lg border border-slate-200">
                    <AlertCircle className="h-10 w-10 text-slate-300 mb-2" />
                    <p className="text-slate-500">No vaccine packages selected</p>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <div className="border-t border-slate-200 p-4 bg-slate-50 rounded-b-lg">
          <DialogFooter>
            {booking.status === "PENDING" && (
              <>
                <Button
                  onClick={() => {
                    onApprove(booking.id);
                    onClose();
                  }}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  <Check className="h-4 w-4 mr-2" />
                  Approve Booking
                </Button>
                <Button
                  onClick={() => {
                    onReject(booking.id);
                    onClose();
                  }}
                  variant="destructive"
                  className="bg-rose-600 hover:bg-rose-700"
                >
                  <X className="h-4 w-4 mr-2" />
                  Reject Booking
                </Button>
              </>
            )}
            <Button
              onClick={onClose}
              variant="outline"
              className="border-slate-200 text-slate-700 hover:bg-slate-100"
            >
              Close
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingDetailsModal;