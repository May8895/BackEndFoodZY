

"use client"

import { useCallback, useEffect, useState } from "react"
import { Bar, BarChart,Line, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid,  LineChart as RechartsLineChart } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/src/components/ui/table"
import { Button } from "@/src/components/ui/button"
import { ScrollArea } from "@/src/components/ui/scroll-area"
import {
  AlertTriangle,
  DollarSign,
  Grid,
  Package2,
  ShoppingBag,
  Users,
  Star,
  Clock,
  Eye,
  Receipt,
  ChevronLeft,
  ChevronRight,
  Search,
  Bell,
  Calendar,
  LineChart,
} from "lucide-react"
import Image from "next/image"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/src/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"
import { Input } from "@/src/components/ui/input"
import { Badge } from "@/src/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/src/components/ui/dropdown-menu"
import { Layout } from "@/src/components/layout"

// interface StaffMember {
//   id: string
//   name: string
//   status: "on_shift" | "off_shift"
//   performance_score: number
//   avatar_url?: string
//   orders_completed: number
//   average_rating: number
//   shift_start?: string
// }

// interface InventoryItem {
//   id: string
//   name: string
//   quantity: number
//   threshold: number
// }

// interface Order {
//   table_number: any
//   id: string | number
//   total_price: number
//   timestamp: string
// }

// export default function DashboardPage() {
//   const [staff, setStaff] = useState<StaffMember[]>([])
//   const [inventory, setInventory] = useState<InventoryItem[]>([])
//   const [loading, setLoading] = useState(true)
//   const [orders, setOrders] = useState<Order[]>([])

//   useEffect(() => {
//     Promise.all([
//       fetch("/api/orders").then((res) => res.json()),
//       fetch("/api/staff").then((res) => res.json()),
//       fetch("/api/inventory").then((res) => res.json()),
//     ])
//       .then(([ordersData, staffData, inventoryData]) => {
//         setOrders(ordersData)
//         setStaff(staffData)
//         setInventory(inventoryData)
//         setLoading(false)
//       })
//       .catch((error) => {
//         console.error("Error fetching dashboard data:", error)
//         setLoading(false)
//       })
//   }, [])

//   const lowStockItems = inventory.filter((item) => item.quantity <= item.threshold)
//   const activeStaff = staff.filter((member) => member.status === "on_shift")

//   const getPerformanceColor = (score: number) => {
//     if (score >= 90) return "text-green-500"
//     if (score >= 70) return "text-blue-500"
//     if (score >= 50) return "text-yellow-500"
//     return "text-red-500"
//   }


//   if (loading) {
//     return (
//       <Layout>
//         <div className="flex flex-col gap-6 p-6">
//           <div className="flex justify-between items-center">
//             <div className="space-y-2">
//               <div className="animate-pulse bg-muted rounded-md h-8 w-[200px]" />
//               <div className="animate-pulse bg-muted rounded-md h-4 w-[300px]" />
//             </div>
//           </div>
//           <div className="grid gap-6 md:grid-cols-2">
//             {Array(2)
//               .fill(0)
//               .map((_, i) => (
//                 <Card key={i} className="animate-pulse">
//                   <CardHeader>
//                     <div className="animate-pulse bg-muted rounded-md h-6 w-[140px]" />
//                   </CardHeader>
//                   <CardContent>
//                     <div className="space-y-4">
//                       {Array(3)
//                         .fill(0)
//                         .map((_, j) => (
//                           <div key={j} className="animate-pulse bg-muted rounded-md h-16 w-full" />
//                         ))}
//                     </div>
//                   </CardContent>
//                 </Card>
//               ))}
//           </div>
//         </div>
//       </Layout>
//     )
//   }

//   return (
//     <Layout>
//       <div className="flex flex-col gap-6 p-6 bg-gradient-to-b from-white to-gray-50">
//         <div className="flex justify-between items-center">
//           <div>
//             <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
//               Dashboard
//             </h1>
//             <p className="text-gray-500 mt-1">Welcome back to your dashboard</p>
//           </div>
//           <div className="flex flex-wrap gap-2">
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button
//                   variant="outline"
//                   className="border-green-500 text-green-600 hover:bg-green-50 transition-all duration-300 shadow-sm hover:shadow-md"
//                 >
//                   <Grid className="mr-2 h-4 w-4" />
//                   Line Official
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent align="end" className="w-56">
//                 <DropdownMenuItem>Rich Menu</DropdownMenuItem>
//                 <DropdownMenuItem>Coupon</DropdownMenuItem>
//                 <DropdownMenuItem>Reward Card</DropdownMenuItem>
//                 <DropdownMenuItem>Auto-Response</DropdownMenuItem>
//                 <DropdownMenuItem>Edit Profile</DropdownMenuItem>
//               </DropdownMenuContent>
//             </DropdownMenu>
//           </div>
//         </div>

