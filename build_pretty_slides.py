import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter

WIDTH, HEIGHT = 1920, 1080
BG_COLOR = (247, 246, 242)      # #F7F6F2
DARK_COLOR = (24, 24, 22)       # #181816
BLUE_COLOR = (26, 86, 219)      # #1A56DB
WHITE_COLOR = (255, 255, 255)
GRAY_COLOR = (105, 105, 100)
LIGHT_GRAY = (226, 224, 218)
BLUE_BG = (238, 242, 255)

ASSETS_DIR = r"C:\Artpick\public\assets_extracted"
OUT_DIR = r"C:\Artpick\public\slides"
os.makedirs(OUT_DIR, exist_ok=True)

FONT_REG = r"C:\Windows\Fonts\malgun.ttf"
FONT_BOLD = r"C:\Windows\Fonts\malgunbd.ttf"
FONT_SERIF = r"C:\Windows\Fonts\georgiab.ttf"

def get_font(path, size):
    try:
        return ImageFont.truetype(path, size)
    except Exception:
        return ImageFont.load_default()

f_brand_big = get_font(FONT_SERIF, 68)
f_h1 = get_font(FONT_BOLD, 44)
f_h2 = get_font(FONT_BOLD, 32)
f_h3 = get_font(FONT_BOLD, 22)
f_body = get_font(FONT_REG, 19)
f_body_bold = get_font(FONT_BOLD, 19)
f_small = get_font(FONT_REG, 15)
f_small_bold = get_font(FONT_BOLD, 15)
f_badge = get_font(FONT_BOLD, 13)

def create_shadow_card(width, height, radius=24, fill=WHITE_COLOR, outline=LIGHT_GRAY, shadow_blur=18, shadow_offset=6):
    # Create card with shadow
    pad = shadow_blur * 2
    canvas = Image.new("RGBA", (width + pad * 2, height + pad * 2), (0, 0, 0, 0))
    shadow = Image.new("RGBA", (width, height), (0, 0, 0, 30))
    canvas.paste(shadow, (pad, pad + shadow_offset))
    canvas = canvas.filter(ImageFilter.GaussianBlur(shadow_blur))
    
    # Draw card on top
    card = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    card_draw = ImageDraw.Draw(card)
    card_draw.rounded_rectangle((0, 0, width - 1, height - 1), radius=radius, fill=fill, outline=outline, width=1)
    canvas.paste(card, (pad, pad), card)
    return canvas, pad

def draw_header(draw, category, title, subtitle, page_num):
    draw.text((100, 60), category.upper(), fill=BLUE_COLOR, font=f_small_bold)
    draw.text((100, 90), title, fill=DARK_COLOR, font=f_h1)
    if subtitle:
        draw.text((100, 152), subtitle, fill=GRAY_COLOR, font=f_body)
    
    # Bottom footer line
    draw.line([(100, 1000), (1820, 1000)], fill=LIGHT_GRAY, width=1)
    draw.text((100, 1020), "ARTPICK  |  ARTISTS · ARTWORKS · COMMUNITY · A BRIGHTER TOMORROW", fill=GRAY_COLOR, font=f_small)
    draw.text((1740, 1020), f"0{page_num} / 08", fill=GRAY_COLOR, font=f_small_bold)

