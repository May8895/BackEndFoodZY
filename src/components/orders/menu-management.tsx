// "use client"

// import { Button } from "@/src/components/ui/button"
// import { Card, CardContent } from "@/src/components/ui/card"
// import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/src/components/ui/dialog"
// import { Input } from "@/src/components/ui/input"
// import { Label } from "@/src/components/ui/label"
// import { ScrollArea, ScrollBar } from "@/src/components/ui/scroll-area"
// import { Pencil, Plus, Search, Trash2 } from "lucide-react"
// import { useRef, useState } from "react"

// interface MenuItem {
//   id: string
//   name: string
//   description: string
//   price: number
//   category: string
//   image: string
// }

// const categories = [
//   { id: "all", name: "All", icon: "🍽️" },
//   { id: "main", name: "Main Course", icon: "🍖" },
//   { id: "appetizer", name: "Appetizers", icon: "🥗" },
//   { id: "soup", name: "Soups", icon: "🥣" },
//   { id: "dessert", name: "Desserts", icon: "🍰" },
//   { id: "beverage", name: "Beverages", icon: "🥤" },
// ]

// const initialMenuItems: MenuItem[] = [
//   {
//     id: "1",
//     name: "Pad Thai",
//     description: "Rice noodles stir-fried with eggs, tofu, dried shrimp, and peanuts",
//     price: 155,
//     category: "main",
//     image: "/placeholder.svg?height=200&width=200",
//   },
//   {
//     id: "2",
//     name: "Green Curry",
//     description: "Thai green curry with coconut milk, bamboo shoots, and Thai basil",
//     price: 170,
//     category: "main",
//     image: "/placeholder.svg?height=200&width=200",
//   },
//   {
//     id: "3",
//     name: "Mango Sticky Rice",
//     description: "Sweet sticky rice served with fresh mango and coconut cream",
//     price: 145,
//     category: "dessert",
//     image: "/placeholder.svg?height=200&width=200",
//   },
//   {
//     id: "4",
//     name: "Tom Yum Soup",
//     description: "Hot and sour soup with shrimp, mushrooms, and Thai herbs",
//     price: 180,
//     category: "soup",
//     image: "/placeholder.svg?height=200&width=200",
//   },
//   {
//     id: "5",
//     name: "Spring Rolls",
//     description: "Fresh vegetables wrapped in rice paper with peanut sauce",
//     price: 120,
//     category: "appetizer",
//     image: "/placeholder.svg?height=200&width=200",
//   },
//   {
//     id: "6",
//     name: "Honey Lemon iced tea",
//     description: "",
//     price: 85,
//     category: "beverage",
//     image: "/placeholder.svg?height=200&width=200",
//   },
//   {
//     id: "7",
//     name: "Hot chocolate",
//     description: "",
//     price: 85,
//     category: "beverage",
//     image: "/placeholder.svg?height=200&width=200",
//   },
//   {
//     id: "8",
//     name: "Waffles",
//     description: "",
//     price: 90,
//     category: "dessert",
//     image: "/placeholder.svg?height=200&width=200",
//   },
// ]

// export function MenuManagement() {
//   const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenuItems)
//   const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
//   const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
//   const [currentItem, setCurrentItem] = useState<MenuItem | null>(null)
//   const [selectedCategory, setSelectedCategory] = useState("all")
//   const [searchQuery, setSearchQuery] = useState("")

//   const filteredItems = menuItems.filter((item) => {
//     const matchesCategory = selectedCategory === "all" || item.category === selectedCategory
//     const matchesSearch =
//       item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       item.description.toLowerCase().includes(searchQuery.toLowerCase())
//     return matchesCategory && matchesSearch
//   })

//   const handleAddItem = (newItem: Omit<MenuItem, "id">) => {
//     const id = (menuItems.length + 1).toString()
//     setMenuItems([...menuItems, { ...newItem, id }])
//     setIsAddDialogOpen(false)
//   }

//   const handleEditItem = (updatedItem: MenuItem) => {
//     setMenuItems(menuItems.map((item) => (item.id === updatedItem.id ? updatedItem : item)))
//     setIsEditDialogOpen(false)
//   }

//   const handleDeleteItem = (id: string) => {
//     setMenuItems(menuItems.filter((item) => item.id !== id))
//   }

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <div className="relative w-[300px]">
//           <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
//           <Input
//             placeholder="Search menu items..."
//             className="pl-9"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//         </div>
//         <Button onClick={() => setIsAddDialogOpen(true)} className="bg-[#f77700] hover:bg-[#f77700]/90">
//           <Plus className="mr-2 h-4 w-4" /> Add New Item
//         </Button>
//       </div>

//       <ScrollArea className="w-full whitespace-nowrap">
//         <div className="flex space-x-4 p-1">
//           {categories.map((category) => (
//             <Button
//               key={category.id}
//               variant={selectedCategory === category.id ? "default" : "outline"}
//               className="rounded-full"
//               onClick={() => setSelectedCategory(category.id)}
//             >
//               <span className="mr-2">{category.icon}</span>
//               {category.name}
//             </Button>
//           ))}
//         </div>
//         <ScrollBar orientation="horizontal" />
//       </ScrollArea>

//       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//         {filteredItems.map((item) => (
//           <Card key={item.id} className="overflow-hidden">
//             <div className="aspect-square relative">
//               <img src={item.image || "/placeholder.svg"} alt={item.name} className="object-cover w-full h-full" />
//               <div className="absolute top-2 right-2 flex gap-2">
//                 <Button
//                   variant="secondary"
//                   size="icon"
//                   className="h-8 w-8 bg-white hover:bg-gray-100"
//                   onClick={() => {
//                     setCurrentItem(item)
//                     setIsEditDialogOpen(true)
//                   }}
//                 >
//                   <Pencil className="h-4 w-4 text-gray-600" />
//                 </Button>
//                 <Button
//                   variant="secondary"
//                   size="icon"
//                   className="h-8 w-8 bg-white hover:bg-red-50"
//                   onClick={() => handleDeleteItem(item.id)}
//                 >
//                   <Trash2 className="h-4 w-4 text-red-600" />
//                 </Button>
//               </div>
//             </div>
//             <CardContent className="p-4">
//               <div className="space-y-2">
//                 <div className="flex items-center justify-between">
//                   <h3 className="font-semibold">{item.name}</h3>
//                   <span className="font-bold text-[#f77700]">฿{item.price.toFixed(2)}</span>
//                 </div>
//                 <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       <AddEditItemDialog
//         isOpen={isAddDialogOpen}
//         onClose={() => setIsAddDialogOpen(false)}
//         onSave={handleAddItem}
//         item={null}
//       />
//       <AddEditItemDialog
//         isOpen={isEditDialogOpen}
//         onClose={() => setIsEditDialogOpen(false)}
//         onSave={handleEditItem}
//         item={currentItem}
//       />
//     </div>
//   )
// }

// interface AddEditItemDialogProps {
//   isOpen: boolean
//   onClose: () => void
//   onSave: (item: any) => void
//   item: MenuItem | null
// }

// function AddEditItemDialog({ isOpen, onClose, onSave, item }: AddEditItemDialogProps) {
//   const [name, setName] = useState(item?.name || "")
//   const [description, setDescription] = useState(item?.description || "")
//   const [price, setPrice] = useState(item?.price.toString() || "")
//   const [category, setCategory] = useState(item?.category || "main")
//   const [image, setImage] = useState(item?.image || "/placeholder.svg?height=200&width=200")
//   const [previewImage, setPreviewImage] = useState(item?.image || "/placeholder.svg?height=200&width=200")
//   const fileInputRef = useRef<HTMLInputElement>(null)

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0]
//     if (file) {
//       const reader = new FileReader()
//       reader.onloadend = () => {
//         const result = reader.result as string
//         setPreviewImage(result)
//         setImage(result)
//       }
//       reader.readAsDataURL(file)
//     }
//   }

