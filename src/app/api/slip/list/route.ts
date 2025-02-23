import { NextResponse } from "next/server"
import db from "@/lib/db"

export async function GET() {
  try {
    const result = await db.query(`
      SELECT 
        ps.*,
        o.total_price as expected_amount
      FROM payment_slips ps
      JOIN orders o ON ps.order_id = o.id
      ORDER BY ps.uploaded_at DESC
    `)

    return NextResponse.json({ slips: result.rows })
  } catch (error) {
    console.error("Failed to fetch payment slips:", error)
    return NextResponse.json({ error: "Failed to fetch payment slips" }, { status: 500 })
  }
}

