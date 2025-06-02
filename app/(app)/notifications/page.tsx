"use client";

import { useEffect, useState } from "react";

interface Notification {
  id: string;
  message: string;
  type: string;
  read: boolean;
  date: string;
  link?: string;
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);

  // For demo purposes, userId is hardcoded; in real app, get from session
  const userId = "current-user-id";

  useEffect(() => {
    async function fetchNotifications() {
      setLoading(true);
      try {
        const res = await fetch(`/api/notifications?userId=${userId}`);
        const data = await res.json();
        setNotifications(data || []);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
      setLoading(false);
    }

    fetchNotifications();
  }, [userId]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Notificaciones</h2>
      {loading ? (
        <p>Cargando notificaciones...</p>
      ) : notifications.length === 0 ? (
        <p>No hay notificaciones.</p>
      ) : (
        <ul className="space-y-2">
          {notifications.map((notification) => (
            <li
              key={notification.id}
              className={`border p-4 rounded shadow ${
                notification.read ? "bg-gray-100" : "bg-white"
              }`}
            >
              <p>{notification.message}</p>
              <p className="text-sm text-gray-500">
                {new Date(notification.date).toLocaleString()}
              </p>
              {notification.link && (
                <a href={notification.link} className="text-blue-600 underline">
                  Ver más
                </a>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
