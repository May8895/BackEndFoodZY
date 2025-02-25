// "use client"

// import { Button } from "@/src/components/ui/button"
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/src/components/ui/dialog"
// import { Input } from "@/src/components/ui/input"
// import { Label } from "@/src/components/ui/label"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"
// import { Upload } from "lucide-react"

// interface AddProductDialogProps {
//   open: boolean
//   onOpenChange: (open: boolean) => void
// }

// export function AddProductDialog({ open, onOpenChange }: AddProductDialogProps) {
//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent className="sm:max-w-[425px]">
//         <DialogHeader>
//           <DialogTitle>New Product</DialogTitle>
//           <DialogDescription>Add a new product to your inventory. Click save when you're done.</DialogDescription>
//         </DialogHeader>
//         <div className="mt-4 grid gap-4">
//           <div className="flex items-center justify-center border-2 border-dashed rounded-lg p-4">
//             <div className="text-center">
//               <Upload className="mx-auto h-8 w-8 text-gray-400" />
//               <div className="mt-2">
//                 <label
//                   htmlFor="file-upload"
//                   className="relative cursor-pointer rounded-md bg-white font-semibold text-[#f77700] focus-within:outline-none focus-within:ring-2 focus-within:ring-[#f77700] focus-within:ring-offset-2 hover:text-[#f77700]/80"
//                 >
//                   <span>Upload a file</span>
//                   <input id="file-upload" name="file-upload" type="file" className="sr-only" />
//                 </label>
//                 <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
//               </div>
//             </div>
//           </div>
//           <div className="grid gap-2">
//             <Label htmlFor="name">Product Name</Label>
//             <Input id="name" placeholder="Enter product name" />
//           </div>
//           <div className="grid gap-2">
//             <Label htmlFor="code">Product Code</Label>
//             <Input id="code" placeholder="Enter product code" />
//           </div>
//           <div className="grid gap-2">
//             <Label htmlFor="category">Category</Label>
//             <Select>
//               <SelectTrigger>
//                 <SelectValue placeholder="Select product category" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="meat">Meat</SelectItem>
//                 <SelectItem value="vegetables">Vegetables</SelectItem>
//                 <SelectItem value="dairy">Dairy</SelectItem>
//                 <SelectItem value="beverages">Beverages</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//           <div className="grid gap-2">
//             <Label htmlFor="quantity">Quantity</Label>
//             <Input id="quantity" type="number" placeholder="Enter product quantity" />
//           </div>
//           <div className="grid gap-2">
//             <Label htmlFor="unit">Unit</Label>
//             <Input id="unit" placeholder="Enter product unit" />
//           </div>
//           <div className="grid gap-2">
//             <Label htmlFor="threshold">Threshold Value</Label>
//             <Input id="threshold" type="number" placeholder="Enter threshold value" />
//           </div>
//           <div className="grid gap-2">
//             <Label htmlFor="expiry">Expiry Date</Label>
//             <Input id="expiry" type="date" />
//           </div>
//         </div>
//         <DialogFooter className="mt-6">
//           <Button variant="outline" onClick={() => onOpenChange(false)}>
//             Cancel
//           </Button>
//           <Button className="bg-[#f77700] hover:bg-[#f77700]/90">Add Product</Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   )
// }
"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/src/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"
import { useToast } from "@/src/components/ui/use-toast"
import type { InventoryItem } from "@/src/types"

interface AddProductDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onProductAdded: () => void
}

export function AddProductDialog({ open, onOpenChange, onProductAdded }: AddProductDialogProps) {
  const [name, setName] = useState("")
  const [code, setCode] = useState("")
  const [category, setCategory] = useState("")
  const [quantity, setQuantity] = useState("")
  const [unit, setUnit] = useState("")
  const [threshold, setThreshold] = useState("")
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const newProduct: Omit<InventoryItem, "id"> = {
      name,
      category,
      quantity: Number.parseInt(quantity),
      unit,
      threshold: Number.parseInt(threshold),
    }

    try {
      const response = await fetch("/api/inventory", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      })

      if (!response.ok) {
        throw new Error("Failed to add product")
      }

      toast({
        title: "Success",
        description: "Product added successfully",
      })
      onProductAdded()
      onOpenChange(false)
      resetForm()
    } catch (error) {
      console.error("Error adding product:", error)
      toast({
        title: "Error",
        description: "Failed to add product. Please try again.",
        variant: "destructive",
      })
    }
  }

  const resetForm = () => {
    setName("")
    setCode("")
    setCategory("")
    setQuantity("")
    setUnit("")
    setThreshold("")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New Product</DialogTitle>
          <DialogDescription>Add a new product to your inventory. Click save when you're done.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="mt-4 grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Product Name</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="code">Product Code</Label>
              <Input id="code" value={code} onChange={(e) => setCode(e.target.value)} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Select value={category} onValueChange={setCategory} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select product category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="meat">Meat</SelectItem>
                  <SelectItem value="vegetables">Vegetables</SelectItem>
                  <SelectItem value="dairy">Dairy</SelectItem>
                  <SelectItem value="beverages">Beverages</SelectItem>
                  <SelectItem value="others">Others</SelectItem>

                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="unit">Unit</Label>
              <Input id="unit" value={unit} onChange={(e) => setUnit(e.target.value)} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="threshold">Threshold Value</Label>
              <Input
                id="threshold"
                type="number"
                value={threshold}
                onChange={(e) => setThreshold(e.target.value)}
                required
              />
            </div>
          </div>
          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-[#f77700] hover:bg-[#f77700]/90">
              Add Product
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}


