import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Syringe, CheckCircle, Clock, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import formatDate from "../../../../utils/Date";

const getReactionBadge = (reaction) => {
  switch (reaction?.toLowerCase()) {
    case "nothing":
      return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100" variant="outline">No Reaction</Badge>;
    default:
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100" variant="outline">{reaction || "N/A"}</Badge>;
  }
};

const getStatusBadge = (status, isOverdue) => {
  // Nếu mũi tiêm bị "Overdue", hiển thị trạng thái "Overdue"
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

export default function ModalDetailDoes({ isDetailModalOpen, setIsDetailModalOpen, selectedRecords, childData }) {
  return (
    <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
      <DialogContent className="sm:max-w-[950px] bg-white rounded-2xl shadow-2xl p-0 overflow-hidden">
        <DialogHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-full">
              <Syringe className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <DialogTitle className="text-2xl font-bold text-gray-900">Vaccination Dose Details</DialogTitle>
              <DialogDescription className="text-gray-600 mt-1">
                Comprehensive overview of vaccination records
              </DialogDescription>
            </div>
          </div>
          <div className="text-xs text-gray-500 mt-2">Last updated: {formatDate(new Date())}</div>
        </DialogHeader>

        <div className="p-6">
          {selectedRecords && selectedRecords.length > 0 ? (
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
              <div className="p-4 border-b border-gray-100">
                <div className="flex items-center space-x-2">
                  <Syringe className="h-4 w-4 text-blue-500" />
                  <h3 className="text-lg font-semibold text-gray-900">Dose Overview</h3>
                </div>
              </div>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gray-50">
                      {[
                        "Dose ID",
                        "Vaccine",
                        "Child",
                        "Vaccination Date",
                        "Min Interval",
                        "Max Interval",
                        "Status",
                        "Reaction"
                      ].map((header) => (
                        <TableHead key={header} className="text-gray-700 font-semibold text-center py-3">
                          {header}
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {selectedRecords.map((record) => (
                      <TableRow 
                        key={record.trackingID} 
                        className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                      >
                        <TableCell className="text-center py-4">
                          <span className="font-medium text-gray-800">#{record.trackingID}</span>
                        </TableCell>
                        <TableCell className="text-center py-4">
                          <div className="flex items-center justify-center space-x-2">
                            <Syringe className="h-4 w-4 text-blue-400" />
                            <span className="text-gray-700">{record.vaccineName}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-center py-4 text-gray-700">
                          {childData?.find((item) => item.id === record.childId)?.name || "N/A"}
                        </TableCell>
                        <TableCell className="text-center py-4">
                          <div className="flex items-center justify-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-400" />
                            <span className="text-gray-700">
                              {record.vaccinationDate ? formatDate(record.vaccinationDate) : "N/A"}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-center py-4">
                          <div className="flex items-center justify-center space-x-2">
                            <Clock className="h-4 w-4 text-yellow-400" />
                            <span className="text-gray-700">
                              {record.minimumIntervalDate ? formatDate(record.minimumIntervalDate) : "N/A"}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-center py-4">
                          <div className="flex items-center justify-center space-x-2">
                            <AlertTriangle className="h-4 w-4 text-red-400" />
                            <span className="text-gray-700">
                              {record.maximumIntervalDate ? formatDate(record.maximumIntervalDate) : "N/A"}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="text-center py-4">
                          {
                            isOverdue(record.maximumIntervalDate,record.status) ? getStatusBadge('Overdue') : getStatusBadge(record.status)
                          }
                        </TableCell>
                        <TableCell className="text-center py-4">
                          {getReactionBadge(record.reaction)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <Syringe className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No vaccination records available</p>
            </div>
          )}
        </div>

        <DialogFooter className="bg-gray-50 p-4 border-t border-gray-100">
          <Button
            variant="outline"
            className="w-full sm:w-auto bg-white border-gray-200 text-gray-700 hover:bg-gray-100 hover:border-gray-300 transition-all duration-200 rounded-lg px-6 py-2"
            onClick={() => setIsDetailModalOpen(false)}
          >
            Close Detail
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}