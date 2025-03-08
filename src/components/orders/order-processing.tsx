// "use client"

// import { updateInventory } from "@/lib/inventory"
// import { Badge } from "@/src/components/ui/badge"
// import { Button } from "@/src/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card"
// import { CheckCircle2, Clock } from "lucide-react"
// import { useState } from "react"

// type OrderStatus = "pending" | "preparing" | "ready"

// interface OrderItem {
//   id: string
//   name: string
//   quantity: number
//   specialInstructions?: string
// }

// interface Order {
//   id: string
//   tableNumber: string
//   items: OrderItem[]
//   status: OrderStatus
//   timestamp: string
// }

// const initialOrders: Order[] = [
//   {
//     id: "1",
//     tableNumber: "T1",
//     items: [
//       { id: "1", name: "Pad Thai", quantity: 2 },
//       { id: "2", name: "Tom Yum Soup", quantity: 1, specialInstructions: "Extra spicy" },
//     ],
//     status: "pending",
//     timestamp: "2024-01-31T10:30:00Z",
//   },
//   {
//     id: "2",
//     tableNumber: "T3",
//     items: [
//       { id: "3", name: "Green Curry", quantity: 1 },
//       { id: "4", name: "Mango Sticky Rice", quantity: 2 },
//     ],
//     status: "preparing",
//     timestamp: "2024-01-31T10:35:00Z",
//   },
// ]

// export function OrderProcessing() {
//   const [orders, setOrders] = useState<Order[]>(initialOrders)

//   const updateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
//     setOrders((prevOrders) =>
//       prevOrders.map((order) => {
//         if (order.id === orderId) {
//           if (newStatus === "ready" && order.status !== "ready") {
//             // Update inventory when the order is marked as ready
//             order.items.forEach((item) => {
//               updateInventory(item.name, item.quantity)
//             })
//           }
//           return { ...order, status: newStatus }
//         }
//         return order
//       }),
//     )
//   }

//   const getStatusColor = (status: OrderStatus) => {
//     switch (status) {
//       case "pending":
//         return "bg-yellow-100 text-yellow-800"
//       case "preparing":
//         return "bg-blue-100 text-blue-800"
//       case "ready":
//         return "bg-green-100 text-green-800"
//       default:
//         return "bg-gray-100 text-gray-800"
//     }
//   }

//   return (
//     <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//       {orders.map((order) => (
//         <Card key={order.id}>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Table {order.tableNumber}</CardTitle>
//             <Badge className={getStatusColor(order.status)}>
//               {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
//             </Badge>
//           </CardHeader>
//           <CardContent>
//             <div className="space-y-2">
//               {order.items.map((item) => (
//                 <div key={item.id} className="flex justify-between">
//                   <span>{item.name}</span>
//                   <span>x{item.quantity}</span>
//                 </div>
//               ))}
//               {order.items.some((item) => item.specialInstructions) && (
//                 <div className="mt-2 text-sm text-gray-500">
//                   <strong>Special Instructions:</strong>
//                   <ul className="list-disc pl-5">
//                     {order.items
//                       .filter((item) => item.specialInstructions)
//                       .map((item) => (
//                         <li key={item.id}>{item.specialInstructions}</li>
//                       ))}
//                   </ul>
//                 </div>
//               )}
//             </div>
//             <div className="mt-4 flex items-center justify-between">
//               <div className="flex items-center text-sm text-gray-500">
//                 <Clock className="mr-1 h-4 w-4" />
//                 {new Date(order.timestamp).toLocaleTimeString()}
//               </div>
//               {order.status !== "ready" && (
//                 <Button
//                   size="sm"
//                   onClick={() => updateOrderStatus(order.id, order.status === "pending" ? "preparing" : "ready")}
//                 >
//                   {order.status === "pending" ? "Start Preparing" : "Mark as Ready"}
//                 </Button>
//               )}
//               {order.status === "ready" && (
//                 <div className="flex items-center text-green-600">
//                   <CheckCircle2 className="mr-1 h-4 w-4" />
//                   Ready
//                 </div>
//               )}
//             </div>
//           </CardContent>
//         </Card>
//       ))}
//     </div>
//   )
// }

