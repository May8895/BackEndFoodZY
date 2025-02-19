export interface MenuItem {
    id: string
    name: string
    description: string
    price: number
    category: string
    image: string 
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
    specialInstructions?: string
  }
  
  export interface Order {
    id: string
    table_number: string
    items: OrderItem[]
    status: "pending" | "preparing" | "ready"
    timestamp: string
  }
  export interface MenuItem {
    id: string
    name: string
    description: string
    price: number // Ensure this is defined as a number
    category: string
    image: string 
  }
  
  