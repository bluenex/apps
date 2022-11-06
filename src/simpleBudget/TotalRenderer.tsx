import { FC, useState } from "react";
import { twMerge } from "tailwind-merge";
import TapOutsideDetector from "../components/TapOutsideDetector";
import { ItemType } from "./types";

interface TotalRendererProps {
  amount: number;
  pinnedAmount: number;
  notPinnedAmount: number;
  itemType: ItemType;
}

const TotalRenderer: FC<TotalRendererProps> = ({
  amount,
  pinnedAmount,
  notPinnedAmount,
  itemType,
}) => {
  const [isDetailVisible, setIsDetailVisible] = useState(false);

  return (
    <div>
      <hr className="my-2" />

      <TapOutsideDetector
        triggererId="total-detail-triggerer"
        onTapOutside={() => setIsDetailVisible(false)}
      >
        <div
          className={twMerge(
            "rounded bg-black bg-opacity-25 text-sm",
            "pointer-events-none h-0 opacity-0 transition-all duration-300",
            isDetailVisible && "h-fit opacity-100",
          )}
        >
          <div className="mb-1 py-1.5">
            <div className="flex w-full justify-between px-2">
              <p className="font-bold">Pinned:</p>
              <p
                className={twMerge(
                  itemType === "expense" && "text-red-400",
                  itemType === "income" && "text-green-400",
                )}
              >{`${
                itemType === "expense" ? "-" : "+"
              }${pinnedAmount.toLocaleString("en-US", {
                maximumFractionDigits: 2,
              })}`}</p>
            </div>

            <div className="flex w-full justify-between px-2">
              <p className="font-bold">Not pinned:</p>
              <p
                className={twMerge(
                  itemType === "expense" && "text-red-400",
                  itemType === "income" && "text-green-400",
                )}
              >{`${
                itemType === "expense" ? "-" : "+"
              }${notPinnedAmount.toLocaleString("en-US", {
                maximumFractionDigits: 2,
              })}`}</p>
            </div>
          </div>
        </div>
      </TapOutsideDetector>

      <div
        id="total-detail-triggerer"
        className="flex w-full justify-between px-2"
        onClick={() => setIsDetailVisible((p) => !p)}
      >
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
