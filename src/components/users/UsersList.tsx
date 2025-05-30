"use client";


import { useEffect, useState, useMemo  } from "react";
import UserCard from "./UserCard";
import PlusButton from "@/components/globals/PlusButton";
import UserRegisterModal from "@/components/users/UserRegisterModal";
import { useScreenSize } from "@/hooks/useScreenSize";


interface User {
  id: number;
  username: string;
  role: string;
}



export default function UsersList() {
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState<{ username: string; role: string ; token: string } | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");


  const screen = useScreenSize();

  const onHandleDelete = async (username: string) => {
    if(user){
        if(user.role=== "ADMIN" ){
            if (!confirm(`¿Eliminar a ${username}?`)) return;

                try {
                  const res = await fetch(`api/auth/delete/user`, {
                    method: "DELETE",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ username }), // ← Enviamos el JSON
                  });

                  if (res.ok) {
                    setUsers(users.filter((u) => u.username !== username));
                  } else {
                    setError("No se pudo eliminar");
                    console.log(error);
                  }
                } catch (err) {
                  console.error("Error al eliminar:", err);
                  setError("Ocurrió un error al eliminar "+err);
                }
        }else{
            alert("Necesitas tener el rol adecuado para ejecutar esta tarea");
        }
    }else{
        alert("Necesitas loggearte para ejecutar esta tarea");
    }
  };
  const onHandleExpand = async (username: string) => {
    console.log(username);
  };

  const positionClass = useMemo(() => {
    switch (screen) {
      case "xs":
      case "sm":
        return "bottom-20 left-1/2 -translate-x-[-100px]";
      case "md":
        return "bottom-20 left-1/2 -translate-x-[-180px]";
      case "lg":
      case "xl":
      case "2xl":
        return "bottom-20 left-1/2 -translate-x-[-200px]";
      default:
        return "bottom-30 left-1/2 -translate-x-[180px]";
    }
  }, [screen]);
  //let showText = false;

    const fetchUsers = async () => {
      try {
        setError(""); // limpiamos el error antes de recargar
        const res = await fetch("api/auth/users"); //  usa ruta local del proxy
        const data = await res.json();
        alert(data);
        setUsers(data);
      } catch (err) {
        console.error(err);
        setError("Error al cargar usuarios");
      }
    };

  /*const fetchUsers = async () => {
    try {
      setError(""); // limpiamos el error antes de recargar
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/users`);
      const data = await res.json();
      setUsers(data);
    } catch (err: unknown) {
        console.error(err);
        setError("Error al cargar usuarios");
    }
  };
*/
  useEffect(() => {
    fetchUsers();
    const data = localStorage.getItem("dataUser");
      if (data) {
        const userData = JSON.parse(data);
        setUser(userData);

      }
  }, []);


  return (
    <div className="max-w-3xl mt-4 space-y-4 ">

      <h2 className="text-white text-2xl font-bold mb-4 text-center ">Usuarios registrados</h2>

      <div className="relative max-w-3xl mt-4 space-y-4 overflow-y-auto max-h-[80vh] scrollbar-hidden">
            {Array.isArray(users) ? (
              users.map((user) => (
                <UserCard
                  key={user.id}
                  username={user.username}
                  role={user.role}
                  onHandleDelete={() => onHandleDelete(user.username)}
                  onHandleExpand={() => onHandleExpand(user.username)}
                />
              ))
            ) : (
              <p className="text-red-500">Error: los datos de usuarios no son válidos.</p>
            )}

        <PlusButton
          onClick={() => setShowModal(true)}
          className={`fixed ${positionClass} shadow-lg`}
          bgColor="bg-blue-600"
          textColor="text-white"
        />
        {showModal && (
          <UserRegisterModal
            onClose={() => setShowModal(false)}
            onSuccess={() => fetchUsers()} // o actualizar lista
          />
        )}
      </div>



      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
