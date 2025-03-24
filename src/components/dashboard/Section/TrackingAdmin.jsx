import { useEffect, useState, useMemo } from "react";
import useAxios from "../../../utils/useAxios";
import { toast } from "react-toastify";
import Pagination from "../../staffManage/Pagination";
import { format } from "date-fns";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../../ui/dialog";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { Badge } from "../../ui/badge";
import { Search, RefreshCw, Eye, Edit, Trash2, Calendar, CheckCircle2, User } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";

const url = import.meta.env.VITE_BASE_URL_DB;

const TrackingAdmin = () => {
  const api = useAxios();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [childData, setChildData] = useState([]);
  const [status, setStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortField, setSortField] = useState("vaccinationDate");
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const itemsPerPage = 10;

  // Calculate vaccine progress and status summaries
  const trackingSummary = useMemo(() => {
    return {
      total: data.length,
      success: data.filter(item => item.status.toLowerCase() === "success").length,
      waiting: data.filter(item => item.status.toLowerCase() === "waiting").length,
      scheduled: data.filter(item => item.status.toLowerCase() === "schedule").length,
      cancelled: data.filter(item => item.status.toLowerCase() === "cancel").length,
      completionRate: data.length > 0 
        ? Math.round((data.filter(item => item.status.toLowerCase() === "success").length / data.length) * 100) 
        : 0
    };
  }, [data]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [vaccineRes, childRes] = await Promise.all([
        api.get(`${url}/VaccinesTracking/get-all-admin`),
        api.get(`${url}/Child/get-all-child`)
      ]);
      
      if (vaccineRes.status === 200 && childRes.status === 200) {
        setData(vaccineRes.data || []);
        setChildData(childRes.data || []);
        setFilteredData(vaccineRes.data || []);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to fetch vaccination data");
    } finally {
      setLoading(false);
    }
  };

  // Combined filter, search, and sort logic
  useEffect(() => {
    let newFilteredData = [...data];

    // Apply status filter
    if (status !== "all") {
      newFilteredData = newFilteredData.filter(
        item => item.status.toLowerCase() === status.toLowerCase()
      );
    }

    // Apply search filter
    if (searchQuery) {
      newFilteredData = newFilteredData.filter(item => {
        const childName = childData.find(child => child.id === item.childId)?.name || "";
        return (
          item.userName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          childName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.vaccineName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.bookingId?.toString().includes(searchQuery) ||
          item.trackingID?.toString().includes(searchQuery) ||
          item.childId?.toString().includes(searchQuery.toLowerCase())
        );
      });
    }

    // Sort data
    const sortedData = sortData(newFilteredData);
    setFilteredData(sortedData);
    setCurrentPage(1); // Reset to first page on filter/sort change
  }, [data, childData, status, searchQuery, sortField, sortOrder]);

  const sortData = (dataToSort) => {
    return [...dataToSort].sort((a, b) => {
      if (!sortField) return 0;

      if (sortField === "status") {
        const statusOrder = { success: 1, schedule: 2, waiting: 3, cancel: 4 };
        const aValue = statusOrder[a.status?.toLowerCase()] || 999;
        const bValue = statusOrder[b.status?.toLowerCase()] || 999;
        return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
      }

      if (sortField === "vaccinationDate") {
        const aDate = a.vaccinationDate ? new Date(a.vaccinationDate) : new Date(0);
        const bDate = b.vaccinationDate ? new Date(b.vaccinationDate) : new Date(0);
        if (isNaN(aDate) || isNaN(bDate)) return 0; // Handle invalid dates
        return sortOrder === "asc" ? aDate - bDate : bDate - aDate;
      }

      const aValue = (a[sortField] || "").toString().toLowerCase();
      const bValue = (b[sortField] || "").toString().toLowerCase();
      return sortOrder === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    });
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const handleFilter = (newStatus) => {
    setStatus(newStatus);
  };

  const handleViewDetails = (record) => {
    setSelectedRecord(record);
    setIsDetailModalOpen(true);
  };

  const handleUpdateStatus = (record) => {
    setSelectedRecord(record);
    setIsUpdateModalOpen(true);
  };

  const handleDeleteTracking = async (trackingId) => {
    if (window.confirm("Are you sure you want to delete this tracking record?")) {
      try {
        const response = await api.delete(`${url}/VaccinesTracking/delete-tracking/${trackingId}`);
        if (response.status === 200) {
          toast.success("Tracking record deleted successfully!");
          fetchData();
        }
      } catch (error) {
        console.error("Error deleting tracking:", error);
        toast.error("Failed to delete tracking record!");
      }
    }
  };

  const updateTrackingStatus = async (trackingId, newStatus) => {
    try {
      const value = { status: newStatus, reaction: selectedRecord.reaction || "Nothing" };
      const response = await api.put(
        `${url}/VaccinesTracking/update-vaccine-admin/${trackingId}`,
        value
      );
      
      if (response.status === 200) {
        toast.success(`Status updated to ${newStatus} successfully!`);
        fetchData();
        setIsUpdateModalOpen(false);
      }
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status!");
    }
  };

  // Function to edit tracking information directly
  const handleEditTrackingInfo = (record) => {
    setSelectedRecord(record);
    // This could open an edit modal with more fields
    setIsUpdateModalOpen(true);
  };

  // Check if a child has completed all required vaccinations
  const hasCompletedAllVaccines = (childId) => {
    const childVaccines = data.filter(item => item.childId === childId);
    return childVaccines.every(vaccine => vaccine.status.toLowerCase() === "success");
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = filteredData.slice(
    startIndex,
    endIndex
  );

  const handlePageChange = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Get child name by ID
  const getChildName = (childId) => {
    return childData.find(child => child.id === childId)?.name || "Unknown Child";
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "Not scheduled";
    try {
      return format(new Date(dateString), "dd/MM/yyyy HH:mm");
    } catch (error) {
      return "Invalid date";
    }
  };

  // Status badge styles
  const getStatusBadgeVariant = (status) => {
    switch (status.toLowerCase()) {
      case 'success': return 'success';
      case 'schedule': return 'warning';
      case 'waiting': return 'default';
      case 'cancel': return 'destructive';
      default: return 'outline';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500 shadow-sm">
        <h1 className="text-2xl font-bold text-blue-800">Vaccination Tracking Management</h1>
        <Badge className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1">
          Admin Control
        </Badge>
      </div>
      
      {/* Search and Filter Section */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white p-4 rounded-lg shadow-sm border border-blue-100">
        <div className="flex gap-4 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <Input
              placeholder="Search vaccines, children..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-blue-200 focus:border-blue-500"
            />
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-blue-400" />
          </div>
          
          <Select value={status} onValueChange={handleFilter}>
            <SelectTrigger className="w-[180px] border-blue-200">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="success">Completed</SelectItem>
              <SelectItem value="schedule">Scheduled</SelectItem>
              <SelectItem value="waiting">Waiting</SelectItem>
              <SelectItem value="cancel">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Button 
          onClick={fetchData} 
          className="w-full md:w-auto bg-blue-600 hover:bg-blue-700"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Refresh Data
        </Button>
      </div>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card className="bg-white border-blue-100 shadow-sm">
          <CardHeader className="pb-2 border-b border-blue-50">
            <CardTitle className="text-sm font-medium text-blue-700">Total Vaccines</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-2xl font-bold text-blue-800">{trackingSummary.total}</p>
          </CardContent>
        </Card>
        <Card className="bg-white border-blue-100 shadow-sm">
          <CardHeader className="pb-2 border-b border-blue-50">
            <CardTitle className="text-sm font-medium text-blue-700">Completed</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-2xl font-bold text-green-600">{trackingSummary.success}</p>
          </CardContent>
        </Card>
        <Card className="bg-white border-blue-100 shadow-sm">
          <CardHeader className="pb-2 border-b border-blue-50">
            <CardTitle className="text-sm font-medium text-blue-700">Scheduled</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-2xl font-bold text-amber-600">{trackingSummary.scheduled}</p>
          </CardContent>
        </Card>
        <Card className="bg-white border-blue-100 shadow-sm">
          <CardHeader className="pb-2 border-b border-blue-50">
            <CardTitle className="text-sm font-medium text-blue-700">Waiting</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-2xl font-bold text-blue-600">{trackingSummary.waiting}</p>
          </CardContent>
        </Card>
        <Card className="bg-white border-blue-100 shadow-sm">
          <CardHeader className="pb-2 border-b border-blue-50">
            <CardTitle className="text-sm font-medium text-blue-700">Cancelled</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-2xl font-bold text-red-600">{trackingSummary.cancelled}</p>
          </CardContent>
        </Card>
        <Card className="bg-white border-blue-100 shadow-sm">
          <CardHeader className="pb-2 border-b border-blue-50">
            <CardTitle className="text-sm font-medium text-blue-700">Completion Rate</CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-2xl font-bold text-purple-600">{trackingSummary.completionRate}%</p>
          </CardContent>
        </Card>
      </div>
      
      {/* Tracking Table */}
      <Card className="bg-white border-blue-100 shadow-sm overflow-hidden">
        <CardContent className="p-0">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : paginatedData.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-blue-400">No vaccination records found.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader className="bg-blue-50">
                  <TableRow>
                    <TableHead className="text-blue-700 cursor-pointer" onClick={() => handleSort("trackingID")}>
                      ID {sortField === "trackingID" && (sortOrder === "asc" ? "↑" : "↓")}
                    </TableHead>
                    <TableHead className="text-blue-700">Child</TableHead>
                    <TableHead className="text-blue-700">Parent</TableHead>
                    <TableHead className="text-blue-700 cursor-pointer" onClick={() => handleSort("vaccineName")}>
                      Vaccine {sortField === "vaccineName" && (sortOrder === "asc" ? "↑" : "↓")}
                    </TableHead>
                    <TableHead className="text-blue-700 cursor-pointer" onClick={() => handleSort("vaccinationDate")}>
                      Date {sortField === "vaccinationDate" && (sortOrder === "asc" ? "↑" : "↓")}
                    </TableHead>
                    <TableHead className="text-blue-700 cursor-pointer" onClick={() => handleSort("status")}>
                      Status {sortField === "status" && (sortOrder === "asc" ? "↑" : "↓")}
                    </TableHead>
                    <TableHead className="text-blue-700">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedData.map((record) => (
                    <TableRow key={record.trackingID} className="hover:bg-blue-50/50 border-b border-blue-100">
                      <TableCell className="font-medium text-blue-700">#{record.trackingID}</TableCell>
                      <TableCell>{getChildName(record.childId)}</TableCell>
                      <TableCell>{record.userName || "N/A"}</TableCell>
                      <TableCell>{record.vaccineName}</TableCell>
                      <TableCell>{formatDate(record.vaccinationDate)}</TableCell>
                      <TableCell>
                        <Badge className={`
                          ${record.status?.toLowerCase() === 'success' ? 'bg-green-100 text-green-700 hover:bg-green-200' : ''}
                          ${record.status?.toLowerCase() === 'schedule' ? 'bg-amber-100 text-amber-700 hover:bg-amber-200' : ''}
                          ${record.status?.toLowerCase() === 'waiting' ? 'bg-blue-100 text-blue-700 hover:bg-blue-200' : ''}
                          ${record.status?.toLowerCase() === 'cancel' ? 'bg-red-100 text-red-700 hover:bg-red-200' : ''}
                        `}>
                          {record.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button 
                            onClick={() => handleViewDetails(record)} 
                            variant="ghost" 
                            size="icon"
                            className="text-blue-600 hover:text-blue-800 hover:bg-blue-100"
                            title="View details"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button 
                            onClick={() => handleUpdateStatus(record)} 
                            variant="ghost" 
                            size="icon"
                            className="text-blue-600 hover:text-blue-800 hover:bg-blue-100"
                            title="Update status"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            onClick={() => handleDeleteTracking(record.trackingID)} 
                            variant="ghost" 
                            size="icon"
                            className="text-red-600 hover:text-red-800 hover:bg-red-100"
                            title="Delete record"
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
          
          <div className="p-4 border-t border-blue-100 bg-white">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              startIndex={startIndex}
              endIndex={Math.min(endIndex, filteredData.length)}
              totalItems={filteredData.length}
              onPageChange={handlePageChange}
            />
          </div>
        </CardContent>
      </Card>
      
      {/* Detail Modal */}
      <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0 bg-white">
          <div className="bg-blue-600 p-6 text-white">
            <DialogTitle className="text-2xl font-semibold">
              Vaccination Record #{selectedRecord?.trackingID}
            </DialogTitle>
            <DialogDescription className="text-blue-100 mt-1">
              Detailed information about this vaccination record
            </DialogDescription>
          </div>
          
          <Tabs defaultValue="details" className="p-6">
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="details">Record Details</TabsTrigger>
              <TabsTrigger value="history">Vaccination History</TabsTrigger>
            </TabsList>
            
            <TabsContent value="details" className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Card className="border-blue-100">
                  <CardHeader className="pb-2 flex flex-row items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-blue-500" />
                    <CardTitle className="text-md text-blue-700">Vaccine Information</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <div className="space-y-4">
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-blue-500">Vaccine Name</p>
                        <p className="font-semibold">{selectedRecord?.vaccineName}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-blue-500">Dose</p>
                        <p className="font-semibold">
                          {selectedRecord?.previousVaccination === 0 ? "First Dose" : "Follow-up Dose"}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-blue-100">
                  <CardHeader className="pb-2 flex flex-row items-center gap-2">
                    <Calendar className="h-5 w-5 text-blue-500" />
                    <CardTitle className="text-md text-blue-700">Scheduling Details</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <div className="space-y-4">
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-blue-500">Appointment Date</p>
                        <p className="font-semibold">
                          {selectedRecord?.vaccinationDate ? formatDate(selectedRecord.vaccinationDate) : 'Not scheduled'}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-blue-500">Status</p>
                        <Badge className={`
                          ${selectedRecord?.status?.toLowerCase() === 'success' ? 'bg-green-100 text-green-700' : ''}
                          ${selectedRecord?.status?.toLowerCase() === 'schedule' ? 'bg-amber-100 text-amber-700' : ''}
                          ${selectedRecord?.status?.toLowerCase() === 'waiting' ? 'bg-blue-100 text-blue-700' : ''}
                          ${selectedRecord?.status?.toLowerCase() === 'cancel' ? 'bg-red-100 text-red-700' : ''}
                          px-2.5 py-1
                        `}>
                          {selectedRecord?.status}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border-blue-100">
                  <CardHeader className="pb-2 flex flex-row items-center gap-2">
                    <User className="h-5 w-5 text-blue-500" />
                    <CardTitle className="text-md text-blue-700">Child Information</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <p className="font-semibold">{getChildName(selectedRecord?.childId)}</p>
                    <p className="text-sm text-blue-500 mt-2">Parent: {selectedRecord?.userName || "N/A"}</p>
                  </CardContent>
                </Card>
                
                <Card className="border-blue-100">
                  <CardHeader className="pb-2 flex flex-row items-center gap-2">
                    <Edit className="h-5 w-5 text-blue-500" />
                    <CardTitle className="text-md text-blue-700">Reaction Information</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-2">
                    <p className="font-medium">{selectedRecord?.reaction || "No reaction reported"}</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="history" className="space-y-4">
              <h3 className="text-md font-medium text-blue-700">Vaccination History</h3>
              <Card className="border-blue-100">
                <CardContent className="p-4">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4 border-l-2 border-blue-500 pl-4 py-2">
                      <div className="rounded-full bg-blue-100 p-2">
                        <Calendar className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">Vaccination Scheduled</p>
                        <p className="text-sm text-blue-500">
                          {selectedRecord?.vaccinationDate ? formatDate(selectedRecord.vaccinationDate) : 'Unknown date'}
                        </p>
                      </div>
                    </div>
                    
                    {selectedRecord?.status?.toLowerCase() === 'success' && (
                      <div className="flex items-center space-x-4 border-l-2 border-green-500 pl-4 py-2">
                        <div className="rounded-full bg-green-100 p-2">
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                        </div>
                        <div>
                          <p className="font-medium">Vaccination Completed</p>
                          <p className="text-sm text-blue-500">
                            {selectedRecord?.vaccinationDate ? formatDate(selectedRecord.vaccinationDate) : 'Unknown date'}
                          </p>
                        </div>
                      </div>
                    )}
                    
                    {selectedRecord?.status?.toLowerCase() === 'cancel' && (
                      <div className="flex items-center space-x-4 border-l-2 border-red-500 pl-4 py-2">
                        <div className="rounded-full bg-red-100 p-2">
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </div>
                        <div>
                          <p className="font-medium">Vaccination Cancelled</p>
                          <p className="text-sm text-blue-500">
                            {selectedRecord?.vaccinationDate ? formatDate(selectedRecord.vaccinationDate) : 'Unknown date'}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
              
              <div className="mt-4">
                <h3 className="text-md font-medium text-blue-700 mb-2">Reference Information</h3>
                <Card className="border-blue-100">
                  <CardContent className="p-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm font-medium text-blue-500">Tracking ID</p>
                        <p className="font-semibold">#{selectedRecord?.trackingID}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-blue-500">Booking ID</p>
                        <p className="font-semibold">#{selectedRecord?.bookingId}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="border-t border-blue-100 p-4 bg-blue-50">
            <DialogFooter>
              <Button
                onClick={() => {
                  setIsDetailModalOpen(false);
                  handleUpdateStatus(selectedRecord);
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Edit className="h-4 w-4 mr-2" />
                Update Status
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setIsDetailModalOpen(false)}
                className="border-blue-200 text-blue-700 hover:bg-blue-100"
              >
                Close
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Update Status Modal */}
      <Dialog open={isUpdateModalOpen} onOpenChange={setIsUpdateModalOpen}>
        <DialogContent className="max-w-md p-0 bg-white">
          <div className="bg-blue-600 p-6 text-white">
            <DialogTitle className="text-xl font-semibold">
              Update Vaccination Status
            </DialogTitle>
            <DialogDescription className="text-blue-100 mt-1">
              Change the status for this vaccination record
            </DialogDescription>
          </div>
          
          <div className="p-6 space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <p className="text-sm font-medium text-blue-700 mb-2">Current Status</p>
              <Badge className={`
                ${selectedRecord?.status?.toLowerCase() === 'success' ? 'bg-green-100 text-green-700' : ''}
                ${selectedRecord?.status?.toLowerCase() === 'schedule' ? 'bg-amber-100 text-amber-700' : ''}
                ${selectedRecord?.status?.toLowerCase() === 'waiting' ? 'bg-blue-100 text-blue-700' : ''}
                ${selectedRecord?.status?.toLowerCase() === 'cancel' ? 'bg-red-100 text-red-700' : ''}
                px-2.5 py-1 text-base
              `}>
                {selectedRecord?.status || "Unknown"}
              </Badge>
            </div>
            
            <div className="space-y-3">
              <p className="text-sm font-medium text-blue-700">Select New Status</p>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  onClick={() => updateTrackingStatus(selectedRecord.trackingID, "Success")}
                  variant="outline"
                  className="border-green-200 bg-green-50 hover:bg-green-100 text-green-700 h-auto py-3 flex flex-col items-center"
                >
                  <CheckCircle2 className="h-5 w-5 mb-1" />
                  <span>Completed</span>
                </Button>
                <Button
                  onClick={() => updateTrackingStatus(selectedRecord.trackingID, "Schedule")}
                  variant="outline"
                  className="border-amber-200 bg-amber-50 hover:bg-amber-100 text-amber-700 h-auto py-3 flex flex-col items-center"
                >
                  <Calendar className="h-5 w-5 mb-1" />
                  <span>Scheduled</span>
                </Button>
                <Button
                  onClick={() => updateTrackingStatus(selectedRecord.trackingID, "Waiting")}
                  variant="outline"
                  className="border-blue-200 bg-blue-50 hover:bg-blue-100 text-blue-700 h-auto py-3 flex flex-col items-center"
                >
                  <span>Waiting</span>
                </Button>
                <Button
                  onClick={() => updateTrackingStatus(selectedRecord.trackingID, "Cancel")}
                  variant="outline"
                  className="border-red-200 bg-red-50 hover:bg-red-100 text-red-700 h-auto py-3 flex flex-col items-center"
                >
                  <span>Cancel</span>
                </Button>
              </div>
            </div>
          </div>
          
          <div className="border-t border-blue-100 p-4 bg-blue-50">
            <Button 
              variant="outline" 
              onClick={() => setIsUpdateModalOpen(false)}
              className="w-full border-blue-200 text-blue-700 hover:bg-blue-100"
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TrackingAdmin; 