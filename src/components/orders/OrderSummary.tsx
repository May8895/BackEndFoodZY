"use client"

import { useState,useEffect } from "react"
import { Button } from "@/src/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card"
import { useToast } from "@/src/components/ui/use-toast"
import { Star } from "lucide-react"

import { SlipVerification } from "../verification/slip-verification"

// interface OrderItem {
//     id: string
//     name: string
//     price: number
//     quantity: number
//   }
  
//   interface OrderSummaryProps {
//     orderItems: OrderItem[]
//     tableNumber: string
//     total: number
//     orderId: string | null
//     onRatingSubmitted: (orderId: string, rating: number) => void
//     initialRating?: number | null
//     isPaid?: boolean
//     onPayment: () => void
//     onNewOrder: () => void
//   }
  
//   export function OrderSummary({
//     orderItems,
//     tableNumber,
//     total,
//     orderId,
//     onRatingSubmitted,
//     initialRating = null,
//     isPaid = false,
//     onPayment,
//     onNewOrder,
//   }: OrderSummaryProps) {
//     const [rating, setRating] = useState<number | null>(initialRating)
//     const [showRating, setShowRating] = useState(isPaid)
//     const { toast } = useToast()
  
//     useEffect(() => {
//       setRating(initialRating)
//       setShowRating(isPaid)
//     }, [initialRating, isPaid])
  
//     const handlePayment = () => {
//       setShowRating(true)
//       onPayment()
//       toast({
//         title: "Payment Successful",
//         description: "Thank you for your order!",
//       })
//     }
  
//     const handleRating = async (selectedRating: number) => {
//       if (orderId) {
//         try {
//           const response = await fetch(`/api/orders/${orderId}/rating`, {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ rating: selectedRating }),
//           })
  
//           if (!response.ok) {
//             throw new Error("Failed to submit rating")
//           }
  
//           const updatedOrder = await response.json()
//           setRating(selectedRating)
//           onRatingSubmitted(orderId, selectedRating)
  
//           toast({
//             title: "Thank you for your feedback!",
//             description: `You rated your experience ${selectedRating} stars.`,
//           })
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
  
//     return (
//       <Card className="w-full max-w-2xl mx-auto">
//         <CardHeader>
//           <CardTitle>Order Summary - Table {tableNumber}</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="space-y-4">
//             {orderItems.map((item) => (
//               <div key={item.id} className="flex justify-between">
//                 <span>
//                   {item.name} x {item.quantity}
//                 </span>
//                 <span>฿{(item.price * item.quantity).toFixed(2)}</span>
//               </div>
//             ))}
//             <div className="flex justify-between font-bold text-lg border-t pt-4">
//               <span>Total:</span>
//               <span>฿{total.toFixed(2)}</span>
//             </div>
//             {!isPaid && (
//               <Button onClick={handlePayment} className="w-full mt-4">
//                 Pay Now
//               </Button>
//             )}
//             {isPaid && rating === null && (
//               <div className="mt-6">
//                 <h3 className="text-lg font-semibold mb-2">Rate your experience:</h3>
//                 <div className="flex justify-center space-x-2">
//                   {[1, 2, 3, 4, 5].map((star) => (
//                     <Button
//                       key={star}
//                       variant={rating !== null && rating >= star ? "default" : "outline"}
//                       size="lg"
//                       onClick={() => handleRating(star)}
//                     >
//                       <Star className={rating !== null && rating >= star ? "fill-current" : ""} />
//                     </Button>
//                   ))}
//                 </div>
//               </div>
//             )}
//             {rating !== null && (
//               <div className="mt-6">
//                 <h3 className="text-lg font-semibold mb-2">Thank you for your rating!</h3>
//                 <p>Your order summary is displayed above. We hope you enjoyed your meal.</p>
//                 <Button onClick={onNewOrder} className="w-full mt-4">
//                   Place New Order
//                 </Button>
//               </div>
//             )}
//           </div>
//         </CardContent>
//       </Card>
//     )
//   }




// interface OrderItem {
//     id: string
//     name: string
//     price: number
//     quantity: number
//   }
  
//   interface OrderSummaryProps {
//     orderItems: OrderItem[]
//     tableNumber: string
//     total: number
//     orderId: string | null
//     onRatingSubmitted: (orderId: string, rating: number) => void
//     initialRating?: number | null
//     isPaid?: boolean
//     onPayment: () => void
//     onNewOrder: () => void
//   }
  
//   export function OrderSummary({
//     orderItems,
//     tableNumber,
//     total,
//     orderId,
//     onRatingSubmitted,
//     initialRating = null,
//     isPaid = false,
//     onPayment,
//     onNewOrder,
//   }: OrderSummaryProps) {
//     const [rating, setRating] = useState<number | null>(initialRating)
//     const [showSlipVerification, setShowSlipVerification] = useState(false)
//     const { toast } = useToast()
  
//     const handlePayment = () => {
//       setShowSlipVerification(true)
//     }
  
//     const handleVerificationComplete = (success: boolean) => {
//       if (success) {
//         onPayment()
//         setShowSlipVerification(false)
//         toast({
//           title: "Payment Verified",
//           description: "Thank you for your payment. Please rate your experience.",
//         })
//       }
//     }
  
