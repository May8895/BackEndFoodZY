// "use client"

// import { Button } from "@/src/components/ui/button"
// import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle } from "@/src/components/ui/sheet"
// import { Tabs, TabsList, TabsTrigger } from "@/src/components/ui/tabs"
// import cn from "classnames"
// import { Circle, Clock, Edit, Mail, Phone, Plus, PlusCircle, TableIcon, Users } from "lucide-react"
// import { useState } from "react"
// import { AddOrderDialog } from "./add-order-dialog"
// import { AddTableDialog } from "./add-table-dialog"
// import { CustomerInputDialog } from "./customer-input-dialog"
// import { Table } from "./table"

// export type TableStatus = "available" | "occupied" | "ordered" | "serving" | "reserved"
// export type OrderItem = {
//   id: string
//   name: string
//   quantity: number
//   price: number
//   status: "pending" | "preparing" | "served"
// }

// export type BookingInfo = {
//   customerName: string
//   phoneNumber: string
//   email: string
//   numberOfGuests: number
//   bookingTime: string
//   specialRequests?: string
// }

// export type TableData = {
//   id: string
//   number: string
//   status: TableStatus
//   orders: OrderItem[]
//   booking?: BookingInfo
//   numberOfCustomers?: number
//   totalCost?: number
// }

// // Initial table data
// const initialTables: TableData[] = [
//   {
//     id: "t1",
//     number: "T-01",
//     status: "available",
//     orders: [],
//   },
//   {
//     id: "t2",
//     number: "T-02",
//     status: "serving",
//     orders: [
//       { id: "o1", name: "Pad Thai", quantity: 2, price: 250, status: "served" },
//       { id: "o2", name: "Green Curry", quantity: 1, price: 180, status: "pending" },
//     ],
//   },
//   {
//     id: "t3",
//     number: "T-03",
//     status: "ordered",
//     orders: [
//       { id: "o3", name: "Tom Yum Kung", quantity: 1, price: 300, status: "preparing" },
//       { id: "o4", name: "Mango Sticky Rice", quantity: 2, price: 150, status: "pending" },
//     ],
//   },
//   {
//     id: "t6",
//     number: "T-06",
//     status: "reserved",
//     booking: {
//       customerName: "John Smith",
//       phoneNumber: "+66 89 123 4567",
//       email: "john.smith@email.com",
//       numberOfGuests: 4,
//       bookingTime: "19:00",
//       specialRequests: "Window seat preferred",
//     },
//     orders: [],
//   },
//   {
//     id: "t4",
//     number: "T-04",
//     status: "serving",
//     orders: [],
//   },
//   {
//     id: "t5",
//     number: "T-05",
//     status: "serving",
//     orders: [],
//   },
//   {
//     id: "t7",
//     number: "T-07",
//     status: "serving",
//     orders: [],
//   },
//   {
//     id: "t8",
//     number: "T-08",
//     status: "reserved",
//     orders: [],
//   },
//   {
//     id: "t9",
//     number: "T-09",
//     status: "ordered",
//     orders: [],
//   },
//   {
//     id: "t10",
//     number: "T-10",
//     status: "ordered",
//     orders: [],
//   },
//   {
//     id: "t11",
//     number: "T-11",
//     status: "serving",
//     orders: [],
//   },
//   {
//     id: "t12",
//     number: "T-12",
//     status: "reserved",
//     orders: [],
//   },
//   {
//     id: "t13",
//     number: "T-13",
//     status: "ordered",
//     orders: [],
//   },
//   {
//     id: "t14",
//     number: "T-14",
//     status: "reserved",
//     orders: [],
//   },
// ]

// export function FloorPlan() {
//   const [selectedTable, setSelectedTable] = useState<TableData | null>(null)
//   const [currentFloor, setCurrentFloor] = useState("floor-1")
//   const [showAddOrderDialog, setShowAddOrderDialog] = useState(false)
//   const [showCustomerInputDialog, setShowCustomerInputDialog] = useState(false)
//   const [selectedTableId, setSelectedTableId] = useState<string | null>(null)
//   const [tables, setTables] = useState<TableData[]>(initialTables)
//   const [showAddTableDialog, setShowAddTableDialog] = useState(false)
//   const [isRemoveMode, setIsRemoveMode] = useState(false)

//   const calculateTableTotal = (orders: OrderItem[]) => {
//     return orders
//       .filter((order) => order.status === "served")
//       .reduce((total, order) => total + order.price * order.quantity, 0)
//   }

//   const renderTableDetails = () => {
//     if (!selectedTable) return null

