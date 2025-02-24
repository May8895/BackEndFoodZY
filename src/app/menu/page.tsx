// "use client"
// import { OrderForm } from "@/src/components/orders/OrderForm";
// import { useState } from "react"

// export default function Home() {
//     const [key, setKey] = useState(0);
  
//     const handleOrderPlaced = () => {
//       setKey((prevKey) => prevKey + 1);
//     };
  
//     return (
//       <div key={key}>
//         <OrderForm onOrderPlaced={handleOrderPlaced} />
//       </div>
//     );
//   }
  
// "use client"

// import { useState,useEffect } from "react"
// import { OrderForm } from "@/src/components/orders/OrderForm"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs"
// import { Coffee, Utensils, ChefHat, Star, Clock, Sparkles } from "lucide-react"



// export default function Home() {
//     const [key, setKey] = useState(0)
//     const [showWelcome, setShowWelcome] = useState(true)
  
//     useEffect(() => {
//       const timer = setTimeout(() => {
//         setShowWelcome(false)
//       }, 3000)
  
//       return () => clearTimeout(timer)
//     }, [])
  
//     const handleOrderPlaced = () => {
//       setKey((prevKey) => prevKey + 1)
//     }
  
//     if (showWelcome) {
//       return (
//         <div className="flex items-center justify-center min-h-screen bg-white">
//           <div className="text-center">
//             <ChefHat className="w-24 h-24 text-amber-500 mx-auto mb-4 animate-bounce" />
//             <h1 className="text-4xl font-bold text-amber-800 mb-2 animate-pulse">Welcome to</h1>
//             <h2 className="text-5xl font-extrabold text-amber-600 animate-pulse">Restaurant Management System</h2>
//           </div>
//         </div>
//       )
//     }
  
//     return (
//       <div className="min-h-screen bg-white relative">
//         {/* Decorative elements */}
//         <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-r from-amber-100 to-orange-100"></div>
//         <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-r from-orange-100 to-amber-100"></div>
//         <div className="absolute top-20 left-10 w-40 h-40 bg-amber-50 rounded-full opacity-50"></div>
//         <div className="absolute bottom-20 right-10 w-60 h-60 bg-orange-50 rounded-full opacity-50"></div>
  
//         <div className="container mx-auto p-8 relative z-10">
//           <header className="text-center mb-12 relative">
//             <div className="inline-block bg-gradient-to-r from-amber-400 to-orange-400 p-6 rounded-full shadow-lg mb-6 transform hover:scale-105 transition-transform">
//               <ChefHat className="w-20 h-20 text-white" />
//             </div>
//             <h1 className="text-6xl font-bold text-amber-800 mb-4 relative">
//               Restaurant Management System
//               <Sparkles className="absolute -top-6 -right-6 w-12 h-12 text-yellow-400 animate-pulse" />
//             </h1>
//             <p className="text-amber-600 text-2xl font-light">Elevate Your Dining Experience</p>
//           </header>
  
//           <div className="bg-white rounded-2xl shadow-2xl p-8 mb-12 border border-amber-100 relative overflow-hidden">
//             <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-amber-400 to-orange-400"></div>
//             <Tabs defaultValue="order" className="space-y-8">
//               <TabsList className="bg-gradient-to-r from-amber-100 to-orange-100 p-2 rounded-full flex justify-center">
//                 <TabsTrigger
//                   value="order"
//                   className="rounded-full px-8 py-4 data-[state=active]:bg-white data-[state=active]:text-amber-800 transition-all text-xl font-semibold shadow-md hover:shadow-lg"
//                 >
//                   <Utensils className="w-6 h-6 mr-3 inline-block" />
//                   Place Order
//                 </TabsTrigger>
//               </TabsList>
//               <TabsContent
//                 value="order"
//                 className="bg-gradient-to-br from-amber-50 to-orange-50 p-10 rounded-xl border border-amber-200 shadow-inner"
//               >
//                 <div className="mb-8 text-center">
//                   <h2 className="text-4xl font-semibold text-amber-800 mb-3">New Order</h2>
//                   <p className="text-amber-600 text-xl">Customize your culinary experience</p>
//                 </div>
//                 <div className="bg-white p-8 rounded-xl shadow-lg border border-amber-100">
//                   <OrderForm onOrderPlaced={handleOrderPlaced} />
//                 </div>
//               </TabsContent>
//             </Tabs>
//           </div>
  
//           {/* Feature section */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
//             {[
//               { icon: Coffee, title: "Quick Service", description: "Lightning-fast order processing" },
//               { icon: Star, title: "Quality Assurance", description: "Guaranteed satisfaction with every dish" },
//               { icon: Clock, title: "24/7 Availability", description: "Always at your service" },
//             ].map((feature, index) => (
//               <div
//                 key={index}
//                 className="bg-white rounded-xl p-8 shadow-lg text-center hover:shadow-xl transition-shadow border border-amber-100 transform hover:-translate-y-1 transition-transform"
//               >
//                 <div className="bg-gradient-to-br from-amber-400 to-orange-400 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
//                   <feature.icon className="w-10 h-10 text-white" />
//                 </div>
//                 <h3 className="text-2xl font-semibold text-amber-800 mb-3">{feature.title}</h3>
//                 <p className="text-amber-600 text-lg">{feature.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
  
//         <footer className="text-center pb-8 text-amber-700 relative z-10">
//           <p className="text-lg">© 2025 Restaurant Management System. All rights reserved.</p>
//           <div className="mt-4 flex justify-center space-x-6">
//             <a href="#" className="text-amber-600 hover:text-amber-800 transition-colors text-lg">
//               Terms of Service
//             </a>
//             <a href="#" className="text-amber-600 hover:text-amber-800 transition-colors text-lg">
//               Privacy Policy
//             </a>
//             <a href="#" className="text-amber-600 hover:text-amber-800 transition-colors text-lg">
//               Contact Us
//             </a>
//           </div>
//         </footer>
//       </div>
//     )
//   }

