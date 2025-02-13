// "use server"

// import { revalidatePath } from "next/cache"

// export type StaffMember = {
//   id: string
//   name: string
//   position: string
//   email: string
//   phone: string
//   education: string
//   birthDate: string
//   nationality: string
//   language: string
//   address: string
//   image?: string
//   status: "active" | "inactive"
//   createdAt: Date
// }

// export async function createStaff(formData: FormData): Promise<{ success: boolean; message: string }> {
//   try {

//     await new Promise((resolve) => setTimeout(resolve, 1000))


//     const name = formData.get("name") as string
//     const position = formData.get("position") as string
//     const email = formData.get("email") as string
//     const phone = formData.get("phone") as string
//     const education = formData.get("education") as string
//     const birthDate = formData.get("birthDate") as string
//     const nationality = formData.get("nationality") as string
//     const language = formData.get("language") as string
//     const address = formData.get("address") as string


//     if (!name || !position || !email || !phone) {
//       return {
//         success: false,
//         message: "Please fill in all required fields",
//       }
//     }


//     const newStaff: StaffMember = {
//       id: `ST${Math.floor(Math.random() * 10000)}`,
//       name,
//       position,
//       email,
//       phone,
//       education,
//       birthDate,
//       nationality,
//       language,
//       address,
//       status: "active",
//       createdAt: new Date(),
//     }

//     // Revalidate the staff list page
//     revalidatePath("/staff")

//     return {
//       success: true,
//       message: "Staff member added successfully",
//     }
//   } catch (error) {
//     return {
//       success: false,
//       message: "Failed to add staff member",
//     }
//   }
// }
"use server"

import { revalidatePath } from "next/cache"

export type StaffMember = {
  id: string
  name: string
  position: string
  email: string
  phone: string
  education: string
  birthDate: string
  nationality: string
  language: string
  address: string
  image?: string
  status: "active" | "inactive"
  createdAt: Date
}

export async function createStaff(formData: FormData): Promise<{ success: boolean; message: string }> {
  try {
    const name = formData.get("name") as string
    const position = formData.get("position") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string
    const education = formData.get("education") as string
    const birthDate = formData.get("birthDate") as string
    const nationality = formData.get("nationality") as string
    const language = formData.get("language") as string
    const address = formData.get("address") as string

    if (!name || !position || !email || !phone) {
      return {
        success: false,
        message: "Please fill in all required fields",
      }
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/staff`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        position,
        email,
        phone,
        education,
        birth_date: birthDate,
        nationality,
        language,
        address,
        status: "active",
        service_period: "0 years", // You may want to calculate this based on the current date
        skills: [], // Add default skills or leave empty
        experience: "0 years", // You may want to add this field to the form
        assigned_section: "", // You may want to add this field to the form
        performance: 100, // Default performance
        error_count: 0, // Default error count
      }),
    })

    if (!response.ok) {
      throw new Error("Failed to create staff member")
    }

    // Revalidate the staff list page
    revalidatePath("/staff")

    return {
      success: true,
      message: "Staff member added successfully",
    }
  } catch (error) {
    console.error("Error creating staff:", error)
    return {
      success: false,
      message: "Failed to add staff member",
    }
  }
}