//     if (selectedTable.status === "reserved" && selectedTable.booking) {
//       return (
//         <div className="mt-6 space-y-6">
//           <div className="rounded-lg border bg-purple-50 p-4">
//             <div className="flex items-center gap-2 font-medium text-purple-700">
//               <Clock className="h-5 w-5" />
//               Reserved for {selectedTable.booking.bookingTime}
//             </div>
//           </div>

//           <div className="space-y-4">
//             <div className="flex items-center gap-3">
//               <Users className="h-5 w-5 text-gray-500" />
//               <div>
//                 <div className="font-medium">{selectedTable.booking.customerName}</div>
//                 <div className="text-sm text-gray-500">{selectedTable.booking.numberOfGuests} guests</div>
//               </div>
//             </div>

//             <div className="flex items-center gap-3">
//               <Phone className="h-5 w-5 text-gray-500" />
//               <div>
//                 <div className="font-medium">Phone</div>
//                 <div className="text-sm text-gray-500">{selectedTable.booking.phoneNumber}</div>
//               </div>
//             </div>

//             <div className="flex items-center gap-3">
//               <Mail className="h-5 w-5 text-gray-500" />
//               <div>
//                 <div className="font-medium">Email</div>
//                 <div className="text-sm text-gray-500">{selectedTable.booking.email}</div>
//               </div>
//             </div>

//             {selectedTable.booking.specialRequests && (
//               <div className="rounded-lg border p-4">
//                 <div className="font-medium">Special Requests</div>
//                 <div className="mt-1 text-sm text-gray-500">{selectedTable.booking.specialRequests}</div>
//               </div>
//             )}
//           </div>
//         </div>
//       )
//     }

//     // Render orders for ordered/serving tables
//     if (selectedTable.orders && selectedTable.orders.length > 0) {
//       const total = calculateTableTotal(selectedTable.orders)

//       return (
//         <div className="mt-6">
//           <div className="space-y-4">
//             {selectedTable.orders.map((order) => (
//               <div key={order.id} className="flex items-center justify-between rounded-lg border p-4">
//                 <div>
//                   <div className="font-medium">{order.name}</div>
//                   <div className="text-sm text-gray-500">Quantity: {order.quantity}</div>
//                 </div>
//                 <div className="text-right">
//                   <div className="font-medium">฿{(order.price * order.quantity).toLocaleString()}</div>
//                   <div className={cn("text-sm", order.status === "served" ? "text-green-600" : "text-gray-500")}>
//                     {order.status}
//                   </div>
//                 </div>
//                 {order.status !== "served" && (
//                   <Button size="sm" variant="outline" onClick={() => handleServeOrder(selectedTable.id, order.id)}>
//                     Serve
//                   </Button>
//                 )}
//               </div>
//             ))}
//           </div>
//           <div className="mt-6 border-t pt-4">
//             <div className="flex justify-between items-center">
//               <div className="font-semibold text-lg">Total (Served Items)</div>
//               <div className="font-semibold text-lg">฿{total.toLocaleString()}</div>
//             </div>
//           </div>
//           <div className="mt-4 space-y-2">
//             <Button
//               className="w-full bg-green-600 hover:bg-green-700 text-white"
//               onClick={() => handleCompleteTable(selectedTable.id)}
//             >
//               Complete Order
//             </Button>
//             <Button
//               className="w-full"
//               onClick={() => {
//                 setShowAddOrderDialog(true)
//                 setSelectedTableId(selectedTable.id)
//               }}
//             >
//               <Plus className="w-4 h-4 mr-2" />
//               Add Order
//             </Button>
//           </div>
//         </div>
//       )
//     }

//     return (
//       <div className="flex h-[400px] items-center justify-center">
//         <div className="text-center text-gray-500">No information available</div>
//       </div>
//     )
//   }

//   const handleServeOrder = (tableId: string, orderId: string) => {
//     setTables((prevTables) =>
//       prevTables.map((table) =>
//         table.id === tableId
//           ? {
//             ...table,
//             orders: table.orders.map((order) => (order.id === orderId ? { ...order, status: "served" } : order)),
//           }
//           : table,
//       ),
//     )
//   }

//   const handleTableClick = (table: TableData) => {
//     if (isRemoveMode) {
//       handleRemoveTable(table.id)
//       return
//     }

//     if (table.status === "available") {
//       setSelectedTableId(table.id)
//       setShowCustomerInputDialog(true)
//     } else if (
//       table.status === "ordered" ||
//       table.status === "serving" ||
//       table.status === "occupied" ||
//       table.status === "reserved"
//     ) {
//       setSelectedTable(table)
//     }
//   }

