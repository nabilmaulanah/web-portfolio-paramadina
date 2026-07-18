import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="shadow-md bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-5 py-4 flex justify-between items-center">

        <h1 className="text-xl md:text-2xl font-bold text-blue-700">
          Paramadina Portfolio
        </h1>

        <ul className="hidden md:flex gap-8 text-gray-700">

          <li>
            <a href="#home" className="hover:text-blue-700 cursor-pointer">
              Home
            </a>
          </li>

          <li>
            <a href="#about" className="hover:text-blue-700 cursor-pointer">
              About
            </a>
          </li>

          <li>
            <a href="#feature" className="hover:text-blue-700 cursor-pointer">
              Feature
            </a>
          </li>

          <li>
            <a href="#contact" className="hover:text-blue-700 cursor-pointer">
              Contact
            </a>
          </li>

        </ul>

        <Link href="/login">
          <button className="bg-blue-700 hover:bg-blue-800 text-white px-5 py-2 rounded-lg transition">
            Login
          </button>
        </Link>

      </div>
    </nav>
  );
} 