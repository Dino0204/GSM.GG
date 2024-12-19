"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";

export default function Champions() {
  const [champions, setChampions] = useState([]);

  useEffect(() => {
    const fetchChampions = async () => {
      try {
        const response = await axios.get(
          "http://ddragon.leagueoflegends.com/cdn/13.19.1/data/ko_KR/champion.json"
        );
        const championsData = Object.values(response.data.data).map(
          (champ) => ({
            name: champ.name,
            id: champ.id,
            key: champ.key,
            title: champ.title,
            profile: `http://ddragon.leagueoflegends.com/cdn/13.19.1/img/champion/${champ.id}.png`,
          })
        );
        console.log(Object.values(response.data.data));
        setChampions(championsData);
      } catch (error) {
        console.error(
          "챔피언 데이터를 가져오는 데 오류가 발생했습니다:",
          error
        );
      }
    };

    fetchChampions();
  }, []);

  return (
    <div className="flex justify-center items-center p-2">
      <ul className="flex flex-col justify-center items-start text-sm w-1/2 gap-2">
        {champions.map((champ) => (
          <li className="flex items-center bg-slate-500 w-full" key={champ.key}>
            <Image
              src={champ.profile}
              alt={`${champ.name} splash`}
              width={32}
              height={32}
            />
            <Link href={`skins/${champ.id}`}>
              <span>{champ.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
