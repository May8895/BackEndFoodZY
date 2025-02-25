// import { Alerts } from "@/src/components/dashboard/alerts"
// import { Layout } from "@/src/components/layout"
// import { StatsCards } from "@/src/components/stats-cards"
// import { Button } from "@/src/components/ui/button"
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/src/components/ui/dropdown-menu"
// import { Grid } from "lucide-react"


// export default function DashboardPage() {
//   return (
//     <Layout>
//       <div className="flex flex-col gap-6 p-6">
//         <div className="flex justify-between items-center">
//           <div>
//             <h1 className="text-3xl font-bold">Dashboard</h1>
//             <p className="text-gray-500">Welcome back to your dashboard</p>
//           </div>
//           <div className="flex flex-wrap gap-2">
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button variant="outline" className="border-green-500 text-green-600 hover:bg-green-50">
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
//         <StatsCards />
//         {/* <div className="grid gap-6 md:grid-cols-2"> */}
//         <Alerts />
//         {/* </WeeklyRevenueChart> */}
//         {/* </div> */}
//       </div>
//     </Layout >
//   )
// }

// "use client"

// import { Layout } from "@/src/components/layout"
// import { Button } from "@/src/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/src/components/ui/dropdown-menu"
// import { AlertTriangle, DollarSign, Grid, Package2, ShoppingBag, Users, Star, Clock } from "lucide-react"
// import { useEffect, useState } from "react"
// import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
// import { Badge } from "@/src/components/ui/badge"
// import { ScrollArea } from "@/src/components/ui/scroll-area"

// interface Order {
//   id: string
//   total_price: number
//   timestamp: string
//   status: string
//   staff_id: string
// }

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

// export default function DashboardPage() {
//   const [orders, setOrders] = useState<Order[]>([])
//   const [staff, setStaff] = useState<StaffMember[]>([])
//   const [inventory, setInventory] = useState<InventoryItem[]>([])
//   const [loading, setLoading] = useState(true)

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

//   // Calculate metrics
//   const totalOrders = orders.length
//   const totalRevenue = orders.reduce((sum, order) => sum + order.total_price, 0)
//   const lowStockItems = inventory.filter((item) => item.quantity <= item.threshold)
//   const activeStaff = staff.filter((member) => member.status === "on_shift")

//   // Process weekly revenue data
//   const weeklyRevenueData = orders.reduce(
//     (acc, order) => {
//       const date = new Date(order.timestamp)
//       const day = date.toLocaleDateString("en-US", { weekday: "short" })

//       if (!acc[day]) {
//         acc[day] = { name: day, total: 0 }
//       }
//       acc[day].total += order.total_price
//       return acc
//     },
//     {} as Record<string, { name: string; total: number }>,
//   )

//   const chartData = Object.values(weeklyRevenueData)

//   const getPerformanceColor = (score: number) => {
//     if (score >= 90) return "text-green-500"
//     if (score >= 70) return "text-blue-500"
//     if (score >= 50) return "text-yellow-500"
//     return "text-red-500"
//   }

//   const formatTime = (dateString?: string) => {
//     if (!dateString) return 
//     return new Date(dateString).toLocaleTimeString("en-US", {
//       hour: "2-digit",
//       minute: "2-digit",
//     })
//   }

//   return (
//     <Layout>
//       <div className="flex flex-col gap-6 p-6">
//         <div className="flex justify-between items-center">
//           <div>
//             <h1 className="text-3xl font-bold">Dashboard</h1>
//             <p className="text-gray-500">Welcome back to your dashboard</p>
//           </div>
//           <div className="flex flex-wrap gap-2">
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button variant="outline" className="border-green-500 text-green-600 hover:bg-green-50">
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

