import { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";

interface Props {
  onClose: () => void;
  onSuccess: () => void;
}

export default function UserRegisterModal({ onClose, onSuccess }: Props) {
  const [form, setForm] = useState({ username: "", password: "", role: "USER" });
  const [error, setError] = useState("");

  // ESC listener
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.username || !form.password || !form.role) return setError("Completa todos los campos");

    const res = await fetch(`api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      onSuccess();
      onClose();
    } else {
      const msg = await res.text();
      setError(msg || "Error al crear usuario");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg w-full max-w-md relative">
        {/* BOTÓN DE CIERRE */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-white"
          title="Cerrar"
        >
          <FiX size={20} />
        </button>

        <h2 className="text-xl font-bold text-white mb-4">Crear nuevo usuario</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-900 text-white"
            autoFocus
          />
          <input
            name="password"
            placeholder="Password"
            type="password"
            value={form.password}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-900 text-white"
          />
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full p-2 bg-gray-900 text-white rounded"
          >
            <option value="USER">USER</option>
            <option value="ADMIN">ADMIN</option>
          </select>
          {error && <p className="text-red-500">{error}</p>}
          <div className="flex justify-between">
            <button type="button" onClick={onClose} className="bg-gray-500 px-4 py-2 rounded">
              Cancelar
            </button>
            <button type="submit" className="bg-green-600 px-4 py-2 rounded text-white">
              Crear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