//   const handleSave = () => {
//     onSave({
//       id: item?.id || "",
//       name,
//       description,
//       price: Number.parseFloat(price),
//       category,
//       image: previewImage,
//     })
//     onClose()
//   }

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent className="sm:max-w-[425px]">
//         <DialogHeader>
//           <DialogTitle>{item ? "Edit Menu Item" : "Add Menu Item"}</DialogTitle>
//         </DialogHeader>
//         <div className="grid gap-4 py-4">
//           <div className="grid gap-2">
//             <Label>Image</Label>
//             <div className="flex flex-col items-center gap-4">
//               <div className="relative aspect-square w-full max-w-[200px] overflow-hidden rounded-lg border">
//                 <img src={previewImage || "/placeholder.svg"} alt="Preview" className="h-full w-full object-cover" />
//               </div>
//               <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
//               <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()}>
//                 Choose Image
//               </Button>
//             </div>
//           </div>
//           <div className="grid gap-2">
//             <Label htmlFor="name">Name</Label>
//             <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
//           </div>
//           <div className="grid gap-2">
//             <Label htmlFor="description">Description</Label>
//             <Input id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
//           </div>
//           <div className="grid gap-2">
//             <Label htmlFor="price">Price</Label>
//             <Input id="price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
//           </div>
//           <div className="grid gap-2">
//             <Label htmlFor="category">Category</Label>
//             <select
//               id="category"
//               value={category}
//               onChange={(e) => setCategory(e.target.value)}
//               className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
//             >
//               {categories
//                 .filter((c) => c.id !== "all")
//                 .map((category) => (
//                   <option key={category.id} value={category.id}>
//                     {category.name}
//                   </option>
//                 ))}
//             </select>
//           </div>
//         </div>
//         <DialogFooter>
//           <Button variant="outline" onClick={onClose}>
//             Cancel
//           </Button>
//           <Button onClick={handleSave} className="bg-[#f77700] hover:bg-[#f77700]/90">
//             {item ? "Save Changes" : "Add Item"}
//           </Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   )
// }
"use client"

import type React from "react"

import { Button } from "@/src/components/ui/button"
import { Card, CardContent } from "@/src/components/ui/card"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/src/components/ui/dialog"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { ScrollArea, ScrollBar } from "@/src/components/ui/scroll-area"
import { useToast } from "@/src/components/ui/use-toast"
import type { MenuItem } from "@/src/types"
import { Pencil, Plus, Search, Trash2, Upload } from "lucide-react"
import { useRef, useState, useEffect } from "react"
import Image from "next/image"


// const categories = [
//   { id: "all", name: "All", icon: "🍽️" },
//   { id: "main", name: "Main Course", icon: "🍖" },
//   { id: "appetizer", name: "Appetizers", icon: "🥗" },
//   { id: "soup", name: "Soups", icon: "🥣" },
//   { id: "dessert", name: "Desserts", icon: "🍰" },
//   { id: "beverage", name: "Beverages", icon: "🥤" },
// ]


// export function MenuManagement() {
//   const [menuItems, setMenuItems] = useState<MenuItem[]>([])
//   const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
//   const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
//   const [currentItem, setCurrentItem] = useState<MenuItem | null>(null)
//   const [selectedCategory, setSelectedCategory] = useState("all")
//   const [searchQuery, setSearchQuery] = useState("")
//   const { toast } = useToast()

//   useEffect(() => {
//     fetchMenuItems()
//   }, [])

//   const fetchMenuItems = async () => {
//     try {
//       const response = await fetch("/api/menu")
//       if (!response.ok) throw new Error("Failed to fetch menu items")
//       const data = await response.json()
//       setMenuItems(data)
//     } catch (error) {
//       console.error("Error fetching menu items:", error)
//       toast({
//         title: "Error",
//         description: "Failed to fetch menu items. Please try again.",
//         variant: "destructive",
//       })
//     }
//   }

//   const filteredItems = menuItems.filter((item) => {
//     const matchesCategory = selectedCategory === "all" || item.category === selectedCategory
//     const matchesSearch =
//       item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       item.description.toLowerCase().includes(searchQuery.toLowerCase())
//     return matchesCategory && matchesSearch
//   })

//   const handleAddItem = async (newItem: Omit<MenuItem, "id">) => {
//     try {
//       const response = await fetch("/api/menu", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(newItem),
//       })
//       if (!response.ok) throw new Error("Failed to add menu item")
//       const addedItem = await response.json()
//       setMenuItems([...menuItems, addedItem])
//       setIsAddDialogOpen(false)
//       toast({
//         title: "Success",
//         description: "Menu item added successfully.",
//       })
//     } catch (error) {
//       console.error("Error adding menu item:", error)
//       toast({
//         title: "Error",
//         description: "Failed to add menu item. Please try again.",
//         variant: "destructive",
//       })
//     }
//   }

//   const handleEditItem = async (updatedItem: MenuItem) => {
//     try {
//       const response = await fetch(`/api/menu/${updatedItem.id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(updatedItem),
//       })
//       if (!response.ok) throw new Error("Failed to update menu item")
//       const editedItem = await response.json()
//       setMenuItems(menuItems.map((item) => (item.id === editedItem.id ? editedItem : item)))
//       setIsEditDialogOpen(false)
//       toast({
//         title: "Success",
//         description: "Menu item updated successfully.",
//       })
//     } catch (error) {
//       console.error("Error updating menu item:", error)
//       toast({
//         title: "Error",
//         description: "Failed to update menu item. Please try again.",
//         variant: "destructive",
//       })
//     }
//   }

//   const handleDeleteItem = async (id: string) => {
//     try {
//       const response = await fetch(`/api/menu/${id}`, { method: "DELETE" })
//       if (!response.ok) throw new Error("Failed to delete menu item")
//       setMenuItems(menuItems.filter((item) => item.id !== id))
//       toast({
//         title: "Success",
//         description: "Menu item deleted successfully.",
//       })
//     } catch (error) {
//       console.error("Error deleting menu item:", error)
//       toast({
//         title: "Error",
//         description: "Failed to delete menu item. Please try again.",
//         variant: "destructive",
//       })
//     }
//   }

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <div className="relative w-[300px]">
//           <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
//           <Input
//             placeholder="Search menu items..."
//             className="pl-9"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//         </div>
//         <Button onClick={() => setIsAddDialogOpen(true)} className="bg-[#f77700] hover:bg-[#f77700]/90">
//           <Plus className="mr-2 h-4 w-4" /> Add New Item
//         </Button>
//       </div>

//       <ScrollArea className="w-full whitespace-nowrap">
//         <div className="flex space-x-4 p-1">
//           {categories.map((category) => (
//             <Button
//               key={category.id}
//               variant={selectedCategory === category.id ? "default" : "outline"}
//               className="rounded-full"
//               onClick={() => setSelectedCategory(category.id)}
//             >
//               <span className="mr-2">{category.icon}</span>
//               {category.name}
//             </Button>
//           ))}
//         </div>
//         <ScrollBar orientation="horizontal" />
//       </ScrollArea>

//       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//         {filteredItems.map((item) => (
//           <Card key={item.id} className="overflow-hidden">
//             <div className="aspect-square relative">
//               <img src={item.image || "/placeholder.svg"} alt={item.name} className="object-cover w-full h-full" />
//               <div className="absolute top-2 right-2 flex gap-2">
//                 <Button
//                   variant="secondary"
//                   size="icon"
//                   className="h-8 w-8 bg-white hover:bg-gray-100"
//                   onClick={() => {
//                     setCurrentItem(item)
//                     setIsEditDialogOpen(true)
//                   }}
//                 >
//                   <Pencil className="h-4 w-4 text-gray-600" />
//                 </Button>
//                 <Button
//                   variant="secondary"
//                   size="icon"
//                   className="h-8 w-8 bg-white hover:bg-red-50"
//                   onClick={() => handleDeleteItem(item.id)}
//                 >
//                   <Trash2 className="h-4 w-4 text-red-600" />
//                 </Button>
//               </div>
//             </div>
//             <CardContent className="p-4">
//               <div className="space-y-2">
//                 <div className="flex items-center justify-between">
//                   <h3 className="font-semibold">{item.name}</h3>
//                   <span className="font-bold text-[#f77700]">฿{item.price.toFixed(2)}</span>
//                 </div>
//                 <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       <AddEditItemDialog
//         isOpen={isAddDialogOpen}
//         onClose={() => setIsAddDialogOpen(false)}
//         onSave={handleAddItem}
//         item={null}
//       />
//       <AddEditItemDialog
//         isOpen={isEditDialogOpen}
//         onClose={() => setIsEditDialogOpen(false)}
//         onSave={handleEditItem}
//         item={currentItem}
//       />
//     </div>
//   )
// }

// interface AddEditItemDialogProps {
//   isOpen: boolean
//   onClose: () => void
//   onSave: (item: MenuItem) => void
//   item: MenuItem | null
// }

