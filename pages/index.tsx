import { FC, useCallback, useEffect, useState } from "react";
import {
  FiArrowDown,
  FiArrowUp,
  FiEdit,
  FiChevronsUp,
  FiChevronsDown,
  FiTrash2,
} from "react-icons/fi";
import { twMerge } from "tailwind-merge";
import { useLocalStorage } from "usehooks-ts";
import { v4 as uuidv4 } from "uuid";
import AddButton from "../src/components/AddButton";
import AddingWindow from "../src/components/AddingWindow";
import Button from "../src/components/Button";
import Layout from "../src/components/Layout";

export type ItemType = "income" | "expense";
export type ItemTypeWithHidden = ItemType | "hidden";

type RecordItem = {
  id: string;
  amount: number;
  note: string;
  isPinned: boolean;
};

type DataSchema = {
  expense: RecordItem[];
  income: RecordItem[];
  diff?: number;
};

const getSum = (data: RecordItem[]) => {
  return data.reduce((acc, cur) => acc + cur.amount, 0);
};

const defaultData: DataSchema = {
  expense: [],
  income: [],
};

const ItemRenderer: FC<{
  itemData: RecordItem;
  itemType: ItemType;
  onClick: () => void;
  isMenuVisible: boolean;
  onMoveUp: () => void;
  canMoveUp: boolean;
  onMoveDown: () => void;
  canMoveDown: boolean;
  onSetPin: () => void;
  onPressEdit: () => void;
  onPressDelete: () => void;
}> = ({
  itemData,
  itemType,
  isMenuVisible,
  onClick,
  onMoveUp,
  canMoveUp,
  onMoveDown,
  canMoveDown,
  onSetPin,
  onPressEdit,
  onPressDelete,
}) => {
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
          <FiChevronsUp />
        </Button>
        <Button
          className="grid flex-1 place-content-center"
          onClick={onPressEdit}
        >
          <FiEdit />
        </Button>
        <Button
          className="grid flex-1 place-content-center"
          onClick={onPressDelete}
        >
          <FiTrash2 />
        </Button>
      </div>

      <div
        className={twMerge(
          "mb-0.5 flex w-full justify-between p-0.5 px-2 active:bg-black active:bg-opacity-10",
          isMenuVisible && "bg-black bg-opacity-25",
        )}
        onClick={() => onClick()}
      >
        <p>{itemData.note}</p>
        <p
          className={twMerge(
            itemType === "expense" && "text-red-300",
            itemType === "income" && "text-green-400",
          )}
        >{`${itemType === "expense" ? "-" : "+"}${itemData.amount}`}</p>
      </div>
    </>
  );
};

const PinnedItemRenderer: FC<{
  itemData: RecordItem;
  itemType: ItemType;
  onClick: () => void;
  isMenuVisible: boolean;
  onSetPin: () => void;
  onPressEdit: () => void;
}> = ({
  itemData,
  itemType,
  isMenuVisible,
  onClick,
  onSetPin,
  onPressEdit,
}) => {
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
          onClick={onSetPin}
        >
          <FiChevronsDown />
        </Button>
        <Button
          className="grid flex-1 place-content-center"
          onClick={onPressEdit}
        >
          <FiEdit />
        </Button>
      </div>

      <div
        className={twMerge(
          "mb-0.5 flex w-full justify-between p-0.5 px-2 font-semibold active:bg-black active:bg-opacity-10",
          isMenuVisible && "bg-black bg-opacity-25",
        )}
        onClick={() => onClick()}
      >
        <p className="flex items-center gap-1">
          <FiChevronsUp />
          {itemData.note}
        </p>
        <p
          className={twMerge(
            itemType === "expense" && "text-red-300",
            itemType === "income" && "text-green-400",
          )}
        >{`${itemType === "expense" ? "-" : "+"}${itemData.amount}`}</p>
      </div>
    </>
  );
};

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
            itemType === "expense" && "text-red-300",
            itemType === "income" && "text-green-400",
          )}
        >{`${itemType === "expense" ? "-" : "+"}${amount}`}</p>
      </div>
    </div>
  );
};

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
      <p>{`${value > 0 ? "+" : ""}${value}`}</p>
    </div>
  );
};

