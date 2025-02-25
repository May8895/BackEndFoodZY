// "use client"

// import { createStaff } from "@/src/app/actions/staff"
// import { Button } from "@/src/components/ui/button"
// import { Input } from "@/src/components/ui/input"
// import { Label } from "@/src/components/ui/label"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"
// import { useToast } from "@/src/components/ui/use-toast"
// import { Loader2, Upload } from "lucide-react"
// import { useRouter } from "next/navigation"
// import { useState } from "react"

// const positions = [
//   {
//     id: "waiter",
//     title: "Waiter/ Waitress",
//     description:
//       "Takes customer orders, serves food and beverages, ensures customer satisfaction, handles payments, and maintains cleanliness in the dining area.",
//     icon: "🍽️",
//   },
//   {
//     id: "bartender",
//     title: "Bartender",
//     description:
//       "Prepares and serves beverages, maintains inventory, ensures cleanliness and safety, and provides excellent customer service.",
//     icon: "🍸",
//   },
//   {
//     id: "supervisor",
//     title: "Supervisor",
//     description:
//       "Oversees staff performance, ensures smooth operations, handles customer concerns, and maintains service standards.",
//     icon: "👔",
//   },
//   {
//     id: "head-chef",
//     title: "Head Chef",
//     description:
//       "Oversees kitchen operations, creates menus, maintains food quality standards, manages kitchen staff, and ensures food safety.",
//     icon: "👨‍🍳",
//   },
// ]

// const nationalities = [
//   { id: "th", name: "Thai" },
//   { id: "us", name: "American" },
//   { id: "uk", name: "British" },
//   { id: "cn", name: "Chinese" },
//   { id: "jp", name: "Japanese" },
// ]

// const languages = [
//   { id: "th", name: "Thai" },
//   { id: "en", name: "English" },
//   { id: "cn", name: "Chinese" },
//   { id: "jp", name: "Japanese" },
// ]

// export function AddStaffForm() {
//   const [selectedPosition, setSelectedPosition] = useState<string>("")
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const router = useRouter()
//   const { toast } = useToast()
//   const selectedPositionDetails = positions.find((p) => p.id === selectedPosition)

//   async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
//     event.preventDefault()
//     setIsSubmitting(true)

//     try {
//       const formData = new FormData(event.currentTarget)
//       formData.set("position", selectedPosition)

//       const result = await createStaff(formData)

//       if (result.success) {
//         toast({
//           title: "Success",
//           description: result.message,
//         })
//         router.push("/staff")
//       } else {
//         toast({
//           variant: "destructive",
//           title: "Error",
//           description: result.message,
//         })
//       }
//     } catch (error) {
//       toast({
//         variant: "destructive",
//         title: "Error",
//         description: "Something went wrong. Please try again.",
//       })
//     } finally {
//       setIsSubmitting(false)
//     }
//   }

//   return (
//     <form onSubmit={handleSubmit} className="flex flex-col gap-6">
//       <div className="flex items-center justify-between">
//         <h1 className="text-2xl font-bold">Add New Staff</h1>
//       </div>
//       <div className="space-y-4">
//         <div>
//           <Label htmlFor="position">Choose Staff Position:</Label>
//           <Select value={selectedPosition} onValueChange={setSelectedPosition}>
//             <SelectTrigger id="position" className="w-full md:w-[300px]">
//               <SelectValue placeholder="Select a position" />
//             </SelectTrigger>
//             <SelectContent>
//               {positions.map((position) => (
//                 <SelectItem key={position.id} value={position.id}>
//                   <span className="flex items-center gap-2">
//                     <span>{position.icon}</span>
//                     <span>{position.title}</span>
//                   </span>
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//         </div>

//         {selectedPositionDetails && (
//           <div className="rounded-lg border bg-gray-50/50 p-4">
//             <div className="flex items-center gap-2 text-lg font-medium mb-2">
//               <span>{selectedPositionDetails.icon}</span>
//               <span>{selectedPositionDetails.title}</span>
//             </div>
//             <p className="text-sm text-gray-600">{selectedPositionDetails.description}</p>
//           </div>
//         )}
//       </div>