//     const handleRating = async (selectedRating: number) => {
//       if (orderId) {
//         try {
//           const response = await fetch(`/api/orders/${orderId}/rating`, {
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
//           onRatingSubmitted(orderId, selectedRating)
  
//           toast({
//             title: "Thank you for your feedback!",
//             description: `You rated your experience ${selectedRating} stars.`,
//           })
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
  
//     return (
//       <Card className="w-full max-w-2xl mx-auto">
//         <CardHeader>
//           <CardTitle>Order Summary - Table {tableNumber}</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="space-y-4">
//             {orderItems.map((item) => (
//               <div key={item.id} className="flex justify-between">
//                 <span>
//                   {item.name} x {item.quantity}
//                 </span>
//                 <span>฿{(item.price * item.quantity).toFixed(2)}</span>
//               </div>
//             ))}
//             <div className="flex justify-between font-bold text-lg border-t pt-4">
//               <span>Total:</span>
//               <span>฿{total.toFixed(2)}</span>
//             </div>
  
//             {showSlipVerification ? (
//               <SlipVerification
//                 expectedAmount={total}
//                 orderId={orderId || ""}
//                 onVerificationComplete={handleVerificationComplete}
//               />
//             ) : !isPaid ? (
//               <Button onClick={handlePayment} className="w-full mt-4">
//                 Pay Now
//               </Button>
//             ) : null}
  
//             {isPaid && rating === null && (
//               <div className="mt-6">
//                 <h3 className="text-lg font-semibold mb-2">Rate your experience:</h3>
//                 <div className="flex justify-center space-x-2">
//                   {[1, 2, 3, 4, 5].map((star) => (
//                     <Button
//                       key={star}
//                       variant={rating !== null && rating >= star ? "default" : "outline"}
//                       size="lg"
//                       onClick={() => handleRating(star)}
//                     >
//                       <Star className={rating !== null && rating >= star ? "fill-current" : ""} />
//                     </Button>
//                   ))}
//                 </div>
//               </div>
//             )}
  
//             {rating !== null && (
//               <div className="mt-6">
//                 <h3 className="text-lg font-semibold mb-2">Thank you for your rating!</h3>
//                 <p>Your order summary is displayed above. We hope you enjoyed your meal.</p>
//                 <Button onClick={onNewOrder} className="w-full mt-4">
//                   Place New Order
//                 </Button>
//               </div>
//             )}
//           </div>
//         </CardContent>
//       </Card>
//     )
//   }
  

interface OrderItem {
    id: string
    name: string
    price: number
    quantity: number
  }
  
  interface OrderSummaryProps {
    orderItems: OrderItem[]
    tableNumber: string
    total: number
    orderId: string | null
    onRatingSubmitted: (orderId: string, rating: number) => void
    initialRating?: number | null
    isPaid?: boolean
    onPayment: () => void
    onNewOrder: () => void
  }
  
  export function OrderSummary({
    orderItems,
    tableNumber,
    total,
    orderId,
    onRatingSubmitted,
    initialRating = null,
    isPaid = false,
    onPayment,
    onNewOrder,
  }: OrderSummaryProps) {
    const [rating, setRating] = useState<number | null>(initialRating)
    const [showSlipVerification, setShowSlipVerification] = useState(false)
    const [showRatingStars, setShowRatingStars] = useState(false)
    const { toast } = useToast()
  
    const handlePayment = () => {
      setShowSlipVerification(true)
    }
  
    const handleVerificationComplete = (success: boolean) => {
      if (success) {
        onPayment()
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
          onRatingSubmitted(orderId, selectedRating)
  
          toast({
            title: "Thank you for your feedback!",
            description: `You rated your experience ${selectedRating} stars.`,
          })
  
          // Reset the order after a delay
          setTimeout(() => {
            onNewOrder()
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
  
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Order Summary - Table {tableNumber}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {orderItems.map((item) => (
              <div key={item.id} className="flex justify-between">
                <span>
                  {item.name} x {item.quantity}
                </span>
                <span>฿{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="flex justify-between font-bold text-lg border-t pt-4">
              <span>Total:</span>
              <span>฿{total.toFixed(2)}</span>
            </div>
  
            {showSlipVerification ? (
              <SlipVerification
                expectedAmount={total}
                orderId={orderId || ""}
                onVerificationComplete={handleVerificationComplete}
              />
            ) : !isPaid ? (
              <Button onClick={handlePayment} className="w-full mt-4">
                Pay Now
              </Button>
            ) : null}
  
            {showRatingStars && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Thank you for your payment. Please rate your experience:</h3>
                <div className="flex justify-center space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Button
                      key={star}
                      variant={rating !== null && rating >= star ? "default" : "outline"}
                      size="lg"
                      onClick={() => handleRating(star)}
                    >
                      <Star className={rating !== null && rating >= star ? "fill-current" : ""} />
                    </Button>
                  ))}
                </div>
              </div>
            )}
  
            {rating !== null && !showRatingStars && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Thank you for your payment. Please rate your experience.</h3>
                <p>Your order summary is displayed above. We hope you enjoyed your meal.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    )
  }
    
  
  

