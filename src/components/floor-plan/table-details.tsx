"use client"

import type React from "react"

import { useState } from "react"
import { X, Edit, Check, Trash2 } from "lucide-react"
import { Button } from "@/src/components/ui/button"
import { DialogContent, DialogHeader, DialogTitle } from "@/src/components/ui/dialog"
import { Input } from "@/src/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"
import type { TableData, TableStatus } from "./floor-plan"

interface TableDetailsProps {
  table: TableData
  onClose: () => void
  onComplete: () => void
  onUpdate: (updatedTable: TableData) => void
  onRemove: (tableId: string) => void
}

export function TableDetails({ table, onClose, onComplete, onUpdate, onRemove }: TableDetailsProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedTable, setEditedTable] = useState(table)

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = () => {
    onUpdate(editedTable)
    setIsEditing(false)
    onClose() // Add this line to close the dialog after saving
  }

  const handleCancel = () => {
    setEditedTable(table)
    setIsEditing(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setEditedTable((prev) => ({ ...prev, [name]: value }))
  }

  const handleStatusChange = (value: TableStatus) => {
    const updatedTable = { ...editedTable, status: value }
    setEditedTable(updatedTable)
    onUpdate(updatedTable)
  }

  const getStatusColor = (status: TableStatus) => {
    switch (status) {
      case "ordered":
        return "text-red-500"
      case "serving":
        return "text-purple-500"
      case "reserved":
        return "text-gray-500"
      case "available":
        return "text-green-500"
      default:
        return ""
    }
  }

  const handleRemove = () => {
    onRemove(table.id)
    onClose()
  }

  const labelClassName = "text-base font-semibold min-w-[120px]"
  const valueClassName = "flex-1 text-base"
  const rowClassName = "flex items-center gap-4 min-h-[40px]"

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <div className="flex justify-between items-center">
          <DialogTitle className="text-xl">Table Details</DialogTitle>
          <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </DialogHeader>
      <div className="space-y-6 py-6">
        <div className="space-y-4">
          <div className={rowClassName}>
            <span className={labelClassName}>Table:</span>
            <div className={valueClassName}>
              {isEditing ? (
                <Input
                  name="number"
                  value={editedTable.number}
                  onChange={handleInputChange}
                  type="number"
                  min="1"
                  className="w-full"
                />
              ) : (
                <span>{editedTable.number}</span>
              )}
            </div>
          </div>
          <div className={rowClassName}>
            <span className={labelClassName}>Customers:</span>
            <div className={valueClassName}>
              {isEditing ? (
                <Input
                  name="numberOfCustomers"
                  type="number"
                  value={editedTable.numberOfCustomers || 0}
                  onChange={handleInputChange}
                  min="0"
                  className="w-full"
                />
              ) : (
                <span>{editedTable.numberOfCustomers || 0}</span>
              )}
            </div>
          </div>
          <div className={rowClassName}>
            <span className={labelClassName}>Status:</span>
            <div className={valueClassName}>
              {isEditing ? (
                <Select value={editedTable.status} onValueChange={handleStatusChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="available" className="text-green-500">
                      Available
                    </SelectItem>
                    <SelectItem value="ordered" className="text-red-500">
                      Ordered
                    </SelectItem>
                    <SelectItem value="serving" className="text-purple-500">
                      Serving
                    </SelectItem>
                    <SelectItem value="reserved" className="text-gray-500">
                      Reserved
                    </SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <span className={getStatusColor(editedTable.status)}>{editedTable.status}</span>
              )}
            </div>
          </div>
        </div>
        {editedTable.orders && editedTable.orders.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-semibold">Orders</h4>
            <ul className="space-y-1">
              {editedTable.orders.map((order) => (
                <li key={order.id} className="text-sm">
                  {order.name} - ${order.price} ({order.status})
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="flex justify-end space-x-2">
        {isEditing ? (
          <>
            <Button onClick={handleCancel} variant="outline" size="lg">
              Cancel
            </Button>
            <Button onClick={handleSave} className="bg-green-500 hover:bg-green-600 text-white" size="lg">
              <Check className="mr-2 h-4 w-4" />
              Save
            </Button>
          </>
        ) : (
          <>
            <Button onClick={handleEdit} variant="outline" size="sm">
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>
            <Button onClick={handleRemove} variant="destructive" size="sm">
              <Trash2 className="mr-2 h-4 w-4" />
              Remove
            </Button>
          </>
        )}
      </div>
    </DialogContent>
  )
}