"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Champcard from "@/app/components/champcard";

function Champions() {
  const [champions, setChampions] = useState([]);

  useEffect(() => {
    const fetchChampions = async () => {
      try {
        const response = await axios.get(
          "http://ddragon.leagueoflegends.com/cdn/13.19.1/data/ko_KR/champion.json"
        );
        const championsData = Object.values(response.data.data).map(
          (champ) => ({
            name: champ.id,
            id: champ.key,
            splashImage: `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champ.id}_0.jpg`, // 기본 스킨의 스플래시 이미지 URL
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
    <div className="flex justify-center items-center p-2">
      <div className="flex flex-wrap justify-center items-center text-white font-bold text-sm w-1/2 gap-2">
        {champions.map((champ) => (
          <Champcard
            key={champ.id}
            imgHref={champ.splashImage}
            desc={`${champ.name} splash`}
            champ={champ.name}
          />
        ))}
      </div>
    </div>
  );
}

export default Champions;
