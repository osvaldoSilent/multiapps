import { FiPlus } from 'react-icons/fi';

interface PlusButtonProps {
  text?: string;
  bgColor?: string;
  textColor?: string;
  onClick?: () => void;
  className?: string;
}

export default function PlusButton({
  text,
  bgColor = "bg-blue-600",
  textColor = "text-white",
  positionClass,
  onClick,
  className = "",
  showText
}: PlusButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`${positionClass} ${bgColor} ${textColor} ${className}`}
      title="Crear usuario"
    >
      <FiPlus size={20} />
      {text && <span className="font-semibold">{text}</span>}
    </button>
  );
}
