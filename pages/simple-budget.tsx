import { useCallback, useEffect, useState } from "react";
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
import DiffRenderer from "../src/simpleBudget/DiffRenderer";
import ItemRenderer from "../src/simpleBudget/ItemRenderer";
import TotalRenderer from "../src/simpleBudget/TotalRenderer";
import {
  DataSchema,
  ItemType,
  ItemTypeWithHidden,
} from "../src/simpleBudget/types";

const defaultData: DataSchema = {
  expense: [],
  income: [],
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

  const onMoveHandler = useCallback(
    (rtype: ItemType, id: string, direction: "up" | "down") => {
      setPersistedData((p) => {
        return moveRecord(rtype, id, direction)(p);
      });
    },
    [setPersistedData],
  );

  const onPinHandler = useCallback(
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

  const onDeleteAllUnpinnedHandler = useCallback(() => {
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
                    onMoveUp={() => onMoveHandler("expense", ex.id, "up")}
                    onMoveDown={() => onMoveHandler("expense", ex.id, "down")}
                    onSetPin={() => {
                      onPinHandler("expense", ex.id, !ex.isPinned);
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
                    onMoveUp={() => onMoveHandler("income", inc.id, "up")}
                    onMoveDown={() => onMoveHandler("income", inc.id, "down")}
                    onSetPin={() => {
                      onPinHandler("income", inc.id, !inc.isPinned);
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
          onClickClearAll={onDeleteAllUnpinnedHandler}
        />
      </section>
    </Layout>
  );
};

export default SimpleBudget;