// function AddEditItemDialog({ isOpen, onClose, onSave, item }: AddEditItemDialogProps) {
//   const [name, setName] = useState(item?.name || "")
//   const [description, setDescription] = useState(item?.description || "")
//   const [price, setPrice] = useState(item?.price.toString() || "")
//   const [category, setCategory] = useState(item?.category || "main")
//   const [image, setImage] = useState(item?.image || "/placeholder.svg?height=200&width=200")
//   const [previewImage, setPreviewImage] = useState(item?.image || "/placeholder.svg?height=200&width=200")
//   const fileInputRef = useRef<HTMLInputElement>(null)

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0]
//     if (file) {
//       const reader = new FileReader()
//       reader.onloadend = () => {
//         const result = reader.result as string
//         setPreviewImage(result)
//         setImage(result)
//       }
//       reader.readAsDataURL(file)
//     }
//   }

//   const handleSave = () => {
//     onSave({
//       id: item?.id || "",
//       name,
//       description,
//       price: Number.parseFloat(price),
//       category,
//       image: previewImage,
//     })
//     onClose()
//   }

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent className="sm:max-w-[425px]">
//         <DialogHeader>
//           <DialogTitle>{item ? "Edit Menu Item" : "Add Menu Item"}</DialogTitle>
//         </DialogHeader>
//         <div className="grid gap-4 py-4">
//           <div className="grid gap-2">
//             <Label>Image</Label>
//             <div className="flex flex-col items-center gap-4">
//               <div className="relative aspect-square w-full max-w-[200px] overflow-hidden rounded-lg border">
//                 <img src={previewImage || "/placeholder.svg"} alt="Preview" className="h-full w-full object-cover" />
//               </div>
//               <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
//               <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()}>
//                 Choose Image
//               </Button>
//             </div>
//           </div>
//           <div className="grid gap-2">
//             <Label htmlFor="name">Name</Label>
//             <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
//           </div>
//           <div className="grid gap-2">
//             <Label htmlFor="description">Description</Label>
//             <Input id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
//           </div>
//           <div className="grid gap-2">
//             <Label htmlFor="price">Price</Label>
//             <Input id="price" type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
//           </div>
//           <div className="grid gap-2">
//             <Label htmlFor="category">Category</Label>
//             <select
//               id="category"
//               value={category}
//               onChange={(e) => setCategory(e.target.value)}
//               className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
//             >
//               {categories
//                 .filter((c) => c.id !== "all")
//                 .map((category) => (
//                   <option key={category.id} value={category.id}>
//                     {category.name}
//                   </option>
//                 ))}
//             </select>
//           </div>
//         </div>
//         <DialogFooter>
//           <Button variant="outline" onClick={onClose}>
//             Cancel
//           </Button>
//           <Button onClick={handleSave} className="bg-[#f77700] hover:bg-[#f77700]/90">
//             {item ? "Save Changes" : "Add Item"}
//           </Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   )
// }

const categories = [
  { id: "all", name: "All", icon: "🍽️" },
  { id: "main", name: "Main Course", icon: "🍖" },
  { id: "appetizer", name: "Appetizers", icon: "🥗" },
  { id: "soup", name: "Soups", icon: "🥣" },
  { id: "dessert", name: "Desserts", icon: "🍰" },
  { id: "beverage", name: "Beverages", icon: "🥤" },
]

// function formatPrice(price: number | string | null | undefined): string {
//   if (price === null || price === undefined) return "N/A"
//   const numericPrice = Number(price)
//   return !isNaN(numericPrice) ? numericPrice.toFixed(2) : "N/A"
// }

// export function MenuManagement() {
//   const [menuItems, setMenuItems] = useState<MenuItem[]>([])
//   const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
//   const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
//   const [currentItem, setCurrentItem] = useState<MenuItem | null>(null)
//   const [selectedCategory, setSelectedCategory] = useState("all")
//   const [searchQuery, setSearchQuery] = useState("")
//   const { toast } = useToast()

//   useEffect(() => {
//     fetchMenuItems()
//   }, [])

//   const fetchMenuItems = async () => {
//     try {
//       const response = await fetch("/api/menu")
//       if (!response.ok) throw new Error("Failed to fetch menu items")
//       const data = await response.json()
//       console.log("Fetched menu items:", data) // Add this line to debug
//       setMenuItems(data)
//     } catch (error) {
//       console.error("Error fetching menu items:", error)
//       toast({
//         title: "Error",
//         description: "Failed to fetch menu items. Please try again.",
//         variant: "destructive",
//       })
//     }
//   }

//   const filteredItems = menuItems.filter((item) => {
//     const matchesCategory = selectedCategory === "all" || item.category === selectedCategory
//     const matchesSearch =
//       item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       item.description.toLowerCase().includes(searchQuery.toLowerCase())
//     return matchesCategory && matchesSearch
//   })

//   const handleAddItem = async (newItem: Omit<MenuItem, "id">) => {
//     try {
//       const response = await fetch("/api/menu", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(newItem),
//       })
//       if (!response.ok) throw new Error("Failed to add menu item")
//       const addedItem = await response.json()
//       setMenuItems([...menuItems, addedItem])
//       setIsAddDialogOpen(false)
//       toast({
//         title: "Success",
//         description: "Menu item added successfully.",
//       })
//     } catch (error) {
//       console.error("Error adding menu item:", error)
//       toast({
//         title: "Error",
//         description: "Failed to add menu item. Please try again.",
//         variant: "destructive",
//       })
//     }
//   }

//   const handleEditItem = async (updatedItem: Omit<MenuItem, "id">) => {
//     if (!currentItem) return
//     try {
//       const response = await fetch(`/api/menu/${currentItem.id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ ...updatedItem, id: currentItem.id }),
//       })
//       if (!response.ok) throw new Error("Failed to update menu item")
//       const editedItem = await response.json()
//       setMenuItems(menuItems.map((item) => (item.id === editedItem.id ? editedItem : item)))
//       setIsEditDialogOpen(false)
//       toast({
//         title: "Success",
//         description: "Menu item updated successfully.",
//       })
//     } catch (error) {
//       console.error("Error updating menu item:", error)
//       toast({
//         title: "Error",
//         description: "Failed to update menu item. Please try again.",
//         variant: "destructive",
//       })
//     }
//   }

//   const handleDeleteItem = async (id: string) => {
//     try {
//       const response = await fetch(`/api/menu/${id}`, { method: "DELETE" })
//       if (!response.ok) throw new Error("Failed to delete menu item")
//       setMenuItems(menuItems.filter((item) => item.id !== id))
//       toast({
//         title: "Success",
//         description: "Menu item deleted successfully.",
//       })
//     } catch (error) {
//       console.error("Error deleting menu item:", error)
//       toast({
//         title: "Error",
//         description: "Failed to delete menu item. Please try again.",
//         variant: "destructive",
//       })
//     }
//   }

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <div className="relative w-[300px]">
//           <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
//           <Input
//             placeholder="Search menu items..."
//             className="pl-9"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//         </div>
//         <Button onClick={() => setIsAddDialogOpen(true)} className="bg-[#f77700] hover:bg-[#f77700]/90">
//           <Plus className="mr-2 h-4 w-4" /> Add New Item
//         </Button>
//       </div>

//       <ScrollArea className="w-full whitespace-nowrap">
//         <div className="flex space-x-4 p-1">
//           {categories.map((category) => (
//             <Button
//               key={category.id}
//               variant={selectedCategory === category.id ? "default" : "outline"}
//               className="rounded-full"
//               onClick={() => setSelectedCategory(category.id)}
//             >
//               <span className="mr-2">{category.icon}</span>
//               {category.name}
//             </Button>
//           ))}
//         </div>
//         <ScrollBar orientation="horizontal" />
//       </ScrollArea>

