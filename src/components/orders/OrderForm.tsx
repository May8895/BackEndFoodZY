"use client"

import { useState, useEffect } from "react"
import { Button } from "@/src/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { useToast } from "@/src/components/ui/use-toast"
import { Plus, Minus, Trash2 ,ShoppingCart } from "lucide-react"
import Image from "next/image"


// interface MenuItem {
//     id: string
//     name: string
//     price: number
//     category: string
//   }
  
//   interface OrderItem extends MenuItem {
//     quantity: number
//   }
  
//   export function OrderForm({ onOrderPlaced }: { onOrderPlaced: () => void }) {
//     const [menuItems, setMenuItems] = useState<MenuItem[]>([])
//     const [orderItems, setOrderItems] = useState<OrderItem[]>([])
//     const [tableNumber, setTableNumber] = useState("")
//     const { toast } = useToast()
  
//     useEffect(() => {
//       fetchMenuItems()
//     }, [])
  
//     const fetchMenuItems = async () => {
//       try {
//         const response = await fetch("/api/menu")
//         if (!response.ok) throw new Error("Failed to fetch menu items")
//         const data = await response.json()
//         setMenuItems(data)
//       } catch (error) {
//         console.error("Error fetching menu items:", error)
//         toast({
//           title: "Error",
//           description: "Failed to fetch menu items. Please try again.",
//           variant: "destructive",
//         })
//       }
//     }
  
//     const addToOrder = (item: MenuItem) => {
//       setOrderItems((prevItems) => {
//         const existingItem = prevItems.find((i) => i.id === item.id)
//         if (existingItem) {
//           return prevItems.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i))
//         }
//         return [...prevItems, { ...item, quantity: 1 }]
//       })
//     }
  
//     const removeFromOrder = (itemId: string) => {
//       setOrderItems((prevItems) =>
//         prevItems
//           .map((item) => (item.id === itemId ? { ...item, quantity: Math.max(0, item.quantity - 1) } : item))
//           .filter((item) => item.quantity > 0),
//       )
//     }
  
//     const calculateTotal = () => {
//       return orderItems.reduce((total, item) => total + item.price * item.quantity, 0)
//     }
  
//     const placeOrder = async () => {
//       if (!tableNumber) {
//         toast({
//           title: "Error",
//           description: "Please enter a table number.",
//           variant: "destructive",
//         })
//         return
//       }
  
//       if (orderItems.length === 0) {
//         toast({
//           title: "Error",
//           description: "Please add items to your order.",
//           variant: "destructive",
//         })
//         return
//       }
  
//       try {
//         const response = await fetch("/api/orders", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             table_number: tableNumber,
//             items: orderItems,
//           }),
//         })
  
//         if (!response.ok) throw new Error("Failed to place order")
  
//         toast({
//           title: "Success",
//           description: "Order placed successfully!",
//         })
  
//         // Reset the form
//         setOrderItems([])
//         setTableNumber("")
//         onOrderPlaced()
//       } catch (error) {
//         console.error("Error placing order:", error)
//         toast({
//           title: "Error",
//           description: "Failed to place order. Please try again.",
//           variant: "destructive",
//         })
//       }
//     }
  
