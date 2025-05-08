// src/pages/api/auth/users.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const baseUrl = process.env.INTERNAL_API_URL || "http://backend-service:8080";
    const apiUrl = `${baseUrl}${req.url}`;

    try {
        console.log("Requesting:", req.method, apiUrl);

        const response = await fetch(apiUrl, {
        method: req.method,
        headers: {
            ...req.headers,
            host: undefined, // (opcional) eliminar host si causa problemas
        },
        body: req.method !== 'GET' && req.method !== 'HEAD' ? JSON.stringify(req.body) : undefined,
        });

        const data = await response.json();
        res.status(response.status).json(data);
        console.log("Response:", JSON.stringify(data, null, 2));
    } catch (err) {
        console.error("API Route Error:", err);
        res.status(500).json({ error: "Error al conectar con el backend" });
    }
}
