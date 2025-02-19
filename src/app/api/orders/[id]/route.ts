

// import { NextResponse } from "next/server"
// import db from "@/lib/db"

// export async function PUT(request: Request, { params }: { params: { id: string } }) {
//   try {
//     const { name, description, price, category, image } = await request.json()
//     const numericPrice = Number(price)

//     const result = await db.query(
//       "UPDATE menu SET name = $1, description = $2, price = $3, category = $4, image = $5 WHERE id = $6 RETURNING *",
//       [name, description, numericPrice, category, image, params.id],
//     )

//     if (result.rows.length === 0) {
//       return NextResponse.json({ error: "Menu item not found" }, { status: 404 })
//     }

//     const updatedItem = {
//       ...result.rows[0],
//       price: Number(result.rows[0].price), // Convert PostgreSQL numeric to JavaScript number
//     }

//     return NextResponse.json(updatedItem)
//   } catch (error) {
//     console.error("Error updating menu item:", error)
//     return NextResponse.json({ error: "Failed to update menu item" }, { status: 500 })
//   }
// }

// export async function DELETE(request: Request, { params }: { params: { id: string } }) {
//   try {
//     const result = await db.query("DELETE FROM menu WHERE id = $1 RETURNING *", [params.id])
//     if (result.rows.length === 0) {
//       return NextResponse.json({ error: "Menu item not found" }, { status: 404 })
//     }
//     return NextResponse.json({ message: "Menu item deleted successfully" })
//   } catch (error) {
//     console.error("Error deleting menu item:", error)
//     return NextResponse.json({ error: "Failed to delete menu item" }, { status: 500 })
//   }
// }
import { NextResponse } from "next/server"
import db from "@/lib/db"

// export async function PUT(request: Request, { params }: { params: { id: string } }) {
//   try {
//     const { status } = await request.json()

//     // Validate the status
//     const validStatuses = ["pending", "preparing", "ready"]
//     if (!validStatuses.includes(status)) {
//       return NextResponse.json({ error: "Invalid status" }, { status: 400 })
//     }

//     const result = await db.query(
//       "UPDATE orders SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *",
//       [status, params.id],
//     )

//     if (result.rows.length === 0) {
//       return NextResponse.json({ error: "Order not found" }, { status: 404 })
//     }

//     return NextResponse.json(result.rows[0])
//   } catch (error) {
//     console.error("Error updating order status:", error)
//     return NextResponse.json({ error: "Failed to update order status" }, { status: 500 })
//   }
// }
export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
      const { status } = await request.json()
  
      // Validate the status
      const validStatuses = ["pending", "preparing", "ready"]
      if (!validStatuses.includes(status)) {
        return NextResponse.json({ error: "Invalid status" }, { status: 400 })
      }
  
      const result = await db.query("UPDATE public.orders SET status = $1 WHERE id = $2 RETURNING *", [status, params.id])
  
      if (result.rows.length === 0) {
        return NextResponse.json({ error: "Order not found" }, { status: 404 })
      }
  
      return NextResponse.json(result.rows[0])
    } catch (error) {
      console.error("Error updating order status:", error)
      return NextResponse.json({ error: "Failed to update order status" }, { status: 500 })
    }
  }
  
  

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    // First, delete related order items
    await db.query("DELETE FROM public.order_items WHERE order_id = $1", [params.id])

    // Then, delete the order
    const result = await db.query("DELETE FROM orders WHERE id = $1 RETURNING *", [params.id])

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Order deleted successfully" })
  } catch (error) {
    console.error("Error deleting order:", error)
    return NextResponse.json({ error: "Failed to delete order" }, { status: 500 })
  }
}



