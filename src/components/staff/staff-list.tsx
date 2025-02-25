
"use client"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"
import { AnimatePresence, motion } from "framer-motion"
import { AlertTriangle, Bell, Calendar, Filter, Plus, Search, TrendingUp, UserCheck, Users } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { StaffCard } from "./staff-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu"
import { Badge } from "@/src/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/src/components/ui/tabs"
interface StaffMember {
  id: number
  name: string
  email: string
  phone: string
  position: string
  service_period: string
  status: string
  image_url: string
  education: string
 
  performance: number
  error_count: number
}



// export function StaffList() {
//   const [staffMembers, setStaffMembers] = useState<StaffMember[]>([])
//   const [expandedStaff, setExpandedStaff] = useState<number | null>(null)
//   const [searchQuery, setSearchQuery] = useState("")
//   const [positionFilter, setPositionFilter] = useState("All")
//   const [isLoading, setIsLoading] = useState(true)

//   useEffect(() => {
//     async function fetchStaff() {
//       try {
//         const response = await fetch("/api/staff")
//         if (!response.ok) {
//           throw new Error("Failed to fetch staff")
//         }
//         const data = await response.json()
//         setStaffMembers(data)
//       } catch (error) {
//         console.error("Error fetching staff:", error)
//       } finally {
//         setIsLoading(false)
//       }
//     }

//     fetchStaff()
//   }, [])

//   const filteredStaff = staffMembers.filter((staff) => {
//     const matchesSearch =
//       staff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       staff.email.toLowerCase().includes(searchQuery.toLowerCase())
//     const matchesPosition = positionFilter === "All" || staff.position === positionFilter
//     return matchesSearch && matchesPosition
//   })

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center h-[50vh]">
//         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
//       </div>
//     )
//   }

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       className="flex flex-col gap-6"
//     >
//       <div className="flex items-center justify-between">
//         <h1 className="text-2xl font-bold">Staff</h1>
//         <div className="flex items-center gap-4">
//           <Button variant="ghost" size="icon">
//             <Bell className="h-5 w-5" />
//           </Button>
//           <Link href="/staff/new">
//             <Button className="bg-[#f77700] hover:bg-[#f77700]/90">
//               <Plus className="mr-2 h-4 w-4" />
//               Add New Staff
//             </Button>
//           </Link>
//         </div>
//       </div>

//       <div className="flex flex-col sm:flex-row gap-4">
//         <div className="relative flex-1">
//           <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
//           <Input
//             type="search"
//             placeholder="Search..."
//             className="pl-8 w-full"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//         </div>
//         <Select value={positionFilter} onValueChange={setPositionFilter}>
//           <SelectTrigger className="w-[180px]">
//             <SelectValue placeholder="Position: All" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="All">All</SelectItem>
//             <SelectItem value="waiter">Waiter</SelectItem>
//             <SelectItem value="cashier">Cashier</SelectItem>
//             <SelectItem value="bartender">Bartender</SelectItem>
//             <SelectItem value="chef">Chef</SelectItem>
//           </SelectContent>
//         </Select>
//       </div>

//       <motion.div
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.5, delay: 0.2 }}
//         className="rounded-lg border bg-card"
//       >
//         <div className="grid grid-cols-[1fr_1.5fr_1fr_1fr_1fr] gap-4 border-b bg-muted/50 p-4 text-sm font-medium text-muted-foreground">
//           <div>Name</div>
//           <div>Contacts</div>
//           <div>Position</div>
//           <div>Status</div>
//         </div>
//         <AnimatePresence>
//           {filteredStaff.map((staff) => (
//             <motion.div
//               key={staff.id}
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               transition={{ duration: 0.2 }}
//             >
//               <StaffCard
//                 staff={staff}
//                 isExpanded={expandedStaff === staff.id}
//                 onToggle={() => setExpandedStaff(expandedStaff === staff.id ? null : staff.id)}
//                 onUpdate={() => setExpandedStaff(expandedStaff === staff.id ? null : staff.id)}

