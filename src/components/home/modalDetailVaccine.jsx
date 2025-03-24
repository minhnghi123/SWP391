"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Syringe, Tag, Globe, Baby, ShieldCheck, Calendar, Info } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import Infomation from '../../../Infomation.json'
import formatCurrency from '../../utils/calculateMoney'
import { useSelector } from 'react-redux'
import ToUpperCaseFirst from '../../utils/upperCaseFirstLetter'

const ModalDetailVaccine = ({ isOpen, onClose, vaccine, onClick }) => {
  if (!vaccine) return null;
  const vaccineImg = Infomation.vaccine.find(v => v.id === vaccine.id)?.img
  const isBooking = useSelector(state => state.vaccine.isBooking)
  const isBooked = isBooking?.some(bookingId => bookingId === `vaccine-${vaccine.id}`);
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[550px] p-0 overflow-hidden bg-white rounded-lg">
        <div className="bg-gradient-to-r from-blue-50 via-blue-100 to-blue-50">
          <DialogHeader className="p-6">
            <div className="flex items-center gap-2">
              <div className="bg-blue-100 p-2 rounded-full">
                <ShieldCheck className="h-6 w-6 text-blue-600" />
              </div>
              <DialogTitle className="text-blue-800 text-2xl font-semibold">{vaccine.name}</DialogTitle>
            </div>
            <p className="text-gray-600 mt-2 leading-relaxed">{vaccine.description}</p>
          </DialogHeader>
        </div>

        <Tabs defaultValue="details" className="w-full">
          <div className="px-6 pt-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="dosage">Dosage Information</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="details" className="p-6 pt-4 space-y-4">
            <div className="flex flex-col md:flex-row gap-6">
              <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-none shadow-sm md:w-1/3">
                <CardContent className="p-4 flex items-center justify-center">
                  <img src={vaccineImg} alt={vaccine.name} className="w-full h-full object-cover" />
                </CardContent>
              </Card>

              <div className="flex-1 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Tag className="h-5 w-5 text-blue-600" />
                    <span className="text-lg font-semibold text-gray-900">Price:</span>
                  </div>
                  <span className="text-xl font-bold text-blue-600">{formatCurrency(vaccine.price)} VND</span>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Status:</span>
                  <Badge
                    variant="outline"
                    className={cn(
                      "font-medium",
                      vaccine.status.toLowerCase().includes("available")
                        ? "bg-green-50 text-green-700 border-green-200"
                        : "bg-amber-50 text-amber-700 border-amber-200"
                    )}
                  >
                    {ToUpperCaseFirst(vaccine.status)}
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Globe className="h-5 w-5 text-blue-500" />
                    <span className="text-gray-700">Origin:</span>
                  </div>
                  <span className="font-medium">{vaccine.fromCountry}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Baby className="h-5 w-5 text-blue-500" />
                    <span className="text-gray-700">Recommended Age:</span>
                  </div>
                  <span className="font-medium">
                    {vaccine.suggestAgeMin} - {vaccine.suggestAgeMax} years
                  </span>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="dosage" className="p-6 pt-4 space-y-4">
            <Card>
              <CardContent className="p-4 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Syringe className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Required Doses</h4>
                    <p className="text-lg font-semibold text-blue-700">{vaccine.doesTimes} dose(s)</p>
                  </div>
                </div>

                <Separator />

                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <Calendar className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Interval Between Doses</h4>
                    <p className="text-gray-700">
                      {vaccine.minimumIntervalDate} - {vaccine.maximumIntervalDate} days
                    </p>
                  </div>
                </div>

                <div className="mt-2 bg-amber-50 border border-amber-200 rounded-lg p-3 flex gap-2">
                  <Info className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-amber-800">
                    For optimal protection, please follow the recommended dosage schedule. Consult with your healthcare
                    provider for personalized advice.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <DialogFooter className="p-6 bg-gray-50">
          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <Button variant="outline" className="sm:flex-1 border-gray-300 text-gray-700" onClick={() => onClose(false)}>
              Close
            </Button>
            <Button
              className={`sm:flex-1 ${isBooked ? 'bg-gray-400' : 'bg-blue-500'} text-white rounded-lg hover:${isBooked ? 'bg-gray-500' : 'bg-blue-600'} transition-colors duration-300`}
              onClick={() => {
                onClick()
                // onClose(false);
              }}
            >
              {isBooked ? 'Booking' : 'Book Now'}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ModalDetailVaccine;
