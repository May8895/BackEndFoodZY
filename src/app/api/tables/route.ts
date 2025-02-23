import { NextResponse } from "next/server"
import { getTables, addTable } from "@/lib/db-operations"
import type { TableData } from "@/src/components/floor-plan/floor-plan"

export async function GET() {
  try {
    const tables = await getTables()
    return NextResponse.json(tables)
  } catch (error) {
    console.error("Error fetching tables:", error)
    return NextResponse.json({ error: "Failed to fetch tables" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const newTable: Omit<TableData, "id" | "orders"> = await request.json()
    const addedTable = await addTable(newTable)
    return NextResponse.json(addedTable)
  } catch (error) {
    console.error("Error adding table:", error)
    return NextResponse.json({ error: "Failed to add table" }, { status: 500 })
  }
}