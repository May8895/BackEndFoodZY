// "use client"

// import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card"
// import { AlertTriangle, ArrowDownRight, ArrowUpRight, Clock, DollarSign, Receipt } from "lucide-react"
// import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
// import type { Transaction } from "./slip-verification"

// const stats = [
//   {
//     title: "Total Revenue",
//     value: "฿12,345",
//     change: "+15%",
//     changeType: "positive",
//     icon: DollarSign,
//   },
//   {
//     title: "Verified Slips",
//     value: "156",
//     change: "+23%",
//     changeType: "positive",
//     icon: Receipt,
//   },
//   {
//     title: "Pending Verification",
//     value: "8",
//     change: "-5%",
//     changeType: "negative",
//     icon: Clock,
//   },
//   {
//     title: "Cancelled Transactions",
//     value: "3",
//     change: "+1",
//     changeType: "negative",
//     icon: AlertTriangle,
//   },
// ]

// const chartData = [
//   { name: "Mon", total: 1200 },
//   { name: "Tue", total: 1800 },
//   { name: "Wed", total: 2200 },
//   { name: "Thu", total: 1800 },
//   { name: "Fri", total: 2400 },
//   { name: "Sat", total: 2800 },
//   { name: "Sun", total: 3200 },
// ]

// interface SlipDashboardProps {
//   transactions: Transaction[]
// }

// export function SlipDashboard({ transactions }: SlipDashboardProps) {
//   return (
//     <div className="grid gap-6">
//       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
//         {stats.map((stat) => {
//           const Icon = stat.icon
//           return (
//             <Card key={stat.title}>
//               <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//                 <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
//                 <Icon className="h-4 w-4 text-muted-foreground" />
//               </CardHeader>
//               <CardContent>
//                 <div className="text-2xl font-bold">{stat.value}</div>
//                 <p
//                   className={`text-xs ${stat.changeType === "positive" ? "text-green-500" : "text-red-500"
//                     } flex items-center`}
//                 >
//                   {stat.changeType === "positive" ? (
//                     <ArrowUpRight className="mr-1 h-4 w-4" />
//                   ) : (
//                     <ArrowDownRight className="mr-1 h-4 w-4" />
//                   )}
//                   {stat.change}
//                 </p>
//               </CardContent>
//             </Card>
//           )
//         })}
//       </div>
//       <Card>
//         <CardHeader>
//           <CardTitle>Weekly Revenue</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <ResponsiveContainer width="100%" height={350}>
//             <BarChart data={chartData}>
//               <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
//               <YAxis
//                 stroke="#888888"
//                 fontSize={12}
//                 tickLine={false}
//                 axisLine={false}
//                 tickFormatter={(value) => `฿${value}`}
//               />
//               <Tooltip
//                 formatter={(value: number) => [`฿${value}`, "Revenue"]}
//                 labelFormatter={(label) => `Day: ${label}`}
//               />
//               <Bar dataKey="total" fill="#f77700" radius={[4, 4, 0, 0]} />
//             </BarChart>
//           </ResponsiveContainer>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }
// "use client"

// import { useState, useEffect } from "react"
// import { Search, ChevronRight, Bell } from "lucide-react"
// import { Button } from "@/src/components/ui/button"
// import { Input } from "@/src/components/ui/input"
// import { Badge } from "@/src/components/ui/badge"
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/src/components/ui/dialog"
// import { SlipVerification } from "./slip-verification"



// // interface OrderWithPayment {
// //   id: string
// //   invoiceNo: string
// //   tableNumber: string
// //   totalPrice: number
// //   status: string
// //   createdAt: Date
// //   updatedAt: Date
// //   paymentSlip?: {
// //     id: string
// //     amount: number
// //     transferTime: Date
// //     status: "pending" | "verified" | "rejected"
// //     transactionId: string
// //   }
// // }

// // export function SlipDashboard() {
// //   const [orders, setOrders] = useState<OrderWithPayment[]>([])
// //   const [searchQuery, setSearchQuery] = useState("")
// //   const [selectedOrder, setSelectedOrder] = useState<OrderWithPayment | null>(null)
// //   const [isVerificationOpen, setIsVerificationOpen] = useState(false)
// //   const [isLoading, setIsLoading] = useState(true)
// //   const [error, setError] = useState<string | null>(null)

// //   useEffect(() => {
// //     fetchOrders()
// //   }, [])

// //   const fetchOrders = async () => {
// //     try {
// //       setIsLoading(true)
// //       setError(null)
// //       const response = await fetch("/api/slip/orders")
// //       if (!response.ok) {
// //         throw new Error("Failed to fetch orders")
// //       }
// //       const data = await response.json()
// //       if (Array.isArray(data.orders)) {
// //         setOrders(data.orders)
// //       } else {
// //         throw new Error("Invalid data format received")
// //       }
// //     } catch (error) {
// //       console.error("Failed to fetch orders:", error)
// //       setError(error instanceof Error ? error.message : "Failed to fetch orders")
// //     } finally {
// //       setIsLoading(false)
// //     }
// //   }

