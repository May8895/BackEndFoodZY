
// import { NextResponse } from "next/server"
// import db from "@/lib/db"
// import { writeFile, mkdir } from "fs/promises"
// import path from "path"

// async function ensureUploadsDirectory() {
//   const uploadsDir = path.join(process.cwd(), "public", "uploads")
//   try {
//     await mkdir(uploadsDir, { recursive: true })
//   } catch (error) {
//     // Directory already exists or cannot be created
//     console.error("Error creating uploads directory:", error)
//   }
// }

// export async function POST(request: Request) {
//   try {
//     await ensureUploadsDirectory()
//     const formData = await request.formData()
//     const name = formData.get("name") as string
//     const description = formData.get("description") as string
//     const price = Number.parseFloat(formData.get("price") as string)
//     const category = formData.get("category") as string
//     const image = formData.get("image") as File | null

//     let imagePath = ""
//     if (image && image instanceof File) {
//       const bytes = await image.arrayBuffer()
//       const buffer = Buffer.from(bytes)
//       const fileName = `${Date.now()}-${image.name}`
//       const filePath = path.join(process.cwd(), "public", "uploads", fileName)
//       await writeFile(filePath, buffer)
//       imagePath = `/uploads/${fileName}`
//     }

//     const result = await db.query(
//       `INSERT INTO menu (name, description, price, category, image)
//        VALUES ($1, $2, $3, $4, $5)
//        RETURNING *`,
//       [name, description, price, category, imagePath],
//     )

//     const newItem = result.rows[0]

//     return NextResponse.json(newItem, { status: 201 })
//   } catch (error) {
//     console.error("Error adding new menu item:", error)
//     return NextResponse.json({ error: "Failed to add new menu item" }, { status: 500 })
//   }
// }

// export async function GET() {
//   try {
//     const result = await db.query("SELECT * FROM menu")
//     return NextResponse.json(result.rows)
//   } catch (error) {
//     console.error("Error fetching menu items:", error)
//     return NextResponse.json({ error: "Failed to fetch menu items" }, { status: 500 })
//   }
// }

import { NextResponse } from "next/server"
import db from "@/lib/db"
import fs from "fs"
import path from "path"
import sharp from "sharp"
import { put } from "@vercel/blob"


// function ensureUploadsDirectory() {
//   const uploadsDir = path.join(process.cwd(), "public", "uploads")
//   if (!fs.existsSync(uploadsDir)) {
//     try {
//       fs.mkdirSync(uploadsDir, { recursive: true })
//     } catch (error) {
//       console.error("Error creating uploads directory:", error)
//     }
//   }
// }

// function optimizeImage(buffer: Buffer, fileName: string): string {
//   const optimizedFileName = `optimized-${fileName}`
//   const filePath = path.join(process.cwd(), "public", "uploads", optimizedFileName)

//   sharp(buffer)
//     .resize(800, 600, { fit: "inside", withoutEnlargement: true })
//     .webp({ quality: 80 })
//     .toFile(filePath, (err) => {
//       if (err) {
//         console.error("Error optimizing image:", err)
//       }
//     })

//   return `/uploads/${optimizedFileName}`
// }

// function processSVG(buffer: Buffer, fileName: string): string {
//   const svgFileName = `${fileName.replace(/\.[^/.]+$/, "")}.svg`
//   const filePath = path.join(process.cwd(), "public", "uploads", svgFileName)

//   fs.writeFileSync(filePath, buffer)

//   return `/uploads/${svgFileName}`
// }

// export async function POST(request: Request) {
//   try {
//     ensureUploadsDirectory()
//     const formData = await request.formData()
//     const name = formData.get("name") as string
//     const description = formData.get("description") as string
//     const price = Number.parseFloat(formData.get("price") as string)
//     const category = formData.get("category") as string
//     const image = formData.get("image") as File | null

//     let imagePath = ""
//     if (image && image instanceof File) {
//       const bytes = await image.arrayBuffer()
//       const buffer = Buffer.from(bytes)
//       const fileName = `${Date.now()}-${image.name.replace(/\s+/g, "-")}`

//       if (image.type === "image/svg+xml") {
//         imagePath = processSVG(buffer, fileName)
//       } else {
//         imagePath = optimizeImage(buffer, fileName)
//       }

//       console.log("Image saved at:", imagePath)
//     }

//     const result = await db.query(
//       `INSERT INTO menu (name, description, price, category, image)
//        VALUES ($1, $2, $3, $4, $5)
//        RETURNING *`,
//       [name, description, price, category, imagePath],
//     )

//     const newItem = result.rows[0]

//     return NextResponse.json(newItem, { status: 201 })
//   } catch (error) {
//     console.error("Error adding new menu item:", error)
//     return NextResponse.json({ error: "Failed to add new menu item" }, { status: 500 })
//   }
// }

// export async function GET() {
//   try {
//     const result = await db.query("SELECT * FROM public.menu")
//     return NextResponse.json(result.rows)
//   } catch (error) {
//     console.error("Error fetching menu items:", error)
//     return NextResponse.json({ error: "Failed to fetch menu items" }, { status: 500 })
//   }
// }

