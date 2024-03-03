
import { openDb } from './db.js'

async function handler(req, res) {

    const db = await openDb()
    const posts = await db.all('SELECT * FROM posts')

    res.status(200).json(posts)

}

export default handler