# =========================================================================
# SLIDE 1: Cover with Dual Phone Mockup
# =========================================================================
def render_slide_1():
    img = Image.new("RGB", (WIDTH, HEIGHT), BG_COLOR)
    draw = ImageDraw.Draw(img)
    
    # Left Content Container
    draw.rounded_rectangle((100, 180, 370, 225), radius=12, fill=BLUE_BG, outline=None)
    draw.text((120, 193), "ART CURATION PLATFORM", fill=BLUE_COLOR, font=f_badge)
    
    draw.text((100, 255), "ARTPICK", fill=DARK_COLOR, font=f_brand_big)
    draw.text((100, 355), "당신의 취향이\n작품을 만나는 곳", fill=BLUE_COLOR, font=f_h1)
    
    desc = (
        "새로운 작가와 작품을 발견하고,\n"
        "소장하는 즐거움을 시작하는\n"
        "차세대 미술 큐레이션 플랫폼"
    )
    y_d = 480
    for line in desc.split("\n"):
        draw.text((100, y_d), line, fill=GRAY_COLOR, font=f_h2)
        y_d += 46
        
    # Metrics
    metrics = [("1,200+", "등록 작가"), ("8,500+", "등록 작품"), ("12,000+", "예술 애호가")]
    for i, (m_val, m_lbl) in enumerate(metrics):
        x = 100 + i * 260
        draw.rounded_rectangle((x, 680, x + 235, 780), radius=16, fill=WHITE_COLOR, outline=LIGHT_GRAY, width=1)
        draw.text((x + 25, 700), m_val, fill=DARK_COLOR, font=f_h2)
        draw.text((x + 25, 742), m_lbl, fill=GRAY_COLOR, font=f_small_bold)
        
    draw.text((100, 840), "2026.09  |  ARTPICK Official Launch Deck", fill=GRAY_COLOR, font=f_small_bold)
    
    # Right: Paste Both Phones Mockup with realistic framing
    phones_path = os.path.join(ASSETS_DIR, "mockup_both_phones.png")
    if os.path.exists(phones_path):
        phones_img = Image.open(phones_path).convert("RGBA")
        # Resize to fit right side height ~750
        ratio = 730 / phones_img.height
        new_w = int(phones_img.width * ratio)
        phones_resized = phones_img.resize((new_w, 730), Image.Resampling.LANCZOS)
        
        # Add subtle shadow
        shadow_w, shadow_h = new_w + 60, 730 + 60
        s_canvas = Image.new("RGBA", (shadow_w, shadow_h), (0, 0, 0, 0))
        s_box = Image.new("RGBA", (new_w - 20, 710), (0, 0, 0, 35))
        s_canvas.paste(s_box, (40, 45))
        s_canvas = s_canvas.filter(ImageFilter.GaussianBlur(24))
        
        img.paste(s_canvas, (1000 - 30, 160 - 30), s_canvas)
        img.paste(phones_resized, (1000, 160), phones_resized)
        
    path = os.path.join(OUT_DIR, "slide_1.png")
    img.save(path)
    return path

# =========================================================================
# SLIDE 2: Background & Problem with Gallery Visual
# =========================================================================
def render_slide_2():
    img = Image.new("RGB", (WIDTH, HEIGHT), BG_COLOR)
    draw = ImageDraw.Draw(img)
    draw_header(draw, "Background & Problem", "기존 미술 시장의 한계와 ARTPICK의 출발점", "누구나 미술을 쉽게 발견하고 소장할 수 있도록 문턱을 낮춥니다.", 2)
    
    # Left 3 Problem Cards
    cards = [
        ("01. 높은 진입 장벽", "정보 비대칭성과 폐쇄적 시장", "갤러리와 옥션 중심의 오프라인 유통으로 가격이 불투명하며,\n신규 입문 컬렉터의 진입 문턱이 매우 높았습니다."),
        ("02. 작가의 노출 기회 부족", "유망 신진 아티스트의 고립", "매년 수천 명의 작가가 배출되지만 오프라인 전시 기회는 극소수이며,\n창작 외 홍보와 유통 통로가 턱없이 부족했습니다."),
        ("03. 파편화된 탐색 경험", "개인 맞춤형 큐레이션의 부재", "방대한 미술 작품 속에서 자신의 취향이나 인테리어 무드에 맞는\n원화를 직관적으로 탐색하고 신뢰하며 구매하기 어려웠습니다.")
    ]
    for i, (tag, title, desc) in enumerate(cards):
        y = 230 + i * 240
        draw.rounded_rectangle((100, y, 1020, y + 215), radius=20, fill=WHITE_COLOR, outline=LIGHT_GRAY, width=1)
        draw.text((140, y + 35), tag, fill=BLUE_COLOR, font=f_small_bold)
        draw.text((140, y + 65), title, fill=DARK_COLOR, font=f_h2)
        draw.text((140, y + 120), desc, fill=GRAY_COLOR, font=f_body)
        
    # Right: Gallery Scene Crop with Aesthetic Floating Frame
    hero_path = os.path.join(ASSETS_DIR, "hero_gallery.png")
    if os.path.exists(hero_path):
        hero_img = Image.open(hero_path).convert("RGBA")
        hero_resized = hero_img.resize((700, 600), Image.Resampling.LANCZOS)
        
        # Draw frame container
        draw.rounded_rectangle((1100, 230, 1820, 940), radius=28, fill=WHITE_COLOR, outline=LIGHT_GRAY, width=1)
        # Paste gallery image rounded
        mask = Image.new("L", (680, 520), 0)
        mask_draw = ImageDraw.Draw(mask)
        mask_draw.rounded_rectangle((0, 0, 680, 520), radius=20, fill=255)
        hero_cropped = hero_resized.resize((680, 520), Image.Resampling.LANCZOS)
        img.paste(hero_cropped, (1120, 250), mask)
        
        # Floating Quote Badge
        draw.text((1130, 800), "Good Art Brings People Together", fill=DARK_COLOR, font=f_h3)
        draw.text((1130, 840), "“예술이 사람을 더 가깝게 만듭니다.”", fill=BLUE_COLOR, font=f_body_bold)
        draw.text((1130, 880), "일상 속 예술 소장의 시작, ARTPICK", fill=GRAY_COLOR, font=f_small)

    path = os.path.join(OUT_DIR, "slide_2.png")
    img.save(path)
    return path

