"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card"
import { useToast } from "@/src/components/ui/use-toast"
import { Star, Utensils } from "lucide-react"
import { Button } from "../ui/button"

// interface OrderItem {
//     menu_id: string
//     name: string
//     quantity: number
//     price: number
//     special_instructions: string | null
//   }
  
//   interface Order {
//     id: string
//     table_number: string
//     status: string
//     timestamp: string
//     customer_rating: number | null
//     total_price: number
//     items: OrderItem[]
//   }
  
//   export function TableOrderSummary() {
//     const [orders, setOrders] = useState<Order[]>([])
//     const { toast } = useToast()
  
//     useEffect(() => {
//       fetchOrders()
//     }, [])
  
//     const fetchOrders = async () => {
//       try {
//         const response = await fetch("/api/orders")
//         if (!response.ok) throw new Error("Failed to fetch orders")
//         const data = await response.json()
//         setOrders(data)
//       } catch (error) {
//         console.error("Error fetching orders:", error)
//         toast({
//           title: "Error",
//           description: "Failed to fetch orders. Please try again.",
//           variant: "destructive",
//         })
//       }
//     }
  
//     const groupOrdersByTable = (orders: Order[]) => {
//       return orders.reduce(
//         (acc, order) => {
//           if (!acc[order.table_number]) {
//             acc[order.table_number] = []
//           }
//           acc[order.table_number].push(order)
//           return acc
//         },
//         {} as Record<string, Order[]>,
//       )
//     }
  
//     const formatTimestamp = (timestamp: string) => {
//       return new Date(timestamp).toLocaleString()
//     }
  
//     const groupedOrders = groupOrdersByTable(orders)
  
//     return (
//       <div className="space-y-8">
//         <h2 className="text-3xl font-bold text-center mb-8">Table Order Summary</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {Object.entries(groupedOrders).map(([tableNumber, tableOrders]) => (
//             <Card key={tableNumber} className="w-full">
//               <CardHeader>
//                 <CardTitle className="flex items-center justify-between">
//                   <span className="flex items-center">
//                     <Utensils className="mr-2 h-5 w-5" />
//                     Table {tableNumber}
//                   </span>
//                   <span className="text-sm font-normal text-muted-foreground">
//                     {tableOrders.length} order{tableOrders.length > 1 ? "s" : ""}
//                   </span>
//                 </CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <div className="space-y-4">
//                   {tableOrders.map((order) => (
//                     <Card key={order.id} className="bg-muted">
//                       <CardHeader className="p-4">
//                         <CardTitle className="text-sm font-medium">Order #{order.id}</CardTitle>
//                       </CardHeader>
//                       <CardContent className="p-4 pt-0">
//                         <div className="text-sm space-y-2">
//                           <div className="flex justify-between">
//                             <span className="font-medium">Status:</span>
//                             <span className="capitalize">{order.status}</span>
//                           </div>
//                           <div className="flex justify-between">
//                             <span className="font-medium">Time:</span>
//                             <span>{formatTimestamp(order.timestamp)}</span>
//                           </div>
//                           <div className="flex justify-between">
//                             <span className="font-medium">Total:</span>
//                             <span>฿{order.total_price.toFixed(2)}</span>
//                           </div>
//                           <div className="flex justify-between items-center">
//                             <span className="font-medium">Rating:</span>
//                             {order.customer_rating !== null ? (
//                               <div className="flex items-center">
//                                 {[1, 2, 3, 4, 5].map((star) => (
//                                   <Star
//                                     key={star}
//                                     className={`h-4 w-4 ${
//                                       star <= order.customer_rating! ? "text-yellow-400 fill-current" : "text-gray-300"
//                                     }`}
//                                   />
//                                 ))}
//                               </div>
//                             ) : (
//                               <span className="text-muted-foreground">Not rated</span>
//                             )}
//                           </div>
//                         </div>
//                         <div className="mt-4 space-y-2">
//                           <h4 className="font-medium text-sm">Items:</h4>
//                           {order.items.map((item) => (
//                             <div key={item.menu_id} className="flex justify-between text-sm">
//                               <span>
//                                 {item.name} x {item.quantity}
//                               </span>
//                               <span>฿{(item.price * item.quantity).toFixed(2)}</span>
//                             </div>
//                           ))}
//                         </div>
//                       </CardContent>
//                     </Card>
//                   ))}
//                 </div>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       </div>
//     )
//   }

