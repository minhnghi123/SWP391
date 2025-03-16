"use client"

import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Download,
  Filter,
  MoreHorizontal,
  Search,
  Users,
  Syringe,
  Clock,
  AlertCircle,
  Check,
  X,
} from "lucide-react"
import { format, parseISO } from "date-fns"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import useAxios from "../../../utils/useAxios"
import FormatDate from "../../../utils/Date"

const url = import.meta.env.VITE_BASE_URL_DB
// Sample data based on the provided JSON


const getReactionBadge = (reaction) => {
  switch (reaction) {
    case "NO_REACTION":
      return (
        <Badge className="bg-green-100 text-green-800 hover:bg-green-100" variant="outline">
          No Reaction
        </Badge>
      )
    case "MILD_REACTION":
      return (
        <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100" variant="outline">
          Mild Reaction
        </Badge>
      )
    case "SEVERE_REACTION":
      return (
        <Badge className="bg-red-100 text-red-800 hover:bg-red-100" variant="outline">
          Severe Reaction
        </Badge>
      )
    default:
      return (
        <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100" variant="outline">
          {reaction}
        </Badge>
      )
  }
}

const getStatusBadge = (status) => {
  switch (status) {
    case "success":
      return (
        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100" variant="outline">
          Success
        </Badge>
      )
    case "inprogress":
      return (
        <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100" variant="outline">
          Scheduled
        </Badge>
      )
    case "cancelled":
      return (
        <Badge className="bg-red-100 text-red-800 hover:bg-red-100" variant="outline">
          Waiting
        </Badge>
      )
    default:
      return (
        <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100" variant="outline">
          {status}
        </Badge>
      )
  }
}