# =========================================================================
# SLIDE 3: Brand Identity & Philosophy
# =========================================================================
def render_slide_3():
    img = Image.new("RGB", (WIDTH, HEIGHT), BG_COLOR)
    draw = ImageDraw.Draw(img)
    draw_header(draw, "Brand Philosophy & Identity", "ARTPICK 철학: 예술이 사람을 더 가깝게 만듭니다", "공간을 바꾸는 작은 선택이 새로운 예술의 내일을 만듭니다.", 3)
    
    # Left Hero Dark Card
    draw.rounded_rectangle((100, 230, 920, 930), radius=28, fill=DARK_COLOR, outline=None)
    draw.text((160, 300), "CORE PHILOSOPHY", fill=(96, 165, 250), font=f_small_bold)
    draw.text((160, 360), "“예술을 고르는 당신이,\n새로운 이야기를 만듭니다.”", fill=WHITE_COLOR, font=f_h1)
    
    sub = (
        "Good Art Brings People Together.\n\n"
        "원화를 소장하는 특별한 설렘과\n"
        "작가의 진정성 있는 스토리를 온전히 연결합니다.\n\n"
        "단순한 거래를 넘어, 일상 속에서 예술을 향유하고\n"
        "신진 아티스트와 함께 성장하는 상생 생태계입니다."
    )
    y_s = 530
    for line in sub.split("\n"):
        draw.text((160, y_s), line, fill=(215, 215, 215), font=f_body)
        y_s += 38
        
    draw.text((160, 850), "MORE ARTISTS, A BRIGHTER TOMORROW.", fill=(150, 150, 150), font=f_small_bold)
    
    # Right 4 Value Pillars
    pillars = [
        ("ARTISTS", "투명한 창작 환경", "신진 작가가 온전히 작업에 몰입할 수 있도록 합리적인 수수료와 유통 채널 제공"),
        ("ARTWORKS", "엄선된 예술 컬렉션", "회화·사진·일러스트·조각 등 각 장르별 독창적인 원화 및 한정 에디션 큐레이션"),
        ("COMMUNITY", "작가와 애호가의 연결", "작가 스토리, 작업실 인터뷰, 전시 소식을 통해 컬렉터와 팬덤이 교감하는 커뮤니티"),
        ("A BRIGHTER TOMORROW", "지속 가능한 예술 생태계", "일상의 작은 소장이 모여 한국 미술계의 유망한 미래를 밝히는 선순환 구축")
    ]
    for j, (p_tag, p_tit, p_desc) in enumerate(pillars):
        y = 230 + j * 175
        draw.rounded_rectangle((960, y, 1820, y + 155), radius=20, fill=WHITE_COLOR, outline=LIGHT_GRAY, width=1)
        draw.text((1000, y + 25), p_tag, fill=BLUE_COLOR, font=f_small_bold)
        draw.text((1000, y + 55), p_tit, fill=DARK_COLOR, font=f_h3)
        draw.text((1000, y + 95), p_desc, fill=GRAY_COLOR, font=f_body)
        
    path = os.path.join(OUT_DIR, "slide_3.png")
    img.save(path)
    return path

