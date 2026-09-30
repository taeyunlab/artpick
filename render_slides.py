import os
from PIL import Image, ImageDraw, ImageFont

WIDTH, HEIGHT = 1920, 1080
BG_COLOR = (247, 246, 242)
DARK_COLOR = (24, 24, 22)
BLUE_COLOR = (26, 86, 219)
WHITE_COLOR = (255, 255, 255)
GRAY_COLOR = (100, 100, 95)
LIGHT_GRAY = (228, 226, 220)
BLUE_BG = (238, 242, 255)

FONT_PATH_REG = r"C:\Windows\Fonts\malgun.ttf"
FONT_PATH_BOLD = r"C:\Windows\Fonts\malgunbd.ttf"
FONT_PATH_SERIF = r"C:\Windows\Fonts\georgiab.ttf"

def get_font(path, size):
    try:
        return ImageFont.truetype(path, size)
    except Exception:
        return ImageFont.load_default()

font_title_large = get_font(FONT_PATH_SERIF, 72)
font_title = get_font(FONT_PATH_BOLD, 46)
font_subtitle = get_font(FONT_PATH_BOLD, 30)
font_heading = get_font(FONT_PATH_BOLD, 24)
font_body = get_font(FONT_PATH_REG, 20)
font_body_bold = get_font(FONT_PATH_BOLD, 20)
font_small = get_font(FONT_PATH_REG, 16)
font_small_bold = get_font(FONT_PATH_BOLD, 16)
font_badge = get_font(FONT_PATH_BOLD, 15)

def draw_rounded_card(draw, box, fill=WHITE_COLOR, outline=LIGHT_GRAY, radius=20):
    draw.rounded_rectangle(box, radius=radius, fill=fill, outline=outline, width=1)

def draw_header(draw, category, title, subtitle, page_num):
    # Category tag
    draw.text((120, 75), category.upper(), fill=BLUE_COLOR, font=font_small_bold)
    # Title
    draw.text((120, 105), title, fill=DARK_COLOR, font=font_title)
    # Subtitle
    if subtitle:
        draw.text((120, 168), subtitle, fill=GRAY_COLOR, font=font_body)
    
    # Bottom line & footer
    draw.line([(120, 990), (1800, 990)], fill=LIGHT_GRAY, width=1)
    draw.text((120, 1010), "ARTPICK  |  ARTISTS · ARTWORKS · COMMUNITY · A BRIGHTER TOMORROW", fill=GRAY_COLOR, font=font_small)
    draw.text((1720, 1010), f"0{page_num} / 08", fill=GRAY_COLOR, font=font_small_bold)

def render_slide_1(out_dir):
    img = Image.new("RGB", (WIDTH, HEIGHT), BG_COLOR)
    draw = ImageDraw.Draw(img)
    
    # Center Big Card
    draw_rounded_card(draw, (120, 120, 1800, 960), fill=WHITE_COLOR, outline=None, radius=32)
    
    # Top Tag
    draw.rounded_rectangle((200, 200, 480, 250), radius=12, fill=BLUE_BG, outline=None)
    draw.text((225, 215), "ART CURATION PLATFORM", fill=BLUE_COLOR, font=font_badge)
    
    # Brand
    draw.text((200, 290), "ARTPICK", fill=DARK_COLOR, font=font_title_large)
    draw.text((200, 400), "당신의 취향이 작품을 만나는 곳", fill=BLUE_COLOR, font=font_title)
    
    desc_text = "새로운 작가와 작품을 발견하고, 소장하는 즐거움을 시작하는 차세대 미술 큐레이션 플랫폼"
    draw.text((200, 485), desc_text, fill=GRAY_COLOR, font=font_subtitle)
    
    # Metric badges
    metrics = [("1,200+", "등록 작가"), ("8,500+", "등록 작품"), ("12,000+", "예술을 사랑하는 사람들")]
    for i, (m_val, m_lbl) in enumerate(metrics):
        x = 200 + i * 360
        draw_rounded_card(draw, (x, 620, x + 320, 740), fill=BG_COLOR, outline=LIGHT_GRAY, radius=16)
        draw.text((x + 30, 640), m_val, fill=DARK_COLOR, font=font_title)
        draw.text((x + 30, 695), m_lbl, fill=GRAY_COLOR, font=font_body)
        
    draw.text((200, 880), "2026.09  |  Service Launch Presentation  |  ARTISTS · ARTWORKS · COMMUNITY", fill=GRAY_COLOR, font=font_small_bold)
    
    path = os.path.join(out_dir, "slide_1.png")
    img.save(path)
    return path

