import UIKit
import WebKit

class ViewController: UIViewController, WKScriptMessageHandler, WKNavigationDelegate {

    private var webView: WKWebView!
    // 배포된 ARTPICK 웹 URL (프로덕션: https://app.artpick.kr / 실시간터널: https://artpick-web.loca.lt)
    private let targetUrl = URL(string: "https://artpick-web.loca.lt")!

    override func viewDidLoad() {
        super.viewDidLoad()

        // 1. Web -> iOS 네이티브 브릿지 핸들러 등록
        let contentController = WKUserContentController()
        contentController.add(self, name: "ArtPick")

        let config = WKWebViewConfiguration()
        config.userContentController = contentController
        config.allowsInlineMediaPlayback = true

        // 2. WKWebView 생성 및 화면 가득 채우기
        webView = WKWebView(frame: view.bounds, configuration: config)
        webView.autoresizingMask = [.flexibleWidth, .flexibleHeight]
        webView.navigationDelegate = self
        view.addSubview(webView)

        // 3. 웹 로드
        webView.load(URLRequest(url: targetUrl))
    }

    // 4. JavaScript에서 webkit.messageHandlers.ArtPick.postMessage(...) 수신
    func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
        guard message.name == "ArtPick" else { return }
        print("WEB → IOS: \(message.body)")

        if let jsonString = message.body as? String,
           let data = jsonString.data(using: .utf8),
           let json = try? JSONSerialization.jsonObject(with: data) as? [String: Any],
           let type = json["type"] as? String {

            switch type {
            case "OPEN_CAMERA":
                print("📷 네이티브 카메라 요청")
                sendToWeb(type: "CAMERA_SUCCESS", data: "ios_camera_photo.jpg")
            case "CAPTURE_SCREEN":
                print("🖼️ 화면 캡처 요청")
                sendToWeb(type: "CAPTURE_SUCCESS", data: "ios_screenshot.png")
            case "SHARE_ARTWORK":
                if let payload = json["payload"] as? [String: Any],
                   let shareUrl = payload["url"] as? String {
                    let activityVC = UIActivityViewController(activityItems: [shareUrl], applicationActivities: nil)
                    present(activityVC, animated: true)
                }
            default:
                break
            }
        }
    }

    // 5. iOS -> Web으로 결과 전달
    private func sendToWeb(type: String, data: String) {
        let script = "window.onNativeMessage && window.onNativeMessage({ type: '\(type)', success: true, data: '\(data)' });"
        webView.evaluateJavaScript(script, completionHandler: nil)
    }
}
