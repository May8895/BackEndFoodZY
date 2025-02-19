interface PaymentDetails {
    amount: number
    date: string
    time: string
    sender: string
    transactionId: string
  }
  
  export function extractPaymentDetails(text: string): PaymentDetails {
    // Implement regex or other parsing logic to extract details
    // This is a simplified example
    const amount = Number.parseFloat(text.match(/Amount: (\d+\.\d+)/)?.[1] || "0")
    const date = text.match(/Date: (\d{2}\/\d{2}\/\d{4})/)?.[1] || ""
    const time = text.match(/Time: (\d{2}:\d{2})/)?.[1] || ""
    const sender = text.match(/Sender: (.+)/)?.[1] || ""
    const transactionId = text.match(/Transaction ID: (.+)/)?.[1] || ""
  
    return { amount, date, time, sender, transactionId }
  }
  
  export function validatePaymentDetails(extracted: PaymentDetails, expected: Partial<PaymentDetails>): boolean {
    // Implement validation logic
    return (
      extracted.amount === expected.amount &&
      extracted.date === expected.date &&
      extracted.time === expected.time &&
      extracted.sender === expected.sender &&
      extracted.transactionId === expected.transactionId
    )
  }
  
  