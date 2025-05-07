// src/pages/api/auth/users.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//process.env.INTERNAL_API_URL ||


const apiUrl =  "http://backend-service:8080/api/auth/users";

try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    res.status(200).json(data);

    console.log("Done baby url="+apiUrl);
    console.log("Done baby res=", JSON.stringify(data, null, 2));

    } catch (err) {
        console.log("API Route Error:", err);

        res.status(500).json({ error: "Error al conectar con el backend" });
    }
}