def render_slide_2(out_dir):
    img = Image.new("RGB", (WIDTH, HEIGHT), BG_COLOR)
    draw = ImageDraw.Draw(img)
    draw_header(draw, "Background & Problem", "기존 미술 시장의 한계와 ARTPICK의 출발점", "누구나 미술을 쉽게 발견하고 소장할 수 있도록 문턱을 낮춥니다.", 2)
    
    cards = [
        ("01. 높은 진입 장벽", "정보 비대칭성과 폐쇄적 시장", "• 갤러리와 옥션 중심의 오프라인 유통\n• 가격이 공개되지 않아 초보자 진입 난항\n• 소수 자산가 중심의 제한적 컬렉팅 문화\n• 원화 구매 절차의 불투명성과 심리적 부담"),
        ("02. 작가의 노출 기회 부족", "신진 아티스트의 고립", "• 매년 수천 명의 유망 신진 작가 배출\n• 전시 공간 및 오프라인 갤러리 기회 극소수\n• 창작 외 유통·홍보·운송의 막막함\n• 대중과의 소통 접점 부재로 인한 조기 중단"),
        ("03. 파편화된 탐색 경험", "개인 맞춤형 큐레이션 부재", "• 방대한 작품 속 내 공간에 맞는 그림 찾기 곤란\n• 인테리어 분위기와 규격에 맞는 정보 부족\n• 모바일 친화적인 탐색 및 구매 경험 부재\n• 신뢰할 수 있는 진품 보증 및 사후 관리 미흡")
    ]
    for i, (tag, title, desc) in enumerate(cards):
        x = 120 + i * 570
        draw_rounded_card(draw, (x, 260, x + 530, 920), fill=WHITE_COLOR, outline=LIGHT_GRAY, radius=24)
        draw.text((x + 40, 310), tag, fill=BLUE_COLOR, font=font_heading)
        draw.text((x + 40, 360), title, fill=DARK_COLOR, font=font_subtitle)
        draw.line([(x + 40, 425), (x + 490, 425)], fill=LIGHT_GRAY, width=1)
        
        y_text = 460
        for line in desc.split("\n"):
            draw.text((x + 40, y_text), line, fill=GRAY_COLOR, font=font_body)
            y_text += 45
            
    path = os.path.join(out_dir, "slide_2.png")
    img.save(path)
    return path

