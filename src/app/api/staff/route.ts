// import { type NextRequest, NextResponse } from "next/server"
// import db from "@/lib/db"
// import { writeFile } from "fs/promises"
// import path from "path"
// import fs from "fs"
// export async function GET(req: NextRequest) {
//   try {
//     const result = await db.query("SELECT * FROM public.staff ORDER BY created_at DESC")
//     return NextResponse.json(result.rows)
//   } catch (error) {
//     console.error("Error fetching staff:", error)
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
//   }
// }

// // export async function POST(req: NextRequest) {
// //     try {
// //       const body = await req.json()
// //       const {
// //         name,
// //         email,
// //         phone,
// //         position,
// //         service_period,
// //         status,
// //         image_url,
// //         education,
// //         skills,
// //         experience,
// //         assigned_section,
// //         performance,
// //         error_count,
// //         birth_date,
// //         nationality,
// //         language,
// //         address,
// //       } = body
  
// //       // Ensure required fields are present
// //       if (!name || !email || !phone || !position) {
// //         return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
// //       }
  
// //       const result = await db.query(
// //         `INSERT INTO staff (
// //           name, email, phone, position, service_period, status, image_url,
// //           education, skills, experience, assigned_section, performance,
// //           error_count, birth_date, nationality, language, address
// //         ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17) RETURNING *`,
// //         [
// //           name,
// //           email,
// //           phone,
// //           position,
// //           service_period || "0 years", // Provide default values for optional fields
// //           status || "active",
// //           image_url || null,
// //           education || "",
// //           skills || [],
// //           experience || "0 years",
// //           assigned_section || "",
// //           performance || 100,
// //           error_count || 0,
// //           birth_date,
// //           nationality,
// //           language,
// //           address,
// //         ],
// //       )
  
// //       return NextResponse.json(result.rows[0], { status: 201 })
// //     } catch (error) {
// //       console.error("Error creating staff:", error)
// //       return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
// //     }
// //   }

// export const config = {
//     api: {
//       bodyParser: false,
//     },
//   }
//   export async function POST(req: NextRequest) {
//     try {
//       const formData = await req.formData()
//       const name = formData.get("name") as string
//       const email = formData.get("email") as string
//       const phone = formData.get("phone") as string
//       const position = formData.get("position") as string
//       const service_period = formData.get("service_period") as string
//       const status = formData.get("status") as string
//       const education = formData.get("education") as string
//       const skills = formData.get("skills") as string
//       const experience = formData.get("experience") as string
//       const assigned_section = formData.get("assigned_section") as string
//       const performance = formData.get("performance") as string
//       const error_count = formData.get("error_count") as string
//       const birth_date = formData.get("birth_date") as string
//       const nationality = formData.get("nationality") as string
//       const language = formData.get("language") as string
//       const address = formData.get("address") as string
//       const image = formData.get("image") as File | null
  
//       // Ensure required fields are present
//       if (!name || !email || !phone || !position) {
//         return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
//       }
  
//       let image_url = null
//       if (image) {
//         const bytes = await image.arrayBuffer()
//         const buffer = Buffer.from(bytes)
  
//         // Create a unique filename
//         const fileExtension = path.extname(image.name)
//         const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}${fileExtension}`
  
//         // Ensure the uploads directory exists
//         const uploadsDir = path.join(process.cwd(), "public", "uploads")
//         try {
//           if (!fs.existsSync(uploadsDir)) {
//             fs.mkdirSync(uploadsDir, { recursive: true })
//           }
//         } catch (err) {
//           console.error("Error creating uploads directory:", err)
//           return NextResponse.json({ error: "Failed to create uploads directory" }, { status: 500 })
//         }
  
//         // Write the file
//         try {
//           await writeFile(path.join(uploadsDir, fileName), buffer)
//           image_url = `/uploads/${fileName}`
//         } catch (err) {
//           console.error("Error writing file:", err)
//           return NextResponse.json({ error: "Failed to save image" }, { status: 500 })
//         }
//       }
  
//       // Insert into database
//       try {
//         const result = await db.query(
//           `INSERT INTO public.staff (
//             name, email, phone, position, service_period, status, image_url,
//             education, skills, experience, assigned_section, performance,
//             error_count, birth_date, nationality, language, address
//           ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17) RETURNING *`,
//           [
//             name,
//             email,
//             phone,
//             position,
//             service_period || "0 years",
//             status || "active",
//             image_url,
//             education || "",
//             skills ? JSON.parse(skills) : [],
//             experience || "0 years",
//             assigned_section || "",
//             Number.parseInt(performance) || 100,
//             Number.parseInt(error_count) || 0,
//             birth_date,
//             nationality,
//             language,
//             address,
//           ],
//         )
  
