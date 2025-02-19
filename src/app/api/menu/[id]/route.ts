// import { NextResponse } from "next/server"
// import db from "@/lib/db"

// export async function PUT(request: Request, { params }: { params: { id: string } }) {
//   try {
//     const { name, description, price, category } = await request.json()
//     const result = await db.query(
//       "UPDATE menu SET name = $1, description = $2, price = $3, category = $4 WHERE id = $5 RETURNING *",
//       [name, description, price, category, params.id],
//     )
//     if (result.rows.length === 0) {
//       return NextResponse.json({ error: "Menu item not found" }, { status: 404 })
//     }
//     return NextResponse.json(result.rows[0])
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
// import { NextResponse } from "next/server"
// import db from "@/lib/db"

// export async function DELETE(request: Request, { params }: { params: { id: string } }) {
//   try {
//     // Start a transaction
//     await db.query("BEGIN")

//     // First, delete all references in the order_items table
//     await db.query("DELETE FROM order_items WHERE menu_id = $1", [params.id])

//     // Then, delete the menu item
//     const result = await db.query("DELETE FROM menu WHERE id = $1 RETURNING *", [params.id])

//     // Commit the transaction
//     await db.query("COMMIT")

//     if (result.rows.length === 0) {
//       return NextResponse.json({ error: "Menu item not found" }, { status: 404 })
//     }

//     return NextResponse.json({ message: "Menu item deleted successfully" })
//   } catch (error) {
//     // Rollback the transaction in case of error
//     await db.query("ROLLBACK")
//     console.error("Error deleting menu item:", error)
//     return NextResponse.json({ error: "Failed to delete menu item" }, { status: 500 })
//   }
// }

// // Keep the existing PUT method as is
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
import { NextResponse } from "next/server"
import db from "@/lib/db"

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    // Start a transaction
    await db.query("BEGIN")

    // First, delete all references in the order_items table
    await db.query("DELETE FROM public.order_items WHERE menu_id = $1", [params.id])

    // Then, delete the menu item
    const result = await db.query("DELETE FROM public.menu WHERE id = $1 RETURNING *", [params.id])

    // Commit the transaction
    await db.query("COMMIT")

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Menu item not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Menu item deleted successfully" })
  } catch (error) {
    // Rollback the transaction in case of error
    await db.query("ROLLBACK")
    console.error("Error deleting menu item:", error)
    return NextResponse.json({ error: "Failed to delete menu item" }, { status: 500 })
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const formData = await request.formData()
    const name = formData.get("name") as string
    const description = formData.get("description") as string
    const price = Number.parseFloat(formData.get("price") as string)
    const category = formData.get("category") as string
    const image = formData.get("image") as string

    const result = await db.query(
      "UPDATE public.menu SET name = $1, description = $2, price = $3, category = $4, image = $5 WHERE id = $6 RETURNING *",
      [name, description, price, category, image, params.id],
    )

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Menu item not found" }, { status: 404 })
    }

    return NextResponse.json(result.rows[0])
  } catch (error) {
    console.error("Error updating menu item:", error)
    return NextResponse.json({ error: "Failed to update menu item" }, { status: 500 })
  }
}





