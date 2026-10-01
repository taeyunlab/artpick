/**
 * ARTPICK Native Bridge Adapter
 * 
 * Next.js (Web) <-> Android (Kotlin) / iOS (Swift & C#)
 * 양방향 네이티브 통신 인터페이스
 */

export interface NativeMessage<T = unknown> {
  type: 'OPEN_CAMERA' | 'CAPTURE_SCREEN' | 'SHARE_ARTWORK' | 'HAPTIC_FEEDBACK' | 'HELLO' | (string & {});
  payload?: T;
}

export interface NativeResponse<T = unknown> {
  type: string;
  success: boolean;
  data?: T;
  error?: string;
}

// Global Window 타입 확장
declare global {
  interface Window {
    Android?: {
      postMessage: (message: string) => void;
    };
    webkit?: {
      messageHandlers?: {
        ArtPick?: {
          postMessage: (message: string | object) => void;
        };
      };
    };
    onNativeMessage?: (response: NativeResponse | string) => void;
  }
}

/**
 * Web -> Native 메시지 전송
 */
export function sendNative(type: string, payload: unknown = {}): void {
  const message: NativeMessage = { type, payload };
  const jsonString = JSON.stringify(message);

  if (typeof window === 'undefined') return;

  // 1. Android Kotlin WebView 브릿지
  if (window.Android?.postMessage) {
    console.log('[NativeBridge -> Android]:', message);
    window.Android.postMessage(jsonString);
    return;
  }

  // 2. iOS Swift WKWebView 브릿지
  if (window.webkit?.messageHandlers?.ArtPick?.postMessage) {
    console.log('[NativeBridge -> iOS]:', message);
    window.webkit.messageHandlers.ArtPick.postMessage(jsonString);
    return;
  }

  // 3. Fallback (C# / .NET MAUI or Custom URL Scheme)
  console.log('[NativeBridge -> Fallback Scheme]:', message);
  window.location.href = `artpick://bridge?data=${encodeURIComponent(jsonString)}`;
}

/**
 * Native -> Web 메시지 수신 리스너 등록
 */
export function listenNative(callback: (data: NativeResponse) => void): () => void {
  if (typeof window === 'undefined') return () => {};

  window.onNativeMessage = (data: NativeResponse | string) => {
    try {
      const parsed: NativeResponse = typeof data === 'string' ? JSON.parse(data) : data;
      console.log('[NativeBridge <- Received]:', parsed);
      callback(parsed);
    } catch (e) {
      console.error('[NativeBridge] Failed to parse native message:', e);
    }
  };

  return () => {
    window.onNativeMessage = undefined;
  };
}

// 편의 헬퍼 함수들
export const native = {
  openCamera: () => sendNative('OPEN_CAMERA'),
  captureScreen: () => sendNative('CAPTURE_SCREEN'),
  shareArtwork: (title: string, url: string) => sendNative('SHARE_ARTWORK', { title, url }),
  triggerHaptic: () => sendNative('HAPTIC_FEEDBACK', { style: 'medium' }),
};