//         return NextResponse.json(result.rows[0], { status: 201 })
//       } catch (err) {
//         console.error("Error inserting into database:", err)
//         return NextResponse.json({ error: "Failed to create staff record" }, { status: 500 })
//       }
//     } catch (error) {
//       console.error("Unexpected error:", error)
//       return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
//     }
//   }
import { type NextRequest, NextResponse } from "next/server"
import db from "@/lib/db"
import { writeFile } from "fs/promises"
import path from "path"
import fs from "fs"
import { put } from "@vercel/blob"


export async function GET(req: NextRequest) {
  try {
    const result = await db.query("SELECT * FROM public.staff ORDER BY created_at DESC")
    return NextResponse.json(result.rows)
  } catch (error) {
    console.error("Error fetching staff:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

// export async function POST(req: NextRequest) {
//   try {
//     const formData = await req.formData()
//     const requiredFields = ["name", "email", "phone", "position"]
//     const missingFields = requiredFields.filter((field) => !formData.get(field))

//     if (missingFields.length > 0) {
//       return NextResponse.json({ error: `Missing required fields: ${missingFields.join(", ")}` }, { status: 400 })
//     }

//     const image = formData.get("image") as File | null
//     let image_url = null

//     if (image) {
//       try {
//         const buffer = Buffer.from(await image.arrayBuffer())
//         const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}${path.extname(image.name)}`
//         const uploadsDir = path.join(process.cwd(), "public", "uploads")

//         if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true })
//         await writeFile(path.join(uploadsDir, fileName), buffer)
//         image_url = `/uploads/${fileName}`
//       } catch (err) {
//         console.error("Error saving image:", err)
//         return NextResponse.json({ error: "Failed to save image" }, { status: 500 })
//       }
//     }

//     const result = await db.query(
//       `INSERT INTO public.staff (
//         name, email, phone, position, service_period, status, image_url,
//         education, skills, experience, assigned_section, performance,
//         error_count, birth_date, nationality, language, address
//       ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17) RETURNING *`,
//       [
//         formData.get("name"),
//         formData.get("email"),
//         formData.get("phone"),
//         formData.get("position"),
//         formData.get("service_period") || "0 years",
//         formData.get("status") || "active",
//         image_url,
//         formData.get("education") || "",
//         formData.get("skills") ? JSON.parse(formData.get("skills") as string) : [],
//         formData.get("experience") || "0 years",
//         formData.get("assigned_section") || "",
//         Number.parseInt(formData.get("performance") as string) || 100,
//         Number.parseInt(formData.get("error_count") as string) || 0,
//         formData.get("birth_date"),
//         formData.get("nationality"),
//         formData.get("language"),
//         formData.get("address"),
//       ]
//     )

//     return NextResponse.json(result.rows[0], { status: 201 })
//   } catch (error) {
//     console.error("Unexpected error:", error)
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
//   }
// }
export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const requiredFields = ["name", "email", "phone", "position"]
    const missingFields = requiredFields.filter((field) => !formData.get(field))

    if (missingFields.length > 0) {
      return NextResponse.json({ error: `Missing required fields: ${missingFields.join(", ")}` }, { status: 400 })
    }

    const image = formData.get("image") as File | null
    let image_url = null

    if (image) {
      try {
        const blob = await put(image.name, image, { access: "public" })
        image_url = blob.url
      } catch (err) {
        console.error("Error saving image to Vercel Blob:", err)
        return NextResponse.json({ error: "Failed to save image" }, { status: 500 })
      }
    }

    const result = await db.query(
      `INSERT INTO public.staff (
        name, email, phone, position, service_period, status, image_url,
        education, skills, experience, assigned_section, performance,
        error_count, birth_date, nationality, language, address
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17) RETURNING *`,
      [
        formData.get("name"),
        formData.get("email"),
        formData.get("phone"),
        formData.get("position"),
        formData.get("service_period") || "0 years",
        formData.get("status") || "active",
        image_url,
        formData.get("education") || "",
        formData.get("skills") ? JSON.parse(formData.get("skills") as string) : [],
        formData.get("experience") || "0 years",
        formData.get("assigned_section") || "",
        Number.parseInt(formData.get("performance") as string) || 100,
        Number.parseInt(formData.get("error_count") as string) || 0,
        formData.get("birth_date"),
        formData.get("nationality"),
        formData.get("language"),
        formData.get("address"),
      ],
    )

    return NextResponse.json(result.rows[0], { status: 201 })
  } catch (error) {
    console.error("Unexpected error:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
