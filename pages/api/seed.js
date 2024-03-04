import {openDb} from './db.js'

export default async function setup() {
    // Open SQLite connection
    const db = await openDb()

    // Define table schema
    //
    // await db.exec(`
    //       CREATE TABLE posts (
    //         id INTEGER PRIMARY KEY AUTOINCREMENT,
    //         title TEXT,
    //         content TEXT
    //       );
    //     `)

    // Insert dummy data
    await db.run(
        'INSERT INTO posts (title, content) VALUES (?, ?)',
        '666',
        '666'
    )

    // Close connection
    await db.close()
}

setup()
    .catch(err => {
        console.error(err.message)
    })