'use client';

import { useEffect, useState } from "react";



export default function HomePage() {
  const [user, setUser] = useState<{ username: string; role: string ; token: string } | null>(null);

  useEffect(() => {
    try {
        const rawUser = localStorage.getItem("dataUser");
        const userData = rawUser ? JSON.parse(rawUser) : null;

        if (userData && Object.keys(userData).length > 0 ) {
          setUser(userData);
        } else {
          window.location.href = "/login";
        }
      } catch (error) {
        console.error("Error al parsear el user:", error);
        window.location.href = "/login";
      }
  }, []);

  if(!user)
    return (
    <h1 className="text-3xl font-bold mb-4 text-center">
    <span className="text-purple-400">Cargando...</span>
    </h1>
    )
  return (
    <div className="flex items-center justify-center bg-gray-900 text-white px-4">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-xl max-w-lg w-full">
        <h1 className="text-3xl font-bold mb-4 text-center">
          ¡Bienvenido, <span className="text-purple-400">{user.username}</span>!
        </h1>

        <p className="text-center text-gray-300 mb-2">
          Tu rol es: <span className="font-semibold text-green-400">{user.role}</span>
        </p>

        <div className="mt-6 text-sm text-gray-400">
          <p className="font-semibold mb-1 text-center">Token activo:</p>
          <div className="bg-gray-700 rounded-md p-3 overflow-auto text-xs break-words text-center">
            {user.token}
          </div>
        </div>

        <div className="mt-6 flex justify-center items-center gap-2">
          <span className="text-green-500">🔥</span>
          <span className="text-green-400 font-medium">Sesión activa</span>
        </div>
      </div>
    </div>
  );
}