//         <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
//           <Card className="hover:shadow-lg transition-all duration-300 bg-white/50 backdrop-blur-sm">
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
//               <ShoppingBag className="h-4 w-4 text-orange-500" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold text-gray-900">{orders.length}</div>
//               <p className="text-xs text-green-600 flex items-center gap-1">
//                 <span className="flex h-2 w-2 rounded-full bg-green-500" />+{Math.floor(Math.random() * 10)}% from last
//                 month
//               </p>
//             </CardContent>
//           </Card>

//           <Card className="hover:shadow-lg transition-all duration-300 bg-white/50 backdrop-blur-sm">
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
//               <DollarSign className="h-4 w-4 text-green-500" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold text-gray-900">
//                 ฿{orders.reduce((sum, order) => sum + (order.total_price || 0), 0).toFixed(2)}
//               </div>
//               <p className="text-xs text-green-600 flex items-center gap-1">
//                 <span className="flex h-2 w-2 rounded-full bg-green-500" />+{Math.floor(Math.random() * 15)}% from last
//                 month
//               </p>
//             </CardContent>
//           </Card>

//           <Card className="hover:shadow-lg transition-all duration-300 bg-white/50 backdrop-blur-sm">
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
//               <Package2 className="h-4 w-4 text-orange-500" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold text-gray-900">{lowStockItems.length}</div>
//               <p className="text-xs">
//                 {lowStockItems.length > 0 ? (
//                   <span className="text-orange-500 flex items-center gap-1">
//                     <AlertTriangle className="h-3 w-3" />
//                     Requires attention
//                   </span>
//                 ) : (
//                   <span className="text-green-600 flex items-center gap-1">
//                     <span className="flex h-2 w-2 rounded-full bg-green-500" />
//                     All stock levels normal
//                   </span>
//                 )}
//               </p>
//             </CardContent>
//           </Card>

//           <Card className="hover:shadow-lg transition-all duration-300 bg-white/50 backdrop-blur-sm">
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">Active Staff</CardTitle>
//               <Users className="h-4 w-4 text-blue-500" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold text-gray-900">{activeStaff.length}</div>
//               <p className="text-xs text-orange-600 flex items-center gap-1">
//                 <span className="flex h-2 w-2 rounded-full bg-orange-500" />
//                 {activeStaff.length} of {staff.length} on shift
//               </p>
//             </CardContent>
//           </Card>
//         </div>

//         <div className="grid gap-6 md:grid-cols-2">
//           <Card className="hover:shadow-lg transition-all duration-300 bg-white/50 backdrop-blur-sm">
//             <CardHeader>
//               <CardTitle className="text-xl font-semibold flex items-center gap-2 bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
//                 <Package2 className="h-5 w-5 text-orange-500" />
//                 Low Stock Items
//               </CardTitle>
//               <CardDescription>Items that need to be restocked soon</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <ScrollArea className="h-[400px]">
//                 <div className="space-y-4">
//                   {lowStockItems.length === 0 ? (
//                     <div className="flex flex-col items-center justify-center py-8 text-gray-500">
//                       <Package2 className="h-12 w-12 mb-2 text-gray-400" />
//                       <p className="text-sm">All stock levels are normal</p>
//                     </div>
//                   ) : (
//                     <Table>
//                       <TableHeader>
//                         <TableRow>
//                           <TableHead>Item Name</TableHead>
//                           <TableHead className="text-right">Current Stock</TableHead>
//                           <TableHead className="text-right">Threshold</TableHead>
//                           <TableHead className="text-right">Status</TableHead>
//                         </TableRow>
//                       </TableHeader>
//                       <TableBody>
//                         {lowStockItems.map((item) => (
//                           <TableRow key={item.id}>
//                             <TableCell className="font-medium">{item.name}</TableCell>
//                             <TableCell className="text-right">{item.quantity}</TableCell>
//                             <TableCell className="text-right">{item.threshold}</TableCell>
//                             <TableCell className="text-right">
//                               <Badge
//                                 variant="secondary"
//                                 className={
//                                   item.quantity === 0 ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800"
//                                 }
//                               >
//                                 {item.quantity === 0 ? "Out of Stock" : "Low Stock"}
//                               </Badge>
//                             </TableCell>
//                           </TableRow>
//                         ))}
//                       </TableBody>
//                     </Table>
//                   )}
//                 </div>
//               </ScrollArea>
//             </CardContent>
//           </Card>

