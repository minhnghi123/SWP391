import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Clock, Calendar, AlertCircle } from "lucide-react"
import FormatDate from "../../../../utils/Date"

const ModalDetail = ({ isDetailModalOpen, setIsDetailModalOpen, selectRecordArray }) => {
    return (
        <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
        <DialogContent className="sm:max-w-[600px] border-blue-100">
          <DialogHeader>
            <DialogTitle className="text-blue-700 text-xl">Vaccination Details</DialogTitle>
            <DialogDescription>Complete information about the vaccination record.</DialogDescription>
          </DialogHeader>


          {selectRecordArray?.length > 0 && selectRecordArray.map(item => {
            const fields = [
              { label: "Minimum Interval Date", value: item.minimumIntervalDate, icon: Clock },
              { label: "Vaccination Date", value: item.vaccinationDate, icon: Calendar },
              { label: "Maximum Interval Date", value: item.maximumIntervalDate, icon: AlertCircle }
            ];

            return (
              <div key={item.trackingID} className="bg-blue-50/50 p-4 rounded-lg space-y-4">
                <h4 className="font-medium text-blue-700">Vaccination Timeline</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {fields.map(({ label, value, icon: Icon }) => (
                    <div key={label} className="flex items-center">
                      <div className="p-2 rounded-full bg-blue-100 mr-3">
                        <Icon className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <div className="text-xs text-blue-600">{label}</div>
                        <div className="font-medium">{FormatDate(value)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}




          <DialogFooter>
            <Button
              variant="outline"
              className="border-blue-200 text-blue-700 hover:bg-blue-50"
              onClick={() => setIsDetailModalOpen(false)}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    )
}

export default ModalDetail  
