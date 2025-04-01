import { Card, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Syringe, Calendar, ChevronDown, ChevronUp, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import FormatDate from "../../../../utils/Date";
import Pagination from "../../Pagination";
import React from "react";
const getReactionBadge = (reaction) => {
  switch (reaction?.toLowerCase()) {
    case "nothing":
      return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100" variant="outline">No Reaction</Badge>;
    default:
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100" variant="outline">{reaction || "N/A"}</Badge>;
  }
};

const getStatusBadge = (status, isOverdue) => {
  if (isOverdue) {
    return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100" variant="outline">Overdue</Badge>;
  }

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

const isOverdue = (maximumIntervalDate, status) => {
  if (!maximumIntervalDate) return false;
  if (status?.toLowerCase() !== "schedule" && status?.toLowerCase() !== "waiting") return false;
  return new Date() > new Date(maximumIntervalDate);
};

const CartTable = ({
  data,
  setSelectedRecord,
  setIsReactionModalOpen,
  setIsChangeScheduleModalOpen,
  handleViewDetails,
  handleUpdateStatus,
  currentPage,
  totalPages,
  paginatedData,
  childData,
  startIndex,
  endIndex,
  totalItems,
  onPageChange,
  statusSuccess,
  handleExpand,
  isExpand,
  array,
  linkList,
  searchQuery,
  setSearchQuery
}) => {
  return (
    <Card className="border-blue-100 bg-white shadow-sm">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          {paginatedData.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 px-4">
              <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                <Search className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No Records Found</h3>
              <p className="text-gray-500 text-center max-w-md">
                {searchQuery 
                  ? "We couldn't find any records matching your search criteria. Try adjusting your search terms."
                  : "There are no vaccination records to display at the moment."}
              </p>
              {searchQuery && (
                <Button
                  variant="outline"
                  className="mt-4 border-blue-200 text-blue-700 hover:bg-blue-50"
                  onClick={() => setSearchQuery("")}
                >
                  Clear Search
                </Button>
              )}
            </div>
          ) : (
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
                {paginatedData.map((record, index) => {
                  const overdue = isOverdue(record.maximumIntervalDate, record.status);

                  return (
                    // Use Fragment with key to wrap multiple rows
                    <React.Fragment key={record.trackingID}>
                      <TableRow className="hover:bg-blue-50/30 border-b border-blue-50">
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
                            const checkCancel = findArry && findArry.some(item => item.status.toLowerCase() === "cancel");
                            const checkOverdue = findArry && findArry.some(item => isOverdue(item.maximumIntervalDate, item.status));

                            if (checkSuccess) return getStatusBadge("Success");
                            if (checkCancel) return getStatusBadge("Cancel");
                            if (checkOverdue) return getStatusBadge("Overdue");
                            return getStatusBadge("In Progress");
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
                                onClick={() => handleViewDetails(record, 'all')}
                              >
                                View details
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                      {/* Expanded Section */}
                      {isExpand?.trackingID === record.trackingID && (
                        <TableRow key={`${record.trackingID}-expanded`}>
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
                                    {array.map((item) => {
                                      const itemOverdue = isOverdue(item.maximumIntervalDate, item.status);

                                      return (
                                        <TableRow key={item.trackingID}>
                                          <TableCell className="text-center">#{item.trackingID}</TableCell>
                                          <TableCell className="text-center">
                                            {item.vaccinationDate ? FormatDate(item.vaccinationDate) : "N/A"}
                                          </TableCell>
                                          <TableCell className="text-center">
                                            {getStatusBadge(item.status, itemOverdue)}
                                          </TableCell>
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
                                                  onClick={() => handleViewDetails(item, 'each')}
                                                >
                                                  View details
                                                </DropdownMenuItem>
                                                {itemOverdue ? (
                                                  <DropdownMenuItem
                                                    className="text-blue-700 focus:bg-blue-50 focus:text-blue-800"
                                                    onClick={() => handleUpdateStatus(item)}
                                                  >
                                                    Update status
                                                  </DropdownMenuItem>
                                                ) : (
                                                  <>
                                                    {item.status?.toLowerCase() !== "cancel" &&
                                                      item.status?.toLowerCase() !== "success" &&
                                                      item.status?.toLowerCase() !== "waiting" && (
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
                                                    {item.status?.toLowerCase() === "schedule" && item.previousVaccination === 0 && (
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
                                                  </>
                                                )}
                                              </DropdownMenuContent>
                                            </DropdownMenu>
                                          </TableCell>
                                        </TableRow>
                                      );
                                    })}
                                  </TableBody>
                                </Table>
                              ) : (
                                <p className="text-blue-600">No related records found.</p>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      )}
                    </React.Fragment>
                  );
                })}
              </TableBody>
            </Table>
          )}
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