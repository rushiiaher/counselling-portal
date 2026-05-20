import React from "react";
import PageContainer from "@/components/shared/PageContainer";
import { requireAuth } from "@/lib/auth/session";
import { Bell } from "lucide-react";
import NotificationCard from "@/components/notifications/NotificationCard";

import prisma from "@/lib/prisma";

export default async function NotificationsPage() {
  const session = await requireAuth();

  const notifications = await prisma.notification.findMany({
    where: { userId: session.id },
    orderBy: { createdAt: "desc" },
    take: 50
  });

  return (
    <PageContainer>
      <div className="max-w-3xl mx-auto py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-slate-800">Notifications</h1>
        </div>

        {notifications.length === 0 ? (
          <div className="bg-white border border-slate-100 rounded-xl p-12 text-center shadow-sm">
            <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Bell className="w-8 h-8 text-slate-300" />
            </div>
            <h3 className="text-lg font-medium text-slate-700">You're all caught up!</h3>
            <p className="text-slate-500 mt-1">No new notifications.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {notifications.map(notif => (
              <NotificationCard key={notif.id} notification={notif} />
            ))}
          </div>
        )}
      </div>
    </PageContainer>
  );
}
