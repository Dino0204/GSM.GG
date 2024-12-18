import Image from "next/image";
import Gamecard from "./components/gamecard";
import Search from "./components/search";

export default function Home() {
  return (
    <div className="flex justify-center items-center p-2 flex-col">
      <Search />
      <section className="flex p-5 gap-4">
        <Gamecard />
        <Gamecard />
        <Gamecard />
        <Gamecard />
        <Gamecard />
      </section>
    </div>
  );
}
