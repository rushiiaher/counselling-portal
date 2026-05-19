"use client";

import React, { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import { fetchUnreadCountAction } from "@/app/actions/notification.actions";
import Link from "next/link";

export default function NotificationBell() {
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    // Simple polling mechanism using lightweight aggregate count
    const checkNotifications = async () => {
      const res = await fetchUnreadCountAction();
      if (res.success && res.count !== undefined) {
        setUnreadCount(res.count);
      }
    };

    checkNotifications();
    const interval = setInterval(checkNotifications, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <Link href="/notifications" className="relative p-2 text-slate-500 hover:text-slate-800 transition">
      <Bell className="w-5 h-5" />
      {unreadCount > 0 && (
        <span className="absolute top-1 right-1 flex h-3 w-3 items-center justify-center rounded-full bg-rose-500 text-[8px] font-bold text-white ring-2 ring-white">
          {unreadCount > 9 ? "9+" : unreadCount}
        </span>
      )}
    </Link>
  );
}