//     return (
//       <div className="space-y-6">
//         <h2 className="text-2xl font-bold">Place an Order</h2>
//         <div className="grid gap-6 md:grid-cols-2">
//           <Card>
//             <CardHeader>
//               <CardTitle>Menu Items</CardTitle>
//             </CardHeader>
//             <CardContent className="grid gap-4">
//               {menuItems.map((item) => (
//                 <div key={item.id} className="flex items-center justify-between">
//                   <div>
//                     <p className="font-medium">{item.name}</p>
//                     <p className="text-sm text-gray-500">฿{item.price.toFixed(2)}</p>
//                   </div>
//                   <Button size="sm" onClick={() => addToOrder(item)}>
//                     <Plus className="h-4 w-4" />
//                   </Button>
//                 </div>
//               ))}
//             </CardContent>
//           </Card>
//           <Card>
//             <CardHeader>
//               <CardTitle>Your Order</CardTitle>
//             </CardHeader>
//             <CardContent className="grid gap-4">
//               <div className="grid gap-2">
//                 <Label htmlFor="tableNumber">Table Number</Label>
//                 <Input
//                   id="tableNumber"
//                   value={tableNumber}
//                   onChange={(e) => setTableNumber(e.target.value)}
//                   placeholder="Enter table number"
//                 />
//               </div>
//               {orderItems.map((item) => (
//                 <div key={item.id} className="flex items-center justify-between">
//                   <div>
//                     <p className="font-medium">{item.name}</p>
//                     <p className="text-sm text-gray-500">
//                       ฿{item.price.toFixed(2)} x {item.quantity}
//                     </p>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <Button size="sm" variant="outline" onClick={() => removeFromOrder(item.id)}>
//                       <Minus className="h-4 w-4" />
//                     </Button>
//                     <span>{item.quantity}</span>
//                     <Button size="sm" variant="outline" onClick={() => addToOrder(item)}>
//                       <Plus className="h-4 w-4" />
//                     </Button>
//                   </div>
//                 </div>
//               ))}
//               {orderItems.length > 0 && (
//                 <div className="flex items-center justify-between font-bold">
//                   <span>Total:</span>
//                   <span>฿{calculateTotal().toFixed(2)}</span>
//                 </div>
//               )}
//               <Button onClick={placeOrder} disabled={orderItems.length === 0 || !tableNumber}>
//                 Place Order
//               </Button>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     )
//   }
  

// interface MenuItem {
//     id: string
//     name: string
//     price: number
//     category: string
//   }
  
//   interface OrderItem extends MenuItem {
//     quantity: number
//   }
  
//   export function OrderForm({ onOrderPlaced }: { onOrderPlaced: () => void }) {
//     const [menuItems, setMenuItems] = useState<MenuItem[]>([])
//     const [orderItems, setOrderItems] = useState<OrderItem[]>([])
//     const [tableNumber, setTableNumber] = useState("")
//     const { toast } = useToast()
  
//     useEffect(() => {
//       fetchMenuItems()
//     }, [])
  
//     const fetchMenuItems = async () => {
//       try {
//         const response = await fetch("/api/menu")
//         if (!response.ok) throw new Error("Failed to fetch menu items")
//         const data = await response.json()
//         setMenuItems(
//             data.map((item: MenuItem) => ({
//               ...item,
//               price: Number(item.price),
//             })),
//           )
//       } catch (error) {
//         console.error("Error fetching menu items:", error)
//         toast({
//           title: "Error",
//           description: "Failed to fetch menu items. Please try again.",
//           variant: "destructive",
//         })
//       }
//     }
  
//     const addToOrder = (item: MenuItem) => {
//       setOrderItems((prevItems) => {
//         const existingItem = prevItems.find((i) => i.id === item.id)
//         if (existingItem) {
//           return prevItems.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i))
//         }
//         return [...prevItems, { ...item, quantity: 1 }]
//       })
//     }
  
//     const removeFromOrder = (itemId: string) => {
//       setOrderItems((prevItems) =>
//         prevItems
//           .map((item) => (item.id === itemId ? { ...item, quantity: Math.max(0, item.quantity - 1) } : item))
//           .filter((item) => item.quantity > 0),
//       )
//     }
  
//     const calculateTotal = () => {
//       return orderItems.reduce(
//         (total, item) => total + (typeof item.price === "number" ? item.price * item.quantity : 0),
//         0,
//       )
//     }
  
//     const placeOrder = async () => {
//       if (!tableNumber) {
//         toast({
//           title: "Error",
//           description: "Please enter a table number.",
//           variant: "destructive",
//         })
//         return
//       }
  
//       if (orderItems.length === 0) {
//         toast({
//           title: "Error",
//           description: "Please add items to your order.",
//           variant: "destructive",
//         })
//         return
//       }
  
