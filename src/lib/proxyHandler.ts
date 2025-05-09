import type { NextApiRequest, NextApiResponse } from "next";

export const proxyHandler = async (req: NextApiRequest, res: NextApiResponse) => {
        const baseUrl = process.env.INTERNAL_API_URL || "http://localhost:8080";
        //const endpoint = req.url?.replace(/^\/api/, "") || "";
        const apiUrl = `${baseUrl}${req.url}`;
        console.log("wait baby api="+req.url);
        console.log("wait baby base="+baseUrl);
        console.log("wait baby url="+apiUrl);
        console.log("HEADERS →", req.headers);
        console.log("BODY →", req.body);

        try {
                console.log(`[PROXY] → ${req.method} ${apiUrl}`);
                console.log("BODY →", req.body);

                const response = await fetch(apiUrl, {
                method: req.method,
                headers: {
                        "Content-Type": "application/json",
                        // Puedes agregar headers custom aquí si necesitas un token
                },
                body:
                req.method !== "GET" && req.method !== "HEAD"
                ? JSON.stringify(req.body)
                : undefined,
                });

        const text = await response.text();

        //const data = await response.text();
        let data;
        try {
                data = JSON.parse(text); // Intenta parsear JSON
        } catch {
                data = text || null; // Si no es JSON, pasa como texto plano o null
        }

        console.log(`[PROXY ✅] ← ${response.status} ${apiUrl}`);
        res.status(response.status).json(data);

        } catch (err) {
                console.error("[PROXY ❌] Error:", err);
                res.status(500).json({ error: "Error al conectar con el backend" });
        }
};