// "use client"

// import { useState, useEffect,useRef } from "react"
// import { Button } from "@/src/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card"
// import { Input } from "@/src/components/ui/input"
// import { Label } from "@/src/components/ui/label"
// import { useToast } from "@/src/components/ui/use-toast"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs"
// import { ChefHat, Sparkles, Plus, Minus, ShoppingCart, Star, Upload, Check, X, Eye, AlertCircle } from "lucide-react"
// import Image from "next/image"


  

// // Interfaces
// interface MenuItem {
//   id: string
//   name: string
//   price: number
//   category: string
//   image: string
//   description: string
// }

// interface OrderItem extends MenuItem {
//   quantity: number
// }

// // Constants
// const PLACEHOLDER_IMAGE = "/placeholder.svg"

// // Main Component
// export default function Home() {
//   const [key, setKey] = useState(0)
//   const [showWelcome, setShowWelcome] = useState(true)
//   const [menuItems, setMenuItems] = useState<MenuItem[]>([])
//   const [orderItems, setOrderItems] = useState<OrderItem[]>([])
//   const [tableNumber, setTableNumber] = useState("")
//   const [orderId, setOrderId] = useState<string | null>(null)
//   const [totalPrice, setTotalPrice] = useState<number>(0)
//   const [showSummary, setShowSummary] = useState(false)
//   const [isPaid, setIsPaid] = useState(false)
//   const [rating, setRating] = useState<number | null>(null)
//   const [activeTab, setActiveTab] = useState("menu")
//   const [showSlipVerification, setShowSlipVerification] = useState(false)
//   const [showRatingStars, setShowRatingStars] = useState(false)
//   const { toast } = useToast()

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setShowWelcome(false)
//     }, 3000)

//     fetchMenuItems()

//     return () => clearTimeout(timer)
//   }, [])

//   const fetchMenuItems = async () => {
//     try {
//       const response = await fetch("/api/menu")
//       if (!response.ok) throw new Error("Failed to fetch menu items")
//       const data = await response.json()
//       setMenuItems(
//         data.map((item: MenuItem) => ({
//           ...item,
//           price: Number(item.price),
//         })),
//       )
//     } catch (error) {
//       console.error("Error fetching menu items:", error)
//       toast({
//         title: "Error",
//         description: "Failed to fetch menu items. Please try again.",
//         variant: "destructive",
//       })
//     }
//   }

//   const addToOrder = (item: MenuItem) => {
//     setOrderItems((prevItems) => {
//       const existingItem = prevItems.find((i) => i.id === item.id)
//       if (existingItem) {
//         return prevItems.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i))
//       }
//       return [...prevItems, { ...item, quantity: 1 }]
//     })
//   }

//   const removeFromOrder = (itemId: string) => {
//     setOrderItems((prevItems) =>
//       prevItems
//         .map((item) => (item.id === itemId ? { ...item, quantity: Math.max(0, item.quantity - 1) } : item))
//         .filter((item) => item.quantity > 0),
//     )
//   }

//   const calculateTotal = () => {
//     return orderItems.reduce((total, item) => total + item.price * item.quantity, 0)
//   }

//   const placeOrder = async () => {
//     if (!tableNumber) {
//       toast({
//         title: "Error",
//         description: "Please enter a table number.",
//         variant: "destructive",
//       })
//       return
//     }

//     if (orderItems.length === 0) {
//       toast({
//         title: "Error",
//         description: "Please add items to your order.",
//         variant: "destructive",
//       })
//       return
//     }

//     try {
//       const response = await fetch("/api/orders", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           table_number: tableNumber,
//           items: orderItems,
//         }),
//       })

//       if (!response.ok) throw new Error("Failed to place order")

//       const data = await response.json()
//       setOrderId(data.id)
//       setTotalPrice(data.total_price)
//       setShowSummary(true)
//       setIsPaid(false)
//       setActiveTab("summary")

//       toast({
//         title: "Success",
//         description: "Order placed successfully! Please proceed to payment and rating.",
//       })

//       setKey((prevKey) => prevKey + 1)
//     } catch (error) {
//       console.error("Error placing order:", error)
//       toast({
//         title: "Error",
//         description: "Failed to place order. Please try again.",
//         variant: "destructive",
//       })
//     }
//   }

//   const handlePayment = () => {
//     setShowSlipVerification(true)
//   }

//   const handleVerificationComplete = (success: boolean) => {
//     if (success) {
//       setIsPaid(true)
//       setShowSlipVerification(false)
//       setShowRatingStars(true)
//       toast({
//         title: "Payment Verified",
//         description: "Thank you for your payment. Please rate your experience.",
//       })
//     }
//   }

//   const handleRating = async (selectedRating: number) => {
//     if (orderId) {
//       try {
//         const response = await fetch(`/api/orders/${orderId}/rating`, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ rating: selectedRating }),
//         })

//         if (!response.ok) {
//           throw new Error("Failed to submit rating")
//         }

//         setRating(selectedRating)
//         setShowRatingStars(false)

//         toast({
//           title: "Thank you for your feedback!",
//           description: `You rated your experience ${selectedRating} stars.`,
//         })

//         setTimeout(() => {
//           handleNewOrder()
//         }, 5000)
//       } catch (error) {
//         console.error("Error submitting rating:", error)
//         toast({
//           title: "Error",
//           description: "Failed to submit rating. Please try again.",
//           variant: "destructive",
//         })
//       }
//     }
//   }

//   const handleNewOrder = () => {
//     setOrderItems([])
//     setTableNumber("")
//     setOrderId(null)
//     setTotalPrice(0)
//     setShowSummary(false)
//     setIsPaid(false)
//     setRating(null)
//     setActiveTab("menu")
//     setShowSlipVerification(false)
//     setShowRatingStars(false)
//   }

