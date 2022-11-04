import { FC, useCallback, useState } from "react";
import { FiPlus, FiMinus, FiTrash2 } from "react-icons/fi";
import { twMerge } from "tailwind-merge";
import Button from "../components/Button";
import TabOutsideDetector from "../components/TabOutsideDetector";
import { ItemType } from "./types";

interface AddButtonProps {
  onClickAdd: (t: ItemType) => void;
  onClickClearAll: () => void;
}

const AddButton: FC<AddButtonProps> = ({ onClickAdd, onClickClearAll }) => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);

  const handleTabOutside = useCallback(() => {
    setIsMenuVisible(false);
  }, []);

  return (
    <TabOutsideDetector onTabOutside={handleTabOutside}>
      <div
        id="adding-window-triggerer"
        className="fixed bottom-6 right-6 flex flex-col justify-end gap-4"
      >
        <div className="relative">
          <div
            className={twMerge(
              "shadow-dark pointer-events-none grid translate-x-[200%] gap-2 rounded-full bg-neutral-500 p-1.5 transition-all duration-300",
              "absolute bottom-[130%] right-0",
              isMenuVisible && "pointer-events-auto translate-x-0",
            )}
          >
            <Button
              className="mx-auto rounded-full bg-red-600 bg-opacity-75 p-5 shadow-md shadow-gray-600"
              onClick={() => {
                onClickAdd("expense");
                setIsMenuVisible(false);
              }}
            >
              <FiMinus className="text-2xl" />
            </Button>
            <Button
              className="mx-auto rounded-full bg-green-600 bg-opacity-75 p-5 shadow-md shadow-gray-600"
              onClick={() => {
                onClickAdd("income");
                setIsMenuVisible(false);
              }}
            >
              <FiPlus className="text-2xl" />
            </Button>
          </div>

          <div className="ml-auto">
            <Button
              className="shadow-dark mr-3 rounded-full bg-red-500 bg-opacity-75 p-2.5"
              onClick={onClickClearAll}
            >
              <FiTrash2 className="text" />
            </Button>
            <Button
              className="shadow-dark rounded-full bg-sky-700 bg-opacity-75 p-5"
              onClick={() => setIsMenuVisible((p) => !p)}
            >
              <FiPlus className="text-2xl" />
            </Button>
          </div>
        </div>
      </div>
    </TabOutsideDetector>
  );
};

export default AddButton;
