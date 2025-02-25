"use client"

import { Button } from "@/src/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog"
import { useToast } from "@/src/components/ui/use-toast"
import { Loader2 } from "lucide-react"
import { useState } from "react"
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
  
  interface DeleteStaffDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    staff: StaffMember
    onStaffDeleted: () => void
  }
  
  export function DeleteStaffDialog({ open, onOpenChange, staff, onStaffDeleted }: DeleteStaffDialogProps) {
    const [isDeleting, setIsDeleting] = useState(false)
    const { toast } = useToast()
  
    const handleDelete = async () => {
      setIsDeleting(true)
      try {
        const response = await fetch(`/api/staff/${staff.id}`, {
          method: "DELETE",
        })
  
        if (!response.ok) {
          throw new Error("Failed to delete staff member")
        }
  
        toast({
          title: "Staff Deleted",
          description: `${staff.name} has been removed from the system.`,
        })
        onStaffDeleted()
        onOpenChange(false)
      } catch (error) {
        console.error("Error deleting staff:", error)
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to delete staff member. Please try again.",
        })
      } finally {
        setIsDeleting(false)
      }
    }
  
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Staff Member</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {staff.name}? This action cannot be undone and will permanently remove their
              data from the system.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:gap-0">
            <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isDeleting}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
              {isDeleting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Delete Staff Member"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }
  
