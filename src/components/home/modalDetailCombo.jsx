"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Package, Calendar, Tag, AlertCircle, CheckCircle, Shield, Info, Percent } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import Infomation from '../../../Infomation.json'
import formatCurrency from '../../utils/calculateMoney'
import { useSelector } from 'react-redux'
import ToUpperCaseFirst from '../../utils/upperCaseFirstLetter'
const ModalDetailCombo = ({ isOpen, onClose, combo, onClick }) => {
    if (!combo) return null

    // Use the appropriate name field
    const comboName = combo.name || combo.comboName
    const comboImg = Infomation.vaccineCombo.find(v => v.id === combo.id)?.img
    // Use the appropriate price fields
    const originalPrice = combo.priceGoc || combo.totalPrice
    const salePrice = combo.priceSale || combo.finalPrice
    const isBooking = useSelector(state => state.vaccine.isBooking)
    const isBooked = isBooking?.some(bookingId => bookingId === `combo-${combo.id}`);
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[700px] p-0 overflow-hidden bg-white rounded-lg">
                {/* Header with gradient background */}
                <div className="bg-gradient-to-r from-blue-50 via-blue-100 to-blue-50">
                    <DialogHeader className="p-6">
                        <div className="flex items-center gap-2">
                            <div className="bg-blue-100 p-2 rounded-full">
                                <Package className="h-6 w-6 text-blue-600" />
                            </div>
                            <DialogTitle className="text-blue-800 text-2xl font-semibold">{comboName}</DialogTitle>
                        </div>
                        <p className="text-gray-600 mt-2 leading-relaxed">
                            {combo.description || "Complete vaccination package for comprehensive protection"}
                        </p>
                    </DialogHeader>
                </div>

                <Tabs defaultValue="details" className="w-full">
                    <div className="px-6 pt-4">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="details">Overview</TabsTrigger>
                            <TabsTrigger value="vaccines">Included Vaccines</TabsTrigger>
                            <TabsTrigger value="info">Important Info</TabsTrigger>
                        </TabsList>
                    </div>

                    <TabsContent value="details" className="p-6 pt-4 space-y-6">
                        <div className="flex flex-col md:flex-row gap-6">
                            {/* Package Image */}
                            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-none shadow-sm md:w-2/5">
                                <CardContent className="p-4 flex items-center justify-center h-60">
                                    <img
                                        src={comboImg || "/placeholder.svg?height=200&width=200"}
                                        alt={comboName}
                                        className="max-h-full object-contain"
                                    />
                                </CardContent>
                            </Card>

                            {/* Package Details */}
                            <div className="flex-1 space-y-4">
                                <Card>
                                    <CardContent className="p-4 space-y-4">
                                        <div className="flex items-center gap-2">
                                            <Tag className="h-5 w-5 text-blue-600" />
                                            <h3 className="font-semibold text-blue-800">Pricing Details</h3>
                                        </div>

                                        <div className="space-y-3">
                                            {originalPrice && (
                                                <div className="flex justify-between items-center">
                                                    <span className="text-gray-600">Original Price:</span>
                                                    <span className="text-gray-500 line-through">{formatCurrency(originalPrice)} VND</span>
                                                </div>
                                            )}

                                            <div className="flex justify-between items-center">
                                                <span className="font-medium text-gray-700">Sale Price:</span>
                                                <span className="text-xl font-bold text-blue-600">{formatCurrency(salePrice)} VND</span>
                                            </div>

                                            {combo.discount > 0 && (
                                                <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center justify-between">
                                                    <div className="flex items-center gap-2">
                                                        <Percent className="h-4 w-4 text-green-600" />
                                                        <span className="text-sm font-medium text-green-700">Discount:</span>
                                                    </div>
                                                    <Badge className="bg-green-500 hover:bg-green-600">{combo.discount}% off</Badge>
                                                </div>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardContent className="p-4 space-y-4">
                                        <div className="flex items-center gap-2">
                                            <Info className="h-5 w-5 text-blue-600" />
                                            <h3 className="font-semibold text-blue-800">Package Details</h3>
                                        </div>

                                        <div className="space-y-3">
                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-600">Status:</span>
                                                <Badge
                                                    variant="outline"
                                                    className={
                                                        combo.status === "AVAILABLE"
                                                            ? "bg-green-50 text-green-700 border-green-200"
                                                            : "bg-amber-50 text-amber-700 border-amber-200"
                                                    }
                                                >
                                                    {ToUpperCaseFirst(combo.status)}
                                                </Badge>
                                            </div>

                                            {combo.minAge !== undefined && combo.maxAge !== undefined && (
                                                <div className="flex justify-between items-center">
                                                    <div className="flex items-center gap-2">
                                                        <Calendar className="h-4 w-4 text-blue-500" />
                                                        <span className="text-gray-600">Recommended Age:</span>
                                                    </div>
                                                    <span className="font-medium">
                                                        {combo.minAge} - {combo.maxAge} months
                                                    </span>
                                                </div>
                                            )}

                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-600">Vaccines Included:</span>
                                                <span className="font-medium">{combo.vaccines.length}</span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="vaccines" className="p-6 pt-4">
                        <Card>
                            <CardContent className="p-4">
                                <div className="flex items-center gap-2 mb-4">
                                    <Shield className="h-5 w-5 text-blue-600" />
                                    <h3 className="font-semibold text-blue-800">Included Vaccines</h3>
                                </div>

                                <ScrollArea className="h-[300px] pr-4">
                                    <div className="space-y-3">
                                        {combo.vaccines.map((vaccine, index) => (
                                            <Card key={index} className="border-blue-100">
                                                <CardContent className="p-4">
                                                    <div className="flex justify-between items-start">
                                                        <div>
                                                            <h4 className="font-medium text-blue-800">{vaccine.name}</h4>
                                                            {vaccine.description && (
                                                                <p className="text-sm text-gray-600 mt-1">{vaccine.description}</p>
                                                            )}
                                                        </div>
                                                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                                                            {formatCurrency(vaccine.price)} VND
                                                        </Badge>
                                                    </div>

                                                    <div className="flex items-center mt-3 text-sm text-gray-600">
                                                        <Calendar className="h-4 w-4 text-blue-500 mr-2" />
                                                        <span>
                                                            Recommended age: {vaccine.suggestAgeMin} - {vaccine.suggestAgeMax}{" "}
                                                            {vaccine.suggestAgeMax > 24 ? "months" : "years"}
                                                        </span>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </div>
                                </ScrollArea>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="info" className="p-6 pt-4">
                        <Card>
                            <CardContent className="p-4 space-y-4">
                                <div className="flex items-center gap-2">
                                    <AlertCircle className="h-5 w-5 text-blue-600" />
                                    <h3 className="font-semibold text-blue-800">Important Information</h3>
                                </div>

                                <div className="space-y-4">
                                    <div className="bg-blue-50 rounded-lg p-4">
                                        <div className="flex gap-3">
                                            <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                                            <div>
                                                <h4 className="font-medium text-blue-800">Benefits</h4>
                                                <ul className="mt-2 space-y-2 text-sm text-gray-700">
                                                    <li>• Cost-effective compared to individual vaccinations</li>
                                                    <li>• Comprehensive protection against multiple diseases</li>
                                                    <li>• Carefully scheduled to maximize effectiveness</li>
                                                    <li>• Administered by certified healthcare professionals</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
                                        <div className="flex gap-3">
                                            <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                                            <div>
                                                <h4 className="font-medium text-amber-800">Important Notes</h4>
                                                <ul className="mt-2 space-y-2 text-sm text-amber-700">
                                                    <li>• Please consult with our healthcare providers about any pre-existing conditions</li>
                                                    <li>• Schedule your appointment in advance for better service</li>
                                                    <li>• Bring your vaccination record book to each appointment</li>
                                                    <li>• Follow post-vaccination care instructions provided by our staff</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>

                <DialogFooter className="p-6 bg-gray-50">
                    <div className="flex flex-col sm:flex-row gap-3 w-full">
                        <Button
                            variant="outline"
                            className="sm:flex-1 border-gray-300 text-gray-700"
                            onClick={() => onClose(false)}
                        >
                            Close
                        </Button>
                        <Button
                            className={`sm:flex-1 ${isBooked ? 'bg-gray-400' : 'bg-blue-500'} text-white rounded-lg hover:${isBooked ? 'bg-gray-500' : 'bg-blue-600'} transition-colors duration-300`}
                            onClick={() => {
                                onClick()
                                // onClose(false)
                            }}
                        >

                            {isBooked ? 'Booking' : 'Book Now'}

                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default ModalDetailCombo

