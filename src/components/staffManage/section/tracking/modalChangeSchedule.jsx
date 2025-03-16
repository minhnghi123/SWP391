import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Calendar } from "lucide-react"
import FormatDate from "../../../../utils/Date"
import  DatePicker  from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { Syringe } from "lucide-react"
import { Label } from "@/components/ui/label"
import { format } from "date-fns"

const ModalChangeSchedule = ({setDate, selectedRecord, childData, date, handleScheduleChange, showCalendar,isChangeScheduleModalOpen, setIsChangeScheduleModalOpen}) => {
  return (
    <Dialog open={isChangeScheduleModalOpen} onOpenChange={() => setIsChangeScheduleModalOpen(false)}>
      <DialogContent className="sm:max-w-[425px] border-blue-100">
        <DialogHeader>
          <DialogTitle className="text-blue-700">Change Schedule</DialogTitle>
          <DialogDescription>Select a new date for the vaccination.</DialogDescription>
        </DialogHeader>

        {selectedRecord && (
          <div className="py-4">
            <div className="mb-4">
              <div className="flex items-center mb-2">
                <Syringe className="h-4 w-4 text-blue-600 mr-2" />
                <p className="font-medium">{selectedRecord.vaccineName}</p>
              </div>
              <div className="flex items-center mb-2 justify-between">
                <p className="">Parent: {selectedRecord.userName}</p>
                <p className="">Child: {childData.find((item) => item.id === selectedRecord.childId)?.name}</p>
              </div>
              <div className="flex items-center mb-2">
                <Calendar className="h-4 w-4 text-blue-600 mr-2" />
                <p className="">Current Date: {FormatDate(selectedRecord.vaccinationDate)}</p>
              </div>
            </div>

            <div className="space-y-4">
              <Label>New Vaccination Date</Label>
                  <DatePicker
                  selected={date}
                  onChange={(date) => setDate(date.toISOString())}
                  dateFormat="dd/MM/yyyy"
                  minDate={new Date()}
                  placeholderText="Select a date"
                  className="w-full rounded-md border border-blue-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                  showPopperArrow={false}
                  calendarClassName="border border-blue-100 rounded-md shadow-lg"
                  wrapperClassName="w-full"
                  popperClassName="z-50"
                  popperPlacement="bottom-start"
                  customInput={
                    <div className="flex items-center w-full rounded-md border border-blue-200 px-3 py-2 text-sm hover:bg-blue-50/50 cursor-pointer">
                      <Calendar className="h-4 w-4 text-blue-500 mr-2" />
                      <input
                        className="w-full border-none bg-transparent focus:outline-none cursor-pointer"
                        value={date ? format(date, "dd/MM/yyyy") : "Select a date"}
                        readOnly
                      />
                    </div>
                  }
                />
               
              
             
            </div>
          </div>
        )}

        <DialogFooter>
          <Button
            variant="outline"
            className="border-blue-200 text-blue-700 hover:bg-blue-50"
            onClick={() => {
              setIsChangeScheduleModalOpen(false)
              setDate(null)
            }}
          >
            Cancel
          </Button>
          <Button
            className="bg-blue-600 text-white hover:bg-blue-700"
            onClick={handleScheduleChange}
            disabled={!date}
          >
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ModalChangeSchedule