//       <div>
//         <h2 className="text-lg font-medium mb-4">Fill out staff information:</h2>
//         <div className="grid md:grid-cols-2 gap-6">
//           <div className="space-y-4">
//             <div>
//               <Label htmlFor="name">Name/Surname:</Label>
//               <Input id="name" name="name" placeholder="Enter Name/Surname" required />
//             </div>
//             <div>
//               <Label htmlFor="birthDate">Birth Date:</Label>
//               <Input id="birthDate" name="birthDate" type="date" required />
//             </div>
//             <div>
//               <Label htmlFor="nationality">Nationality:</Label>
//               <Select name="nationality">
//                 <SelectTrigger id="nationality">
//                   <SelectValue placeholder="Select nationality" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {nationalities.map((nationality) => (
//                     <SelectItem key={nationality.id} value={nationality.id}>
//                       {nationality.name}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>
//             <div>
//               <Label htmlFor="language">Language:</Label>
//               <Select name="language">
//                 <SelectTrigger id="language">
//                   <SelectValue placeholder="Select language" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {languages.map((language) => (
//                     <SelectItem key={language.id} value={language.id}>
//                       {language.name}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>
//           <div className="space-y-4">
//             <div>
//               <Label htmlFor="education">Education:</Label>
//               <Input id="education" name="education" placeholder="Enter last education" required />
//             </div>
//             <div>
//               <Label htmlFor="phone">Phone Number:</Label>
//               <Input id="phone" name="phone" type="tel" placeholder="Enter phone number" required />
//             </div>
//             <div>
//               <Label htmlFor="email">Mail Address:</Label>
//               <Input id="email" name="email" type="email" placeholder="Enter email address" required />
//             </div>
//             <div>
//               <Label htmlFor="address">Address:</Label>
//               <Input id="address" name="address" placeholder="Enter current address" required />
//             </div>
//           </div>
//           <div className="md:col-span-2">
//             <Label>Staff Image:</Label>
//             <div className="mt-2 flex items-center justify-center border-2 border-dashed rounded-lg p-6">
//               <div className="text-center">
//                 <Upload className="mx-auto h-12 w-12 text-gray-400" />
//                 <div className="mt-4 flex text-sm leading-6 text-gray-600">
//                   <label
//                     htmlFor="file-upload"
//                     className="relative cursor-pointer rounded-md bg-white font-semibold text-[#f77700] focus-within:outline-none focus-within:ring-2 focus-within:ring-[#f77700] focus-within:ring-offset-2 hover:text-[#f77700]/80"
//                   >
//                     <span>Upload a file</span>
//                     <input id="file-upload" name="image" type="file" className="sr-only" accept="image/*" />
//                   </label>
//                   <p className="pl-1">or drag and drop</p>
//                 </div>
//                 <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="flex justify-end gap-4">
//         <Button type="button" variant="outline" onClick={() => router.push("/staff")} disabled={isSubmitting}>
//           Back
//         </Button>
//         <Button type="submit" className="bg-[#f77700] hover:bg-[#f77700]/90" disabled={isSubmitting}>
//           {isSubmitting ? (
//             <>
//               <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//               Saving...
//             </>
//           ) : (
//             "Save Information"
//           )}
//         </Button>
//       </div>
//     </form>
//   )
// }
"use client"

import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"
import { useToast } from "@/src/components/ui/use-toast"
import { Loader2,Upload } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState, type ChangeEvent } from "react"
import { Card, CardContent } from "@/src/components/ui/card"

import Image from "next/image"
import type React from "react" // Added import for React


// const positions = [
//   { id: "waiter", name: "Waiter" },
//   { id: "bartender", name: "Bartender" },
//   { id: "chef", name: "Chef" },
//   { id: "manager", name: "Manager" },
// ]
const positions = [
  {
    id: "waiter",
    title: "Waiter/Waitress",
    description:
      "Takes customer orders, serves food and beverages, ensures customer satisfaction, handles payments, and maintains cleanliness in the dining area.",
    icon: "🍽️",
  },
  {
    id: "bartender",
    title: "Bartender",
    description:
      "Prepares and serves beverages, maintains inventory, ensures cleanliness and safety, and provides excellent customer service.",
    icon: "🍸",
  },
  {
    id: "supervisor",
    title: "Supervisor",
    description:
      "Oversees staff performance, ensures smooth operations, handles customer concerns, and maintains service standards.",
    icon: "👔",
  },
  {
    id: "head-chef",
    title: "Head Chef",
    description:
      "Oversees kitchen operations, creates menus, maintains food quality standards, manages kitchen staff, and ensures food safety.",
    icon: "👨‍🍳",
  },
]

const nationalities = [
  { id: "th", name: "Thai" },
  { id: "us", name: "American" },
  { id: "uk", name: "British" },
  { id: "cn", name: "Chinese" },
  { id: "jp", name: "Japanese" },
  { id: "ca", name: "Canadian" },
  { id: "kr", name: "Korean" },


  
]

