import { Eye, Search, Plus, Filter, RefreshCcw, ChevronLeft, ChevronRight } from "lucide-react";    
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { memo } from "react";

const SelectAppointment = ({setSearchTerm, fillterbyStatus, setIsCreateBookingModalOpen}) => {
    return (
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between my-4">
        <h2 className="text-3xl text-blue-500 font-bold tracking-tight">Booking Management</h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex gap-2">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Search bookings..."
                className="pl-8"
                onChange={(e) => setSearchTerm(e.target.value.toLowerCase())}
              />
            </div>
            <Select onValueChange={(value) => fillterbyStatus(value)}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Statuses</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Success">Success</SelectItem>
                <SelectItem value="Refund">Refund</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button
            onClick={() => setIsCreateBookingModalOpen(true)}
            className="gap-2 bg-blue-600 text-white hover:bg-blue-700"
          >
            <Plus className="h-4 w-4 " /> New Booking
          </Button>
        </div>
      </div>
    )
}

export default memo(SelectAppointment);
