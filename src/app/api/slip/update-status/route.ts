import { NextResponse } from "next/server"
import db from "@/lib/db"

// export async function POST(request: Request) {
//   try {
//     const { slipId, status } = await request.json()

//     if (!slipId || !status) {
//       return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
//     }

//     // Update slip status
//     await db.query(
//       `UPDATE payment_slips
//        SET status = $1, verified_at = CURRENT_TIMESTAMP
//        WHERE id = $2`,
//       [status, slipId],
//     )

//     // If verified, update order status
//     if (status === "verified") {
//       await db.query(
//         `UPDATE orders o
//          SET status = 'paid'
//          FROM payment_slips ps
//          WHERE ps.id = $1 AND o.id = ps.order_id`,
//         [slipId],
//       )
//     }

//     return NextResponse.json({ success: true })
//   } catch (error) {
//     console.error("Failed to update slip status:", error)
//     return NextResponse.json({ error: "Failed to update slip status" }, { status: 500 })
//   }
// }
export async function POST(request: Request) {
    try {
      const { slipId, status } = await request.json()
  
      if (!slipId || !status) {
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
      }
  
      // Update slip status
      const result = await db.query(
        `UPDATE payment_slips
         SET status = $1, verified_at = CURRENT_TIMESTAMP
         WHERE id = $2
         RETURNING *`,
        [status, slipId],
      )
  
      if (result.rowCount === 0) {
        return NextResponse.json({ error: "Payment slip not found" }, { status: 404 })
      }
  
      const updatedSlip = result.rows[0]
  
      return NextResponse.json({ success: true, updatedSlip })
    } catch (error) {
      console.error("Failed to update slip status:", error)
      return NextResponse.json({ error: "Failed to update slip status" }, { status: 500 })
    }
  }
  