// export async function PUT(request: Request, { params }: { params: { id: string } }) {
//   try {
//     const formData = await request.formData()
//     const name = formData.get("name") as string
//     const description = formData.get("description") as string
//     const price = Number.parseFloat(formData.get("price") as string)
//     const category = formData.get("category") as string
//     const image = formData.get("image") as File | null

//     let imagePath = ""
//     if (image && image instanceof File) {
//       const bytes = await image.arrayBuffer()
//       const buffer = Buffer.from(bytes)
//       const fileName = `${Date.now()}-${image.name.replace(/\s+/g, "-")}`

//       if (image.type === "image/svg+xml") {
//         imagePath = processSVG(buffer, fileName)
//       } else {
//         imagePath = optimizeImage(buffer, fileName)
//       }

//       console.log("Updated image saved at:", imagePath)
//     } else {
//       // If no new image is provided, keep the existing image path
//       const existingItem = await db.query("SELECT image FROM public.menu WHERE id = $1", [params.id])
//       imagePath = existingItem.rows[0]?.image || ""
//     }

//     const result = await db.query(
//       `UPDATE menu 
//        SET name = $1, description = $2, price = $3, category = $4, image = $5 
//        WHERE id = $6 
//        RETURNING *`,
//       [name, description, price, category, imagePath, params.id],
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
//     const result = await db.query("DELETE FROM public.menu WHERE id = $1 RETURNING *", [params.id])

//     if (result.rows.length === 0) {
//       return NextResponse.json({ error: "Menu item not found" }, { status: 404 })
//     }

//     // Optionally, you can delete the associated image file here
//     const deletedItem = result.rows[0]
//     if (deletedItem.image) {
//       const imagePath = path.join(process.cwd(), "public", deletedItem.image)
//       if (fs.existsSync(imagePath)) {
//         fs.unlinkSync(imagePath)
//       }
//     }

//     return NextResponse.json({ message: "Menu item deleted successfully" })
//   } catch (error) {
//     console.error("Error deleting menu item:", error)
//     return NextResponse.json({ error: "Failed to delete menu item" }, { status: 500 })
//   }
// }
// export async function POST(request: Request) {
//     try {
//       const formData = await request.formData()
//       const name = formData.get("name") as string
//       const description = formData.get("description") as string
//       const price = Number.parseFloat(formData.get("price") as string)
//       const category = formData.get("category") as string
//       const image = formData.get("image") as File | null
  
//       let imageUrl = ""
//       if (image && image instanceof File) {
//         const filename = `${Date.now()}-${image.name.replace(/\s+/g, "-")}`
//         const blob = await put(filename, image, { access: "public" })
//         imageUrl = blob.url
//         console.log("Image uploaded to Blob Storage:", imageUrl)
//       }
  
//       const result = await db.query(
//         `INSERT INTO menu (name, description, price, category, image)
//          VALUES ($1, $2, $3, $4, $5)
//          RETURNING *`,
//         [name, description, price, category, imageUrl],
//       )
  
//       const newItem = result.rows[0]
//       return NextResponse.json(newItem, { status: 201 })
//     } catch (error) {
//       console.error("Error adding new menu item:", error)
//       return NextResponse.json({ error: "Failed to add new menu item" }, { status: 500 })
//     }
//   }

  
  
//   export async function GET() {
//     try {
//       const result = await db.query("SELECT * FROM menu")
//       return NextResponse.json(result.rows)
//     } catch (error) {
//       console.error("Error fetching menu items:", error)
//       return NextResponse.json({ error: "Failed to fetch menu items" }, { status: 500 })
//     }
//   }
  
export async function POST(request: Request) {
    try {
      const formData = await request.formData()
      const name = formData.get("name") as string
      const description = formData.get("description") as string
      const price = Number.parseFloat(formData.get("price") as string)
      const category = formData.get("category") as string
      const image = formData.get("image")
  
      if (!name || !description || isNaN(price) || !category) {
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
      }
  
      let imageUrl: string | null = null
      if (image instanceof File) {
        try {
          const filename = `${Date.now()}-${image.name.replace(/\s+/g, "-")}`
          const blob = await put(filename, image, { access: "public" })
          imageUrl = blob.url
          console.log("Image uploaded to Blob Storage:", imageUrl)
        } catch (error) {
          console.error("Error uploading image:", error)
          return NextResponse.json({ error: "Failed to upload image" }, { status: 500 })
        }
      } else if (typeof image === "string") {
        imageUrl = image
      }
  
      const result = await db.query(
        `INSERT INTO menu (name, description, price, category, image)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING *`,
        [name, description, price, category, imageUrl],
      )
  
      const newItem = result.rows[0]
      return NextResponse.json(newItem, { status: 201 })
    } catch (error) {
      console.error("Error adding new menu item:", error)
      return NextResponse.json({ error: "Failed to add new menu item" }, { status: 500 })
    }
  }
  
  export async function GET() {
    try {
      const result = await db.query("SELECT * FROM menu")
      return NextResponse.json(result.rows)
    } catch (error) {
      console.error("Error fetching menu items:", error)
      return NextResponse.json({ error: "Failed to fetch menu items" }, { status: 500 })
    }
  }
  


