import { useEffect, useState } from "react";
import api from "../../pages/services/api";

export default function NotificationBell({ refreshKey }) {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const unreadCount = notifications.filter(n => !n.is_read).length;

  const fetchNotifications = async () => {
    try {
      const res = await api.get("/notifications");
      setNotifications(res.data);
    } catch (err) {
      console.error("Fetch notifications failed", err);
    }
  };

  // 🔄 Fetch only on login / refreshKey change
  useEffect(() => {
    fetchNotifications();
  }, [refreshKey]);

  // ✅ MARK AS READ (UI FIRST, API SECOND)
  const markRead = async (id) => {
    // 🔥 IMMEDIATE UI UPDATE
    setNotifications(prev =>
      prev.map(n =>
        n.id === id ? { ...n, is_read: true } : n
      )
    );

    // 🔕 backend update
    try {
      await api.put(`/notifications/${id}/read`);
    } catch (err) {
      console.error("Mark read failed", err);
    }
  };

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} className="relative">
        🔔
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-72 bg-white shadow-lg rounded p-2 z-50">
          {notifications.length === 0 && (
            <p className="text-sm text-gray-500 text-center">
              No notifications
            </p>
          )}

          {notifications.map(n => (
            <div
              key={n.id}
              className={`p-2 mb-1 rounded cursor-pointer ${
                n.is_read ? "bg-gray-100" : "bg-blue-50"
              }`}
              onClick={() => markRead(n.id)}
            >
              <p className="font-semibold text-sm">{n.title}</p>
              <p className="text-xs text-gray-600">{n.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
