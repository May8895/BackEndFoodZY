

"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { Progress } from "@/src/components/ui/progress"
import { AnimatePresence, motion } from "framer-motion"
import { AlertTriangle,ChevronDown, ChevronUp, Pencil, Trash } from "lucide-react"
import { useState,useRef, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/src/components/ui/dialog"
import { Switch } from "@/src/components/ui/switch"
import { useToast } from "@/src/components/ui/use-toast"
import { DeleteStaffDialog } from "./delete-staff-dialog"



interface StaffMember {
  id: number
  name: string
  email: string
  phone: string
  position: string
  status: string
  image_url: string
  education: string
  performance: number
  error_count: number
}

interface StaffCardProps {
  staff: StaffMember
  isExpanded: boolean
  onToggle: () => void
  onUpdate: () => void
}

export function StaffCard({ staff, isExpanded, onToggle, onUpdate }: StaffCardProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editedStaff, setEditedStaff] = useState(staff)
  const [isAdjustingPerformance, setIsAdjustingPerformance] = useState(false)
  const performanceUpdateTimeout = useRef<NodeJS.Timeout>()
  const { toast } = useToast()
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const getPerformanceColor = (performance: number) => {
    if (performance >= 70) return "bg-green-500"
    if (performance >= 60) return "bg-yellow-500"
    return "bg-red-500"
  }

  const getPerformanceWarning = (performance: number) => {
    if (performance < 50) return "Critical: Owner intervention required immediately"
    if (performance < 60) return "Final Warning: Performance improvement needed urgently"
    if (performance < 70) return "Warning: Performance needs improvement"
    return null
  }

  const handlePerformanceChange = async (value: number) => {
    setEditedStaff((prev) => ({ ...prev, performance: value }))

    // Clear any existing timeout
    if (performanceUpdateTimeout.current) {
      clearTimeout(performanceUpdateTimeout.current)
    }

    // Set a new timeout to update the server
    performanceUpdateTimeout.current = setTimeout(async () => {
      try {
        const response = await fetch(`/api/staff/${staff.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ performance: value }),
        })

        if (!response.ok) {
          throw new Error("Failed to update performance")
        }

        const updatedStaff = await response.json()
        setEditedStaff(updatedStaff)
        onUpdate() // Call the onUpdate function to refetch the staff member data

        toast({
          title: "Performance Updated",
          description: `Performance has been updated to ${value}%`,
        })
      } catch (error) {
        console.error("Error updating performance:", error)
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to update performance",
        })
        // Revert to previous value on error
        setEditedStaff((prev) => ({ ...prev, performance: staff.performance }))
      }
    }, 500) // Wait 500ms after the last change before sending the update
  }

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (performanceUpdateTimeout.current) {
        clearTimeout(performanceUpdateTimeout.current)
      }
    }
  }, [])

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch(`/api/staff/${staff.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedStaff),
      })

      if (!response.ok) {
        throw new Error("Failed to update staff member")
      }

      const updatedStaff = await response.json()
      setEditedStaff(updatedStaff)
      setIsEditDialogOpen(false)
      toast({
        title: "Staff Updated",
        description: "Staff member information has been successfully updated.",
      })
    } catch (error: unknown) {
      console.error("Error updating staff member:", error)
      let errorMessage = "Failed to update staff member"
      if (error instanceof Error) {
        errorMessage = error.message
      }
      toast({
        variant: "destructive",
        title: "Error",
        description: errorMessage,
      })
    }
  }

  const handleStatusChange = async () => {
    try {
      const newStatus = editedStaff.status === "on_shift" ? "off_shift" : "on_shift"

      // Optimistically update the UI
      setEditedStaff((prev) => ({ ...prev, status: newStatus }))

      const response = await fetch(`/api/staff/${staff.id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      })

      if (!response.ok) {
        // Revert the optimistic update if the API call fails
        setEditedStaff((prev) => ({ ...prev, status: staff.status }))
        throw new Error("Failed to update staff status")
      }

      const updatedStaff = await response.json()
      // Update the entire staff object with the response from the server
      setEditedStaff(updatedStaff)

      toast({
        title: "Status Updated",
        description: `${staff.name} is now ${newStatus === "on_shift" ? "on shift" : "off shift"}`,
      })
    } catch (error) {
      console.error("Error updating staff status:", error)
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update staff status",
      })
    }
  }

  return (
    <div className="relative">
      <motion.div
        className="grid grid-cols-[1fr_1.5fr_1fr_1fr_1fr] gap-4 p-4 cursor-pointer hover:bg-muted/50"
        onClick={onToggle}
        initial={false}
        animate={{ backgroundColor: isExpanded ? "hsl(var(--muted))" : "transparent" }}
        transition={{ duration: 0.2 }}
      >
        <div className="flex items-center gap-2">
          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={staff.image_url} alt={staff.name} />
              <AvatarFallback>{staff.name[0]}</AvatarFallback>
            </Avatar>
            {staff.name}
          </div>
        </div>
        <div className="text-muted-foreground">
          {staff.email}
          <br />
          {staff.phone}
        </div>
        <div>{staff.position}</div>
        
        <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
          <Switch checked={editedStaff.status === "on_shift"} onCheckedChange={handleStatusChange} />
          <span
            className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
              editedStaff.status === "on_shift" ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-700"
            }`}
          >
            {editedStaff.status === "on_shift" ? "On Shift" : "Off Shift"}
          </span>
        </div>
      </motion.div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t bg-muted/50 p-6"
          >
            <div className="flex gap-6">
              <Avatar className="h-32 w-32 rounded-lg">
                <AvatarImage src={staff.image_url} alt={staff.name} />
                <AvatarFallback>
                  {staff.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-semibold">{staff.name}</h3>
                    <p className="text-muted-foreground">{staff.position}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => setIsEditDialogOpen(true)}>
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit Profile
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        setIsDeleteDialogOpen(true)
                      }}
                    >
                      <Trash className="mr-2 h-4 w-4" />
                      Delete
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="font-medium">Education</div>
                    <div className="text-muted-foreground">{staff.education}</div>
                  </div>
                  
                 
                 
                  <div className="col-span-2">
                    <div className="font-medium mb-2">Performance</div>
                    <div
                      className="relative"
                      onMouseEnter={() => setIsAdjustingPerformance(true)}
                      onMouseLeave={() => setIsAdjustingPerformance(false)}
                    >
                      <div className="flex items-center gap-2">
                        <div className="relative flex-1">
                          {isAdjustingPerformance ? (
                            <Input
                              type="range"
                              min="0"
                              max="100"
                              value={editedStaff.performance}
                              onChange={(e) => handlePerformanceChange(Number.parseInt(e.target.value, 10))}
                              className="absolute inset-0 h-3 cursor-pointer"
                            />
                          ) : (
                            <Progress
                              value={editedStaff.performance}
                              className={getPerformanceColor(editedStaff.performance)}
                            />
                          )}
                        </div>
                        <span className="text-sm font-medium w-12">{editedStaff.performance}%</span>
                      </div>
                      {isAdjustingPerformance && (
                        <div className="absolute -top-6 left-0 right-0 text-xs text-muted-foreground text-center">
                          Drag to adjust performance
                        </div>
                      )}
                    </div>
                    {getPerformanceWarning(editedStaff.performance) && (
                      <div className="flex items-center gap-2 mt-2 text-red-600">
                        <AlertTriangle className="h-4 w-4" />
                        <span className="text-sm">{getPerformanceWarning(editedStaff.performance)}</span>
                      </div>
                    )}
                    <div className="text-sm text-muted-foreground mt-1">
                      Errors in daily sales: {editedStaff.error_count} (affects performance)
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <DeleteStaffDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        staff={staff}
        onStaffDeleted={onUpdate}
      />
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Staff Profile</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEditSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={editedStaff.name}
                  onChange={(e) => setEditedStaff({ ...editedStaff, name: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  value={editedStaff.email}
                  onChange={(e) => setEditedStaff({ ...editedStaff, email: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={editedStaff.phone}
                  onChange={(e) => setEditedStaff({ ...editedStaff, phone: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="position">Position</Label>
                <Input
                  id="position"
                  value={editedStaff.position}
                  onChange={(e) => setEditedStaff({ ...editedStaff, position: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="performance">Performance</Label>
                <Input
                  id="performance"
                  type="number"
                  min="0"
                  max="100"
                  value={editedStaff.performance}
                  onChange={(e) => setEditedStaff({ ...editedStaff, performance: Number.parseInt(e.target.value, 10) })}
                />
              </div>
            </div>
            <Button type="submit">Save Changes</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}







