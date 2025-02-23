// "use client"

// import { Button } from "@/src/components/ui/button"
// import { Input } from "@/src/components/ui/input"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/src/components/ui/tabs"
// import { AnimatePresence, motion } from "framer-motion"
// import { Bell, Search } from "lucide-react"
// import { useState } from "react"
// import { SlipDashboard } from "./slip-dashboard"
// import { SlipDetails } from "./slip-details"
// import { SlipHistory } from "./slip-history"

// export type Transaction = {
//   id: string
//   tableNo: string
//   cashier: string
//   time: string
//   amount: number
//   status: "completed" | "pending" | "cancelled"
// }

// const transactions: Transaction[] = [
//   {
//     id: "FZ00012",
//     tableNo: "T-01",
//     cashier: "Maria Lopez",
//     time: "10:25 AM",
//     amount: 850.75,
//     status: "completed",
//   },
//   {
//     id: "FZ00011",
//     tableNo: "T-02",
//     cashier: "Maria Lopez",
//     time: "10:15 AM",
//     amount: 1250.5,
//     status: "completed",
//   },
//   {
//     id: "FZ00010",
//     tableNo: "T-03",
//     cashier: "John Smith",
//     time: "10:05 AM",
//     amount: 750.25,
//     status: "pending",
//   },
//   {
//     id: "FZ00009",
//     tableNo: "T-04",
//     cashier: "Emily Brown",
//     time: "9:55 AM",
//     amount: 1100.0,
//     status: "completed",
//   },
//   {
//     id: "FZ00008",
//     tableNo: "T-05",
//     cashier: "David Wilson",
//     time: "9:45 AM",
//     amount: 950.5,
//     status: "cancelled",
//   },
// ]

// export function SlipVerification() {
//   const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null)
//   const [searchQuery, setSearchQuery] = useState("")

//   return (
//     <div className="flex flex-col gap-6">
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-3xl font-bold">Slip Verification</h1>
//           <p className="text-gray-500">Verify and manage transaction slips</p>
//         </div>
//         <div className="flex items-center gap-4">
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
//             <Input
//               type="search"
//               placeholder="Search slips..."
//               className="pl-9 w-[250px]"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//           </div>
//           <Button variant="ghost" size="icon">
//             <Bell className="h-5 w-5" />
//           </Button>
//         </div>
//       </div>

//       <Tabs defaultValue="dashboard" className="w-full">
//         <TabsList className="grid w-full grid-cols-3 mb-6">
//           <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
//           <TabsTrigger value="history">Slip History</TabsTrigger>
//           <TabsTrigger value="details" disabled={!selectedTransaction}>
//             Customer Details
//           </TabsTrigger>
//         </TabsList>
//         <AnimatePresence mode="wait">
//           <motion.div
//             key={selectedTransaction ? "details" : "content"}
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -20 }}
//             transition={{ duration: 0.2 }}
//           >
//             {selectedTransaction ? (
//               <SlipDetails transaction={selectedTransaction} onBack={() => setSelectedTransaction(null)} />
//             ) : (
//               <>
//                 <TabsContent value="dashboard">
//                   <SlipDashboard transactions={transactions} />
//                 </TabsContent>
//                 <TabsContent value="history">
//                   <SlipHistory
//                     transactions={transactions.filter(
//                       (t) =>
//                         t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
//                         t.tableNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
//                         t.cashier.toLowerCase().includes(searchQuery.toLowerCase()),
//                     )}
//                     onSelectTransaction={setSelectedTransaction}
//                   />
//                 </TabsContent>
//               </>
//             )}
//           </motion.div>
//         </AnimatePresence>
//       </Tabs>
//     </div>
//   )
// }
"use client"

import type React from "react"

import { useState,useRef,useEffect } from "react"
import { Upload, Check, X, Clock, Eye ,AlertCircle } from "lucide-react"
import { Button } from "@/src/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { Badge } from "@/src/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/src/components/ui/dialog"
import NextImage from "next/image"
import { Html5Qrcode } from "html5-qrcode"
import { createWorker } from "tesseract.js"
import  Tesseract from "tesseract.js"
import { useToast } from "@/hooks/use-toast"
import Image from "next/image"
import { parseKBankQR, validateKBankQR, type ParsedKBankQR } from "@/lib/qr-parser"



