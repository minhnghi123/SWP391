import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, RefreshCcw, ChevronLeft, ChevronRight } from "lucide-react";
import formatCurrency from "../../../../utils/calculateMoney";
import { Badge } from "@/components/ui/badge";
const getStatusBadge = (status) => {
  const variants = {
    Pending: <Badge variant="warning" className="bg-yellow-100 text-yellow-800">Pending</Badge>,
    Success: <Badge variant="success" className="bg-green-100 text-green-800">Success</Badge>,
    Refund: <Badge variant="destructive" className="bg-red-100 text-red-800">Refunded</Badge>,
    default: <Badge variant="secondary" className="bg-gray-100 text-gray-800">{status}</Badge>
  };
  return variants[status] || variants.default;
};
const CardTable = ({currentItems, handleOpenModal, handleOpenEditModal, handleConfirm, loading, setModalRefund, setSelectedBooking, setRefundPercentage, handlePageChange, currentPage, totalPages, startIndex, endIndex, filteredAppointments}) => {
    return (
        <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-blue-50/50">
                <TableHead className=" text-blue-700">Booking ID</TableHead>
                <TableHead className=" text-blue-700">Parent Name</TableHead>
                <TableHead className=" text-blue-700">Phone Number</TableHead>
                <TableHead className=" text-blue-700 p-4">Amount</TableHead>
                <TableHead className=" text-blue-700">Payment Method</TableHead>
                <TableHead className=" text-blue-700 text-center">Status</TableHead>
                <TableHead className=" text-blue-700 text-c">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentItems.map((appointment) => (
                <TableRow key={appointment.id} className="hover:bg-blue-50/30 border-b border-blue-50">
                  <TableCell className="font-medium ">#{appointment.id}</TableCell>
                  <TableCell className="">{appointment.parentName}</TableCell>
                  <TableCell className="">{appointment.phoneNumber}</TableCell>
                  <TableCell className=" font-medium">
                    {formatCurrency(appointment.amount)} VND
                  </TableCell>
                  <TableCell className="">
                    <div className="flex items-center gap-2 ">
                      {appointment.paymentMethod === "Cash" ? (
                        <svg
                          className="h-4 w-4 text-green-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="h-4 w-4 text-blue-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                          />
                        </svg>
                      )}
                      {appointment.paymentMethod}
                    </div>
                  </TableCell>
                  <TableCell className="text-center">{getStatusBadge(appointment.status)}</TableCell>
                  <TableCell className="text-center">
                    <div className="flex justify-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleOpenModal(appointment)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      {appointment.status === "Pending" && (
                        <>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleOpenEditModal(appointment)}
                          >
                            <svg
                              className="h-4 w-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                              />
                            </svg>
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-green-600 hover:text-green-700 hover:bg-green-50"
                            onClick={() => handleConfirm(appointment)}
                          >
                            <svg
                              className="h-4 w-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </Button>
                        </>
                      )}
                      {appointment?.status.toLowerCase() === "success" &&
                        appointment?.paymentMethod.toLowerCase() === "momo" && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            onClick={() => {
                              setModalRefund(true)
                              setSelectedBooking(appointment)
                              const checkFirstDose = tracking.find(item => item.bookingId === appointment.id && item.previousVaccination === 0 && item.status.toLowerCase() === "success")
                              setRefundPercentage(checkFirstDose ? 50 : 100)
                            }}
                            disabled={loading}
                          >
                            <RefreshCcw className="h-4 w-4" />
                          </Button>
                        )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

        
           <div className="p-4 flex justify-between items-center border-t border-blue-50 bg-blue-50/30">
            <div className="text-sm text-blue-700">
              Showing <span className="font-medium">{startIndex + 1} </span> to <span className="font-medium">{Math.min(endIndex, filteredAppointments.length)}</span> of <span className="font-medium">{filteredAppointments.length}</span> entries
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="h-8 w-8 p-0 border-blue-200"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => handlePageChange(page)}
                  className={`h-8 w-8 p-0 border-blue-200 ${
                    currentPage === page
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "text-blue-700 hover:bg-blue-50"
                  }`}
                >
                  {page}
                </Button>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="h-8 w-8 p-0"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

        </CardContent>
      </Card>
    )
}

export default CardTable;
