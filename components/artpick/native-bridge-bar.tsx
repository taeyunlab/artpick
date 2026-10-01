'use client';

import { useState, useEffect } from 'react';
import { Camera, Share2, Crop, Smartphone, CheckCircle } from 'lucide-react';
import { sendNative, listenNative, NativeResponse } from '@/lib/nativeBridge';

function getInitialPlatform(): string {
  if (typeof window === 'undefined') return 'Web Browser';
  if (window.Android?.postMessage) return 'Android Kotlin WebView';
  if (window.webkit?.messageHandlers?.ArtPick) return 'iOS Swift WKWebView';
  return 'Web Browser';
}

export function NativeBridgeBar() {
  const [lastMessage, setLastMessage] = useState<string | null>(null);
  const [platform] = useState<string>(() => getInitialPlatform());

  useEffect(() => {
    // 네이티브 메시지 수신 등록
    const unregister = listenNative((response: NativeResponse) => {
      setLastMessage(`[수신] ${response.type}: ${JSON.stringify(response.data || '성공')}`);
    });

    return unregister;
  }, []);

  return (
    <div className="bg-[#181816] text-white px-4 py-2 text-xs flex flex-wrap items-center justify-between gap-2 border-b border-white/10">
      <div className="flex items-center gap-2">
        <Smartphone className="size-3.5 text-blue-400" />
        <span className="font-semibold text-white/90">Native Bridge:</span>
        <span className="bg-white/15 px-2 py-0.5 rounded text-[10px] text-emerald-300 font-mono">
          {platform}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => {
            sendNative('OPEN_CAMERA');
            setLastMessage('[송신] OPEN_CAMERA');
          }}
          className="flex items-center gap-1 bg-white/10 hover:bg-white/20 px-2.5 py-1 rounded text-[11px] transition"
        >
          <Camera className="size-3" />
          <span>카메라</span>
        </button>

        <button
          onClick={() => {
            sendNative('CAPTURE_SCREEN');
            setLastMessage('[송신] CAPTURE_SCREEN');
          }}
          className="flex items-center gap-1 bg-white/10 hover:bg-white/20 px-2.5 py-1 rounded text-[11px] transition"
        >
          <Crop className="size-3" />
          <span>화면 캡처</span>
        </button>

        <button
          onClick={() => {
            sendNative('SHARE_ARTWORK', {
              title: 'ARTPICK 신진 예술가 큐레이션',
              url: typeof window !== 'undefined' ? window.location.href : '',
            });
            setLastMessage('[송신] SHARE_ARTWORK');
          }}
          className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-2.5 py-1 rounded text-[11px] font-semibold transition"
        >
          <Share2 className="size-3" />
          <span>공유하기</span>
        </button>
      </div>

      {lastMessage && (
        <div className="w-full text-[11px] text-amber-300 bg-black/40 px-2 py-1 rounded flex items-center gap-1.5 mt-1">
          <CheckCircle className="size-3 shrink-0" />
          <span className="truncate">{lastMessage}</span>
        </div>
      )}
    </div>
  );
}
