import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Users, Syringe } from "lucide-react"

const SummaryCard = ({ data }) => {
  const uniqueParents = new Set(data.map((item) => item.userName)).size;
  const totalVaccinations = data.length;
  const uniqueChildren = new Set(data.map((item) => item.childId)).size;
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card className="border-blue-100 bg-white shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium ">Total Parents</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <Users className="h-5 w-5  mr-2" />
            <div className="text-2xl font-bold">{uniqueParents}</div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-blue-100 bg-white shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium">Total Children</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className=" mr-2"
            >
              <path d="M9 18h6"></path>
              <path d="M10 22h4"></path>
              <path d="m3 9 9-7 9 7v13H3V9z"></path>
            </svg>
            <div className="text-2xl font-bold ">{uniqueChildren}</div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-blue-100 bg-white shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium ">Total Vaccinations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <Syringe className="h-5 w-5 mr-2" />
            <div className="text-2xl font-bold ">{totalVaccinations}</div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default SummaryCard