//       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//         {filteredItems.map((item) => (
//           <Card key={item.id} className="overflow-hidden">
//             <div className="aspect-square relative">
//               <img src={item.image || "/placeholder.svg"} alt={item.name} className="object-cover w-full h-full" />
//               <div className="absolute top-2 right-2 flex gap-2">
//                 <Button
//                   variant="secondary"
//                   size="icon"
//                   className="h-8 w-8 bg-white hover:bg-gray-100"
//                   onClick={() => {
//                     setCurrentItem(item)
//                     setIsEditDialogOpen(true)
//                   }}
//                 >
//                   <Pencil className="h-4 w-4 text-gray-600" />
//                 </Button>
//                 <Button
//                   variant="secondary"
//                   size="icon"
//                   className="h-8 w-8 bg-white hover:bg-red-50"
//                   onClick={() => handleDeleteItem(item.id)}
//                 >
//                   <Trash2 className="h-4 w-4 text-red-600" />
//                 </Button>
//               </div>
//             </div>
//             <CardContent className="p-4">
//               <div className="space-y-2">
//                 <div className="flex items-center justify-between">
//                   <h3 className="font-semibold">{item.name}</h3>
//                   <span className="font-bold text-[#f77700]">฿{Number(item.price).toFixed(2)}</span>
//                 </div>
//                 <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       <AddEditItemDialog
//         isOpen={isAddDialogOpen}
//         onClose={() => setIsAddDialogOpen(false)}
//         onSave={handleAddItem}
//         item={null}
//       />
//       <AddEditItemDialog
//         isOpen={isEditDialogOpen}
//         onClose={() => setIsEditDialogOpen(false)}
//         onSave={handleEditItem}
//         item={currentItem}
//       />
//     </div>
//   )
// }

// interface AddEditItemDialogProps {
//   isOpen: boolean
//   onClose: () => void
//   onSave: (item: Omit<MenuItem, "id">) => void
//   item: MenuItem | null
// }

// function AddEditItemDialog({ isOpen, onClose, onSave, item }: AddEditItemDialogProps) {
//   const [name, setName] = useState(item?.name || "")
//   const [description, setDescription] = useState(item?.description || "")
//   const [price, setPrice] = useState(item?.price?.toString() || "")
//   const [category, setCategory] = useState(item?.category || "main")
//   const [image, setImage] = useState(item?.image || "/placeholder.svg?height=200&width=200")

//   const handleSave = () => {
//     const numericPrice = Number.parseFloat(price)
//     const newItem: Omit<MenuItem, "id"> = {
//       name,
//       description,
//       price: !isNaN(numericPrice) ? numericPrice : 0,
//       category,
//       image,
//     }
//     onSave(newItem)
//     onClose()
//   }

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent className="sm:max-w-[425px]">
//         <DialogHeader>
//           <DialogTitle>{item ? "Edit Menu Item" : "Add Menu Item"}</DialogTitle>
//         </DialogHeader>
//         <div className="grid gap-4 py-4">
//           <div className="grid gap-2">
//             <Label htmlFor="name">Name</Label>
//             <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
//           </div>
//           <div className="grid gap-2">
//             <Label htmlFor="description">Description</Label>
//             <Input id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
//           </div>
//           <div className="grid gap-2">
//             <Label htmlFor="price">Price</Label>
//             <Input
//               id="price"
//               type="number"
//               value={price}
//               onChange={(e) => setPrice(e.target.value)}
//               step="0.01"
//               min="0"
//               placeholder="0.00"
//             />
//           </div>
//           <div className="grid gap-2">
//             <Label htmlFor="category">Category</Label>
//             <select
//               id="category"
//               value={category}
//               onChange={(e) => setCategory(e.target.value)}
//               className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
//             >
//               {categories
//                 .filter((c) => c.id !== "all")
//                 .map((category) => (
//                   <option key={category.id} value={category.id}>
//                     {category.name}
//                   </option>
//                 ))}
//             </select>
//           </div>
//           <div className="grid gap-2">
//             <Label htmlFor="image">Image URL</Label>
//             <Input id="image" value={image} onChange={(e) => setImage(e.target.value)} />
//           </div>
//         </div>
//         <DialogFooter>
//           <Button variant="outline" onClick={onClose}>
//             Cancel
//           </Button>
//           <Button onClick={handleSave} className="bg-[#f77700] hover:bg-[#f77700]/90">
//             {item ? "Save Changes" : "Add Item"}
//           </Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   )
// }
// function formatPrice(price: number | string | null | undefined): string {
//   if (price === null || price === undefined) return "N/A"
//   const numericPrice = Number(price)
//   return !isNaN(numericPrice) ? numericPrice.toFixed(2) : "N/A"
// }
// export function MenuManagement() {
//   const [menuItems, setMenuItems] = useState<MenuItem[]>([])
//   const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
//   const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
//   const [currentItem, setCurrentItem] = useState<MenuItem | null>(null)
//   const [selectedCategory, setSelectedCategory] = useState("all")
//   const [searchQuery, setSearchQuery] = useState("")
//   const { toast } = useToast()

//   useEffect(() => {
//     fetchMenuItems()
//   }, [])

//   const fetchMenuItems = async () => {
//     try {
//       const response = await fetch("/api/menu")
//       if (!response.ok) throw new Error("Failed to fetch menu items")
//       const data = await response.json()
//       setMenuItems(data)
//     } catch (error) {
//       console.error("Error fetching menu items:", error)
//       toast({
//         title: "Error",
//         description: "Failed to fetch menu items. Please try again.",
//         variant: "destructive",
//       })
//     }
//   }

//   const filteredItems = menuItems.filter((item) => {
//     const matchesCategory = selectedCategory === "all" || item.category === selectedCategory
//     const matchesSearch =
//       item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       item.description.toLowerCase().includes(searchQuery.toLowerCase())
//     return matchesCategory && matchesSearch
//   })

//   const handleAddItem = async (newItem: Omit<MenuItem, "id">) => {
//     try {
//       const formData = new FormData()
//       Object.entries(newItem).forEach(([key, value]) => {
//         formData.append(key, value)
//       })

//       const response = await fetch("/api/menu", {
//         method: "POST",
//         body: formData,
//       })
//       if (!response.ok) throw new Error("Failed to add menu item")
//       const addedItem = await response.json()
//       setMenuItems([...menuItems, addedItem])
//       setIsAddDialogOpen(false)
//       toast({
//         title: "Success",
//         description: "Menu item added successfully.",
//       })
//     } catch (error) {
//       console.error("Error adding menu item:", error)
//       toast({
//         title: "Error",
//         description: "Failed to add menu item. Please try again.",
//         variant: "destructive",
//       })
//     }
//   }

//   const handleEditItem = async (updatedItem: MenuItem) => {
//     try {
//       const formData = new FormData()
//       Object.entries(updatedItem).forEach(([key, value]) => {
//         formData.append(key, value)
//       })

//       const response = await fetch(`/api/menu/${updatedItem.id}`, {
//         method: "PUT",
//         body: formData,
//       })
//       if (!response.ok) throw new Error("Failed to update menu item")
//       const editedItem = await response.json()
//       setMenuItems(menuItems.map((item) => (item.id === editedItem.id ? editedItem : item)))
//       setIsEditDialogOpen(false)
//       toast({
//         title: "Success",
//         description: "Menu item updated successfully.",
//       })
//     } catch (error) {
//       console.error("Error updating menu item:", error)
//       toast({
//         title: "Error",
//         description: "Failed to update menu item. Please try again.",
//         variant: "destructive",
//       })
//     }
//   }

//   const handleDeleteItem = async (id: string) => {
//     try {
//       const response = await fetch(`/api/menu/${id}`, { method: "DELETE" })
//       if (!response.ok) throw new Error("Failed to delete menu item")
//       setMenuItems(menuItems.filter((item) => item.id !== id))
//       toast({
//         title: "Success",
//         description: "Menu item deleted successfully.",
//       })
//     } catch (error) {
//       console.error("Error deleting menu item:", error)
//       toast({
//         title: "Error",
//         description: "Failed to delete menu item. Please try again.",
//         variant: "destructive",
//       })
//     }
//   }

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <div className="relative w-[300px]">
//           <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
//           <Input
//             placeholder="Search menu items..."
//             className="pl-9"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//         </div>
//         <Button onClick={() => setIsAddDialogOpen(true)} className="bg-[#f77700] hover:bg-[#f77700]/90">
//           <Plus className="mr-2 h-4 w-4" /> Add New Item
//         </Button>
//       </div>

//       <ScrollArea className="w-full whitespace-nowrap">
//         <div className="flex space-x-4 p-1">
//           {categories.map((category) => (
//             <Button
//               key={category.id}
//               variant={selectedCategory === category.id ? "default" : "outline"}
//               className="rounded-full"
//               onClick={() => setSelectedCategory(category.id)}
//             >
//               <span className="mr-2">{category.icon}</span>
//               {category.name}
//             </Button>
//           ))}
//         </div>
//         <ScrollBar orientation="horizontal" />
//       </ScrollArea>

