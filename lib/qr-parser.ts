import crc16 from "crc/crc16ccitt"

interface EMVCoField {
  tag: string
  length: number
  value: string
}

export interface ParsedKBankQR {
  payloadFormatIndicator: string
  pointOfInitiationMethod: string
  merchantAccountInfo: {
    globalUniqueIdentifier: string
    paymentNetworkSpecific: string
    merchantIdentifier: string
  }
  transactionCurrency: string
  transactionAmount: string
  countryCode: string
  merchantName: string
  checksum: string
}

export function parseKBankQR(qrData: string): ParsedKBankQR | null {
  try {
    console.log("Raw QR data:", qrData)
    const fields: EMVCoField[] = []
    let index = 0

    while (index < qrData.length - 4) {
      // -4 to account for CRC at the end
      const tag = qrData.substr(index, 2)
      const length = Number.parseInt(qrData.substr(index + 2, 2), 10)
      const value = qrData.substr(index + 4, length)
      fields.push({ tag, length, value })
      index += 4 + length
    }

    console.log("Parsed fields:", fields)

    const checksum = qrData.substr(qrData.length - 4)

    const parsedData: ParsedKBankQR = {
      payloadFormatIndicator: "",
      pointOfInitiationMethod: "",
      merchantAccountInfo: {
        globalUniqueIdentifier: "",
        paymentNetworkSpecific: "",
        merchantIdentifier: "",
      },
      transactionCurrency: "",
      transactionAmount: "",
      countryCode: "",
      merchantName: "",
      checksum,
    }

    for (const field of fields) {
      switch (field.tag) {
        case "00":
          parsedData.payloadFormatIndicator = field.value
          break
        case "01":
          parsedData.pointOfInitiationMethod = field.value
          break
        case "29":
        case "30":
        case "31":
        case "32":
          // Parse merchant account info (allowing for different tags)
          let subIndex = 0
          while (subIndex < field.value.length) {
            const subTag = field.value.substr(subIndex, 2)
            const subLength = Number.parseInt(field.value.substr(subIndex + 2, 2), 10)
            const subValue = field.value.substr(subIndex + 4, subLength)
            subIndex += 4 + subLength

            switch (subTag) {
              case "00":
                parsedData.merchantAccountInfo.globalUniqueIdentifier = subValue
                break
              case "01":
                parsedData.merchantAccountInfo.paymentNetworkSpecific = subValue
                break
              case "02":
                parsedData.merchantAccountInfo.merchantIdentifier = subValue
                break
            }
          }
          break
        case "53":
          parsedData.transactionCurrency = field.value
          break
        case "54":
          parsedData.transactionAmount = field.value
          break
        case "58":
          parsedData.countryCode = field.value
          break
        case "59":
          parsedData.merchantName = field.value
          break
      }
    }

    console.log("Parsed QR data:", parsedData)
    return parsedData
  } catch (error) {
    console.error("Error parsing KBank QR code:", error)
    return null
  }
}

export function validateKBankQR(
  parsedData: ParsedKBankQR,
  qrData: string,
): { isValid: boolean; errors: string[]; warnings: string[] } {
  const errors: string[] = []
  const warnings: string[] = []

  // Check QR Code Prefix (relaxed)
  if (parsedData.payloadFormatIndicator !== "01") {
    warnings.push(`Unexpected payload format indicator: ${parsedData.payloadFormatIndicator}`)
  }

  // Check KBank/PromptPay identifier (relaxed)
  const validIdentifiers = ["A000000677010111", "A000000677010114"]
  if (!validIdentifiers.includes(parsedData.merchantAccountInfo.globalUniqueIdentifier)) {
    warnings.push(`Unexpected global unique identifier: ${parsedData.merchantAccountInfo.globalUniqueIdentifier}`)
  }

  // Check country code (relaxed)
  if (parsedData.countryCode && parsedData.countryCode !== "TH") {
    warnings.push(`Unexpected country code: ${parsedData.countryCode}`)
  }

  // Check currency (relaxed)
  if (parsedData.transactionCurrency && parsedData.transactionCurrency !== "764") {
    warnings.push(`Unexpected currency code: ${parsedData.transactionCurrency}`)
  }

  // Validate CRC Checksum
  const crcData = qrData.slice(0, -4)
  const calculatedCRC = crc16(crcData).toString(16).toUpperCase().padStart(4, "0")
  if (calculatedCRC !== parsedData.checksum) {
    errors.push("CRC checksum mismatch")
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  }
}