//   const handleCustomerInput = (data: { numberOfCustomers: number; totalCost: number }) => {
//     if (selectedTableId) {
//       setTables((prevTables) =>
//         prevTables.map((table) =>
//           table.id === selectedTableId
//             ? {
//               ...table,
//               status: "occupied",
//               numberOfCustomers: data.numberOfCustomers,
//               totalCost: data.totalCost,
//             }
//             : table,
//         ),
//       )
//     }
//     setShowCustomerInputDialog(false)
//     setSelectedTableId(null)
//   }

//   const handleCompleteTable = (tableId: string) => {
//     setTables((prevTables) =>
//       prevTables.map((table) =>
//         table.id === tableId
//           ? {
//             ...table,
//             status: "available",
//             numberOfCustomers: undefined,
//             totalCost: undefined,
//             orders: [],
//           }
//           : table,
//       ),
//     )
//   }

//   const handleRemoveTable = (tableId: string) => {
//     setTables((prevTables) => prevTables.filter((table) => table.id !== tableId))
//     // Remove the following line to keep the remove mode active after deleting a table
//     // setIsRemoveMode(false)
//   }

//   const handleAddTable = (newTable: Omit<TableData, "id">) => {
//     const id = `t${tables.length + 1}`
//     setTables([...tables, { ...newTable, id }])
//   }

//   return (
//     <div className="flex flex-col gap-6">
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-3xl font-bold">Floor Plan</h1>
//           <p className="text-gray-500">Manage and monitor table status</p>
//         </div>
//       </div>

//       <div className="flex items-center gap-4">
//         <Tabs value={currentFloor} onValueChange={setCurrentFloor}>
//           <TabsList>
//             <TabsTrigger value="floor-1">Floor-1</TabsTrigger>
//             <TabsTrigger value="floor-2">2nd Floor</TabsTrigger>
//           </TabsList>
//           <Button variant="outline" size="sm" onClick={() => console.log("Refresh floor plan")}>
//             Refresh
//           </Button>
//         </Tabs>
//         <div className="ml-auto flex items-center gap-4">
//           <div className="flex items-center gap-2">
//             <Circle className="h-3 w-3 fill-red-500 text-red-500" />
//             <span className="text-sm">Ordered</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <Circle className="h-3 w-3 fill-green-500 text-green-500" />
//             <span className="text-sm">Serving</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <Circle className="h-3 w-3 fill-purple-500 text-purple-500" />
//             <span className="text-sm">Reserved</span>
//           </div>
//           <div className="flex items-center gap-2">
//             <Circle className="h-3 w-3 fill-gray-200 text-gray-200" />
//             <span className="text-sm">Available</span>
//           </div>
//         </div>
//       </div>

//       <div className="relative min-h-[600px] rounded-lg border bg-white p-8">
//         {isRemoveMode && (
//           <div className="absolute inset-0 bg-red-100 bg-opacity-50 flex items-center justify-center z-10">
//             <p className="text-red-600 font-semibold">Click on a table to remove it</p>
//           </div>
//         )}
//         <div className="flex gap-8">
//           {/* Floor Plan Grid */}
//           <div className="flex-1 bg-gray-100 p-4 rounded-lg relative">
//             <div className="grid grid-cols-4 gap-8">
//               {tables.map((table) => (
//                 <Table
//                   key={table.id}
//                   table={table}
//                   onClick={() => handleTableClick(table)}
//                   onComplete={() => handleCompleteTable(table.id)}
//                   isRemoveMode={isRemoveMode}
//                   onRemove={() => handleRemoveTable(table.id)}
//                 />
//               ))}
//               <div className="col-span-1 flex aspect-square items-center justify-center rounded-lg border border-dashed relative">
//                 <div className="text-center">
//                   <TableIcon className="mx-auto h-8 w-8 text-gray-400" />
//                   <span className="mt-2 block text-sm text-gray-500">Cashier</span>
//                 </div>
//               </div>
//             </div>

