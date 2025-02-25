

"use client"

import { Badge } from "@/src/components/ui/badge"
import { Button } from "@/src/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/src/components/ui/dialog"
import { Input } from "@/src/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow ,} from "@/src/components/ui/table"
import { AlertTriangle, Check, Plus , Loader2} from "lucide-react"
import { useEffect, useState } from "react"
import { toast } from "sonner"





interface LowStockDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

interface InventoryItem {
  id: string
  name: string
  category: string
  quantity: number
  unit: string
  threshold: number
}

interface LowStockProduct {
  id: string
  name: string
  currentStock: number
  minThreshold: number
  status: "low" | "ordered" | "received"
  orderQuantity?: number
  orderDate?: string
  expectedDelivery?: string
  unit: string
}

export function LowStockDialog({ open, onOpenChange }: LowStockDialogProps) {
  const [lowStockProducts, setLowStockProducts] = useState<LowStockProduct[]>([])
  const [orderQuantities, setOrderQuantities] = useState<Record<string, number>>({})
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState<string | null>(null)

  useEffect(() => {
    if (open) {
      fetchInventory()
    }
  }, [open])

  const fetchInventory = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/inventory")
      if (!response.ok) throw new Error("Failed to fetch inventory")

      const data: InventoryItem[] = await response.json()

      // Transform and filter for low stock items
      const lowStockItems = data
        .filter((item) => item.quantity <= item.threshold)
        .map((item) => ({
          id: item.id,
          name: item.name,
          currentStock: item.quantity,
          minThreshold: item.threshold,
          status: "low" as const,
          unit: item.unit,
        }))

      setLowStockProducts(lowStockItems)
    } catch (error) {
      console.error("Error fetching inventory:", error)
      toast.error("Failed to fetch inventory data")
    } finally {
      setLoading(false)
    }
  }

  const handleOrder = async (productId: string) => {
    const quantity = orderQuantities[productId]
    if (!quantity) return

    try {
      setUpdating(productId)
      const product = lowStockProducts.find((p) => p.id === productId)
      if (!product) return

      const newQuantity = product.currentStock + quantity

      const response = await fetch(`/api/inventory/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity: newQuantity }),
      })

      if (!response.ok) throw new Error("Failed to update inventory")

      setLowStockProducts((current) =>
        current.map((product) =>
          product.id === productId
            ? {
                ...product,
                status: "ordered",
                orderQuantity: quantity,
                orderDate: new Date().toISOString().split("T")[0],
                expectedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
              }
            : product,
        ),
      )

      setOrderQuantities((current) => {
        const { [productId]: _, ...rest } = current
        return rest
      })

      toast.success("Order placed successfully")
    } catch (error) {
      console.error("Error updating inventory:", error)
      toast.error("Failed to place order")
    } finally {
      setUpdating(null)
    }
  }

  const handleReceived = async (productId: string) => {
    try {
      setUpdating(productId)
      const product = lowStockProducts.find((p) => p.id === productId)
      if (!product || !product.orderQuantity) return

      const newQuantity = product.currentStock + product.orderQuantity

      const response = await fetch(`/api/inventory/${productId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity: newQuantity }),
      })

      if (!response.ok) throw new Error("Failed to update inventory")

      setLowStockProducts((current) =>
        current.map((product) =>
          product.id === productId
            ? {
                ...product,
                status: "received",
                currentStock: newQuantity,
              }
            : product,
        ),
      )

      toast.success("Stock received successfully")
    } catch (error) {
      console.error("Error updating inventory:", error)
      toast.error("Failed to update stock")
    } finally {
      setUpdating(null)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-orange-600" />
            Low Stock Products
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : lowStockProducts.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">No low stock items found</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product Name</TableHead>
                  <TableHead>Current Stock</TableHead>
                  <TableHead>Min. Threshold</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Order Details</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {lowStockProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>
                      {product.currentStock} {product.unit}
                    </TableCell>
                    <TableCell>
                      {product.minThreshold} {product.unit}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          product.status === "low"
                            ? "border-orange-500 text-orange-700"
                            : product.status === "ordered"
                              ? "border-blue-500 text-blue-700"
                              : "border-green-500 text-green-700"
                        }
                      >
                        {product.status === "low" ? "Low Stock" : product.status === "ordered" ? "Ordered" : "Received"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {product.status === "ordered" && (
                        <div className="text-sm">
                          <div>
                            Quantity: {product.orderQuantity} {product.unit}
                          </div>
                          <div>Order Date: {product.orderDate}</div>
                          <div>Expected: {product.expectedDelivery}</div>
                        </div>
                      )}
                      {product.status === "received" && (
                        <div className="text-sm text-green-600">
                          Restocked: +{product.orderQuantity} {product.unit}
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      {product.status === "low" && (
                        <div className="flex items-center gap-2">
                          <Input
                            type="number"
                            placeholder="Qty"
                            className="w-20"
                            value={orderQuantities[product.id] || ""}
                            onChange={(e) =>
                              setOrderQuantities((current) => ({
                                ...current,
                                [product.id]: Number.parseInt(e.target.value),
                              }))
                            }
                          />
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleOrder(product.id)}
                            disabled={!orderQuantities[product.id] || updating === product.id}
                          >
                            {updating === product.id ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <Plus className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      )}
                      {product.status === "ordered" && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-green-600"
                          onClick={() => handleReceived(product.id)}
                          disabled={updating === product.id}
                        >
                          {updating === product.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <Check className="h-4 w-4" />
                          )}
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
