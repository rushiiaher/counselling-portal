"use client";

import React, { useEffect, useRef } from "react";

interface VideoRoomProps {
  roomName: string;
  userName: string;
}

export default function VideoRoom({ roomName, userName }: VideoRoomProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Basic Jitsi meet iframe embed for MVP
    // A production app would load the Jitsi Meet External API script for granular control
    
    if (!containerRef.current) return;
    
    const domain = "meet.jit.si";
    const iframe = document.createElement("iframe");
    
    // Pass userDisplayName directly via hash config to pre-fill Jitsi name
    iframe.src = `https://${domain}/${roomName}#userInfo.displayName="${encodeURIComponent(userName)}"`;
    iframe.allow = "camera; microphone; fullscreen; display-capture";
    iframe.style.width = "100%";
    iframe.style.height = "100%";
    iframe.style.border = "none";
    iframe.style.borderRadius = "0.75rem";
    
    containerRef.current.appendChild(iframe);

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, [roomName, userName]);

  return (
    <div className="w-full aspect-video bg-slate-900 rounded-xl overflow-hidden shadow-lg border border-slate-800 relative group">
      <div className="absolute top-4 left-4 z-10 bg-black/50 text-white px-3 py-1 rounded-full text-xs font-medium opacity-0 group-hover:opacity-100 transition">
        Secure Room: {roomName.substring(0, 15)}...
      </div>
      <div ref={containerRef} className="w-full h-full" />
    </div>
  );
}
