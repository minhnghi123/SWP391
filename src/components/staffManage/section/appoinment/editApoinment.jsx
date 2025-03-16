import { useState, useEffect } from "react";
import useAxios from "../../../../utils/useAxios";
import ToUpperCase from '../../../../utils/upperCaseFirstLetter'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Edit2, User, Users, Syringe, Package, Calendar, FileText } from "lucide-react";

const url = import.meta.env.VITE_BASE_URL_DB;

const EditAppointment = ({ appointment, onSave, onCancel, loading }) => {
  const api = useAxios();
  const [editedBooking, setEditedBooking] = useState(null);
  const [availableVaccines, setAvailableVaccines] = useState([]);
  const [availableVaccineCombos, setAvailableVaccineCombos] = useState([]);
  const [selectedChildren, setSelectedChildren] = useState([]);

  // Initialize data when appointment prop changes
  useEffect(() => {
    if (appointment) {
      setEditedBooking({
        ...appointment,
        vaccineList: appointment.vaccineList || [],
        comboList: appointment.comboList || []
      });

      setSelectedChildren(appointment.childrenList)
    }
  }, [appointment]);

  // Fetch vaccines and combos data
  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const [vaccinesRes, vaccineCombosRes] = await Promise.all([
          api.get(`${url}/Vaccine/get-all-vaccines`),
          api.get(`${url}/VaccineCombo/get-all-vaccine-combo`),
        ]);

        if (isMounted) {
          if (vaccinesRes.status === 200 && vaccineCombosRes.status === 200) {
            setAvailableVaccines(vaccinesRes.data);
            setAvailableVaccineCombos(vaccineCombosRes.data);
          } else {
            console.error("API error:", vaccinesRes.status, vaccineCombosRes.status);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error.response?.data || error.message);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [api]);

  // Handle checkbox changes for vaccines and combos
  const handleCheckboxChange = (listType, itemId, sourceList) => {
    if (!editedBooking) return;

    setEditedBooking((prev) => {
      const currentList = prev[listType] || [];
      const updatedList = currentList.some((item) => item.id === itemId)
        ? currentList.filter((item) => item.id !== itemId)
        : [...currentList, sourceList.find((item) => item.id === itemId)];
      return { ...prev, [listType]: updatedList };
    });
  };

  const handleSaveChanges = () => {
    if (editedBooking) {
      onSave(editedBooking);
    }
  };


  // Check vaccine suitability
  const isVaccineSuitableForAnyChild = (vaccine) => {
    if (!selectedChildren.length) return true;
    return selectedChildren.some((child) =>
      child.age >= (vaccine.suggestAgeMin || 0) &&
      child.age <= (vaccine.suggestAgeMax || Infinity)
    );
  };

  // Check combo suitability
  const isComboSuitableForAnyChild = (combo) => {
    if (!selectedChildren.length) return true;
    return selectedChildren.some((child) =>
      combo.vaccines.every((vaccine) =>
        child.age >= (vaccine.suggestAgeMin || 0) &&
        child.age <= (vaccine.suggestAgeMax || Infinity)
      )
    );
  };
  const checkValue = () => {
    if (!editedBooking || !appointment) return true; // Nếu chưa có dữ liệu, không cho sửa
    else if (editedBooking.vaccineList.length === 0 && editedBooking.comboList.length === 0) return true;
    // Kiểm tra xem vaccineList hoặc comboList có thay đổi không
    const vaccineChanged = JSON.stringify(editedBooking.vaccineList) !== JSON.stringify(appointment.vaccineList);
    const comboChanged = JSON.stringify(editedBooking.comboList) !== JSON.stringify(appointment.comboList);

    return !(vaccineChanged || comboChanged); // Nếu không có thay đổi thì true (vô hiệu hóa nút)
  };


  if (!editedBooking) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-50">
        <div className="flex items-center gap-2 text-blue-600">
          <div className="w-6 h-6 border-2 border-current border-t-transparent rounded-full animate-spin" />
          Loading...
        </div>
      </div>
    );
  }

  return (
    <Dialog open={true} onOpenChange={() => onCancel()}>
      <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col p-0">
        <DialogHeader className="p-6 pb-4 border-b border-gray-100">
          <DialogTitle className="text-2xl font-semibold flex items-center gap-2 text-blue-700">
            <Edit2 className="h-6 w-6" />
            Edit Vaccination Appointment
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-hidden">
          <div className="flex flex-col md:flex-row gap-6 p-2">
            {/* Left Column - Information */}
            <div className="w-full md:w-1/3 space-y-4">
              <Card className="border border-gray-200 shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <User className="h-5 w-5 text-blue-600" />
                    Appointment Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {editedBooking.id && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500">Booking ID:</span>
                      <span className="font-medium text-blue-600">#{editedBooking.id}</span>
                    </div>
                  )}
                  {editedBooking.parentName && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500">Parent Name:</span>
                      <span className="font-medium">{editedBooking.parentName}</span>
                    </div>
                  )}
                  {/* {editedBooking.phoneNumber !== undefined && (
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500">Phone Number:</span>
                      <span className="font-medium">{editedBooking.phoneNumber}</span>
                    </div>
                  )} */}
                  {
                    editedBooking.advisoryDetail && (
                      <div className="flex justify-between items-center">
                        <span className="text-gray-500">Advisory:</span>
                        <span className="font-medium">{ToUpperCase(editedBooking.advisoryDetail)}</span>
                      </div>
                    )
                  }
                </CardContent>
              </Card>

              <Card className="border border-gray-200 shadow-sm">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <Users className="h-5 w-5 text-blue-600" />
                    Children
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {selectedChildren?.map((child) => (
                    <div
                      key={child.childId}
                      className="p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-200 transition-colors"
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-gray-800">{child.name}</span>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-200">
                            {child.gender === 0 ? "Male" : "Female"}
                          </Badge>
                          <Badge variant="outline" className="border-blue-200 text-blue-700">
                            Age: {child.age}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Vaccines and Combos */}
            <div className="w-full md:w-2/3">
              <ScrollArea className="h-[60vh] pr-4">
                <div className="space-y-4">
                  <Card className="border border-gray-200 shadow-sm">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg font-semibold flex items-center gap-2">
                        <Syringe className="h-5 w-5 text-blue-600" />
                        Vaccines
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {availableVaccines.map((vaccine) => {
                        const isSuitable = isVaccineSuitableForAnyChild(vaccine);
                        return (
                          <label
                            key={vaccine.id}
                            className={`flex items-center justify-between p-3 rounded-lg border transition-all ${
                              isSuitable
                                ? "hover:bg-blue-50 border-gray-200 hover:border-blue-200"
                                : "opacity-50 cursor-not-allowed border-gray-200 bg-gray-50"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <Checkbox
                                checked={editedBooking.vaccineList?.some((v) => v.id === vaccine.id)}
                                onCheckedChange={() => handleCheckboxChange("vaccineList", vaccine.id, availableVaccines)}
                                disabled={!isSuitable}
                                className="border-gray-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                              />
                              <div>
                                <p className="font-medium text-gray-800">{vaccine.name}</p>
                                <p className="text-sm text-gray-500">
                                  Ages {vaccine.suggestAgeMin || 0}-{vaccine.suggestAgeMax || "∞"}
                                </p>
                              </div>
                            </div>
                            <span className="text-blue-600 font-medium">
                              {vaccine.price?.toLocaleString() || 0} VND
                            </span>
                          </label>
                        );
                      })}
                    </CardContent>
                  </Card>

                  <Card className="border border-gray-200 shadow-sm">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg font-semibold flex items-center gap-2">
                        <Package className="h-5 w-5 text-blue-600" />
                        Vaccine Combos
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {availableVaccineCombos.map((combo) => {
                        const isSuitable = isComboSuitableForAnyChild(combo);
                        return (
                          <label
                            key={combo.id}
                            className={`flex items-center justify-between p-3 rounded-lg border transition-all ${
                              isSuitable
                                ? "hover:bg-blue-50 border-gray-200 hover:border-blue-200"
                                : "opacity-50 cursor-not-allowed border-gray-200 bg-gray-50"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <Checkbox
                                checked={editedBooking.vaccineComboList?.some((c) => c.id === combo.id)}
                                onCheckedChange={() => handleCheckboxChange("vaccineComboList", combo.id, availableVaccineCombos)}
                                disabled={!isSuitable}
                                className="border-gray-300 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                              />
                              <div>
                                <p className="font-medium text-gray-800">{combo.comboName}</p>
                                <p className="text-sm text-gray-500">
                                  {combo.vaccines?.map((v) => v.name).join(", ") || ""}
                                </p>
                              </div>
                            </div>
                            <span className="text-blue-600 font-medium">
                              {combo.finalPrice?.toLocaleString() || 0} VND
                            </span>
                          </label>
                        );
                      })}
                    </CardContent>
                  </Card>
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>

        <DialogFooter className="p-6 pt-4 border-t border-gray-100">
          <Button
            variant="outline"
            onClick={onCancel}
            className="border-gray-300 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSaveChanges}
            className="bg-blue-600 text-white hover:bg-blue-700"
            disabled={checkValue()}
          >
            {checkValue() ? "No Changes" : loading ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Saving...
              </div>
            ) : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditAppointment;