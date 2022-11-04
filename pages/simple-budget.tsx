import { FC, useCallback, useEffect, useState } from "react";
import {
  FiArrowDown,
  FiArrowUp,
  FiChevronsDown,
  FiChevronsUp,
  FiEdit,
  FiTrash2,
} from "react-icons/fi";
import { twMerge } from "tailwind-merge";
import { useLocalStorage } from "usehooks-ts";
import Button from "../src/components/Button";
import Layout from "../src/components/Layout";
import {
  addRecord,
  deleteAllUnpinnedRecord,
  deleteRecord,
  moveDown,
  moveUp,
  setPinStatus,
  updateRecord,
} from "../src/simpleBudget/actions";
import AddButton from "../src/simpleBudget/AddButton";
import AddingWindow from "../src/simpleBudget/AddingWindow";
import {
  DataSchema,
  ItemType,
  ItemTypeWithHidden,
  RecordItem,
} from "../src/simpleBudget/types";

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
          id="adding-window-triggerer"
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
        >{`${
          itemType === "expense" ? "-" : "+"
        }${itemData.amount.toLocaleString("en-US", {
          maximumFractionDigits: 2,
        })}`}</p>
      </div>
    </>
  );
};

const PinnedItemRenderer: FC<{
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
}> = ({
  itemData,
  itemType,
  isMenuVisible,
  onMoveUp,
  canMoveUp,
  onMoveDown,
  canMoveDown,
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
          <FiChevronsDown />
        </Button>
        <Button
          id="adding-window-triggerer"
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
        >{`${
          itemType === "expense" ? "-" : "+"
        }${itemData.amount.toLocaleString("en-US", {
          maximumFractionDigits: 2,
        })}`}</p>
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

const SimpleBudget = () => {
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

  const onMoveUpHandler = useCallback(
    (rtype: ItemType, id: string) => {
      setPersistedData((p) => {
        return moveUp(rtype, id)(p);
      });
    },
    [setPersistedData],
  );

  const onMoveDownHandler = useCallback(
    (rtype: ItemType, id: string) => {
      setPersistedData((p) => {
        return moveDown(rtype, id)(p);
      });
    },
    [setPersistedData],
  );

  const onSetPinHandler = useCallback(
    (rtype: ItemType, id: string, status: boolean) => {
      setPersistedData((p) => {
        return setPinStatus(rtype, id, status)(p);
      });
      setMenuVisibleId(undefined);
    },
    [setPersistedData],
  );

  const onDeleteHandler = useCallback(
    (rtype: ItemType, id: string, note: string) => {
      if (!confirm(`Are you sure to delete "${note}"?`)) return;

      setPersistedData((p) => {
        return deleteRecord(rtype, id)(p);
      });
    },
    [setPersistedData],
  );

  const onClickClearAll = useCallback(() => {
    if (!confirm("Are you sure to clear all the unpinned data?")) {
      return;
    }

    if (
      !confirm("Are you REALLY REALLY sure to clear all the unpinned data?")
    ) {
      return;
    }

    setPersistedData((p) => deleteAllUnpinnedRecord(p));
  }, [setPersistedData]);

  useEffect(() => {
    setData(persistedData);
  }, [persistedData]);

  return (
    <Layout title="Simple Budget">
      <main>
        {data.expense.length === 0 && data.income.length === 0 && "No record!"}

        <section id="render-data" className="pb-14">
          {data?.diff !== undefined && (
            <div id="diff" className="mb-6">
              <h2 className="mb-2 text-lg font-bold">Diff</h2>

              <DiffRenderer value={data.diff} />
            </div>
          )}

          {data.expense.length > 0 && (
            <div id="expense" className="mb-6">
              <h2 className="mb-2 text-lg font-bold">Expense</h2>

              {data.expense.map(
                (ex, ind, arr) =>
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
                      canMoveUp={ind !== 0}
                      onMoveUp={() => {
                        onMoveUpHandler("expense", ex.id);
                      }}
                      canMoveDown={ind !== arr.length - 1}
                      onMoveDown={() => {
                        onMoveDownHandler("expense", ex.id);
                      }}
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
                (inc, ind, arr) =>
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
                      canMoveUp={ind !== 0}
                      onMoveUp={() => {
                        onMoveUpHandler("income", inc.id);
                      }}
                      canMoveDown={ind !== arr.length - 1}
                      onMoveDown={() => {
                        onMoveDownHandler("income", inc.id);
                      }}
                      onSetPin={() => {
                        onSetPinHandler("income", inc.id, false);
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
                        onDeleteHandler("income", inc.id, inc.note);
                      }}
                    />
                  ),
              )}

              <TotalRenderer itemType="income" amount={getSum(data.income)} />
            </div>
          )}
        </section>
      </main>

      <section id="control">
        <AddingWindow
          addingType={addingType}
          amountHook={amountHook}
          noteHook={noteHook}
          onSave={(rtype, amount, note, editingId) =>
            setPersistedData((p) =>
              editingId
                ? updateRecord(rtype, amount, note, editingId)(p)
                : addRecord(rtype, amount, note)(p),
            )
          }
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

export default SimpleBudget;
