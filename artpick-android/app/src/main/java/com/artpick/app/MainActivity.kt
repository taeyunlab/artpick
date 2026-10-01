package com.artpick.app

import android.annotation.SuppressLint
import android.content.Intent
import android.os.Bundle
import android.webkit.JavascriptInterface
import android.webkit.WebView
import android.webkit.WebViewClient
import android.widget.Toast
import androidx.activity.ComponentActivity
import org.json.JSONObject

class MainActivity : ComponentActivity() {

    private lateinit var webView: WebView
    // 배포된 ARTPICK 웹 URL (프로덕션: https://app.artpick.kr / 실시간터널: https://artpick-web.loca.lt)
    private val targetUrl = "https://artpick-web.loca.lt"

    @SuppressLint("SetJavaScriptEnabled")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        webView = WebView(this).apply {
            settings.javaScriptEnabled = true
            settings.domStorageEnabled = true
            webViewClient = WebViewClient()
            addJavascriptInterface(NativeBridge(), "Android")
            loadUrl(targetUrl)
        }

        setContentView(webView)
    }

    inner class NativeBridge {
        @JavascriptInterface
        fun postMessage(data: String) {
            println("WEB → ANDROID: $data")
            runOnUiThread {
                try {
                    val json = JSONObject(data)
                    when (json.optString("type")) {
                        "OPEN_CAMERA" -> {
                            Toast.makeText(this@MainActivity, "📷 네이티브 카메라 실행", Toast.LENGTH_SHORT).show()
                            sendToWeb("CAMERA_SUCCESS", "camera_captured.jpg")
                        }
                        "CAPTURE_SCREEN" -> {
                            Toast.makeText(this@MainActivity, "🖼️ 화면 캡처 완료", Toast.LENGTH_SHORT).show()
                            sendToWeb("CAPTURE_SUCCESS", "screen_captured.png")
                        }
                        "SHARE_ARTWORK" -> {
                            val payload = json.optJSONObject("payload")
                            val shareIntent = Intent(Intent.ACTION_SEND).apply {
                                type = "text/plain"
                                putExtra(Intent.EXTRA_SUBJECT, payload?.optString("title"))
                                putExtra(Intent.EXTRA_TEXT, payload?.optString("url"))
                            }
                            startActivity(Intent.createChooser(shareIntent, "작품 공유하기"))
                        }
                    }
                } catch (e: Exception) {
                    e.printStackTrace()
                }
            }
        }
    }

    private fun sendToWeb(type: String, data: String) {
        val script = "window.onNativeMessage && window.onNativeMessage({ type: '$type', success: true, data: '$data' });"
        webView.evaluateJavascript(script, null)
    }

    override fun onBackPressed() {
        if (webView.canGoBack()) {
            webView.goBack()
        } else {
            super.onBackPressed()
        }
    }
}