//             {/* Add Table and Edit Buttons */}
//             <div className="absolute bottom-4 right-4 flex items-center gap-2">
//               <Button
//                 variant="outline"
//                 size="sm"
//                 className={cn(
//                   "flex items-center gap-2 rounded-xl border-2 border-dashed p-2",
//                   isRemoveMode
//                     ? "border-red-500 text-red-500 bg-red-50"
//                     : "border-gray-300 hover:border-red-500 hover:text-red-500 hover:bg-red-50",
//                 )}
//                 onClick={() => setIsRemoveMode(!isRemoveMode)}
//               >
//                 <Edit className="h-4 w-4" />
//                 <span className="font-medium">{isRemoveMode ? "Cancel Remove" : "Remove Table"}</span>
//               </Button>
//               <Button
//                 variant="outline"
//                 size="sm"
//                 className="flex items-center gap-2 rounded-xl border-2 border-dashed border-gray-300 p-2 hover:border-[#f77700] hover:text-[#f77700] hover:bg-orange-50"
//                 onClick={() => setShowAddTableDialog(true)}
//               >
//                 <PlusCircle className="h-4 w-4" />
//                 <span className="font-medium">Add Table</span>
//               </Button>
//             </div>
//           </div>
//         </div>
//       </div>

//       <Sheet open={selectedTable !== null} onOpenChange={() => setSelectedTable(null)}>
//         <SheetContent side="right">
//           <SheetHeader>
//             <SheetTitle>
//               Table {selectedTable?.number} - {selectedTable?.status === "reserved" ? "Reservation" : "Orders"}
//             </SheetTitle>
//           </SheetHeader>
//           <div className="py-4">{renderTableDetails()}</div>
//           <SheetFooter>
//             <Button onClick={() => setSelectedTable(null)}>Close</Button>
//           </SheetFooter>
//         </SheetContent>
//       </Sheet>

//       <AddOrderDialog
//         open={showAddOrderDialog}
//         onOpenChange={setShowAddOrderDialog}
//         onAddOrder={(newOrder) => {
//           if (selectedTableId) {
//             setTables((prevTables) =>
//               prevTables.map((table) =>
//                 table.id === selectedTableId
//                   ? {
//                     ...table,
//                     orders: [...table.orders, { ...newOrder, id: `o${Date.now()}`, status: "pending" }],
//                     status: table.status === "available" ? "ordered" : table.status,
//                   }
//                   : table,
//               ),
//             )
//           }
//           setShowAddOrderDialog(false)
//         }}
//       />
//       <CustomerInputDialog
//         open={showCustomerInputDialog}
//         onOpenChange={setShowCustomerInputDialog}
//         // onSubmit={handleCustomerInput}
//         onSubmit={(data) => handleCustomerInput({ ...data, totalCost: 0 })}