//   if (showWelcome) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-white">
//         <div className="text-center">
//           <ChefHat className="w-16 h-16 text-amber-500 mx-auto mb-4 animate-bounce" />
//           <h1 className="text-2xl font-bold text-amber-800 mb-2 animate-pulse">Welcome to</h1>
//           <h2 className="text-3xl font-extrabold text-amber-600 animate-pulse">Restaurant Management System</h2>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-white relative p-4">
//       {/* Decorative elements */}
//       <div className="absolute top-0 left-0 w-full h-16 bg-gradient-to-r from-amber-100 to-orange-100"></div>
//       <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-r from-orange-100 to-amber-100"></div>

//       <div className="relative z-10">
//         <header className="text-center mb-8 relative">
//           <div className="inline-block bg-gradient-to-r from-amber-400 to-orange-400 p-4 rounded-full shadow-lg mb-4 transform hover:scale-105 transition-transform">
//             <ChefHat className="w-12 h-12 text-white" />
//           </div>
//           <h1 className="text-3xl font-bold text-amber-800 mb-2 relative">
//             Restaurant Management
//             <Sparkles className="absolute -top-4 -right-4 w-8 h-8 text-yellow-400 animate-pulse" />
//           </h1>
//           <p className="text-amber-600 text-lg font-light">Elevate Your Dining Experience</p>
//         </header>

//         <div className="bg-white rounded-xl shadow-lg p-4 mb-8 border border-amber-100 relative overflow-hidden">
//           <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 to-orange-400"></div>
//           <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
//             <TabsList className="grid w-full grid-cols-2 mb-4">
//               <TabsTrigger value="menu">Menu</TabsTrigger>
//               <TabsTrigger value="summary">Order Summary</TabsTrigger>
//             </TabsList>
//             <TabsContent value="menu">
//               <div className="space-y-4">
//                 <div className="flex justify-between items-center">
//                   <h2 className="text-xl font-bold">Restaurant Menu</h2>
//                   <Button onClick={handleNewOrder} variant="outline" size="sm">
//                     New Order
//                   </Button>
//                 </div>
//                 <div className="grid gap-4">
//                   {menuItems.map((item) => (
//                     <Card key={item.id} className="overflow-hidden">
//                       <div className="relative h-32 w-full">
//                         <Image
//                           src={item.image || PLACEHOLDER_IMAGE}
//                           alt={item.name}
//                           fill
//                           style={{ objectFit: "cover" }}
//                         />
//                       </div>
//                       <CardContent className="p-4">
//                         <h3 className="font-bold text-base mb-1">{item.name}</h3>
//                         <p className="text-xs text-gray-600 mb-2">{item.description}</p>
//                         <div className="flex justify-between items-center">
//                           <span className="font-semibold text-sm">฿{item.price.toFixed(2)}</span>
//                           <Button size="sm" onClick={() => addToOrder(item)}>
//                             Add to Order
//                           </Button>
//                         </div>
//                       </CardContent>
//                     </Card>
//                   ))}
//                 </div>
//               </div>
//             </TabsContent>

//             <TabsContent value="summary">
//               {showSummary ? (
//                 <Card className="w-full max-w-md mx-auto">
//                   <CardHeader>
//                     <CardTitle className="text-xl">Order Summary - Table {tableNumber}</CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     <div className="space-y-4">
//                       {orderItems.map((item) => (
//                         <div key={item.id} className="flex justify-between text-sm">
//                           <span>
//                             {item.name} x {item.quantity}
//                           </span>
//                           <span>฿{(item.price * item.quantity).toFixed(2)}</span>
//                         </div>
//                       ))}
//                       <div className="flex justify-between font-bold text-base border-t pt-4">
//                         <span>Total:</span>
//                         <span>฿{totalPrice.toFixed(2)}</span>
//                       </div>

//                       {showSlipVerification ? (
//                         <div>
//                           <h3 className="text-lg font-semibold mb-2">Upload Payment Slip</h3>
//                           {/* Add your SlipVerification component here */}
//                           <Button onClick={() => handleVerificationComplete(true)}>Verify Payment (Dummy)</Button>
//                         </div>
//                       ) : !isPaid ? (
//                         <Button onClick={handlePayment} className="w-full mt-4">
//                           Pay Now
//                         </Button>
//                       ) : null}

//                       {showRatingStars && (
//                         <div className="mt-6">
//                           <h3 className="text-lg font-semibold mb-2">
//                             Thank you for your payment. Please rate your experience:
//                           </h3>
//                           <div className="flex justify-center space-x-2">
//                             {[1, 2, 3, 4, 5].map((star) => (
//                               <Button
//                                 key={star}
//                                 variant={rating !== null && rating >= star ? "default" : "outline"}
//                                 size="sm"
//                                 onClick={() => handleRating(star)}
//                               >
//                                 <Star className={rating !== null && rating >= star ? "fill-current" : ""} />
//                               </Button>
//                             ))}
//                           </div>
//                         </div>
//                       )}