//           <Card className="hover:shadow-lg transition-all duration-300 bg-white/50 backdrop-blur-sm">
//             <CardHeader>
//               <CardTitle className="text-xl font-semibold flex items-center gap-2 bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
//                 <Users className="h-5 w-5 text-orange-500" />
//                 Staff Performance
//               </CardTitle>
//               <CardDescription>Current staff status and performance metrics</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <ScrollArea className="h-[400px] pr-4">
//                 <div className="space-y-6">
//                   {staff.map((member) => (
//                     <div
//                       key={member.id}
//                       className="space-y-2 p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200 border border-gray-100"
//                     >
//                       <div className="flex items-center justify-between">
//                         <div className="flex items-center gap-3">
//                           <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-md">
//                             {member.avatar_url ? (
//                               <img
//                                 src={member.avatar_url || "/placeholder.svg"}
//                                 alt={member.name}
//                                 className="w-12 h-12 rounded-full object-cover"
//                               />
//                             ) : (
//                               <Users className="w-6 h-6 text-white" />
//                             )}
//                           </div>
//                           <div>
//                             <p className="font-medium text-gray-900">{member.name}</p>
//                             <div className="flex items-center gap-2">
//                               <Badge
//                                 variant={member.status === "on_shift" ? "default" : "secondary"}
//                                 className={`text-xs ${
//                                   member.status === "on_shift"
//                                     ? "bg-green-100 text-green-800 hover:bg-green-200"
//                                     : "bg-gray-100 text-gray-800 hover:bg-gray-200"
//                                 }`}
//                               >
//                                 {member.status === "on_shift" ? "On Shift" : "Off Shift"}
//                               </Badge>
//                               {member.status === "on_shift" && (
//                                 <span className="text-xs text-gray-500 flex items-center gap-1">
//                                   <Clock className="w-3 h-3" />
//                                 </span>
//                               )}
//                             </div>
//                           </div>
//                         </div>
//                         <div className="text-right">
//                           <p className={`text-lg font-bold ${getPerformanceColor(member.performance_score)}`}>
//                             {member.performance_score}%
//                           </p>
//                           <div className="flex items-center gap-1 text-xs text-gray-500">
//                             <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
//                             {member.average_rating?.toFixed(1) }
//                           </div>
//                         </div>
//                       </div>
//                       <div className="space-y-2">
//                         <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
//                           <div
//                             className="h-full transition-all duration-500 ease-in-out"
//                             style={{
//                               width: `${member.performance_score}%`,
//                               background: `linear-gradient(90deg, 
//                                 ${
//                                   member.performance_score >= 90
//                                     ? "#22c55e"
//                                     : member.performance_score >= 70
//                                       ? "#3b82f6"
//                                       : member.performance_score >= 50
//                                         ? "#eab308"
//                                         : "#ef4444"
//                                 } 0%,
//                                 ${
//                                   member.performance_score >= 90
//                                     ? "#16a34a"
//                                     : member.performance_score >= 70
//                                       ? "#2563eb"
//                                       : member.performance_score >= 50
//                                         ? "#d97706"
//                                         : "#dc2626"
//                                 } 100%)`,
//                             }}
//                           />
//                         </div>
//                         <div className="flex justify-between text-xs text-gray-500">
//                           <span className="font-medium">{member.orders_completed} orders completed</span>
//                           <span>Target: 50 orders</span>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </ScrollArea>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </Layout>
//   )
// }

type NotificationType = "order" | "booking" | "staff" | "inventory"
type NotificationPriority = "low" | "medium" | "high"

interface Notification {
  id: string
  type: NotificationType
  title: string
  message: string
  timestamp: string
  read: boolean
  priority: NotificationPriority
  relatedId?: string
}

interface InventoryItem {
  id: string
  name: string
  quantity: number
  threshold: number
}

interface Order {
  id: string | number
  total_price: number
  timestamp: string
  status: string
  table_number: string
  items: OrderItem[]
}

interface OrderItem {
  menu_id: string
  name: string
  quantity: number
  price: number
}

