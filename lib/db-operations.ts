


import type { TableData, OrderItem, TableStatus } from "@/src/components/floor-plan/floor-plan"
import db from "./db"

type DBTableRow = {
  id: string
  number: string
  status: TableStatus
  number_of_customers: number | null
  total_cost: number | null
  floor: number
  booking: any
  orders: OrderItem[]
  created_at: Date
  updated_at: Date
}

type DBOrderRow = {
  id: string
  table_id: string
  name: string
  quantity: number
  price: number
  status: "pending" | "preparing" | "served"
}

export async function getTables(): Promise<TableData[]> {
  try {
    const result = await db.query(`
      SELECT id, number, status, number_of_customers, total_cost, floor, booking, orders
      FROM tables
      ORDER BY number
    `)

    return result.rows.map((row: DBTableRow) => ({
      id: row.id,
      number: row.number,
      status: row.status,
      numberOfCustomers: row.number_of_customers ?? undefined,
      totalCost: row.total_cost ?? undefined,
      floor: row.floor,
      booking: row.booking,
      orders: row.orders || [],
    }))
  } catch (error) {
    console.error("Database Error:", error)
    throw new Error("Failed to fetch tables")
  }
}

export async function addTable(newTable: Omit<TableData, "id" | "orders">): Promise<TableData> {
  try {
    const { number, status, numberOfCustomers, totalCost, floor } = newTable
    const result = await db.query(
      `INSERT INTO tables (
        number, 
        status, 
        number_of_customers, 
        total_cost, 
        floor,
        orders,
        booking
      ) 
      VALUES ($1, $2, $3, $4, $5, '[]'::jsonb, NULL) 
      RETURNING *`,
      [number, status, numberOfCustomers ?? null, totalCost ?? null, floor],
    )

    const addedTable = result.rows[0]
    return {
      id: addedTable.id,
      number: addedTable.number,
      status: addedTable.status,
      numberOfCustomers: addedTable.number_of_customers ?? undefined,
      totalCost: addedTable.total_cost ?? undefined,
      floor: addedTable.floor,
      booking: addedTable.booking,
      orders: [],
    }
  } catch (error) {
    console.error("Database Error:", error)
    throw new Error("Failed to add table")
  }
}

export async function updateTable(updatedTable: TableData): Promise<TableData> {
  try {
    const { id, number, status, numberOfCustomers, totalCost, floor, booking } = updatedTable
    const result = await db.query(
      `UPDATE tables 
       SET number = $1, 
           status = $2, 
           number_of_customers = $3, 
           total_cost = $4, 
           floor = $5,
           booking = $6,
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $7 
       RETURNING *`,
      [
        number,
        status,
        numberOfCustomers ?? null,
        totalCost ?? null,
        floor,
        booking ? JSON.stringify(booking) : null,
        id,
      ],
    )

    if (result.rows.length === 0) {
      throw new Error(`Table with ID ${id} not found`)
    }

    const updatedRow = result.rows[0]
    return {
      id: updatedRow.id,
      number: updatedRow.number,
      status: updatedRow.status,
      numberOfCustomers: updatedRow.number_of_customers ?? undefined,
      totalCost: updatedRow.total_cost ?? undefined,
      floor: updatedRow.floor,
      booking: updatedRow.booking,
      orders: updatedTable.orders,
    }
  } catch (error) {
    console.error("Database Error:", error)
    throw new Error("Failed to update table")
  }
}

export async function removeTable(id: string): Promise<void> {
  try {
    // First delete all orders associated with the table
    await db.query("DELETE FROM orders WHERE table_id = $1", [id])
    // Then delete the table
    const result = await db.query("DELETE FROM tables WHERE id = $1", [id])

    if (result.rowCount === 0) {
      throw new Error(`Table with ID ${id} not found`)
    }
  } catch (error) {
    console.error("Database Error:", error)
    throw new Error("Failed to remove table")
  }
}

export async function addOrder(tableId: string, order: Omit<OrderItem, "id" | "status">): Promise<void> {
  try {
    // Start a transaction
    await db.query("BEGIN")

    try {
      // Insert the new order
      await db.query(
        `INSERT INTO orders (table_id, name, quantity, price, status) 
         VALUES ($1, $2, $3, $4, $5)`,
        [tableId, order.name, order.quantity, order.price, "pending"],
      )

      // Update table status if it's available
      await db.query(
        `UPDATE tables 
         SET status = CASE 
           WHEN status = 'available' THEN 'ordered' 
           ELSE status 
         END,
         updated_at = CURRENT_TIMESTAMP
         WHERE id = $1`,
        [tableId],
      )

      // Commit the transaction
      await db.query("COMMIT")
    } catch (error) {
      // Rollback in case of error
      await db.query("ROLLBACK")
      throw error
    }
  } catch (error) {
    console.error("Database Error:", error)
    throw new Error("Failed to add order")
  }
}

export async function updateOrderStatus(
  tableId: string,
  orderId: string,
  status: "pending" | "preparing" | "served",
): Promise<void> {
  try {
    // Start a transaction
    await db.query("BEGIN")

    try {
      // Update the order status
      const result = await db.query(
        `UPDATE orders 
         SET status = $1 
         WHERE id = $2 AND table_id = $3
         RETURNING *`,
        [status, orderId, tableId],
      )

      if (result.rowCount === 0) {
        throw new Error(`Order with ID ${orderId} not found for table ${tableId}`)
      }

      // If all orders are served, update table status to 'serving'
      if (status === "served") {
        const pendingOrders = await db.query(
          `SELECT COUNT(*) 
           FROM orders 
           WHERE table_id = $1 AND status != 'served'`,
          [tableId],
        )

        if (Number.parseInt(pendingOrders.rows[0].count) === 0) {
          await db.query(
            `UPDATE tables 
             SET status = 'serving',
             updated_at = CURRENT_TIMESTAMP
             WHERE id = $1`,
            [tableId],
          )
        }
      }

      // Commit the transaction
      await db.query("COMMIT")
    } catch (error) {
      // Rollback in case of error
      await db.query("ROLLBACK")
      throw error
    }
  } catch (error) {
    console.error("Database Error:", error)
    throw new Error("Failed to update order status")
  }
}

export async function completeTable(tableId: string): Promise<void> {
  try {
    // Start a transaction
    await db.query("BEGIN")

    try {
      // Delete all orders for the table
      await db.query("DELETE FROM orders WHERE table_id = $1", [tableId])

      // Reset table status and customer info
      await db.query(
        `UPDATE tables 
         SET status = 'available',
             number_of_customers = NULL,
             total_cost = NULL,
             booking = NULL,
             orders = '[]'::jsonb,
             updated_at = CURRENT_TIMESTAMP
         WHERE id = $1`,
        [tableId],
      )

      // Commit the transaction
      await db.query("COMMIT")
    } catch (error) {
      // Rollback in case of error
      await db.query("ROLLBACK")
      throw error
    }
  } catch (error) {
    console.error("Database Error:", error)
    throw new Error("Failed to complete table")
  }
}


