
import { openDb } from './db.js'

async function handler(req, res) {

    const db = await openDb()
    const data = await db.all('SELECT * FROM data')

    res.status(200).json(data)

}

export default handler