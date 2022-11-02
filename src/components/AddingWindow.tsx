import { DetailedHTMLProps, FC, HTMLAttributes, useState } from "react";
import { FiX } from "react-icons/fi";
import { twMerge } from "tailwind-merge";
import { ItemType, ItemTypeWithHidden } from "../../pages";
import Button from "./Button";

const upperFirst = (x?: string) => x && `${x[0].toUpperCase()}${x.slice(1)}`;

interface AddingWindowProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  addingType: ItemTypeWithHidden;
  onSave: (type: ItemType, amount: number, note: string) => void;
  onClose: () => void;
}

const AddingWindow: FC<AddingWindowProps> = ({
  addingType,
  onSave,
  onClose,
  className,
}) => {
  const [amount, setAmount] = useState<number>();
  const [note, setNote] = useState<string>("");

  return (
    <div
      className={twMerge(
        "fixed top-1/4",
        "shadow-common fixed left-[5%] w-[calc(100%-10%)] rounded-2xl bg-neutral-500 p-5",
        "sm:left-[25%] sm:max-w-[50%] xl:left-[37.5%] xl:max-w-[25%]",
        "pointer-events-none translate-x-[100vw] transition-all duration-300",
        addingType !== "hidden" && "pointer-events-auto translate-x-0",
        className,
      )}
      onKeyDown={(e) => {
        if (e.code === "Enter") {
          if (!amount || addingType === "hidden") return;

          onSave(addingType as ItemType, amount, note);

          onClose();
          setAmount(undefined);
          setNote("");
        }
      }}
    >
      <header className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold">
          {"Adding "}
          <span
            className={twMerge(
              addingType === "income" && "text-green-400",
              addingType === "expense" && "text-red-300",
            )}
          >
            {upperFirst(addingType)}
          </span>
        </h2>

        <Button
          onClick={() => {
            onClose();
            setAmount(undefined);
            setNote("");
          }}
        >
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
            addingType === "income" && "text-green-400",
            addingType === "expense" && "text-red-300",
          )}
          type="number"
          name="amount"
          id="amount"
          value={amount || ""}
          onChange={(e) => setAmount(Number(e.target.value))}
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
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
      </div>

      <Button
        className="shadow-common w-full rounded-2xl bg-sky-700 py-4 px-8 text-lg"
        onClick={() => {
          if (!amount || addingType === "hidden") return;

          onSave(addingType as ItemType, amount, note);

          onClose();
          setAmount(undefined);
          setNote("");
        }}
      >
        Save
      </Button>
    </div>
  );
};

export default AddingWindow;
