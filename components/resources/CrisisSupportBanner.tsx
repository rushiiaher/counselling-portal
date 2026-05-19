import React from "react";
import { Phone, AlertTriangle } from "lucide-react";

export default function CrisisSupportBanner() {
  return (
    <div className="bg-rose-50 border border-rose-100 rounded-xl p-5 my-8 flex flex-col md:flex-row gap-5 items-start md:items-center">
      <div className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center shrink-0">
        <AlertTriangle className="w-6 h-6 text-rose-600" />
      </div>
      <div className="flex-1">
        <h3 className="font-bold text-rose-900 text-lg mb-1">Need immediate help?</h3>
        <p className="text-rose-700 text-sm">
          You are not alone. Free, confidential support is available 24/7. Please reach out to emergency services or use our anonymous crisis chat.
        </p>
      </div>
      <div className="flex flex-col gap-2 shrink-0 w-full md:w-auto">
        <a href="tel:112" className="bg-rose-600 text-white px-5 py-2 rounded-lg font-medium shadow-sm hover:bg-rose-700 transition flex items-center justify-center gap-2">
          <Phone className="w-4 h-4" />
          Call 112
        </a>
      </div>
    </div>
  );
}