//         <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
//           <Card>
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
//               <ShoppingBag className="h-4 w-4 text-muted-foreground" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">{totalOrders}</div>
//               <p className="text-xs text-muted-foreground">+{Math.floor(Math.random() * 10)}% from last month</p>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
//               <DollarSign className="h-4 w-4 text-muted-foreground" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">฿{totalRevenue.toFixed(2)}</div>
//               <p className="text-xs text-muted-foreground">+{Math.floor(Math.random() * 15)}% from last month</p>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">Low Stock Items</CardTitle>
//               <Package2 className="h-4 w-4 text-muted-foreground" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">{lowStockItems.length}</div>
//               <p className="text-xs text-muted-foreground">
//                 {lowStockItems.length > 0 ? (
//                   <span className="text-orange-500 flex items-center gap-1">
//                     <AlertTriangle className="h-3 w-3" />
//                     Requires attention
//                   </span>
//                 ) : (
//                   "All stock levels normal"
//                 )}
//               </p>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//               <CardTitle className="text-sm font-medium">Active Staff</CardTitle>
//               <Users className="h-4 w-4 text-muted-foreground" />
//             </CardHeader>
//             <CardContent>
//               <div className="text-2xl font-bold">{activeStaff.length}</div>
//               <p className="text-xs text-muted-foreground">
//                 {activeStaff.length} of {staff.length} on shift
//               </p>
//             </CardContent>
//           </Card>
//         </div>

//         <div className="grid gap-6 md:grid-cols-2">
//           <Card>
//             <CardHeader>
//               <CardTitle>Weekly Revenue</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="h-[300px]">
//                 <ResponsiveContainer width="100%" height="100%">
//                   <BarChart data={chartData}>
//                     <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
//                     <YAxis
//                       stroke="#888888"
//                       fontSize={12}
//                       tickLine={false}
//                       axisLine={false}
//                       tickFormatter={(value) => `฿${value}`}
//                     />
//                     <Tooltip
//                       formatter={(value: number) => [`฿${value}`, "Revenue"]}
//                       cursor={{ fill: "rgba(0, 0, 0, 0.1)" }}
//                     />
//                     <Bar dataKey="total" fill="#f77700" radius={[4, 4, 0, 0]} />
//                   </BarChart>
//                 </ResponsiveContainer>
//               </div>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardHeader>
//               <CardTitle>Staff Performance</CardTitle>
//             </CardHeader>
//             <CardContent>
//               <ScrollArea className="h-[300px] pr-4">
//                 <div className="space-y-6">
//                   {staff.map((member) => (
//                     <div key={member.id} className="space-y-2">
//                       <div className="flex items-center justify-between">
//                         <div className="flex items-center gap-2">
//                           <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
//                             {member.avatar_url ? (
//                               <img
//                                 src={member.avatar_url || "/placeholder.svg"}
//                                 alt={member.name}
//                                 className="w-8 h-8 rounded-full"
//                               />
//                             ) : (
//                               <Users className="w-4 h-4 text-muted-foreground" />
//                             )}
//                           </div>
//                           <div>
//                             <p className="font-medium">{member.name}</p>
//                             <div className="flex items-center gap-2">
//                               <Badge
//                                 variant={member.status === "on_shift" ? "default" : "secondary"}
//                                 className="text-xs"
//                               >
//                                 {member.status === "on_shift" ? "On Shift" : "Off Shift"}
//                               </Badge>
//                               {member.status === "on_shift" && (
//                                 <span className="text-xs text-muted-foreground flex items-center gap-1">
//                                   <Clock className="w-3 h-3" />
//                                   {formatTime(member.shift_start)}
//                                 </span>
//                               )}
//                             </div>
//                           </div>
//                         </div>
//                         <div className="text-right">
//                           <p className={`text-lg font-bold ${getPerformanceColor(member.performance_score)}`}>
//                             {member.performance_score}%
//                           </p>
                          
//                         </div>
//                       </div>
//                       <div className="space-y-1">
//                         <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
//                           <div
//                             className="h-full transition-all duration-500 ease-in-out"
//                             style={{
//                               width: `${member.performance_score}%`,
//                               backgroundColor:
//                                 member.performance_score >= 90
//                                   ? "#22c55e"
//                                   : member.performance_score >= 70
//                                     ? "#3b82f6"
//                                     : member.performance_score >= 50
//                                       ? "#eab308"
//                                       : "#ef4444",
//                             }}
//                           />
//                         </div>
//                         <div className="flex justify-between text-xs text-muted-foreground">
//                           <span>{member.orders_completed} orders completed</span>
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

"use client"

import { useEffect, useState } from "react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts"
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
} from "lucide-react"
import Image from "next/image"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/src/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"
import { Input } from "@/src/components/ui/input"
import { Badge } from "@/src/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/src/components/ui/dropdown-menu"
import { Layout } from "@/src/components/layout"

interface StaffMember {
  id: string
  name: string
  status: "on_shift" | "off_shift"
  performance_score: number
  avatar_url?: string
  orders_completed: number
  average_rating: number
  shift_start?: string
}

