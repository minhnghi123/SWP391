import React from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, User, Baby, Syringe, Calendar, AlertTriangle, Clock, CheckCircle } from "lucide-react";
import FormatDate from "../../../../utils/Date";
import { Badge } from "@/components/ui/badge";

const getStatusBadge = (status) => {
  switch (status?.toLowerCase()) {
    case "success":
      return (
        <Badge className="bg-green-100 text-green-800 px-2 py-1 rounded-full">Completed</Badge>
      );
    case "schedule":
      return (
        <Badge className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">Scheduled</Badge>
      );
    case "waiting":
      return (
        <Badge className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">Waiting</Badge>
      );
    case "cancel":
      return (
        <Badge className="bg-red-100 text-red-800 px-2 py-1 rounded-full">Cancelled</Badge>
      );
    default:
      return (
        <Badge className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full">
          {status || "Unknown"}
        </Badge>
      );
  }
};

const getReactionBadge = (reaction) => {
  switch (reaction?.toLowerCase()) {
    case "nothing":
      return (
        <Badge className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
          No Reaction
        </Badge>
      );
    default:
      return (
        <Badge className="bg-green-100 text-green-800 px-2 py-1 rounded-full">
          {reaction || "Unknown"}
        </Badge>
      );
  }
};

const ModalDetail = ({ isDetailModalOpen, setIsDetailModalOpen, selectedRecord, childData }) => {
  const currentDate = new Date().toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }); // March 25, 2025

  if (!selectedRecord) return null;

  return (
    <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
      <DialogContent className="p-0 border-none bg-transparent max-w-4xl">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-h-[90vh] flex flex-col">
          {/* Header */}
          <div className="sticky top-0 bg-white p-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900">Vaccination Record</h2>
            <button
              onClick={() => setIsDetailModalOpen(false)}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Close modal"
            >
              <X size={16} className="text-gray-500" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 grid grid-cols-12 gap-4 flex-1 overflow-y-auto">
            {/* Header Section */}
            <div className="col-span-12 flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-full bg-teal-50 flex items-center justify-center">
                <Syringe className="w-6 h-6 text-teal-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Record ID: {selectedRecord.id}</h3>
            </div>

            {/* Left Column - Patient Information */}
            <div className="col-span-4 space-y-4">
              <div className="bg-gray-50 p-3 rounded-xl">
                <h4 className="text-xs font-semibold text-gray-500 mb-2">Patient Information</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-gray-600">
                      <User className="w-3 h-3" />
                      Name
                    </div>
                    <span className="font-medium">{selectedRecord?.userName || "N/A"}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-gray-600">
                      <Baby className="w-3 h-3" />
                      Child
                    </div>
                    <span className="font-medium">
                      {childData?.find((item) => item.id === selectedRecord.childId)?.name || "N/A"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-gray-600">
                      <Syringe className="w-3 h-3" />
                      Vaccine
                    </div>
                    <span className="font-medium">{selectedRecord?.vaccineName || "N/A"}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-gray-600">
                      <AlertTriangle className="w-3 h-3" />
                      Status
                    </div>
                    {getStatusBadge(selectedRecord?.status)}
                  </div>
                </div>
              </div>

              {/* Reaction Notes */}
              {selectedRecord?.reaction && (
                <div className="bg-gray-50 p-3 rounded-xl">
                  <h4 className="text-xs font-semibold text-gray-500 mb-2">Reaction Notes</h4>
                  <div className="text-sm">{getReactionBadge(selectedRecord.reaction)}</div>
                </div>
              )}
            </div>

            {/* Right Column - Vaccination Timeline */}
            <div className="col-span-8">
              <div className="bg-gray-50 p-3 rounded-xl h-full">
                <h4 className="text-xs font-semibold text-gray-500 mb-2">Vaccination Timeline</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between p-2 bg-white rounded-md border border-gray-200">
                    <div className="flex items-center gap-1 text-gray-600">
                      <CheckCircle className="w-3 h-3 text-green-600" />
                      Vaccination Date
                    </div>
                    <span className="font-medium">
                      {FormatDate(selectedRecord?.vaccinationDate) || "Not scheduled"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-white rounded-md border border-gray-200">
                    <div className="flex items-center gap-1 text-gray-600">
                      <Clock className="w-3 h-3 text-yellow-600" />
                      Min Interval
                    </div>
                    <span className="font-medium">
                      {FormatDate(selectedRecord?.minimumIntervalDate) || "N/A"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-white rounded-md border border-gray-200">
                    <div className="flex items-center gap-1 text-gray-600">
                      <AlertTriangle className="w-3 h-3 text-red-600" />
                      Max Interval
                    </div>
                    <span className="font-medium">
                      {FormatDate(selectedRecord?.maximumIntervalDate) || "N/A"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="col-span-12 flex justify-between items-center mt-2">
              <span className="text-xs text-gray-500">Last updated: {currentDate}</span>
              <Button
                onClick={() => setIsDetailModalOpen(false)}
                className="px-4 py-1 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ModalDetail;