# =========================================================================
# SLIDE 4: Desktop Web UI Mockup
# =========================================================================
def render_slide_4():
    img = Image.new("RGB", (WIDTH, HEIGHT), BG_COLOR)
    draw = ImageDraw.Draw(img)
    draw_header(draw, "Web Experience", "데스크톱 웹: 미술관 도록 수준의 우아한 큐레이션", "고해상도 비주얼 중심 UI와 직관적인 카테고리 인터랙션을 제공합니다.", 4)
    
    # Left: Desktop Mockup Crop
    desk_path = os.path.join(ASSETS_DIR, "mockup_desktop.png")
    if os.path.exists(desk_path):
        desk_img = Image.open(desk_path).convert("RGBA")
        # Resize to height 700
        ratio = 700 / desk_img.height
        new_w = int(desk_img.width * ratio)
        desk_resized = desk_img.resize((new_w, 700), Image.Resampling.LANCZOS)
        
        # Browser mockup frame
        frame_w = new_w + 20
        frame_h = 700 + 40
        draw.rounded_rectangle((100, 230, 100 + frame_w, 230 + frame_h), radius=20, fill=WHITE_COLOR, outline=LIGHT_GRAY, width=1)
        # Browser dots
        draw.ellipse((120, 245, 130, 255), fill=(248, 113, 113))
        draw.ellipse((138, 245, 148, 255), fill=(251, 191, 36))
        draw.ellipse((156, 245, 166, 255), fill=(52, 211, 153))
        draw.text((190, 242), "https://artpick.kr", fill=GRAY_COLOR, font=f_small)
        
        img.paste(desk_resized, (110, 260), desk_resized)
        
    # Right: Key Features of Web Platform
    features_x = 940
    features = [
        ("01. 미술관 감성의 히어로 섹션", "대형 블루 추상화와 실시간 1,200+ 작가 지표 노출로 신뢰도 확보"),
        ("02. 주목할 만한 작품 갤러리 피드", "회화·사진·일러스트·조각 원클릭 탭과 비대칭 갤러리 레이아웃"),
        ("03. 투명한 작품 스펙 & 진품 보증서", "호수, cm 규격, 기법, 연도, 친필 서명 보증서 안내 및 소장 상담"),
        ("04. 실시간 오픈 작품 등록 스튜디오", "신진 작가가 직접 작품과 작가 노트를 업로드하고 컬렉터와 매칭")
    ]
    for k, (f_tit, f_desc) in enumerate(features):
        y = 230 + k * 175
        draw.rounded_rectangle((features_x, y, 1820, y + 155), radius=20, fill=WHITE_COLOR, outline=LIGHT_GRAY, width=1)
        draw.text((features_x + 40, y + 35), f_tit, fill=BLUE_COLOR, font=f_h3)
        draw.text((features_x + 40, y + 80), f_desc, fill=GRAY_COLOR, font=f_body)

    path = os.path.join(OUT_DIR, "slide_4.png")
    img.save(path)
    return path