// interface TransferSlip {
//   timestamp: string
//   sender: {
//     name: string
//     bankAccount: string
//     bank: string
//   }
//   recipient: {
//     name: string
//     promptPayId: string
//   }
//   transaction: {
//     id: string
//     amount: number
//     fee: number
//   }
// }

// interface EMVCoData {
//   payloadFormatIndicator: string
//   pointOfInitiationMethod: string
//   merchantAccountInfo: {
//     aid: string
//     billerID: string
//     reference1: string
//     reference2: string
//   }
//   countryCode: string
//   transactionCurrency: string
//   transactionAmount: string
//   checksum: string
// }

// interface SlipVerificationProps {
//   expectedAmount?: number
//   // expectedRecipient: string
//   onVerificationComplete?: (result: boolean) => void
// }

// export function SlipVerification({
//   expectedAmount = 0,
//   // expectedRecipient,
//   onVerificationComplete,
// }: SlipVerificationProps) {
//   const [file, setFile] = useState<File | null>(null)
//   const [preview, setPreview] = useState<string | null>(null)
//   const [status, setStatus] = useState<"pending" | "processing" | "verified" | "rejected">("pending")
//   const [error, setError] = useState<string | null>(null)
//   const [showPreview, setShowPreview] = useState(false)
//   const [slipData, setSlipData] = useState<TransferSlip | null>(null)
//   const [qrData, setQrData] = useState<EMVCoData | null>(null)
//   const [isProcessing, setIsProcessing] = useState(false)
//   const fileInputRef = useRef<HTMLInputElement>(null)
//   const qrReaderRef = useRef<Html5Qrcode | null>(null)

//   useEffect(() => {
//     qrReaderRef.current = new Html5Qrcode("qr-reader")
//     return () => {
//       if (qrReaderRef.current?.isScanning) {
//         qrReaderRef.current.stop()
//       }
//     }
//   }, [])

//   const parseKBankQR = (data: string): EMVCoData | null => {
//     try {
//       // Example format: 00020101021229370016A000000677010112011501504801005102065483.005802TH53037646304B469
//       const parts = {
//         payloadFormatIndicator: data.substring(0, 2),
//         pointOfInitiationMethod: data.substring(2, 4),
//         merchantAccountInfo: {
//           aid: data.substring(4, 20),
//           billerID: data.substring(20, 35),
//           reference1: data.substring(35, 50),
//           reference2: data.substring(50, 65),
//         },
//         countryCode: data.substring(65, 67),
//         transactionCurrency: data.substring(67, 70),
//         transactionAmount: data.substring(70, 77),
//         checksum: data.substring(77),
//       }

//       return parts as EMVCoData
//     } catch (err) {
//       console.error("QR parse error:", err)
//       return null
//     }
//   }

//   const extractTextFromImage = async (file: File): Promise<TransferSlip | null> => {
//     try {
//       // @ts-ignore
//       const worker = await createWorker("eng+tha")
//       const {
//         data: { text },
//       } = await worker.recognize(file)
//       await worker.terminate()
  
  
  

//       // Parse the OCR text to extract transfer details
//       const timestamp = text.match(/(\d{1,2}\s+Feb\s+25\s+\d{1,2}:\d{2}\s+[AP]M)/i)?.[1] || ""
//       const senderName = text.match(/MS\.\s+MAY\s+T/i)?.[0] || ""
//       const senderAccount = text.match(/xxx-x-x\d{4}-x/)?.[0] || ""
//       const recipientName = text.match(/WATCHIRA\s+KHIA/i)?.[0] || ""
//       const promptPayId = text.match(/x-xxxx-xxxx\d-\d{2}-\d/)?.[0] || ""
//       const transactionId = text.match(/\d{15}BPP\d{5}/)?.[0] || ""
//       const amount = Number.parseFloat(text.match(/(\d+\.\d{2})\s+Baht/)?.[1] || "0")
//       const fee = Number.parseFloat(text.match(/Fee:\s*(\d+\.\d{2})\s+Baht/)?.[1] || "0")

//       return {
//         timestamp,
//         sender: {
//           name: senderName,
//           bankAccount: senderAccount,
//           bank: "KBank",
//         },
//         recipient: {
//           name: recipientName,
//           promptPayId,
//         },
//         transaction: {
//           id: transactionId,
//           amount,
//           fee,
//         },
//       }
//     } catch (err) {
//       console.error("OCR error:", err)
//       return null
//     }
//   }

