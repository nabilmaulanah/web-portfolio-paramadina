"use client";

import { useEffect, useState } from "react";
import MessageTable from "@/components/MessageTable";

export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState("");

  const loadMessages = async () => {
    try {
      setLoading(true);

      const res = await fetch("/api/admin/messages");

      const data = await res.json();

      if (data.success) {
        setMessages(data.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const filtered = messages.filter((item) => {
    return (
      item.name.toLowerCase().includes(keyword.toLowerCase()) ||
      item.email.toLowerCase().includes(keyword.toLowerCase())
    );
  });

  const total = messages.length;

  const unread = messages.filter((m) => !m.isRead).length;

  const read = messages.filter((m) => m.isRead).length;

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-3xl font-bold mb-8">
          Inbox Contact
        </h1>

        {/* Statistik */}

        <div className="grid md:grid-cols-3 gap-6 mb-8">

          <div className="bg-white rounded-xl shadow p-6">

            <p className="text-gray-500">
              Total Pesan
            </p>

            <h2 className="text-4xl font-bold mt-2">
              {total}
            </h2>

          </div>

          <div className="bg-yellow-500 text-white rounded-xl shadow p-6">

            <p>
              Belum Dibaca
            </p>

            <h2 className="text-4xl font-bold mt-2">
              {unread}
            </h2>

          </div>

          <div className="bg-green-600 text-white rounded-xl shadow p-6">

            <p>
              Sudah Dibaca
            </p>

            <h2 className="text-4xl font-bold mt-2">
              {read}
            </h2>

          </div>

        </div>

        {/* Search */}

        <div className="mb-6">

          <input
            type="text"
            placeholder="Cari nama atau email..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="w-full md:w-96 p-3 rounded-lg border"
          />

        </div>

        {/* Table */}

        <MessageTable
          loading={loading}
          messages={filtered}
          reload={loadMessages}
        />

      </div>

    </div>
  );
}