//       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//         {filteredItems.map((item) => (
//           <Card key={item.id} className="overflow-hidden">
//             <div className="aspect-square relative">
//               <img
//                 src={item.image || "/placeholder.svg"}
//                 alt={item.name}
//                 className="object-cover w-full h-full"
//                 onError={(e) => {
//                   const target = e.target as HTMLImageElement
//                   if (target.src !== "/placeholder.svg") {
//                     target.src = "/placeholder.svg"
//                   }
//                 }}
//               />
//               <div className="absolute top-2 right-2 flex gap-2">
//                 <Button
//                   variant="secondary"
//                   size="icon"
//                   className="h-8 w-8 bg-white hover:bg-gray-100"
//                   onClick={() => {
//                     setCurrentItem(item)
//                     setIsEditDialogOpen(true)
//                   }}
//                 >
//                   <Pencil className="h-4 w-4 text-gray-600" />
//                 </Button>
//                 <Button
//                   variant="secondary"
//                   size="icon"
//                   className="h-8 w-8 bg-white hover:bg-red-50"
//                   onClick={() => handleDeleteItem(item.id)}
//                 >
//                   <Trash2 className="h-4 w-4 text-red-600" />
//                 </Button>
//               </div>
//             </div>
//             <CardContent className="p-4">
//               <div className="space-y-2">
//                 <div className="flex items-center justify-between">
//                   <h3 className="font-semibold">{item.name}</h3>
//                   <span className="font-bold text-[#f77700]">฿{Number(item.price).toFixed(2)}</span>
//                 </div>
//                 <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       <AddEditItemDialog
//         isOpen={isAddDialogOpen}
//         onClose={() => setIsAddDialogOpen(false)}
//         onSave={handleAddItem}
//         item={null}
//       />
//       <AddEditItemDialog
//         isOpen={isEditDialogOpen}
//         onClose={() => setIsEditDialogOpen(false)}
//         onSave={handleEditItem}
//         item={currentItem}
//       />
//     </div>
//   )
// }

// interface AddEditItemDialogProps {
//   isOpen: boolean
//   onClose: () => void
//   onSave: (item: MenuItem) => void
//   item: MenuItem | null
// }

// function AddEditItemDialog({ isOpen, onClose, onSave, item }: AddEditItemDialogProps) {
//   const [name, setName] = useState(item?.name || "")
//   const [description, setDescription] = useState(item?.description || "")
//   const [price, setPrice] = useState(item?.price?.toString() || "")
//   const [category, setCategory] = useState(item?.category || "main")
//   const [image, setImage] = useState<File | null>(null)
//   const [previewImage, setPreviewImage] = useState(item?.image || "/placeholder.svg")
//   const fileInputRef = useRef<HTMLInputElement>(null)

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0]
//     if (file) {
//       setImage(file)
//       const reader = new FileReader()
//       reader.onloadend = () => {
//         const result = reader.result as string
//         setPreviewImage(result)
//       }
//       reader.readAsDataURL(file)
//     }
//   }

//   const handleSave = () => {
//     const newItem: Omit<MenuItem, "id"> = {
//       name,
//       description,
//       price: Number.parseFloat(price),
//       category,
//       image: typeof image === "string" ? image : previewImage || "",
//     }
//     onSave(item ? { ...newItem, id: item.id } : (newItem as MenuItem))
//     onClose()
//   }

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent className="sm:max-w-[425px]">
//         <DialogHeader>
//           <DialogTitle>{item ? "Edit Menu Item" : "Add Menu Item"}</DialogTitle>
//         </DialogHeader>
//         <div className="grid gap-4 py-4">
//           <div className="grid gap-2">
//             <Label>Image</Label>
//             <div className="flex flex-col items-center gap-4">
//               <div className="relative aspect-square w-full max-w-[200px] overflow-hidden rounded-lg border">
//                 <img
//                   src={previewImage || "/placeholder.svg"}
//                   alt="Preview"
//                   className="h-full w-full object-cover"
//                   onError={(e) => {
//                     const target = e.target as HTMLImageElement
//                     if (target.src !== "/placeholder.svg") {
//                       target.src = "/placeholder.svg"
//                     }
//                   }}
//                 />
//               </div>
//               <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
//               <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()}>
//                 Choose Image
//               </Button>
//             </div>
//           </div>
//           <div className="grid gap-2">
//             <Label htmlFor="name">Name</Label>
//             <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
//           </div>
//           <div className="grid gap-2">
//             <Label htmlFor="description">Description</Label>
//             <Input id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
//           </div>
//           <div className="grid gap-2">
//             <Label htmlFor="price">Price</Label>
//             <Input
//               id="price"
//               type="number"
//               value={price}
//               onChange={(e) => setPrice(e.target.value)}
//               step="0.01"
//               min="0"
//               placeholder="0.00"
//             />
//           </div>
//           <div className="grid gap-2">
//             <Label htmlFor="category">Category</Label>
//             <select
//               id="category"
//               value={category}
//               onChange={(e) => setCategory(e.target.value)}
//               className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
//             >
//               {categories
//                 .filter((c) => c.id !== "all")
//                 .map((category) => (
//                   <option key={category.id} value={category.id}>
//                     {category.name}
//                   </option>
//                 ))}
//             </select>
//           </div>
//         </div>
//         <DialogFooter>
//           <Button variant="outline" onClick={onClose}>
//             Cancel
//           </Button>
//           <Button onClick={handleSave} className="bg-[#f77700] hover:bg-[#f77700]/90">
//             {item ? "Save Changes" : "Add Item"}
//           </Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   )
// }



// export function MenuManagement() {
//   const [menuItems, setMenuItems] = useState<MenuItem[]>([])
//   const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
//   const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
//   const [currentItem, setCurrentItem] = useState<MenuItem | null>(null)
//   const [selectedCategory, setSelectedCategory] = useState("all")
//   const [searchQuery, setSearchQuery] = useState("")
//   const { toast } = useToast()

//   useEffect(() => {
//     fetchMenuItems()
//   }, [])

//   const fetchMenuItems = async () => {
//     try {
//       const response = await fetch("/api/menu")
//       if (!response.ok) throw new Error("Failed to fetch menu items")
//       const data = await response.json()
//       setMenuItems(data)
//     } catch (error) {
//       console.error("Error fetching menu items:", error)
//       toast({
//         title: "Error",
//         description: "Failed to fetch menu items. Please try again.",
//         variant: "destructive",
//       })
//     }
//   }

//   const filteredItems = menuItems.filter((item) => {
//     const matchesCategory = selectedCategory === "all" || item.category === selectedCategory
//     const matchesSearch =
//       item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       item.description.toLowerCase().includes(searchQuery.toLowerCase())
//     return matchesCategory && matchesSearch
//   })

//   const handleAddItem = async (newItem: Omit<MenuItem, "id">) => {
//     try {
//       const formData = new FormData()
//       Object.entries(newItem).forEach(([key, value]) => {
//         formData.append(key, value !== null && value !== undefined ? value.toString() : "")
//       })

//       const response = await fetch("/api/menu", {
//         method: "POST",
//         body: formData,
//       })
//       if (!response.ok) throw new Error("Failed to add menu item")
//       const addedItem = await response.json()
//       setMenuItems([...menuItems, addedItem])
//       setIsAddDialogOpen(false)
//       toast({
//         title: "Success",
//         description: "Menu item added successfully.",
//       })
//     } catch (error) {
//       console.error("Error adding menu item:", error)
//       toast({
//         title: "Error",
//         description: "Failed to add menu item. Please try again.",
//         variant: "destructive",
//       })
//     }
//   }

//   const handleEditItem = async (updatedItem: MenuItem) => {
//     try {
//       const formData = new FormData()
//       Object.entries(updatedItem).forEach(([key, value]) => {
//         formData.append(key, value !== null && value !== undefined ? value.toString() : "")
//       })

//       const response = await fetch(`/api/menu/${updatedItem.id}`, {
//         method: "PUT",
//         body: formData,
//       })
//       if (!response.ok) throw new Error("Failed to update menu item")
//       const editedItem = await response.json()
//       setMenuItems(menuItems.map((item) => (item.id === editedItem.id ? editedItem : item)))
//       setIsEditDialogOpen(false)
//       toast({
//         title: "Success",
//         description: "Menu item updated successfully.",
//       })
//     } catch (error) {
//       console.error("Error updating menu item:", error)
//       toast({
//         title: "Error",
//         description: "Failed to update menu item. Please try again.",
//         variant: "destructive",
//       })
//     }
//   }

