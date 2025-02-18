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
          `http://ddragon.leagueoflegends.com/cdn/${process.env.NEXT_PUBLIC_DATA_DRAGON_VERSION}/data/ko_KR/champion.json`
        );
        const championsData = Object.values(response.data.data).map(
          (champ) => ({
            name: champ.name,
            id: champ.id,
            key: champ.key,
            title: champ.title,
            profile: `http://ddragon.leagueoflegends.com/cdn/${process.env.NEXT_PUBLIC_DATA_DRAGON_VERSION}/img/champion/${champ.id}.png`,
          })
        );
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
    <div className="flex justify-center ">
      <ul className="flex flex-col justify-center items-start text-sm w-1/4q gap-2">
        {champions.map((champ, index) => (
          <li
            className="flex items-center bg-gray-700 w-full p-1"
            key={champ.key}
          >
            {/* 번호 */}
            <span className="w-8">{index + 1}</span>
            {/* 챔프 */}
            <Link
              className="flex items-center gap-2"
              href={`details/${champ.id}`}
            >
              <Image
                className="rounded-sm"
                src={champ.profile}
                alt={`${champ.id} splash`}
                width={32}
                height={32}
              />
              <span>{champ.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