//       try {
//         const response = await fetch("/api/orders", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             table_number: tableNumber,
//             items: orderItems,
//           }),
//         })
  
//         if (!response.ok) throw new Error("Failed to place order")
  
//         toast({
//           title: "Success",
//           description: "Order placed successfully!",
//         })
  
//         // Reset the form
//         setOrderItems([])
//         setTableNumber("")
//         onOrderPlaced()
//       } catch (error) {
//         console.error("Error placing order:", error)
//         toast({
//           title: "Error",
//           description: "Failed to place order. Please try again.",
//           variant: "destructive",
//         })
//       }
//     }
  
//     return (
//       <div className="space-y-6">
//         <h2 className="text-2xl font-bold">Place an Order</h2>
//         <div className="grid gap-6 md:grid-cols-2">
//           <Card>
//             <CardHeader>
//               <CardTitle>Menu Items</CardTitle>
//             </CardHeader>
//             <CardContent className="grid gap-4">
//               {menuItems.map((item) => (
//                 <div key={item.id} className="flex items-center justify-between">
//                   <div>
//                     <p className="font-medium">{item.name}</p>
//                     <p className="text-sm text-gray-500">
//                       ฿{typeof item.price === "number" ? item.price.toFixed(2) : "N/A"}
//                     </p>
//                   </div>
//                   <Button size="sm" onClick={() => addToOrder(item)}>
//                     <Plus className="h-4 w-4" />
//                   </Button>
//                 </div>
//               ))}
//             </CardContent>
//           </Card>
//           <Card>
//             <CardHeader>
//               <CardTitle>Your Order</CardTitle>
//             </CardHeader>
//             <CardContent className="grid gap-4">
//               <div className="grid gap-2">
//                 <Label htmlFor="tableNumber">Table Number</Label>
//                 <Input
//                   id="tableNumber"
//                   value={tableNumber}
//                   onChange={(e) => setTableNumber(e.target.value)}
//                   placeholder="Enter table number"
//                 />
//               </div>
//               {orderItems.map((item) => (
//                 <div key={item.id} className="flex items-center justify-between">
//                   <div>
//                     <p className="font-medium">{item.name}</p>
//                     <p className="text-sm text-gray-500">
//                       ฿{typeof item.price === "number" ? (item.price * item.quantity).toFixed(2) : "N/A"} x{" "}
//                       {item.quantity}
//                     </p>
//                   </div>
//                   <div className="flex items-center gap-2">
//                     <Button size="sm" variant="outline" onClick={() => removeFromOrder(item.id)}>
//                       <Minus className="h-4 w-4" />
//                     </Button>
//                     <span>{item.quantity}</span>
//                     <Button size="sm" variant="outline" onClick={() => addToOrder(item)}>
//                       <Plus className="h-4 w-4" />
//                     </Button>
//                   </div>
//                 </div>
//               ))}
//               {orderItems.length > 0 && (
//                 <div className="flex items-center justify-between font-bold">
//                   <span>Total:</span>
//                   <span>฿{calculateTotal().toFixed(2)}</span>
//                 </div>
//               )}
//               <Button onClick={placeOrder} disabled={orderItems.length === 0 || !tableNumber}>
//                 Place Order
//               </Button>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     )
//   }