// //   const formatPrice = (price: number): string => {
// //     return price.toFixed(2)
// //   }

// //   const filteredOrders = orders.filter(
// //     (order) =>
// //       order.invoiceNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
// //       order.tableNumber.toLowerCase().includes(searchQuery.toLowerCase()),
// //   )

// //   const handleViewDetails = (order: OrderWithPayment) => {
// //     setSelectedOrder(order)
// //     setIsVerificationOpen(true)
// //   }

// //   if (isLoading) {
// //     return (
// //       <div className="container mx-auto p-6">
// //         <div className="flex items-center justify-center min-h-[400px]">
// //           <p className="text-lg text-gray-500">Loading orders...</p>
// //         </div>
// //       </div>
// //     )
// //   }

// //   if (error) {
// //     return (
// //       <div className="container mx-auto p-6">
// //         <div className="flex items-center justify-center min-h-[400px]">
// //           <p className="text-lg text-red-500">{error}</p>
// //         </div>
// //       </div>
// //     )
// //   }

// //   return (
// //     <div className="container mx-auto p-6">
// //       <div className="flex justify-between items-center mb-8">
// //         <div>
// //           <h1 className="text-3xl font-bold">Slip Verification</h1>
// //           <p className="text-gray-500">Verify and manage transaction slips</p>
// //         </div>
// //         <div className="flex items-center gap-4">
// //           <div className="relative">
// //             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
// //             <Input
// //               type="search"
// //               placeholder="Search by invoice or table number..."
// //               className="pl-10 w-[300px]"
// //               value={searchQuery}
// //               onChange={(e) => setSearchQuery(e.target.value)}
// //             />
// //           </div>
// //           <Button variant="ghost" size="icon">
// //             <Bell className="h-5 w-5" />
// //           </Button>
// //         </div>
// //       </div>

// //       <div className="bg-white rounded-lg shadow">
// //         <div className="overflow-x-auto">
// //           <table className="w-full">
// //             <thead>
// //               <tr className="border-b">
// //                 <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Invoice No.</th>
// //                 <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Table No.</th>
// //                 <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Created At</th>
// //                 <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Total</th>
// //                 <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Status</th>
// //                 <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Payment Status</th>
// //                 <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Action</th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {filteredOrders.map((order) => (
// //                 <tr key={order.id} className="border-b hover:bg-gray-50">
// //                   <td className="px-6 py-4">{order.invoiceNo}</td>
// //                   <td className="px-6 py-4">{order.tableNumber}</td>
// //                   <td className="px-6 py-4">{new Date(order.createdAt).toLocaleString()}</td>
// //                   <td className="px-6 py-4">฿{formatPrice(order.totalPrice)}</td>
// //                   <td className="px-6 py-4">
// //                     <Badge
// //                       variant={
// //                         order.status === "completed"
// //                           ? "default"
// //                           : order.status === "pending"
// //                             ? "secondary"
// //                             : "destructive"
// //                       }
// //                     >
// //                       {order.status}
// //                     </Badge>
// //                   </td>
// //                   <td className="px-6 py-4">
// //                     {order.paymentSlip ? (
// //                       <Badge
// //                         variant={
// //                           order.paymentSlip.status === "verified"
// //                             ? "default"
// //                             : order.paymentSlip.status === "pending"
// //                               ? "secondary"
// //                               : "destructive"
// //                         }
// //                       >
// //                         {order.paymentSlip.status}
// //                       </Badge>
// //                     ) : (
// //                       <Badge variant="outline">Not Uploaded</Badge>
// //                     )}
// //                   </td>
// //                   <td className="px-6 py-4">
// //                     <Button
// //                       variant="ghost"
// //                       className="flex items-center gap-2"
// //                       onClick={() => handleViewDetails(order)}
// //                     >
// //                       View Details
// //                       <ChevronRight className="h-4 w-4" />
// //                     </Button>
// //                   </td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         </div>
// //       </div>

// //       <Dialog open={isVerificationOpen} onOpenChange={setIsVerificationOpen}>
// //         <DialogContent className="max-w-2xl">
// //           <DialogHeader>
// //             <DialogTitle>Verify Payment Slip</DialogTitle>
// //           </DialogHeader>
// //           {selectedOrder && (
// //             <SlipVerification
// //               expectedAmount={selectedOrder.totalPrice}
// //               // expectedRecipient="WATCHIRA KHIA"
// //               onVerificationComplete={() => {
// //                 setIsVerificationOpen(false)
// //                 fetchOrders() // Refresh the orders list
// //               }}
// //             />
// //           )}
// //         </DialogContent>
// //       </Dialog>
// //     </div>
// //   )
// // }


// interface OrderWithPayment {
//   id: string
//   invoiceNo: string
//   tableNumber: string
//   totalPrice: number
//   status: string
//   createdAt: Date
//   updatedAt: Date
//   paymentSlip?: {
//     id: string
//     amount: number
//     transferTime: Date
//     status: "pending" | "verified" | "rejected"
//     transactionId: string
//   }
// }

