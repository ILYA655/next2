import { openDb } from '../db.js'

async function handler(req, res) {

    // Get post data from request body
    const { Email, Password } = req.body

    // Insert post into database
    const db = await openDb()
    const result = await db.run(
        'INSERT INTO posts (Email, Password) VALUES (?, ?)',
        [Email, Password]
    )
    await db.close()

    // Return result to client
    res.status(201).json(result)
}

export default handler