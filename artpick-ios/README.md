# ArtPick iOS (담당: 래현)

Swift + WKWebView 기반의 초경량 ARTPICK iOS 앱 껍데기입니다.

## 📌 구조
- **언어**: Swift (또는 C# .NET MAUI `MainPage.cs`)
- **핵심 컴포넌트**: `WKWebView` + `WKScriptMessageHandler` ("ArtPick")
- **타깃 URL**: `https://app.artpick.kr` (실시간 터널: `https://artpick-web.loca.lt`)

## 🚀 Xcode 설정 및 실행 방법
1. Xcode에서 새 iOS App 프로젝트를 생성합니다.
2. `ViewController.swift`를 본 저장소의 코드로 교체합니다.
3. `Info.plist`에 카메라(`NSCameraUsageDescription`) 및 인터넷 권한을 추가합니다.
4. iPhone 시뮬레이터 또는 실제 iPhone 기기를 연결하고 실행(Cmd + R)하면 동일한 ARTPICK 웹 UI가 풀스크린으로 표시됩니다.

## 🔗 Native Bridge 연동
- Web에서 `window.webkit.messageHandlers.ArtPick.postMessage(...)` 호출 시 `ViewController.swift`의 `userContentController`가 수신하여 카메라/공유/캡처를 네이티브로 실행합니다.
- 네이티브에서 Web으로 결과 전달: `webView.evaluateJavaScript(...)`
