import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, RefreshCcw, ChevronLeft, ChevronRight } from "lucide-react";
import formatCurrency from "../../../../utils/calculateMoney";
import { Badge } from "@/components/ui/badge";
import Pagination from "../../Pagination";
import formatDate from "@/utils/Date";
const getStatusBadge = (status) => {
  const variants = {
    Pending: <Badge variant="warning" className="bg-yellow-100 text-yellow-800">Pending</Badge>,
    Success: <Badge variant="success" className="bg-green-100 text-green-800">Success</Badge>,
    Refund: <Badge variant="destructive" className="bg-red-100 text-red-800">Refunded</Badge>,
    default: <Badge variant="secondary" className="bg-gray-100 text-gray-800">{status}</Badge>
  };
  return variants[status] || variants.default;
};
const CardTable = ({
  paginatedData, handleOpenModal, handleOpenEditModal, setIsModalConfirmOpen,
  loading, setModalRefund, setSelectedBooking, setRefundPercentage,
  currentPage, totalPages, startIndex, endIndex, totalItems, onPageChange,
  tracking
}) => {
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
              <TableHead className=" text-blue-700 text-center">Payment Method</TableHead>
              <TableHead className=" text-blue-700 text-center">Status</TableHead>
              <TableHead className=" text-blue-700 text-center">Create At</TableHead>
              <TableHead className=" text-blue-700 text-c">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((appointment,index) => (
              <TableRow key={index} className="hover:bg-blue-50/30 border-b border-blue-50">
                <TableCell className="font-medium ">#{appointment.id}</TableCell>
                <TableCell className="">{appointment.parentName}</TableCell>
                <TableCell className="">{appointment.phoneNumber}</TableCell>
                <TableCell className=" font-medium">
                  {formatCurrency(appointment.amount)} VND
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex items-center gap-2 justify-center ">
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
                <TableCell className="text-center">{formatDate(appointment.createdAt)}</TableCell>
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
                          onClick={() => {
                            setIsModalConfirmOpen(true)
                            setSelectedBooking(appointment)
                          }}
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
                      (new Date() - new Date(appointment.createdAt) <= 48 * 60 * 60 * 1000 && (
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
                      ))}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>


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
  )
}

export default CardTable;
