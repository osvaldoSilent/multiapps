import RedButton from "@/components/globals/RedButton";
import CustomButton from "@/components/globals/CustomButton";


interface Props {
  username: string;
  role: string;
  onHandleDelete: (username: string) => void;
  onHandleExpand: () => void;
}

export default function UserCard({ username, role, onHandleDelete, onHandleExpand }: Props) {
  return (
    <div className="bg-gray-800 p-2 lg:p-15 md:p-10 sm:p-5 rounded-xl shadow flex flex-row justify-between px-4 py-4 gap-3 w-full">

      <div className="flex flex-col sm:flex-row gap-4 overflow-hidden">
        <span className="hidden sm:block lg:text-xl md:text-lg sm:text-md">👤</span>
        <p className="text-purple-400 lg:text-xl md:text-lg sm:text-md font-semibold">{username}</p>
      </div>

      <div className="flex items-center gap-2">

        <CustomButton
          text={role}
          bgColor="bg-green-700"
          onClick={()=> onHandleExpand(username)}
        />
        <CustomButton text="Eliminar" bgColor="bg-red-600" onClick={()=> onHandleDelete(username)}/>
      </div>

    </div>
  );
}
