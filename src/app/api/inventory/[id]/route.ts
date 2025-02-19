import { NextResponse } from "next/server"
import db from "@/lib/db"

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const { quantity } = await request.json()
    const result = await db.query("UPDATE public.inventory SET quantity = $1 WHERE id = $2 RETURNING *", [quantity, params.id])
    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Inventory item not found" }, { status: 404 })
    }
    return NextResponse.json(result.rows[0])
  } catch (error) {
    console.error("Error updating inventory item:", error)
    return NextResponse.json({ error: "Failed to update inventory item" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const result = await db.query("DELETE FROM public.inventory WHERE id = $1 RETURNING *", [params.id])
    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Inventory item not found" }, { status: 404 })
    }
    return NextResponse.json({ message: "Inventory item deleted successfully" })
  } catch (error) {
    console.error("Error deleting inventory item:", error)
    return NextResponse.json({ error: "Failed to delete inventory item" }, { status: 500 })
  }
}

