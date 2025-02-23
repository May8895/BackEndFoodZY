export interface MenuItem {
    id: string
    name: string
    description: string
    price: number
    category: string
    image: string| null 
  }
  export interface MenuItemInput {
    name: string
    description: string
    price: number
    category: string
    image: File | string | null
  }  
  
  export interface InventoryItem {
    id: string
    name: string
    quantity: number
    unit: string
    threshold: number
    category: string
  }
  
  export interface OrderItem {
    id: string
    name: string
    quantity: number
    price: number
    specialInstructions?: string
  }
  
  export interface Order {
    id: string
    table_number: string
    items: OrderItem[]
    status: "pending" | "preparing" | "ready"
    timestamp: string
    total_price: number
    

  }
  export interface PaymentSlip {
    id: string
    order_id: string
    amount: number
    transfer_time: Date
    status: "pending" | "verified" | "rejected"
    transaction_id: string

  }

  export interface OrderWithPayment {
    id: string
    invoiceNo: string
    tableNumber: string
    totalPrice: number
    status: string
    createdAt: Date
    updatedAt: Date
    items: OrderItem[]
    paymentSlip?: {
      id: string
      amount: number
      transferTime: Date
      status: "pending" | "verified" | "rejected"
      transactionId: string
    }
  }
 
  
  
 
    
  
    
  
  
//   export interface MenuItem {
//     id: string
//     name: string
//     description: string
//     price: number // Ensure this is defined as a number
//     category: string
//     image: string
    
  
  
  