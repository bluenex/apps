import { FC } from "react";
import {
  FiArrowDown,
  FiArrowUp,
  FiEdit,
  FiEye,
  FiEyeOff,
  FiTrash2,
} from "react-icons/fi";
import { TbPin, TbPinnedOff } from "react-icons/tb";
import { twMerge } from "tailwind-merge";
import Button from "../components/Button";
import { ItemType, RecordItem } from "./types";

const ItemRenderer: FC<{
  itemData: RecordItem;
  itemType: ItemType;
  isMenuVisible: boolean;
  canMoveDown: boolean;
  canMoveUp: boolean;
  onClick: () => void;
  onMoveDown: () => void;
  onMoveUp: () => void;
  onPressEdit: () => void;
  onSetPin: () => void;
  onPressDelete?: () => void;
  onExclude: () => void;
}> = ({
  itemData,
  itemType,
  isMenuVisible,
  canMoveDown,
  canMoveUp,
  onClick,
  onMoveDown,
  onMoveUp,
  onPressEdit,
  onSetPin,
  onPressDelete,
  onExclude,
}) => {
  const { isPinned, isExcluded } = itemData;

  return (
    <>
      <div
        className={twMerge(
          "pointer-events-none h-0 w-full rounded-t bg-black bg-opacity-25 opacity-0 transition-all duration-300",
          "flex justify-evenly text-lg",
          isMenuVisible && "pointer-events-auto h-10 opacity-100",
        )}
      >
        <Button
          className="grid flex-1 place-content-center disabled:text-neutral-500"
          onClick={onExclude}
        >
          {isExcluded ? <FiEye /> : <FiEyeOff />}
        </Button>
        <Button
          className="grid flex-1 place-content-center disabled:text-neutral-500"
          disabled={!canMoveUp}
          onClick={onMoveUp}
        >
          <FiArrowUp />
        </Button>
        <Button
          className="grid flex-1 place-content-center disabled:text-neutral-500"
          disabled={!canMoveDown}
          onClick={onMoveDown}
        >
          <FiArrowDown />
        </Button>
        <Button
          className="grid flex-1 place-content-center disabled:text-neutral-500"
          onClick={onSetPin}
        >
          {isPinned ? <TbPinnedOff /> : <TbPin />}
        </Button>
        <Button
          id="adding-window-triggerer"
          className="grid flex-1 place-content-center"
          onClick={onPressEdit}
        >
          <FiEdit />
        </Button>
        {!isPinned && (
          <Button
            className="grid flex-1 place-content-center"
            onClick={onPressDelete}
          >
            <FiTrash2 />
          </Button>
        )}
      </div>

      <div
        className={twMerge(
          "mb-0.5 flex w-full justify-between p-0.5 px-2 active:bg-black active:bg-opacity-10",
          isMenuVisible && "bg-black bg-opacity-25",
          isPinned && "font-semibold",
          isExcluded && "line-through opacity-30 grayscale",
        )}
        onClick={() => onClick()}
      >
        <p className="flex items-center gap-1">
          {isPinned && <TbPin />}
          {itemData.note}
        </p>
        <p
          className={twMerge(
            itemType === "expense" && "text-red-400",
            itemType === "income" && "text-green-400",
          )}
        >{`${
          itemType === "expense" ? "-" : "+"
        }${itemData.amount.toLocaleString("en-US", {
          maximumFractionDigits: 2,
        })}`}</p>
      </div>
    </>
  );
};

export default ItemRenderer;