interface OrderItem {
    menu_id: string
    name: string
    quantity: number
    price: number
    special_instructions: string | null
  }
  
  interface Order {
    id: string
    table_number: string
    status: string
    payment_status: string
    timestamp: string
    customer_rating: number | null
    total_price: number
    items: OrderItem[]
  }
  
  // export function TableOrderSummary() {
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
  
  //   const groupOrdersByTable = (orders: Order[]) => {
  //     return orders.reduce(
  //       (acc, order) => {
  //         if (!acc[order.table_number]) {
  //           acc[order.table_number] = []
  //         }
  //         acc[order.table_number].push(order)
  //         return acc
  //       },
  //       {} as Record<string, Order[]>,
  //     )
  //   }
  
  //   const formatTimestamp = (timestamp: string) => {
  //     return new Date(timestamp).toLocaleString()
  //   }
  
  //   const getPaymentStatusColor = (status: string) => {
  //     switch (status) {
  //       case "paid":
  //         return "text-green-600"
  //       case "pending":
  //         return "text-yellow-600"
  //       case "rejected":
  //         return "text-red-600"
  //       default:
  //         return "text-gray-600"
  //     }
  //   }
  
  //   const getPaymentStatusIcon = (status: string) => {
  //     switch (status) {
  //       case "paid":
  //         return "✓"
  //       case "pending":
  //         return "⏳"
  //       case "rejected":
  //         return "✕"
  //       default:
  //         return ""
  //     }
  //   }
  
  //   const groupedOrders = groupOrdersByTable(orders)
  
  //   return (
  //     <div className="space-y-8">
  //       <h2 className="text-3xl font-bold text-center mb-8">Table Order Summary</h2>
  //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  //         {Object.entries(groupedOrders).map(([tableNumber, tableOrders]) => (
  //           <Card key={tableNumber} className="w-full">
  //             <CardHeader>
  //               <CardTitle className="flex items-center justify-between">
  //                 <span className="flex items-center">
  //                   <Utensils className="mr-2 h-5 w-5" />
  //                   Table {tableNumber}
  //                 </span>
  //                 <span className="text-sm font-normal text-muted-foreground">
  //                   {tableOrders.length} order{tableOrders.length > 1 ? "s" : ""}
  //                 </span>
  //               </CardTitle>
  //             </CardHeader>
  //             <CardContent>
  //               <div className="space-y-4">
  //                 {tableOrders.map((order) => (
  //                   <Card key={order.id} className="bg-muted">
  //                     <CardHeader className="p-4">
  //                       <CardTitle className="text-sm font-medium">Order #{order.id}</CardTitle>
  //                     </CardHeader>
  //                     <CardContent className="p-4 pt-0">
  //                       <div className="text-sm space-y-2">
  //                         <div className="flex justify-between">
  //                           <span className="font-medium">Status:</span>
  //                           <span className="capitalize">{order.status}</span>
  //                         </div>
  //                         <div className="flex justify-between">
  //                           <span className="font-medium">Payment Status:</span>
  //                           <span className={`capitalize ${getPaymentStatusColor(order.payment_status)}`}>
  //                             {order.payment_status} {getPaymentStatusIcon(order.payment_status)}
  //                           </span>
  //                         </div>
  //                         <div className="flex justify-between">
  //                           <span className="font-medium">Time:</span>
  //                           <span>{formatTimestamp(order.timestamp)}</span>
  //                         </div>
  //                         <div className="flex justify-between">
  //                           <span className="font-medium">Total:</span>
  //                           {/* <span>฿{order.total_price.toFixed(2)}</span> */}
  //                           <span>฿{order.total_price ? order.total_price.toFixed(2) : "0.00"}</span>
  //                         </div>
  //                         <div className="flex justify-between items-center">
  //                           <span className="font-medium">Rating:</span>
  //                           {order.customer_rating !== null ? (
  //                             <div className="flex items-center">
  //                               {[1, 2, 3, 4, 5].map((star) => (
  //                                 <Star
  //                                   key={star}
  //                                   className={`h-4 w-4 ${
  //                                     star <= order.customer_rating! ? "text-yellow-400 fill-current" : "text-gray-300"
  //                                   }`}
  //                                 />
  //                               ))}
  //                             </div>
  //                           ) : (
  //                             <span className="text-muted-foreground">Not rated</span>
  //                           )}
  //                         </div>
  //                       </div>
  //                       <div className="mt-4 space-y-2">
  //                         <h4 className="font-medium text-sm">Items:</h4>
  //                         {order.items.map((item) => (
  //                           <div key={item.menu_id} className="flex justify-between text-sm">
  //                             <span>
  //                               {item.name} x {item.quantity}
  //                             </span>
  //                             <span>฿{(item.price * item.quantity).toFixed(2)}</span>
  //                           </div>
  //                         ))}
  //                       </div>
  //                     </CardContent>
  //                   </Card>
  //                 ))}
  //               </div>
  //             </CardContent>
  //           </Card>
  //         ))}
  //       </div>
  //     </div>
  //   )
  // }


  // export function TableOrderSummary() {
  //   const [orders, setOrders] = useState<Order[]>([])
  //   const { toast } = useToast()
  
  //   // Modify the fetchOrders function to filter out served orders
  //   const fetchOrders = async () => {
  //     try {
  //       const response = await fetch("/api/orders")
  //       if (!response.ok) throw new Error("Failed to fetch orders")
  //       const data = await response.json()
  //       // Filter out orders with status "served"
  //       const activeOrders = data.filter((order: Order) => order.status !== "served")
  //       setOrders(activeOrders)
  //     } catch (error) {
  //       console.error("Error fetching orders:", error)
  //       toast({
  //         title: "Error",
  //         description: "Failed to fetch orders. Please try again.",
  //         variant: "destructive",
  //       })
  //     }
  //   }
  
  //   // Add real-time polling to keep the order list updated
  //   useEffect(() => {
  //     fetchOrders()
  
  //     // Set up polling to refresh orders every 10 seconds
  //     const interval = setInterval(fetchOrders, 10000)
  //     return () => clearInterval(interval)
  //   }, [])
  
  //   // Add event listener for order status changes
  //   useEffect(() => {
  //     // Function to handle order status updates
  //     const handleOrderStatusChange = (event: CustomEvent) => {
  //       const { orderId, status } = event.detail
  //       if (status === "served") {
  //         // Remove the served order from the state
  //         setOrders((prevOrders) => prevOrders.filter((order) => order.id !== orderId))
  //       }
  //     }
  
  //     // Add event listener
  //     window.addEventListener("orderStatusChanged" as any, handleOrderStatusChange as EventListener)
  
  //     // Clean up
  //     return () => {
  //       window.removeEventListener("orderStatusChanged" as any, handleOrderStatusChange as EventListener)
  //     }
  //   }, [])
  
  //   const groupOrdersByTable = (orders: Order[]) => {
  //     return orders.reduce(
  //       (acc, order) => {
  //         if (!acc[order.table_number]) {
  //           acc[order.table_number] = []
  //         }
  //         acc[order.table_number].push(order)
  //         return acc
  //       },
  //       {} as Record<string, Order[]>,
  //     )
  //   }
  
  //   const formatTimestamp = (timestamp: string) => {
  //     return new Date(timestamp).toLocaleString()
  //   }
  
  //   const getPaymentStatusColor = (status: string) => {
  //     switch (status) {
  //       case "paid":
  //         return "text-green-600"
  //       case "pending":
  //         return "text-yellow-600"
  //       case "rejected":
  //         return "text-red-600"
  //       default:
  //         return "text-gray-600"
  //     }
  //   }
  
  //   const getPaymentStatusIcon = (status: string) => {
  //     switch (status) {
  //       case "paid":
  //         return "✓"
  //       case "pending":
  //         return "⏳"
  //       case "rejected":
  //         return "✕"
  //       default:
  //         return ""
  //     }
  //   }
  
  //   const groupedOrders = groupOrdersByTable(orders)
  
  //   // If there are no orders to display, show a message
  //   if (Object.keys(groupedOrders).length === 0) {
  //     return (
  //       <div className="space-y-8">
  //         <h2 className="text-3xl font-bold text-center mb-8">Table Order Summary</h2>
  //         <div className="text-center p-8 border rounded-lg bg-muted">
  //           <p className="text-lg text-muted-foreground">No active orders to display</p>
  //         </div>
  //       </div>
  //     )
  //   }
  
  //   return (
  //     <div className="space-y-8">
  //       <h2 className="text-3xl font-bold text-center mb-8">Table Order Summary</h2>
  //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  //         {Object.entries(groupedOrders).map(([tableNumber, tableOrders]) => (
  //           <Card key={tableNumber} className="w-full">
  //             <CardHeader>
  //               <CardTitle className="flex items-center justify-between">
  //                 <span className="flex items-center">
  //                   <Utensils className="mr-2 h-5 w-5" />
  //                   Table {tableNumber}
  //                 </span>
  //                 <span className="text-sm font-normal text-muted-foreground">
  //                   {tableOrders.length} order{tableOrders.length > 1 ? "s" : ""}
  //                 </span>
  //               </CardTitle>
  //             </CardHeader>
  //             <CardContent>
  //               <div className="space-y-4">
  //                 {tableOrders.map((order) => (
  //                   <Card key={order.id} className="bg-muted">
  //                     <CardHeader className="p-4">
  //                       <CardTitle className="text-sm font-medium">Order #{order.id}</CardTitle>
  //                     </CardHeader>
  //                     <CardContent className="p-4 pt-0">
  //                       <div className="text-sm space-y-2">
  //                         <div className="flex justify-between">
  //                           <span className="font-medium">Status:</span>
  //                           <span className="capitalize">{order.status}</span>
  //                         </div>
  //                         <div className="flex justify-between">
  //                           <span className="font-medium">Payment Status:</span>
  //                           <span className={`capitalize ${getPaymentStatusColor(order.payment_status)}`}>
  //                             {order.payment_status} {getPaymentStatusIcon(order.payment_status)}
  //                           </span>
  //                         </div>
  //                         <div className="flex justify-between">
  //                           <span className="font-medium">Time:</span>
  //                           <span>{formatTimestamp(order.timestamp)}</span>
  //                         </div>
  //                         <div className="flex justify-between">
  //                           <span className="font-medium">Total:</span>
  //                           <span>฿{order.total_price ? order.total_price.toFixed(2) : "0.00"}</span>
  //                         </div>
  //                         <div className="flex justify-between items-center">
  //                           <span className="font-medium">Rating:</span>
  //                           {order.customer_rating !== null ? (
  //                             <div className="flex items-center">
  //                               {[1, 2, 3, 4, 5].map((star) => (
  //                                 <Star
  //                                   key={star}
  //                                   className={`h-4 w-4 ${
  //                                     star <= order.customer_rating! ? "text-yellow-400 fill-current" : "text-gray-300"
  //                                   }`}
  //                                 />
  //                               ))}
  //                             </div>
  //                           ) : (
  //                             <span className="text-muted-foreground">Not rated</span>
  //                           )}
  //                         </div>
  //                       </div>
  //                       <div className="mt-4 space-y-2">
  //                         <h4 className="font-medium text-sm">Items:</h4>
  //                         {order.items.map((item) => (
  //                           <div key={item.menu_id} className="flex justify-between text-sm">
  //                             <span>
  //                               {item.name} x {item.quantity}
  //                             </span>
  //                             <span>฿{(item.price * item.quantity).toFixed(2)}</span>
  //                           </div>
  //                         ))}
  //                       </div>
  //                     </CardContent>
  //                   </Card>
  //                 ))}
  //               </div>
  //             </CardContent>
  //           </Card>
  //         ))}
  //       </div>
  //     </div>
  //   )
  // }
    
  export function TableOrderSummary() {
    const [orders, setOrders] = useState<Order[]>([])
    const [statusFilter, setStatusFilter] = useState<"all" | "pending" | "preparing" | "ready">("all")
    const { toast } = useToast()
  
    // Modify the fetchOrders function to filter out served orders
    const fetchOrders = async () => {
      try {
        const response = await fetch("/api/orders")
        if (!response.ok) throw new Error("Failed to fetch orders")
        const data = await response.json()
        // Filter out orders with status "served"
        const activeOrders = data.filter((order: Order) => order.status !== "served")
        setOrders(activeOrders)
      } catch (error) {
        console.error("Error fetching orders:", error)
        toast({
          title: "Error",
          description: "Failed to fetch orders. Please try again.",
          variant: "destructive",
        })
      }
    }
  
    // Add real-time polling to keep the order list updated
    useEffect(() => {
      fetchOrders()
  
      // Set up polling to refresh orders every 10 seconds
      const interval = setInterval(fetchOrders, 10000)
      return () => clearInterval(interval)
    }, [])
  
    // Add event listener for order status changes
    useEffect(() => {
      // Function to handle order status updates
      const handleOrderStatusChange = (event: CustomEvent) => {
        const { orderId, status } = event.detail
        if (status === "served") {
          // Remove the served order from the state
          setOrders((prevOrders) => prevOrders.filter((order) => order.id !== orderId))
        }
      }
  
      // Add event listener
      window.addEventListener("orderStatusChanged" as any, handleOrderStatusChange as EventListener)
  
      // Clean up
      return () => {
        window.removeEventListener("orderStatusChanged" as any, handleOrderStatusChange as EventListener)
      }
    }, [])
  
    const groupOrdersByTable = (orders: Order[]) => {
      return orders.reduce(
        (acc, order) => {
          if (!acc[order.table_number]) {
            acc[order.table_number] = []
          }
          acc[order.table_number].push(order)
          return acc
        },
        {} as Record<string, Order[]>,
      )
    }
  
    const formatTimestamp = (timestamp: string) => {
      return new Date(timestamp).toLocaleString()
    }
  
    const getPaymentStatusColor = (status: string) => {
      switch (status) {
        case "paid":
          return "text-green-600"
        case "pending":
          return "text-yellow-600"
        case "rejected":
          return "text-red-600"
        default:
          return "text-gray-600"
      }
    }
  
    const getPaymentStatusIcon = (status: string) => {
      switch (status) {
        case "paid":
          return "✓"
        case "pending":
          return "⏳"
        case "rejected":
          return "✕"
        default:
          return ""
      }
    }
  
    // Filter orders by selected status before grouping
    const filteredOrders = statusFilter === "all" ? orders : orders.filter((order) => order.status === statusFilter)
    const groupedOrders = groupOrdersByTable(filteredOrders)
  
    // If there are no orders to display, show a message
    if (Object.keys(groupedOrders).length === 0) {
      return (
        <div className="space-y-8">
          <div className="flex flex-col items-center mb-8">
            <h2 className="text-3xl font-bold text-center mb-4">Table Order Summary</h2>
            <div className="flex flex-wrap gap-2 justify-center">
              <Button
                variant={statusFilter === "all" ? "default" : "outline"}
                onClick={() => setStatusFilter("all")}
                className="rounded-full"
              >
                All Orders
              </Button>
              <Button
                variant={statusFilter === "pending" ? "default" : "outline"}
                onClick={() => setStatusFilter("pending")}
                className="rounded-full bg-yellow-100 text-yellow-800 hover:bg-yellow-200 hover:text-yellow-900"
              >
                Pending
              </Button>
              <Button
                variant={statusFilter === "preparing" ? "default" : "outline"}
                onClick={() => setStatusFilter("preparing")}
                className="rounded-full bg-blue-100 text-blue-800 hover:bg-blue-200 hover:text-blue-900"
              >
                Preparing
              </Button>
              <Button
                variant={statusFilter === "ready" ? "default" : "outline"}
                onClick={() => setStatusFilter("ready")}
                className="rounded-full bg-green-100 text-green-800 hover:bg-green-200 hover:text-green-900"
              >
                Ready
              </Button>
            </div>
          </div>
          <div className="text-center p-8 border rounded-lg bg-muted">
            <p className="text-lg text-muted-foreground">No active orders to display</p>
          </div>
        </div>
      )
    }
  
    return (
      <div className="space-y-8">
        <div className="flex flex-col items-center mb-8">
          <h2 className="text-3xl font-bold text-center mb-4">Table Order Summary</h2>
          <div className="flex flex-wrap gap-2 justify-center">
            <Button
              variant={statusFilter === "all" ? "default" : "outline"}
              onClick={() => setStatusFilter("all")}
              className="rounded-full"
            >
              All Orders
            </Button>
            <Button
              variant={statusFilter === "pending" ? "default" : "outline"}
              onClick={() => setStatusFilter("pending")}
              className="rounded-full bg-yellow-100 text-yellow-800 hover:bg-yellow-200 hover:text-yellow-900"
            >
              Pending
            </Button>
            <Button
              variant={statusFilter === "preparing" ? "default" : "outline"}
              onClick={() => setStatusFilter("preparing")}
              className="rounded-full bg-blue-100 text-blue-800 hover:bg-blue-200 hover:text-blue-900"
            >
              Preparing
            </Button>
            <Button
              variant={statusFilter === "ready" ? "default" : "outline"}
              onClick={() => setStatusFilter("ready")}
              className="rounded-full bg-green-100 text-green-800 hover:bg-green-200 hover:text-green-900"
            >
              Ready
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(groupedOrders).map(([tableNumber, tableOrders]) => (
            <Card key={tableNumber} className="w-full">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <Utensils className="mr-2 h-5 w-5" />
                    Table {tableNumber}
                  </span>
                  <span className="text-sm font-normal text-muted-foreground">
                    {tableOrders.length} order{tableOrders.length > 1 ? "s" : ""}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tableOrders.map((order) => (
                    <Card key={order.id} className="bg-muted">
                      <CardHeader className="p-4">
                        <CardTitle className="text-sm font-medium">Order #{order.id}</CardTitle>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <div className="text-sm space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="font-medium">Status:</span>
                            <span
                              className={`capitalize px-2 py-1 rounded-full text-xs font-medium ${
                                order.status === "pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : order.status === "preparing"
                                    ? "bg-blue-100 text-blue-800"
                                    : order.status === "ready"
                                      ? "bg-green-100 text-green-800"
                                      : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {order.status}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-medium">Payment Status:</span>
                            <span className={`capitalize ${getPaymentStatusColor(order.payment_status)}`}>
                              {order.payment_status} {getPaymentStatusIcon(order.payment_status)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-medium">Time:</span>
                            <span>{formatTimestamp(order.timestamp)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="font-medium">Total:</span>
                            <span>฿{order.total_price ? order.total_price.toFixed(2) : "0.00"}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="font-medium">Rating:</span>
                            {order.customer_rating !== null ? (
                              <div className="flex items-center">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star
                                    key={star}
                                    className={`h-4 w-4 ${
                                      star <= order.customer_rating! ? "text-yellow-400 fill-current" : "text-gray-300"
                                    }`}
                                  />
                                ))}
                              </div>
                            ) : (
                              <span className="text-muted-foreground">Not rated</span>
                            )}
                          </div>
                        </div>
                        <div className="mt-4 space-y-2">
                          <h4 className="font-medium text-sm">Items:</h4>
                          {order.items.map((item) => (
                            <div key={item.menu_id} className="flex justify-between text-sm">
                              <span>
                                {item.name} x {item.quantity}
                              </span>
                              <span>฿{(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }
  

