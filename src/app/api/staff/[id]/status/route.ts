import { type NextRequest, NextResponse } from "next/server"
import db from "@/lib/db"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const result = await db.query("SELECT status FROM staff WHERE id = $1", [params.id])

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Staff member not found" }, { status: 404 })
    }

    return NextResponse.json(result.rows[0])
  } catch (error) {
    console.error("Error fetching staff status:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    const { status } = await request.json()

    console.log(`Updating status for staff ID: ${id} to ${status}`)

    // Validate status value
    if (status !== "on_shift" && status !== "off_shift") {
      return NextResponse.json({ error: "Invalid status value. Must be 'on_shift' or 'off_shift'" }, { status: 400 })
    }

    const result = await db.query(
      `UPDATE staff 
       SET status = $1
       WHERE id = $2 
       RETURNING id, name, status`,
      [status, id],
    )

    if (result.rows.length === 0) {
      console.log(`No staff member found with ID: ${id}`)
      return NextResponse.json({ error: "Staff member not found" }, { status: 404 })
    }

    console.log(`Successfully updated status for staff ID: ${id}`)
    return NextResponse.json(result.rows[0])
  } catch (error) {
    console.error("Error updating staff status:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