// Note: updateInventory function should be implemented in lib/inventory.ts
// It should decrease the inventory count for each item in the order

"use client"

import { Badge } from "@/src/components/ui/badge"
import { Button } from "@/src/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card"
import { useToast } from "@/src/components/ui/use-toast"
// import type { Order } from "@/src/types"
import { CheckCircle2, Clock, Utensils } from "lucide-react"
import { useState, useEffect, useMemo } from "react"


interface OrderItem {
  id: string
  name: string
  quantity: number
}

interface Order {
  id: string
  table_number: string
  status: "pending" | "preparing" | "ready" |"served"
  timestamp: string
  items: OrderItem[]
}

// export function OrderProcessing() {
//   const [orders, setOrders] = useState<Order[]>([])
//   const { toast } = useToast()

//   useEffect(() => {
//     fetchOrders()
//   }, [])

//   const fetchOrders = async () => {
//     try {
//       const response = await fetch("/api/orders")
//       if (!response.ok) throw new Error("Failed to fetch orders")
//       const data = await response.json()
//       setOrders(data)
//     } catch (error) {
//       console.error("Error fetching orders:", error)
//       toast({
//         title: "Error",
//         description: "Failed to fetch orders. Please try again.",
//         variant: "destructive",
//       })
//     }
//   }

//   const updateOrderStatus = async (orderId: string, newStatus: Order["status"]) => {
//     try {
//       const response = await fetch(`/api/orders/${orderId}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ status: newStatus }),
//       })
//       if (!response.ok) {
//         const errorData = await response.json()
//         throw new Error(errorData.error || "Failed to update order status")
//       }
//       const updatedOrder = await response.json()
//       setOrders((prevOrders) =>
//         prevOrders.map((order) => (order.id === updatedOrder.id ? { ...order, status: updatedOrder.status } : order)),
//       )
//       toast({
//         title: "Success",
//         description: `Order status updated to ${newStatus}.`,
//       })
//     } catch (error) {
//       console.error("Error updating order status:", error)
//       toast({
//         title: "Error",
//         description: error instanceof Error ? error.message : "Failed to update order status. Please try again.",
//         variant: "destructive",
//       })
//     }
//   }

//   const getStatusColor = (status: Order["status"]) => {
//     switch (status) {
//       case "pending":
//         return "bg-yellow-100 text-yellow-800"
//       case "preparing":
//         return "bg-blue-100 text-blue-800"
//       case "ready":
//         return "bg-green-100 text-green-800"
//       default:
//         return "bg-gray-100 text-gray-800"
//     }
//   }

//   return (
//     <div className="space-y-6">
//       <h2 className="text-2xl font-bold">Order Processing</h2>
//       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//         {orders.map((order) => (
//           <Card key={order.id}>
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">Table {order.table_number}</CardTitle>
//               <Badge className={getStatusColor(order.status)}>
//                 {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
//               </Badge>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-2">
//                 {order.items.map((item) => (
//                   <div key={item.id} className="flex justify-between">
//                     <span>{item.name}</span>
//                     <span>x{item.quantity}</span>
//                   </div>
//                 ))}
//               </div>
//               <div className="mt-4 flex items-center justify-between">
//                 <div className="flex items-center text-sm text-gray-500">
//                   <Clock className="mr-1 h-4 w-4" />
//                   {new Date(order.timestamp).toLocaleTimeString()}
//                 </div>
//                 {order.status !== "ready" && (
//                   <Button
//                     size="sm"
//                     onClick={() => updateOrderStatus(order.id, order.status === "pending" ? "preparing" : "ready")}
//                   >
//                     {order.status === "pending" ? "Start Preparing" : "Mark as Ready"}
//                   </Button>
//                 )}
//                 {order.status === "ready" && (
//                   <div className="flex items-center text-green-600">
//                     <CheckCircle2 className="mr-1 h-4 w-4" />
//                     Ready
//                   </div>
//                 )}
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>
//     </div>
//   )
// }