const languages = [
  { id: "th", name: "Thai" },
  { id: "en", name: "English" },
  { id: "cn", name: "Chinese" },
  { id: "jp", name: "Japanese" },
  { id: "kr", name: "Korean" },

]


// export function AddStaffForm() {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     position: "",
//     service_period: "",
//     status: "active",
//     education: "",
//     skills: [],
//     experience: "",
//     assigned_section: "",
//     performance: 100,
//     error_count: 0,
//     birth_date: "",
//     nationality: "",
//     language: "",
//     address: "",
//   })
//   const [image, setImage] = useState<File | null>(null)
//   const [imagePreview, setImagePreview] = useState<string | null>(null)
//   const [isDragging, setIsDragging] = useState(false)
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   const router = useRouter()
//   const { toast } = useToast()

//   const selectedPositionDetails = positions.find((p) => p.id === formData.position)

//   const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target
//     setFormData((prev) => ({ ...prev, [name]: value }))
//   }

//   const handleSelectChange = (name: string) => (value: string) => {
//     setFormData((prev) => ({ ...prev, [name]: value }))
//   }

//   const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0]
//     if (file) {
//       handleFile(file)
//     }
//   }

//   const handleFile = (file: File) => {
//     if (file.size > 10 * 1024 * 1024) {
//       toast({
//         variant: "destructive",
//         title: "Error",
//         description: "File size should not exceed 10MB",
//       })
//       return
//     }
//     setImage(file)
//     const reader = new FileReader()
//     reader.onloadend = () => {
//       setImagePreview(reader.result as string)
//     }
//     reader.readAsDataURL(file)
//   }

//   const handleDragOver = (e: React.DragEvent) => {
//     e.preventDefault()
//     setIsDragging(true)
//   }

//   const handleDragLeave = (e: React.DragEvent) => {
//     e.preventDefault()
//     setIsDragging(false)
//   }

//   const handleDrop = (e: React.DragEvent) => {
//     e.preventDefault()
//     setIsDragging(false)
//     const file = e.dataTransfer.files[0]
//     if (file && file.type.startsWith("image/")) {
//       handleFile(file)
//     } else {
//       toast({
//         variant: "destructive",
//         title: "Error",
//         description: "Please upload an image file",
//       })
//     }
//   }

//   async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
//     event.preventDefault()
//     setIsSubmitting(true)

//     try {
//       const formDataToSend = new FormData()
//       Object.entries(formData).forEach(([key, value]) => {
//         formDataToSend.append(key, value.toString())
//       })
//       if (image) {
//         formDataToSend.append("image", image)
//       }

//       const response = await fetch("/api/staff", {
//         method: "POST",
//         body: formDataToSend,
//       })

//       if (!response.ok) {
//         const errorData = await response.json()
//         throw new Error(errorData.error || "Failed to create staff member")
//       }

//       toast({
//         title: "Success",
//         description: "Staff member added successfully",
//       })
//       router.push("/staff")
//     } catch (error: unknown) {
//       console.error("Error creating staff:", error)
//       let errorMessage = "Failed to add staff member. Please try again."
//       if (error instanceof Error) {
//         errorMessage = error.message
//       }
//       toast({
//         variant: "destructive",
//         title: "Error",
//         description: errorMessage,
//       })
//     } finally {
//       setIsSubmitting(false)
//     }
//   }

//   return (
//     <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl mx-auto">
//       <div className="flex items-center justify-between">
//         <h1 className="text-2xl font-bold">Add New Staff</h1>
//       </div>

//       <div className="space-y-4">
//         <div>
//           <Label htmlFor="position">Choose Staff Position:</Label>
//           <Select value={formData.position} onValueChange={handleSelectChange("position")}>
//             <SelectTrigger id="position" className="w-full md:w-[300px]">
//               <SelectValue placeholder="Select a position" />
//             </SelectTrigger>
//             <SelectContent>
//               {positions.map((position) => (
//                 <SelectItem key={position.id} value={position.id}>
//                   <span className="flex items-center gap-2">
//                     <span>{position.icon}</span>
//                     <span>{position.title}</span>
//                   </span>
//                 </SelectItem>
//               ))}
//             </SelectContent>
//           </Select>
//         </div>

//         {selectedPositionDetails && (
//           <Card>
//             <CardContent className="pt-6">
//               <div className="flex items-center gap-2 text-lg font-medium mb-2">
//                 <span>{selectedPositionDetails.icon}</span>
//                 <span>{selectedPositionDetails.title}</span>
//               </div>
//               <p className="text-sm text-muted-foreground">{selectedPositionDetails.description}</p>
//             </CardContent>
//           </Card>
//         )}
//       </div>