interface InventoryItem {
  id: string
  name: string
  quantity: number
  threshold: number
}

interface Order {
  id: string
  total_price: number
  timestamp: string
}

export default function DashboardPage() {
  const [staff, setStaff] = useState<StaffMember[]>([])
  const [inventory, setInventory] = useState<InventoryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [orders, setOrders] = useState<Order[]>([])

  useEffect(() => {
    Promise.all([
      fetch("/api/orders").then((res) => res.json()),
      fetch("/api/staff").then((res) => res.json()),
      fetch("/api/inventory").then((res) => res.json()),
    ])
      .then(([ordersData, staffData, inventoryData]) => {
        setOrders(ordersData)
        setStaff(staffData)
        setInventory(inventoryData)
        setLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching dashboard data:", error)
        setLoading(false)
      })
  }, [])

  const lowStockItems = inventory.filter((item) => item.quantity <= item.threshold)
  const activeStaff = staff.filter((member) => member.status === "on_shift")

  const getPerformanceColor = (score: number) => {
    if (score >= 90) return "text-green-500"
    if (score >= 70) return "text-blue-500"
    if (score >= 50) return "text-yellow-500"
    return "text-red-500"
  }


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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="border-green-500 text-green-600 hover:bg-green-50 transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  <Grid className="mr-2 h-4 w-4" />
                  Line Official
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem>Rich Menu</DropdownMenuItem>
                <DropdownMenuItem>Coupon</DropdownMenuItem>
                <DropdownMenuItem>Reward Card</DropdownMenuItem>
                <DropdownMenuItem>Auto-Response</DropdownMenuItem>
                <DropdownMenuItem>Edit Profile</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
              <CardTitle className="text-sm font-medium">Active Staff</CardTitle>
              <Users className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{activeStaff.length}</div>
              <p className="text-xs text-orange-600 flex items-center gap-1">
                <span className="flex h-2 w-2 rounded-full bg-orange-500" />
                {activeStaff.length} of {staff.length} on shift
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
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

          <Card className="hover:shadow-lg transition-all duration-300 bg-white/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-xl font-semibold flex items-center gap-2 bg-gradient-to-r from-orange-600 to-orange-400 bg-clip-text text-transparent">
                <Users className="h-5 w-5 text-orange-500" />
                Staff Performance
              </CardTitle>
              <CardDescription>Current staff status and performance metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-6">
                  {staff.map((member) => (
                    <div
                      key={member.id}
                      className="space-y-2 p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200 border border-gray-100"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-md">
                            {member.avatar_url ? (
                              <img
                                src={member.avatar_url || "/placeholder.svg"}
                                alt={member.name}
                                className="w-12 h-12 rounded-full object-cover"
                              />
                            ) : (
                              <Users className="w-6 h-6 text-white" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{member.name}</p>
                            <div className="flex items-center gap-2">
                              <Badge
                                variant={member.status === "on_shift" ? "default" : "secondary"}
                                className={`text-xs ${
                                  member.status === "on_shift"
                                    ? "bg-green-100 text-green-800 hover:bg-green-200"
                                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                                }`}
                              >
                                {member.status === "on_shift" ? "On Shift" : "Off Shift"}
                              </Badge>
                              {member.status === "on_shift" && (
                                <span className="text-xs text-gray-500 flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`text-lg font-bold ${getPerformanceColor(member.performance_score)}`}>
                            {member.performance_score}%
                          </p>
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            {member.average_rating?.toFixed(1) }
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className="h-full transition-all duration-500 ease-in-out"
                            style={{
                              width: `${member.performance_score}%`,
                              background: `linear-gradient(90deg, 
                                ${
                                  member.performance_score >= 90
                                    ? "#22c55e"
                                    : member.performance_score >= 70
                                      ? "#3b82f6"
                                      : member.performance_score >= 50
                                        ? "#eab308"
                                        : "#ef4444"
                                } 0%,
                                ${
                                  member.performance_score >= 90
                                    ? "#16a34a"
                                    : member.performance_score >= 70
                                      ? "#2563eb"
                                      : member.performance_score >= 50
                                        ? "#d97706"
                                        : "#dc2626"
                                } 100%)`,
                            }}
                          />
                        </div>
                        <div className="flex justify-between text-xs text-gray-500">
                          <span className="font-medium">{member.orders_completed} orders completed</span>
                          <span>Target: 50 orders</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  )
}










