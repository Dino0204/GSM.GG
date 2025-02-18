import Image from "next/image";
import Gamecard from "./components/gamecard";
import Search from "./components/search";

export default function Home() {
  return (
    <div className="flex justify-center items-center flex-col">
      <Search />
      <section className="flex p-5 gap-4">
        <Gamecard />
      </section>
    </div>
  );
}
