import { useState } from "react";
import AddButton from "../src/components/AddButton";
import AddingWindow from "../src/components/AddingWindow";
import Layout from "../src/components/Layout";

type ItemType = "income" | "expense";
export type AddingWindowType = ItemType | "hidden";

const Home = () => {
  const [addingType, setAddingType] = useState<AddingWindowType>("hidden");

  return (
    <Layout>
      <main>No record!</main>

      <AddingWindow
        type={addingType}
        onSave={() => null}
        onClose={() => setAddingType("hidden")}
      />

      <AddButton onClick={(x) => setAddingType(x)} />
    </Layout>
  );
};

export default Home;
