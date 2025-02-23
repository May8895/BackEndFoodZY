// import { Layout } from "@/src/components/layout"
// import { MenuManagement } from "@/src/components/orders/menu-management"
// import { OrderProcessing } from "@/src/components/orders/order-processing"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs"
// import { OrderForm } from "@/src/components/orders/OrderForm"
// export default function OrdersPage() {
//   return (
//     <Layout>
//       <div className="flex flex-col gap-6">
//         <div>
//           <h1 className="text-3xl font-bold">Orders</h1>
//           <p className="text-gray-500">Manage orders and menu items</p>
//         </div>
//         <Tabs defaultValue="processing">
//           <TabsList>
//             <TabsTrigger value="processing">Order Processing</TabsTrigger>
//             <TabsTrigger value="order"> OrderForm </TabsTrigger>
//             <TabsTrigger value="menu">Menu Management</TabsTrigger>
//           </TabsList>
//           <TabsContent value="processing">
//             <OrderProcessing />
//           </TabsContent>
          

        

//           <TabsContent value="menu">
//             <MenuManagement />
//           </TabsContent>
//         </Tabs>
//       </div>
//     </Layout>
//   )
// }

"use client"
import { Layout } from "@/src/components/layout"

import { useState } from "react"
import { OrderForm } from "@/src/components/orders/OrderForm"
import { OrderProcessing } from "@/src/components/orders/order-processing"
import { MenuManagement } from "@/src/components/orders/menu-management"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs"
import {TableOrderSummary} from "@/src/components/orders/TableOrderSummary"


export default function Home() {
  const [key, setKey] = useState(0)

  const handleOrderPlaced = () => {
    setKey((prevKey) => prevKey + 1)
  }

  return (
    <Layout>
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Restaurant Management System</h1>
      <Tabs defaultValue="order">
        <TabsList>
          <TabsTrigger value="order">Place Order</TabsTrigger>
          <TabsTrigger value="Summary">Orders Summary</TabsTrigger>

          <TabsTrigger value="processing">Order Processing</TabsTrigger>
          <TabsTrigger value="menu">Menu Management</TabsTrigger>
        </TabsList>
        <TabsContent value="order">
          <OrderForm onOrderPlaced={handleOrderPlaced} />
        </TabsContent>
        <TabsContent value="Summary">
          <TableOrderSummary  />
        </TabsContent>
        <TabsContent value="processing">
          <OrderProcessing key={key} />
        </TabsContent>
        <TabsContent value="menu">
          <MenuManagement />
        </TabsContent>
      </Tabs>
    </div>
    </Layout>
  )
}

