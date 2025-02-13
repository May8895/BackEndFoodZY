// import { Pool } from 'pg'

// const pool = new Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
// })

// export default {
//   query: (text: string, params?: any[]) => pool.query(text, params),
// }
import { Pool } from "pg"

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
})

pool.on("error", (err) => {
  console.error("Unexpected error on idle client", err)
  process.exit(-1)
})

export default {
  query: async (text: string, params?: any[]) => {
    const client = await pool.connect()
    try {
      const result = await client.query(text, params)
      return result
    } catch (err) {
      console.error("Error executing query", err)
      throw err
    } finally {
      client.release()
    }
  },
}