interface MenuItem {
    id: string
    name: string
    price: number
    category: string
    image: string
    description: string
  }
  
  interface OrderItem extends MenuItem {
    quantity: number
  }
  
  const PLACEHOLDER_IMAGE = "/placeholder.svg"
  
  export function OrderForm({ onOrderPlaced }: { onOrderPlaced: () => void }) {
    const [menuItems, setMenuItems] = useState<MenuItem[]>([])
    const [orderItems, setOrderItems] = useState<OrderItem[]>([])
    const [tableNumber, setTableNumber] = useState("")
    const { toast } = useToast()
  
    useEffect(() => {
      fetchMenuItems()
    }, [])
  
    const fetchMenuItems = async () => {
      try {
        const response = await fetch("/api/menu")
        if (!response.ok) throw new Error("Failed to fetch menu items")
        const data = await response.json()
        setMenuItems(
          data.map((item: MenuItem) => ({
            ...item,
            price: Number(item.price),
          })),
        )
      } catch (error) {
        console.error("Error fetching menu items:", error)
        toast({
          title: "Error",
          description: "Failed to fetch menu items. Please try again.",
          variant: "destructive",
        })
      }
    }
  
    const addToOrder = (item: MenuItem) => {
      setOrderItems((prevItems) => {
        const existingItem = prevItems.find((i) => i.id === item.id)
        if (existingItem) {
          return prevItems.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i))
        }
        return [...prevItems, { ...item, quantity: 1 }]
      })
    }
  
    const removeFromOrder = (itemId: string) => {
      setOrderItems((prevItems) =>
        prevItems
          .map((item) => (item.id === itemId ? { ...item, quantity: Math.max(0, item.quantity - 1) } : item))
          .filter((item) => item.quantity > 0),
      )
    }
  
    const calculateTotal = () => {
      return orderItems.reduce(
        (total, item) => total + (typeof item.price === "number" ? item.price * item.quantity : 0),
        0,
      )
    }
  
    const placeOrder = async () => {
      if (!tableNumber) {
        toast({
          title: "Error",
          description: "Please enter a table number.",
          variant: "destructive",
        })
        return
      }
  
      if (orderItems.length === 0) {
        toast({
          title: "Error",
          description: "Please add items to your order.",
          variant: "destructive",
        })
        return
      }
  
      try {
        const response = await fetch("/api/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            table_number: tableNumber,
            items: orderItems,
          }),
        })
  
        if (!response.ok) throw new Error("Failed to place order")
  
        toast({
          title: "Success",
          description: "Order placed successfully!",
        })
  
        // Reset the form
        setOrderItems([])
        setTableNumber("")
        onOrderPlaced()
      } catch (error) {
        console.error("Error placing order:", error)
        toast({
          title: "Error",
          description: "Failed to place order. Please try again.",
          variant: "destructive",
        })
      }
    }
  
    return (
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-center mb-8">Restaurant Menu</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <div className="grid gap-6 md:grid-cols-2">
              {menuItems.map((item) => (
                <Card key={item.id} className="overflow-hidden">
                  <div className="relative h-48 w-full">
                    <Image src={item.image || PLACEHOLDER_IMAGE} alt={item.name} fill style={{ objectFit: "cover" }} />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold text-lg mb-2">{item.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-lg">
                        ฿{typeof item.price === "number" ? item.price.toFixed(2) : "N/A"}
                      </span>
                      <Button size="sm" onClick={() => addToOrder(item)}>
                        Add to Order
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          <div>
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <ShoppingCart className="mr-2" />
                  Your Order
                </CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="tableNumber">Table Number</Label>
                  <Input
                    id="tableNumber"
                    value={tableNumber}
                    onChange={(e) => setTableNumber(e.target.value)}
                    placeholder="Enter table number"
                  />
                </div>
                {orderItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="relative w-12 h-12 mr-4 rounded-md overflow-hidden">
                        <Image
                          src={item.image || PLACEHOLDER_IMAGE}
                          alt={item.name}
                          fill
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-500">
                          ฿{typeof item.price === "number" ? (item.price * item.quantity).toFixed(2) : "N/A"} x{" "}
                          {item.quantity}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline" onClick={() => removeFromOrder(item.id)}>
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span>{item.quantity}</span>
                      <Button size="sm" variant="outline" onClick={() => addToOrder(item)}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                {orderItems.length > 0 && (
                  <div className="flex items-center justify-between font-bold text-lg mt-4">
                    <span>Total:</span>
                    <span>฿{calculateTotal().toFixed(2)}</span>
                  </div>
                )}
                <Button onClick={placeOrder} disabled={orderItems.length === 0 || !tableNumber} className="w-full mt-4">
                  Place Order
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }
  