//   const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       const selectedFile = e.target.files[0]
//       setFile(selectedFile)
//       setPreview(URL.createObjectURL(selectedFile))
//       setError(null)
//       setStatus("processing")
//       setIsProcessing(true)

//       try {
//         // Process QR code
//         const qrResult = await qrReaderRef.current?.scanFile(selectedFile, true)
//         const parsedQR = qrResult ? parseKBankQR(qrResult) : null
//         setQrData(parsedQR)

//         // Process text using OCR
//         const extractedData = await extractTextFromImage(selectedFile)
//         setSlipData(extractedData)

//         setIsProcessing(false)
//       } catch (err) {
//         console.error("Processing error:", err)
//         setError("Could not process the slip. Please ensure the image is clear and contains both QR code and text.")
//         setStatus("rejected")
//         setIsProcessing(false)
//       }
//     }
//   }

//   const verifySlip = () => {
//     if (!slipData || !qrData) {
//       setError("Missing slip data")
//       setStatus("rejected")
//       return
//     }

//     // Verify amount matches
//     if (Math.abs(slipData.transaction.amount - expectedAmount) > 0.01) {
//       setError(
//         `Amount mismatch: Expected ฿${expectedAmount.toFixed(2)} but found ฿${slipData.transaction.amount.toFixed(2)}`,
//       )
//       setStatus("rejected")
//       return
//     }

//     // // Verify recipient
//     // if (slipData.recipient.name.toLowerCase() !== expectedRecipient.toLowerCase()) {
//     //   setError("Recipient name mismatch")
//     //   setStatus("rejected")
//     //   return
//     // }

//     // Verify QR data matches slip data
//     const qrAmount = Number.parseFloat(qrData.transactionAmount) / 100 // Convert from satang to baht
//     if (Math.abs(qrAmount - slipData.transaction.amount) > 0.01) {
//       setError("QR code amount does not match slip amount")
//       setStatus("rejected")
//       return
//     }

//     // All verifications passed
//     setStatus("verified")
//     setError(null)
//     onVerificationComplete?.(true)
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 p-4">
//       <Card className="w-full max-w-md mx-auto">
//         <CardHeader>
//           <CardTitle>Payment Verification</CardTitle>
//           <CardDescription>Upload your KBank transfer slip</CardDescription>
//         </CardHeader>
//         <CardContent className="space-y-6">
//           <div className="space-y-2">
//             <Label>Expected Amount</Label>
//             <div className="text-4xl font-bold">฿{expectedAmount.toFixed(2)}</div>
//           </div>

//           <div className="space-y-2">
//             <Label>Payment Slip</Label>
//             <div className="grid gap-2">
//               <Input
//                 type="file"
//                 accept="image/*"
//                 onChange={handleFileChange}
//                 disabled={status === "verified" || isProcessing}
//                 ref={fileInputRef}
//                 className="hidden"
//               />
//               <div className="flex gap-2">
//                 <Button
//                   type="button"
//                   variant="outline"
//                   className="w-full"
//                   onClick={() => fileInputRef.current?.click()}
//                   disabled={status === "verified" || isProcessing}
//                 >
//                   <Upload className="w-5 h-5 mr-2" />
//                   {isProcessing ? "Processing..." : "Choose Slip"}
//                 </Button>
//                 {preview && (
//                   <Button type="button" variant="outline" onClick={() => setShowPreview(true)}>
//                     <Eye className="w-5 h-5" />
//                   </Button>
//                 )}
//               </div>
//               {file && <p className="text-sm text-gray-500">Selected: {file.name}</p>}
//             </div>
//           </div>

//           {slipData && (
//             <div className="bg-white p-4 rounded-lg shadow space-y-4">
//               <div className="flex items-start justify-between">
//                 <div>
//                   <h3 className="font-semibold">Transfer Details</h3>
//                   <p className="text-sm text-gray-600">Time: {slipData.timestamp}</p>
//                   <p className="text-sm text-gray-600">Amount: ฿{slipData.transaction.amount.toFixed(2)}</p>
//                 </div>
//                 {qrData && (
//                   <Badge variant="outline" className="bg-green-50 text-green-700">
//                     QR Verified
//                   </Badge>
//                 )}
//               </div>
//             </div>
//           )}

