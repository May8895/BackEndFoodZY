
import { NextResponse } from "next/server"
import db from "@/lib/db"

interface OrderItem {
  id: string
  price: number
  quantity: number
}

interface OrderInput {
  table_number: string
  items: OrderItem[]
}


  
export async function GET() {
    try {
      const result = await db.query(`
        SELECT 
          o.*,
          oi.menu_id,
          oi.quantity,
          oi.special_instructions,
          m.name as item_name,
          m.price,
          ps.slip_url,
          ps.transfer_time,
          ps.status as slip_status,
          ps.transaction_id
        FROM orders o
        JOIN order_items oi ON o.id = oi.order_id
        JOIN menu m ON oi.menu_id = m.id
        LEFT JOIN payment_slips ps ON o.id = ps.order_id
        ORDER BY o.timestamp DESC
      `)
  
      const orders = result.rows.reduce((acc: { [key: string]: any }, row: any) => {
        if (!acc[row.id]) {
          acc[row.id] = {
            id: row.id,
            table_number: row.table_number,
            status: row.status,
            payment_status: row.payment_status,
            timestamp: row.timestamp,
            customer_rating: row.customer_rating,
            total_price: Number.parseFloat(row.total_price),
            items: [],
            slip_url: row.slip_url,
            slip: row.slip_url
              ? {
                  transfer_time: row.transfer_time,
                  status: row.slip_status,
                  transaction_id: row.transaction_id,
                }
              : null,
          }
        }
        acc[row.id].items.push({
          menu_id: row.menu_id,
          name: row.item_name,
          quantity: row.quantity,
          price: Number.parseFloat(row.price),
          special_instructions: row.special_instructions,
        })
        return acc
      }, {})
  
      return NextResponse.json(Object.values(orders))
    } catch (error) {
      console.error("Error fetching orders:", error)
      return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 })
    }
  }
export async function POST(request: Request) {
  try {
    const { table_number, items }: OrderInput = await request.json()

    const client = await db.query("BEGIN")

    // Calculate total price
    const totalPrice = items.reduce((total: number, item: OrderItem) => total + item.price * item.quantity, 0)

    // Create the order
    const orderResult = await db.query(
      "INSERT INTO public.orders (table_number, status, total_price) VALUES ($1, $2, $3) RETURNING id",
      [table_number, "pending", totalPrice],
    )
    const orderId = orderResult.rows[0].id

    // Insert order items
    for (const item of items) {
      await db.query("INSERT INTO public.order_items (order_id, menu_id, quantity) VALUES ($1, $2, $3)", [
        orderId,
        item.id,
        item.quantity,
      ])
    }

    await db.query("COMMIT")

    return NextResponse.json({ id: orderId, total_price: totalPrice }, { status: 201 })
  } catch (error) {
    await db.query("ROLLBACK")
    console.error("Error creating order:", error)
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 })
  }
}

