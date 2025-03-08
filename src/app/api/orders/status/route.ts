import { NextResponse } from "next/server"
import db from "@/lib/db"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const result = await db.query("SELECT status FROM orders WHERE id = $1", [params.id])

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    return NextResponse.json({ status: result.rows[0].status })
  } catch (error) {
    console.error("Error fetching order status:", error)
    return NextResponse.json({ error: "Failed to fetch order status" }, { status: 500 })
  }
}

