import React from "react";
import PageContainer from "@/components/shared/PageContainer";
import { verifyAdminAccess } from "@/services/admin.service";
import { Settings, Shield, Bell, Database, Globe } from "lucide-react";

export default async function AdminSettingsPage() {
  await verifyAdminAccess("SUPER_ADMIN");

  return (
    <PageContainer>
      <div className="mb-8 border-b border-slate-200 pb-4">
        <h1 className="text-3xl font-extrabold text-slate-800">System Settings</h1>
        <p className="text-slate-500 text-sm mt-2 flex items-center gap-1.5 font-medium">
          <Settings className="w-4 h-4 text-slate-500" /> Super Admin access required.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-5 h-5 text-purple-500" />
            <h2 className="font-extrabold text-slate-800">Security</h2>
          </div>
          <div className="space-y-3 text-sm text-slate-600">
            <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
              <span>Session Duration</span>
              <span className="font-bold text-slate-800">24 hours</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
              <span>Rate Limit (API)</span>
              <span className="font-bold text-slate-800">30 req/min</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
              <span>Rate Limit (Pages)</span>
              <span className="font-bold text-slate-800">60 req/min</span>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <Bell className="w-5 h-5 text-amber-500" />
            <h2 className="font-extrabold text-slate-800">Notifications</h2>
          </div>
          <div className="space-y-3 text-sm text-slate-600">
            <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
              <span>Email Provider</span>
              <span className="font-bold text-emerald-700">Resend ✓</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
              <span>Crisis Alerts</span>
              <span className="font-bold text-emerald-700">Enabled</span>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <Database className="w-5 h-5 text-blue-500" />
            <h2 className="font-extrabold text-slate-800">Database</h2>
          </div>
          <div className="space-y-3 text-sm text-slate-600">
            <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
              <span>Provider</span>
              <span className="font-bold text-slate-800">Supabase PostgreSQL</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
              <span>ORM</span>
              <span className="font-bold text-slate-800">Prisma v5</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
              <span>Cache</span>
              <span className="font-bold text-emerald-700">Upstash Redis ✓</span>
            </div>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
          <div className="flex items-center gap-3 mb-4">
            <Globe className="w-5 h-5 text-teal-500" />
            <h2 className="font-extrabold text-slate-800">Localisation</h2>
          </div>
          <div className="space-y-3 text-sm text-slate-600">
            <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
              <span>Default Language</span>
              <span className="font-bold text-slate-800">English (en)</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
              <span>Supported</span>
              <span className="font-bold text-slate-800">en, ur</span>
            </div>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
