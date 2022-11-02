import { DetailedHTMLProps, FC, HTMLAttributes } from "react";
import { FiX } from "react-icons/fi";
import { twMerge } from "tailwind-merge";
import { AddingWindowType } from "../../pages";
import Button from "./Button";

const upperFirst = (x?: string) => x && `${x[0].toUpperCase()}${x.slice(1)}`;

interface AddingWindowProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  type: AddingWindowType;
  onSave: () => void;
  onClose: () => void;
}

const AddingWindow: FC<AddingWindowProps> = ({
  type,
  onSave,
  onClose,
  className,
}) => {
  return (
    <div
      className={twMerge(
        "fixed top-1/4",
        "shadow-common fixed w-[calc(100%-30px)] rounded-2xl bg-neutral-500 p-5",
        "pointer-events-none translate-x-[120%] transition-all duration-300",
        type !== "hidden" && "pointer-events-auto translate-x-0",
        className,
      )}
    >
      <header className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">
          {"Adding "}
          <span
            className={twMerge(
              type === "income" && "text-green-400",
              type === "expense" && "text-red-300",
            )}
          >
            {upperFirst(type)}
          </span>
        </h2>

        <Button onClick={onClose}>
          <FiX className="text-2xl" />
        </Button>
      </header>

      <div id="amount-group" className="mb-4 flex flex-col">
        <label htmlFor="amount" className="mb-1 text-lg font-bold">
          Amount
        </label>
        <input
          className={twMerge(
            "border-b-2 border-b-neutral-100 bg-transparent text-lg font-bold tracking-widest",
            type === "income" && "text-green-400",
            type === "expense" && "text-red-300",
          )}
          type="number"
          name="amount"
          id="amount"
        />
      </div>

      <div id="note-group" className="mb-8 flex flex-col">
        <label htmlFor="note" className="mb-1 text-lg font-bold">
          Note
        </label>
        <input
          className="break-words border-b-2 border-b-neutral-100 bg-transparent text-lg font-bold tracking-wide"
          type="text"
          name="note"
          id="note"
        />
      </div>

      <Button className="shadow-common w-full rounded-2xl bg-sky-700 py-4 px-8 text-lg">
        Save
      </Button>
    </div>
  );
};

export default AddingWindow;
