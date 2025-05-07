//'use client';

import UsersList from "@/components/users/UsersList";

//interface User {
//  id: number;
//  username: string;
//  role: string;
//}
/*
async function getUsers() {
  try {
    const res = await fetch("http://localhost:8080/api/auth/users");
    if (!res.ok) throw new Error("Failed to fetch");
    return await res.json();
  } catch (err) {
    console.error("Error fetching users:", err);
    return []; // <- asegúrate de devolver un array
  }
}*/


export default async function UsersPage() {
  //const users = await getUsers();
  return (
    <div className="flex justify-center items-center">
      <UsersList  />
    </div>
  );
}

/*export default function LoginPage() {

  return (
    <div className="flex justify-center items-center">

      <UsersList users={users} error={error}/>

    </div>
  );
}*/