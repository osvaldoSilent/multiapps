//'use client';

import UsersList from "@/components/users/UsersList";

export default async function UsersPage() {
  return (
    <div className="flex justify-center items-center">
      <UsersList  />
    </div>
  );
}

