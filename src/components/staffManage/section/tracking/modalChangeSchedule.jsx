import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Syringe, AlertCircle } from "lucide-react"
import FormatDate from "../../../../utils/Date"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { Label } from "@/components/ui/label"
import { format, setHours, setMinutes, addDays, isWeekend } from "date-fns"
import { useState, useEffect } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

const ModalChangeSchedule = ({setDate, selectedRecord, childData, date, handleScheduleChange, showCalendar, isChangeScheduleModalOpen, setIsChangeScheduleModalOpen}) => {
  const [selectedTime, setSelectedTime] = useState("09:00");
  const [availableTimes, setAvailableTimes] = useState([]);
  
  // Create time slots from 8:00 to 17:00
  useEffect(() => {
    const times = [];
    for (let hour = 8; hour <= 17; hour++) {
      for (let minute of [0, 30]) {
        // Skip lunch break (12:00 - 13:30)
        if ((hour === 12 && minute === 0) || (hour === 12 && minute === 30) || (hour === 13 && minute === 0)) {
          continue;
        }
        
        const timeString = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
        times.push(timeString);
      }
    }
    setAvailableTimes(times);
  }, []);
  
  // Combine date and time when either changes
  useEffect(() => {
    if (date && selectedTime) {
      const [hours, minutes] = selectedTime.split(':').map(Number);
      const newDate = new Date(date);
      const combinedDate = setHours(setMinutes(newDate, minutes), hours);
      setDate(combinedDate.toISOString());
    }
  }, [selectedTime, date]);
  
  // Filter out weekends
  const isWeekDay = (date) => {
    return !isWeekend(date);
  };
  
  const childName = childData.find((item) => item.id === selectedRecord?.childId)?.name || "Child";
  
  return (
    <Dialog open={isChangeScheduleModalOpen} onOpenChange={() => setIsChangeScheduleModalOpen(false)}>
      <DialogContent className="sm:max-w-[500px] border-blue-100">
        <DialogHeader>
          <DialogTitle className="text-blue-700">Change Vaccination Schedule</DialogTitle>
          <DialogDescription>Select a new date and time for this vaccination appointment.</DialogDescription>
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
                <div>
                  <div className="text-sm text-blue-600">Parent</div>
                  <p>{selectedRecord.userName}</p>
                </div>
                <div>
                  <div className="text-sm text-blue-600">Child</div>
                  <p>{childName}</p>
                </div>
              </div>
              
              <div className="mt-3 pt-3 border-t border-blue-50">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 text-blue-600 mr-2" />
                  <div>
                    <div className="text-sm text-blue-600">Current Date</div>
                    <p>{selectedRecord.vaccinationDate ? FormatDate(selectedRecord.vaccinationDate) : "Not scheduled"}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4 mt-2">
              <div>
                <Label className="text-blue-700 mb-2 block">New Vaccination Date</Label>
                <div className="mb-4">
                  <DatePicker
                    selected={date ? new Date(date) : null}
                    onChange={(newDate) => setDate(newDate.toISOString())}
                    dateFormat="dd/MM/yyyy"
                    minDate={addDays(new Date(), 1)} // Allow scheduling from tomorrow
                    placeholderText="Select a date"
                    className="w-full rounded-md border border-blue-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    showPopperArrow={false}
                    calendarClassName="border border-blue-100 rounded-md shadow-lg"
                    wrapperClassName="w-full"
                    popperClassName="z-50"
                    popperPlacement="bottom-start"
                    filterDate={isWeekDay}
                    customInput={
                      <div className="flex items-center w-full rounded-md border border-blue-200 px-3 py-2 text-sm hover:bg-blue-50/50 cursor-pointer">
                        <Calendar className="h-4 w-4 text-blue-500 mr-2" />
                        <input
                          className="w-full border-none bg-transparent focus:outline-none cursor-pointer"
                          value={date ? format(new Date(date), "dd/MM/yyyy") : "Select a date"}
                          readOnly
                        />
                      </div>
                    }
                  />
                </div>
              </div>
              
              <div>
                <Label className="text-blue-700 mb-2 block">Appointment Time</Label>
                <Select value={selectedTime} onValueChange={setSelectedTime}>
                  <SelectTrigger className="w-full border-blue-200">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-blue-500 mr-2" />
                      <SelectValue placeholder="Select time" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    {availableTimes.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                        {(time === "12:30" || time === "13:00") && (
                          <Badge className="ml-2 bg-amber-100 text-amber-800" variant="outline">Lunch</Badge>
                        )}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              {date && (
                <div className="bg-blue-50 p-3 rounded-md mt-4">
                  <div className="flex items-center">
                    <AlertCircle className="h-5 w-5 text-blue-600 mr-2" />
                    <p className="text-sm">
                      New appointment: <span className="font-medium">{format(new Date(date), "EEEE, MMMM d, yyyy")} at {selectedTime}</span>
                    </p>
                  </div>
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
              setIsChangeScheduleModalOpen(false);
              setDate(null);
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