//           {error && (
//             <div className="bg-red-50 text-red-700 p-4 rounded-lg flex items-start gap-2">
//               <AlertCircle className="w-5 h-5 mt-0.5" />
//               <p className="text-sm">{error}</p>
//             </div>
//           )}

//           <Button
//             onClick={verifySlip}
//             disabled={!slipData || !qrData || status === "verified" || isProcessing}
//             className="w-full"
//           >
//             {isProcessing ? "Processing..." : "Verify Slip"}
//           </Button>

//           {status !== "pending" && status !== "processing" && (
//             <div
//               className={`text-center p-2 rounded-lg ${
//                 status === "verified" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
//               }`}
//             >
//               {status === "verified" ? (
//                 <span className="flex items-center justify-center gap-2">
//                   <Check className="w-4 h-4" />
//                   Slip Verified Successfully
//                 </span>
//               ) : (
//                 <span className="flex items-center justify-center gap-2">
//                   <X className="w-4 h-4" />
//                   Verification Failed
//                 </span>
//               )}
//             </div>
//           )}
//         </CardContent>
//       </Card>

//       <Dialog open={showPreview} onOpenChange={setShowPreview}>
//         <DialogContent className="max-w-2xl">
//           <DialogHeader>
//             <DialogTitle>Payment Slip Preview</DialogTitle>
//           </DialogHeader>
//           {preview && (
//             <div className="relative aspect-[3/4] w-full">
//               <Image
//                 src={preview || "/placeholder.svg"}
//                 alt="Payment slip preview"
//                 fill
//                 className="rounded-lg object-contain"
//               />
//             </div>
//           )}
//         </DialogContent>
//       </Dialog>

//       {/* Hidden QR Scanner Container */}
//       <div id="qr-reader" className="hidden" />
//     </div>
//   )
// }

// export default function VerificationPage() {
//   return (
//     <SlipVerification
//       expectedAmount={483.0}
//       expectedRecipient="WATCHIRA KHIA"
//       onVerificationComplete={(result) => {
//         console.log("Verification result:", result)
//       }}
//     />
//   )
// }



// interface TransferSlip {
//   timestamp: string
//   sender: {
//     name: string
//     bankAccount: string
//     bank: string
//   }
//   recipient: {
//     name: string
//     promptPayId: string
//   }
//   transaction: {
//     id: string
//     amount: number
//     fee: number
//   }
// }

// interface EMVCoData {
//   payloadFormatIndicator: string
//   pointOfInitiationMethod: string
//   merchantAccountInfo: {
//     aid: string
//     billerID: string
//     reference1: string
//     reference2: string
//   }
//   countryCode: string
//   transactionCurrency: string
//   transactionAmount: string
//   checksum: string
// }

// interface SlipVerificationProps {
//   expectedAmount?: number
//   orderId: string
//   onVerificationComplete?: (result: boolean) => void
// }

// export function SlipVerification({ expectedAmount = 0, orderId, onVerificationComplete }: SlipVerificationProps) {
//   const [file, setFile] = useState<File | null>(null)
//   const [preview, setPreview] = useState<string | null>(null)
//   const [status, setStatus] = useState<"pending" | "processing" | "verified" | "rejected">("pending")
//   const [error, setError] = useState<string | null>(null)
//   const [showPreview, setShowPreview] = useState(false)
//   const [slipData, setSlipData] = useState<TransferSlip | null>(null)
//   const [qrData, setQrData] = useState<EMVCoData | null>(null)
//   const [isProcessing, setIsProcessing] = useState(false)
//   const fileInputRef = useRef<HTMLInputElement>(null)
//   const qrReaderRef = useRef<Html5Qrcode | null>(null)
//   const { toast } = useToast()

//   useEffect(() => {
//     qrReaderRef.current = new Html5Qrcode("qr-reader")
//     return () => {
//       if (qrReaderRef.current?.isScanning) {
//         qrReaderRef.current.stop()
//       }
//     }
//   }, [])

