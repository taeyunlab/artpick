# ArtPick Android (담당: 유민)

Kotlin 기반의 초경량 ARTPICK WebView 앱 껍데기입니다.

## 📌 구조
- **언어**: Kotlin
- **핵심 컴포넌트**: `WebView` + `NativeBridge` (`@JavascriptInterface`)
- **타깃 URL**: `https://app.artpick.kr` (실시간 터널: `https://artpick-web.loca.lt`)

## 🚀 실행 방법
1. Android Studio를 실행합니다.
2. `Open`을 누르고 `c:\Artpick\artpick-android` 폴더를 선택합니다.
3. 에뮬레이터 또는 실제 갤럭시 기기 연결 후 `Run (Shift + F10)`을 누르면 즉시 웹뷰가 구동됩니다.

## 🔗 Native Bridge 연동
- Web에서 `window.Android.postMessage(...)` 호출 시 `MainActivity.kt`의 `NativeBridge` 클래스가 이벤트를 가로채 네이티브 카메라, 캡처, 공유 등을 실행합니다.
- 네이티브에서 Web으로 결과 전달: `webView.evaluateJavascript(...)`
