"use client";

import { ContactMessage } from "@/app/admin/messages/page";

interface Props {
  loading: boolean;
  messages: ContactMessage[];
  reload: () => void;
}

export default function MessageTable({
  loading,
  messages,
  reload,
}: Props) {
  const markAsRead = async (id: number) => {
    try {
      const res = await fetch(`/api/admin/messages/${id}`, {
        method: "PATCH",
      });

      const data = await res.json();

      if (data.success) {
        reload();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Gagal mengubah status.");
    }
  };

  const deleteMessage = async (id: number) => {
    const confirmDelete = confirm(
      "Apakah Anda yakin ingin menghapus pesan ini?"
    );

    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/admin/messages/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.success) {
        reload();
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Gagal menghapus pesan.");
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow p-10 text-center">
        Loading...
      </div>
    );
  }

  if (messages.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow p-10 text-center">
        Belum ada pesan.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow overflow-x-auto">

      <table className="w-full">

        <thead className="bg-blue-700 text-white">

          <tr>
            <th className="p-4 text-left">Nama</th>
            <th className="p-4 text-left">Email</th>
            <th className="p-4 text-left">Pesan</th>
            <th className="p-4 text-center">Status</th>
            <th className="p-4 text-center">Tanggal</th>
            <th className="p-4 text-center">Aksi</th>
          </tr>

        </thead>

        <tbody>

          {messages.map((item) => (

            <tr
              key={item.id}
              className="border-b hover:bg-gray-50"
            >

              <td className="p-4 font-medium">
                {item.name}
              </td>

              <td className="p-4">
                {item.email}
              </td>

              <td className="p-4 max-w-sm">
                {item.message}
              </td>

              <td className="p-4 text-center">

                {item.isRead ? (

                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
                    Sudah Dibaca
                  </span>

                ) : (

                  <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
                    Belum Dibaca
                  </span>

                )}

              </td>

              <td className="p-4 text-center">
                {new Date(item.createdAt).toLocaleString("id-ID")}
              </td>

              <td className="p-4">

                <div className="flex gap-2 justify-center">

                  {!item.isRead && (

                    <button
                      onClick={() => markAsRead(item.id)}
                      className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded"
                    >
                      Read
                    </button>

                  )}

                  <button
                    onClick={() => deleteMessage(item.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded"
                  >
                    Delete
                  </button>

                </div>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}