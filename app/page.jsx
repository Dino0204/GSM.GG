import Image from "next/image";
import Gamecard from "./components/gamecard";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
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
