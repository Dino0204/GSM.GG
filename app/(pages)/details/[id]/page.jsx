"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import Champcard from "@/app/components/champcard";
import axios from "axios";

export default function Details() {
  const pathname = usePathname();
  const id = useMemo(() => pathname?.split("/")[2] || null, [pathname]);
  const [championSkins, setChampionSkins] = useState([]);

  useEffect(() => {
    if (!id) return;

    const fetchChampionSkins = async () => {
      try {
        const response = await axios.get(
          `http://ddragon.leagueoflegends.com/cdn/13.19.1/data/ko_KR/champion/${id}.json`
        );

        // 필요한 데이터 추출 및 가공
        const skins = response.data.data[id]?.skins.map((skin) => ({
          num: skin.num,
          name: skin.name,
          image: `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${id}_${skin.num}.jpg`,
        }));

        setChampionSkins(skins);
      } catch (error) {
        console.error(
          "챔피언 데이터를 가져오는 데 오류가 발생했습니다:",
          error
        );
      }
    };

    fetchChampionSkins();
  }, [id]);

  return (
    <div className="flex justify-center items-center p-2">
      <div className="flex flex-wrap justify-center items-center gap-2">
        {championSkins.map((skin) => (
          <Champcard
            key={skin.num}
            splashImage={skin.image}
            name={skin.name == "default" ? "기본 스킨" : skin.name}
            alt={skin.name}
          />
        ))}
      </div>
    </div>
  );
}
