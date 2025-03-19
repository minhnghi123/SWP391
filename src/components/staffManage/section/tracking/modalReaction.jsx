import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { AlertTriangle, ThermometerSun, Pill, Stethoscope, FileText } from "lucide-react"

const ModalReaction = ({ isReactionModalOpen, setIsReactionModalOpen, selectedRecord, handleReactionUpdate, setReaction, reaction }) => {
    const [reactionType, setReactionType] = useState("nothing");
    
    const handleReactionSelect = (type) => {
      if (type === "nothing" || type === "other") {
        setReactionType(type);
        setReaction(type === "nothing" ? "Nothing" : "");
      } else {
        setReactionType(type);
        setReaction(type);
      }
    };
    
    return (
        <Dialog open={isReactionModalOpen} onOpenChange={() => {
          setIsReactionModalOpen(false);
          setReactionType("nothing");
          setReaction("");
        }}>
        <DialogContent className="sm:max-w-[500px] border-blue-100">
          <DialogHeader>
            <DialogTitle className="text-blue-700">Record Vaccination Reaction</DialogTitle>
            <DialogDescription>
              Record any reactions the patient experienced after vaccination.
            </DialogDescription>
          </DialogHeader>
          
          {selectedRecord && (
            <div className="py-2 mb-4">
              <div className="bg-blue-50/50 p-3 rounded-md mb-4">
                <div className="flex items-center">
                  <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
                  <p className="text-sm">
                    Accurately recording vaccine reactions helps monitor vaccine safety and patient health.
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <RadioGroup value={reactionType} onValueChange={handleReactionSelect} className="space-y-3">
                  <div className="flex items-center space-x-2 border border-blue-100 p-3 rounded-md hover:bg-blue-50/50">
                    <RadioGroupItem value="nothing" id="reaction-nothing" className="text-blue-600" />
                    <Label htmlFor="reaction-nothing" className="flex items-center w-full cursor-pointer">
                      <Stethoscope className="h-4 w-4 text-green-600 mr-2" />
                      <span>No Reaction</span>
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2 border border-blue-100 p-3 rounded-md hover:bg-blue-50/50">
                    <RadioGroupItem value="Fever" id="reaction-fever" className="text-blue-600" />
                    <Label htmlFor="reaction-fever" className="flex items-center w-full cursor-pointer">
                      <ThermometerSun className="h-4 w-4 text-amber-600 mr-2" />
                      <span>Fever</span>
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2 border border-blue-100 p-3 rounded-md hover:bg-blue-50/50">
                    <RadioGroupItem value="Pain at injection site" id="reaction-pain" className="text-blue-600" />
                    <Label htmlFor="reaction-pain" className="flex items-center w-full cursor-pointer">
                      <Pill className="h-4 w-4 text-red-600 mr-2" />
                      <span>Pain at injection site</span>
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2 border border-blue-100 p-3 rounded-md hover:bg-blue-50/50">
                    <RadioGroupItem value="other" id="reaction-other" className="text-blue-600" />
                    <Label htmlFor="reaction-other" className="flex items-center w-full cursor-pointer">
                      <FileText className="h-4 w-4 text-blue-600 mr-2" />
                      <span>Other (specify below)</span>
                    </Label>
                  </div>
                </RadioGroup>
                
                {reactionType === "other" && (
                  <div className="mt-4">
                    <Label htmlFor="custom-reaction" className="text-sm text-blue-700 mb-2 block">
                      Describe the reaction:
                    </Label>
                    <Textarea 
                      id="custom-reaction"
                      value={reaction}
                      onChange={(e) => setReaction(e.target.value)} 
                      placeholder="Describe the reaction in detail..." 
                      className="w-full border-blue-200 focus:border-blue-400 focus:ring-blue-400" 
                    />
                  </div>
                )}
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button
              variant="outline"
              className="border-blue-200 text-blue-700 hover:bg-blue-50"
              onClick={() => {
                setIsReactionModalOpen(false);
                setReactionType("nothing");
                setReaction("");
              }}
            >
              Cancel
            </Button>
            <Button
              className="bg-blue-600 text-white hover:bg-blue-700"
              onClick={() => handleReactionUpdate(selectedRecord.trackingID)}
              disabled={!reaction || (reactionType === "other" && !reaction)}
            >
              Save Reaction
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
}

export default ModalReaction
