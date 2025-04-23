"use client";
import { useEffect, useState } from "react";
import UserCard from "./UserCard";

interface User {
  id: number;
  username: string;
  role: string;
}

export default function UsersList() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/users`);
      const data = await res.json();
      setUsers(data);
    } catch (err: any) {
      setError("Error al cargar usuarios");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (username: string) => {
    if (!confirm(`¿Eliminar a ${username}?`)) return;

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/delete/user/${username}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setUsers(users.filter((u) => u.username !== username));
    } else {
      setError("No se pudo eliminar");
    }
  };

  return (
    <div className="max-w-3xl  mt-4 space-y-4 bg-gray-900">

      <h2 className="text-white text-2xl font-bold mb-4 text-center ">Usuarios registrados</h2>

      {users.map((user) => (
        <UserCard
          key={user.id}
          username={user.username}
          role={user.role}
          onDelete={() => handleDelete(user.username)}
        />
      ))}

      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
