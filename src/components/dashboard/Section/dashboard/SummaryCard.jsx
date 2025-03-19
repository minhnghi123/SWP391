import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const SummaryCard = ({ title, value, description, icon: Icon }) => {
  return (
    <Card className="border-blue-100 bg-white shadow-sm">
      <CardHeader>
        <CardTitle className="text-sm font-medium text-gray-500 flex items-center gap-2">
          <Icon className="h-4 w-4 text-blue-500" /> {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
        <p className="text-xs text-gray-500">{description}</p>
      </CardContent>
    </Card>
  );
};

export default SummaryCard;