//       />
//       <AddTableDialog open={showAddTableDialog} onOpenChange={setShowAddTableDialog} onAddTable={handleAddTable} />
//     </div>
//   )
// }
"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/src/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/src/components/ui/tabs"
import { Circle, PlusCircle } from "lucide-react"
import { AddTableDialog } from "./add-table-dialog"
import { CustomerInputDialog } from "./customer-input-dialog"
import { Table } from "./table"
import { TableDetails } from "./table-details"
import { Dialog } from "@/src/components/ui/dialog"
export type TableStatus = "available" | "ordered" | "serving" | "reserved"
export type OrderItem = {
  id: string
  name: string
  quantity: number
  price: number
  status: "pending" | "preparing" | "served"
}
export type BookingInfo = {
  customerName: string
  phoneNumber: string
  email: string
  numberOfGuests: number
  bookingTime: string
  specialRequests?: string
}
export type TableData = {
  id: string
  number: string
  status: TableStatus
  orders: OrderItem[]
  booking?: BookingInfo
  numberOfCustomers?: number
  totalCost?: number
  floor: number
}
const FloorPlan: React.FC = () => {
  const [selectedTable, setSelectedTable] = useState<TableData | null>(null)
  const [currentFloor, setCurrentFloor] = useState<number>(1)
  const [showCustomerInputDialog, setShowCustomerInputDialog] = useState(false)
  const [selectedTableId, setSelectedTableId] = useState<string | null>(null)
  const [tables, setTables] = useState<TableData[]>([])
  const [showAddTableDialog, setShowAddTableDialog] = useState(false)

  useEffect(() => {
    fetchTables()
  }, [])

  const fetchTables = async () => {
    try {
      const response = await fetch("/api/tables")
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      setTables(data)
    } catch (error) {
      console.error("Error fetching tables:", error)
    }
  }

  const handleTableClick = async (table: TableData) => {
    if (table.status === "available") {
      setSelectedTableId(table.id)
      setShowCustomerInputDialog(true)
    } else if (table.status === "ordered" || table.status === "serving" || table.status === "reserved") {
      setSelectedTable(table)
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
    }
    setShowCustomerInputDialog(false)
    setSelectedTableId(null)
  }

  const handleCompleteTable = async (tableId: string) => {
    const updatedTable = {
      ...tables.find((table) => table.id === tableId)!,
      status: "available" as TableStatus,
      numberOfCustomers: undefined,
      totalCost: undefined,
      orders: [],
    }
    await updateTable(updatedTable)
    setSelectedTable(null)
  }

  const handleRemoveTable = async (tableId: string) => {
    try {
      await fetch(`/api/tables/${tableId}`, { method: "DELETE" })
      setTables((prevTables) => prevTables.filter((table) => table.id !== tableId))
      setSelectedTable(null)
    } catch (error) {
      console.error("Error removing table:", error)
    }
  }

  const handleAddTable = async (newTable: Omit<TableData, "id" | "orders">): Promise<void> => {
    try {
      const response = await fetch("/api/tables", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTable),
      })
      if (!response.ok) {
        throw new Error("Failed to add table")
      }
      const addedTable = await response.json()
      setTables((prevTables) => [...prevTables, addedTable])
      setShowAddTableDialog(false)
    } catch (error) {
      console.error("Error adding table:", error)
    }
  }

  const updateTable = async (updatedTable: TableData) => {
    try {
      const response = await fetch(`/api/tables/${updatedTable.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTable),
      })
      if (!response.ok) {
        throw new Error("Failed to update table")
      }
      const updatedTableData = await response.json()
      setTables((prevTables) =>
        prevTables.map((table) => (table.id === updatedTableData.id ? updatedTableData : table)),
      )
    } catch (error) {
      console.error("Error updating table:", error)
    }
  }
  const getCurrentFloorTables = () => {
    return tables
      .filter((table) => table.floor === currentFloor)
      .sort((a, b) => Number.parseInt(a.number) - Number.parseInt(b.number))
  }

  return (
    <div className="flex flex-col gap-6 p-8 bg-background">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Floor Plan</h1>
          <p className="text-gray-500">Manage and monitor table status</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Tabs value={currentFloor.toString()} onValueChange={(value) => setCurrentFloor(Number(value))}>
          <TabsList>
            <TabsTrigger value="1">Floor 1</TabsTrigger>
            <TabsTrigger value="2">Floor 2</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="ml-auto flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Circle className="h-3 w-3 fill-red-500 text-red-500" />
            <span className="text-sm">Ordered</span>
          </div>
          <div className="flex items-center gap-2">
            <Circle className="h-3 w-3 fill-purple-500 text-purple-500" />
            <span className="text-sm">Serving</span>
          </div>
          <div className="flex items-center gap-2">
            <Circle className="h-3 w-3 fill-gray-500 text-gray-500" />
            <span className="text-sm">Reserved</span>
          </div>
          <div className="flex items-center gap-2">
            <Circle className="h-3 w-3 fill-green-500 text-green-500" />
            <span className="text-sm">Available</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-x-2 gap-y-2 w-full min-h-[200px] p-4 border border-border rounded-lg bg-white overflow-auto">
        {getCurrentFloorTables().map((table) => (
          <div
            key={table.id}
            className="border border-border flex items-center justify-center text-sm cursor-pointer w-full aspect-square"
            onClick={() => handleTableClick(table)}
          >
            <Table table={table} />
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <Button
          onClick={() => setShowAddTableDialog(true)}
          variant="ghost"
          className="bg-orange-500 hover:bg-orange-600 text-white border-none"
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Table
        </Button>
      </div>

      <Dialog open={!!selectedTable} onOpenChange={() => setSelectedTable(null)}>
        {selectedTable && (
          <TableDetails
            table={selectedTable}
            onClose={() => setSelectedTable(null)}
            onComplete={() => handleCompleteTable(selectedTable.id)}
            onUpdate={updateTable}
            onRemove={handleRemoveTable}
          />
        )}
      </Dialog>

      <Dialog open={showAddTableDialog} onOpenChange={setShowAddTableDialog}>
        <AddTableDialog
          open={showAddTableDialog}
          onOpenChange={setShowAddTableDialog}
          onAddTable={handleAddTable}
          currentFloor={currentFloor}
        />
      </Dialog>

      <Dialog open={showCustomerInputDialog}>
        <CustomerInputDialog
          open={showCustomerInputDialog}
          onOpenChange={() => setShowCustomerInputDialog(false)}
          onSubmit={handleCustomerInput}
          setSelectedTable={setSelectedTable}
          selectedTableId={selectedTableId}
          tables={tables}
          handleRemoveTable={handleRemoveTable}
        />
      </Dialog>
    </div>
  )
}

export default FloorPlan

