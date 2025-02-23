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
  
"use client"

import { useState,useEffect } from "react"
import { OrderForm } from "@/src/components/orders/OrderForm"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs"
import { Coffee, Utensils, ChefHat, Star, Clock, Sparkles } from "lucide-react"


// export default function Home() {
//   const [key, setKey] = useState(0)

//   const handleOrderPlaced = () => {
//     setKey((prevKey) => prevKey + 1)
//   }

//   return (
    
//     <div className="container mx-auto p-4">
//       <h1 className="text-3xl font-bold mb-8">Restaurant Management System</h1>
//       <Tabs defaultValue="order">
//         <TabsList>
//           <TabsTrigger value="order">Place Order</TabsTrigger>

//         </TabsList>
//         <TabsContent value="order">
//           <OrderForm onOrderPlaced={handleOrderPlaced} />
        
//           </TabsContent>
        
//       </Tabs>
//     </div>
    
//   )
// }
export default function Home() {
    const [key, setKey] = useState(0)
    const [showWelcome, setShowWelcome] = useState(true)
  
    useEffect(() => {
      const timer = setTimeout(() => {
        setShowWelcome(false)
      }, 3000)
  
      return () => clearTimeout(timer)
    }, [])
  
    const handleOrderPlaced = () => {
      setKey((prevKey) => prevKey + 1)
    }
  
    if (showWelcome) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-white">
          <div className="text-center">
            <ChefHat className="w-24 h-24 text-amber-500 mx-auto mb-4 animate-bounce" />
            <h1 className="text-4xl font-bold text-amber-800 mb-2 animate-pulse">Welcome to</h1>
            <h2 className="text-5xl font-extrabold text-amber-600 animate-pulse">Restaurant Management System</h2>
          </div>
        </div>
      )
    }
  
    return (
      <div className="min-h-screen bg-white relative">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-r from-amber-100 to-orange-100"></div>
        <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-r from-orange-100 to-amber-100"></div>
        <div className="absolute top-20 left-10 w-40 h-40 bg-amber-50 rounded-full opacity-50"></div>
        <div className="absolute bottom-20 right-10 w-60 h-60 bg-orange-50 rounded-full opacity-50"></div>
  
        <div className="container mx-auto p-8 relative z-10">
          <header className="text-center mb-12 relative">
            <div className="inline-block bg-gradient-to-r from-amber-400 to-orange-400 p-6 rounded-full shadow-lg mb-6 transform hover:scale-105 transition-transform">
              <ChefHat className="w-20 h-20 text-white" />
            </div>
            <h1 className="text-6xl font-bold text-amber-800 mb-4 relative">
              Restaurant Management System
              <Sparkles className="absolute -top-6 -right-6 w-12 h-12 text-yellow-400 animate-pulse" />
            </h1>
            <p className="text-amber-600 text-2xl font-light">Elevate Your Dining Experience</p>
          </header>
  
          <div className="bg-white rounded-2xl shadow-2xl p-8 mb-12 border border-amber-100 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-amber-400 to-orange-400"></div>
            <Tabs defaultValue="order" className="space-y-8">
              <TabsList className="bg-gradient-to-r from-amber-100 to-orange-100 p-2 rounded-full flex justify-center">
                <TabsTrigger
                  value="order"
                  className="rounded-full px-8 py-4 data-[state=active]:bg-white data-[state=active]:text-amber-800 transition-all text-xl font-semibold shadow-md hover:shadow-lg"
                >
                  <Utensils className="w-6 h-6 mr-3 inline-block" />
                  Place Order
                </TabsTrigger>
              </TabsList>
              <TabsContent
                value="order"
                className="bg-gradient-to-br from-amber-50 to-orange-50 p-10 rounded-xl border border-amber-200 shadow-inner"
              >
                <div className="mb-8 text-center">
                  <h2 className="text-4xl font-semibold text-amber-800 mb-3">New Order</h2>
                  <p className="text-amber-600 text-xl">Customize your culinary experience</p>
                </div>
                <div className="bg-white p-8 rounded-xl shadow-lg border border-amber-100">
                  <OrderForm onOrderPlaced={handleOrderPlaced} />
                </div>
              </TabsContent>
            </Tabs>
          </div>
  
          {/* Feature section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              { icon: Coffee, title: "Quick Service", description: "Lightning-fast order processing" },
              { icon: Star, title: "Quality Assurance", description: "Guaranteed satisfaction with every dish" },
              { icon: Clock, title: "24/7 Availability", description: "Always at your service" },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-8 shadow-lg text-center hover:shadow-xl transition-shadow border border-amber-100 transform hover:-translate-y-1 transition-transform"
              >
                <div className="bg-gradient-to-br from-amber-400 to-orange-400 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-amber-800 mb-3">{feature.title}</h3>
                <p className="text-amber-600 text-lg">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
  
        <footer className="text-center pb-8 text-amber-700 relative z-10">
          <p className="text-lg">© 2025 Restaurant Management System. All rights reserved.</p>
          <div className="mt-4 flex justify-center space-x-6">
            <a href="#" className="text-amber-600 hover:text-amber-800 transition-colors text-lg">
              Terms of Service
            </a>
            <a href="#" className="text-amber-600 hover:text-amber-800 transition-colors text-lg">
              Privacy Policy
            </a>
            <a href="#" className="text-amber-600 hover:text-amber-800 transition-colors text-lg">
              Contact Us
            </a>
          </div>
        </footer>
      </div>
    )
  }
  