import { NextResponse,NextRequest } from "next/server"
import db from "@/lib/db"
import type { OrderWithPayment } from "@/src/types"


// export async function GET() {
//   try {
//     const result = await db.query(`
//       SELECT 
//         o.id,
//         'FZ' || LPAD(o.id::text, 5, '0') as invoice_no,
//         o.table_number,
//         'Staff Name' as cashier_name,
//         TO_CHAR(o.timestamp, 'HH24:MI AM') as billing_time,
//         o.total_price,
//         COALESCE(ps.status, 
//           CASE 
//             WHEN EXTRACT(HOUR FROM o.timestamp) >= 0 
//             AND EXTRACT(HOUR FROM o.timestamp) < 2 THEN 'pending'
//             ELSE 'completed'
//           END
//         ) as status
//       FROM orders o
//       LEFT JOIN payment_slips ps ON o.id = ps.order_id
//       ORDER BY o.timestamp DESC
//     `)

//     return NextResponse.json({ orders: result.rows })
//   } catch (error) {
//     console.error("Failed to fetch orders:", error)
//     return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 })
//   }
// }
export async function GET() {
    try {
      const result = await db.query(`
        SELECT 
          o.id,
          'FZ' || LPAD(o.id::text, 5, '0') as invoice_no,
          o.table_number,
          o.status,
          o.timestamp as created_at,
          o.timestamp as updated_at,
          o.total_price,
          ps.id as payment_slip_id,
          ps.amount as payment_amount,
          ps.transfer_time,
          ps.status as payment_status,
          ps.transaction_id
        FROM orders o
        LEFT JOIN payment_slips ps ON o.id = ps.order_id
        ORDER BY o.timestamp DESC
      `)
  
      const orders: OrderWithPayment[] = result.rows.map((row) => ({
        id: row.id,
        invoiceNo: row.invoice_no,
        tableNumber: row.table_number,
        totalPrice: Number.parseFloat(row.total_price),
        status: row.status,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
        items: [], // You might want to fetch order items separately
        paymentSlip: row.payment_slip_id
          ? {
              id: row.payment_slip_id,
              amount: Number.parseFloat(row.payment_amount),
              transferTime: row.transfer_time,
              status: row.payment_status,
              transactionId: row.transaction_id,
            }
          : undefined,
      }))
  
      return NextResponse.json({ orders })
    } catch (error) {
      console.error("Failed to fetch orders:", error)
      return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 })
    }
  }
  


