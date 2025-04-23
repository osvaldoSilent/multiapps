"use client";
import { useState } from "react";
import InputLogin from "./InputLogin";
import Button from "./ButtonSend";
import Loading from "@/components/globals/FireLoader";

export default function LoginForm() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    console.log("procesando login");
    try{
        await sleep(6000);
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json"
                  },
                  body: JSON.stringify({
                    username: form.username,
                    password: form.password
                  })
                });
        if (!response.ok) {
                      // Muestra error
                      const errorText = await response.text();
                      console.error("Error al iniciar sesión:", errorText);
                      setMessage("Credenciales incorrectas o error del servidor.");
                      return;
                }
        const data = await response.json();
                localStorage.setItem("dataUser", JSON.stringify(data));
                window.location.href = "/home";
    }
    catch (error) {
        console.error("Fallo de red o servidor caído:", error);
        setMessage("Servidor no disponible. Intenta más tarde.");
    } finally {
        setLoading(false); //Siempre se ejecuta, haya éxito o fallo
    }

  };


  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto p-6 bg-gray-900 rounded-lg shadow">
      <h2 className="text-2xl font-bold text-white mb-4">Iniciar Sesión</h2>
      <InputLogin label="Nombre de usuario" name="username" value={form.email} onChange={handleChange} />
      <InputLogin label="Contraseña" name="password" type="password" value={form.password} onChange={handleChange} />
      {loading ? (
                   <Loading />
                 )  : <Button type="submit">Entrar</Button>}
    </form>
  );
}