//               />
//             </motion.div>
//           ))}
//         </AnimatePresence>
//       </motion.div>
//     </motion.div>
//   )
// }
export function StaffList() {
  const [staffMembers, setStaffMembers] = useState<StaffMember[]>([])
  const [expandedStaff, setExpandedStaff] = useState<number | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [positionFilter, setPositionFilter] = useState("All")
  const [isLoading, setIsLoading] = useState(true)
  const [view, setView] = useState("grid")

  useEffect(() => {
    async function fetchStaff() {
      try {
        const response = await fetch("/api/staff")
        if (!response.ok) {
          throw new Error("Failed to fetch staff")
        }
        const data = await response.json()
        setStaffMembers(data)
      } catch (error) {
        console.error("Error fetching staff:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchStaff()
  }, [])

  const filteredStaff = staffMembers.filter((staff) => {
    const matchesSearch =
      staff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staff.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesPosition = positionFilter === "All" || staff.position === positionFilter
    return matchesSearch && matchesPosition
  })

  const activeStaff = staffMembers.filter((staff) => staff.status === "on_shift").length
  const averagePerformance = staffMembers.reduce((acc, staff) => acc + staff.performance, 0) / staffMembers.length
  const lowPerformers = staffMembers.filter((staff) => staff.performance < 60).length

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col gap-6 p-6"
    >
      {/* Header Section */}
      <div className="bg-gradient-to-r bg-white/50 p-8 rounded-xl shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-orange-800">
              Staff Management
            </h1>
            <p className="text-muted-foreground mt-1">Manage and monitor your team's performance</p>
          </div>
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                 
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-[280px]">
                <DropdownMenuItem>
                  <span className="font-medium">New shift request</span> from John Doe
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span className="font-medium">Performance alert:</span> 2 staff members below target
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span className="font-medium">Schedule update:</span> Weekend rotation changed
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Link href="/staff/new">
              <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white border-0">
                <Plus className="mr-2 h-4 w-4" />
                Add New Staff
              </Button>
            </Link>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-white/50 dark:bg-gray-950/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Staff</CardTitle>
              <Users className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{staffMembers.length}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Across {new Set(staffMembers.map((s) => s.position)).size} positions
              </p>
            </CardContent>
          </Card>
          <Card className="bg-white/50 dark:bg-gray-950/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Now</CardTitle>
              <UserCheck className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeStaff}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {((activeStaff / staffMembers.length) * 100).toFixed(1)}% of total staff
              </p>
            </CardContent>
          </Card>
          <Card className="bg-white/50 dark:bg-gray-950/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Avg Performance</CardTitle>
              <TrendingUp className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{averagePerformance.toFixed(1)}%</div>
              <p className="text-xs text-muted-foreground mt-1">
                {averagePerformance > 70 ? "Above target" : "Below target"}
              </p>
            </CardContent>
          </Card>
          <Card className="bg-white/50 dark:bg-gray-950/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Needs Attention</CardTitle>
              <AlertTriangle className="h-4 w-4 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{lowPerformers}</div>
              <p className="text-xs text-muted-foreground mt-1">Staff with performance below 60%</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Filters and View Options */}
      <div className="flex flex-col sm:flex-row gap-4 bg-white/50 dark:bg-gray-950 p-4 rounded-xl shadow-sm border">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Search by name or email..."
            className="pl-8 w-full bg-white/50 focus-visible:ring-orange-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Select value={positionFilter} onValueChange={setPositionFilter}>
            <SelectTrigger className="w-[180px] bg-white/50">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="All Positions" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All Positions</SelectItem>
              <SelectItem value="supervisor">Supervisor</SelectItem>
              <SelectItem value="head-chef">Head Chef</SelectItem>
              <SelectItem value="waiter">Waiter</SelectItem>
              <SelectItem value="cashier">Cashier</SelectItem>
              <SelectItem value="bartender">Bartender</SelectItem>
              <SelectItem value="chef">Chef</SelectItem>

            </SelectContent>
          </Select>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className=" bg-white/50">
                <Calendar className="w-4 h-4 mr-2" />
                This Week
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>This Week</DropdownMenuItem>
              <DropdownMenuItem>This Month</DropdownMenuItem>
              <DropdownMenuItem>Last 3 Months</DropdownMenuItem>
              <DropdownMenuItem>Custom Range</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* View Toggle */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-orange-50 dark:bg-orange-950/50">
            {filteredStaff.length} staff members
          </Badge>
          {positionFilter !== "All" && (
            <Badge variant="outline" className="bg-orange-50 dark:bg-orange-950/50">
              Position: {positionFilter}
            </Badge>
          )}
        </div>
        
      </div>

      {/* Staff List */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="rounded-xl border bg-card shadow-sm overflow-hidden"
      >
        <div className="grid grid-cols-[1fr_1.5fr_1fr_1fr_1fr] gap-4 border-b bg-orange-50/50 dark:bg-orange-950/20 p-4 text-sm font-medium text-muted-foreground">
          <div>Name</div>
          <div>Contacts</div>
          <div>Position</div>
          <div>Status</div>
        </div>
        <AnimatePresence>
          {filteredStaff.map((staff) => (
            <motion.div
              key={staff.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <StaffCard
                staff={staff}
                isExpanded={expandedStaff === staff.id}
                onToggle={() => setExpandedStaff(expandedStaff === staff.id ? null : staff.id)}
                onUpdate={() => setExpandedStaff(expandedStaff === staff.id ? null : staff.id)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}