export function VaccinationTrackingDashboard() {
  const api = useAxios()
  const [data, setData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [childData, setChildData] = useState([])
  const [status, setStatus] = useState("all")

  // Add state variables for modals
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false)
  const [selectedRecord, setSelectedRecord] = useState(null)
  const [newStatus, setNewStatus] = useState("")

  useEffect(() => {
    const fetchData = async () => {
      const [vaccineRes, childRes] = await Promise.all([
        api.get(`${url}/VaccinesTracking/get-all-staff`),
        api.get(`${url}/Child/get-all-child`)
      ])
      if (vaccineRes.status === 200 && childRes.status === 200) {
        setData(vaccineRes.data)
        setChildData(childRes.data)
        setFilteredData(vaccineRes.data.filter((item) => item.previousVaccination === 0))
      }
    }
    fetchData();
  }, []);

  // Add handlers for modals
  const handleViewDetails = (record) => {
    const detailAll = data.filter((item) => item.bookingId === record.bookingId)
    let trackingChain = [];
    let currentRecord = record;

    while (currentRecord) {
      trackingChain.push(currentRecord);
      currentRecord = detailAll.find(item => item.previousVaccination === currentRecord.trackingID);
    }


    setSelectedRecord(trackingChain);
    setIsDetailModalOpen(true);
  }



  const handleUpdateStatus = (record) => {
    setSelectedRecord(record)
    setNewStatus(record.status)
    setIsStatusModalOpen(true)
  }

  const handleStatusUpdate = async () => {
    try {
      // Here you would typically make an API call to update the status
      // For example:
      // await api.put(`${url}/VaccinesTracking/update-status/${selectedRecord.trackingID}`, {
      //   status: newStatus
      // })

      // For now, let's just update the local state
      const updatedData = data.map(item =>
        item.trackingID === selectedRecord.trackingID
          ? { ...item, status: newStatus }
          : item
      )

      setData(updatedData)
      setFilteredData(updatedData.filter(item =>
        status === "all" || item.status.toLowerCase() === status
      ))

      setIsStatusModalOpen(false)
      // You might want to show a success notification here
    } catch (error) {
      console.error("Failed to update status:", error)
      // You might want to show an error notification here
    }
  }

  const uniquePatients = new Set(data.map((item) => item.userName)).size
  const totalVaccinations = data.length
  const uniqueChildren = new Set(data.map((item) => item.childId)).size

  const handleFilter = (status) => {
    if (status === "all") {
      setFilteredData(data)
    } else {
      setFilteredData(data.filter((item) => item.status.toLowerCase() === status))
    }
  }




  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold text-blue-700">Vaccination Tracking Dashboard</h1>

        <div className="flex items-center gap-2">
          <Button variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50 hover:text-blue-800">
            <Calendar className="h-4 w-4 mr-2" />
            {format(new Date(), "MMMM yyyy")}
          </Button>

          <Button variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-50 hover:text-blue-800">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Summary cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-blue-100 bg-white shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-blue-600">Total Patients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Users className="h-5 w-5 text-blue-500 mr-2" />
              <div className="text-2xl font-bold text-blue-800">{uniquePatients}</div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-100 bg-white shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-blue-600">Total Children</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-blue-500 mr-2"
              >
                <path d="M9 18h6"></path>
                <path d="M10 22h4"></path>
                <path d="m3 9 9-7 9 7v13H3V9z"></path>
              </svg>
              <div className="text-2xl font-bold text-blue-800">{uniqueChildren}</div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-100 bg-white shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-blue-600">Total Vaccinations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Syringe className="h-5 w-5 text-blue-500 mr-2" />
              <div className="text-2xl font-bold text-blue-800">{totalVaccinations}</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs and Tracking Table */}
      <Card className="border-blue-100 bg-white shadow-sm">
        <CardHeader className="border-b border-blue-50">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle className="text-blue-700">Vaccination Tracking Records</CardTitle>

            <div className="flex gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-[180px] border-blue-200 focus:ring-blue-400">
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-blue-500" />
                    <SelectValue placeholder="Filter by status" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all" onClick={() => handleFilter("all")}>All </SelectItem>
                  <SelectItem value="success" onClick={() => handleFilter("success")}>Success</SelectItem>
                  <SelectItem value="inprogress" onClick={() => handleFilter("inprogress")}> In Progress </SelectItem>
                  <SelectItem value="cancelled" onClick={() => handleFilter("cancelled")}>Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* <Tabs defaultValue="all" className="w-full sm:w-auto">
              <TabsList className="bg-blue-50">
                <TabsTrigger value="all" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                  All Records
                </TabsTrigger>
                <TabsTrigger value="success" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                  Success
                </TabsTrigger>
                <TabsTrigger value="pending" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                  Pending
                </TabsTrigger>
              </TabsList>
            </Tabs> */}
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {/* <div className="p-4 border-b border-blue-50 bg-blue-50/50">
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-blue-500" />
                <Input
                  placeholder="Search by name, vaccine..."
                  className="pl-8 border-blue-200 focus:border-blue-400 focus:ring-blue-400"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="flex gap-2">
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px] border-blue-200 focus:ring-blue-400">
                    <div className="flex items-center gap-2">
                      <Filter className="h-4 w-4 text-blue-500" />
                      <SelectValue placeholder="Filter by status" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all" onClick={() => handleFilter("all")}>All </SelectItem>
                    <SelectItem value="success" onClick={() => handleFilter("success")}>Success</SelectItem>
                    <SelectItem value="inprogress" onClick={() => handleFilter("inprogress")}> In Progress </SelectItem>
                    <SelectItem value="cancelled" onClick={() => handleFilter("cancelled")}>Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div> */}

          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-blue-50/50">
                <TableRow className="hover:bg-blue-50/80">
                  <TableHead className="text-blue-700">ID</TableHead>
                  <TableHead className="text-blue-700">Vaccine</TableHead>
                  <TableHead className="text-blue-700">Patient</TableHead>
                  <TableHead className="text-blue-700">Child Name</TableHead>
                  <TableHead className="text-blue-700">Vaccination Date</TableHead>
                  <TableHead className="text-blue-700">Status</TableHead>
                  <TableHead className="text-blue-700">Reaction</TableHead>
                  <TableHead className="text-blue-700">Action</TableHead>
                  <TableHead className="text-blue-700"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((record) => (
                  <TableRow key={record.trackingID} className="hover:bg-blue-50/30 border-b border-blue-50">
                    <TableCell className="font-medium text-blue-800">#{record.trackingID}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Syringe className="h-4 w-4 text-blue-500 mr-2" />
                        <span>{record.vaccineName}</span>
                      </div>
                    </TableCell>
                    <TableCell>{record.userName}</TableCell>
                    <TableCell>{childData.find((item) => item.id === record.childId)?.name}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 text-blue-500 mr-2" />
                        {FormatDate(record.vaccinationDate)}
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(record.status.toLowerCase())}</TableCell>
                    <TableCell>{getReactionBadge(record.reaction)}</TableCell>
                    {/* <TableCell>
                      <div className="text-sm text-gray-500">{record.administeredByDoctorName}</div>
                    </TableCell> */}
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="text-blue-700 hover:bg-blue-50">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="border-blue-100">
                          <DropdownMenuItem
                            className="text-blue-700 focus:bg-blue-50 focus:text-blue-800"
                            onClick={() => handleViewDetails(record)}
                          >
                            View details
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-blue-700 focus:bg-blue-50 focus:text-blue-800"
                            onClick={() => handleUpdateStatus(record)}
                          >
                            Update status
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-blue-700 focus:bg-blue-50 focus:text-blue-800">
                            Record reaction
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="p-4 flex justify-between items-center border-t border-blue-50 bg-blue-50/30">
            <div className="text-sm text-blue-700">
              Showing <span className="font-medium">{filteredData.length}</span> of{" "}
              <span className="font-medium">{filteredData.length}</span> records
            </div>

            <div className="flex gap-1">
              <Button variant="outline" size="sm" className="border-blue-200 text-blue-700 hover:bg-blue-50">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" className="border-blue-200 bg-blue-600 text-white hover:bg-blue-700">
                1
              </Button>
              <Button variant="outline" size="sm" className="border-blue-200 text-blue-700 hover:bg-blue-50">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Interval Information */}
      <Card className="border-blue-100 bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="text-blue-700">Vaccination Interval Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredData.map((record) => (
              <div
                key={`interval-${record.trackingID}`}
                className="p-4 border border-blue-100 rounded-lg bg-blue-50/30"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-3">
                  <div className="flex items-center">
                    <Syringe className="h-5 w-5 text-blue-600 mr-2" />
                    <h3 className="font-medium text-blue-800">
                      {record.vaccineName} - {record.userName}
                    </h3>
                  </div>
                  {getStatusBadge(record.status.toLowerCase())}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center">
                    <div className="p-2 rounded-full bg-blue-100 mr-3">
                      <Clock className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-xs text-blue-600">Minimum Interval Date</div>
                      <div className="font-medium">{FormatDate(record.minimumIntervalDate)}</div>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="p-2 rounded-full bg-blue-100 mr-3">
                      <Calendar className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-xs text-blue-600">Vaccination Date</div>
                      <div className="font-medium">{FormatDate(record.vaccinationDate)}</div>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="p-2 rounded-full bg-blue-100 mr-3">
                      <AlertCircle className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-xs text-blue-600">Maximum Interval Date</div>
                      <div className="font-medium">{FormatDate(record.maximumIntervalDate)}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      x``
      {/* Detail Modal */}
      <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
        <DialogContent className="sm:max-w-[600px] border-blue-100">
          <DialogHeader>
            <DialogTitle className="text-blue-700 text-xl">Vaccination Details</DialogTitle>
            <DialogDescription>Complete information about the vaccination record.</DialogDescription>
          </DialogHeader>


          {selectedRecord?.length > 0 && selectedRecord.map(item => {
            const fields = [
              { label: "Minimum Interval Date", value: item.minimumIntervalDate, icon: Clock },
              { label: "Vaccination Date", value: item.vaccinationDate, icon: Calendar },
              { label: "Maximum Interval Date", value: item.maximumIntervalDate, icon: AlertCircle }
            ];

            return (
              <div key={item.trackingID} className="bg-blue-50/50 p-4 rounded-lg space-y-4">
                <h4 className="font-medium text-blue-700">Vaccination Timeline</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {fields.map(({ label, value, icon: Icon }) => (
                    <div key={label} className="flex items-center">
                      <div className="p-2 rounded-full bg-blue-100 mr-3">
                        <Icon className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <div className="text-xs text-blue-600">{label}</div>
                        <div className="font-medium">{FormatDate(value)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}




          <DialogFooter>
            <Button
              variant="outline"
              className="border-blue-200 text-blue-700 hover:bg-blue-50"
              onClick={() => setIsDetailModalOpen(false)}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Status Update Modal */}
      <Dialog open={isStatusModalOpen} onOpenChange={setIsStatusModalOpen}>
        <DialogContent className="sm:max-w-[425px] border-blue-100">
          <DialogHeader>
            <DialogTitle className="text-blue-700">Update Vaccination Status</DialogTitle>
            <DialogDescription>Change the status of this vaccination record.</DialogDescription>
          </DialogHeader>

          {selectedRecord && (
            <div className="py-4">
              <div className="mb-4">
                <div className="flex items-center mb-2">
                  <Syringe className="h-4 w-4 text-blue-600 mr-2" />
                  <p className="font-medium">{selectedRecord.vaccineName}</p>
                </div>
                <p className="text-sm text-muted-foreground">Patient: {selectedRecord.userName}</p>
              </div>

              <RadioGroup value={newStatus} onValueChange={setNewStatus} className="space-y-3">
                <div className="flex items-center space-x-2 border border-blue-100 p-3 rounded-md hover:bg-blue-50/50">
                  <RadioGroupItem value="success" id="status-success" className="text-blue-600" />
                  <Label htmlFor="status-success" className="flex items-center">
                    <Check className="h-4 w-4 text-blue-600 mr-2" />
                    <span>Success</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 border border-blue-100 p-3 rounded-md hover:bg-blue-50/50">
                  <RadioGroupItem value="inprogress" id="status-inprogress" className="text-blue-600" />
                  <Label htmlFor="status-inprogress" className="flex items-center">
                    <Clock className="h-4 w-4 text-yellow-600 mr-2" />
                    <span>In Progress</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 border border-blue-100 p-3 rounded-md hover:bg-blue-50/50">
                  <RadioGroupItem value="cancelled" id="status-cancelled" className="text-blue-600" />
                  <Label htmlFor="status-cancelled" className="flex items-center">
                    <X className="h-4 w-4 text-red-600 mr-2" />
                    <span>Cancelled</span>
                  </Label>
                </div>
              </RadioGroup>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              className="border-blue-200 text-blue-700 hover:bg-blue-50"
              onClick={() => setIsStatusModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              className="bg-blue-600 text-white hover:bg-blue-700"
              onClick={handleStatusUpdate}
              disabled={!newStatus || newStatus === selectedRecord?.status.toLowerCase()}
            >
              Update Status
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
export default VaccinationTrackingDashboard
