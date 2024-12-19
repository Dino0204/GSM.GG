"use client";
import { useEffect, useState } from "react";
import championPositions from "../../components/champions_position";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";

import top from "../../../public/top.png";
import jungle from "../../../public/jungle.png";
import mid from "../../../public/mid.png";
import bot from "../../../public/bot.png";
import support from "../../../public/support.png";

export default function Champions() {
  const [champions, setChampions] = useState([]);
  const lanes = {
    Top: top,
    Mid: jungle,
    Bot: mid,
    Jungle: bot,
    Support: support,
  };

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
            lane: championPositions[champ.id],
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

  console.log(championPositions["Aatrox"]);

  return (
    <div className="flex justify-center items-center p-2">
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
            {/* 포지션 */}
            <span className="ml-auto">
              <Image
                src={lanes[champ.lane]}
                alt="lane"
                width={24}
                height={24}
              />
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
