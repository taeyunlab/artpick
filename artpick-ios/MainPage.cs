using System.Text.Json;

namespace ArtPick;

public class MainPage : ContentPage
{
    // 배포된 ARTPICK 웹 URL (프로덕션: https://app.artpick.kr / 실시간터널: https://artpick-web.loca.lt)
    private const string TargetUrl = "https://artpick-web.loca.lt";

    private readonly WebView webView = new()
    {
        Source = TargetUrl,
        HorizontalOptions = LayoutOptions.Fill,
        VerticalOptions = LayoutOptions.Fill
    };

    public MainPage()
    {
        Content = webView;

        // Custom URL Scheme (artpick://bridge) 브릿지 감지
        webView.Navigating += async (_, e) =>
        {
            if (e.Url.StartsWith("artpick://bridge"))
            {
                e.Cancel = true;
                await HandleBridgeMessage(e.Url);
            }
        };
    }

    private async Task HandleBridgeMessage(string url)
    {
        try
        {
            var uri = new Uri(url);
            var query = System.Web.HttpUtility.ParseQueryString(uri.Query);
            var dataJson = query["data"];

            if (!string.IsNullOrEmpty(dataJson))
            {
                Console.WriteLine($"[Web -> C# Native]: {dataJson}");
                // 예: 카메라, 캡처 또는 공유 처리
                await SendToWeb("CSHARP_SUCCESS", "Bridge received successfully");
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Bridge error: {ex.Message}");
        }
    }

    private async Task SendToWeb(string type, string data)
    {
        var json = JsonSerializer.Serialize(new { type, success = true, data });
        await webView.EvaluateJavaScriptAsync($"window.onNativeMessage && window.onNativeMessage({json})");
    }
}