//   const parseKBankQR = (data: string): EMVCoData | null => {
//     try {
//       // Example format: 00020101021229370016A000000677010112011501504801005102065483.005802TH53037646304B469
//       const parts = {
//         payloadFormatIndicator: data.substring(0, 2),
//         pointOfInitiationMethod: data.substring(2, 4),
//         merchantAccountInfo: {
//           aid: data.substring(4, 20),
//           billerID: data.substring(20, 35),
//           reference1: data.substring(35, 50),
//           reference2: data.substring(50, 65),
//         },
//         countryCode: data.substring(65, 67),
//         transactionCurrency: data.substring(67, 70),
//         transactionAmount: data.substring(70, 77),
//         checksum: data.substring(77),
//       }

//       return parts as EMVCoData
//     } catch (err) {
//       console.error("QR parse error:", err)
//       return null
//     }
//   }

//   const extractTextFromImage = async (file: File): Promise<TransferSlip | null> => {
//     try {
//       // @ts-ignore
//       const worker = await createWorker("eng+tha")
//       const {
//         data: { text },
//       } = await worker.recognize(file)
//       await worker.terminate()

//       // Parse the OCR text to extract transfer details
//       const timestamp = text.match(/(\d{1,2}\s+Feb\s+25\s+\d{1,2}:\d{2}\s+[AP]M)/i)?.[1] || ""
//       const senderName = text.match(/MS\.\s+MAY\s+T/i)?.[0] || ""
//       const senderAccount = text.match(/xxx-x-x\d{4}-x/)?.[0] || ""
//       const recipientName = text.match(/WATCHIRA\s+KHIA/i)?.[0] || ""
//       const promptPayId = text.match(/x-xxxx-xxxx\d-\d{2}-\d/)?.[0] || ""
//       const transactionId = text.match(/\d{15}BPP\d{5}/)?.[0] || ""
//       const amount = Number.parseFloat(text.match(/(\d+\.\d{2})\s+Baht/)?.[1] || "0")
//       const fee = Number.parseFloat(text.match(/Fee:\s*(\d+\.\d{2})\s+Baht/)?.[1] || "0")

//       return {
//         timestamp,
//         sender: {
//           name: senderName,
//           bankAccount: senderAccount,
//           bank: "KBank",
//         },
//         recipient: {
//           name: recipientName,
//           promptPayId,
//         },
//         transaction: {
//           id: transactionId,
//           amount,
//           fee,
//         },
//       }
//     } catch (err) {
//       console.error("OCR error:", err)
//       return null
//     }
//   }

//   const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       const selectedFile = e.target.files[0]
//       setFile(selectedFile)
//       setPreview(URL.createObjectURL(selectedFile))
//       setError(null)
//       setStatus("processing")
//       setIsProcessing(true)

//       try {
//         // Process QR code
//         const qrResult = await qrReaderRef.current?.scanFile(selectedFile, true)
//         const parsedQR = qrResult ? parseKBankQR(qrResult) : null
//         setQrData(parsedQR)

//         // Process text using OCR
//         const extractedData = await extractTextFromImage(selectedFile)
//         setSlipData(extractedData)

//         setIsProcessing(false)
//       } catch (err) {
//         console.error("Processing error:", err)
//         setError("Could not process the slip. Please ensure the image is clear and contains both QR code and text.")
//         setStatus("rejected")
//         setIsProcessing(false)
//       }
//     }
//   }

//   const verifySlip = async () => {
//     if (!slipData || !qrData) {
//       setError("Missing slip data")
//       setStatus("rejected")
//       return
//     }

//     // Verify amount matches
//     if (Math.abs(slipData.transaction.amount - expectedAmount) > 0.01) {
//       setError(
//         `Amount mismatch: Expected ฿${expectedAmount.toFixed(2)} but found ฿${slipData.transaction.amount.toFixed(2)}`,
//       )
//       setStatus("rejected")
//       return
//     }

//     try {
//       const response = await fetch("/api/slip/verify", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           orderId,
//           amount: slipData.transaction.amount,
//           transferTime: slipData.timestamp,
//           transactionId: slipData.transaction.id || qrData.merchantAccountInfo.reference1,
//           qrData: {
//             ...qrData,
//             transactionAmount: (slipData.transaction.amount * 100).toString(), // Convert to satang
//           },
//         }),
//       })

//       const result = await response.json()

//       if (!response.ok) {
//         console.error("Server error:", result)
//         throw new Error(result.error || "Failed to verify slip")
//       }

//       console.log("Verification result:", result)

