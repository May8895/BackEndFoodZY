import { NextResponse } from "next/server"
import db from "@/lib/db"
import type { PaymentSlip, Order } from "@/src/types"
import { put } from "@vercel/blob"
import { nanoid } from "nanoid"

// export async function POST(request: Request) {
//   try {
//     const body = await request.json()
//     const { orderId, amount, transferTime, transactionId } = body

//     if (!orderId || !amount || !transferTime || !transactionId) {
//       return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
//     }

//     // Get order details
//     const orderResult = await db.query("SELECT * FROM orders WHERE id = $1", [orderId])

//     if (orderResult.rows.length === 0) {
//       return NextResponse.json({ error: "Order not found" }, { status: 404 })
//     }

//     const order = orderResult.rows[0] as Order

//     // Verify amount matches
//     const amountMatches = Math.abs(Number.parseFloat(amount) - order.total_price) < 0.01

//     if (!amountMatches) {
//       return NextResponse.json({ error: "Payment amount does not match order total" }, { status: 400 })
//     }

//     // Determine verification status based on time
//     const transferDate = new Date(transferTime)
//     let status: PaymentSlip["status"] = "verified"
//     const transferHour = transferDate.getHours()
//     if (transferHour >= 0 && transferHour < 2) {
//       status = "pending"
//     }

//     // Insert slip record
//     const slipResult = await db.query(
//       `INSERT INTO payment_slips (
//         order_id,
//         amount,
//         transfer_time,
//         status,
//         transaction_id
//       ) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
//       [orderId, Number.parseFloat(amount), transferDate, status, transactionId],
//     )

//     const paymentSlip = slipResult.rows[0] as PaymentSlip

//     // If verified, update order status
//     if (status === "verified") {
//       await db.query("UPDATE orders SET status = $1 WHERE id = $2", ["paid", orderId])
//     }

//     return NextResponse.json(paymentSlip)
//   } catch (error) {
//     console.error("Slip verification error:", error)
//     return NextResponse.json({ error: "Failed to process payment slip" }, { status: 500 })
//   }
// }


// export async function POST(request: Request) {
//     try {
//       const body = await request.json()
//       console.log("Received data:", body)
//       const { orderId, amount, transferTime, transactionId, qrData, preview } = body
  
//       // Validate input
//       if (!orderId) {
//         return NextResponse.json({ error: "Missing orderId" }, { status: 400 })
//       }
//       if (amount === undefined) {
//         return NextResponse.json({ error: "Missing amount" }, { status: 400 })
//       }
//       if (!transferTime) {
//         return NextResponse.json({ error: "Missing transferTime" }, { status: 400 })
//       }
//       if (!qrData) {
//         return NextResponse.json({ error: "Missing qrData" }, { status: 400 })
//       }
  
//       // Get order details
//       const orderResult = await db.query("SELECT * FROM orders WHERE id = $1", [orderId])
  
//       if (orderResult.rows.length === 0) {
//         return NextResponse.json({ error: "Order not found" }, { status: 404 })
//       }
  
//       const order = orderResult.rows[0] as Order
  
//       // Verify amount matches
//       const amountMatches = Math.abs(Number.parseFloat(amount.toString()) - order.total_price) < 0.01
  
//       if (!amountMatches) {
//         return NextResponse.json(
//           {
//             error: "Payment amount does not match order total",
//             expected: order.total_price,
//             received: amount,
//           },
//           { status: 400 },
//         )
//       }
  
//       // Verify QR data
//       const qrAmount = Number.parseFloat(qrData.transactionAmount || "0") / 100 // Convert from satang to baht
//       if (Math.abs(qrAmount - Number.parseFloat(amount.toString())) > 0.01) {
//         return NextResponse.json(
//           {
//             error: "QR code amount does not match payment amount",
//             qrAmount: qrAmount,
//             slipAmount: amount,
//           },
//           { status: 400 },
//         )
//       }
  
