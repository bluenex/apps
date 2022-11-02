import { FC, useCallback, useEffect, useState } from "react";
import {
  FiArrowDown,
  FiArrowUp,
  FiEdit,
  FiRepeat,
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
  note: number;
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
}> = ({ itemData, itemType, isMenuVisible, onClick }) => {
  return (
    <>
      <div
        className={twMerge(
          "pointer-events-none h-0 w-full rounded-t bg-black bg-opacity-25 opacity-0 transition-all duration-300",
          "flex justify-evenly text-lg",
          isMenuVisible && "pointer-events-auto h-10 opacity-100",
        )}
      >
        <Button className="grid flex-1 place-content-center">
          <FiArrowUp />
        </Button>
        <Button className="grid flex-1 place-content-center">
          <FiArrowDown />
        </Button>
        <Button className="grid flex-1 place-content-center">
          <FiRepeat />
        </Button>
        <Button className="grid flex-1 place-content-center">
          <FiEdit />
        </Button>
        <Button className="grid flex-1 place-content-center">
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

  const dataUpdater = useCallback(
    (currentType: ItemType, amount: number, note: string) => {
      setPersistedData((p) => {
        const updated = {
          ...p,
          [currentType]: [
            ...p[currentType],
            { id: uuidv4(), amount, note, isPinned: false },
          ],
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

              {data.expense.map((ex) => (
                <ItemRenderer
                  itemType="expense"
                  key={ex.id}
                  itemData={ex}
                  isMenuVisible={menuVisibleId === ex.id}
                  onClick={() => setMenuVisibleId(ex.id)}
                />
              ))}

              <TotalRenderer itemType="expense" amount={getSum(data.expense)} />
            </div>
          )}

          {data.income.length > 0 && (
            <div id="income" className="mb-6">
              <h2 className="mb-2 text-lg font-bold">Income</h2>

              {data.income.map((inc) => (
                <ItemRenderer
                  itemType="income"
                  key={inc.id}
                  itemData={inc}
                  isMenuVisible={menuVisibleId === inc.id}
                  onClick={() =>
                    setMenuVisibleId((p) => (inc.id !== p ? inc.id : undefined))
                  }
                />
              ))}

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
          onSave={dataUpdater}
          onClose={() => setAddingType("hidden")}
        />

        <AddButton onClick={(x) => setAddingType(x)} />
      </section>
    </Layout>
  );
};

export default Home;