def render_slide_3(out_dir):
    img = Image.new("RGB", (WIDTH, HEIGHT), BG_COLOR)
    draw = ImageDraw.Draw(img)
    draw_header(draw, "Brand Identity & Philosophy", "ARTPICK 철학: 예술이 사람을 더 가깝게 만듭니다", "공간을 바꾸는 작은 선택이 예술 생태계의 내일을 만듭니다.", 3)
    
    # Left Big Hero Card (Dark)
    draw_rounded_card(draw, (120, 250, 920, 920), fill=DARK_COLOR, outline=None, radius=28)
    draw.text((180, 320), "CORE PHILOSOPHY", fill=(96, 165, 250), font=font_heading)
    draw.text((180, 380), "“예술을 고르는 당신이,\n새로운 이야기를 만듭니다.”", fill=WHITE_COLOR, font=font_title)
    
    sub_desc = (
        "Good Art Brings People Together.\n\n"
        "원화를 소장하는 특별한 설렘과\n"
        "작가의 진정성 있는 스토리를 온전히 연결합니다.\n\n"
        "단순한 거래를 넘어, 일상 속에서 예술을 향유하고\n"
        "신진 아티스트와 함께 성장하는 생태계를 지향합니다."
    )
    y_sd = 540
    for line in sub_desc.split("\n"):
        draw.text((180, y_sd), line, fill=(210, 210, 210), font=font_body)
        y_sd += 36
        
    # Right 4 Pillars
    pillars = [
        ("ARTISTS", "창작에만 몰입할 수 있는 투명하고 정당한 유통 생태계"),
        ("ARTWORKS", "회화·사진·일러스트·조각을 아우르는 감각적 큐레이션"),
        ("COMMUNITY", "작가와 컬렉터가 소통하고 전시를 함께 만들어가는 장"),
        ("A BRIGHTER TOMORROW", "작은 소장이 모여 한국 미술계의 내일을 밝히는 선순환")
    ]
    for j, (p_title, p_desc) in enumerate(pillars):
        y = 250 + j * 170
        draw_rounded_card(draw, (960, y, 1800, y + 145), fill=WHITE_COLOR, outline=LIGHT_GRAY, radius=20)
        draw.text((1000, y + 32), p_title, fill=BLUE_COLOR, font=font_heading)
        draw.text((1000, y + 78), p_desc, fill=DARK_COLOR, font=font_body)
        
    path = os.path.join(out_dir, "slide_3.png")
    img.save(path)
    return path

def render_slide_4(out_dir):
    img = Image.new("RGB", (WIDTH, HEIGHT), BG_COLOR)
    draw = ImageDraw.Draw(img)
    draw_header(draw, "Web Service Features", "데스크톱 웹: 미술관 도록 수준의 우아한 큐레이션", "고해상도 비주얼 중심 UI와 직관적인 카테고리 인터랙션을 제공합니다.", 4)
    
    features = [
        ("01. 히어로 갤러리 & 실시간 지표", "1,200+ 작가 · 8,500+ 작품 · 12,000+ 유저", "대형 블루 추상화 중심의 도록 감성 레이아웃과\n실시간 플랫폼 지표를 통해 브랜드 신뢰도를 극대화합니다."),
        ("02. 주목할 만한 작품 피드", "회화 · 사진 · 일러스트 · 조각 필터링", "원클릭 카테고리 탭과 비대칭 갤러리 그리드를 제공하며,\n원터치 하트(좋아요) 실시간 찜 저장을 지원합니다."),
        ("03. 작품 상세 및 소장 문의", "투명한 규격 · 기법 · 진품 보증서", "호수, 크기(cm), 재료 기법, 제작연도, 친필 서명 보증서를\n투명하게 공개하며 원클릭 큐레이터 상담을 연결합니다."),
        ("04. 실시간 작품 등록 스튜디오", "신진 창작자를 위한 쉬운 오픈 플랫폼", "작품명, 희망 가격, 규격, 대표 이미지, 작가 노트를\n손쉽게 입력하여 즉시 갤러리 피드에 등재할 수 있습니다.")
    ]
    for k, (f_title, f_sub, f_desc) in enumerate(features):
        col = k % 2
        row = k // 2
        x = 120 + col * 860
        y = 250 + row * 340
        draw_rounded_card(draw, (x, y, x + 820, y + 300), fill=WHITE_COLOR, outline=LIGHT_GRAY, radius=24)
        draw.text((x + 45, y + 40), f_title, fill=BLUE_COLOR, font=font_heading)
        draw.text((x + 45, y + 85), f_sub, fill=DARK_COLOR, font=font_subtitle)
        draw.line([(x + 45, y + 140), (x + 775, y + 140)], fill=LIGHT_GRAY, width=1)
        
        y_d = y + 165
        for line in f_desc.split("\n"):
            draw.text((x + 45, y_d), line, fill=GRAY_COLOR, font=font_body)
            y_d += 36
            
    path = os.path.join(out_dir, "slide_4.png")
    img.save(path)
    return path

def render_slide_5(out_dir):
    img = Image.new("RGB", (WIDTH, HEIGHT), BG_COLOR)
    draw = ImageDraw.Draw(img)
    draw_header(draw, "Mobile Service Features", "모바일 앱: 손안에서 만나는 피드 & 작가 허브", "일상 속에서 가볍게 작품을 탐색하고 선호하는 작가를 팔로우합니다.", 5)
    
    # Phone 1 Card
    draw_rounded_card(draw, (120, 250, 920, 920), fill=WHITE_COLOR, outline=LIGHT_GRAY, radius=28)
    draw.text((180, 310), "화면 1: 모바일 홈 피드 탐색", fill=BLUE_COLOR, font=font_heading)
    draw.text((180, 360), "간결하고 빠른 모바일 아트 브라우징", fill=DARK_COLOR, font=font_subtitle)
    draw.line([(180, 420), (860, 420)], fill=LIGHT_GRAY, width=1)
    
    p1_items = [
        ("• 통합 퀵 검색바", "작품명, 작가명, 키워드를 즉시 실시간 검색"),
        ("• 가로 스크롤 필터", "전체, 회화, 사진, 일러스트, 조각 원터치 필터"),
        ("• 2열 비주얼 카드 피드", "모바일 화면에 최적화된 고화질 썸네일과 가격 표기"),
        ("• 원클릭 하트(찜)", "마이페이지 관심 작품 보관함에 실시간 동기화"),
        ("• 하단 글로벌 탭바", "[홈, 탐색, 등록, 좋아요, 마이] 5개 핵심 네비게이션")
    ]
    y_p1 = 455
    for title, sub in p1_items:
        draw.text((180, y_p1), title, fill=DARK_COLOR, font=font_body_bold)
        draw.text((400, y_p1), sub, fill=GRAY_COLOR, font=font_body)
        y_p1 += 75
        
    # Phone 2 Card
    draw_rounded_card(draw, (960, 250, 1800, 920), fill=WHITE_COLOR, outline=LIGHT_GRAY, radius=28)
    draw.text((1020, 310), "화면 2: 작가 프로필 허브 (김서영 작가)", fill=BLUE_COLOR, font=font_heading)
    draw.text((1020, 360), "아티스트의 세계관과 포트폴리오를 한눈에", fill=DARK_COLOR, font=font_subtitle)
    draw.line([(1020, 420), (1740, 420)], fill=LIGHT_GRAY, width=1)
    
    p2_items = [
        ("• 작가 아이덴티티", "원형 아바타, 대표 커버 배너, 작가 핸들(@seoyoung_kim)"),
        ("• 팬덤 팔로우 시스템", "원클릭 팔로우 토글 및 팔로워 수 실시간 카운트"),
        ("• 핵심 활동 지표", "1.2만 팔로워 · 24 작품 · 3 전시 투명 표기"),
        ("• 감성 작가 노트", "“평범한 것들이 모여, 특별한 하루가 됩니다.”"),
        ("• 4대 탭 컬렉션", "[작품(3x3 그리드), 작가 소개, 전시 이력, 최신 소식]")
    ]
    y_p2 = 455
    for title, sub in p2_items:
        draw.text((1020, y_p2), title, fill=DARK_COLOR, font=font_body_bold)
        draw.text((1240, y_p2), sub, fill=GRAY_COLOR, font=font_body)
        y_p2 += 75
        
    path = os.path.join(out_dir, "slide_5.png")
    img.save(path)
    return path