export default function DashboardPage() {
  const [inventory, setInventory] = useState<InventoryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [orders, setOrders] = useState<Order[]>([])
  const [staff, setStaff] = useState<any[]>([])
  const [tables, setTables] = useState<any[]>([])

  // Notification state
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [showNotifications, setShowNotifications] = useState(false)
  const [lastFetchTime, setLastFetchTime] = useState(Date.now())

  // Notification counts by type
  const newOrdersCount = notifications.filter((n) => n.type === "order" && !n.read).length
  const lowPerformanceCount = notifications.filter((n) => n.type === "staff" && !n.read).length
  const newBookingsCount = notifications.filter((n) => n.type === "booking" && !n.read).length

  // Fetch data from APIs
  const fetchData = useCallback(async () => {
    try {
      // Fetch orders
      const ordersResponse = await fetch("/api/orders")
      if (ordersResponse.ok) {
        const ordersData = await ordersResponse.json()
        setOrders(ordersData)
        processOrdersForNotifications(ordersData)
      }

      // Fetch inventory
      const inventoryResponse = await fetch("/api/inventory")
      if (inventoryResponse.ok) {
        const inventoryData = await inventoryResponse.json()
        setInventory(inventoryData)
        processInventoryForNotifications(inventoryData)
      }

      // Fetch staff
      const staffResponse = await fetch("/api/staff")
      if (staffResponse.ok) {
        const staffData = await staffResponse.json()
        setStaff(staffData)
        processStaffForNotifications(staffData)
      }

      // Fetch tables
      const tablesResponse = await fetch("/api/tables")
      if (tablesResponse.ok) {
        const tablesData = await tablesResponse.json()
        setTables(tablesData)
        processTablesForNotifications(tablesData)
      }

      // Update last fetch time
      setLastFetchTime(Date.now())
      setLoading(false)
    } catch (error) {
      console.error("Error fetching data for notifications:", error)
      setLoading(false)
    }
  }, [])

  // Set up polling
  useEffect(() => {
    // Initial fetch
    fetchData()

    // Set up polling interval
    const intervalId = setInterval(fetchData, 10000) // Poll every 10 seconds

    // Clean up on unmount
    return () => {
      if (intervalId) {
        clearInterval(intervalId)
      }
    }
  }, [fetchData])

  // Update unread count when notifications change
  useEffect(() => {
    setUnreadCount(notifications.filter((n) => !n.read).length)
  }, [notifications])

  // Create a new notification
  const createNotification = useCallback(
    ({
      type,
      title,
      message,
      priority = "medium",
      relatedId,
    }: {
      type: NotificationType
      title: string
      message: string
      priority?: NotificationPriority
      relatedId?: string
    }) => {
      const notification: Notification = {
        id: uuidv4(),
        type,
        title,
        message,
        timestamp: new Date().toISOString(),
        read: false,
        priority,
        relatedId,
      }

      setNotifications((prev) => {
        // Check if notification already exists
        const exists = prev.some((n) => n.type === type && n.relatedId === relatedId && n.message === message)

        if (exists) return prev

        // Add new notification at the beginning
        const updated = [notification, ...prev]

        // Limit the number of notifications to prevent memory issues
        if (updated.length > 100) {
          return updated.slice(0, 100)
        }

        return updated
      })

      return notification
    },
    [],
  )

  // Mark a notification as read
  const markAsRead = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }, [])

  // Mark all notifications as read
  const markAllAsRead = useCallback(() => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })))
  }, [])

  // Process orders to generate notifications
  const processOrdersForNotifications = useCallback(
    (orders: any[]) => {
      const now = new Date()
      const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000)

      // Find recent orders (created in the last 5 minutes)
      const recentOrders = orders.filter((order) => {
        const orderDate = new Date(order.timestamp)
        return orderDate > fiveMinutesAgo
      })

      // Generate notifications for recent orders
      recentOrders.forEach((order) => {
        const existingNotification = notifications.find((n) => n.type === "order" && n.relatedId === order.id)

        if (!existingNotification) {
          createNotification({
            type: "order",
            title: "New Order Received",
            message: `Table ${order.table_number} has placed a new order (#${order.id})`,
            priority: "high",
            relatedId: order.id,
          })
        }
      })

      // Find orders with status changes
      orders.forEach((order) => {
        const existingNotifications = notifications.filter((n) => n.type === "order" && n.relatedId === order.id)

        // If we already have a notification for this order but with a different status
        const statusNotification = existingNotifications.find(
          (n) => n.message.includes(order.status) || (order.status === "pending" && n.title === "New Order Received"),
        )

        if (!statusNotification && order.status !== "pending") {
          let title = ""
          let message = ""
          let priority: NotificationPriority = "medium"

          switch (order.status) {
            case "preparing":
              title = "Order Being Prepared"
              message = `Order #${order.id} for Table ${order.table_number} is now being prepared`
              priority = "medium"
              break
            case "ready":
              title = "Order Ready to Serve"
              message = `Order #${order.id} for Table ${order.table_number} is ready to be served`
              priority = "high"
              break
            case "served":
              title = "Order Served"
              message = `Order #${order.id} for Table ${order.table_number} has been served`
              priority = "low"
              break
          }

          if (title && message) {
            createNotification({
              type: "order",
              title,
              message,
              priority,
              relatedId: order.id,
            })
          }
        }
      })
    },
    [createNotification, notifications],
  )

  // Process staff to generate notifications
  const processStaffForNotifications = useCallback(
    (staff: any[]) => {
      // Find staff with low performance
      const lowPerformingStaff = staff.filter((s) => s.performance < 60)

      lowPerformingStaff.forEach((s) => {
        const existingNotification = notifications.find(
          (n) => n.type === "staff" && n.relatedId === s.id && n.message.includes("low performance"),
        )

        if (!existingNotification) {
          let priority: NotificationPriority = "medium"

          if (s.performance < 50) {
            priority = "high"
          }

          createNotification({
            type: "staff",
            title: "Staff Performance Alert",
            message: `${s.name} has low performance (${s.performance}%)`,
            priority,
            relatedId: s.id,
          })
        }
      })

      // Find staff with status changes
      staff.forEach((s) => {
        const existingStatusNotification = notifications.find(
          (n) => n.type === "staff" && n.relatedId === s.id && n.message.includes(s.status),
        )

        if (!existingStatusNotification && s.status === "on_shift") {
          createNotification({
            type: "staff",
            title: "Staff Status Update",
            message: `${s.name} is now on shift`,
            priority: "low",
            relatedId: s.id,
          })
        }
      })
    },
    [createNotification, notifications],
  )

  // Process inventory to generate notifications
  const processInventoryForNotifications = useCallback(
    (inventory: any[]) => {
      // Find low stock items
      const lowStockItems = inventory.filter((item) => item.quantity <= item.threshold)

      lowStockItems.forEach((item) => {
        const existingNotification = notifications.find((n) => n.type === "inventory" && n.relatedId === item.id)

        if (!existingNotification) {
          let priority: NotificationPriority = "medium"
          let message = `${item.name} is running low (${item.quantity} left)`

          if (item.quantity === 0) {
            priority = "high"
            message = `${item.name} is out of stock!`
          }

          createNotification({
            type: "inventory",
            title: "Inventory Alert",
            message,
            priority,
            relatedId: item.id,
          })
        }
      })
    },
    [createNotification, notifications],
  )

  // Process tables to generate notifications
  const processTablesForNotifications = useCallback(
    (tables: any[]) => {
      // Find tables with bookings or status changes
      tables.forEach((table) => {
        // Check for status changes
        if (table.status) {
          const existingStatusNotification = notifications.find(
            (n) =>
              n.type === "booking" &&
              n.relatedId === table.id &&
              n.message.includes(`Table ${table.number} status changed to`),
          )

          if (!existingStatusNotification) {
            let priority: NotificationPriority = "medium"

            // Different priorities based on status
            if (table.status === "reserved") {
              priority = "high"
              createNotification({
                type: "booking",
                title: "Table Status Update",
                message: `Table ${table.number} status changed to ${table.status}`,
                priority,
                relatedId: table.id,
              })

              // Also create an order notification for reserved tables
              createNotification({
                type: "order",
                title: "New Order Expected",
                message: `Table ${table.number} has been reserved - prepare for new order`,
                priority: "medium",
                relatedId: table.id,
              })
            } else if (table.status === "occupied") {
              priority = "medium"
              createNotification({
                type: "booking",
                title: "Table Status Update",
                message: `Table ${table.number} status changed to ${table.status}`,
                priority,
                relatedId: table.id,
              })
            } else if (table.status === "available") {
              priority = "low"
              createNotification({
                type: "booking",
                title: "Table Status Update",
                message: `Table ${table.number} is now available`,
                priority,
                relatedId: table.id,
              })
            }
          }
        }

        // Process bookings
        if (table.booking) {
          const bookingTime = new Date(table.booking.bookingTime)
          const now = new Date()

          // If booking is within the next 30 minutes
          const thirtyMinutesFromNow = new Date(now.getTime() + 30 * 60 * 1000)

          if (bookingTime > now && bookingTime < thirtyMinutesFromNow) {
            const existingNotification = notifications.find(
              (n) => n.type === "booking" && n.relatedId === table.id && n.message.includes("upcoming reservation"),
            )

            if (!existingNotification) {
              createNotification({
                type: "booking",
                title: "Upcoming Reservation",
                message: `Table ${table.number} has an upcoming reservation for ${table.booking.customerName} at ${new Date(table.booking.bookingTime).toLocaleTimeString()}`,
                priority: "medium",
                relatedId: table.id,
              })
            }
          }

          // Also notify when a new booking is made (within the last 5 minutes)
          const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000)
          const bookingCreatedTime = new Date(table.booking.createdAt || table.booking.bookingTime)

          if (bookingCreatedTime > fiveMinutesAgo) {
            const existingNewBookingNotification = notifications.find(
              (n) => n.type === "booking" && n.relatedId === table.id && n.message.includes("new booking"),
            )

            if (!existingNewBookingNotification) {
              createNotification({
                type: "booking",
                title: "New Table Booking",
                message: `New booking for Table ${table.number} by ${table.booking.customerName} at ${new Date(table.booking.bookingTime).toLocaleTimeString()}`,
                priority: "high",
                relatedId: table.id,
              })

              // Also create an order notification for new bookings
              createNotification({
                type: "order",
                title: "Prepare for New Order",
                message: `Table ${table.number} has been booked - expect new order at ${new Date(table.booking.bookingTime).toLocaleTimeString()}`,
                priority: "medium",
                relatedId: table.id,
              })
            }
          }
        }
      })
    },
    [createNotification, notifications],
  )

  // Helper functions for notification UI
  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case "order":
        return <ShoppingBag className="h-5 w-5" />
      case "booking":
        return <Calendar className="h-5 w-5" />
      case "staff":
        return <Users className="h-5 w-5" />
      case "inventory":
        return <Package2 className="h-5 w-5" />
      default:
        return <Bell className="h-5 w-5" />
    }
  }

  const getNotificationColor = (type: NotificationType, priority: string) => {
    if (priority === "high") return "bg-red-100 text-red-600"

    switch (type) {
      case "order":
        return "bg-orange-100 text-orange-600"
      case "booking":
        return "bg-blue-100 text-blue-600"
      case "staff":
        return "bg-purple-100 text-purple-600"
      case "inventory":
        return "bg-yellow-100 text-yellow-600"
      default:
        return "bg-gray-100 text-gray-600"
    }
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMins / 60)
    const diffDays = Math.floor(diffHours / 24)

    if (diffMins < 1) return "Just now"
    if (diffMins < 60) return `${diffMins} min ago`
    if (diffHours < 24) return `${diffHours} hr ago`
    if (diffDays === 1) return "Yesterday"
    return date.toLocaleDateString()
  }

  const lowStockItems = inventory.filter((item) => item.quantity <= item.threshold)

  // Process top orders data
  const topOrdersData = orders
    .slice(0, 10)
    .sort((a, b) => b.total_price - a.total_price)
    .map((order) => {
      const mainItem = order.items && order.items.length > 0 ? order.items[0] : null
      return {
        id: String(order.id).substring(0, Math.min(String(order.id).length, 8)),
        total: order.total_price,
        table: order.table_number,
        time: new Date(order.timestamp).toLocaleTimeString(),
        itemName: mainItem ? mainItem.name : "No items",
        itemPrice: mainItem ? mainItem.price : 0,
      }
    })

  // Process line chart data for orders over time
  const orderTimeData = orders.reduce(
    (acc, order) => {
      const date = new Date(order.timestamp)
      const hour = date.getHours()

      if (!acc[hour]) {
        acc[hour] = { hour: `${hour}:00`, count: 0, revenue: 0 }
      }
      acc[hour].count += 1
      acc[hour].revenue += order.total_price
      return acc
    },
    {} as Record<number, { hour: string; count: number; revenue: number }>,
  )

  const lineChartData = Object.values(orderTimeData).sort((a, b) => {
    const hourA = Number.parseInt(a.hour.split(":")[0])
    const hourB = Number.parseInt(b.hour.split(":")[0])
    return hourA - hourB
  })

  // Add a function to reset notifications:
  const resetNotifications = useCallback(() => {
    setNotifications([])
    setUnreadCount(0)
  }, [])

  if (loading) {
    return (
      <Layout>
        <div className="flex flex-col gap-6 p-6">
          <div className="flex justify-between items-center">
            <div className="space-y-2">
              <div className="animate-pulse bg-muted rounded-md h-8 w-[200px]" />
              <div className="animate-pulse bg-muted rounded-md h-4 w-[300px]" />
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {Array(2)
              .fill(0)
              .map((_, i) => (
                <Card key={i} className="animate-pulse">
                  <CardHeader>
                    <div className="animate-pulse bg-muted rounded-md h-6 w-[140px]" />
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {Array(3)
                        .fill(0)
                        .map((_, j) => (
                          <div key={j} className="animate-pulse bg-muted rounded-md h-16 w-full" />
                        ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="flex flex-col gap-6 p-6 bg-gradient-to-b from-white to-gray-50">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Dashboard
            </h1>
            <p className="text-gray-500 mt-1">Welcome back to your dashboard</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {/* <Button
              variant="outline"
              className="border-red-500 text-red-600 hover:bg-red-50 transition-all duration-300 shadow-sm hover:shadow-md relative"
            >
              <Users className="mr-2 h-4 w-4" />
              Staff Performance
              {lowPerformanceCount > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-red-500 text-white h-5 w-5 flex items-center justify-center p-0 text-xs">
                  {lowPerformanceCount}
                </Badge>
              )}
            </Button> */}

            {/* <Button
              variant="outline"
              className="border-orange-500 text-orange-600 hover:bg-orange-50 transition-all duration-300 shadow-sm hover:shadow-md relative"
            >
              <ShoppingBag className="mr-2 h-4 w-4" />
              New Orders
              {newOrdersCount > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-orange-500 text-white h-5 w-5 flex items-center justify-center p-0 text-xs">
                  {newOrdersCount}
                </Badge>
              )}
            </Button> */}

            {/* <Button
              variant="outline"
              className="border-blue-500 text-blue-600 hover:bg-blue-50 transition-all duration-300 shadow-sm hover:shadow-md relative"
            >
              <Calendar className="mr-2 h-4 w-4" />
              Bookings
              {newBookingsCount > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-blue-500 text-white h-5 w-5 flex items-center justify-center p-0 text-xs">
                  {newBookingsCount}
                </Badge>
              )}
            </Button> */}

            <Dialog open={showNotifications} onOpenChange={setShowNotifications}>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="border-orange-300 text-orange-600 hover:bg-orange-50 transition-all duration-300 shadow-sm hover:shadow-md relative"
                  onClick={() => setShowNotifications(true)}
                >
                  <Bell className="mr-2 h-4 w-4" />
                 
                  {unreadCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 bg-orange-500 text-white h-5 w-5 flex items-center justify-center p-0 text-xs">
                      {unreadCount}
                    </Badge>
                  )}
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader className="flex flex-row items-center justify-between">
                  <DialogTitle>Notifications</DialogTitle>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={resetNotifications}>
                      Reset All
                    </Button>
                    <Button variant="ghost" size="sm" onClick={markAllAsRead} disabled={unreadCount === 0}>
                      Mark all as read
                    </Button>
                  </div>
                </DialogHeader>
                <ScrollArea className="mt-2 max-h-[60vh]">
                  <div className="space-y-4 pr-4">
                    {notifications.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                        <Bell className="h-12 w-12 mx-auto mb-2 text-gray-400" />
                        <p>No notifications</p>
                      </div>
                    ) : (
                      notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-4 rounded-lg border ${notification.read ? "bg-white" : "bg-purple-50 border-purple-200"} relative`}
                        >
                          <div className="flex items-start gap-3">
                            <div
                              className={`p-2 rounded-full ${getNotificationColor(notification.type, notification.priority)}`}
                            >
                              {getNotificationIcon(notification.type)}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-900">{notification.title}</h4>
                              <p className="text-sm text-gray-600">{notification.message}</p>
                              <p className="text-xs text-gray-500 mt-1">{formatTimestamp(notification.timestamp)}</p>
                            </div>
                            {!notification.read && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0 rounded-full"
                                onClick={() => markAsRead(notification.id)}
                              >
                                <Eye className="h-4 w-4" />
                                <span className="sr-only">Mark as read</span>
                              </Button>
                            )}
                          </div>
                          {!notification.read && (
                            <div className="absolute top-4 right-4 h-2 w-2 rounded-full bg-purple-500" />
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </ScrollArea>
              </DialogContent>
            </Dialog>

            
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-6">
          <Card className="hover:shadow-lg transition-all duration-300 bg-white/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              <ShoppingBag className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{orders.length}</div>
              <p className="text-xs text-green-600 flex items-center gap-1">
                <span className="flex h-2 w-2 rounded-full bg-green-500" />+{Math.floor(Math.random() * 10)}% from last
                month
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 bg-white/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                ฿{orders.reduce((sum, order) => sum + (order.total_price || 0), 0).toFixed(2)}
              </div>
              <p className="text-xs text-green-600 flex items-center gap-1">
                <span className="flex h-2 w-2 rounded-full bg-green-500" />+{Math.floor(Math.random() * 15)}% from last
                month
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 bg-white/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
              <Package2 className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{lowStockItems.length}</div>
              <p className="text-xs">
                {lowStockItems.length > 0 ? (
                  <span className="text-orange-500 flex items-center gap-1">
                    <AlertTriangle className="h-3 w-3" />
                    Requires attention
                  </span>
                ) : (
                  <span className="text-green-600 flex items-center gap-1">
                    <span className="flex h-2 w-2 rounded-full bg-green-500" />
                    All stock levels normal
                  </span>
                )}
              </p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 bg-white/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">New Orders Today</CardTitle>
              <ShoppingBag className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{newOrdersCount}</div>
              <p className="text-xs text-orange-600 flex items-center gap-1">
                <span className="flex h-2 w-2 rounded-full bg-orange-500" />
                Requires attention
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="hover:shadow-lg transition-all duration-300 bg-white/50 backdrop-blur-sm">
            <CardHeader className="flex items-center justify-between">
              <CardTitle className="text-xl font-semibold flex items-center gap-2 bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
                <ShoppingBag className="h-5 w-5 text-orange-500" />
                Sales Performance
              </CardTitle>
              
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  {lineChartData.length > 0 ? (
                    <RechartsLineChart data={lineChartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="hour" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis
                        stroke="#888888"
                        fontSize={12}
                        tickLine={false}
                        axisLine={false}
                        tickFormatter={(value) => `฿${value}`}
                      />
                      <Tooltip
                        formatter={(value: number) => [`฿${value}`, "Revenue"]}
                        labelFormatter={(label) => `Time: ${label}`}
                      />
                      <Line
                        type="monotone"
                        dataKey="revenue"
                        stroke="#f77700"
                        strokeWidth={2}
                        dot={{ r: 4, fill: "#f77700", strokeWidth: 0 }}
                        activeDot={{ r: 6, fill: "#f77700", strokeWidth: 0 }}
                      />
                    </RechartsLineChart>
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <p className="text-gray-500">No order data available</p>
                    </div>
                  )}
                </ResponsiveContainer>
              </div>
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-500 mb-2">Top Selling Items</h4>
                <div className="space-y-2">
                  {topOrdersData.slice(0, 5).map((order, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 rounded-lg bg-gray-50 hover:bg-gray-100"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-medium">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-medium text-sm">{order.itemName}</p>
                          <p className="text-xs text-gray-500">
                            Table {order.table} • {order.time}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-orange-600">฿{order.itemPrice?.toFixed(2) || "0.00"}</p>
                        <p className="text-xs text-gray-500">Total: ฿{order.total.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-all duration-300 bg-white/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl font-semibold flex items-center gap-2 bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
                <Package2 className="h-5 w-5 text-orange-500" />
                Low Stock Items
              </CardTitle>
              <CardDescription>Items that need to be restocked soon</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px]">
                <div className="space-y-4">
                  {lowStockItems.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-8 text-gray-500">
                      <Package2 className="h-12 w-12 mb-2 text-gray-400" />
                      <p className="text-sm">All stock levels are normal</p>
                    </div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Item Name</TableHead>
                          <TableHead className="text-right">Current Stock</TableHead>
                          <TableHead className="text-right">Threshold</TableHead>
                          <TableHead className="text-right">Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {lowStockItems.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell className="font-medium">{item.name}</TableCell>
                            <TableCell className="text-right">{item.quantity}</TableCell>
                            <TableCell className="text-right">{item.threshold}</TableCell>
                            <TableCell className="text-right">
                              <Badge
                                variant="secondary"
                                className={
                                  item.quantity === 0 ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800"
                                }
                              >
                                {item.quantity === 0 ? "Out of Stock" : "Low Stock"}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  )
}

function uuidv4(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}










