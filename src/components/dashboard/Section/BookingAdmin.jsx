"use client";

import { useEffect, useState } from "react";
import useAxios from "../../../utils/useAxios";
import { toast } from "react-toastify";
import Pagination from "../../staffManage/Pagination";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  RefreshCw,
  Eye,
  Edit,
  Check,
  X,
  Trash2,
  Calendar,
  User,
  Phone,
  CreditCard,
  Clock,
  Filter,
  BarChart3,
  CalendarClock,
  Wallet,
  AlertCircle,
} from "lucide-react";
import formatDate from "../../../utils/Date";
import formatCurrency from "../../../utils/calculateMoney";
import ModalDetail from "./modalDetail";
const url = import.meta.env.VITE_BASE_URL_DB;

const BookingAdmin = () => {
  const api = useAxios();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const itemsPerPage = 10;

  // Fetch bookings on mount
  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const response = await api.get(`${url}/Booking/get-all-booking`);
      setAppointments(response.data);
      setFilteredAppointments(response.data);
    } catch (error) {
      console.error("Error fetching bookings:", error);
      toast.error("Failed to load bookings!");
    } finally {
      setLoading(false);
    }
  };

  // Filter bookings based on search term and status
  useEffect(() => {
    let filtered = [...appointments];

    if (selectedStatus !== "all") {
      filtered = filtered.filter(
        (appointment) => appointment.status.toLowerCase() === selectedStatus.toLowerCase()
      );
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (appointment) =>
          appointment.phoneNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          appointment.parentName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          appointment.id?.toString().includes(searchTerm)
      );
    }

    setFilteredAppointments(filtered);
    setCurrentPage(1);
  }, [searchTerm, selectedStatus, appointments]);

  // Handle booking actions


  const handleViewDetails = (booking) => {
    setSelectedBooking(booking);
    setIsModalOpen(true);
  };

  const handleDeleteBooking = async (bookingId) => {
    if (window.confirm("Are you sure you want to delete this booking?")) {
      setLoading(true);
      try {
        const response = await api.delete(`${url}/Booking/delete-booking/${bookingId}`);
        if (response.status === 200) {
          toast.success("Booking deleted successfully!");
          fetchBookings();
        }
      } catch (error) {
        console.error("Error deleting booking:", error);
        toast.error("Failed to delete booking!");
      } finally {
        setLoading(false);
      }
    }
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = filteredAppointments.slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Booking summary
  const bookingSummary = {
    total: appointments.length,
    pending: appointments.filter((a) => a.status.toLowerCase() === "pending").length,
    completed: appointments.filter((a) => a.status.toLowerCase() === "success").length,
    cancelled: appointments.filter((a) => a.status.toLowerCase() === "refund").length,
  };

  const getStatusBadge = (status) => {
    const variants = {
      pending: <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Pending</Badge>,
      success: <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Success</Badge>,
      refund: <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Refunded</Badge>,
      default: <Badge className="bg-slate-100 text-slate-800 hover:bg-slate-200">{status}</Badge>,
    };
    return variants[status.toLowerCase()] || variants.default;
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header and Summary */}
      <div className="flex flex-col gap-4">
        {/* <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold text-slate-800">Booking Management</h1>
          <p className="text-slate-500">Manage and track all vaccination appointments</p>
        </div> */}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="border border-slate-200 shadow-sm bg-white overflow-hidden">
            <CardHeader className="pb-2 pt-4 px-4 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium text-slate-700">Total Vaccines</CardTitle>
              <BarChart3 className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent className="px-4 pb-4">
              <div className="text-2xl font-bold text-slate-900">{bookingSummary.total}</div>
              <p className="text-xs text-slate-500 mt-1">All appointments</p>
            </CardContent>
          </Card>
          <Card className="border border-slate-200 shadow-sm bg-white overflow-hidden">
            <CardHeader className="pb-2 pt-4 px-4 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium text-slate-700">Completed</CardTitle>
              <Check className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent className="px-4 pb-4">
              <div className="text-2xl font-bold text-green-500">{bookingSummary.completed}</div>
              <p className="text-xs text-slate-500 mt-1">Successfully processed</p>
            </CardContent>
          </Card>
          <Card className="border border-slate-200 shadow-sm bg-white overflow-hidden">
            <CardHeader className="pb-2 pt-4 px-4 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium text-slate-700">Scheduled</CardTitle>
              <CalendarClock className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent className="px-4 pb-4">
              <div className="text-2xl font-bold text-blue-500">{bookingSummary.pending}</div>
              <p className="text-xs text-slate-500 mt-1">Awaiting approval</p>
            </CardContent>
          </Card>
          <Card className="border border-slate-200 shadow-sm bg-white overflow-hidden">
            <CardHeader className="pb-2 pt-4 px-4 flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium text-slate-700">Cancelled</CardTitle>
              <Wallet className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent className="px-4 pb-4">
              <div className="text-2xl font-bold text-red-500">{bookingSummary.cancelled}</div>
              <p className="text-xs text-slate-500 mt-1">Money returned</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Search and Filter Section */}
      <Card className="border border-slate-200 shadow-sm bg-white">
        <CardHeader className="pb-3 pt-4 px-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle className="text-lg font-semibold text-slate-800">Appointments</CardTitle>
              <CardDescription className="text-slate-500 mt-1">
                {filteredAppointments.length} bookings found
              </CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search by name, phone, ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 border-slate-200 focus-visible:ring-blue-500 w-full sm:w-[200px]"
                />
              </div>
              <div className="flex items-center gap-2">
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="border-slate-200 focus-visible:ring-blue-500 w-full sm:w-[180px]">
                    <div className="flex items-center gap-2">
                      <Filter className="h-3.5 w-3.5 text-slate-400" />
                      <SelectValue placeholder="Filter by status" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="success">Completed</SelectItem>
                    <SelectItem value="pending">Scheduled</SelectItem>
                    <SelectItem value="refund">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
                {/* <Button
                  variant="outline"
                  size="icon"
                  onClick={fetchBookings}
                  className="border-slate-200 text-slate-700 hover:text-blue-600 hover:border-blue-300"
                >
                  <RefreshCw className="h-4 w-4" />
                </Button> */}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
            </div>
          ) : paginatedData.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 px-4">
              <AlertCircle className="h-12 w-12 text-slate-300 mb-4" />
              <h3 className="text-lg font-medium text-slate-700">No bookings found</h3>
              <p className="text-slate-500 text-center max-w-md mt-2">
                Try adjusting your search or filter to find what you're looking for.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-blue-50">
                  <TableRow>
                    <TableHead className="text-blue-700 font-medium">ID</TableHead>
                    <TableHead className="text-blue-700 font-medium">Parent Name</TableHead>
                    <TableHead className="text-blue-700 font-medium">Phone</TableHead>
                    <TableHead className="text-blue-700 font-medium">Date</TableHead>
                    <TableHead className="text-blue-700 font-medium">Status</TableHead>
                    <TableHead className="text-blue-700 font-medium">Amount</TableHead>
                    <TableHead className="text-blue-700 font-medium">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedData.map((booking) => (
                    <TableRow key={booking.id} className="hover:bg-blue-50/50 border-b border-blue-100">
                      <TableCell className="font-medium text-blue-600">#{booking.id}</TableCell>
                      <TableCell className="font-medium text-slate-700">{booking.parentName}</TableCell>
                      <TableCell className="text-slate-700">{booking.phoneNumber}</TableCell>
                      <TableCell className="text-slate-700">{formatDate(booking.createdAt)}</TableCell>
                      <TableCell>{getStatusBadge(booking.status)}</TableCell>
                      <TableCell className="font-medium text-slate-700">{formatCurrency(booking.amount)} VND</TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          <Button
                            onClick={() => handleViewDetails(booking)}
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-slate-700 hover:text-blue-600 hover:bg-blue-50"
                            title="View details"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          {booking.status.toLowerCase() === "pending" && (
                            <>
                              <Button
                                onClick={() => handleApproveBooking(booking.id)}
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-slate-700 hover:text-emerald-600 hover:bg-emerald-50"
                                title="Approve booking"
                              >
                                <Check className="h-4 w-4" />
                              </Button>
                              <Button
                                onClick={() => handleRejectBooking(booking.id)}
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-slate-700 hover:text-rose-600 hover:bg-rose-50"
                                title="Reject booking"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                          <Button
                            onClick={() => handleDeleteBooking(booking.id)}
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-slate-700 hover:text-rose-600 hover:bg-rose-50"
                            title="Delete booking"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
          <div className="p-4 border-t border-slate-200 bg-white">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              startIndex={startIndex}
              endIndex={Math.min(endIndex, filteredAppointments.length)}
              totalItems={filteredAppointments.length}
              onPageChange={handlePageChange}
            />
          </div>
        </CardContent>
      </Card>

      {/* Detail Modal */}
      <ModalDetail isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} booking={selectedBooking} />
    </div>
  );
};

export default BookingAdmin;