def render_slide_6(out_dir):
    img = Image.new("RGB", (WIDTH, HEIGHT), BG_COLOR)
    draw = ImageDraw.Draw(img)
    draw_header(draw, "Curated Creators & Artworks", "다양한 장르를 아우르는 ARTPICK 대표 라인업", "회화부터 사진, 조각, 일러스트까지 검증된 아티스트들이 함께합니다.", 6)
    
    artworks = [
        ("김서영 작가", "푸른 하루", "₩1,200,000", "회화  |  수국 유화 30호 (2026)", "여름의 청량한 공기와 푸른 수국 속 사색의 순간"),
        ("이준호 작가", "저녁의 바다", "₩800,000", "사진  |  아날로그 필름 프린트 (2025)", "노을이 물든 해안선과 두 사람의 잔잔한 실루엣"),
        ("정민지 작가", "그리고, 또 하루", "₩950,000", "일러스트  |  비비드 팝 아트 15호 (2026)", "도시 속 다채롭고 솔직한 감정선을 담은 인물화"),
        ("박도현 작가", "흐르는 형태", "₩2,500,000", "조각  |  백자토 & 매트 유약 (2026)", "물과 바람의 유려한 곡선을 빚어낸 미니멀 오브제"),
        ("최은비 작가", "골목의 시간", "₩700,000", "사진  |  젤라틴 실버 프린트 (2025)", "오후 3시 서촌 담벼락 위 고양이와 빛의 대비"),
        ("한지호 작가", "여름의 결", "₩1,600,000", "회화  |  산자락 대형 캔버스 50호 (2025)", "초여름 능선을 타고 흐르는 바람과 녹음의 울림")
    ]
    for idx, (artist, title, price, spec, desc) in enumerate(artworks):
        col = idx % 3
        row = idx // 3
        x = 120 + col * 570
        y = 250 + row * 340
        draw_rounded_card(draw, (x, y, x + 530, y + 300), fill=WHITE_COLOR, outline=LIGHT_GRAY, radius=20)
        draw.text((x + 35, y + 30), artist, fill=GRAY_COLOR, font=font_small_bold)
        draw.text((x + 35, y + 65), title, fill=DARK_COLOR, font=font_subtitle)
        draw.text((x + 35, y + 120), price, fill=BLUE_COLOR, font=font_heading)
        draw.text((x + 35, y + 165), spec, fill=DARK_COLOR, font=font_small_bold)
        draw.line([(x + 35, y + 205), (x + 495, y + 205)], fill=LIGHT_GRAY, width=1)
        draw.text((x + 35, y + 225), desc, fill=GRAY_COLOR, font=font_body)
        
    path = os.path.join(out_dir, "slide_6.png")
    img.save(path)
    return path

def render_slide_7(out_dir):
    img = Image.new("RGB", (WIDTH, HEIGHT), BG_COLOR)
    draw = ImageDraw.Draw(img)
    draw_header(draw, "Business Model", "지속 가능한 아트 생태계와 상생 수익 모델", "작가와 플랫폼, 컬렉터가 함께 성장하는 선순환 구조를 지향합니다.", 7)
    
    bms = [
        ("01. 원화 거래 중개 수수료", "15~20%의 합리적인 수수료", "기존 오프라인 갤러리(40~50%) 대비 수수료를 획기적으로 낮추어\n신진 작가들의 진입 장벽을 낮추고 양질의 신작을 독점 유치합니다."),
        ("02. 한정판 에디션 & 아트 굿즈", "프린트 및 라이프스타일 커머스", "원화 소장이 부담스러운 MZ 입문 컬렉터를 위해\n작가 친필 넘버링 판화, 아트 포스터, 패브릭 굿즈를 기획 판매합니다."),
        ("03. B2B 공간 아트 렌탈", "오피스 · 호텔 맞춤 정기 구독", "기업 사옥, 호텔 라운지, 하이엔드 카페에 시즌별로 작품을 교체 전시하는\nB2B 공간 아트 솔루션 및 연간 구독 상품을 제공합니다."),
        ("04. 에디토리얼 브랜디드 콘텐츠", "매거진 & 프리미엄 스폰서십", "작가 인터뷰와 라이프스타일 큐레이션을 결합한 프리미엄 콘텐츠를 통해\n인테리어, 럭셔리 라이프 브랜드와의 스폰서십 수익을 창출합니다.")
    ]
    for k, (b_title, b_sub, b_desc) in enumerate(bms):
        col = k % 2
        row = k // 2
        x = 120 + col * 860
        y = 250 + row * 340
        draw_rounded_card(draw, (x, y, x + 820, y + 300), fill=WHITE_COLOR, outline=LIGHT_GRAY, radius=24)
        draw.text((x + 45, y + 40), b_title, fill=BLUE_COLOR, font=font_heading)
        draw.text((x + 45, y + 85), b_sub, fill=DARK_COLOR, font=font_subtitle)
        draw.line([(x + 45, y + 140), (x + 775, y + 140)], fill=LIGHT_GRAY, width=1)
        
        y_d = y + 165
        for line in b_desc.split("\n"):
            draw.text((x + 45, y_d), line, fill=GRAY_COLOR, font=font_body)
            y_d += 36
            
    path = os.path.join(out_dir, "slide_7.png")
    img.save(path)
    return path

