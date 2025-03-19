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
      <DialogContent className="sm:max-w-[700px] border-gray-200 bg-white rounded-lg shadow-lg p-6">
        <DialogHeader className="border-b border-gray-200 pb-4">
          <DialogTitle className="text-blue-800 text-2xl font-semibold">Vaccination Record</DialogTitle>
          <DialogDescription className="text-gray-600">
            Complete details and timeline of the vaccination appointment
          </DialogDescription>
          <div className="text-sm text-gray-500 mt-1">Last updated: {currentDate}</div>
        </DialogHeader>

        {selectedRecord && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            {/* Patient Information */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center mb-3">
                <User className="h-5 w-5 text-blue-600 mr-2" />
                <h3 className="text-lg font-semibold text-blue-800">Patient Information</h3>
              </div>
              <div className="space-y-2 text-sm text-gray-700">
                <p><span className="font-medium">Name:</span> {selectedRecord?.userName || "N/A"}</p>
                <p><span className="font-medium">Child:</span> {childData?.find((item) => item.id === selectedRecord.childId)?.name || "N/A"}</p>
                <p><span className="font-medium">Vaccine:</span> {selectedRecord?.vaccineName || "N/A"}</p>
              </div>
              {selectedRecord?.reaction && (
                <div className="mt-4">
                  <div className="flex items-center mb-1">
                    <AlertTriangle className="h-4 w-4 text-blue-600 mr-2" />
                    <span className="text-sm font-medium text-blue-800">Reaction Notes</span>
                  </div>
                  {/* <div className="text-sm text-gray-700">{(selectedRecord?.reaction)}</div> */}
                  {
                    selectedRecord.status.toLowerCase() !== 'nothing' ? (
                      <p>{getReactionBadge(selectedRecord.reaction)}</p>
                    ) : (
                      <p>No Reaction</p>
                    )
                  }
                </div>
              )}
            </div>

            {/* Vaccination Timeline */}
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center mb-3">
                <Calendar className="h-5 w-5 text-blue-600 mr-2" />
                <h3 className="text-lg font-semibold text-blue-800">Vaccination Timeline</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center bg-green-100 p-2 rounded-md">
                  <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                  <span className="text-sm font-medium text-gray-800">
                    Vaccination Date: {FormatDate(selectedRecord?.vaccinationDate) || "Not scheduled"}
                  </span>
                </div>
                <div className="flex items-center bg-yellow-100 p-2 rounded-md">
                  <Clock className="h-4 w-4 text-yellow-600 mr-2" />
                  <span className="text-sm font-medium text-gray-800">
                    Min Interval: {FormatDate(selectedRecord?.minimumIntervalDate) || "N/A"}
                  </span>
                </div>
                <div className="flex items-center bg-red-100 p-2 rounded-md">
                  <AlertTriangle className="h-4 w-4 text-red-600 mr-2" />
                  <span className="text-sm font-medium text-gray-800">
                    Max Interval: {FormatDate(selectedRecord?.maximumIntervalDate) || "N/A"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        <DialogFooter className="border-t border-gray-200 pt-4 mt-6">
          <Button
            variant="outline"
            className="w-full sm:w-auto border-gray-300 text-blue-700 hover:bg-blue-50 hover:text-blue-800"
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