"use client";

import React, { useState } from "react";
import { format } from "date-fns";
import { Calendar, AlertCircle, Info } from "lucide-react";
import { markReadAction } from "@/app/actions/notification.actions";
import { useRouter } from "next/navigation";

interface Props {
  notification: any;
}

export default function NotificationCard({ notification }: Props) {
  const [isRead, setIsRead] = useState(notification.isRead);
  const router = useRouter();

  const getIcon = () => {
    switch (notification.type) {
      case "APPOINTMENT_BOOKED": return <Calendar className="w-5 h-5 text-blue-500" />;
      case "CRISIS_ALERT": return <AlertCircle className="w-5 h-5 text-rose-500" />;
      default: return <Info className="w-5 h-5 text-slate-500" />;
    }
  };

  const handleMarkRead = async () => {
    if (isRead) return;
    setIsRead(true);
    await markReadAction(notification.id);
    router.refresh();
  };

  return (
    <div 
      className={`p-5 rounded-xl border transition flex gap-4 cursor-pointer ${isRead ? 'bg-white border-slate-100' : 'bg-blue-50/50 border-blue-100 shadow-sm'}`}
      onClick={handleMarkRead}
    >
      <div className="mt-1">
        {getIcon()}
      </div>
      <div className="flex-1">
        <h4 className={`text-sm mb-1 ${isRead ? 'font-medium text-slate-700' : 'font-bold text-slate-900'}`}>
          {notification.title}
        </h4>
        <p className="text-sm text-slate-600 mb-2">{notification.body}</p>
        <span className="text-xs text-slate-400">
          {format(new Date(notification.createdAt), "MMM d, yyyy 'at' h:mm a")}
        </span>
      </div>
      {!isRead && (
        <button 
          onClick={(e) => { e.stopPropagation(); handleMarkRead(); }}
          className="self-center text-blue-600 hover:text-blue-800 text-xs font-medium"
        >
          Mark as read
        </button>
      )}
    </div>
  );
}
