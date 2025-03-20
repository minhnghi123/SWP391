import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Filter, MoreHorizontal, Syringe, Calendar, Search, ChevronDown, ChevronUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import FormatDate from "../../../../utils/Date";
import Pagination from "../../Pagination";

const getReactionBadge = (reaction) => {
  switch (reaction?.toLowerCase()) {
    case "nothing":
      return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100" variant="outline">No Reaction</Badge>;
    default:
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100" variant="outline">{reaction || "N/A"}</Badge>;
  }
};

const getStatusBadge = (status) => {
  switch (status?.toLowerCase()) {
    case "success":
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100" variant="outline">Success</Badge>;
    case "schedule":
      return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100" variant="outline">Schedule</Badge>;
    case "waiting":
      return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100" variant="outline">Waiting</Badge>;
    case "cancel":
      return <Badge className="bg-red-100 text-red-800 hover:bg-red-100" variant="outline">Cancel</Badge>;
    case "in progress":
      return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100" variant="outline">In Progress</Badge>;
    default:
      return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100" variant="outline">{status || "N/A"}</Badge>;
  }
};

const CartTable = ({
  data,
  setSelectedRecord,
  setIsReactionModalOpen,
  setIsChangeScheduleModalOpen,
  filteredData,
  setFilteredData,
  sortData,
  sortOrder,
  setSortOrder,
  sortField,
  setSortField,
  handleFilter,
  handleViewDetails,
  handleUpdateStatus,
  currentPage,
  totalPages,
  paginatedData,
  childData,
  searchQuery,
  setSearchQuery,
  startIndex,
  endIndex,
  totalItems,
  onPageChange,
  statusSuccess,
  handleExpand,
  isExpand,
  array,
  linkList
}) => {
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
                <TableHead className="text-blue-700 text-center"></TableHead>
                <TableHead className="text-blue-700 text-center">ID</TableHead>
                <TableHead className="text-blue-700 text-center">Vaccine</TableHead>
                <TableHead className="text-blue-700 text-center">Parent</TableHead>
                <TableHead className="text-blue-700 text-center">Child Name</TableHead>
                <TableHead className="text-blue-700 text-center">Vaccination Date</TableHead>
                <TableHead className="text-blue-700 text-center">Progress</TableHead>
                <TableHead className="text-blue-700 text-center">Status</TableHead>
                <TableHead className="text-blue-700 text-center">Reaction</TableHead>
                <TableHead className="text-blue-700 text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.map((record) => (
                <>
                  <TableRow key={record.trackingID} className="hover:bg-blue-50/30 border-b border-blue-50">
                    <TableCell onClick={() => handleExpand(record)} className="text-center cursor-pointer">
                      {isExpand?.trackingID === record.trackingID ? (
                        <ChevronUp className="h-4 w-4 text-blue-500" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-blue-500" />
                      )}
                    </TableCell>
                    <TableCell className="font-medium text-blue-800 text-center">#{record.trackingID}</TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center">
                        <Syringe className="h-4 w-4 text-blue-500 mr-2" />
                        <span>{record.vaccineName}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">{record.userName}</TableCell>
                    <TableCell className="text-center">
                      {childData.find((item) => item.id === record.childId)?.name || "N/A"}
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center">
                        <Calendar className="h-4 w-4 text-blue-500 mr-2" />
                        {record.vaccinationDate ? FormatDate(record.vaccinationDate) : "N/A"}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      {(() => {
                        const chain = statusSuccess.find((chain) =>
                          chain.some((item) => item.trackingID === record.trackingID)
                        );
                        if (!chain) return "N/A";
                        const totalDoses = chain.length;
                        const successDoses = chain.filter((item) => item.status?.toLowerCase() === "success").length;
                        return `${successDoses}/${totalDoses}`;
                      })()}
                    </TableCell>

                    <TableCell className="text-center">
                      {(() => {
                        const findTrackingList = linkList(data);
                        const findArry = findTrackingList.find(subArray => subArray[0]?.trackingID === record.trackingID);
                        const checkSuccess = findArry && findArry.every(item => item.status.toLowerCase() === "success");
                        const checkCancle = findArry && findArry.some(item => item.status.toLowerCase() === "cancel");
                        // Nếu tìm thấy mảng con, kiểm tra xem tất cả phần tử trong đó đều có status "Success"
                        return checkSuccess ? getStatusBadge("Success") : checkCancle ? getStatusBadge("Cancel") : getStatusBadge("In Progress");
                      })()}
                    </TableCell>



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
                          {record.status?.toLowerCase() !== "cancel" && record.status?.toLowerCase() !== "success" && (
                            <DropdownMenuItem
                              className="text-blue-700 focus:bg-blue-50 focus:text-blue-800"
                              onClick={() => handleUpdateStatus(record)}
                            >
                              Update status
                            </DropdownMenuItem>
                          )}
                          {record.status?.toLowerCase() === "success" && (
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
                          {record.status?.toLowerCase() === "schedule" && (
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
                  {/* Expanded Section */}
                  {isExpand?.trackingID === record.trackingID && (
                    <TableRow className="bg-blue-50/20">
                      <TableCell colSpan={10}>
                        <div className="p-4">
                          <h4 className="text-blue-700 font-medium mb-2">All Doses</h4>
                          {array.length > 0 ? (
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead className="text-blue-700 text-center">ID</TableHead>
                                  <TableHead className="text-blue-700 text-center">Vaccination Date</TableHead>
                                  <TableHead className="text-blue-700 text-center">Status</TableHead>
                                  <TableHead className="text-blue-700 text-center">Reaction</TableHead>
                                  <TableHead className="text-blue-700 text-center">Action</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {array.map((item) => (
                                  <TableRow key={item.trackingID}>
                                    <TableCell className="text-center">#{item.trackingID}</TableCell>
                                    <TableCell className="text-center">
                                      {item.vaccinationDate ? FormatDate(item.vaccinationDate) : "N/A"}
                                    </TableCell>
                                    <TableCell className="text-center">{getStatusBadge(item.status)}</TableCell>
                                    <TableCell className="text-center">{getReactionBadge(item.reaction)}</TableCell>
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
                                            onClick={() => handleViewDetails(item)}
                                          >
                                            View details
                                          </DropdownMenuItem>
                                          {item.status?.toLowerCase() !== "cancel" &&
                                            item.status?.toLowerCase() !== "success" && (
                                              <DropdownMenuItem
                                                className="text-blue-700 focus:bg-blue-50 focus:text-blue-800"
                                                onClick={() => handleUpdateStatus(item)}
                                              >
                                                Update status
                                              </DropdownMenuItem>
                                            )}
                                          {item.status?.toLowerCase() === "success" && (
                                            <DropdownMenuItem
                                              className="text-blue-700 focus:bg-blue-50 focus:text-blue-800"
                                              onClick={() => {
                                                setSelectedRecord(item);
                                                setIsReactionModalOpen(true);
                                              }}
                                            >
                                              Record reaction
                                            </DropdownMenuItem>
                                          )}
                                          {item.status?.toLowerCase() === "schedule" && (
                                            <DropdownMenuItem
                                              className="text-blue-700 focus:bg-blue-50 focus:text-blue-800"
                                              onClick={() => {
                                                setSelectedRecord(item);
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
                          ) : (
                            <p className="text-blue-600">No related records found.</p>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  )}
                </>
              ))}
            </TableBody>
          </Table>
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          startIndex={startIndex}
          endIndex={endIndex}
          totalItems={totalItems}
          onPageChange={onPageChange}
        />
      </CardContent>
    </Card>
  );
};

export default CartTable;