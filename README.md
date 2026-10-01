# ARTPICK (아트픽) 3-Tier 하이브리드 웹뷰 아키텍처

> **"하나의 웹 서비스로, iOS와 Android에서 동일한 경험을 제공합니다."**

---

## 🏛️ 아키텍처 구조

```
                         ARTPICK ARCHITECTURE

                              태윤
                        ┌──────────────┐
                        │  ArtPick Web │
                        │   Next.js    │
                        └──────┬───────┘
                               │
                        Vercel / Server
                               │
                               ▼
                     https://app.artpick.kr
             (실시간 테스트: https://artpick-web.loca.lt)
                               │
                    ┌──────────┴───────────┐
                    │                      │
                    ▼                      ▼
                  유민                       래현
            ┌───────────────┐       ┌───────────────┐
            │ Android       │       │ iOS           │
            │ Kotlin        │       │ Swift / C#    │
            │ WebView       │       │ WKWebView     │
            └───────┬───────┘       └───────┬───────┘
                    │                       │
                    └──────────┬────────────┘
                               ▼
                   [네이티브 확장 기능 브릿지]
                   Camera / Share / Capture / Push
```

---

## 👥 팀원별 역할 분담 및 프로젝트 구성

| 프로젝트 | 담당 | 핵심 기술 | 역할 및 책임 |
| :--- | :---: | :--- | :--- |
| **`artpick-web`** (루트) | **태윤** | Next.js, TypeScript, Tailwind CSS | **모든 UI 개발**, 작품/작가 큐레이션, 창작 스토리, API 연동, 네이티브 브릿지 어댑터(`lib/nativeBridge.ts`), 배포 호스팅 관리 |
| **`artpick-android`** | **유민** | Android, Kotlin, WebView | **약 30줄 WebView 앱 껍데기**, `@JavascriptInterface` 브릿지 수신, Android 카메라/공유/캡처 권한 관리 |
| **`artpick-ios`** | **래현** | iOS, Swift, WKWebView (or C#) | **약 30줄 WKWebView 앱 껍데기**, `WKScriptMessageHandler` 브릿지 수신, iOS 카메라/공유 권한 관리 |

---

## ⚡ 핵심 개발 규칙 (Golden Rules)

1. **모든 UI는 웹(`Next.js`)에서만 개발/수정합니다.**
   - 웹에서 한 번만 수정하고 배포하면, 갤럭시(Android)와 아이폰(iOS)에서 별도 업데이트/심사 없이 **즉시 동시에 반영**됩니다.
2. **앱은 초경량 웹뷰 껍데기(25~30줄) + 네이티브 기능만 담당합니다.**
   - 카메라 호출, 앨범 사진 선택, 화면 캡처, 시스템 공유하기(`ACTION_SEND` / `UIActivityViewController`), 푸시 알림 등 하드웨어 연동만 네이티브가 담당합니다.

---

## 🔄 Web <-> Native 양방향 통신 흐름

```
[Web: Next.js]                                 [Native: Android / iOS]
      │                                                   │
      │ ─── sendNative("OPEN_CAMERA") ──────────────────> │ 네이티브 카메라 실행
      │                                                   │ 사진 촬영 완료
      │ <── window.onNativeMessage({ success: true }) ─── │ 결과 이미지 전달
      ▼                                                   ▼
```

### 1. Web -> Native 호출 (`lib/nativeBridge.ts`)
```typescript
import { sendNative } from '@/lib/nativeBridge';

// 카메라 열기
sendNative('OPEN_CAMERA');

// 화면 캡처
sendNative('CAPTURE_SCREEN');

// 작품 공유하기
sendNative('SHARE_ARTWORK', {
  title: '푸른 하루 - 김서영 작가',
  url: window.location.href,
});
```

### 2. Android Kotlin 수신 및 응답 (`MainActivity.kt`)
```kotlin
@JavascriptInterface
fun postMessage(data: String) {
    // Web -> Android 이벤트 처리 (카메라, 공유, 캡처 등)
}

// Android -> Web 응답
webView.evaluateJavascript("window.onNativeMessage({ type: 'SUCCESS' })", null)
```

### 3. iOS Swift 수신 및 응답 (`ViewController.swift`)
```swift
func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
    // Web -> iOS 이벤트 처리
}

// iOS -> Web 응답
webView.evaluateJavaScript("window.onNativeMessage({ type: 'SUCCESS' })", completionHandler: nil)
```

---

## 🚀 빠른 시작 및 로컬 테스트

### 1. 웹 서버 실행 (태윤)
```bash
npm run dev
# 로컬: http://localhost:3000
```

### 2. 안드로이드 실행 (유민)
Android Studio에서 `artpick-android/` 폴더를 열고 `Run`을 누릅니다.

### 3. iOS 실행 (래현)
Xcode에서 `artpick-ios/ViewController.swift`를 연결하고 `Run (Cmd + R)`을 누릅니다.
