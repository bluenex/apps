import { FC } from "react";
import { twMerge } from "tailwind-merge";

const DiffRenderer: FC<{ value: number }> = ({ value }) => {
  return (
    <div
      className={twMerge(
        "w-full rounded-2xl p-6 text-center text-xl font-bold tracking-wider shadow",
        value > 0 && "bg-green-800 bg-opacity-30",
        value === 0 && "bg-neutral-800 bg-opacity-30",
        value < 0 && "bg-red-800 bg-opacity-30",
      )}
    >
      <p>{`${value > 0 ? "+" : ""}${value.toLocaleString("en-US", {
        maximumFractionDigits: 2,
      })}`}</p>
    </div>
  );
};

export default DiffRenderer;