//   const handleDeleteItem = async (id: string) => {
//     try {
//       const response = await fetch(`/api/menu/${id}`, { method: "DELETE" })
//       if (!response.ok) throw new Error("Failed to delete menu item")
//       setMenuItems(menuItems.filter((item) => item.id !== id))
//       toast({
//         title: "Success",
//         description: "Menu item deleted successfully.",
//       })
//     } catch (error) {
//       console.error("Error deleting menu item:", error)
//       toast({
//         title: "Error",
//         description: "Failed to delete menu item. Please try again.",
//         variant: "destructive",
//       })
//     }
//   }

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <div className="relative w-[300px]">
//           <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
//           <Input
//             placeholder="Search menu items..."
//             className="pl-9"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//         </div>
//         <Button onClick={() => setIsAddDialogOpen(true)} className="bg-[#f77700] hover:bg-[#f77700]/90">
//           <Plus className="mr-2 h-4 w-4" /> Add New Item
//         </Button>
//       </div>

//       <ScrollArea className="w-full whitespace-nowrap">
//         <div className="flex space-x-4 p-1">
//           {categories.map((category) => (
//             <Button
//               key={category.id}
//               variant={selectedCategory === category.id ? "default" : "outline"}
//               className="rounded-full"
//               onClick={() => setSelectedCategory(category.id)}
//             >
//               <span className="mr-2">{category.icon}</span>
//               {category.name}
//             </Button>
//           ))}
//         </div>
//         <ScrollBar orientation="horizontal" />
//       </ScrollArea>

//       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//         {filteredItems.map((item) => (
//           <Card key={item.id} className="overflow-hidden">
//             <div className="aspect-square relative">
//               <img
//                 src={item.image || "/placeholder.svg"}
//                 alt={item.name}
//                 className="object-cover w-full h-full"
//                 onError={(e) => {
//                   console.error("Error loading image:", item.image)
//                   const target = e.target as HTMLImageElement
//                   target.onerror = null // Prevent infinite loop
//                   target.src = "/placeholder.svg"
//                 }}
//               />
//               <div className="absolute top-2 right-2 flex gap-2">
//                 <Button
//                   variant="secondary"
//                   size="icon"
//                   className="h-8 w-8 bg-white hover:bg-gray-100"
//                   onClick={() => {
//                     setCurrentItem(item)
//                     setIsEditDialogOpen(true)
//                   }}
//                 >
//                   <Pencil className="h-4 w-4 text-gray-600" />
//                 </Button>
//                 <Button
//                   variant="secondary"
//                   size="icon"
//                   className="h-8 w-8 bg-white hover:bg-red-50"
//                   onClick={() => handleDeleteItem(item.id)}
//                 >
//                   <Trash2 className="h-4 w-4 text-red-600" />
//                 </Button>
//               </div>
//             </div>
//             <CardContent className="p-4">
//               <div className="space-y-2">
//                 <div className="flex items-center justify-between">
//                   <h3 className="font-semibold">{item.name}</h3>
//                   <span className="font-bold text-[#f77700]">฿{Number(item.price).toFixed(2)}</span>
//                 </div>
//                 <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       <AddEditItemDialog
//         isOpen={isAddDialogOpen}
//         onClose={() => setIsAddDialogOpen(false)}
//         onSave={handleAddItem}
//         item={null}
//       />
//       <AddEditItemDialog
//         isOpen={isEditDialogOpen}
//         onClose={() => setIsEditDialogOpen(false)}
//         onSave={handleEditItem}
//         item={currentItem}
//       />
//     </div>
//   )
// }

// interface AddEditItemDialogProps {
//   isOpen: boolean
//   onClose: () => void
//   onSave: (item: MenuItem) => void
//   item: MenuItem | null
// }

// function AddEditItemDialog({ isOpen, onClose, onSave, item }: AddEditItemDialogProps) {
//   const [name, setName] = useState(item?.name || "")
//   const [description, setDescription] = useState(item?.description || "")
//   const [price, setPrice] = useState(item?.price?.toString() || "")
//   const [category, setCategory] = useState(item?.category || "main")
//   const [image, setImage] = useState<File | null>(null)
//   const [previewImage, setPreviewImage] = useState<string>(item?.image || "/placeholder.svg")
//   const fileInputRef = useRef<HTMLInputElement>(null)

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0]
//     if (file) {
//       setImage(file)
//       const reader = new FileReader()
//       reader.onloadend = () => {
//         const result = reader.result as string
//         setPreviewImage(result)
//       }
//       reader.readAsDataURL(file)
//     }
//   }

//   const handleSave = () => {
//     const newItem: Omit<MenuItem, "id"> = {
//       name,
//       description,
//       price: Number.parseFloat(price),
//       category,
//       image: typeof image === "string" ? image : previewImage || "",
//     }
//     onSave(item ? { ...newItem, id: item.id } : (newItem as MenuItem))
//     onClose()
//   }

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent className="sm:max-w-[425px]">
//         <DialogHeader>
//           <DialogTitle>{item ? "Edit Menu Item" : "Add Menu Item"}</DialogTitle>
//         </DialogHeader>
//         <div className="grid gap-4 py-4">
//           <div className="grid gap-2">
//             <Label>Image</Label>
//             <div className="flex flex-col items-center gap-4">
//               <div className="relative aspect-square w-full max-w-[200px] overflow-hidden rounded-lg border">
//                 <img
//                   src={previewImage || "/placeholder.svg"}
//                   alt="Preview"
//                   className="h-full w-full object-cover"
//                   onError={(e) => {
//                     console.error("Error loading preview image:", previewImage)
//                     const target = e.target as HTMLImageElement
//                     target.onerror = null // Prevent infinite loop
//                     target.src = "/placeholder.svg"
//                   }}
//                 />
//               </div>
//               <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
//               <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()}>
//                 Choose Image
//               </Button>
//             </div>
//           </div>
//           <div className="grid gap-2">
//             <Label htmlFor="name">Name</Label>
//             <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
//           </div>
//           <div className="grid gap-2">
//             <Label htmlFor="description">Description</Label>
//             <Input id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
//           </div>
//           <div className="grid gap-2">
//             <Label htmlFor="price">Price</Label>
//             <Input
//               id="price"
//               type="number"
//               value={price}
//               onChange={(e) => setPrice(e.target.value)}
//               step="0.01"
//               min="0"
//               placeholder="0.00"
//             />
//           </div>
//           <div className="grid gap-2">
//             <Label htmlFor="category">Category</Label>
//             <select
//               id="category"
//               value={category}
//               onChange={(e) => setCategory(e.target.value)}
//               className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
//             >
//               {categories
//                 .filter((c) => c.id !== "all")
//                 .map((category) => (
//                   <option key={category.id} value={category.id}>
//                     {category.name}
//                   </option>
//                 ))}
//             </select>
//           </div>
//         </div>
//         <DialogFooter>
//           <Button variant="outline" onClick={onClose}>
//             Cancel
//           </Button>
//           <Button onClick={handleSave} className="bg-[#f77700] hover:bg-[#f77700]/90">
//             {item ? "Save Changes" : "Add Item"}
//           </Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   )
// }

// const PLACEHOLDER_IMAGE = "/placeholder.svg"

// export function MenuManagement() {
//   const [menuItems, setMenuItems] = useState<MenuItem[]>([])
//   const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
//   const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
//   const [currentItem, setCurrentItem] = useState<MenuItem | null>(null)
//   const [selectedCategory, setSelectedCategory] = useState("all")
//   const [searchQuery, setSearchQuery] = useState("")
//   const { toast } = useToast()

//   useEffect(() => {
//     fetchMenuItems()
//   }, [])

//   const fetchMenuItems = async () => {
//     try {
//       const response = await fetch("/api/menu")
//       if (!response.ok) throw new Error("Failed to fetch menu items")
//       const data = await response.json()
//       setMenuItems(data)
//     } catch (error) {
//       console.error("Error fetching menu items:", error)
//       toast({
//         title: "Error",
//         description: "Failed to fetch menu items. Please try again.",
//         variant: "destructive",
//       })
//     }
//   }

//   const filteredItems = menuItems.filter((item) => {
//     const matchesCategory = selectedCategory === "all" || item.category === selectedCategory
//     const matchesSearch =
//       item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       item.description.toLowerCase().includes(searchQuery.toLowerCase())
//     return matchesCategory && matchesSearch
//   })

//    const handleAddItem = async (newItem: Omit<MenuItem, "id">) => {
//     try {
//       const formData = new FormData()
//       Object.entries(newItem).forEach(([key, value]) => {
//         if (key === "image" && value instanceof File) {
//           formData.append(key, value)
//         } else if (typeof value === "string" || typeof value === "number") {
//           formData.append(key, String(value))
//         }
//       })
     