//                       {rating !== null && !showRatingStars && (
//                         <div className="mt-6">
//                           <h3 className="text-lg font-semibold mb-2">Thank you for your payment and rating.</h3>
//                           <p className="text-sm">
//                             Your order summary is displayed above. We hope you enjoyed your meal.
//                           </p>
//                         </div>
//                       )}
//                     </div>
//                   </CardContent>
//                 </Card>
//               ) : (
//                 <Card>
//                   <CardHeader>
//                     <CardTitle className="flex items-center text-lg">
//                       <ShoppingCart className="mr-2 h-5 w-5" />
//                       Your Order
//                     </CardTitle>
//                   </CardHeader>
//                   <CardContent className="grid gap-4">
//                     <div className="grid gap-2">
//                       <Label htmlFor="tableNumber">Table Number</Label>
//                       <Input
//                         id="tableNumber"
//                         value={tableNumber}
//                         onChange={(e) => setTableNumber(e.target.value)}
//                         placeholder="Enter table number"
//                       />
//                     </div>
//                     {orderItems.map((item) => (
//                       <div key={item.id} className="flex items-center justify-between">
//                         <div>
//                           <p className="font-medium text-sm">{item.name}</p>
//                           <p className="text-xs text-gray-500">
//                             ฿{(item.price * item.quantity).toFixed(2)} x {item.quantity}
//                           </p>
//                         </div>
//                         <div className="flex items-center gap-2">
//                           <Button size="sm" variant="outline" onClick={() => removeFromOrder(item.id)}>
//                             <Minus className="h-3 w-3" />
//                           </Button>
//                           <span className="text-sm">{item.quantity}</span>
//                           <Button size="sm" variant="outline" onClick={() => addToOrder(item)}>
//                             <Plus className="h-3 w-3" />
//                           </Button>
//                         </div>
//                       </div>
//                     ))}
//                     {orderItems.length > 0 && (
//                       <div className="flex items-center justify-between font-bold text-base mt-4">
//                         <span>Total:</span>
//                         <span>฿{calculateTotal().toFixed(2)}</span>
//                       </div>
//                     )}
//                     <Button
//                       onClick={placeOrder}
//                       disabled={orderItems.length === 0 || !tableNumber}
//                       className="w-full mt-4"
//                     >
//                       Place Order
//                     </Button>
//                   </CardContent>
//                 </Card>
//               )}
//             </TabsContent>
//           </Tabs>
//         </div>
//       </div>

//       <footer className="text-center pb-4 text-amber-700 relative z-10">
//         <p className="text-sm">© 2025 Restaurant Management System. All rights reserved.</p>
//         <div className="mt-2 flex justify-center space-x-4 text-xs">
//           <a href="#" className="text-amber-600 hover:text-amber-800 transition-colors">
//             Terms of Service
//           </a>
//           <a href="#" className="text-amber-600 hover:text-amber-800 transition-colors">
//             Privacy Policy
//           </a>
//           <a href="#" className="text-amber-600 hover:text-amber-800 transition-colors">
//             Contact Us
//           </a>
//         </div>
//       </footer>
//     </div>
//   )
// }
"use client"

import { useState, useEffect } from "react"
import { Button } from "@/src/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle,CardFooter } from "@/src/components/ui/card"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { useToast } from "@/src/components/ui/use-toast"
import { Plus, Minus, ShoppingCart, ChefHat, Sparkles, Star ,UtensilsCrossed ,Clock,MapPin,Utensils,Facebook,Instagram,Twitter} from "lucide-react"
import Image from "next/image"
import { ScrollArea } from "@/src/components/ui/scroll-area"
import { SlipVerification } from "@/src/components/verification/slip-verification"


// interface MenuItem {
//     id: string
//     name: string
//     price: number
//     category: string
//     image: string
//     description: string
//   }
  
//   interface OrderItem extends MenuItem {
//     quantity: number
//   }
  
//   const PLACEHOLDER_IMAGE = "/placeholder.svg"
  
//   export default function Home() {
//     const [showWelcome, setShowWelcome] = useState(true)
//     const [menuItems, setMenuItems] = useState<MenuItem[]>([])
//     const [orderItems, setOrderItems] = useState<OrderItem[]>([])
//     const [tableNumber, setTableNumber] = useState("")
//     const [orderId, setOrderId] = useState<string | null>(null)
//     const [totalPrice, setTotalPrice] = useState<number>(0)
//     const [showSummary, setShowSummary] = useState(false)
//     const [isPaid, setIsPaid] = useState(false)
//     const [rating, setRating] = useState<number | null>(null)
//     const [showSlipVerification, setShowSlipVerification] = useState(false)
//     const [showRatingStars, setShowRatingStars] = useState(false)
//     const { toast } = useToast()
  
//     useEffect(() => {
//       const timer = setTimeout(() => {
//         setShowWelcome(false)
//       }, 3000)
  
//       return () => clearTimeout(timer)
//     }, [])
  
//     useEffect(() => {
//       fetchMenuItems()
//     }, [])
  
//     const fetchMenuItems = async () => {
//       try {
//         const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/menu`)
//         if (!response.ok) throw new Error("Failed to fetch menu items")
//         const data = await response.json()
//         setMenuItems(
//           data.map((item: MenuItem) => ({
//             ...item,
//             price: Number(item.price),
//           })),
//         )
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
//         const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders`, {
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
  
//         const data = await response.json()
//         setOrderId(data.id)
//         setTotalPrice(data.total_price)
//         setShowSummary(true)
//         setIsPaid(false)
  
//         toast({
//           title: "Success",
//           description: "Order placed successfully! Please proceed to payment and rating.",
//         })
//       } catch (error) {
//         console.error("Error placing order:", error)
//         toast({
//           title: "Error",
//           description: "Failed to place order. Please try again.",
//           variant: "destructive",
//         })
//       }
//     }
  
//     const handlePayment = () => {
//       setShowSlipVerification(true)
//     }
  
//     const handleVerificationComplete = (success: boolean) => {
//       if (success) {
//         setIsPaid(true)
//         setShowSlipVerification(false)
//         setShowRatingStars(true)
//         toast({
//           title: "Payment Verified",
//           description: "Thank you for your payment. Please rate your experience.",
//         })
//       }
//     }
  
//     const handleRating = async (selectedRating: number) => {
//       if (orderId) {
//         try {
//           const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders/${orderId}/rating`, {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ rating: selectedRating }),
//           })
  
//           if (!response.ok) {
//             throw new Error("Failed to submit rating")
//           }
  
//           setRating(selectedRating)
//           setShowRatingStars(false)
  
//           toast({
//             title: "Thank you for your feedback!",
//             description: `You rated your experience ${selectedRating} stars.`,
//           })
  
