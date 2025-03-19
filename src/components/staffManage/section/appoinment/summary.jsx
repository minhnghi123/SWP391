import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import formatCurrency from "../../../../utils/calculateMoney";
import { Users, Clock, TrendingUp } from "lucide-react";

const Summary = ({filteredAppointments}) => {
    const totalBookings = filteredAppointments.length;
    const pendingBookings = filteredAppointments.filter(a => a.status === 'Pending').length;
    const successRate = totalBookings > 0 
      ? Math.round((filteredAppointments.filter(a => a.status === 'Success').length / totalBookings) * 100)
      : 0;
      
    return (
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="border border-blue-100 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-700">Total Bookings</CardTitle>
              <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                <Users className="h-4 w-4 text-blue-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-800">{totalBookings}</div>
              <p className="text-xs text-blue-500 mt-1">
                +20.1% from last month
              </p>
            </CardContent>
          </Card>
          
          <Card className="border border-blue-100 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-700">Pending Bookings</CardTitle>
              <div className="h-8 w-8 rounded-full bg-yellow-100 flex items-center justify-center">
                <Clock className="h-4 w-4 text-yellow-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">
                {pendingBookings}
              </div>
              <p className="text-xs text-blue-500 mt-1">
                Awaiting confirmation
              </p>
            </CardContent>
          </Card>
          
          <Card className="border border-blue-100 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-700">Success Rate</CardTitle>
              <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                <TrendingUp className="h-4 w-4 text-green-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {successRate}%
              </div>
              <p className="text-xs text-blue-500 mt-1">
                +5.1% from last month
              </p>
            </CardContent>
          </Card>
        </div>
    )
}

export default Summary;
