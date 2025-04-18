type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
};

export default function ButtonSend({ children, onClick, type = "button" }: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
    >
      {children}
    </button>
  );
}