// export function OrderProcessing() {
//   const [orders, setOrders] = useState<Order[]>([])
//   const { toast } = useToast()

//   useEffect(() => {
//     fetchOrders()
//   }, [])

//   const fetchOrders = async () => {
//     try {
//       const response = await fetch("/api/orders")
//       if (!response.ok) throw new Error("Failed to fetch orders")
//       const data = await response.json()
//       setOrders(data)
//     } catch (error) {
//       console.error("Error fetching orders:", error)
//       toast({
//         title: "Error",
//         description: "Failed to fetch orders. Please try again.",
//         variant: "destructive",
//       })
//     }
//   }

//   const updateOrderStatus = async (orderId: string, newStatus: Order["status"]) => {
//     try {
//       const response = await fetch(`/api/orders/${orderId}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ status: newStatus }),
//       })
//       if (!response.ok) {
//         const errorData = await response.json()
//         throw new Error(errorData.error || "Failed to update order status")
//       }
//       const updatedOrder = await response.json()
//       setOrders((prevOrders) =>
//         prevOrders.map((order) => (order.id === updatedOrder.id ? { ...order, status: updatedOrder.status } : order)),
//       )
//       toast({
//         title: "Success",
//         description: `Order status updated to ${newStatus}.`,
//       })
//     } catch (error) {
//       console.error("Error updating order status:", error)
//       toast({
//         title: "Error",
//         description: error instanceof Error ? error.message : "Failed to update order status. Please try again.",
//         variant: "destructive",
//       })
//     }
//   }

//   const getStatusColor = (status: Order["status"]) => {
//     switch (status) {
//       case "pending":
//         return "bg-yellow-100 text-yellow-800"
//       case "preparing":
//         return "bg-blue-100 text-blue-800"
//       case "ready":
//         return "bg-green-100 text-green-800"
//       case "served":
//         return "bg-purple-100 text-purple-800"
//       default:
//         return "bg-gray-100 text-gray-800"
//     }
//   }

//   const [statusFilter, setStatusFilter] = useState<"all" | "pending" | "preparing" | "ready" | "served">("all")

//   const filteredOrders = useMemo(() => {
//     if (statusFilter === "all") return orders
//     return orders.filter((order) => order.status === statusFilter)
//   }, [orders, statusFilter])

//   return (
//     <div className="space-y-6">
//       <h2 className="text-2xl font-bold">Order Processing</h2>

//       <div className="flex flex-wrap gap-2">
//         <Button
//           variant={statusFilter === "all" ? "default" : "outline"}
//           onClick={() => setStatusFilter("all")}
//           className="rounded-full"
//         >
//           All Orders ({orders.length})
//         </Button>
//         <Button
//           variant={statusFilter === "pending" ? "default" : "outline"}
//           onClick={() => setStatusFilter("pending")}
//           className="rounded-full bg-yellow-100 text-yellow-800 hover:bg-yellow-200 hover:text-yellow-900"
//         >
//           Pending ({orders.filter((order) => order.status === "pending").length})
//         </Button>
//         <Button
//           variant={statusFilter === "preparing" ? "default" : "outline"}
//           onClick={() => setStatusFilter("preparing")}
//           className="rounded-full bg-blue-100 text-blue-800 hover:bg-blue-200 hover:text-blue-900"
//         >
//           Preparing ({orders.filter((order) => order.status === "preparing").length})
//         </Button>
//         <Button
//           variant={statusFilter === "ready" ? "default" : "outline"}
//           onClick={() => setStatusFilter("ready")}
//           className="rounded-full bg-green-100 text-green-800 hover:bg-green-200 hover:text-green-900"
//         >
//           Ready ({orders.filter((order) => order.status === "ready").length})
//         </Button>
//         <Button
//           variant={statusFilter === "served" ? "default" : "outline"}
//           onClick={() => setStatusFilter("served")}
//           className="rounded-full bg-purple-100 text-purple-800 hover:bg-purple-200 hover:text-purple-900"
//         >
//           Served ({orders.filter((order) => order.status === "served").length})
//         </Button>
//       </div>