# =========================================================================
# SLIDE 5: Mobile App Experience with Real Phones
# =========================================================================
def render_slide_5():
    img = Image.new("RGB", (WIDTH, HEIGHT), BG_COLOR)
    draw = ImageDraw.Draw(img)
    draw_header(draw, "Mobile App Experience", "모바일 앱: 손안에서 만나는 피드 & 작가 허브", "일상 속에서 가볍게 작품을 탐색하고 선호하는 작가를 팔로우합니다.", 5)
    
    # Left: Phone 1 (Feed)
    p1_path = os.path.join(ASSETS_DIR, "mockup_phone1_feed.png")
    if os.path.exists(p1_path):
        p1_img = Image.open(p1_path).convert("RGBA")
        ratio = 680 / p1_img.height
        p1_resized = p1_img.resize((int(p1_img.width * ratio), 680), Image.Resampling.LANCZOS)
        img.paste(p1_resized, (120, 240), p1_resized)
        
    # Phone 1 description card
    draw.rounded_rectangle((460, 240, 930, 920), radius=24, fill=WHITE_COLOR, outline=LIGHT_GRAY, width=1)
    draw.text((500, 290), "화면 1: 모바일 홈 피드 탐색", fill=BLUE_COLOR, font=f_h3)
    draw.text((500, 335), "간결하고 빠른 모바일 아트 브라우징", fill=DARK_COLOR, font=f_h2)
    draw.line([(500, 395), (890, 395)], fill=LIGHT_GRAY, width=1)
    
    p1_items = [
        ("• 통합 퀵 검색바", "작품명, 작가명, 키워드 실시간 서치"),
        ("• 가로 스크롤 필터", "전체, 회화, 사진, 일러스트, 조각 탭"),
        ("• 2열 비주얼 피드", "고화질 작품 썸네일과 투명한 가격 표기"),
        ("• 원터치 찜(하트)", "마이페이지 보관함에 실시간 동기화"),
        ("• 하단 글로벌 5탭", "[홈, 탐색, 등록, 좋아요, 마이]")
    ]
    y1 = 430
    for it, sub in p1_items:
        draw.text((500, y1), it, fill=DARK_COLOR, font=f_body_bold)
        draw.text((500, y1 + 32), sub, fill=GRAY_COLOR, font=f_body)
        y1 += 90
        
    # Right: Phone 2 (Artist Profile)
    p2_path = os.path.join(ASSETS_DIR, "mockup_phone2_artist.png")
    if os.path.exists(p2_path):
        p2_img = Image.open(p2_path).convert("RGBA")
        ratio = 680 / p2_img.height
        p2_resized = p2_img.resize((int(p2_img.width * ratio), 680), Image.Resampling.LANCZOS)
        img.paste(p2_resized, (1000, 240), p2_resized)
        
    # Phone 2 description card
    draw.rounded_rectangle((1340, 240, 1820, 920), radius=24, fill=WHITE_COLOR, outline=LIGHT_GRAY, width=1)
    draw.text((1380, 290), "화면 2: 작가 프로필 허브", fill=BLUE_COLOR, font=f_h3)
    draw.text((1380, 335), "김서영 작가 (@seoyoung_kim)", fill=DARK_COLOR, font=f_h2)
    draw.line([(1380, 395), (1780, 395)], fill=LIGHT_GRAY, width=1)
    
    p2_items = [
        ("• 작가 아이덴티티", "원형 프로필, 배너 커버, 공식 핸들"),
        ("• 팬덤 팔로우 시스템", "원클릭 팔로우 토글 및 팔로워 수 카운트"),
        ("• 핵심 활동 지표", "1.2만 팔로워 · 24 작품 · 3 전시"),
        ("• 감성 작가 노트", "“평범한 것들이 모여 특별한 하루가 됩니다.”"),
        ("• 4대 탭 컬렉션", "[작품(3x3 그리드), 소개, 전시, 소식]")
    ]
    y2 = 430
    for it, sub in p2_items:
        draw.text((1380, y2), it, fill=DARK_COLOR, font=f_body_bold)
        draw.text((1380, y2 + 32), sub, fill=GRAY_COLOR, font=f_body)
        y2 += 90

    path = os.path.join(OUT_DIR, "slide_5.png")
    img.save(path)
    return path

