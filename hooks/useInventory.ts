"use client"

import { useState, useEffect , useCallback } from "react"
import type { InventoryItem } from "@/src/types"

export function useInventory() {
    const [inventory, setInventory] = useState<InventoryItem[]>([])
  
    const fetchInventory = useCallback(async () => {
      try {
        const response = await fetch("/api/inventory")
        if (!response.ok) throw new Error("Failed to fetch inventory")
        const data: InventoryItem[] = await response.json()
        setInventory(data)
      } catch (error) {
        console.error("Error fetching inventory:", error)
      }
    }, [])
  
    useEffect(() => {
      fetchInventory()
    }, [fetchInventory])
  
    const getLowStockItems = useCallback(() => {
      return inventory.filter((item) => item.quantity <= item.threshold)
    }, [inventory])
  
    return {
      inventory,
      getLowStockItems,
      refetchInventory: fetchInventory,
    }
  }
  
  

