import { NextResponse } from "next/server"
import db from "@/lib/db"

export async function GET() {
  try {
    const result = await db.query(`
      SELECT o.*, oi.menu_id, oi.quantity, oi.special_instructions, m.name as item_name
      FROM orders o
      JOIN order_items oi ON o.id = oi.order_id
      JOIN menu m ON oi.menu_id = m.id
      ORDER BY o.timestamp DESC
    `)

    const orders = result.rows.reduce((acc, row) => {
      if (!acc[row.id]) {
        acc[row.id] = {
          id: row.id,
          table_number: row.table_number,
          status: row.status,
          timestamp: row.timestamp,
          items: [],
        }
      }
      acc[row.id].items.push({
        menu_id: row.menu_id,
        name: row.item_name,
        quantity: row.quantity,
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
    const { table_number, items } = await request.json()

    const client = await db.query("BEGIN")

    // Create the order
    const orderResult = await db.query("INSERT INTO public.orders (table_number, status) VALUES ($1, $2) RETURNING id", [
      table_number,
      "pending",
    ])
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

    return NextResponse.json({ id: orderId }, { status: 201 })
  } catch (error) {
    await db.query("ROLLBACK")
    console.error("Error creating order:", error)
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 })
  }
}

