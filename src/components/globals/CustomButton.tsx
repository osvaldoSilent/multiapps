interface CustomButtonProps {
  text: string
  bgColor?: string
  textColor?: string
  onClick?: () => void
  className?: string // para estilos extra si quieres
}

export default function CustomButton({
  text,
  bgColor = "bg-blue-600",
  textColor = "text-white",
  onClick,
  className = "",
}: CustomButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`${bgColor} ${textColor} px-4 py-2 rounded-lg font-semibold hover:brightness-110 transition ${className}`}
    >
      {text}
    </button>
  )
}