# =========================================================================
# SLIDE 6: Curated Artworks Lineup with Real Artwork Crop
# =========================================================================
def render_slide_6():
    img = Image.new("RGB", (WIDTH, HEIGHT), BG_COLOR)
    draw = ImageDraw.Draw(img)
    draw_header(draw, "Curated Creators & Artworks", "다양한 장르를 아우르는 ARTPICK 대표 라인업", "회화부터 사진, 조각, 일러스트까지 검증된 아티스트들이 함께합니다.", 6)
    
    # Left: The real artwork cards crop from the mockup!
    grid_path = os.path.join(ASSETS_DIR, "artworks_grid.png")
    if os.path.exists(grid_path):
        grid_img = Image.open(grid_path).convert("RGBA")
        ratio = 690 / grid_img.height
        new_w = int(grid_img.width * ratio)
        grid_resized = grid_img.resize((new_w, 690), Image.Resampling.LANCZOS)
        
        # Shadow card backing
        draw.rounded_rectangle((100, 230, 100 + new_w + 30, 940), radius=24, fill=WHITE_COLOR, outline=LIGHT_GRAY, width=1)
        img.paste(grid_resized, (115, 240), grid_resized)
        
    # Right: 6 Item Explanations
    artworks_info = [
        ("김서영 작가 — 〈푸른 하루〉", "₩1,200,000", "회화 / 수국 유화 30호 (만개한 푸른 수국 속 고요한 사색)"),
        ("이준호 작가 — 〈저녁의 바다〉", "₩800,000", "사진 / 아날로그 필름 프린트 (분홍빛 노을과 해안선)"),
        ("정민지 작가 — 〈그리고, 또 하루〉", "₩950,000", "일러스트 / 비비드 팝 아트 15호 (도시 청춘의 자화상)"),
        ("박도현 작가 — 〈흐르는 형태〉", "₩2,500,000", "조각 / 백자토 & 매트 유약 (바람과 물의 유려한 곡선)"),
        ("최은비 작가 — 〈골목의 시간〉", "₩700,000", "사진 / 실버 젤라틴 프린트 (서촌 담벼락 위 고양이)"),
        ("한지호 작가 — 〈여름의 결〉", "₩1,600,000", "회화 / 산자락 대형 유화 50호 (초여름 능선과 녹음의 울림)")
    ]
    info_x = 940
    for idx, (title, price, desc) in enumerate(artworks_info):
        y = 230 + idx * 115
        draw.rounded_rectangle((info_x, y, 1820, y + 102), radius=16, fill=WHITE_COLOR, outline=LIGHT_GRAY, width=1)
        draw.text((info_x + 30, y + 18), title, fill=DARK_COLOR, font=f_h3)
        draw.text((1580, y + 18), price, fill=BLUE_COLOR, font=f_h3)
        draw.text((info_x + 30, y + 56), desc, fill=GRAY_COLOR, font=f_body)

    path = os.path.join(OUT_DIR, "slide_6.png")
    img.save(path)
    return path

# =========================================================================
# SLIDE 7: Business Model & Scalability
# =========================================================================
def render_slide_7():
    img = Image.new("RGB", (WIDTH, HEIGHT), BG_COLOR)
    draw = ImageDraw.Draw(img)
    draw_header(draw, "Business Model", "지속 가능한 아트 생태계와 상생 수익 모델", "작가와 플랫폼, 컬렉터가 함께 성장하는 선순환 구조를 지향합니다.", 7)
    
    bms = [
        ("01. 원화 중개 수수료", "15~20%의 합리적인 수수료", "기존 오프라인 갤러리(40~50%) 대비 수수료를 획기적으로 낮추어\n신진 작가의 진입 장벽을 없애고 양질의 독점 신작을 유치합니다."),
        ("02. 리미티드 에디션 & 굿즈", "라이프스타일 아트 커머스", "원화 소장이 부담스러운 입문 컬렉터를 위해\n작가 친필 넘버링 판화, 아트 포스터, 감성 굿즈를 기획 판매합니다."),
        ("03. B2B 공간 아트 렌탈", "오피스 · 호텔 맞춤 정기 구독", "기업 사옥, 호텔 라운지, 하이엔드 카페에 시즌별로 원화를 교체 전시하는\nB2B 공간 아트 솔루션 및 연간 구독 상품을 제공합니다."),
        ("04. 에디토리얼 브랜디드 콘텐츠", "매거진 & 프리미엄 제휴", "작가 심층 인터뷰와 라이프스타일 큐레이션을 결합한 고급 콘텐츠를 통해\n인테리어, 럭셔리 라이프스타일 브랜드와의 스폰서십을 창출합니다.")
    ]
    for k, (tag, tit, desc) in enumerate(bms):
        col = k % 2
        row = k // 2
        x = 100 + col * 880
        y = 230 + row * 360
        draw.rounded_rectangle((x, y, x + 840, y + 320), radius=24, fill=WHITE_COLOR, outline=LIGHT_GRAY, width=1)
        draw.text((x + 50, y + 45), tag, fill=BLUE_COLOR, font=f_h3)
        draw.text((x + 50, y + 90), tit, fill=DARK_COLOR, font=f_h2)
        draw.line([(x + 50, y + 155), (x + 790, y + 155)], fill=LIGHT_GRAY, width=1)
        
        yd = y + 185
        for line in desc.split("\n"):
            draw.text((x + 50, yd), line, fill=GRAY_COLOR, font=f_body)
            yd += 40

    path = os.path.join(OUT_DIR, "slide_7.png")
    img.save(path)
    return path

