"use client";
import { useEffect, useState } from "react";
import axios from "axios";

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
    <div className="text-white font-bold text-sm">
      <h1>챔피언 목록</h1>
      <ul>
        {champions.map((champ) => (
          <li key={champ.id}>
            {champ.name} (ID: {champ.id})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Champions;
