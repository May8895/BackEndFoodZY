// import { Button } from "@/src/components/ui/button"
// import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/src/components/ui/dialog"
// import { Input } from "@/src/components/ui/input"
// import { Label } from "@/src/components/ui/label"
// import { useEffect, useState } from "react"

// interface CustomerInputDialogProps {
//   open: boolean
//   onOpenChange: (open: boolean) => void
//   onSubmit: (data: { numberOfCustomers: number }) => void
//   initialCustomers?: number
// }

// export function CustomerInputDialog({ open, onOpenChange, onSubmit, initialCustomers = 1 }: CustomerInputDialogProps) {
//   const [numberOfCustomers, setNumberOfCustomers] = useState(initialCustomers)

//   useEffect(() => {
//     if (open) {
//       setNumberOfCustomers(initialCustomers)
//     }
//   }, [open, initialCustomers])

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()
//     onSubmit({ numberOfCustomers })
//     setNumberOfCustomers(1)
//   }

//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent>
//         <DialogHeader>
//           <DialogTitle>New Customer Information</DialogTitle>
//         </DialogHeader>
//         <form onSubmit={handleSubmit}>
//           <div className="grid gap-4 py-4">
//             <div className="grid grid-cols-4 items-center gap-4">
//               <Label htmlFor="numberOfCustomers" className="text-right">
//                 Number of Customers
//               </Label>
//               <Input
//                 id="numberOfCustomers"
//                 type="number"
//                 value={numberOfCustomers}
//                 onChange={(e) => setNumberOfCustomers(Number(e.target.value))}
//                 className="col-span-3"
//                 min={1}
//                 required
//               />
//             </div>
//           </div>
//           <DialogFooter>
//             <Button type="submit">Submit</Button>
//           </DialogFooter>
//         </form>
//       </DialogContent>
//     </Dialog>
//   )
// }
"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/src/components/ui/button"
import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/src/components/ui/dialog"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import type { TableData } from "./floor-plan"

interface CustomerInputDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: { numberOfCustomers: number }) => void
  selectedTableId?: string | null
  setSelectedTable: (table: TableData | null) => void
  tables?: TableData[]
  initialValue?: number
  mode?: "add" | "edit"
  handleRemoveTable: (tableId: string) => void
}

export function CustomerInputDialog({
  open,
  onOpenChange,
  onSubmit,
  initialValue,
  mode = "add",
  selectedTableId,
  setSelectedTable,
  tables,
  handleRemoveTable,
}: CustomerInputDialogProps) {
  const [numberOfCustomers, setNumberOfCustomers] = useState<number | undefined>(initialValue)

  useEffect(() => {
    if (open) {
      setNumberOfCustomers(initialValue)
    }
  }, [open, initialValue])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (numberOfCustomers !== undefined) {
      onSubmit({ numberOfCustomers })
      onOpenChange(false)
      setNumberOfCustomers(undefined)
    }
  }

  return (
    <DialogContent>
      <DialogHeader>
        <div className="flex justify-between items-center">
          <DialogTitle>{mode === "edit" ? "Edit Number of Customers" : "Enter Number of Customers"}</DialogTitle>
        </div>
      </DialogHeader>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="number-of-customers" className="text-right">
              Number of Customers
            </Label>
            <Input
              id="number-of-customers"
              type="number"
              value={numberOfCustomers || ""}
              onChange={(e) => setNumberOfCustomers(e.target.value ? Number(e.target.value) : undefined)}
              className="col-span-3"
              required
            />
          </div>
        </div>
        <DialogFooter className="flex justify-between items-center">
          <Button
            type="button"
            variant="destructive"
            onClick={() => {
              onOpenChange(false)
              if (selectedTableId && tables) {
                handleRemoveTable(selectedTableId)
              }
            }}
          >
            Remove
          </Button>
          <div>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="mr-2">
              Cancel
            </Button>
            <Button type="submit" variant="default" className="bg-green-500 hover:bg-green-600 text-white">
              Save
            </Button>
          </div>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}
