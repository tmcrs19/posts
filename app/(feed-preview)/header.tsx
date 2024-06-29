import Link from "next/link";
import Image from "next/image";
import { FaInfoCircle } from "react-icons/fa";

const Header = () => {
  return (
    <header className="bg-gray-200 fixed bottom-0 md:top-0 md:left-0 md:bottom-auto w-full md:w-1/4 lg:w-1/5 flex-shrink-0">
      <div className="p-2 flex md:flex-col h-full md:h-screen justify-between md:justify-start">
        <nav className="flex-1 flex md:flex-col items-center md:items-start lg:ml-auto lg:pr-4 space-x-4 md:space-x-0 md:space-y-4">
          <Link
            href="/"
            className="w-full cursor-pointer p-2 flex justify-center md:justify-start"
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
            className="w-full cursor-pointer p-2 flex justify-center md:justify-start items-center"
          >
            <FaInfoCircle className="text-xl md:text-2xl text-gray-400" />
            <span className="md:inline-block lg:ml-2">Jobs search</span>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
