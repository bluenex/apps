import { useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { v4 as uuidv4 } from "uuid";
import AddButton from "../src/components/AddButton";
import AddingWindow from "../src/components/AddingWindow";
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

const defaultData: DataSchema = {
  expense: [],
  income: [],
};

const Home = () => {
  const [data, setData] = useLocalStorage("simple-budget-data", defaultData);
  const [addingType, setAddingType] = useState<ItemTypeWithHidden>("hidden");

  return (
    <Layout>
      <main>No record!</main>

      <section id="render">
        <p className="whitespace-pre break-all">
          {JSON.stringify(data, undefined, 2)}
        </p>
      </section>

      <section id="control">
        <AddingWindow
          addingType={addingType}
          onSave={(currentType, amount, note) => {
            setData((p) => ({
              ...p,
              [currentType]: [
                ...p[currentType],
                { id: uuidv4(), amount, note, isPinned: false },
              ],
            }));
          }}
          onClose={() => setAddingType("hidden")}
        />

        <AddButton onClick={(x) => setAddingType(x)} />
      </section>
    </Layout>
  );
};

export default Home;