// export function SlipDashboard() {
//   const [orders, setOrders] = useState<OrderWithPayment[]>([])
//   const [searchQuery, setSearchQuery] = useState("")
//   const [selectedOrder, setSelectedOrder] = useState<OrderWithPayment | null>(null)
//   const [isVerificationOpen, setIsVerificationOpen] = useState(false)
//   const [isLoading, setIsLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)

//   useEffect(() => {
//     fetchOrders()
//   }, [])

//   const fetchOrders = async () => {
//     try {
//       setIsLoading(true)
//       setError(null)
//       const response = await fetch("/api/slip/orders")
//       if (!response.ok) {
//         throw new Error("Failed to fetch orders")
//       }
//       const data = await response.json()
//       if (Array.isArray(data.orders)) {
//         // Sort orders by createdAt date, most recent first
//         const sortedOrders = data.orders.sort(
//           (a: OrderWithPayment, b: OrderWithPayment) =>
//             new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
//         )
//         setOrders(sortedOrders)
//       } else {
//         throw new Error("Invalid data format received")
//       }
//     } catch (error) {
//       console.error("Failed to fetch orders:", error)
//       setError(error instanceof Error ? error.message : "Failed to fetch orders")
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const formatPrice = (price: number): string => {
//     return price.toFixed(2)
//   }

//   const filteredOrders = orders.filter(
//     (order) =>
//       order.invoiceNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       order.tableNumber.toLowerCase().includes(searchQuery.toLowerCase()),
//   )

//   const handleViewDetails = (order: OrderWithPayment) => {
//     setSelectedOrder(order)
//     setIsVerificationOpen(true)
//   }

//   if (isLoading) {
//     return (
//       <div className="container mx-auto p-6">
//         <div className="flex items-center justify-center min-h-[400px]">
//           <p className="text-lg text-gray-500">Loading orders...</p>
//         </div>
//       </div>
//     )
//   }

//   if (error) {
//     return (
//       <div className="container mx-auto p-6">
//         <div className="flex items-center justify-center min-h-[400px]">
//           <p className="text-lg text-red-500">{error}</p>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="container mx-auto p-6">
//       <div className="flex justify-between items-center mb-8">
//         <div>
//           <h1 className="text-3xl font-bold">Slip Verification</h1>
//           <p className="text-gray-500">Verify and manage transaction slips</p>
//         </div>
//         <div className="flex items-center gap-4">
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
//             <Input
//               type="search"
//               placeholder="Search by invoice or table number..."
//               className="pl-10 w-[300px]"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//           </div>
//           <Button variant="ghost" size="icon">
//             <Bell className="h-5 w-5" />
//           </Button>
//         </div>
//       </div>

//       <div className="bg-white rounded-lg shadow">
//         <div className="overflow-x-auto">
//           <table className="w-full">
//             <thead>
//               <tr className="border-b">
//                 <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Invoice No.</th>
//                 <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Table No.</th>
//                 <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Created At</th>
//                 <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Total</th>
//                 <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Status</th>
//                 <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Payment Status</th>
//                 <th className="px-6 py-4 text-left text-sm font-medium text-gray-500">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredOrders.map((order) => (
//                 <tr key={order.id} className="border-b hover:bg-gray-50">
//                   <td className="px-6 py-4">{order.invoiceNo}</td>
//                   <td className="px-6 py-4">{order.tableNumber}</td>
//                   <td className="px-6 py-4">{new Date(order.createdAt).toLocaleString()}</td>
//                   <td className="px-6 py-4">฿{formatPrice(order.totalPrice)}</td>
//                   <td className="px-6 py-4">
//                     <Badge
//                       variant={
//                         order.status === "completed"
//                           ? "default"
//                           : order.status === "pending"
//                             ? "secondary"
//                             : "destructive"
//                       }
//                     >
//                       {order.status}
//                     </Badge>
//                   </td>
//                   <td className="px-6 py-4">
//                     {order.paymentSlip ? (
//                       <Badge
//                         variant={
//                           order.paymentSlip.status === "verified"
//                             ? "default"
//                             : order.paymentSlip.status === "pending"
//                               ? "secondary"
//                               : "destructive"
//                         }
//                       >
//                         {order.paymentSlip.status}
//                       </Badge>
//                     ) : (
//                       <Badge variant="outline">Not Uploaded</Badge>
//                     )}
//                   </td>
//                   <td className="px-6 py-4">
//                     <Button
//                       variant="ghost"
//                       className="flex items-center gap-2"
//                       onClick={() => handleViewDetails(order)}
//                     >
//                       View Details
//                       <ChevronRight className="h-4 w-4" />
//                     </Button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       <Dialog open={isVerificationOpen} onOpenChange={setIsVerificationOpen}>
//         <DialogContent className="max-w-2xl">
//           <DialogHeader>
//             <DialogTitle>Verify Payment Slip</DialogTitle>
//           </DialogHeader>
//           {selectedOrder && (
//             <SlipVerification
//               expectedAmount={selectedOrder.totalPrice}
//               orderId={selectedOrder.id}
//               onVerificationComplete={() => {
//                 setIsVerificationOpen(false)
//                 fetchOrders() // Refresh the orders list
//               }}
//             />
//           )}
//         </DialogContent>
//       </Dialog>
//     </div>
//   )
// }
"use client"

import { useEffect, useState } from "react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Legend ,Cell} from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/src/components/ui/table"
import { Button } from "@/src/components/ui/button"
import { ScrollArea } from "@/src/components/ui/scroll-area"
import { ShoppingCart, DollarSign, Clock, Eye, Receipt, Package, Calendar, Hash, CreditCard,ImageIcon ,ChevronLeft, ChevronRight, Search, Upload } from "lucide-react"
import Image from "next/image"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/src/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"
import { Input } from "@/src/components/ui/input"
import { SlipVerification } from "./slip-verification"


interface PaymentSlip {
  id: string
  amount: number
  transfer_time: string
  status: string
  slip_url: string
  transaction_id: string
  raw_text?: string
}

interface OrderItem {
  menu_id: string
  name: string
  quantity: number
  price: number
  special_instructions?: string
}

interface Order {
  id: string
  table_number: string
  status: string
  payment_status: string
  timestamp: string
  customer_rating?: number
  total_price: number
  items: OrderItem[]
  slip_url?: string
  slip?: {
    transfer_time: string
    status: string
    transaction_id: string
}
}



// const CustomTooltip = ({ active, payload, label }: any) => {
//   if (active && payload && payload.length) {
//     return (
//       <div className="bg-white p-3 rounded-lg shadow-md border border-gray-100">
//         <p className="text-sm text-gray-600 mb-1">{label}</p>
//         {payload.map((entry: any, index: number) => (
//           <p key={index} className="text-sm font-medium" style={{ color: entry.color }}>
//             {entry.name}: {entry.name === "Revenue" ? `฿${entry.value.toFixed(2)}` : entry.value}
//           </p>
//         ))}
//       </div>
//     )
//   }
//   return null
// }

// const CustomLegend = ({ payload }: any) => {
//   return (
//     <div className="flex justify-center gap-4 mt-2">
//       {payload.map((entry: any, index: number) => (
//         <div key={`item-${index}`} className="flex items-center gap-2">
//           <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color }} />
//           <span className="text-sm text-gray-600">{entry.value}</span>
//         </div>
//       ))}
//     </div>
//   )
// }

// function OrderDetailsDialog({ order }: { order: Order }) {
//   const [imageError, setImageError] = useState(false)

//   return (
//     <Dialog>
//       <DialogTrigger asChild>
//         <Button variant="ghost" size="sm">
//           <Eye className="h-4 w-4 mr-2" />
//           See Details
//         </Button>
//       </DialogTrigger>
//       <DialogContent className="max-w-3xl">
//         <DialogHeader>
//           <DialogTitle>Order Details</DialogTitle>
//         </DialogHeader>
//         <ScrollArea className="max-h-[80vh]">
//           <div className="grid gap-6 p-6">
//             {/* Order Summary */}
//             <div className="grid gap-2">
//               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                 <div className="space-y-1">
//                   <p className="text-sm text-muted-foreground flex items-center gap-1">
//                     <Hash className="h-4 w-4" /> Order ID
//                   </p>
//                   <p className="font-medium">{order.id}</p>
//                 </div>
//                 <div className="space-y-1">
//                   <p className="text-sm text-muted-foreground flex items-center gap-1">
//                     <Calendar className="h-4 w-4" /> Date
//                   </p>
//                   <p className="font-medium">{new Date(order.timestamp).toLocaleString()}</p>
//                 </div>
//                 <div className="space-y-1">
//                   <p className="text-sm text-muted-foreground flex items-center gap-1">
//                     <Package className="h-4 w-4" /> Status
//                   </p>
//                   <p className="font-medium">{order.status}</p>
//                 </div>
//                 <div className="space-y-1">
//                   <p className="text-sm text-muted-foreground flex items-center gap-1">
//                     <CreditCard className="h-4 w-4" /> Payment
//                   </p>
//                   <span
//                     className={`px-2 py-1 rounded-full text-xs font-semibold ${
//                       order.payment_status === "paid" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
//                     }`}
//                   >
//                     {order.payment_status}
//                   </span>
//                 </div>
//               </div>
//             </div>

//             <div className="border-t my-4" />

//             {/* Order Items */}
//             <div className="space-y-4">
//               <h3 className="font-semibold text-lg">Order Items</h3>
//               <div className="grid gap-4">
//                 {order.items.map((item, index) => (
//                   <div key={index} className="grid grid-cols-[1fr,auto] gap-4 p-4 rounded-lg border">
//                     <div>
//                       <p className="font-medium">{item.name}</p>
//                       {item.special_instructions && (
//                         <p className="text-sm text-muted-foreground mt-1">Note: {item.special_instructions}</p>
//                       )}
//                     </div>
//                     <div className="text-right">
//                       <p className="font-medium">฿{(item.price * item.quantity).toFixed(2)}</p>
//                       <p className="text-sm text-muted-foreground">
//                         {item.quantity} × ฿{item.price.toFixed(2)}
//                       </p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             <div className="border-t my-4" />

//             {/* Payment Slip */}
//             <div className="space-y-4">
//               <h3 className="font-semibold text-lg flex items-center gap-2">
//                 <Receipt className="h-4 w-4" />
//                 Payment Details
//               </h3>
//               {order.slip_url ? (
//                 <div className="space-y-6">
//                   <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//                     {order.slip?.transfer_time && (
//                       <div className="space-y-1">
//                         <p className="text-sm text-muted-foreground">Transfer Time</p>
//                         <p className="font-medium">{new Date(order.slip.transfer_time).toLocaleString()}</p>
//                       </div>
//                     )}
//                     {order.slip?.status && (
//                       <div className="space-y-1">
//                         <p className="text-sm text-muted-foreground">Status</p>
//                         <span
//                           className={`px-2 py-1 rounded-full text-xs font-semibold ${
//                             order.slip.status === "verified"
//                               ? "bg-green-100 text-green-800"
//                               : "bg-yellow-100 text-yellow-800"
//                           }`}
//                         >
//                           {order.slip.status}
//                         </span>
//                       </div>
//                     )}
//                     {order.slip?.transaction_id && (
//                       <div className="space-y-1">
//                         <p className="text-sm text-muted-foreground">Transaction ID</p>
//                         <p className="font-medium">{order.slip.transaction_id}</p>
//                       </div>
//                     )}
//                   </div>
//                   <div className="relative aspect-[3/4] w-full max-w-sm mx-auto border rounded-lg overflow-hidden bg-gray-50">
//                     {!imageError ? (
//                       <Image
//                         src={order.slip_url || "/placeholder.svg"}
//                         alt="Payment Slip"
//                         fill
//                         className="object-contain"
//                         onError={() => setImageError(true)}
//                       />
//                     ) : (
//                       <div className="absolute inset-0 flex items-center justify-center text-gray-400">
//                         <p className="text-sm">Failed to load slip image</p>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               ) : (
//                 <div className="text-center py-8 text-gray-500">
//                   <Receipt className="h-12 w-12 mx-auto mb-2 opacity-50" />
//                   <p>No payment slip available</p>
//                 </div>
//               )}
//             </div>

//             {/* Total */}
//             <div className="flex justify-between items-center pt-4 border-t">
//               <p className="text-lg font-semibold">Total Amount</p>
//               <p className="text-lg font-semibold">฿{order.total_price.toFixed(2)}</p>
//             </div>
//           </div>
//         </ScrollArea>
//       </DialogContent>
//     </Dialog>
//   )
// }

// export default function SlipDashboard() {
//   const [orders, setOrders] = useState<Order[]>([])
//   const [loading, setLoading] = useState(true)
//   const [currentPage, setCurrentPage] = useState(1)
//   const [ordersPerPage, setOrdersPerPage] = useState(10)
//   const [searchTerm, setSearchTerm] = useState("")

//   useEffect(() => {
//     async function fetchOrders() {
//       try {
//         const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders`)
//         if (!res.ok) throw new Error("Failed to fetch orders")
//         const data = await res.json()
//         setOrders(data)
//       } catch (error) {
//         console.error("Error fetching orders:", error)
//       } finally {
//         setLoading(false)
//       }
//     }
//     fetchOrders()
//   }, [])

//   // Filter orders based on search term
//   const filteredOrders = orders.filter((order) => {
//     const searchTermLower = searchTerm.toLowerCase()
//     const idString = String(order.id).toLowerCase()
//     const tableNumberString = String(order.table_number).toLowerCase()

//     return idString.includes(searchTermLower) || tableNumberString.includes(searchTermLower)
//   })

//   // Calculate pagination
//   const indexOfLastOrder = currentPage * ordersPerPage
//   const indexOfFirstOrder = indexOfLastOrder - ordersPerPage
//   const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder)
//   const totalPages = Math.ceil(filteredOrders.length / ordersPerPage)

//   const totalOrders = orders.length
//   const totalRevenue = orders.reduce((sum, order) => sum + order.total_price, 0)
//   const pendingPayments = orders.filter((order) => order.payment_status !== "paid").length

//   // Process and sort chart data
//   const chartData = orders.reduce(
//     (acc, order) => {
//       const date = new Date(order.timestamp)
//       const dateStr = date.toLocaleDateString("en-US", {
//         weekday: "short",
//         month: "short",
//         day: "numeric",
//       })

//       const existingDay = acc.find((item) => item.name === dateStr)
//       if (existingDay) {
//         existingDay.total += order.total_price
//         existingDay.orders += 1
//       } else {
//         acc.push({
//           name: dateStr,
//           total: order.total_price,
//           orders: 1,
//         })
//       }
//       return acc
//     },
//     [] as { name: string; total: number; orders: number }[],
//   )

//   // Sort by date and limit to last 7 days
//   chartData.sort((a, b) => new Date(a.name).getTime() - new Date(b.name).getTime())
//   const last7Days = chartData.slice(-7)

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-orange-500"></div>
//       </div>
//     )
//   }

//   return (
//     <div className="container mx-auto p-4 bg-gray-50 min-h-screen">
//       <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Slip Dashboard</h1>
//       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
//         <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
//             <ShoppingCart className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{totalOrders}</div>
//             <p className="text-xs text-muted-foreground">+{Math.floor(Math.random() * 10)}% from last month</p>
//           </CardContent>
//         </Card>
//         <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
//             <DollarSign className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">฿{totalRevenue.toFixed(2)}</div>
//             <p className="text-xs text-muted-foreground">+{Math.floor(Math.random() * 15)}% from last month</p>
//           </CardContent>
//         </Card>
//         <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
//             <Clock className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">{pendingPayments}</div>
//             <p className="text-xs text-muted-foreground">
//               {pendingPayments > 0 ? "Action needed" : "All payments cleared"}
//             </p>
//           </CardContent>
//         </Card>
//       </div>

//       <Card className="mb-8 bg-white shadow-lg">
//         <CardHeader>
//           <CardTitle className="text-xl font-semibold">Orders Overview</CardTitle>
//           <CardDescription>Daily revenue and order count for the past week</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="h-[400px] w-full">
//             <ResponsiveContainer width="100%" height="100%">
//               <BarChart data={last7Days} margin={{ top: 20, right: 30, left: 20, bottom: 20 }} barGap={0}>
//                 <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" horizontal={true} vertical={false} />
//                 <XAxis
//                   dataKey="name"
//                   axisLine={false}
//                   tickLine={false}
//                   tick={{ fill: "#6B7280", fontSize: 12 }}
//                   dy={10}
//                 />
//                 <YAxis
//                   yAxisId="left"
//                   orientation="left"
//                   tickFormatter={(value) => `฿${value}`}
//                   axisLine={false}
//                   tickLine={false}
//                   tick={{ fill: "#6B7280", fontSize: 12 }}
//                   dx={-10}
//                 />
//                 <YAxis
//                   yAxisId="right"
//                   orientation="right"
//                   axisLine={false}
//                   tickLine={false}
//                   tick={{ fill: "#6B7280", fontSize: 12 }}
//                   dx={10}
//                 />
//                 <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(0, 0, 0, 0.04)" }} />
//                 <Legend content={<CustomLegend />} verticalAlign="bottom" height={36} />
//                 <Bar yAxisId="left" dataKey="total" name="Revenue" fill="#FF6B00" radius={[4, 4, 0, 0]} />
//                 <Bar yAxisId="right" dataKey="orders" name="Orders" fill="#FFA366" radius={[4, 4, 0, 0]} />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         </CardContent>
//       </Card>

//       <Card className="bg-white shadow-lg mb-8">
//         <CardHeader>
//           <CardTitle className="text-xl font-semibold">All Orders</CardTitle>
//           <CardDescription>Comprehensive list of all transactions</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <div className="flex justify-between items-center mb-4">
//             <div className="flex items-center space-x-2">
//               <Search className="text-gray-400" />
//               <Input
//                 type="text"
//                 placeholder="Search by Order ID or Table Number"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-64"
//               />
//             </div>
//             <Select value={ordersPerPage.toString()} onValueChange={(value) => setOrdersPerPage(Number(value))}>
//               <SelectTrigger className="w-[180px]">
//                 <SelectValue placeholder="Orders per page" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="10">10 per page</SelectItem>
//                 <SelectItem value="20">20 per page</SelectItem>
//                 <SelectItem value="50">50 per page</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead className="w-[100px]">Order ID</TableHead>
//                 <TableHead>Table Number</TableHead>
//                 <TableHead>Status</TableHead>
//                 <TableHead>Payment Status</TableHead>
//                 <TableHead className="text-right">Total Price</TableHead>
//                 <TableHead className="text-right">Timestamp</TableHead>
//                 <TableHead className="w-[100px]"></TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {currentOrders.map((order) => (
//                 <TableRow key={order.id}>
//                   <TableCell className="font-medium">{order.id}</TableCell>
//                   <TableCell>{order.table_number}</TableCell>
//                   <TableCell>{order.status}</TableCell>
//                   <TableCell>
//                     <span
//                       className={`px-2 py-1 rounded-full text-xs font-semibold ${
//                         order.payment_status === "paid"
//                           ? "bg-green-100 text-green-800"
//                           : "bg-yellow-100 text-yellow-800"
//                       }`}
//                     >
//                       {order.payment_status}
//                     </span>
//                   </TableCell>
//                   <TableCell className="text-right">฿{order.total_price.toFixed(2)}</TableCell>
//                   <TableCell className="text-right">{new Date(order.timestamp).toLocaleString()}</TableCell>
//                   <TableCell>
//                     <OrderDetailsDialog order={order} />
//                   </TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//           <div className="flex items-center justify-between mt-4">
//             <p className="text-sm text-gray-600">
//               Showing {indexOfFirstOrder + 1} to {Math.min(indexOfLastOrder, filteredOrders.length)} of{" "}
//               {filteredOrders.length} orders
//             </p>
//             <div className="flex items-center space-x-2">
//               <Button
//                 variant="outline"
//                 size="sm"
//                 onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//                 disabled={currentPage === 1}
//               >
//                 <ChevronLeft className="h-4 w-4" />
//                 Previous
//               </Button>
//               <Button
//                 variant="outline"
//                 size="sm"
//                 onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
//                 disabled={currentPage === totalPages}
//               >
//                 Next
//                 <ChevronRight className="h-4 w-4" />
//               </Button>
//             </div>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }


const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 rounded-lg shadow-md border border-gray-100">
        <p className="text-sm text-gray-600 mb-1">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm font-medium" style={{ color: entry.color }}>
            {entry.name}: {entry.name === "Revenue" ? `฿${entry.value.toFixed(2)}` : entry.value}
          </p>
        ))}
      </div>
    )
  }
  return null
}

