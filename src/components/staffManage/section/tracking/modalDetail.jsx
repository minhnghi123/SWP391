import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { User, Calendar, AlertTriangle, Syringe, CheckCircle, Clock } from "lucide-react";
import FormatDate from "../../../../utils/Date";
import { Badge } from "@/components/ui/badge";

const getStatusBadge = (status) => {
  switch (status?.toLowerCase()) {
    case "success":
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100" variant="outline">Completed</Badge>;
    case "schedule":
      return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100" variant="outline">Scheduled</Badge>;
    case "waiting":
      return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100" variant="outline">Waiting</Badge>;
    case "cancel":
      return <Badge className="bg-red-100 text-red-800 hover:bg-red-100" variant="outline">Cancelled</Badge>;
    default:
      return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100" variant="outline">{status || "Unknown"}</Badge>;
  }
};

const getReactionBadge = (reaction) => {
  switch (reaction?.toLowerCase()) {
    case "nothing":
      return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100" variant="outline">No Reaction</Badge>;
    default:
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100" variant="outline">{reaction || "Unknown"}</Badge>;
  }
};

const ModalDetail = ({ isDetailModalOpen, setIsDetailModalOpen, selectedRecord, childData }) => {
  const currentDate = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }); // March 18, 2025

  return (
    <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
      <DialogContent className="sm:max-w-[700px] border-gray-200 bg-white rounded-xl shadow-xl p-6">
        <DialogHeader className="border-b border-gray-200 pb-4">
          <div className="flex items-center space-x-3">
            <Syringe className="h-6 w-6 text-blue-600" />
            <DialogTitle className="text-blue-800 text-2xl font-semibold">Vaccination Record Details</DialogTitle>
          </div>
          <DialogDescription className="text-gray-600 mt-1">
            Detailed information about the vaccination appointment.
          </DialogDescription>
          <div className="text-sm text-gray-500 mt-1">Last updated: {currentDate}</div>
        </DialogHeader>

        {selectedRecord && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            {/* Patient Information */}
            <div className="bg-blue-50/50 p-5 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md">
              <div className="flex items-center mb-4">
                <User className="h-5 w-5 text-blue-600 mr-2" />
                <h3 className="text-lg font-semibold text-blue-800">Patient Information</h3>
              </div>
              <div className="space-y-3 text-sm text-gray-700">
                <div className="flex items-center">
                  <span className="font-medium text-blue-700 w-24">Name:</span>
                  <span>{selectedRecord?.userName || "N/A"}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-medium text-blue-700 w-24">Child:</span>
                  <span>{childData?.find((item) => item.id === selectedRecord.childId)?.name || "N/A"}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-medium text-blue-700 w-24">Vaccine:</span>
                  <span>{selectedRecord?.vaccineName || "N/A"}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-medium text-blue-700 w-24">Status:</span>
                  {getStatusBadge(selectedRecord?.status)}
                </div>
              </div>
              {selectedRecord?.reaction && (
                <div className="mt-4 pt-4 border-t border-blue-100">
                  <div className="flex items-center mb-2">
                    <AlertTriangle className="h-4 w-4 text-blue-600 mr-2" />
                    <span className="text-sm font-medium text-blue-800">Reaction Notes</span>
                  </div>
                  {selectedRecord.reaction.toLowerCase() !== "nothing" ? (
                    <p>{getReactionBadge(selectedRecord.reaction)}</p>
                  ) : (
                    <p className="text-sm text-gray-600">No Reaction</p>
                  )}
                </div>
              )}
            </div>

            {/* Vaccination Timeline */}
            <div className="bg-blue-50/50 p-5 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md">
              <div className="flex items-center mb-4">
                <Calendar className="h-5 w-5 text-blue-600 mr-2" />
                <h3 className="text-lg font-semibold text-blue-800">Vaccination Timeline</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-center bg-green-50 p-3 rounded-md shadow-sm transition-all duration-200 hover:bg-green-100">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-3" />
                  <div>
                    <span className="text-sm font-medium text-gray-800 block">Vaccination Date</span>
                    <span className="text-sm text-gray-600">{FormatDate(selectedRecord?.vaccinationDate) || "Not scheduled"}</span>
                  </div>
                </div>
                <div className="flex items-center bg-yellow-50 p-3 rounded-md shadow-sm transition-all duration-200 hover:bg-yellow-100">
                  <Clock className="h-5 w-5 text-yellow-600 mr-3" />
                  <div>
                    <span className="text-sm font-medium text-gray-800 block">Min Interval</span>
                    <span className="text-sm text-gray-600">{FormatDate(selectedRecord?.minimumIntervalDate) || "N/A"}</span>
                  </div>
                </div>
                <div className="flex items-center bg-red-50 p-3 rounded-md shadow-sm transition-all duration-200 hover:bg-red-100">
                  <AlertTriangle className="h-5 w-5 text-red-600 mr-3" />
                  <div>
                    <span className="text-sm font-medium text-gray-800 block">Max Interval</span>
                    <span className="text-sm text-gray-600">{FormatDate(selectedRecord?.maximumIntervalDate) || "N/A"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <DialogFooter className="border-t border-gray-200 pt-4 mt-6">
          <Button
            variant="outline"
            className="w-full sm:w-auto border-gray-300 text-blue-700 hover:bg-blue-50 hover:text-blue-800 transition-all duration-200"
            onClick={() => setIsDetailModalOpen(false)}
          >
            Close Details
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ModalDetail;