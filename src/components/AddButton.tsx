import { FC, useState } from "react";
import { FiPlus, FiMinus } from "react-icons/fi";
import { twMerge } from "tailwind-merge";
import { ItemType } from "../../pages";
import Button from "./Button";

interface AddButtonProps {
  onClick: (t: ItemType) => void;
}

const AddButton: FC<AddButtonProps> = ({ onClick }) => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 flex flex-col justify-end gap-4">
      <div
        className={twMerge(
          "shadow-common pointer-events-none grid translate-x-[200%] gap-1.5 rounded-2xl bg-neutral-500 p-1 transition-all duration-300",
          isMenuVisible && "pointer-events-auto translate-x-0",
        )}
      >
        <Button
          className="rounded-2xl bg-green-800 p-6"
          onClick={() => {
            onClick("income");
            setIsMenuVisible(false);
          }}
        >
          <FiPlus className="text-2xl" />
        </Button>
        <Button
          className="rounded-2xl bg-red-800 p-6"
          onClick={() => {
            onClick("expense");
            setIsMenuVisible(false);
          }}
        >
          <FiMinus className="text-2xl" />
        </Button>
      </div>

      <div className="ml-auto">
        <Button
          className="shadow-common rounded-full bg-sky-700 bg-opacity-75 p-5"
          onClick={() => setIsMenuVisible((p) => !p)}
        >
          <FiPlus className="text-2xl" />
        </Button>
      </div>
    </div>
  );
};

export default AddButton;
