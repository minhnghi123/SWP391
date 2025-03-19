import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Check, X, Clock, Syringe, AlertTriangle, Baby, User } from "lucide-react"
import { useState, useEffect } from "react"
import FormatDate from "../../../../utils/Date"

const ModalUpdateStatus = ({ newStatus, setNewStatus, isStatusModalOpen, setIsStatusModalOpen, selectedRecord, childData, handleStatusUpdate }) => {
   const [statusDescription, setStatusDescription] = useState("");
   
   useEffect(() => {
     // Set description based on selected status
     switch(newStatus?.toLowerCase()) {
       case "success":
         setStatusDescription("The vaccination has been successfully administered.");
         break;
       case "schedule":
         setStatusDescription("The vaccination is scheduled for a future date.");
         break;
       case "waiting":
         setStatusDescription("Waiting for patient to arrive for vaccination.");
         break;
       case "cancel":
         setStatusDescription("The vaccination has been cancelled.");
         break;
       default:
         setStatusDescription("");
     }
   }, [newStatus]);
   
   const childName = childData.find(item => item.id === selectedRecord?.childId)?.name || "Child";
   
   return (
        <Dialog open={isStatusModalOpen} onOpenChange={setIsStatusModalOpen}>
            <DialogContent className="sm:max-w-[500px] border-blue-100">
                <DialogHeader>
                    <DialogTitle className="text-blue-700">Update Vaccination Status</DialogTitle>
                    <DialogDescription>Change the status of this vaccination record.</DialogDescription>
                </DialogHeader>

                {selectedRecord && (
                    <div className="py-4">
                        <div className="bg-blue-50/30 p-4 rounded-lg mb-4">
                            <div className="flex items-center mb-3">
                                <div className="p-2 rounded-full bg-blue-100 mr-3">
                                    <Syringe className="h-5 w-5 text-blue-600" />
                                </div>
                                <div>
                                    <div className="text-sm text-blue-600">Vaccine</div>
                                    <p className="font-medium">{selectedRecord.vaccineName}</p>
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex items-center">
                                    <User className="h-4 w-4 text-blue-500 mr-2" />
                                    <div>
                                        <div className="text-xs text-blue-600">Parent</div>
                                        <div>{selectedRecord.userName}</div>
                                    </div>
                                </div>
                                
                                <div className="flex items-center">
                                    <Baby className="h-4 w-4 text-blue-500 mr-2" />
                                    <div>
                                        <div className="text-xs text-blue-600">Child</div>
                                        <div>{childName}</div>
                                    </div>
                                </div>
                            </div>
                            
                            {selectedRecord.vaccinationDate && (
                                <div className="mt-3 pt-3 border-t border-blue-50">
                                    <div className="flex items-center">
                                        <Clock className="h-4 w-4 text-blue-600 mr-2" />
                                        <div>
                                            <div className="text-sm text-blue-600">Scheduled Date</div>
                                            <p>{FormatDate(selectedRecord.vaccinationDate)}</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {selectedRecord?.status.toLowerCase() === "waiting" && (
                            <>
                                <div className="text-sm mb-3 flex items-center text-blue-700">
                                    <AlertTriangle className="h-4 w-4 mr-2" />
                                    Current status: <span className="font-medium ml-1">Waiting</span>
                                </div>
                                
                                <RadioGroup value={newStatus} onValueChange={setNewStatus} className="space-y-3">
                                    <div className="flex items-center space-x-2 border border-blue-100 p-3 rounded-md hover:bg-blue-50/50 transition-colors">
                                        <RadioGroupItem value="schedule" id="status-scheduled" className="text-blue-600" />
                                        <Label htmlFor="status-schedule" className="flex items-center w-full cursor-pointer">
                                            <Clock className="h-4 w-4 text-blue-600 mr-2" />
                                            <div>
                                                <span>Schedule</span>
                                                <p className="text-xs text-gray-500 mt-1">Set a future date for this vaccination</p>
                                            </div>
                                        </Label>
                                    </div>
                                    <div className="flex items-center space-x-2 border border-blue-100 p-3 rounded-md hover:bg-blue-50/50 transition-colors">
                                        <RadioGroupItem value="cancel" id="status-cancelled" className="text-blue-600" />
                                        <Label htmlFor="status-cancel" className="flex items-center w-full cursor-pointer">
                                            <X className="h-4 w-4 text-red-600 mr-2" />
                                            <div>
                                                <span>Cancel</span>
                                                <p className="text-xs text-gray-500 mt-1">Cancel this vaccination entirely</p>
                                            </div>
                                        </Label>
                                    </div>
                                </RadioGroup>
                            </>
                        )}

                        {selectedRecord?.status.toLowerCase() === "schedule" && (
                            <>
                                <div className="text-sm mb-3 flex items-center text-blue-700">
                                    <AlertTriangle className="h-4 w-4 mr-2" />
                                    Current status: <span className="font-medium ml-1">Scheduled</span>
                                </div>
                                
                                <RadioGroup value={newStatus} onValueChange={setNewStatus} className="space-y-3">
                                    <div className="flex items-center space-x-2 border border-blue-100 p-3 rounded-md hover:bg-blue-50/50 transition-colors">
                                        <RadioGroupItem value="success" id="status-success" className="text-blue-600" />
                                        <Label htmlFor="status-success" className="flex items-center w-full cursor-pointer">
                                            <Check className="h-4 w-4 text-green-600 mr-2" />
                                            <div>
                                                <span>Success</span>
                                                <p className="text-xs text-gray-500 mt-1">Mark this vaccination as successfully administered</p>
                                            </div>
                                        </Label>
                                    </div>
                                    <div className="flex items-center space-x-2 border border-blue-100 p-3 rounded-md hover:bg-blue-50/50 transition-colors">
                                        <RadioGroupItem value="cancel" id="status-cancelled" className="text-blue-600" />
                                        <Label htmlFor="status-cancel" className="flex items-center w-full cursor-pointer">
                                            <X className="h-4 w-4 text-red-600 mr-2" />
                                            <div>
                                                <span>Cancel</span>
                                                <p className="text-xs text-gray-500 mt-1">Cancel this vaccination entirely</p>
                                            </div>
                                        </Label>
                                    </div>
                                </RadioGroup>
                            </>
                        )}
                        
                        {statusDescription && (
                            <div className="mt-4 p-3 bg-blue-50 rounded-md">
                                <p className="text-sm text-blue-700">{statusDescription}</p>
                            </div>
                        )}
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
    )
}

export default ModalUpdateStatus
