"use client";
import { useState } from "react";
import Input from "./InputLogin";
import Button from "./ButtonSend";

export default function LoginForm() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /*const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login", form);
    // Aquí va la lógica de autenticación
  };*/

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const response = await fetch("http://localhost:8080/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: form.username,
        password: form.password,
        //role: form.role // opcional si lo manejas así
      })
    });
    setLoading(false);
    if (!response.ok) {
      // Muestra error
      console.error("Error al iniciar sesión");
      return;
    }

    const data = await response.json();
    //console.log("Token recibido:", data.token);

    localStorage.setItem("dataUser", JSON.stringify(data));
    window.location.href = "/home";
  };


  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto p-6 bg-gray-900 rounded-lg shadow">
      <h2 className="text-2xl font-bold text-white mb-4">Iniciar Sesión</h2>
      <Input label="Nombre de usuario" name="username" value={form.email} onChange={handleChange} />
      <Input label="Contraseña" name="password" type="password" value={form.password} onChange={handleChange} />
      {loading ? <p>Cargando...</p> : <Button type="submit">Entrar</Button>}
    </form>
  );
}