//           // Reset the order after a delay
//           setTimeout(() => {
//             handleNewOrder()
//           }, 5000) // Wait for 5 seconds before resetting the order
//         } catch (error) {
//           console.error("Error submitting rating:", error)
//           toast({
//             title: "Error",
//             description: "Failed to submit rating. Please try again.",
//             variant: "destructive",
//           })
//         }
//       }
//     }
  
//     const handleNewOrder = () => {
//       setOrderItems([])
//       setTableNumber("")
//       setOrderId(null)
//       setTotalPrice(0)
//       setShowSummary(false)
//       setIsPaid(false)
//       setRating(null)
//       setShowSlipVerification(false)
//       setShowRatingStars(false)
//     }
  
//     if (showWelcome) {
//       return (
//         <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#FDF8F3] via-white to-[#FFF5E9] relative overflow-hidden">
//           <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgZmlsbD0icmdiYSgxMzksIDY5LCAxOSwgMC4xKSIvPjwvZz48L3N2Zz4=')] opacity-50"></div>
//           <div className="text-center px-4 relative z-10">
//             <div className="relative inline-block">
//               <ChefHat className="w-24 h-24 text-[#8B4513] mx-auto mb-6 animate-bounce" />
//               <Sparkles className="absolute -top-4 -right-4 w-8 h-8 text-[#E67E22] animate-pulse" />
//             </div>
//             <h1 className="text-5xl font-bold text-[#8B4513] mb-3 animate-pulse">Welcome to</h1>
//             <h2 className="text-4xl font-bold bg-gradient-to-r from-[#8B4513] to-[#E67E22] bg-clip-text text-transparent animate-pulse">
//               Restaurant Management
//             </h2>
//           </div>
//         </div>
//       )
//     }
  
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-[#FDF8F3] via-white to-[#FFF5E9] relative">
//         <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgZmlsbD0icmdiYSgxMzksIDY5LCAxOSwgMC4xKSIvPjwvZz48L3N2Zz4=')] opacity-50"></div>
  
//         <div className="max-w-lg mx-auto px-4 py-6 relative z-10">
//           <header className="text-center mb-8">
//             <div className="inline-block bg-gradient-to-r from-[#8B4513] to-[#E67E22] p-4 rounded-full shadow-lg mb-4 transform hover:scale-105 transition-all">
//               <ChefHat className="w-12 h-12 text-white" />
//             </div>
//             <h1 className="text-3xl font-bold bg-gradient-to-r from-[#8B4513] to-[#E67E22] bg-clip-text text-transparent mb-2">
//               Welcom to FoodZy
//             </h1>
//             <p className="text-[#E67E22] text-lg font-medium">Elevate Your Dining Experience</p>
//           </header>
  
//           <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-6 mb-6">
//             {/* Menu Section */}
//             <div className="flex items-center justify-between mb-6">
//               <div className="flex items-center gap-2">
//                 <UtensilsCrossed className="w-6 h-6 text-[#8B4513]" />
//                 <h2 className="text-xl font-semibold bg-gradient-to-r from-[#8B4513] to-[#E67E22] bg-clip-text text-transparent">
//                   Menu
//                 </h2>
//               </div>
//               <Button
//                 variant="outline"
//                 size="sm"
//                 onClick={handleNewOrder}
//                 className="border-[#E67E22] text-[#E67E22] hover:bg-[#E67E22] hover:text-white transition-colors"
//               >
//                 New Order
//               </Button>
//             </div>
  
//             <ScrollArea className="h-[calc(100vh-400px)]">
//               <div className="space-y-4">
//                 {menuItems.map((item) => (
//                   <Card
//                     key={item.id}
//                     className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-shadow bg-white"
//                   >
//                     <CardContent className="p-3">
//                       <div className="flex items-center gap-4">
//                         <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0">
//                           <Image
//                             src={item.image || PLACEHOLDER_IMAGE}
//                             alt={item.name}
//                             fill
//                             className="object-cover transform hover:scale-110 transition-transform duration-300"
//                           />
//                         </div>
//                         <div className="flex-1 min-w-0">
//                           <h3 className="font-medium text-lg mb-1 truncate text-[#8B4513]">{item.name}</h3>
//                           <p className="text-sm text-gray-600 line-clamp-2 mb-2">{item.description}</p>
//                           <div className="flex items-center justify-between">
//                             <span className="font-semibold text-[#E67E22]">฿{item.price.toFixed(2)}</span>
//                             <Button
//                               size="sm"
//                               onClick={() => addToOrder(item)}
//                               className="bg-[#E67E22] hover:bg-[#D35400] text-white transition-colors"
//                             >
//                               Add to Order
//                             </Button>
//                           </div>
//                         </div>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 ))}
//               </div>
//             </ScrollArea>
  
//             {/* Order Summary Section */}
//             {orderItems.length > 0 && (
//               <div className="mt-8 pt-8 border-t border-[#E67E22]/20">
//                 <div className="flex items-center justify-between mb-6">
//                   <div className="flex items-center gap-2">
//                     <ShoppingCart className="w-5 h-5 text-[#8B4513]" />
//                     <h2 className="text-xl font-semibold bg-gradient-to-r from-[#8B4513] to-[#E67E22] bg-clip-text text-transparent">
//                       Your Order
//                     </h2>
//                   </div>
//                   <span className="text-sm font-medium px-3 py-1 bg-[#E67E22]/10 text-[#E67E22] rounded-full">
//                     {orderItems.reduce((sum, item) => sum + item.quantity, 0)} items
//                   </span>
//                 </div>
  
//                 <div className="space-y-4 mb-6">
//                   {orderItems.map((item) => (
//                     <div
//                       key={item.id}
//                       className="flex items-center justify-between p-3 rounded-xl bg-[#FDF8F3] border border-[#E67E22]/10"
//                     >
//                       <div className="flex items-center gap-3">
//                         <div className="relative w-14 h-14 rounded-lg overflow-hidden">
//                           <Image src={item.image || PLACEHOLDER_IMAGE} alt={item.name} fill className="object-cover" />
//                         </div>
//                         <div>
//                           <p className="font-medium text-[#8B4513]">{item.name}</p>
//                           <p className="text-sm text-[#E67E22]">
//                             ฿{item.price.toFixed(2)} × {item.quantity}
//                           </p>
//                         </div>
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <Button
//                           size="sm"
//                           variant="outline"
//                           onClick={() => removeFromOrder(item.id)}
//                           className="border-[#E67E22] text-[#E67E22] hover:bg-[#E67E22] hover:text-white h-8 w-8 p-0"
//                         >
//                           <Minus className="h-4 w-4" />
//                         </Button>
//                         <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
//                         <Button
//                           size="sm"
//                           variant="outline"
//                           onClick={() => addToOrder(item)}
//                           className="border-[#E67E22] text-[#E67E22] hover:bg-[#E67E22] hover:text-white h-8 w-8 p-0"
//                         >
//                           <Plus className="h-4 w-4" />
//                         </Button>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
  
//                 <div className="space-y-6">
//                   <div className="flex items-center gap-3 bg-[#FDF8F3] p-3 rounded-xl border border-[#E67E22]/10">
//                     <Label htmlFor="tableNumber" className="text-sm font-medium text-[#8B4513]">
//                       Table Number
//                     </Label>
//                     <Input
//                       id="tableNumber"
//                       value={tableNumber}
//                       onChange={(e) => setTableNumber(e.target.value)}
//                       placeholder="Enter number"
//                       className="max-w-[100px] border-[#E67E22]/20 focus:border-[#E67E22] focus:ring-[#E67E22]"
//                     />
//                   </div>
  
//                   <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-[#8B4513] to-[#E67E22] text-white">
//                     <span className="font-medium">Total Amount</span>
//                     <span className="text-xl font-bold">฿{calculateTotal().toFixed(2)}</span>
//                   </div>
  
//                   <Button
//                     className="w-full bg-[#E67E22] hover:bg-[#D35400] text-white text-lg py-6 rounded-xl transition-all transform hover:scale-[1.02]"
//                     onClick={placeOrder}
//                     disabled={!tableNumber || orderItems.length === 0}
//                   >
//                     Place Order
//                   </Button>
//                 </div>
//               </div>
//             )}
  
//             {/* Payment and Rating Section */}
//             {showSummary && (
//               <div className="mt-8 pt-8 border-t border-[#E67E22]/20 space-y-6">
//                 {showSlipVerification ? (
//                   <SlipVerification
//                     expectedAmount={totalPrice}
//                     orderId={orderId || ""}
//                     onVerificationComplete={handleVerificationComplete}
//                   />
//                 ) : !isPaid ? (
//                   <Button
//                     onClick={handlePayment}
//                     className="w-full bg-[#E67E22] hover:bg-[#D35400] text-white text-lg py-6 rounded-xl transition-all transform hover:scale-[1.02]"
//                   >
//                     Pay Now
//                   </Button>
//                 ) : null}
  
//                 {showRatingStars && (
//                   <div className="text-center p-6 bg-[#FDF8F3] rounded-xl border border-[#E67E22]/10">
//                     <h3 className="text-xl font-semibold text-[#8B4513] mb-4">Rate your experience:</h3>
//                     <div className="flex justify-center gap-3">
//                       {[1, 2, 3, 4, 5].map((star) => (
//                         <Button
//                           key={star}
//                           variant={rating !== null && rating >= star ? "default" : "outline"}
//                           onClick={() => handleRating(star)}
//                           className={`h-12 w-12 ${
//                             rating !== null && rating >= star
//                               ? "bg-[#E67E22] hover:bg-[#D35400] text-white"
//                               : "border-[#E67E22] text-[#E67E22] hover:bg-[#E67E22] hover:text-white"
//                           }`}
//                         >
//                           <Star className={`w-6 h-6 ${rating !== null && rating >= star ? "fill-current" : ""}`} />
//                         </Button>
//                       ))}
//                     </div>
//                   </div>
//                 )}
  
//                 {rating !== null && !showRatingStars && (
//                   <div className="text-center p-6 bg-[#FDF8F3] rounded-xl border border-[#E67E22]/10">
//                     <p className="text-lg text-[#8B4513] mb-4">Thank you for your feedback!</p>
//                     <Button
//                       onClick={handleNewOrder}
//                       className="w-full bg-[#E67E22] hover:bg-[#D35400] text-white text-lg py-6 rounded-xl transition-all transform hover:scale-[1.02]"
//                     >
//                       Place New Order
//                     </Button>
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>
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
  
  export default function Home() {
    const [showWelcome, setShowWelcome] = useState(true)
    const [menuItems, setMenuItems] = useState<MenuItem[]>([])
    const [orderItems, setOrderItems] = useState<OrderItem[]>([])
    const [tableNumber, setTableNumber] = useState("")
    const [orderId, setOrderId] = useState<string | null>(null)
    const [totalPrice, setTotalPrice] = useState<number>(0)
    const [showSummary, setShowSummary] = useState(false)
    const [isPaid, setIsPaid] = useState(false)
    const [rating, setRating] = useState<number | null>(null)
    const [showSlipVerification, setShowSlipVerification] = useState(false)
    const [showRatingStars, setShowRatingStars] = useState(false)
    const { toast } = useToast()
  
    useEffect(() => {
      const timer = setTimeout(() => {
        setShowWelcome(false)
      }, 3000)
  
      return () => clearTimeout(timer)
    }, [])
  
    useEffect(() => {
      fetchMenuItems()
    }, [])
  
    const fetchMenuItems = async () => {
      try {
        const response = await fetch(`/api/menu`)
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
      return orderItems.reduce((total, item) => total + item.price * item.quantity, 0)
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
        const response = await fetch(`/api/orders`, {
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
  
        const data = await response.json()
        setOrderId(data.id)
        setTotalPrice(data.total_price)
        setShowSummary(true)
        setIsPaid(false)
  
        toast({
          title: "Success",
          description: "Order placed successfully! Please proceed to payment and rating.",
        })
      } catch (error) {
        console.error("Error placing order:", error)
        toast({
          title: "Error",
          description: "Failed to place order. Please try again.",
          variant: "destructive",
        })
      }
    }
  
    const handlePayment = () => {
      setShowSlipVerification(true)
    }
  
    const handleVerificationComplete = (success: boolean) => {
      if (success) {
        setIsPaid(true)
        setShowSlipVerification(false)
        setShowRatingStars(true)
        toast({
          title: "Payment Verified",
          description: "Thank you for your payment. Please rate your experience.",
        })
      }
    }
  
    const handleRating = async (selectedRating: number) => {
      if (orderId) {
        try {
          const response = await fetch(`/api/orders/${orderId}/rating`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ rating: selectedRating }),
          })
  
          if (!response.ok) {
            throw new Error("Failed to submit rating")
          }
  
          setRating(selectedRating)
          setShowRatingStars(false)
  
          toast({
            title: "Thank you for your feedback!",
            description: `You rated your experience ${selectedRating} stars.`,
          })
  
          // Reset the order after a delay
          setTimeout(() => {
            handleNewOrder()
          }, 5000) // Wait for 5 seconds before resetting the order
        } catch (error) {
          console.error("Error submitting rating:", error)
          toast({
            title: "Error",
            description: "Failed to submit rating. Please try again.",
            variant: "destructive",
          })
        }
      }
    }
  
    const handleNewOrder = () => {
      setOrderItems([])
      setTableNumber("")
      setOrderId(null)
      setTotalPrice(0)
      setShowSummary(false)
      setIsPaid(false)
      setRating(null)
      setShowSlipVerification(false)
      setShowRatingStars(false)
    }
  
    if (showWelcome) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#FDF8F3] via-white to-[#FFF5E9] relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgZmlsbD0icmdiYSgxMzksIDY5LCAxOSwgMC4xKSIvPjwvZz48L3N2Zz4=')] opacity-50"></div>
          <div className="text-center px-4 relative z-10">
            <div className="relative inline-block">
              <ChefHat className="w-24 h-24 text-[#8B4513] mx-auto mb-6 animate-bounce" />
              <Sparkles className="absolute -top-4 -right-4 w-8 h-8 text-[#E67E22] animate-pulse" />
            </div>
            <h1 className="text-5xl font-bold text-[#8B4513] mb-3 animate-pulse">Welcome to</h1>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-[#8B4513] to-[#E67E22] bg-clip-text text-transparent animate-pulse">
              FoodZy
            </h2>
            <p className="mt-4 text-lg text-[#8B4513] animate-fade-in-up">Where every meal tells a story</p>
          </div>
        </div>
      )
    }
  
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FDF8F3] via-white to-[#FFF5E9] relative">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgZmlsbD0icmdiYSgxMzksIDY5LCAxOSwgMC4xKSIvPjwvZz48L3N2Zz4=')] opacity-50"></div>
  
        <div className="max-w-lg mx-auto px-4 py-6 relative z-10">
          <header className="text-center mb-8">
            <div className="inline-block bg-gradient-to-r from-[#8B4513] to-[#E67E22] p-4 rounded-full shadow-lg mb-4 transform hover:scale-105 transition-all">
              <ChefHat className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-[#8B4513] to-[#E67E22] bg-clip-text text-transparent mb-2">
              FoodZy
            </h1>
            <p className="text-[#E67E22] text-lg font-medium">Crafting Memories, One Dish at a Time</p>
            <div className="mt-4 flex justify-center items-center space-x-2 text-sm text-[#8B4513]">
              <Clock className="w-4 h-4" />
              <span>Open: 11AM - 10PM</span>
              <span>•</span>
              <MapPin className="w-4 h-4" />
              <span>123 Foodie Lane, Tastyville</span>
            </div>
          </header>
  
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-6 mb-6">
            {/* Menu Section */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <UtensilsCrossed className="w-6 h-6 text-[#8B4513]" />
                <h2 className="text-xl font-semibold bg-gradient-to-r from-[#8B4513] to-[#E67E22] bg-clip-text text-transparent">
                  Today's Specials
                </h2>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleNewOrder}
                className="border-[#E67E22] text-[#E67E22] hover:bg-[#E67E22] hover:text-white transition-colors"
              >
                Start Fresh
              </Button>
            </div>
  
            <div className="mb-6 text-center italic text-[#8B4513] bg-[#FDF8F3] p-4 rounded-lg border border-[#E67E22]/20">
              <p>Start your Day with best Food</p>
            </div>
  
            <ScrollArea className="h-[calc(100vh-400px)]">
              <div className="space-y-4">
                {menuItems.map((item) => (
                  <Card
                    key={item.id}
                    className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-shadow bg-white"
                  >
                    <CardContent className="p-3">
                      <div className="flex items-center gap-4">
                        <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0">
                          <Image
                            src={item.image || PLACEHOLDER_IMAGE}
                            alt={item.name}
                            fill
                            className="object-cover transform hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-lg mb-1 truncate text-[#8B4513]">{item.name}</h3>
                          <p className="text-sm text-gray-600 line-clamp-2 mb-2">{item.description}</p>
                          <div className="flex items-center justify-between">
                            <span className="font-semibold text-[#E67E22]">฿{item.price.toFixed(2)}</span>
                            <Button
                              size="sm"
                              onClick={() => addToOrder(item)}
                              className="bg-[#E67E22] hover:bg-[#D35400] text-white transition-colors"
                            >
                              Add to Order
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </ScrollArea>
  
            {/* Order Summary Section */}
            {orderItems.length > 0 && (
              <div className="mt-8 pt-8 border-t border-[#E67E22]/20">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <ShoppingCart className="w-5 h-5 text-[#8B4513]" />
                    <h2 className="text-xl font-semibold bg-gradient-to-r from-[#8B4513] to-[#E67E22] bg-clip-text text-transparent">
                      Your Feast
                    </h2>
                  </div>
                  <span className="text-sm font-medium px-3 py-1 bg-[#E67E22]/10 text-[#E67E22] rounded-full">
                    {orderItems.reduce((sum, item) => sum + item.quantity, 0)} delicious items
                  </span>
                </div>
  
                <div className="space-y-4 mb-6">
                  {orderItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-3 rounded-xl bg-[#FDF8F3] border border-[#E67E22]/10"
                    >
                      <div className="flex items-center gap-3">
                        <div className="relative w-14 h-14 rounded-lg overflow-hidden">
                          <Image src={item.image || PLACEHOLDER_IMAGE} alt={item.name} fill className="object-cover" />
                        </div>
                        <div>
                          <p className="font-medium text-[#8B4513]">{item.name}</p>
                          <p className="text-sm text-[#E67E22]">
                            ฿{item.price.toFixed(2)} × {item.quantity}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => removeFromOrder(item.id)}
                          className="border-[#E67E22] text-[#E67E22] hover:bg-[#E67E22] hover:text-white h-8 w-8 p-0"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => addToOrder(item)}
                          className="border-[#E67E22] text-[#E67E22] hover:bg-[#E67E22] hover:text-white h-8 w-8 p-0"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
  
                {orderItems.length === 0 && (
                  <div className="text-center py-8 text-[#8B4513]">
                    <div className="animate-bounce mb-4">
                      <UtensilsCrossed className="w-12 h-12 mx-auto" />
                    </div>
                    <p className="text-lg font-medium">Your feast awaits!</p>
                    <p className="text-sm mt-2">Add some delicious items to get started.</p>
                  </div>
                )}
  
                <div className="space-y-6">
                  <div className="flex items-center gap-3 bg-[#FDF8F3] p-3 rounded-xl border border-[#E67E22]/10">
                    <Label htmlFor="tableNumber" className="text-sm font-medium text-[#8B4513]">
                      Table Number
                    </Label>
                    <Input
                      id="tableNumber"
                      value={tableNumber}
                      onChange={(e) => setTableNumber(e.target.value)}
                      placeholder="Enter number"
                      className="max-w-[100px] border-[#E67E22]/20 focus:border-[#E67E22] focus:ring-[#E67E22]"
                    />
                  </div>
  
                  <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-[#8B4513] to-[#E67E22] text-white">
                    <span className="font-medium">Total Amount</span>
                    <span className="text-xl font-bold">฿{calculateTotal().toFixed(2)}</span>
                  </div>
  
                  <Button
                    className="w-full bg-[#E67E22] hover:bg-[#D35400] text-white text-lg py-6 rounded-xl transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2"
                    onClick={placeOrder}
                    disabled={!tableNumber || orderItems.length === 0}
                  >
                    <Utensils className="w-5 h-5" />
                    Place Your Order
                  </Button>
                </div>
              </div>
            )}
  
            {/* Payment and Rating Section */}
            {showSummary && (
              <div className="mt-8 pt-8 border-t border-[#E67E22]/20 space-y-6">
                {showSlipVerification ? (
                  <SlipVerification
                    expectedAmount={totalPrice}
                    orderId={orderId || ""}
                    onVerificationComplete={handleVerificationComplete}
                  />
                ) : !isPaid ? (
                  <Button
                    onClick={handlePayment}
                    className="w-full bg-[#E67E22] hover:bg-[#D35400] text-white text-lg py-6 rounded-xl transition-all transform hover:scale-[1.02]"
                  >
                    Pay Now
                  </Button>
                ) : null}
  
                {showRatingStars && (
                  <div className="text-center p-6 bg-[#FDF8F3] rounded-xl border border-[#E67E22]/10">
                    <h3 className="text-xl font-semibold text-[#8B4513] mb-4">How was your culinary journey?</h3>
                    <p className="text-sm text-[#8B4513] mb-4">Your feedback helps us serve you better!</p>
                    <div className="flex justify-center gap-3">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Button
                          key={star}
                          variant={rating !== null && rating >= star ? "default" : "outline"}
                          onClick={() => handleRating(star)}
                          className={`h-12 w-12 ${
                            rating !== null && rating >= star
                              ? "bg-[#E67E22] hover:bg-[#D35400] text-white"
                              : "border-[#E67E22] text-[#E67E22] hover:bg-[#E67E22] hover:text-white"
                          }`}
                        >
                          <Star className={`w-6 h-6 ${rating !== null && rating >= star ? "fill-current" : ""}`} />
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
  
                {rating !== null && !showRatingStars && (
                  <div className="text-center p-6 bg-[#FDF8F3] rounded-xl border border-[#E67E22]/10">
                    <p className="text-lg text-[#8B4513] mb-4">Thank you for your feedback!</p>
                    <Button
                      onClick={handleNewOrder}
                      className="w-full bg-[#E67E22] hover:bg-[#D35400] text-white text-lg py-6 rounded-xl transition-all transform hover:scale-[1.02]"
                    >
                      Place New Order
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
          <footer className="mt-8 text-center text-sm text-[#8B4513]">
            <p>© 2023 Flavor Haven. All rights reserved.</p>
            <div className="mt-2 flex justify-center space-x-4">
              <a href="#" className="hover:text-[#E67E22] transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-[#E67E22] transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-[#E67E22] transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </footer>
        </div>
      </div>
    )
  }
  