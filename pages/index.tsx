import Link from "next/link";
import Layout from "../src/components/Layout";

const Home = () => {
  return (
    <Layout>
      <main className="text-center">
        <ul className="list-inside list-disc text-lg">
          <li>
            <Link href="/simple-budget" passHref>
              <a>Simple Budget</a>
            </Link>
          </li>
        </ul>
      </main>
    </Layout>
  );
};

export default Home;
