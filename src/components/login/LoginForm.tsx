"use client";
import { useState } from "react";
import InputLogin from "./InputLogin";
import Button from "./ButtonSend";
import Loading from "@/components/globals/FireLoader";
import { useEffect } from "react";

export default function LoginForm() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  const [user, setUser] = useState<{ username: string; role: string ; token: string } | null>(null);

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
                      console.error(message);
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


  useEffect(() => {
    const data = localStorage.getItem("dataUser");

    if (data) {
        const user = JSON.parse(data);
        setUser(user);
        window.location.href = "/home";
    }
  }, []);

  if (user) {
    return (
      <h1 className="text-3xl font-bold mb-4 text-center">
        <span className="text-purple-400">Cargando...</span>
      </h1>
    )
  }
  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto p-6 bg-gray-900 rounded-lg shadow">
      <h2 className="text-2xl font-bold text-white mb-4">Iniciar Sesión</h2>
      <InputLogin label="Nombre de usuario" name="username" value={form.username} onChange={handleChange} />
      <InputLogin label="Contraseña" name="password" type="password" value={form.password} onChange={handleChange} />
      {loading ? (
                   <Loading />
                 )  : <Button type="submit">Entrar</Button>}
    </form>
  );
}