//       <div>
//         <h2 className="text-lg font-medium mb-4">Fill out staff information:</h2>
//         <div className="grid md:grid-cols-2 gap-6">
//           <div className="space-y-4">
//             <div>
//               <Label htmlFor="name">Name/Surname</Label>
//               <Input
//                 id="name"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleInputChange}
//                 placeholder="Enter full name"
//                 required
//               />
//             </div>
//             <div>
//               <Label htmlFor="birth_date">Birth Date</Label>
//               <Input
//                 type="date"
//                 id="birth_date"
//                 name="birth_date"
//                 value={formData.birth_date}
//                 onChange={handleInputChange}
//                 required
//               />
//             </div>
//             <div>
//               <Label htmlFor="nationality">Nationality</Label>
//               <Select name="nationality" value={formData.nationality} onValueChange={handleSelectChange("nationality")}>
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select nationality" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {nationalities.map((nationality) => (
//                     <SelectItem key={nationality.id} value={nationality.id}>
//                       {nationality.name}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>
//             <div>
//               <Label htmlFor="language">Language</Label>
//               <Select name="language" value={formData.language} onValueChange={handleSelectChange("language")}>
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select language" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   {languages.map((language) => (
//                     <SelectItem key={language.id} value={language.id}>
//                       {language.name}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>
//           <div className="space-y-4">
//             <div>
//               <Label htmlFor="education">Education</Label>
//               <Input
//                 id="education"
//                 name="education"
//                 value={formData.education}
//                 onChange={handleInputChange}
//                 placeholder="Enter last education"
//                 required
//               />
//             </div>
//             <div>
//               <Label htmlFor="phone">Phone Number</Label>
//               <Input
//                 id="phone"
//                 name="phone"
//                 type="tel"
//                 value={formData.phone}
//                 onChange={handleInputChange}
//                 placeholder="Enter phone number"
//                 required
//               />
//             </div>
//             <div>
//               <Label htmlFor="email">Mail Address</Label>
//               <Input
//                 id="email"
//                 name="email"
//                 type="email"
//                 value={formData.email}
//                 onChange={handleInputChange}
//                 placeholder="Enter email address"
//                 required
//               />
//             </div>
//             <div>
//               <Label htmlFor="address">Address</Label>
//               <Input
//                 id="address"
//                 name="address"
//                 value={formData.address}
//                 onChange={handleInputChange}
//                 placeholder="Enter current address"
//                 required
//               />
//             </div>
//           </div>
//           <div className="md:col-span-2">
//             <Label>Staff Image</Label>
//             <div
//               className={`mt-2 flex items-center justify-center border-2 border-dashed rounded-lg p-6 ${
//                 isDragging ? "border-primary bg-primary/10" : "border-border"
//               }`}
//               onDragOver={handleDragOver}
//               onDragLeave={handleDragLeave}
//               onDrop={handleDrop}
//             >
//               <div className="text-center">
//                 <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
//                 <div className="mt-4 flex text-sm leading-6 text-muted-foreground">
//                   <label
//                     htmlFor="file-upload"
//                     className="relative cursor-pointer rounded-md bg-background font-semibold text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 hover:text-primary/80"
//                   >
//                     <span>Upload a file</span>
//                     <input
//                       id="file-upload"
//                       name="image"
//                       type="file"
//                       className="sr-only"
//                       onChange={handleImageChange}
//                       accept="image/*"
//                     />
//                   </label>
//                   <p className="pl-1">or drag and drop</p>
//                 </div>
//                 <p className="text-xs leading-5 text-muted-foreground">PNG, JPG, GIF up to 10MB</p>
//                 {imagePreview && (
//                   <div className="mt-4">
//                     <Image
//                       src={imagePreview || "/placeholder.svg"}
//                       alt="Preview"
//                       width={100}
//                       height={100}
//                       className="mx-auto rounded-lg object-cover"
//                     />
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="flex justify-end gap-4">
//         <Button type="button" variant="outline" onClick={() => router.push("/staff")} disabled={isSubmitting}>
//           Back
//         </Button>
//         <Button type="submit" className="bg-[#f77700] hover:bg-[#f77700]/90" disabled={isSubmitting}>
//           {isSubmitting ? (
//             <>
//               <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//               Saving...
//             </>
//           ) : (
//             "Save Information"
//           )}
//         </Button>
//       </div>
//     </form>
//   )
// }

