"use client";
import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import fire from "@/assets/fire.json";

export default function FireLoader() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    console.log("Contenido del JSON fire:", fire); // 👈 confirma estructura
    setShow(true);
  }, []);

  return (
    <div className="flex justify-center items-center py-4">
      {show ? (
        <Lottie
          animationData={fire}
          loop
          autoplay
          className="w-32 h-32"
        />
      ) : (
        <p>🔥 Cargando...</p>
      )}
    </div>
  );
}
