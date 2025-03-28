import React, { useState, useEffect } from "react";
import Pagination from "../../Pagination"; // Imported Pagination component
import VaccineDetails from "../../../dashboard/Section/vaccine/detailVaccine";
import { ToastContainer } from "react-toastify";
import { Search, Filter, MoreHorizontal, Syringe, Eye } from "lucide-react";
import useAxios from "../../../../utils/useAxios";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

const url = import.meta.env.VITE_BASE_URL_DB;

const getStatusBadge = (status) => {
  switch (status.toLowerCase()) {
    case "instock":
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100" variant="outline">In Stock</Badge>;
    case "nearly out stock":
      return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100" variant="outline">Nearly Out</Badge>;
    case "outofstock":
      return <Badge className="bg-red-100 text-red-800 hover:bg-red-100" variant="outline">Out of Stock</Badge>;
    default:
      return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100" variant="outline">{status}</Badge>;
  }
};

const VaccineList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(5);
  const [selectedVaccine, setSelectedVaccine] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [vaccines, setVaccines] = useState([]);

  const api = useAxios();

  const fetchVaccines = async () => {
    try {
      setLoading(true);
      const response = await api.get(`${url}/Vaccine/get-all-vaccines`);
      setVaccines(Array.isArray(response.data) ? response.data : []);
      setError(null);
    } catch (error) {
      console.error("Error fetching vaccines:", error);
      setError(error.response?.data?.message || "Failed to fetch vaccines. Please try again later.");
      setVaccines([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVaccines();
  }, []);

  const filteredItems = vaccines.filter((item) =>
    item?.name?.toLowerCase().includes(searchTerm.toLowerCase()) || false
  );

  const sortData = (data) => {
    return [...data].sort((a, b) => {
      const valueA = a[sortField] ?? "";
      const valueB = b[sortField] ?? "";
      if (sortField === "price" || sortField === "quantity") {
        return sortOrder === "asc" ? Number(valueA) - Number(valueB) : Number(valueB) - Number(valueA);
      }
      return sortOrder === "asc"
        ? String(valueA).localeCompare(String(valueB))
        : String(valueB).localeCompare(String(valueA));
    });
  };

  const sortedItems = sortData(filteredItems);
  const totalPages = Math.ceil(sortedItems.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedData = sortedItems.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleViewItem = (item) => {
    if (item) {
      setSelectedVaccine(item);
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedVaccine(null);
  };

  return (
    <>
      <ToastContainer />
      <Card className="border-blue-100 bg-white shadow-sm">
        <CardHeader className="border-b border-blue-50">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <CardTitle className="text-blue-700">Vaccine Inventory</CardTitle>
            <div className="flex flex-wrap gap-2">
              <div className="relative w-[250px]">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-500" />
                <Input
                  placeholder="Search vaccines..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="pl-10 border-blue-200 focus:border-blue-400 focus:ring-blue-400"
                />
              </div>
              <Select
                value={sortField}
                onValueChange={(value) => {
                  setSortField(value);
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger className="w-[180px] border-blue-200 focus:ring-blue-400">
                  <div className="flex items-center gap-2">
                    <Filter className="h-4 w-4 text-blue-500" />
                    <SelectValue placeholder="Sort by" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="price">Price</SelectItem>
                  <SelectItem value="quantity">Quantity</SelectItem>
                  <SelectItem value="fromCountry">From Country</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                onClick={() => {
                  setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                  setCurrentPage(1);
                }}
                className="border-blue-200 text-blue-700 hover:bg-blue-50"
              >
                {sortOrder === "asc" ? "↑" : "↓"}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-blue-50/50">
                <TableRow className="hover:bg-blue-50/80">
                  <TableHead className="text-blue-700 text-center">ID</TableHead>
                  <TableHead className="text-blue-700 text-center">Name</TableHead>
                  <TableHead className="text-blue-700 text-center">Quantity</TableHead>
                  <TableHead className="text-blue-700 text-center">Price</TableHead>
                  <TableHead className="text-blue-700 text-center">From Country</TableHead>
                  <TableHead className="text-blue-700 text-center">Status</TableHead>
                  <TableHead className="text-blue-700 text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-blue-600">
                      Loading vaccines...
                    </TableCell>
                  </TableRow>
                ) : error ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-red-500">
                      {error}
                      <Button
                        onClick={fetchVaccines}
                        variant="outline"
                        className="ml-4 border-blue-200 text-blue-700 hover:bg-blue-50"
                      >
                        Retry
                      </Button>
                    </TableCell>
                  </TableRow>
                ) : paginatedData.length > 0 ? (
                  paginatedData.map((item) => (
                    <TableRow key={item.id} className="hover:bg-blue-50/30 border-b border-blue-50">
                      <TableCell className="font-medium text-blue-800 text-center">#{item.id}</TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center gap-2">
                          <Syringe className="h-4 w-4 text-blue-500" />
                          <span>{item.name || "N/A"}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">{item.quantity ?? 0}</TableCell>
                      <TableCell className="text-center">${item.price?.toFixed(2) ?? "0.00"}</TableCell>
                      
   
                      <TableCell className="text-center">{item.fromCountry || "N/A"}</TableCell>
                      <TableCell className="text-center">{getStatusBadge(item.status)}</TableCell>
                      <TableCell className="text-center">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="text-blue-700 hover:bg-blue-50">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="border-blue-100">
                            <DropdownMenuItem
                              className="text-blue-700 focus:bg-blue-50 focus:text-blue-800"
                              onClick={() => handleViewItem(item)}
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              View details
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-blue-600">
                      No vaccines found matching your search criteria.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          {!loading && !error && sortedItems.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              startIndex={startIndex}
              endIndex={endIndex}
              totalItems={sortedItems.length}
              onPageChange={handlePageChange}
            />
          )}
        </CardContent>
      </Card>

      {isModalOpen && selectedVaccine && (
        <VaccineDetails
          id={selectedVaccine.id}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          vaccineData={selectedVaccine}
        />
      )}
    </>
  );
};

export default VaccineList;