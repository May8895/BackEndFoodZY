import { NextResponse } from "next/server"
import db from "@/lib/db"
import type { InventoryItem } from "@/src/types"

export async function POST(request: Request) {
  try {
    const body: Omit<InventoryItem, "id"> = await request.json()
    const { name, category, quantity, unit, threshold } = body

    const result = await db.query(
      `INSERT INTO public.inventory (name, category, quantity, unit, threshold)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [name, category, quantity, unit, threshold],
    )

    const newProduct: InventoryItem = result.rows[0]

    return NextResponse.json(newProduct, { status: 201 })
  } catch (error) {
    console.error("Error adding new product:", error)
    return NextResponse.json({ error: "Failed to add new product" }, { status: 500 })
  }
}

export async function GET() {
  try {
    const result = await db.query("SELECT * FROM public.inventory")
    return NextResponse.json(result.rows)
  } catch (error) {
    console.error("Error fetching inventory items:", error)
    return NextResponse.json({ error: "Failed to fetch inventory items" }, { status: 500 })
  }
}