//       {filteredOrders.length === 0 ? (
//         <div className="flex flex-col items-center justify-center p-8 text-center border rounded-lg bg-background">
//           <p className="text-lg font-semibold">No {statusFilter !== "all" ? statusFilter : ""} orders found</p>
//           {statusFilter !== "all" && (
//             <Button onClick={() => setStatusFilter("all")} className="mt-4">
//               View all orders
//             </Button>
//           )}
//         </div>
//       ) : (
//         <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//           {filteredOrders.map((order) => (
//             <Card key={order.id}>
//               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                 <CardTitle className="text-sm font-medium">Table {order.table_number}</CardTitle>
//                 <Badge className={getStatusColor(order.status)}>
//                   {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
//                 </Badge>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-2">
//                   {order.items.map((item) => (
//                     <div key={item.id} className="flex justify-between">
//                       <span>{item.name}</span>
//                       <span>x{item.quantity}</span>
//                     </div>
//                   ))}
//                 </div>
//                 <div className="mt-4 flex items-center justify-between">
//                   <div className="flex items-center text-sm text-gray-500">
//                     <Clock className="mr-1 h-4 w-4" />
//                     {new Date(order.timestamp).toLocaleTimeString()}
//                   </div>
//                   {order.status === "pending" && (
//                     <Button size="sm" onClick={() => updateOrderStatus(order.id, "preparing")}>
//                       Start Preparing
//                     </Button>
//                   )}
//                   {order.status === "preparing" && (
//                     <Button size="sm" onClick={() => updateOrderStatus(order.id, "ready")}>
//                       Mark as Ready
//                     </Button>
//                   )}
//                   {order.status === "ready" && (
//                     <Button
//                       size="sm"
//                       variant="outline"
//                       className="bg-green-50"
//                       onClick={() => updateOrderStatus(order.id, "served")}
//                     >
//                       <Utensils className="mr-1 h-4 w-4" />
//                       Mark as Served
//                     </Button>
//                   )}
//                   {order.status === "served" && (
//                     <div className="flex items-center text-purple-600">
//                       <Utensils className="mr-1 h-4 w-4" />
//                       Served
//                     </div>
//                   )}
//                 </div>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       )}
//     </div>
//   )
// }