const Home = () => {
  const [persistedData, setPersistedData] = useLocalStorage(
    "simple-budget-data",
    defaultData,
  );

  const [data, setData] = useState<DataSchema>(defaultData);
  const [addingType, setAddingType] = useState<ItemTypeWithHidden>("hidden");
  const [menuVisibleId, setMenuVisibleId] = useState<string>();

  const amountHook = useState<number>();
  const noteHook = useState<string>("");
  const [editId, setEditId] = useState<string>();

  const [, setAmount] = amountHook;
  const [, setNote] = noteHook;

  const dataUpdater = useCallback(
    (
      currentType: ItemType,
      amount: number,
      note: string,
      editingId?: string,
    ) => {
      setPersistedData((p) => {
        let updatedItem = { id: uuidv4(), amount, note, isPinned: false };

        // this is a bit hacky as it edits the item mutably in edit mode
        if (editingId) {
          const tmp = p[currentType].find((x) => x.id === editingId);

          if (!tmp) return p;

          updatedItem = tmp;

          updatedItem.id = editingId;
          updatedItem.amount = amount;
          updatedItem.note = note;

          const diff = getSum(p.income) - getSum(p.expense);

          // reset editId here
          setEditId(undefined);

          return {
            ...p,
            diff,
          };
        }

        // as for create mode, the item is created immutably
        const updated = {
          ...p,
          [currentType]: [...p[currentType], updatedItem],
        };
        const diff = getSum(updated.income) - getSum(updated.expense);

        return {
          ...updated,
          diff,
        };
      });
    },
    [setPersistedData],
  );

  const onMoveUpHandler = useCallback(
    (currentType: ItemType, id: string) => {
      setPersistedData((p) => {
        const updatedItem = p[currentType].find((x) => x.id === id);

        if (!updatedItem) return p;

        const updatedItemInd = p[currentType].indexOf(updatedItem);
        const swapItem = p[currentType][updatedItemInd - 1];

        return {
          ...p,
          [currentType]: [
            ...p[currentType].slice(0, updatedItemInd - 1),
            updatedItem,
            swapItem,
            ...p[currentType].slice(updatedItemInd + 1),
          ],
        };
      });
    },
    [setPersistedData],
  );

  const onMoveDownHandler = useCallback(
    (currentType: ItemType, id: string) => {
      setPersistedData((p) => {
        const updatedItem = p[currentType].find((x) => x.id === id);

        if (!updatedItem) return p;

        const updatedItemInd = p[currentType].indexOf(updatedItem);
        const swapItem = p[currentType][updatedItemInd + 1];

        return {
          ...p,
          [currentType]: [
            ...p[currentType].slice(0, updatedItemInd),
            swapItem,
            updatedItem,
            ...p[currentType].slice(updatedItemInd + 2),
          ],
        };
      });
    },
    [setPersistedData],
  );

  const onSetPinHandler = useCallback(
    (currentType: ItemType, id: string, status: boolean) => {
      setPersistedData((p) => {
        const updatedItem = p[currentType].find((x) => x.id === id);

        if (!updatedItem) return p;

        updatedItem.isPinned = status;

        return p;
      });
      setMenuVisibleId(undefined);
    },
    [setPersistedData],
  );

  const onDeleteHandler = useCallback(
    (currentType: ItemType, id: string, note: string) => {
      if (!confirm(`Are you sure to delete "${note}"?`)) return;

      setPersistedData((p) => {
        const updatedItem = p[currentType].find((x) => x.id === id);

        if (!updatedItem) return p;

        const updatedItemInd = p[currentType].indexOf(updatedItem);

        return {
          ...p,
          [currentType]: [
            ...p[currentType].slice(0, updatedItemInd),
            ...p[currentType].slice(updatedItemInd + 1),
          ],
        };
      });
    },
    [setPersistedData],
  );

  const onClickClearAll = useCallback(() => {
    if (!confirm("Are you sure to clear all the data?")) {
      return;
    }

    if (!confirm("Are you REALLY REALLTY sure to clear all the data?")) {
      return;
    }

    setPersistedData(defaultData);
  }, [setPersistedData]);

  useEffect(() => {
    setData(persistedData);
  }, [persistedData]);

  return (
    <Layout>
      <main>
        {data.expense.length === 0 && data.income.length === 0 && "No record!"}

        <section id="render-data">
          {data.expense.length > 0 && (
            <div id="expense" className="mb-6">
              <h2 className="mb-2 text-lg font-bold">Expense</h2>

              {data.expense.map(
                (ex) =>
                  ex.isPinned && (
                    <PinnedItemRenderer
                      itemType="expense"
                      key={ex.id}
                      itemData={ex}
                      isMenuVisible={menuVisibleId === ex.id}
                      onClick={() =>
                        setMenuVisibleId((p) =>
                          ex.id !== p ? ex.id : undefined,
                        )
                      }
                      onSetPin={() => {
                        onSetPinHandler("expense", ex.id, false);
                      }}
                      onPressEdit={() => {
                        setEditId(ex.id);
                        setAmount(ex.amount);
                        setNote(ex.note);
                        setAddingType("expense");
                      }}
                    />
                  ),
              )}

              {data.expense.map(
                (ex, ind, arr) =>
                  !ex.isPinned && (
                    <ItemRenderer
                      itemType="expense"
                      key={ex.id}
                      itemData={ex}
                      isMenuVisible={menuVisibleId === ex.id}
                      onClick={() =>
                        setMenuVisibleId((p) =>
                          ex.id !== p ? ex.id : undefined,
                        )
                      }
                      canMoveUp={ind !== 0}
                      onMoveUp={() => {
                        onMoveUpHandler("expense", ex.id);
                      }}
                      canMoveDown={ind !== arr.length - 1}
                      onMoveDown={() => {
                        onMoveDownHandler("expense", ex.id);
                      }}
                      onSetPin={() => {
                        onSetPinHandler("expense", ex.id, true);
                      }}
                      onPressEdit={() => {
                        setEditId(ex.id);
                        setAmount(ex.amount);
                        setNote(ex.note);
                        setAddingType("expense");
                      }}
                      onPressDelete={() => {
                        onDeleteHandler("expense", ex.id, ex.note);
                      }}
                    />
                  ),
              )}

              <TotalRenderer itemType="expense" amount={getSum(data.expense)} />
            </div>
          )}

          {data.income.length > 0 && (
            <div id="income" className="mb-6">
              <h2 className="mb-2 text-lg font-bold">Income</h2>

              {data.income.map(
                (inc) =>
                  inc.isPinned && (
                    <PinnedItemRenderer
                      itemType="income"
                      key={inc.id}
                      itemData={inc}
                      isMenuVisible={menuVisibleId === inc.id}
                      onClick={() =>
                        setMenuVisibleId((p) =>
                          inc.id !== p ? inc.id : undefined,
                        )
                      }
                      onSetPin={() => {
                        onSetPinHandler("income", inc.id, true);
                      }}
                      onPressEdit={() => {
                        setEditId(inc.id);
                        setAmount(inc.amount);
                        setNote(inc.note);
                        setAddingType("income");
                      }}
                    />
                  ),
              )}

              {data.income.map(
                (inc, ind, arr) =>
                  !inc.isPinned && (
                    <ItemRenderer
                      itemType="income"
                      key={inc.id}
                      itemData={inc}
                      isMenuVisible={menuVisibleId === inc.id}
                      onClick={() =>
                        setMenuVisibleId((p) =>
                          inc.id !== p ? inc.id : undefined,
                        )
                      }
                      canMoveUp={ind !== 0}
                      onMoveUp={() => {
                        onMoveUpHandler("income", inc.id);
                      }}
                      canMoveDown={ind !== arr.length - 1}
                      onMoveDown={() => {
                        onMoveDownHandler("income", inc.id);
                      }}
                      onSetPin={() => {
                        onSetPinHandler("income", inc.id, true);
                      }}
                      onPressEdit={() => {
                        setEditId(inc.id);
                        setAmount(inc.amount);
                        setNote(inc.note);
                        setAddingType("income");
                      }}
                      onPressDelete={() => {
                        onDeleteHandler("expense", inc.id, inc.note);
                      }}
                    />
                  ),
              )}

              <TotalRenderer itemType="income" amount={getSum(data.income)} />
            </div>
          )}

          {data?.diff !== undefined && (
            <div id="diff" className="mb-6">
              <h2 className="mb-2 text-lg font-bold">Diff</h2>

              <DiffRenderer value={data.diff} />
            </div>
          )}
        </section>
      </main>

      <section id="control">
        <AddingWindow
          addingType={addingType}
          amountHook={amountHook}
          noteHook={noteHook}
          onSave={dataUpdater}
          onClose={() => setAddingType("hidden")}
          editingId={editId}
        />

        <AddButton
          onClickAdd={(x) => setAddingType(x)}
          onClickClearAll={onClickClearAll}
        />
      </section>
    </Layout>
  );
};

export default Home;
