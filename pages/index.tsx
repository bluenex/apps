import AddButton from "../src/components/AddButton";
import Layout from "../src/components/Layout";

const Home = () => {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center py-8">
        <h1 className="mb-2 text-2xl font-bold">Next.js + Tailwind CSS</h1>
        <p>Enjoy starting a new project!</p>
      </div>

      <AddButton />
    </Layout>
  );
};

export default Home;
