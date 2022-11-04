import { FC } from "react";
import { twMerge } from "tailwind-merge";
import { ItemType } from "./types";

const TotalRenderer: FC<{ amount: number; itemType: ItemType }> = ({
  amount,
  itemType,
}) => {
  return (
    <div>
      <hr className="my-2" />
      <div className="flex w-full justify-between px-2">
        <p className="font-bold">Total:</p>
        <p
          className={twMerge(
            itemType === "expense" && "text-red-400",
            itemType === "income" && "text-green-400",
          )}
        >{`${itemType === "expense" ? "-" : "+"}${amount.toLocaleString(
          "en-US",
          {
            maximumFractionDigits: 2,
          },
        )}`}</p>
      </div>
    </div>
  );
};

export default TotalRenderer;