//       // Generate a temporary slip URL if none provided
//       const slipUrl = `/slips/${orderId}-${Date.now()}.jpg` // You should implement proper file storage
  
//       // Insert slip record
//       const slipResult = await db.query(
//         `INSERT INTO payment_slips (
//           order_id,
//           amount,
//           transfer_time,
//           status,
//           transaction_id,
//           raw_text,
//           slip_url
//         ) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
//         [
//           orderId,
//           Number.parseFloat(amount.toString()),
//           new Date(transferTime),
//           "verified",
//           transactionId || qrData.merchantAccountInfo.reference1,
//           JSON.stringify(qrData),
//           slipUrl, // Add the slip_url
//         ],
//       )
  
//       const paymentSlip = slipResult.rows[0] as PaymentSlip
//       await db.query("UPDATE orders SET payment_status = $1 WHERE id = $2", ["paid", orderId])
  
//       // Update order status
//     //   await db.query("UPDATE orders SET status = $1 WHERE id = $2", ["paid", orderId])
  
//       return NextResponse.json(paymentSlip)
//     } catch (error) {
//       console.error("Slip verification error:", error)
//       return NextResponse.json(
//         { error: "Failed to process payment slip", details: error instanceof Error ? error.message : String(error) },
//         { status: 500 },
//       )
//     }
//   }
  
export async function POST(request: Request) {
    try {
      const formData = await request.formData()
      const orderId = formData.get("orderId") as string
      const amount = formData.get("amount") as string
      const transferTime = formData.get("transferTime") as string
      const transactionId = formData.get("transactionId") as string
      const qrData = JSON.parse(formData.get("qrData") as string)
      const slipImage = formData.get("slipImage") as File
  
      // Validate input
      if (!orderId || !amount || !transferTime || !qrData || !slipImage) {
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
      }
  
      // Get order details
      const orderResult = await db.query("SELECT * FROM orders WHERE id = $1", [orderId])
  
      if (orderResult.rows.length === 0) {
        return NextResponse.json({ error: "Order not found" }, { status: 404 })
      }
  
      const order = orderResult.rows[0] as Order
  
      // Verify amount matches
      const amountMatches = Math.abs(Number.parseFloat(amount) - order.total_price) < 0.01
  
      if (!amountMatches) {
        return NextResponse.json(
          {
            error: "Payment amount does not match order total",
            expected: order.total_price,
            received: amount,
          },
          { status: 400 },
        )
      }
  
      // Verify QR data
      const qrAmount = Number.parseFloat(qrData.transactionAmount || "0") / 100 // Convert from satang to baht
      if (Math.abs(qrAmount - Number.parseFloat(amount)) > 0.01) {
        return NextResponse.json(
          {
            error: "QR code amount does not match payment amount",
            qrAmount: qrAmount,
            slipAmount: amount,
          },
          { status: 400 },
        )
      }
  
      // Upload image to Vercel Blob
      const blob = await put(`slips/${orderId}-${nanoid()}.jpg`, slipImage, {
        access: "public",
        token: process.env.BLOB_READ_WRITE_TOKEN,
      })
  
      // Insert slip record
      const slipResult = await db.query(
        `INSERT INTO payment_slips (
          order_id,
          amount,
          transfer_time,
          status,
          transaction_id,
          raw_text,
          slip_url
        ) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
        [
          orderId,
          Number.parseFloat(amount),
          new Date(transferTime),
          "verified",
          transactionId || qrData.merchantAccountInfo.reference1,
          JSON.stringify(qrData),
          blob.url,
        ],
      )
  
      const paymentSlip = slipResult.rows[0] as PaymentSlip
      await db.query("UPDATE orders SET payment_status = $1 WHERE id = $2", ["paid", orderId])
  
      return NextResponse.json(paymentSlip)
    } catch (error) {
      console.error("Slip verification error:", error)
      return NextResponse.json(
        { error: "Failed to process payment slip", details: error instanceof Error ? error.message : String(error) },
        { status: 500 },
      )
    }
  }
  
  