//       setStatus("verified")
//       setError(null)
//       onVerificationComplete?.(true)
//       toast({
//         title: "Slip Verified",
//         description: "The payment slip has been successfully verified and recorded.",
//       })
//     } catch (error) {
//       console.error("Verification error:", error)
//       setError(error instanceof Error ? error.message : "Failed to verify slip. Please try again.")
//       setStatus("rejected")
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 p-4">
//       <Card className="w-full max-w-md mx-auto">
//         <CardHeader>
//           <CardTitle>Payment Verification</CardTitle>
//           <CardDescription>Upload your KBank transfer slip</CardDescription>
//         </CardHeader>
//         <CardContent className="space-y-6">
//           <div className="space-y-2">
//             <Label>Expected Amount</Label>
//             <div className="text-4xl font-bold">฿{expectedAmount.toFixed(2)}</div>
//           </div>

//           <div className="space-y-2">
//             <Label>Payment Slip</Label>
//             <div className="grid gap-2">
//               <Input
//                 type="file"
//                 accept="image/*"
//                 onChange={handleFileChange}
//                 disabled={status === "verified" || isProcessing}
//                 ref={fileInputRef}
//                 className="hidden"
//               />
//               <div className="flex gap-2">
//                 <Button
//                   type="button"
//                   variant="outline"
//                   className="w-full"
//                   onClick={() => fileInputRef.current?.click()}
//                   disabled={status === "verified" || isProcessing}
//                 >
//                   <Upload className="w-5 h-5 mr-2" />
//                   {isProcessing ? "Processing..." : "Choose Slip"}
//                 </Button>
//                 {preview && (
//                   <Button type="button" variant="outline" onClick={() => setShowPreview(true)}>
//                     <Eye className="w-5 h-5" />
//                   </Button>
//                 )}
//               </div>
//               {file && <p className="text-sm text-gray-500">Selected: {file.name}</p>}
//             </div>
//           </div>

//           {slipData && (
//             <div className="bg-white p-4 rounded-lg shadow space-y-4">
//               <div className="flex items-start justify-between">
//                 <div>
//                   <h3 className="font-semibold">Transfer Details</h3>
//                   <p className="text-sm text-gray-600">Time: {slipData.timestamp}</p>
//                   <p className="text-sm text-gray-600">Amount: ฿{slipData.transaction.amount.toFixed(2)}</p>
//                 </div>
//                 {qrData && (
//                   <Badge variant="outline" className="bg-green-50 text-green-700">
//                     QR Verified
//                   </Badge>
//                 )}
//               </div>
//             </div>
//           )}

//           {error && (
//             <div className="bg-red-50 text-red-700 p-4 rounded-lg flex items-start gap-2">
//               <AlertCircle className="w-5 h-5 mt-0.5" />
//               <p className="text-sm">{error}</p>
//             </div>
//           )}

//           <Button
//             onClick={verifySlip}
//             disabled={!slipData || !qrData || status === "verified" || isProcessing}
//             className="w-full"
//           >
//             {isProcessing ? "Processing..." : "Verify Slip"}
//           </Button>

//           {status !== "pending" && status !== "processing" && (
//             <div
//               className={`text-center p-2 rounded-lg ${
//                 status === "verified" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
//               }`}
//             >
//               {status === "verified" ? (
//                 <span className="flex items-center justify-center gap-2">
//                   <Check className="w-4 h-4" />
//                   Slip Verified Successfully
//                 </span>
//               ) : (
//                 <span className="flex items-center justify-center gap-2">
//                   <X className="w-4 h-4" />
//                   Verification Failed
//                 </span>
//               )}
//             </div>
//           )}
//         </CardContent>
//       </Card>

//       <Dialog open={showPreview} onOpenChange={setShowPreview}>
//         <DialogContent className="max-w-2xl">
//           <DialogHeader>
//             <DialogTitle>Payment Slip Preview</DialogTitle>
//           </DialogHeader>
//           {preview && (
//             <div className="relative aspect-[3/4] w-full">
//               <Image
//                 src={preview || "/placeholder.svg"}
//                 alt="Payment slip preview"
//                 fill
//                 className="rounded-lg object-contain"
//               />
//             </div>
//           )}
//         </DialogContent>
//       </Dialog>

//       {/* Hidden QR Scanner Container */}
//       <div id="qr-reader" className="hidden" />
//     </div>
//   )
// }

