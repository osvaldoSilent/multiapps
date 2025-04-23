interface Props {
  onClick: () => void;
}

export default function RedButton({ onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="bg-red-500
      hover:bg-red-600
      text-white
      px-4
      py-2
      rounded-lg
      text-sm
      transition-all
      sm:p-2
      md:p-4
      lg:p-6
      sm:px-6
      md:px-8
      lg:px-10
      sm:text-sm
      md:text-md
      lg:text-lg "
    >
      Eliminar
    </button>
  );
}
