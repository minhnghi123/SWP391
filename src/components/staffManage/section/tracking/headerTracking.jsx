import { Search, Filter, MoreHorizontal, Syringe, Calendar, ChevronDown, ChevronUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

export default function HeaderTracking({ searchQuery, setSearchQuery, handleFilter, sortData, sortOrder, setSortOrder, sortField, setSortField, filteredData, setFilteredData }) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
    <h1 className="text-3xl text-blue-500 font-bold tracking-tight">Vaccination Tracking Dashboard</h1>
    <div className="flex flex-wrap gap-2">
        <div className="relative w-[250px]">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-500" />
          <Input
            placeholder="Search by name, vaccine..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 border-blue-200 focus:border-blue-400 focus:ring-blue-400"
          />
        </div>
        <Select defaultValue="all" onValueChange={handleFilter}>
          <SelectTrigger className="w-[180px] border-blue-200 focus:ring-blue-400">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-blue-500" />
              <SelectValue placeholder="Filter by status" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Records</SelectItem>
            <SelectItem value="success">Success</SelectItem>
            <SelectItem value="schedule">Scheduled</SelectItem>
            <SelectItem value="waiting">Waiting</SelectItem>
            <SelectItem value="cancel">Cancelled</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={sortField}
          onValueChange={(value) => {
            setSortField(value);
            setFilteredData(sortData(filteredData));
          }}
        >
          <SelectTrigger className="w-[180px] border-blue-200 focus:ring-blue-400">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-blue-500" />
              <SelectValue placeholder="Sort by" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="vaccinationDate">Date</SelectItem>
            <SelectItem value="status">Status</SelectItem>
            <SelectItem value="vaccineName">Vaccine Name</SelectItem>
            <SelectItem value="userName">Parent Name</SelectItem>
          </SelectContent>
        </Select>
        <Button
          variant="outline"
          onClick={() => {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
            setFilteredData(sortData(filteredData));
          }}
          className="border-blue-200 text-blue-700 hover:bg-blue-50"
        >
          {sortOrder === "asc" ? "↑" : "↓"}
        </Button>
      </div>
  </div>
  );
}