const CustomLegend = ({ payload }: any) => {
  return (
    <div className="flex justify-center gap-4 mt-2">
      {payload.map((entry: any, index: number) => (
        <div key={`item-${index}`} className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: entry.color }} />
          <span className="text-sm text-gray-600">{entry.value}</span>
        </div>
      ))}
    </div>
  )
}

function OrderDetailsDialog({ order, onVerificationComplete }: { order: Order; onVerificationComplete: () => void }) {
  const [imageError, setImageError] = useState(false)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <Eye className="h-4 w-4 mr-2" />
          See Details
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Order Details</DialogTitle>
        </DialogHeader>
        <ScrollArea className="max-h-[80vh]">
          <div className="grid gap-6 p-6">
            {/* Order Summary */}
            <div className="grid gap-2">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <Hash className="h-4 w-4" /> Order ID
                  </p>
                  <p className="font-medium">{order.id}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <Calendar className="h-4 w-4" /> Date
                  </p>
                  <p className="font-medium">{new Date(order.timestamp).toLocaleString()}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <Package className="h-4 w-4" /> Status
                  </p>
                  <p className="font-medium">{order.status}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <CreditCard className="h-4 w-4" /> Payment
                  </p>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      order.payment_status === "paid" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {order.payment_status}
                  </span>
                </div>
              </div>
            </div>

            <div className="border-t my-4" />

            {/* Order Items */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Order Items</h3>
              <div className="grid gap-4">
                {order.items.map((item, index) => (
                  <div key={index} className="grid grid-cols-[1fr,auto] gap-4 p-4 rounded-lg border">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      {item.special_instructions && (
                        <p className="text-sm text-muted-foreground mt-1">Note: {item.special_instructions}</p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="font-medium">฿{(item.price * item.quantity).toFixed(2)}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.quantity} × ฿{item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t my-4" />

            {/* Payment Slip */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <Receipt className="h-4 w-4" />
                Payment Details
              </h3>
              {order.slip_url ? (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {order.slip?.transfer_time && (
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Transfer Time</p>
                        <p className="font-medium">{new Date(order.slip.transfer_time).toLocaleString()}</p>
                      </div>
                    )}
                    {order.slip?.status && (
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Status</p>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            order.slip.status === "verified"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {order.slip.status}
                        </span>
                      </div>
                    )}
                    {order.slip?.transaction_id && (
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Transaction ID</p>
                        <p className="font-medium">{order.slip.transaction_id}</p>
                      </div>
                    )}
                  </div>
                  <div className="relative aspect-[3/4] w-full max-w-sm mx-auto border rounded-lg overflow-hidden bg-gray-50">
                    {!imageError ? (
                      <Image
                        src={order.slip_url || "/placeholder.svg"}
                        alt="Payment Slip"
                        fill
                        className="object-contain"
                        onError={() => setImageError(true)}
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                        <p className="text-sm">Failed to load slip image</p>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  {order.payment_status === "unpaid" ? (
                    <SlipVerificationDialog order={order} onVerificationComplete={onVerificationComplete} />
                  ) : (
                    <>
                      <Receipt className="h-12 w-12 mx-auto mb-2 opacity-50" />
                      <p>No payment slip available</p>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Total */}
            <div className="flex justify-between items-center pt-4 border-t">
              <p className="text-lg font-semibold">Total Amount</p>
              <p className="text-lg font-semibold">฿{order.total_price.toFixed(2)}</p>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

function SlipVerificationDialog({
  order,
  onVerificationComplete,
}: { order: Order; onVerificationComplete: () => void }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">
          <Upload className="h-4 w-4 mr-2" />
          Upload Payment Slip
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Upload Payment Slip</DialogTitle>
        </DialogHeader>
        <SlipVerification
          expectedAmount={order.total_price}
          orderId={order.id.toString()}
          onVerificationComplete={(result) => {
            if (result) {
              onVerificationComplete()
            }
          }}
        />
      </DialogContent>
    </Dialog>
  )
}

export default function SlipDashboard() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [ordersPerPage, setOrdersPerPage] = useState(10)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    fetchOrders()
  }, [])

  async function fetchOrders() {
    try {
      const res = await fetch(`/api/orders`)
      if (!res.ok) throw new Error("Failed to fetch orders")
      const data = await res.json()
      setOrders(data)
    } catch (error) {
      console.error("Error fetching orders:", error)
    } finally {
      setLoading(false)
    }
  }

  // Filter orders based on search term
  const filteredOrders = orders.filter((order) => {
    const searchTermLower = searchTerm.toLowerCase()
    const idString = String(order.id).toLowerCase()
    const tableNumberString = String(order.table_number).toLowerCase()

    return idString.includes(searchTermLower) || tableNumberString.includes(searchTermLower)
  })

  // Calculate pagination
  const indexOfLastOrder = currentPage * ordersPerPage
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder)
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage)

  const totalOrders = orders.length
  const totalRevenue = orders.reduce((sum, order) => sum + order.total_price, 0)
  const pendingPayments = orders.filter((order) => order.payment_status !== "paid").length

  // Process and sort chart data
  const chartData = orders.reduce(
    (acc, order) => {
      const date = new Date(order.timestamp)
      const dateStr = date.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
      })

      const existingDay = acc.find((item) => item.name === dateStr)
      if (existingDay) {
        existingDay.total += order.total_price
        existingDay.orders += 1
      } else {
        acc.push({
          name: dateStr,
          total: order.total_price,
          orders: 1,
        })
      }
      return acc
    },
    [] as { name: string; total: number; orders: number }[],
  )

  // Sort by date and limit to last 7 days
  chartData.sort((a, b) => new Date(a.name).getTime() - new Date(b.name).getTime())
  const last7Days = chartData.slice(-7)

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Slip Dashboard</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
        <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalOrders}</div>
            <p className="text-xs text-muted-foreground">+{Math.floor(Math.random() * 10)}% from last month</p>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">฿{totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">+{Math.floor(Math.random() * 15)}% from last month</p>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingPayments}</div>
            <p className="text-xs text-muted-foreground">
              {pendingPayments > 0 ? "Action needed" : "All payments cleared"}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8 bg-white shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Orders Overview</CardTitle>
          <CardDescription>Daily revenue and order count for the past week</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={last7Days} margin={{ top: 20, right: 30, left: 20, bottom: 20 }} barGap={0}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" horizontal={true} vertical={false} />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#6B7280", fontSize: 12 }}
                  dy={10}
                />
                <YAxis
                  yAxisId="left"
                  orientation="left"
                  tickFormatter={(value) => `฿${value}`}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#6B7280", fontSize: 12 }}
                  dx={-10}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#6B7280", fontSize: 12 }}
                  dx={10}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(0, 0, 0, 0.04)" }} />
                <Legend content={<CustomLegend />} verticalAlign="bottom" height={36} />
                <Bar yAxisId="left" dataKey="total" name="Revenue" fill="#FF6B00" radius={[4, 4, 0, 0]} />
                <Bar yAxisId="right" dataKey="orders" name="Orders" fill="#FFA366" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white shadow-lg mb-8">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">All Orders</CardTitle>
          <CardDescription>Comprehensive list of all transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-2">
              <Search className="text-gray-400" />
              <Input
                type="text"
                placeholder="Search by Order ID or Table Number"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64"
              />
            </div>
            <Select value={ordersPerPage.toString()} onValueChange={(value) => setOrdersPerPage(Number(value))}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Orders per page" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10 per page</SelectItem>
                <SelectItem value="20">20 per page</SelectItem>
                <SelectItem value="50">50 per page</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Order ID</TableHead>
                <TableHead>Table Number</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment Status</TableHead>
                <TableHead className="text-right">Total Price</TableHead>
                <TableHead className="text-right">Timestamp</TableHead>
                <TableHead className="w-[100px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentOrders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{order.table_number}</TableCell>
                  <TableCell>{order.status}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        order.payment_status === "paid"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {order.payment_status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">฿{order.total_price.toFixed(2)}</TableCell>
                  <TableCell className="text-right">{new Date(order.timestamp).toLocaleString()}</TableCell>
                  <TableCell>
                    <OrderDetailsDialog order={order} onVerificationComplete={fetchOrders} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-gray-600">
              Showing {indexOfFirstOrder + 1} to {Math.min(indexOfLastOrder, filteredOrders.length)} of{" "}
              {filteredOrders.length} orders
            </p>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Next
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}