export function AddStaffForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    service_period: "",
    status: "active",
    education: "",
    skills: [],
    experience: "",
    assigned_section: "",
    performance: 100,
    error_count: 0,
    birth_date: "",
    nationality: "",
    language: "",
    address: "",
  })
  const [image, setImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const selectedPositionDetails = positions.find((p) => p.id === formData.position)

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string) => (value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFile(file)
    }
  }

  const handleFile = (file: File) => {
    if (file.size > 10 * 1024 * 1024) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "File size should not exceed 10MB",
      })
      return
    }
    setImage(file)
    const reader = new FileReader()
    reader.onloadend = () => {
      setImagePreview(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith("image/")) {
      handleFile(file)
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please upload an image file",
      })
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)

    try {
      const formDataToSend = new FormData()
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value.toString())
      })
      if (image) {
        formDataToSend.append("image", image)
      }

      const response = await fetch("/api/staff", {
        method: "POST",
        body: formDataToSend,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to create staff member")
      }

      toast({
        title: "Success",
        description: "Staff member added successfully",
      })
      router.push("/staff")
    } catch (error: unknown) {
      console.error("Error creating staff:", error)
      let errorMessage = "Failed to add staff member. Please try again."
      if (error instanceof Error) {
        errorMessage = error.message
      }
      toast({
        variant: "destructive",
        title: "Error",
        description: errorMessage,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl mx-auto">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Add New Staff</h1>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="position">Choose Staff Position:</Label>
          <Select value={formData.position} onValueChange={handleSelectChange("position")}>
            <SelectTrigger id="position" className="w-full md:w-[300px]">
              <SelectValue placeholder="Select a position" />
            </SelectTrigger>
            <SelectContent>
              {positions.map((position) => (
                <SelectItem key={position.id} value={position.id}>
                  <span className="flex items-center gap-2">
                    <span>{position.icon}</span>
                    <span>{position.title}</span>
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {selectedPositionDetails && (
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 text-lg font-medium mb-2">
                <span>{selectedPositionDetails.icon}</span>
                <span>{selectedPositionDetails.title}</span>
              </div>
              <p className="text-sm text-muted-foreground">{selectedPositionDetails.description}</p>
            </CardContent>
          </Card>
        )}
      </div>

      <div>
        <h2 className="text-lg font-medium mb-4">Fill out staff information:</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Name/Surname</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter full name"
                required
              />
            </div>
            <div>
              <Label htmlFor="birth_date">Birth Date</Label>
              <Input
                type="date"
                id="birth_date"
                name="birth_date"
                value={formData.birth_date}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="nationality">Nationality</Label>
              <Select name="nationality" value={formData.nationality} onValueChange={handleSelectChange("nationality")}>
                <SelectTrigger>
                  <SelectValue placeholder="Select nationality" />
                </SelectTrigger>
                <SelectContent>
                  {nationalities.map((nationality) => (
                    <SelectItem key={nationality.id} value={nationality.id}>
                      {nationality.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="language">Language</Label>
              <Select name="language" value={formData.language} onValueChange={handleSelectChange("language")}>
                <SelectTrigger>
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((language) => (
                    <SelectItem key={language.id} value={language.id}>
                      {language.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <Label htmlFor="education">Education</Label>
              <Input
                id="education"
                name="education"
                value={formData.education}
                onChange={handleInputChange}
                placeholder="Enter last education"
                required
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Enter phone number"
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Mail Address</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter email address"
                required
              />
            </div>
            <div>
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Enter current address"
                required
              />
            </div>
          </div>
          <div className="md:col-span-2">
            <Label>Staff Image</Label>
            <div
              className={`mt-2 flex items-center justify-center border-2 border-dashed rounded-lg p-6 ${
                isDragging ? "border-primary bg-primary/10" : "border-border"
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="text-center">
                <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                <div className="mt-4 flex text-sm leading-6 text-muted-foreground">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md bg-background font-semibold text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 hover:text-primary/80"
                  >
                    <span>Upload a file</span>
                    <input
                      id="file-upload"
                      name="image"
                      type="file"
                      className="sr-only"
                      onChange={handleImageChange}
                      accept="image/*"
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs leading-5 text-muted-foreground">PNG, JPG, GIF up to 10MB</p>
                {imagePreview && (
                  <div className="mt-4">
                    <Image
                      src={imagePreview || "/placeholder.svg"}
                      alt="Preview"
                      width={100}
                      height={100}
                      className="mx-auto rounded-lg object-cover"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4">
        <Button type="button" variant="outline" onClick={() => router.push("/staff")} disabled={isSubmitting}>
          Back
        </Button>
        <Button type="submit" className="bg-[#f77700] hover:bg-[#f77700]/90" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            "Save Information"
          )}
        </Button>
      </div>
    </form>
  )
}