export function OrderProcessing() {
  const [orders, setOrders] = useState<Order[]>([])
  const { toast } = useToast()

  useEffect(() => {
    fetchOrders()

    // Set up polling to refresh orders every 30 seconds
    const interval = setInterval(fetchOrders, 30000)
    return () => clearInterval(interval)
  }, [])

  const fetchOrders = async () => {
    try {
      const response = await fetch("/api/orders")
      if (!response.ok) throw new Error("Failed to fetch orders")
      const data = await response.json()
      setOrders(data)
    } catch (error) {
      console.error("Error fetching orders:", error)
      toast({
        title: "Error",
        description: "Failed to fetch orders. Please try again.",
        variant: "destructive",
      })
    }
  }

  const updateOrderStatus = async (orderId: string, newStatus: Order["status"]) => {
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      })
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to update order status")
      }
      const updatedOrder = await response.json()
      setOrders((prevOrders) =>
        prevOrders.map((order) => (order.id === updatedOrder.id ? { ...order, status: updatedOrder.status } : order)),
      )

      // Show appropriate toast message
      let toastMessage = `Order status updated to ${newStatus}.`
      if (newStatus === "served") {
        toastMessage = "Order marked as served. The customer's order summary will be cleared."
      }

      toast({
        title: "Success",
        description: toastMessage,
      })
    } catch (error) {
      console.error("Error updating order status:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update order status. Please try again.",
        variant: "destructive",
      })
    }
  }

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "preparing":
        return "bg-blue-100 text-blue-800"
      case "ready":
        return "bg-green-100 text-green-800"
      case "served":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const [statusFilter, setStatusFilter] = useState<"all" | "pending" | "preparing" | "ready" | "served">("all")

  const filteredOrders = useMemo(() => {
    if (statusFilter === "all") return orders
    return orders.filter((order) => order.status === statusFilter)
  }, [orders, statusFilter])

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Order Processing</h2>

      <div className="flex flex-wrap gap-2">
        <Button
          variant={statusFilter === "all" ? "default" : "outline"}
          onClick={() => setStatusFilter("all")}
          className="rounded-full"
        >
          All Orders ({orders.length})
        </Button>
        <Button
          variant={statusFilter === "pending" ? "default" : "outline"}
          onClick={() => setStatusFilter("pending")}
          className="rounded-full bg-yellow-100 text-yellow-800 hover:bg-yellow-200 hover:text-yellow-900"
        >
          Pending ({orders.filter((order) => order.status === "pending").length})
        </Button>
        <Button
          variant={statusFilter === "preparing" ? "default" : "outline"}
          onClick={() => setStatusFilter("preparing")}
          className="rounded-full bg-blue-100 text-blue-800 hover:bg-blue-200 hover:text-blue-900"
        >
          Preparing ({orders.filter((order) => order.status === "preparing").length})
        </Button>
        <Button
          variant={statusFilter === "ready" ? "default" : "outline"}
          onClick={() => setStatusFilter("ready")}
          className="rounded-full bg-green-100 text-green-800 hover:bg-green-200 hover:text-green-900"
        >
          Ready ({orders.filter((order) => order.status === "ready").length})
        </Button>
        <Button
          variant={statusFilter === "served" ? "default" : "outline"}
          onClick={() => setStatusFilter("served")}
          className="rounded-full bg-purple-100 text-purple-800 hover:bg-purple-200 hover:text-purple-900"
        >
          Served ({orders.filter((order) => order.status === "served").length})
        </Button>
      </div>

      {filteredOrders.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-8 text-center border rounded-lg bg-background">
          <p className="text-lg font-semibold">No {statusFilter !== "all" ? statusFilter : ""} orders found</p>
          {statusFilter !== "all" && (
            <Button onClick={() => setStatusFilter("all")} className="mt-4">
              View all orders
            </Button>
          )}
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredOrders.map((order) => (
            <Card key={order.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Table {order.table_number}</CardTitle>
                <Badge className={getStatusColor(order.status)}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex justify-between">
                      <span>{item.name}</span>
                      <span>x{item.quantity}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="mr-1 h-4 w-4" />
                    {new Date(order.timestamp).toLocaleTimeString()}
                  </div>
                  {order.status === "pending" && (
                    <Button size="sm" onClick={() => updateOrderStatus(order.id, "preparing")}>
                      Start Preparing
                    </Button>
                  )}
                  {order.status === "preparing" && (
                    <Button size="sm" onClick={() => updateOrderStatus(order.id, "ready")}>
                      Mark as Ready
                    </Button>
                  )}
                  {order.status === "ready" && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="bg-green-50"
                      onClick={() => updateOrderStatus(order.id, "served")}
                    >
                      <Utensils className="mr-1 h-4 w-4" />
                      Mark as Served
                    </Button>
                  )}
                  {order.status === "served" && (
                    <div className="flex items-center text-purple-600">
                      <Utensils className="mr-1 h-4 w-4" />
                      Served
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}


