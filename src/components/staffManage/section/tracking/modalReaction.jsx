import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

const ModalReaction = ({ isReactionModalOpen, setIsReactionModalOpen, selectedRecord, handleReactionUpdate, setReaction, reaction }) => {
   
    return (
        <Dialog open={isReactionModalOpen} onOpenChange={setIsReactionModalOpen}>
        <DialogContent className="sm:max-w-[425px] border-blue-100">
          <DialogHeader>
            <DialogTitle className="text-blue-700">Enter Reaction</DialogTitle>
          </DialogHeader>
          <div className="flex items-center space-x-2 border border-blue-100 p-3 rounded-md hover:bg-blue-50/50">
            <Textarea onChange={(e) => setReaction(e.target.value)} placeholder="Enter reaction" className="w-full" />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              className="border-blue-200 text-blue-700 hover:bg-blue-50"
              onClick={() => setIsReactionModalOpen(false)}
            >
              Close
            </Button>
            <Button
              className="bg-blue-600 text-white hover:bg-blue-700"
              onClick={() => handleReactionUpdate(selectedRecord.trackingID)}
              disabled={!reaction || reaction === selectedRecord?.reaction}
            >
              Update Reaction
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
}

export default ModalReaction
