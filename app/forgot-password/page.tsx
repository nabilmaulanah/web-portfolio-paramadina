import Link from "next/link";

export default function ForgotPasswordPage() {
  return (
    <main className="min-h-screen bg-gray-100 flex justify-center items-center px-5">

      <div className="bg-white shadow-xl rounded-3xl p-10 w-full max-w-md">

        <h1 className="text-3xl font-bold text-blue-700 text-center">
          Lupa Password
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-8">
          Masukkan email yang terdaftar.
        </p>

        <input
          type="email"
          placeholder="Email"
          className="w-full border rounded-xl p-3"
        />

        <button
          className="w-full bg-blue-700 text-white py-3 rounded-xl mt-5 hover:bg-blue-800"
        >
          Kirim Link Reset
        </button>

        <Link
          href="/login"
          className="block text-center mt-6 text-blue-700 hover:underline"
        >
          Kembali ke Login
        </Link>

      </div>

    </main>
  );
}