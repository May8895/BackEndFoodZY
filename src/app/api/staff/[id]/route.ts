import { type NextRequest, NextResponse } from "next/server"
import db from "@/lib/db"

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    const result = await db.query("SELECT * FROM public.staff WHERE id = $1", [id])

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Staff member not found" }, { status: 404 })
    }

    return NextResponse.json(result.rows[0])
  } catch (error) {
    console.error("Error fetching staff member:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    const body = await req.json()
    const {
      name,
      email,
      phone,
      position,
      service_period,
      status,
      image_url,
      education,
      skills,
      experience,
      assigned_section,
      performance,
      error_count,
      birth_date,
      nationality,
      language,
      address,
    } = body

    const result = await db.query(
      `UPDATE staff SET
        name = $1, email = $2, phone = $3, position = $4, service_period = $5,
        status = $6, image_url = $7, education = $8, skills = $9, experience = $10,
        assigned_section = $11, performance = $12, error_count = $13, birth_date = $14,
        nationality = $15, language = $16, address = $17, updated_at = CURRENT_TIMESTAMP
      WHERE id = $18 RETURNING *`,
      [
        name,
        email,
        phone,
        position,
        service_period,
        status,
        image_url,
        education,
        skills,
        experience,
        assigned_section,
        performance,
        error_count,
        birth_date,
        nationality,
        language,
        address,
        id,
      ],
    )

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Staff member not found" }, { status: 404 })
    }

    return NextResponse.json(result.rows[0])
  } catch (error) {
    console.error("Error updating staff member:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params
    const result = await db.query("DELETE FROM public.staff WHERE id = $1 RETURNING *", [id])

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Staff member not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Staff member deleted successfully" })
  } catch (error) {
    console.error("Error deleting staff member:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
