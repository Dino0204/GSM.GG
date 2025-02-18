"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Matchcard from "@/app/components/matchcard";

export default function Profile() {
  const gameName = "푹우린공룡탕을안먹으면못나가는방";
  const tagLine = "dino";
  const [profileIconId, setProfileIconId] = useState();
  const [summonerLevel, setSummonerLevel] = useState();
  const [summonerTier, setSummonerTier] = useState();
  const [summonerRank, setSummonerRank] = useState();
  const [summonerLP, setSummonerLP] = useState();
  const [matches, setMatches] = useState([]);

  const fetchSummonerData = async () => {
    try {
      // 닉네임, 태그로 puuid 얻기
      const accountResponse = await axios.get(
        `https://asia.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}?api_key=${process.env.NEXT_PUBLIC_RIOT_API}`
      );

      const puuid = accountResponse.data.puuid;

      // 소환사 상세정보 얻기
      const summonerResponse = await axios.get(
        `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}?api_key=${process.env.NEXT_PUBLIC_RIOT_API}`
      );

      setProfileIconId(summonerResponse.data.profileIconId);
      setSummonerLevel(summonerResponse.data.summonerLevel);
      const id = summonerResponse.data.id;

      // 소환사 티어 얻기
      const summonerTier = await axios.get(
        `https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/${id}?api_key=${process.env.NEXT_PUBLIC_RIOT_API}`
      );
      setSummonerTier(summonerTier.data[0].tier);
      setSummonerRank(summonerTier.data[0].rank);
      setSummonerLP(summonerTier.data[0].leaguePoints);

      // 소환사 매치 아이디 얻기
      const matchId = await axios.get(
        `https://asia.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=20&api_key=${process.env.NEXT_PUBLIC_RIOT_API}`
      );
      setMatches(matchId.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSummonerData();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center gap-2">
      <div className="bg-white w-[750px] h-[240px] rounded-[30px] text-black flex overflow-hidden p-5 gap-4">
        <header className="border-[5px] border-[#3A8BFE] w-[200px] h-[200px] rounded-[15px] overflow-hidden relative">
          <img
            alt="profile"
            className="w-full h-full absolute"
            src={`https://ddragon.leagueoflegends.com/cdn/15.3.1/img/profileicon/${profileIconId}.png`}
          />
          <p className="absolute bottom-1 left-1/2 -translate-x-1/2 text-white bg-slate-950 px-2 rounded-xl">
            {summonerLevel}
          </p>
        </header>
        <main className="flex flex-col justify-around">
          <header className="flex gap-2">
            <h1 className="text-2xl font-bold">{gameName}</h1>
            <h2 className="text-2xl font-semibold text-gray-400">#{tagLine}</h2>
          </header>
          <footer className="flex items-center gap-2">
            <div className="w-20 h-20 bg-slate-800 rounded-full flex overflow-hidden items-center justify-center border-4 border-black">
              <img src={`${summonerTier}.png`} />
            </div>
            <p className="font-extrabold text-lg">
              {summonerTier} {summonerRank} - {summonerLP}LP
            </p>
          </footer>
        </main>
      </div>
      {matches.map((match, index) => (
        <Matchcard
          key={match}
          id={match}
          index={index}
          myPuuid={`UG7N5mRoWAITdQAHcSux5rwufHL9_-fNq43ProGZPH9cz3DOMxBgod9-ydA4I-zZePI8l4Dfkn-V5Q`}
        />
      ))}
    </div>
  );
}
