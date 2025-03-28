import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const VaccineInventory = ({ displayedVaccines, loading, error }) => {
  return (
    <Card className="border-blue-100 bg-white shadow-sm">
      <CardHeader className="border-b border-blue-50">
        <CardTitle className="text-blue-700 text-xl font-semibold">
          Vaccine Inventory
        </CardTitle>
        <p className="text-sm text-gray-600">
          Current vaccine stock levels and expiration dates
        </p>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4 sm:space-y-6">
          {loading ? (
            <p className="text-center text-blue-600">Loading vaccines...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : displayedVaccines.length > 0 ? (
            displayedVaccines.map((vaccine) => {
              const usedPercentage = Math.min(
                100 - (vaccine.quantity / 500) * 100,
                100
              );
              return (
                <div key={vaccine.id} className="space-y-2 sm:space-y-3">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                    <p className="text-sm font-medium text-gray-800">
                      {vaccine.name}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600">
                      {vaccine.quantity} doses remaining
                    </p>
                  </div>
                  <Progress
                    value={usedPercentage}
                    className="h-2 bg-gray-200"
                  />
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-xs text-gray-500">
                    <p>
                      Expires:{" "}
                      {new Date(vaccine.timeExpired).toLocaleDateString()}
                    </p>
                    <p>{usedPercentage.toFixed(0)}% used</p>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-center text-blue-600">
              No vaccines in inventory.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default VaccineInventory;
