import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Filter, MoreHorizontal, ChevronLeft, ChevronRight, Syringe, Calendar, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import FormatDate from "../../../../utils/Date";

const getReactionBadge = (reaction) => {
  switch (reaction.toLowerCase()) {
    case "nothing":
      return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100" variant="outline">No Reaction</Badge>;
    default:
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100" variant="outline">{reaction}</Badge>;
  }
};

const getStatusBadge = (status) => {
  switch (status.toLowerCase()) {
    case "success":
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100" variant="outline">Success</Badge>;
    case "schedule":
      return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100" variant="outline">Schedule</Badge>;
    case "waiting":
      return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100" variant="outline">Waiting</Badge>;
    case "cancel":
      return <Badge className="bg-red-100 text-red-800 hover:bg-red-100" variant="outline">Cancel</Badge>;
    default:
      return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100" variant="outline">{status}</Badge>;
  }
};

const CartTable = ({setSelectedRecord, setIsReactionModalOpen, setIsChangeScheduleModalOpen, filteredData,setFilteredData,sortData,  sortOrder, setSortOrder, sortField, setSortField, handleFilter,handleViewDetails, handleUpdateStatus,handlePageChange, currentPage, totalPages,rowsPerPage, paginatedData,childData, searchQuery,setSearchQuery}) => {

  return (
    <Card className="border-blue-100 bg-white shadow-sm">
      <CardHeader className="border-b border-blue-50">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <CardTitle className="text-blue-700">Vaccination Tracking Records</CardTitle>
          <div className="flex flex-wrap gap-2">
            <div className="relative w-[250px]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-500" />
              <Input
                placeholder="Search by name, vaccine..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-blue-200 focus:border-blue-400 focus:ring-blue-400"
              />
            </div>
            <Select defaultValue="all" onValueChange={handleFilter}>
              <SelectTrigger className="w-[180px] border-blue-200 focus:ring-blue-400">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-blue-500" />
                  <SelectValue placeholder="Filter by status" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Records</SelectItem>
                <SelectItem value="success">Success</SelectItem>
                <SelectItem value="schedule">Scheduled</SelectItem>
                <SelectItem value="waiting">Waiting</SelectItem>
                <SelectItem value="cancel">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Select
              value={sortField}
              onValueChange={(value) => {
                setSortField(value);
                setFilteredData(sortData(filteredData));
              }}
            >
              <SelectTrigger className="w-[180px] border-blue-200 focus:ring-blue-400">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-blue-500" />
                  <SelectValue placeholder="Sort by" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="vaccinationDate">Date</SelectItem>
                <SelectItem value="status">Status</SelectItem>
                <SelectItem value="vaccineName">Vaccine Name</SelectItem>
                <SelectItem value="userName">Parent Name</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="outline"
              onClick={() => {
                setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                setFilteredData(sortData(filteredData));
              }}
              className="border-blue-200 text-blue-700 hover:bg-blue-50"
            >
              {sortOrder === "asc" ? "↑" : "↓"}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-blue-50/50">
              <TableRow className="hover:bg-blue-50/80">
                <TableHead className="text-blue-700 text-center">ID</TableHead>
                <TableHead className="text-blue-700 text-center">Vaccine</TableHead>
                <TableHead className="text-blue-700 text-center">Patient</TableHead>
                <TableHead className="text-blue-700 text-center">Child Name</TableHead>
                <TableHead className="text-blue-700 text-center">Vaccination Date</TableHead>
                <TableHead className="text-blue-700 text-center">Status</TableHead>
                <TableHead className="text-blue-700 text-center">Reaction</TableHead>
                <TableHead className="text-blue-700 text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.map((record) => (
                <TableRow key={record.trackingID} className="hover:bg-blue-50/30 border-b border-blue-50">
                  <TableCell className="font-medium text-blue-800 text-center">#{record.trackingID}</TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center">
                      <Syringe className="h-4 w-4 text-blue-500 mr-2" />
                      <span>{record.vaccineName}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">{record.userName}</TableCell>
                  <TableCell className="text-center">{childData.find((item) => item.id === record.childId)?.name}</TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center">
                      <Calendar className="h-4 w-4 text-blue-500 mr-2" />
                      {record.vaccinationDate ? FormatDate(record.vaccinationDate) : "N/A"}
                    </div>
                  </TableCell>
                  <TableCell className="text-center"  >{getStatusBadge(record.status.toLowerCase())}</TableCell>
                  <TableCell className="text-center">{getReactionBadge(record.reaction)}</TableCell>
                  <TableCell className="text-center">
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
                        {record.status.toLowerCase() !== 'cancel' && record.status.toLowerCase() !== 'success' && (
                          <DropdownMenuItem
                            className="text-blue-700 focus:bg-blue-50 focus:text-blue-800"
                            onClick={() => handleUpdateStatus(record)}
                          >
                            Update status
                          </DropdownMenuItem>
                        )}
                        {record.status.toLowerCase() === "success" && (
                          <DropdownMenuItem
                            className="text-blue-700 focus:bg-blue-50 focus:text-blue-800"
                            onClick={() => {
                              setSelectedRecord(record);
                              setIsReactionModalOpen(true);
                            }}
                          >
                            Record reaction
                          </DropdownMenuItem>
                        )}
                        {record.status.toLowerCase() === "schedule" && (
                          <DropdownMenuItem
                            className="text-blue-700 focus:bg-blue-50 focus:text-blue-800"
                            onClick={() => {
                              setSelectedRecord(record);
                              setIsChangeScheduleModalOpen(true);
                            }}
                          >
                            Change Schedule
                          </DropdownMenuItem>
                        )}
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
            Showing <span className="font-medium">{(currentPage - 1) * rowsPerPage + 1}</span> to{" "}
            <span className="font-medium">{Math.min(currentPage * rowsPerPage, filteredData.length)}</span>{" "}
            of <span className="font-medium">{filteredData.length}</span> records
          </div>
          <div className="flex gap-1">
            <Button
              variant="outline"
              size="sm"
              className="border-blue-200 text-blue-700 hover:bg-blue-50"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            {[...Array(totalPages)].map((_, index) => (
              <Button
                key={index + 1}
                variant="outline"
                size="sm"
                className={`border-blue-200 ${currentPage === index + 1
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "text-blue-700 hover:bg-blue-50"}`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </Button>
            ))}
            <Button
              variant="outline"
              size="sm"
              className="border-blue-200 text-blue-700 hover:bg-blue-50"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CartTable;