interface TransferSlip {
  timestamp: string
  sender: {
    name: string
    bankAccount: string
    bank: string
  }
  recipient: {
    name: string
    promptPayId: string
  }
  transaction: {
    id: string
    amount: number
    fee: number
  }
}

interface EMVCoData {
  payloadFormatIndicator: string
  pointOfInitiationMethod: string
  merchantAccountInfo: {
    aid: string
    billerID: string
    reference1: string
    reference2: string
  }
  countryCode: string
  transactionCurrency: string
  transactionAmount: string
  checksum: string
}

interface SlipVerificationProps {
  expectedAmount?: number
  orderId: string
  onVerificationComplete?: (result: boolean) => void
}

export function SlipVerification({ expectedAmount = 0, orderId, onVerificationComplete }: SlipVerificationProps) {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [status, setStatus] = useState<"pending" | "processing" | "verified" | "rejected">("pending")
  const [error, setError] = useState<string | null>(null)
  const [showPreview, setShowPreview] = useState(false)
  const [slipData, setSlipData] = useState<TransferSlip | null>(null)
  const [qrData, setQrData] = useState<EMVCoData | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const qrReaderRef = useRef<Html5Qrcode | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    qrReaderRef.current = new Html5Qrcode("qr-reader")
    return () => {
      if (qrReaderRef.current?.isScanning) {
        qrReaderRef.current.stop()
      }
    }
  }, [])

  const parseKBankQR = (data: string): EMVCoData | null => {
    try {
      // Example format: 00020101021229370016A000000677010112011501504801005102065483.005802TH53037646304B469
      const parts = {
        payloadFormatIndicator: data.substring(0, 2),
        pointOfInitiationMethod: data.substring(2, 4),
        merchantAccountInfo: {
          aid: data.substring(4, 20),
          billerID: data.substring(20, 35),
          reference1: data.substring(35, 50),
          reference2: data.substring(50, 65),
        },
        countryCode: data.substring(65, 67),
        transactionCurrency: data.substring(67, 70),
        transactionAmount: data.substring(70, 77),
        checksum: data.substring(77),
      }

      return parts as EMVCoData
    } catch (err) {
      console.error("QR parse error:", err)
      return null
    }
  }

  const extractTextFromImage = async (file: File): Promise<TransferSlip | null> => {
    try {
      // @ts-ignore
      const worker = await createWorker("eng+tha")
      const {
        data: { text },
      } = await worker.recognize(file)
      await worker.terminate()

      // Parse the OCR text to extract transfer details
      const timestamp = text.match(/(\d{1,2}\s+Feb\s+25\s+\d{1,2}:\d{2}\s+[AP]M)/i)?.[1] || ""
      const senderName = text.match(/MS\.\s+MAY\s+T/i)?.[0] || ""
      const senderAccount = text.match(/xxx-x-x\d{4}-x/)?.[0] || ""
      const recipientName = text.match(/WATCHIRA\s+KHIA/i)?.[0] || ""
      const promptPayId = text.match(/x-xxxx-xxxx\d-\d{2}-\d/)?.[0] || ""
      const transactionId = text.match(/\d{15}BPP\d{5}/)?.[0] || ""
      const amount = Number.parseFloat(text.match(/(\d+\.\d{2})\s+Baht/)?.[1] || "0")
      const fee = Number.parseFloat(text.match(/Fee:\s*(\d+\.\d{2})\s+Baht/)?.[1] || "0")

      return {
        timestamp,
        sender: {
          name: senderName,
          bankAccount: senderAccount,
          bank: "KBank",
        },
        recipient: {
          name: recipientName,
          promptPayId,
        },
        transaction: {
          id: transactionId,
          amount,
          fee,
        },
      }
    } catch (err) {
      console.error("OCR error:", err)
      return null
    }
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      setFile(selectedFile)
      setPreview(URL.createObjectURL(selectedFile))
      setError(null)
      setStatus("processing")
      setIsProcessing(true)

      try {
        // Process QR code
        const qrResult = await qrReaderRef.current?.scanFile(selectedFile, true)
        const parsedQR = qrResult ? parseKBankQR(qrResult) : null
        setQrData(parsedQR)

        // Process text using OCR
        const extractedData = await extractTextFromImage(selectedFile)
        setSlipData(extractedData)

        setIsProcessing(false)
      } catch (err) {
        console.error("Processing error:", err)
        setError("Could not process the slip. Please ensure the image is clear and contains both QR code and text.")
        setStatus("rejected")
        setIsProcessing(false)
      }
    }
  }

  const verifySlip = async () => {
    if (!file || !slipData || !qrData) {
      setError("Missing slip data or file")
      setStatus("rejected")
      return
    }

    try {
      const formData = new FormData()
      formData.append("orderId", orderId)
      formData.append("amount", slipData.transaction.amount.toString())
      formData.append("transferTime", slipData.timestamp)
      formData.append("transactionId", slipData.transaction.id || qrData.merchantAccountInfo.reference1)
      formData.append(
        "qrData",
        JSON.stringify({
          ...qrData,
          transactionAmount: (slipData.transaction.amount * 100).toString(), // Convert to satang
        }),
      )
      formData.append("slipImage", file)

      const response = await fetch("/api/slip/verify", {
        method: "POST",
        body: formData,
      })

      const result = await response.json()

      if (!response.ok) {
        console.error("Server error:", result)
        throw new Error(result.error || "Failed to verify slip")
      }

      console.log("Verification result:", result)

      setStatus("verified")
      setError(null)
      onVerificationComplete?.(true)
      toast({
        title: "Slip Verified",
        description: "The payment slip has been successfully verified and recorded.",
      })
    } catch (error) {
      console.error("Verification error:", error)
      setError(error instanceof Error ? error.message : "Failed to verify slip. Please try again.")
      setStatus("rejected")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Payment Verification</CardTitle>
          <CardDescription>Upload your KBank transfer slip</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Expected Amount</Label>
            <div className="text-4xl font-bold">฿{expectedAmount.toFixed(2)}</div>
          </div>

          <div className="space-y-2">
            <Label>Payment Slip</Label>
            <div className="grid gap-2">
              <Input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                disabled={status === "verified" || isProcessing}
                ref={fileInputRef}
                className="hidden"
              />
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={status === "verified" || isProcessing}
                >
                  <Upload className="w-5 h-5 mr-2" />
                  {isProcessing ? "Processing..." : "Choose Slip"}
                </Button>
                {preview && (
                  <Button type="button" variant="outline" onClick={() => setShowPreview(true)}>
                    <Eye className="w-5 h-5" />
                  </Button>
                )}
              </div>
              {file && <p className="text-sm text-gray-500">Selected: {file.name}</p>}
            </div>
          </div>

          {slipData && (
            <div className="bg-white p-4 rounded-lg shadow space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold">Transfer Details</h3>
                  <p className="text-sm text-gray-600">Time: {slipData.timestamp}</p>
                  <p className="text-sm text-gray-600">Amount: ฿{slipData.transaction.amount.toFixed(2)}</p>
                </div>
                {qrData && (
                  <Badge variant="outline" className="bg-green-50 text-green-700">
                    QR Verified
                  </Badge>
                )}
              </div>
            </div>
          )}

          {error && (
            <div className="bg-red-50 text-red-700 p-4 rounded-lg flex items-start gap-2">
              <AlertCircle className="w-5 h-5 mt-0.5" />
              <p className="text-sm">{error}</p>
            </div>
          )}

          <Button
            onClick={verifySlip}
            disabled={!slipData || !qrData || status === "verified" || isProcessing}
            className="w-full"
          >
            {isProcessing ? "Processing..." : "Verify Slip"}
          </Button>

          {status !== "pending" && status !== "processing" && (
            <div
              className={`text-center p-2 rounded-lg ${
                status === "verified" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
              }`}
            >
              {status === "verified" ? (
                <span className="flex items-center justify-center gap-2">
                  <Check className="w-4 h-4" />
                  Slip Verified Successfully
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <X className="w-4 h-4" />
                  Verification Failed
                </span>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={showPreview} onOpenChange={setShowPreview}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Payment Slip Preview</DialogTitle>
          </DialogHeader>
          {preview && (
            <div className="relative aspect-[3/4] w-full">
              <Image
                src={preview || "/placeholder.svg"}
                alt="Payment slip preview"
                fill
                className="rounded-lg object-contain"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Hidden QR Scanner Container */}
      <div id="qr-reader" className="hidden" />
    </div>
  )
}