//       const response = await fetch("/api/menu", {
//         method: "POST",
//         body: formData,
//       })
//       if (!response.ok) throw new Error("Failed to add menu item")
//       const addedItem = await response.json()
//       setMenuItems([...menuItems, addedItem])
//       setIsAddDialogOpen(false)
//       toast({
//         title: "Success",
//         description: "Menu item added successfully.",
//       })
//     } catch (error) {
//       console.error("Error adding menu item:", error)
//       toast({
//         title: "Error",
//         description: "Failed to add menu item. Please try again.",
//         variant: "destructive",
//       })
//     }
//   }

//   const handleEditItem = async (updatedItem: MenuItem) => {
//     try {
//       const formData = new FormData()
//       Object.entries(updatedItem).forEach(([key, value]) => {
//         if (key === "image" && value instanceof File) {
//           formData.append(key, value)
//         } else {
//           formData.append(key, value !== null && value !== undefined ? value.toString() : "")
//         }
//       })

//       const response = await fetch(`/api/menu/${updatedItem.id}`, {
//         method: "PUT",
//         body: formData,
//       })
//       if (!response.ok) throw new Error("Failed to update menu item")
//       const editedItem = await response.json()
//       setMenuItems(menuItems.map((item) => (item.id === editedItem.id ? editedItem : item)))
//       setIsEditDialogOpen(false)
//       toast({
//         title: "Success",
//         description: "Menu item updated successfully.",
//       })
//     } catch (error) {
//       console.error("Error updating menu item:", error)
//       toast({
//         title: "Error",
//         description: "Failed to update menu item. Please try again.",
//         variant: "destructive",
//       })
//     }
//   }

//   const handleDeleteItem = async (id: string) => {
//     try {
//       const response = await fetch(`/api/menu/${id}`, { method: "DELETE" })
//       if (!response.ok) throw new Error("Failed to delete menu item")
//       setMenuItems(menuItems.filter((item) => item.id !== id))
//       toast({
//         title: "Success",
//         description: "Menu item deleted successfully.",
//       })
//     } catch (error) {
//       console.error("Error deleting menu item:", error)
//       toast({
//         title: "Error",
//         description: "Failed to delete menu item. Please try again.",
//         variant: "destructive",
//       })
//     }
//   }

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <div className="relative w-[300px]">
//           <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
//           <Input
//             placeholder="Search menu items..."
//             className="pl-9"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//         </div>
//         <Button onClick={() => setIsAddDialogOpen(true)} className="bg-[#f77700] hover:bg-[#f77700]/90">
//           <Plus className="mr-2 h-4 w-4" /> Add New Item
//         </Button>
//       </div>

//       <ScrollArea className="w-full whitespace-nowrap">
//         <div className="flex space-x-4 p-1">
//           {categories.map((category) => (
//             <Button
//               key={category.id}
//               variant={selectedCategory === category.id ? "default" : "outline"}
//               className="rounded-full"
//               onClick={() => setSelectedCategory(category.id)}
//             >
//               <span className="mr-2">{category.icon}</span>
//               {category.name}
//             </Button>
//           ))}
//         </div>
//         <ScrollBar orientation="horizontal" />
//       </ScrollArea>

//       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//         {filteredItems.map((item) => (
//           <Card key={item.id} className="overflow-hidden">
//             <div className="aspect-square relative">
//               <Image src={item.image || PLACEHOLDER_IMAGE} alt={item.name} fill style={{ objectFit: "cover" }} />
              

//               <div className="absolute top-2 right-2 flex gap-2">
//                 <Button
//                   variant="secondary"
//                   size="icon"
//                   className="h-8 w-8 bg-white hover:bg-gray-100"
//                   onClick={() => {
//                     setCurrentItem(item)
//                     setIsEditDialogOpen(true)
//                   }}
//                 >
//                   <Pencil className="h-4 w-4 text-gray-600" />
//                 </Button>
//                 <Button
//                   variant="secondary"
//                   size="icon"
//                   className="h-8 w-8 bg-white hover:bg-red-50"
//                   onClick={() => handleDeleteItem(item.id)}
//                 >
//                   <Trash2 className="h-4 w-4 text-red-600" />
//                 </Button>
//               </div>
//             </div>
//             <CardContent className="p-4">
//               <div className="space-y-2">
//                 <div className="flex items-center justify-between">
//                   <h3 className="font-semibold">{item.name}</h3>
//                   <span className="font-bold text-[#f77700]">฿{Number(item.price).toFixed(2)}</span>
//                 </div>
//                 <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       <AddEditItemDialog
//         isOpen={isAddDialogOpen}
//         onClose={() => setIsAddDialogOpen(false)}
//         onSave={handleAddItem}
//         item={null}
//       />
//       <AddEditItemDialog
//         isOpen={isEditDialogOpen}
//         onClose={() => setIsEditDialogOpen(false)}
//         onSave={handleEditItem}
//         item={currentItem}
//       />
//     </div>
//   )
// }

// interface AddEditItemDialogProps {
//   isOpen: boolean
//   onClose: () => void
//   onSave: (item: MenuItem) => void
//   item: MenuItem | null
// }

// function AddEditItemDialog({ isOpen, onClose, onSave, item }: AddEditItemDialogProps) {
//   const [name, setName] = useState(item?.name || "")
//   const [description, setDescription] = useState(item?.description || "")
//   const [price, setPrice] = useState(item?.price?.toString() || "")
//   const [category, setCategory] = useState(item?.category || "main")
//   const [image, setImage] = useState<File | null>(null)
//   const [previewImage, setPreviewImage] = useState<string>(
//     item?.image instanceof File ? URL.createObjectURL(item.image) : (item?.image as string) || PLACEHOLDER_IMAGE,
//   )
  
//   const [isDragging, setIsDragging] = useState(false)
//   const fileInputRef = useRef<HTMLInputElement>(null)
//   const { toast } = useToast()

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0]
//     if (file) {
//       handleFile(file)
//     }
//   }

//   const handleFile = (file: File) => {
//     if (file.size > 10 * 1024 * 1024) {
//       toast({
//         title: "Error",
//         description: "File size should not exceed 10MB",
//         variant: "destructive",
//       })
//       return
//     }
//     setImage(file)
//     const reader = new FileReader()
//     reader.onloadend = () => {
//       setPreviewImage(reader.result as string)
//     }
//     reader.readAsDataURL(file)
//   }

//   const handleDragOver = (e: React.DragEvent) => {
//     e.preventDefault()
//     setIsDragging(true)
//   }

//   const handleDragLeave = (e: React.DragEvent) => {
//     e.preventDefault()
//     setIsDragging(false)
//   }

//   const handleDrop = (e: React.DragEvent) => {
//     e.preventDefault()
//     setIsDragging(false)
//     const file = e.dataTransfer.files[0]
//     if (file && file.type.startsWith("image/")) {
//       handleFile(file)
//     } else {
//       toast({
//         title: "Error",
//         description: "Please upload an image file",
//         variant: "destructive",
//       })
//     }
//   }

//   const handleSave = () => {
//     const newItem: Omit<MenuItem, "id"> = {
//       name,
//       description,
//       price: Number.parseFloat(price),
//       category,
//       image: image ? URL.createObjectURL(image) : (item?.image as string) || "",
//     }
//     onSave(item ? { ...newItem, id: item.id } : (newItem as MenuItem))
//     onClose()
//   }

