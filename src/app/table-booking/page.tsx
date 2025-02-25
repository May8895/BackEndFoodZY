"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/src/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/src/components/ui/tabs"
import { Circle, Users, Calendar, MapPin, Clock, ChefHat, Wine, Utensils, Coffee } from "lucide-react"
import { CustomerInputDialog } from "@/src/components/floor-plan/customer-input-dialog"
import { Table } from "@/src/components/floor-plan/table"
import { Dialog } from "@/src/components/ui/dialog"
import type { TableData, TableStatus } from "@/src/components/floor-plan/floor-plan"
import { useToast } from "@/hooks/use-toast"
import { motion, AnimatePresence } from "framer-motion"

const TableShape = ({ status, number, seats }: { status: TableStatus; number: string; seats: number }) => {
    const getStatusStyle = (status: TableStatus) => {
      switch (status) {
        case "available":
          return "border-emerald-500 bg-gradient-to-br from-emerald-50 to-emerald-100"
        case "reserved":
          return "border-amber-500 bg-gradient-to-br from-amber-50 to-amber-100"
        default:
          return "border-rose-500 bg-gradient-to-br from-rose-50 to-rose-100"
      }
    }
  
    const getStatusIcon = (status: TableStatus) => {
      switch (status) {
        case "available":
          return <Utensils className="w-6 h-6 text-emerald-500" />
        case "reserved":
          return <Clock className="w-6 h-6 text-amber-500" />
        default:
          return <Users className="w-6 h-6 text-rose-500" />
      }
    }
  
    return (
      <div className="relative w-full aspect-square p-2">
        {/* Main table circle */}
        <div className={`absolute inset-0 rounded-full ${getStatusStyle(status)} border-4 shadow-lg`}>
          {/* Decorative elements */}
          <div className="absolute inset-2 rounded-full border-2 border-dashed opacity-30"></div>
          <div className="absolute inset-4 rounded-full border border-current opacity-10"></div>
  
          {/* Table content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            {getStatusIcon(status)}
            <span className="text-2xl font-bold mt-2 font-serif">{number}</span>
            <div className="flex items-center mt-1 text-sm">
              <Users className="w-4 h-4 mr-1" />
              <span>{seats}</span>
            </div>
          </div>
  
          {/* Status indicator dot */}
          <div
            className="absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-white shadow-sm"
            style={{
              backgroundColor: status === "available" ? "#10B981" : status === "reserved" ? "#F59E0B" : "#EF4444",
            }}
          ></div>
        </div>
      </div>
    )
  }
  
  const StatusBadge = ({ status }: { status: TableStatus }) => {
    const getStatusStyle = (status: TableStatus) => {
      switch (status) {
        case "available":
          return "bg-emerald-100 text-emerald-800 border-emerald-200"
        case "reserved":
          return "bg-amber-100 text-amber-800 border-amber-200"
        default:
          return "bg-rose-100 text-rose-800 border-rose-200"
      }
    }
  
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusStyle(status)} capitalize`}>
        {status}
      </span>
    )
  }
  
  const DecorativeDivider = () => (
    <div className="flex items-center justify-center my-8">
      <div className="h-px bg-amber-200 w-1/4"></div>
      <Wine className="mx-4 text-amber-400" />
      <div className="h-px bg-amber-200 w-1/4"></div>
    </div>
  )
  
  const MobileFloorPlan: React.FC = () => {
    const [selectedTable, setSelectedTable] = useState<TableData | null>(null)
    const [currentFloor, setCurrentFloor] = useState<number>(1)
    const [showCustomerInputDialog, setShowCustomerInputDialog] = useState(false)
    const [selectedTableId, setSelectedTableId] = useState<string | null>(null)
    const [tables, setTables] = useState<TableData[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const { toast } = useToast()
  
    useEffect(() => {
      fetchTables()
    }, [])
  
    const fetchTables = async () => {
      setIsLoading(true)
      try {
        const response = await fetch("/api/tables")
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`)
        const data = await response.json()
        setTables(data)
      } catch (error) {
        console.error("Error fetching tables:", error)
        toast({
          title: "Error",
          description: "Failed to load tables. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }
  
    const handleTableClick = (table: TableData) => {
      if (table.status === "available") {
        setSelectedTableId(table.id)
        setShowCustomerInputDialog(true)
      } else {
        toast({
          title: "Table Unavailable",
          description: "This table is currently not available for booking.",
          variant: "default",
        })
      }
    }
  
    const handleCustomerInput = async (data: { numberOfCustomers: number }) => {
      if (selectedTableId) {
        const updatedTable = {
          ...tables.find((table) => table.id === selectedTableId)!,
          status: "reserved" as TableStatus,
          numberOfCustomers: data.numberOfCustomers,
        }
        await updateTable(updatedTable)
        toast({
          title: "Booking Confirmed! 🎉",
          description: `Table ${updatedTable.number} has been reserved for ${data.numberOfCustomers} guests.`,
          variant: "default",
        })
      }
      setShowCustomerInputDialog(false)
      setSelectedTableId(null)
    }
  
    const updateTable = async (updatedTable: TableData) => {
      try {
        const response = await fetch(`/api/tables/${updatedTable.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedTable),
        })
        if (!response.ok) throw new Error("Failed to update table")
        const updatedTableData = await response.json()
        setTables((prevTables) =>
          prevTables.map((table) => (table.id === updatedTableData.id ? updatedTableData : table)),
        )
      } catch (error) {
        console.error("Error updating table:", error)
        toast({
          title: "Booking Failed",
          description: "Unable to complete your booking. Please try again.",
          variant: "destructive",
        })
      }
    }
  
    const getCurrentFloorTables = () => {
      return tables
        .filter((table) => table.floor === currentFloor)
        .sort((a, b) => Number.parseInt(a.number) - Number.parseInt(b.number))
    }
  
    const handleRemoveTable = () => {
      toast({
        title: "Action Not Allowed",
        description: "Removing tables is not permitted for customers.",
        variant: "destructive",
      })
    }
  
    return (
      <div className="min-h-screen bg-[url('/subtle-prism.svg')] bg-fixed">
        <header className="relative bg-amber-600 text-white py-12 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-30"></div>
          <div className="absolute inset-0 bg-[url('/restaurant-ambiance.jpg')] bg-cover bg-center opacity-20"></div>
          <div className="relative z-10">
            <div className="flex justify-center mb-6">
              <div className="bg-white/20 p-4 rounded-full backdrop-blur-sm">
                <ChefHat className="w-12 h-12" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-center mb-3 font-serif">FoodZy</h1>
            <p className="text-center text-amber-200 text-lg font-light mb-4">Exquisite Dining Experience</p>
            <div className="flex justify-center gap-6 text-amber-100 text-sm">
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                <span>Open Daily: 11AM - 11PM</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2" />
                <span>123 Gourmet St, Foodville</span>
              </div>
            </div>
          </div>
        </header>
  
        <main className="max-w-lg mx-auto p-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 mb-8">
            <h2 className="text-2xl font-semibold text-amber-800 mb-6 text-center font-serif">Reserve Your Table</h2>
            <Tabs value={currentFloor.toString()} onValueChange={(value) => setCurrentFloor(Number(value))}>
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger
                  value="1"
                  className="data-[state=active]:bg-amber-600 data-[state=active]:text-white py-3 rounded-l-full"
                >
                  Ground Floor
                </TabsTrigger>
                <TabsTrigger
                  value="2"
                  className="data-[state=active]:bg-amber-600 data-[state=active]:text-white py-3 rounded-r-full"
                >
                  Upper Floor
                </TabsTrigger>
              </TabsList>
            </Tabs>
  
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-amber-600"></div>
              </div>
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentFloor}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-2 gap-4"
                >
                  {getCurrentFloorTables().map((table) => (
                    <motion.div
                      key={table.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      className={`bg-white rounded-2xl p-4 border border-amber-100 transition-all hover:shadow-xl ${
                        table.status === "available" ? "cursor-pointer" : "opacity-75"
                      }`}
                      onClick={() => handleTableClick(table)}
                    >
                      <TableShape status={table.status} number={table.number} seats={table.numberOfCustomers || 4} />
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            )}
          </div>
  
          <DecorativeDivider />
  
          <div className="text-center text-amber-800">
            <h3 className="text-xl font-semibold mb-4 font-serif">Special Offers</h3>
            <p className="text-sm mb-2">🍽️ Complimentary appetizer with every main course</p>
            <p className="text-sm mb-2">🍷 Wine tasting every Friday evening</p>
            <p className="text-sm">👨‍🍳 Meet our chef on the last Sunday of each month</p>
          </div>
        </main>
  
        <footer className=" bg-amber-600 text-amber-100 py-8 px-4 text-center mt-12">
          <p className="text-lg font-serif mb-2">FoodZy</p>
          <p className="text-sm mb-4">Where Every Meal Tells a Story</p>
          <p className="text-sm">For reservations: (555) 123-4567</p>
          <p className="text-xs mt-4 text-amber-300">© 2025 FoodZy. All rights reserved.</p>
        </footer>
  
        <Dialog open={showCustomerInputDialog}>
          <CustomerInputDialog
            open={showCustomerInputDialog}
            onOpenChange={() => setShowCustomerInputDialog(false)}
            onSubmit={handleCustomerInput}
            setSelectedTable={setSelectedTable}
            selectedTableId={selectedTableId}
            tables={tables}
            mode="add"
            handleRemoveTable={handleRemoveTable}
          />
        </Dialog>
      </div>
    )
  }
  
  export default MobileFloorPlan