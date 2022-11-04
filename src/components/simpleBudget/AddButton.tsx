import { FC, useCallback, useState } from "react";
import { FiPlus, FiMinus, FiTrash2 } from "react-icons/fi";
import { twMerge } from "tailwind-merge";
import { ItemType } from "../../../pages/simple-budget";
import Button from "../Button";
import TabOutsideDetector from "../TabOutsideDetector";

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
              "shadow-common pointer-events-none grid translate-x-[200%] gap-1.5 rounded-2xl bg-neutral-500 p-1 transition-all duration-300",
              "absolute bottom-[130%] right-0",
              isMenuVisible && "pointer-events-auto translate-x-0",
            )}
          >
            <Button
              className="mx-auto rounded-2xl bg-red-800 p-6"
              onClick={() => {
                onClickAdd("expense");
                setIsMenuVisible(false);
              }}
            >
              <FiMinus className="text-2xl" />
            </Button>
            <Button
              className="mx-auto rounded-2xl bg-green-800 p-6"
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
              className="shadow-common mr-3 rounded-full bg-red-500 bg-opacity-75 p-2.5"
              onClick={onClickClearAll}
            >
              <FiTrash2 className="text" />
            </Button>
            <Button
              className="shadow-common rounded-full bg-sky-700 bg-opacity-75 p-5"
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