//   return (
//     <Dialog open={isOpen} onOpenChange={onClose}>
//       <DialogContent className="sm:max-w-[425px]">
//         <DialogHeader>
//           <DialogTitle>{item ? "Edit Menu Item" : "Add Menu Item"}</DialogTitle>
//         </DialogHeader>
//         <div className="grid gap-4 py-4">
//           <div className="grid gap-2">
//             <Label>Image</Label>
//             <div
//               className={`flex flex-col items-center gap-4 p-4 border-2 border-dashed rounded-lg ${isDragging ? "border-primary bg-primary/10" : "border-gray-300"
//                 }`}
//               onDragOver={handleDragOver}
//               onDragLeave={handleDragLeave}
//               onDrop={handleDrop}
//             >
//               <div className="relative w-full max-w-[200px] aspect-square">
//                 <Image
//                   src={previewImage || PLACEHOLDER_IMAGE}
//                   alt="Preview"
//                   fill
//                   style={{ objectFit: "cover" }}
//                   className="rounded-lg"
//                 />
//               </div>
//               <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
//               <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()}>
//                 Choose Image
//               </Button>
//             </div>
//           </div>
//           <div className="grid gap-2">
//             <Label htmlFor="name">Name</Label>
//             <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
//           </div>
//           <div className="grid gap-2">
//             <Label htmlFor="description">Description</Label>
//             <Input id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
//           </div>
//           <div className="grid gap-2">
//             <Label htmlFor="price">Price</Label>
//             <Input
//               id="price"
//               type="number"
//               value={price}
//               onChange={(e) => setPrice(e.target.value)}
//               step="0.01"
//               min="0"
//               placeholder="0.00"
//             />
//           </div>
//           <div className="grid gap-2">
//             <Label htmlFor="category">Category</Label>
//             <select
//               id="category"
//               value={category}
//               onChange={(e) => setCategory(e.target.value)}
//               className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
//             >
//               {categories
//                 .filter((c) => c.id !== "all")
//                 .map((category) => (
//                   <option key={category.id} value={category.id}>
//                     {category.name}
//                   </option>
//                 ))}
//             </select>
//           </div>
//         </div>
//         <DialogFooter>
//           <Button variant="outline" onClick={onClose}>
//             Cancel
//           </Button>
//           <Button onClick={handleSave} className="bg-[#f77700] hover:bg-[#f77700]/90">
//             {item ? "Save Changes" : "Add Item"}
//           </Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   )
// }
const PLACEHOLDER_IMAGE = "/placeholder.svg"

export function MenuManagement() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [currentItem, setCurrentItem] = useState<MenuItem | null>(null)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const { toast } = useToast()

  useEffect(() => {
    fetchMenuItems()
  }, [])

  const fetchMenuItems = async () => {
    try {
      const response = await fetch("/api/menu")
      if (!response.ok) throw new Error("Failed to fetch menu items")
      const data = await response.json()
      setMenuItems(data)
    } catch (error) {
      console.error("Error fetching menu items:", error)
      toast({
        title: "Error",
        description: "Failed to fetch menu items. Please try again.",
        variant: "destructive",
      })
    }
  }

  const filteredItems = menuItems.filter((item) => {
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })
  const getImageSrc = (image: string | File): string => {
    if (typeof image === 'string') {
      return image;
    }
    return URL.createObjectURL(image);
  };

  const handleAddItem = async (newItem: Omit<MenuItem, "id">) => {
    try {
      const formData = new FormData()
      Object.entries(newItem).forEach(([key, value]) => {
        if (key === "image" && value instanceof File) {
          formData.append(key, value)
        } else if (typeof value === "string" || typeof value === "number") {
          formData.append(key, String(value))
        }
      })

      const response = await fetch("/api/menu", {
        method: "POST",
        body: formData,
      })
      if (!response.ok) throw new Error("Failed to add menu item")
      const addedItem = await response.json()
      setMenuItems([...menuItems, addedItem])
      setIsAddDialogOpen(false)
      toast({
        title: "Success",
        description: "Menu item added successfully.",
      })
    } catch (error) {
      console.error("Error adding menu item:", error)
      toast({
        title: "Error",
        description: "Failed to add menu item. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleEditItem = async (updatedItem: MenuItem) => {
    try {
      const formData = new FormData()
      Object.entries(updatedItem).forEach(([key, value]) => {
        if (key === "image" && value instanceof File) {
          formData.append(key, value)
        } else if (typeof value === "string" || typeof value === "number") {
          formData.append(key, String(value))
        }
      })

      const response = await fetch(`/api/menu/${updatedItem.id}`, {
        method: "PUT",
        body: formData,
      })
      if (!response.ok) throw new Error("Failed to update menu item")
      const editedItem = await response.json()
      setMenuItems(menuItems.map((item) => (item.id === editedItem.id ? editedItem : item)))
      setIsEditDialogOpen(false)
      toast({
        title: "Success",
        description: "Menu item updated successfully.",
      })
    } catch (error) {
      console.error("Error updating menu item:", error)
      toast({
        title: "Error",
        description: "Failed to update menu item. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleDeleteItem = async (id: string) => {
    try {
      const response = await fetch(`/api/menu/${id}`, { method: "DELETE" })
      if (!response.ok) throw new Error("Failed to delete menu item")
      setMenuItems(menuItems.filter((item) => item.id !== id))
      toast({
        title: "Success",
        description: "Menu item deleted successfully.",
      })
    } catch (error) {
      console.error("Error deleting menu item:", error)
      toast({
        title: "Error",
        description: "Failed to delete menu item. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="relative w-[300px]">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search menu items..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button onClick={() => setIsAddDialogOpen(true)} className="bg-[#f77700] hover:bg-[#f77700]/90">
          <Plus className="mr-2 h-4 w-4" /> Add New Item
        </Button>
      </div>

      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex space-x-4 p-1">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              className="rounded-full"
              onClick={() => setSelectedCategory(category.id)}
            >
              <span className="mr-2">{category.icon}</span>
              {category.name}
            </Button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredItems.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            <div className="aspect-square relative">
            <Image
                src={getImageSrc(item.image) || PLACEHOLDER_IMAGE}
                alt={item.name}
                fill
                style={{ objectFit: "cover" }}
              />
          <div className="absolute top-2 right-2 flex gap-2">
                <Button
                  variant="secondary"
                  size="icon"
                  className="h-8 w-8 bg-white hover:bg-gray-100"
                  onClick={() => {
                    setCurrentItem(item)
                    setIsEditDialogOpen(true)
                  }}
                >
                  <Pencil className="h-4 w-4 text-gray-600" />
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  className="h-8 w-8 bg-white hover:bg-red-50"
                  onClick={() => handleDeleteItem(item.id)}
                >
                  <Trash2 className="h-4 w-4 text-red-600" />
                </Button>
              </div>
            </div>
            <CardContent className="p-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{item.name}</h3>
                  <span className="font-bold text-[#f77700]">฿{Number(item.price).toFixed(2)}</span>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <AddEditItemDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onSave={handleAddItem}
        item={null}
      />
      <AddEditItemDialog
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        onSave={handleEditItem}
        item={currentItem}
      />
    </div>
  )
}

interface AddEditItemDialogProps {
  isOpen: boolean
  onClose: () => void
  onSave: (item: MenuItem) => void
  item: MenuItem | null
}

function AddEditItemDialog({ isOpen, onClose, onSave, item }: AddEditItemDialogProps) {
  const [name, setName] = useState(item?.name || "")
  const [description, setDescription] = useState(item?.description || "")
  const [price, setPrice] = useState(item?.price?.toString() || "")
  const [category, setCategory] = useState(item?.category || "main")
  const [image, setImage] = useState<File | null>(null)
  const [previewImage, setPreviewImage] = useState<string>(
    item?.image && typeof item.image === "string" ? item.image : PLACEHOLDER_IMAGE,
  )
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFile(file)
    }
  }

  const handleFile = (file: File) => {
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "Error",
        description: "File size should not exceed 10MB",
        variant: "destructive",
      })
      return
    }
    setImage(file)
    setPreviewImage(URL.createObjectURL(file))
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith("image/")) {
      handleFile(file)
    } else {
      toast({
        title: "Error",
        description: "Please upload an image file",
        variant: "destructive",
      })
    }
  }

  const handleSave = () => {
    const newItem: Omit<MenuItem, "id"> = {
      name,
      description,
      price: Number.parseFloat(price),
      category,
      image: image instanceof File ? image : item?.image || "",
    }
    onSave(item ? { ...newItem, id: item.id } : (newItem as MenuItem))
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{item ? "Edit Menu Item" : "Add Menu Item"}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label>Image</Label>
            <div
              className={`flex flex-col items-center gap-4 p-4 border-2 border-dashed rounded-lg ${
                isDragging ? "border-primary bg-primary/10" : "border-gray-300"
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="relative w-full max-w-[200px] aspect-square">
                <Image
                  src={typeof previewImage === "string" ? previewImage : PLACEHOLDER_IMAGE}
                  alt="Preview"
                  fill
                  style={{ objectFit: "cover" }}
                  className="rounded-lg"
                />
              </div>
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
              <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()}>
                Choose Image
              </Button>
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Input id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              step="0.01"
              min="0"
              placeholder="0.00"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="category">Category</Label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {categories
                .filter((c) => c.id !== "all")
                .map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
            </select>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} className="bg-[#f77700] hover:bg-[#f77700]/90">
            {item ? "Save Changes" : "Add Item"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}




