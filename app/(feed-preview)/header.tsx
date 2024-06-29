// components/Header.tsx

import Link from "next/link";
import Image from "next/image";
import { FaInfoCircle, FaBell } from "react-icons/fa";

const Header = () => {
  return (
    <header className="bg-gray-200 fixed bottom-0 md:top-0 md:left-0 md:bottom-auto w-full md:w-24 lg:w-48 flex-shrink-0">
      <div className="p-2 flex md:flex-col h-full md:h-screen justify-between md:justify-start">
        {/* Navigation links including Logo */}
        <nav className="flex-1 flex md:flex-col items-center md:items-center lg:items-start justify-center md:justify-start space-x-4 md:space-x-0 md:space-y-4">
          <Link
            href="/"
            className="w-full cursor-pointer p-2 flex justify-center md:justify-center lg:justify-start"
          >
            <Image
              src="/efg-favicon-300x300.png"
              alt="ESL FACEIT Group Logo"
              width={40}
              height={40}
              priority
            />
          </Link>
          <Link
            href="/jobs"
            className="w-full cursor-pointer p-2 flex justify-center md:justify-center lg:justify-start items-center"
          >
            <FaInfoCircle className="text-xl md:text-2xl text-gray-400" />
            <span className="hidden lg:inline-block lg:ml-2">Jobs</span>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
