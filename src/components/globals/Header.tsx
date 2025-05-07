"use client";
import { useEffect, useState } from "react";
import { useScreenSize } from "@/hooks/useScreenSize";


export default function Header() {

const screen = useScreenSize();

const getTitle = () => {
  switch (screen) {
    case "xs":
      return "DragonApp";
    case "sm":
      return "🔥DragonApp";
    case "md":
      return "🔥 DragonApp";
    case "lg":
    case "xl":
    case "2xl":
      return "🔥 DragonApp";
    default:
      return "🔥 DragonApp";
  }
}

const getWalletTitle = () => {
  switch (screen) {
    case "xs":
      return "Wallet";
    case "sm":
      return "Wallet";
    case "md":
      return "Connect your Wallet";
    case "lg":
    case "xl":
    case "2xl":
      return "Connect your Wallet";
    default:
      return "Connect your Wallet";
  }
}

const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const data = localStorage.getItem("dataUser");
    if (data) {
      const user = JSON.parse(data);
      setIsLoggedIn(!!user.token); // si tiene token, está logueado
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };


  const handleMenu = (destination: string) => {
  switch (destination) {
      case 'home':
            window.location.href = "/home";
            break;
      case 'wallet':
            window.location.href = "/login";
            break;
      case 'admin':
            window.location.href = "/users";
            break;
      default:
            console.warn(`Ruta desconocida: ${destination}`);
            break;
      }
  };

  return (
    <header className="bg-gray-800 text-white px-6
    py-4 flex flex-row justify-between items-center
    shadow-md text-xs sm:text-xl ">

      <div className="flex flex-row justify-between gap-x-6 h-full ">
          <section className="h-full flex items-center px-4 border border-white rounded cursor-pointer">
              <h1 className="font-bold" onClick={()=>handleMenu("home")}> {getTitle()} </h1>
          </section>
          <section className="h-full flex items-center px-4 border border-white rounded cursor-pointer">
              <h2 className="font-bold" onClick={()=>handleMenu("admin")}>ADMIN</h2>
          </section>
          <section className="h-full flex items-center px-4 border border-white rounded cursor-pointer">
              <h2 className="font-bold" onClick={()=>handleMenu("wallet")}>{getWalletTitle()}</h2>
          </section>
      </div>
      <div>
        {isLoggedIn && (
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-500 transition px-4 py-2 rounded-lg text-sm font-bold"
            >
            LogOut
            </button>
        )}
        {!isLoggedIn && (
            <button
              onClick={handleLogout}
              className="bg-green-600 hover:bg-green-500 transition px-4 py-2 rounded-lg text-sm font-bold"
            >
            LogIn
            </button>
        )}
      </div>

    </header>
  );
}
