import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Check, X, Clock, Syringe } from "lucide-react"
import { useState } from "react"
const ModalUpdateStatus = ({ newStatus, setNewStatus, isStatusModalOpen, setIsStatusModalOpen, selectedRecord, childData, handleStatusUpdate }) => {
   
    return (
        <Dialog open={isStatusModalOpen} onOpenChange={setIsStatusModalOpen}>
            <DialogContent className="sm:max-w-[425px] border-blue-100">
                <DialogHeader>
                    <DialogTitle className="text-blue-700">Update Vaccination Status</DialogTitle>
                    <DialogDescription>Change the status of this vaccination record.</DialogDescription>
                </DialogHeader>

                {selectedRecord && (
                    <div className="py-4">
                        <div className="mb-4">
                            <div className="flex items-center mb-2">
                                <Syringe className="h-4 w-4 text-blue-600 mr-2" />
                                <p className="font-medium">{selectedRecord.vaccineName}</p>
                            </div>
                            <div className="flex items-center mb-2 justify-between" >
                                <p className="">Parent:  {selectedRecord.userName}</p>
                                <p className="">Child: {childData.find((item) => item.id === selectedRecord.childId)?.name}</p>
                            </div>
                        </div>

                        {/* Nếu trạng thái hiện tại là "waiting" */}
                        {selectedRecord?.status.toLowerCase() === "waiting" && (
                            <RadioGroup value={newStatus} onValueChange={setNewStatus} className="space-y-3">
                                <div className="flex items-center space-x-2 border border-blue-100 p-3 rounded-md hover:bg-blue-50/50">
                                    <RadioGroupItem value="schedule" id="status-scheduled" className="text-blue-600" />
                                    <Label htmlFor="status-schedule" className="flex items-center">
                                        <Clock className="h-4 w-4 text-yellow-600 mr-2" />
                                        <span>Schedule</span>
                                    </Label>
                                </div>
                                <div className="flex items-center space-x-2 border border-blue-100 p-3 rounded-md hover:bg-blue-50/50">
                                    <RadioGroupItem value="cancel" id="status-cancelled" className="text-blue-600" />
                                    <Label htmlFor="status-cancel" className="flex items-center">
                                        <X className="h-4 w-4 text-red-600 mr-2" />
                                        <span>Cancel</span>
                                    </Label>
                                </div>
                            </RadioGroup>
                        )}

                        {/* Nếu trạng thái hiện tại là "schedule" */}
                        {selectedRecord?.status.toLowerCase() === "schedule" && (
                            <RadioGroup value={newStatus} onValueChange={setNewStatus} className="space-y-3">
                                <div className="flex items-center space-x-2 border border-blue-100 p-3 rounded-md hover:bg-blue-50/50">
                                    <RadioGroupItem value="success" id="status-success" className="text-blue-600" />
                                    <Label htmlFor="status-success" className="flex items-center">
                                        <Check className="h-4 w-4 text-blue-600 mr-2" />
                                        <span>Success</span>
                                    </Label>
                                </div>
                                <div className="flex items-center space-x-2 border border-blue-100 p-3 rounded-md hover:bg-blue-50/50">
                                    <RadioGroupItem value="cancel" id="status-cancelled" className="text-blue-600" />
                                    <Label htmlFor="status-cancel" className="flex items-center">
                                        <X className="h-4 w-4 text-red-600 mr-2" />
                                        <span>Cancel</span>
                                    </Label>
                                </div>

                            </RadioGroup>
                        )}

                        {/* Nếu trạng thái hiện tại là "success" */}
                        {selectedRecord?.status.toLowerCase() === "success" && (
                            <RadioGroup value={newStatus} onValueChange={setNewStatus} className="space-y-3">
                                <div className="flex items-center space-x-2 border border-blue-100 p-3 rounded-md hover:bg-blue-50/50">
                                    <RadioGroupItem value="cancel" id="status-cancelled" className="text-blue-600" />
                                    <Label htmlFor="status-cancel" className="flex items-center">
                                        <X className="h-4 w-4 text-red-600 mr-2" />
                                        <span>Cancel</span>
                                    </Label>
                                </div>
                            </RadioGroup>
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
