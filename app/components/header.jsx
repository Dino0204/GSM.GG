import React from "react";
import Profile from "../../public/profile.svg";
import Logo from "../../public/logo.svg";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header>
      <section className="flex items-center bg-gray-800 p-2">
        <Link href="/">
          <Image src={Logo} alt="logo" height={32} className="ml-2" />
        </Link>
      </section>
      <section className="flex items-center bg-blue-500 p-2 justify-between text-sm ">
        <div className="flex gap-4 ">
          <Link href="/">홈</Link>
          <Link href="/champions">챔피언 분석</Link>
          <Link href="/gamemodes">게임 모드</Link>
          <Link href="/leaderboards">랭킹</Link>
          <Link href="/stats">통계</Link>
        </div>
        <Link href="/profile" className="flex items-center gap-2">
          마이페이지
          <Image src={Profile} alt="profile" width={24} height={24} />
        </Link>
      </section>
    </header>
  );
}
