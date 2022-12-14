import {
  DetailedHTMLProps,
  Dispatch,
  FC,
  HTMLAttributes,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { FiX } from "react-icons/fi";
import { twMerge } from "tailwind-merge";
import Button from "../components/Button";
import TapOutsideDetector from "../components/TapOutsideDetector";
import { ItemType, ItemTypeWithHidden } from "./types";

const upperFirst = (x?: string) => x && `${x[0].toUpperCase()}${x.slice(1)}`;

interface AddingWindowProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  addingType: ItemTypeWithHidden;
  amountHook: [
    number | undefined,
    Dispatch<SetStateAction<number | undefined>>,
  ];
  noteHook: [string, Dispatch<SetStateAction<string>>];
  onSave: (
    type: ItemType,
    amount: number,
    note: string,
    editingId?: string,
  ) => void;
  onClose: () => void;
  editingId?: string;
}

const AddingWindow: FC<AddingWindowProps> = ({
  addingType,
  amountHook,
  noteHook,
  onSave,
  onClose,
  className,
  editingId,
}) => {
  const [amount, setAmount] = amountHook;
  const [note, setNote] = noteHook;

  const noteInputRef = useRef<HTMLInputElement>(null);
  const amountInputRef = useRef<HTMLInputElement>(null);

  const handleCleanUpOnClose = useCallback(() => {
    setAmount(undefined);
    setNote("");
    onClose();
  }, [onClose, setAmount, setNote]);

  const handleTapOutside = useCallback(() => {
    handleCleanUpOnClose();
  }, [handleCleanUpOnClose]);

  useEffect(() => {
    if (addingType !== "hidden") {
      noteInputRef.current?.focus();
    }
  }, [addingType]);

  return (
    <TapOutsideDetector
      triggererId="adding-window-triggerer"
      onTapOutside={handleTapOutside}
    >
      <div
        className={twMerge(
          "fixed top-[10%] left-[5%] w-[calc(100%-10%)]",
          "shadow-dark rounded-lg bg-neutral-500 p-5 text-neutral-100",
          "sm:left-[25%] sm:max-w-[50%] xl:left-[37.5%] xl:max-w-[25%]",
          "pointer-events-none translate-x-[100vw] transition-all duration-300",
          addingType !== "hidden" && "pointer-events-auto translate-x-0",
          className,
        )}
        onKeyDown={(e) => {
          if (e.code === "Enter" || e.keyCode === 13) {
            if ((!amount && amount !== 0) || addingType === "hidden") return;

            onSave(addingType as ItemType, amount, note, editingId);
            handleCleanUpOnClose();

            amountInputRef.current?.blur();
          }
        }}
      >
        <header className="mb-3 flex items-center justify-between">
          <h2 className="text-2xl font-bold">
            {"Adding "}
            <span
              className={twMerge(
                addingType === "income" && "text-green-400",
                addingType === "expense" && "text-red-400",
              )}
            >
              {upperFirst(addingType)}
            </span>
          </h2>

          <Button onClick={handleCleanUpOnClose}>
            <FiX className="text-2xl" />
          </Button>
        </header>

        <div id="note-group" className="mb-2 flex flex-col">
          <label htmlFor="note" className="mb-1 text-lg font-bold">
            Note
          </label>
          <input
            ref={noteInputRef}
            className="rounded border border-neutral-300 bg-transparent text-lg font-bold tracking-wide"
            type="text"
            name="note"
            id="note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </div>

        <div id="amount-group" className="mb-4 flex flex-col">
          <label htmlFor="amount" className="mb-1 text-lg font-bold">
            Amount
          </label>
          <input
            ref={amountInputRef}
            className={twMerge(
              "rounded border border-neutral-300 bg-transparent text-lg font-bold tracking-widest",
              addingType === "income" && "text-green-400",
              addingType === "expense" && "text-red-400",
            )}
            type="number"
            name="amount"
            id="amount"
            value={amount || ""}
            onChange={(e) => setAmount(Number(e.target.value))}
          />
        </div>

        <Button
          className="shadow-thin w-full rounded-lg bg-sky-700 py-4 px-8 text-lg"
          onClick={() => {
            if ((!amount && amount !== 0) || addingType === "hidden") return;

            onSave(addingType as ItemType, amount, note, editingId);
            handleCleanUpOnClose();

            amountInputRef.current?.blur();
          }}
        >
          Save
        </Button>
      </div>
    </TapOutsideDetector>
  );
};

export default AddingWindow;