def render_slide_8(out_dir):
    img = Image.new("RGB", (WIDTH, HEIGHT), BG_COLOR)
    draw = ImageDraw.Draw(img)
    draw_header(draw, "Roadmap & Vision", "미래를 향한 로드맵: More Artists, A Brighter Tomorrow", "온·오프라인의 경계를 넘어 국내외 미술 시장의 표준 플랫폼으로 도약합니다.", 8)
    
    phases = [
        ("PHASE 1 (현재)", "플랫폼 런칭 & 생태계 구축", [
            "• 데스크톱 웹 & 모바일 피드 런칭",
            "• 등록 작가 1,200명 및 작품 8,500점 확보",
            "• 투명한 진품 보증 및 소장 문의 체계화",
            "• 작가 프로필 허브 및 팬덤 팔로우 활성화"
        ]),
        ("PHASE 2 (2026.4Q)", "스마트 큐레이션 고도화", [
            "• AI 기반 개인 맞춤 취향 추천 엔진",
            "• AR 카메라를 활용한 가상 벽면 배치 기능",
            "• 간편 전자 결제 & 미술품 특송 안심 배송망",
            "• 신진 작가 오프라인 기획전 및 팝업 스토어"
        ]),
        ("PHASE 3 (2027.1H)", "글로벌 확장 & 아트페어", [
            "• K-아트 글로벌 해외 배송 파이프라인 구축",
            "• ARTPICK 온·오프라인 하이브리드 아트페어",
            "• 기업 B2B 공간 아트 구독 사업 본격 확대",
            "• 국내 최대 미술 애호가 커뮤니티 정착"
        ])
    ]
    for i, (tag, title, bullets) in enumerate(phases):
        x = 120 + i * 570
        draw_rounded_card(draw, (x, 250, x + 530, 800), fill=WHITE_COLOR, outline=LIGHT_GRAY, radius=24)
        draw.text((x + 40, 300), tag, fill=BLUE_COLOR, font=font_heading)
        draw.text((x + 40, 350), title, fill=DARK_COLOR, font=font_subtitle)
        draw.line([(x + 40, 410), (x + 490, 410)], fill=LIGHT_GRAY, width=1)
        
        y_b = 445
        for bullet in bullets:
            draw.text((x + 40, y_b), bullet, fill=GRAY_COLOR, font=font_body)
            y_b += 55
            
    # Bottom Banner
    draw_rounded_card(draw, (120, 835, 1800, 930), fill=DARK_COLOR, outline=None, radius=20)
    msg = "ARTPICK — 작은 선택이 새로운 예술의 내일을 만듭니다.   |   감사합니다."
    draw.text((500, 865), msg, fill=WHITE_COLOR, font=font_heading)
    
    path = os.path.join(out_dir, "slide_8.png")
    img.save(path)
    return path

def main():
    out_dir = r"C:\Artpick\public\slides"
    os.makedirs(out_dir, exist_ok=True)
    
    render_slide_1(out_dir)
    render_slide_2(out_dir)
    render_slide_3(out_dir)
    render_slide_4(out_dir)
    render_slide_5(out_dir)
    render_slide_6(out_dir)
    render_slide_7(out_dir)
    render_slide_8(out_dir)
    print("All 8 slides rendered to PNG successfully!")

if __name__ == "__main__":
    main()
