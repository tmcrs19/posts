import React from "react";
import Link from "next/link";
import Image from "next/image";

export function Header() {
  return (
    <header className="bg-gray-200 text-white py-4 px-6 fixed top-0 w-full z-10">
      <div className="container flex items-center justify-between mx-auto">
        <Link href="/">
          <Image
            src="/efg-favicon-300x300.png"
            alt="ESL FACEIT Group Logo"
            width={50}
            height={50}
          />
        </Link>
      </div>
    </header>
  );
}

export default Header;
