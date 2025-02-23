
import { NextResponse } from "next/server"
import { updateTable, removeTable } from "@/lib/db-operations"
import type { TableData } from "@/src/components/floor-plan/floor-plan"

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const updatedTable: TableData & { floor: number } = await request.json()
    const result = await updateTable(updatedTable)
    return NextResponse.json(result)
  } catch (error) {
    console.error("Error updating table:", error)
    return NextResponse.json({ error: "Failed to update table" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await removeTable(params.id)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error removing table:", error)
    return NextResponse.json({ error: "Failed to remove table" }, { status: 500 })
  }
}