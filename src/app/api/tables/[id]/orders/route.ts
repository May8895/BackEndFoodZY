import { NextResponse } from "next/server"
import { addOrder, updateOrderStatus } from "@/lib/db-operations"
import type { OrderItem } from "@/src/components/floor-plan/floor-plan"

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const newOrder: Omit<OrderItem, "id" | "status"> = await request.json()
    await addOrder(params.id, newOrder)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error adding order:", error)
    return NextResponse.json({ error: "Failed to add order" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const { orderId, status } = await request.json()
    await updateOrderStatus(params.id, orderId, status)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating order status:", error)
    return NextResponse.json({ error: "Failed to update order status" }, { status: 500 })
  }
}