# =========================================================================
# SLIDE 8: Roadmap & Vision
# =========================================================================
def render_slide_8():
    img = Image.new("RGB", (WIDTH, HEIGHT), BG_COLOR)
    draw = ImageDraw.Draw(img)
    draw_header(draw, "Roadmap & Vision", "More Artists, A Brighter Tomorrow", "온·오프라인의 경계를 넘어 국내외 미술 시장의 표준 플랫폼으로 도약합니다.", 8)
    
    phases = [
        ("PHASE 1 (현재 완료)", "플랫폼 런칭 & 생태계 구축", [
            "• 데스크톱 웹 & 모바일 피드 동시 런칭",
            "• 검증된 신진 작가 1,200명 및 작품 8,500점 확보",
            "• 투명한 진품 보증 및 소장 문의 체계화",
            "• 작가 프로필 허브 및 팬덤 팔로우 활성화"
        ]),
        ("PHASE 2 (2026.4Q)", "스마트 큐레이션 고도화", [
            "• AI 기반 개인 맞춤 취향 분석 추천 엔진",
            "• AR 카메라를 활용한 가상 벽면 배치 기능",
            "• 간편 전자 결제 & 미술품 특송 안심 배송망",
            "• 신진 작가 오프라인 기획전 및 팝업 갤러리"
        ]),
        ("PHASE 3 (2027.1H)", "글로벌 확장 & 아트페어", [
            "• K-아트 글로벌 해외 배송 파이프라인 구축",
            "• ARTPICK 온·오프라인 하이브리드 아트페어",
            "• 기업 B2B 공간 아트 구독 사업 본격 확대",
            "• 국내 최대 미술 애호가 커뮤니티 안착"
        ])
    ]
    for i, (tag, tit, bullets) in enumerate(phases):
        x = 100 + i * 590
        draw.rounded_rectangle((x, 230, x + 550, 780), radius=24, fill=WHITE_COLOR, outline=LIGHT_GRAY, width=1)
        draw.text((x + 40, 280), tag, fill=BLUE_COLOR, font=f_h3)
        draw.text((x + 40, 330), tit, fill=DARK_COLOR, font=f_h2)
        draw.line([(x + 40, 395), (x + 510, 395)], fill=LIGHT_GRAY, width=1)
        
        yb = 430
        for b in bullets:
            draw.text((x + 40, yb), b, fill=GRAY_COLOR, font=f_body)
            yb += 65
            
    # Bottom Dark Banner
    draw.rounded_rectangle((100, 820, 1820, 930), radius=24, fill=DARK_COLOR, outline=None)
    draw.text((540, 860), "ARTPICK — 작은 선택이 새로운 예술의 내일을 만듭니다.   |   감사합니다.", fill=WHITE_COLOR, font=f_h2)

    path = os.path.join(OUT_DIR, "slide_8.png")
    img.save(path)
    return path

def main():
    render_slide_1()
    render_slide_2()
    render_slide_3()
    render_slide_4()
    render_slide_5()
    render_slide_6()
    render_slide_7()
    render_slide_8()
    print("All 8 pretty mockup slides generated successfully!")

if __name__ == "__main__":
    main()
