import { FC, useCallback, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { useLocalStorage } from "usehooks-ts";
import Layout from "../src/components/Layout";
import {
  addRecord,
  deleteAllUnpinnedRecord,
  deleteRecord,
  getSum,
  moveRecord,
  pinRecord,
  updateRecord,
} from "../src/simpleBudget/actions";
import AddButton from "../src/simpleBudget/AddButton";
import AddingWindow from "../src/simpleBudget/AddingWindow";
import ItemRenderer from "../src/simpleBudget/ItemRenderer";
import {
  DataSchema,
  ItemType,
  ItemTypeWithHidden,
} from "../src/simpleBudget/types";

const defaultData: DataSchema = {
  expense: [],
  income: [],
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
        return moveRecord(rtype, id, "up")(p);
      });
    },
    [setPersistedData],
  );

  const onMoveDownHandler = useCallback(
    (rtype: ItemType, id: string) => {
      setPersistedData((p) => {
        return moveRecord(rtype, id, "down")(p);
      });
    },
    [setPersistedData],
  );

  const onSetPinHandler = useCallback(
    (rtype: ItemType, id: string, status: boolean) => {
      setPersistedData((p) => {
        return pinRecord(rtype, id, status)(p);
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

              {data.expense.map((ex, ind, arr) => {
                const pinnedCount = arr.filter((x) => x.isPinned).length;
                const canMoveUp = ex.isPinned ? ind > 0 : ind > pinnedCount;
                const canMoveDown = ex.isPinned
                  ? ind < pinnedCount - 1
                  : ind < arr.length - 1;

                return (
                  <ItemRenderer
                    key={ex.id}
                    itemType="expense"
                    itemData={ex}
                    isMenuVisible={menuVisibleId === ex.id}
                    canMoveUp={canMoveUp}
                    canMoveDown={canMoveDown}
                    onClick={() =>
                      setMenuVisibleId((p) => (ex.id !== p ? ex.id : undefined))
                    }
                    onMoveUp={() => onMoveUpHandler("expense", ex.id)}
                    onMoveDown={() => onMoveDownHandler("expense", ex.id)}
                    onSetPin={() => {
                      onSetPinHandler("expense", ex.id, !ex.isPinned);
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
                );
              })}

              <TotalRenderer itemType="expense" amount={getSum(data.expense)} />
            </div>
          )}

          {data.income.length > 0 && (
            <div id="income" className="mb-6">
              <h2 className="mb-2 text-lg font-bold">Income</h2>

              {data.income.map((inc, ind, arr) => {
                const pinnedCount = arr.filter((x) => x.isPinned).length;
                const canMoveUp = inc.isPinned ? ind > 0 : ind > pinnedCount;
                const canMoveDown = inc.isPinned
                  ? ind < pinnedCount - 1
                  : ind < arr.length - 1;

                return (
                  <ItemRenderer
                    key={inc.id}
                    itemType="income"
                    itemData={inc}
                    isMenuVisible={menuVisibleId === inc.id}
                    canMoveUp={canMoveUp}
                    canMoveDown={canMoveDown}
                    onClick={() =>
                      setMenuVisibleId((p) =>
                        inc.id !== p ? inc.id : undefined,
                      )
                    }
                    onMoveUp={() => onMoveUpHandler("income", inc.id)}
                    onMoveDown={() => onMoveDownHandler("income", inc.id)}
                    onSetPin={() => {
                      onSetPinHandler("income", inc.id, !inc.isPinned);
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
                );
              })}

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
