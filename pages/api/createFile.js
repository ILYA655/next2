// import fsPromises from "fs/promises";
// import * as fs from "fs";

// export async function getStaticProps() {
//     const fsPromises = require('fs').promises;
//
//     await fsPromises.writeFile('data.json', []);
//
//     return {
//         props: {
//             // jsonValues
//         },
//     };
// }
//
// export function file(values){
//     const fs = require('fs');
//
//     fs.writeFile("data.json", values, (err) => {
//             if (err)
//                 console.log(err);
//             else {
//                 console.log("File written successfully\n");
//                 console.log("The written has the following contents:");
//             }
//         });
// }

// import {openDb} from "./db";
// import path from "node:path";
import fs from "fs";
import {openDb} from "./db";

async function handler(req, res) {

    if (req.method === 'POST') {
        const data = { email: req.body.email, pass: req.body.pass };

        const db = await openDb()
        await db.run(
            'INSERT INTO data (Email, Password) VALUES (?, ?)',
            data.email,
            data.pass
        )
        await db.close()

        // fs.appendFileSync('data.json', JSON.stringify(data));
        fs.writeFileSync('data.json', JSON.stringify(data));
        res.status(200).json({ message: 'File created successfully' });
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}

export default handler