"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DashboardNavbar() {
  const router = useRouter();

  const [open, setOpen] = useState(false);

  const [user, setUser] = useState<{
    id: number;
    nama: string;
    email: string;
  } | null>(null);

  useEffect(() => {
    const data = localStorage.getItem("user");

    if (data) {
      setUser(JSON.parse(data));
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("user");
    router.push("/");
  };

  const menus = [
    {
      name: "Profile",
      href: "#hero",
    },
    {
      name: "Project",
      href: "#project",
    },
    {
      name: "Skill",
      href: "#skill",
    },
    {
      name: "Certificate",
      href: "#certificate",
    },
    {
      name: "Experience",
      href: "#experience",
    },
    {
      name: "Manage Portfolio",
      href: "#PortofolioManager",
    },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        <Link
          href="/dashboard"
          className="text-2xl font-bold text-blue-700"
        >
          Paramadina Portfolio
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {menus.map((menu) => (
            <a
              key={menu.name}
              href={menu.href}
              className="hover:text-blue-700 transition font-medium"
            >
              {menu.name}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-5">
          <span className="font-semibold">
            Halo... {user?.nama}
          </span>

          <button
            onClick={logout}
            className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl"
          >
            Logout
          </button>
        </div>

        <button
          className="md:hidden"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t">
          {menus.map((menu) => (
            <a
              key={menu.name}
              href={menu.href}
              className="block px-6 py-4 hover:bg-gray-100"
            >
              {menu.name}
            </a>
          ))}

          <div className="px-6 py-3 font-semibold">
            Halo 👋 {user?.nama}
          </div>

          <button
            onClick={logout}
            className="w-full text-left px-6 py-4 text-red-600 hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}