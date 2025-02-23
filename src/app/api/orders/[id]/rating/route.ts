import { NextResponse } from "next/server"
import db from "@/lib/db"

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const { rating } = await request.json()

    if (typeof rating !== "number" || rating < 1 || rating > 5) {
      return NextResponse.json({ error: "Invalid rating" }, { status: 400 })
    }

    const result = await db.query(`UPDATE orders SET customer_rating = $1 WHERE id = $2 RETURNING *`, [
      rating,
      params.id,
    ])

    if (result.rowCount === 0) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    const updatedOrder = result.rows[0]

    return NextResponse.json(updatedOrder)
  } catch (error) {
    console.error("Error updating order rating:", error)
    return NextResponse.json({ error: "Failed to update order rating" }, { status: 500 })
  }
}



