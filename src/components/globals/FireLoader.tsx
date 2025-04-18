"use client";
import Lottie from "lottie-react";

export default function FireLoader() {
  return (
    <div className="w-24 h-24 flex justify-center items-center">
      <Lottie
        animationData={require("./fire.json")} // si lo descargas
        // o usa animationData directamente con fetch si es externo
        path="https://assets10.lottiefiles.com/packages/lf20_TYutWv.json"
        loop
        autoplay
      />
    </div>
  );
}