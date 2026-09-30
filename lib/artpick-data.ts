export interface Artwork {
  id: number;
  title: string;
  artist: string;
  artistHandle: string;
  artistId: string;
  category: string;
  price: number;
  formattedPrice: string;
  image: string;
  aspect?: string;
  dimensions: string;
  medium: string;
  likes: number;
  description: string;
  year: string;
}

export interface Artist {
  id: string;
  name: string;
  handle: string;
  category: string;
  avatar: string;
  coverImage: string;
  followers: string;
  followersCount: number;
  artworksCount: number;
  exhibitionsCount: number;
  bio: string;
  quote: string;
  exhibitions: { year: string; title: string; location: string }[];
  news: { date: string; title: string; summary: string }[];
}

export interface CreationStory {
  id: number;
  artistId: string;
  artistName: string;
  artistRole?: string;
  stage: string; // 예: '창작 과정 2단계', '소성 및 완성'
  title: string;
  summary: string;
  image: string;
  date: string;
  artworkId?: number;
  fullLog: {
    duration: string;
    materials: string[];
    steps: { step: number; title: string; desc: string; image?: string }[];
    artistNote: string;
  };
}

export interface MagazineArticle {
  id: number;
  title: string;
  subtitle: string;
  cover: string;
  date: string;
  readTime: string;
  category: string;
}

export const CATEGORIES: string[] = ['전체', '회화', '공예', '디지털 아트', '조소', '창작 일지'];

export const INITIAL_ARTWORKS: Artwork[] = [
  {
    id: 1,
    title: '푸른 하루',
    artist: '김서영',
    artistHandle: '@seoyoung_kim',
    artistId: 'seoyoung_kim',
    category: '회화',
    price: 1200000,
    formattedPrice: '₩1,200,000',
    image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1000&q=85',
    aspect: 'aspect-[3/4]',
    dimensions: '90.9 x 72.7 cm (30호)',
    medium: 'Oil on canvas, 2026',
    year: '2026',
    likes: 342,
    description: '청아한 푸른 꽃들의 결 속에 머무는 고요한 사색의 순간. 일상 속에서 발견한 차분하고 순수한 감정을 푸른빛의 다양한 레이어로 캔버스에 옮겨 담았습니다.',
  },
  {
    id: 2,
    title: '저녁의 바다',
    artist: '이준호',
    artistHandle: '@junho_lee',
    artistId: 'junho_lee',
    category: '사진',
    price: 800000,
    formattedPrice: '₩800,000',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=85',
    aspect: 'aspect-[16/10]',
    dimensions: '100 x 60 cm (Ed. 5/10)',
    medium: 'Archival Pigment Print, 2025',
    year: '2025',
    likes: 218,
    description: '서서히 번져가는 분홍빛 노을과 해안선을 따라 걷는 두 사람의 실루엣. 하루의 끝자락이 선사하는 평온한 위로를 아날로그 필름의 부드러운 질감으로 담아냈습니다.',
  },
  {
    id: 3,
    title: '그리고, 또 하루',
    artist: '정민지',
    artistHandle: '@minji_jung',
    artistId: 'minji_jung',
    category: '일러스트',
    price: 950000,
    formattedPrice: '₩950,000',
    image: 'https://images.unsplash.com/photo-1578925518470-4def7a0f08bb?auto=format&fit=crop&w=1200&q=85',
    aspect: 'aspect-[16/10]',
    dimensions: '65.1 x 53.0 cm (15호)',
    medium: 'Acrylic & Digital mixed on fine art paper, 2026',
    year: '2026',
    likes: 512,
    description: '선명한 오렌지 배경과 푸른 옷의 강렬한 대비. 도시를 살아가는 현대인의 다채롭고 솔직한 감정선을 경쾌하면서도 서정적인 일러스트레이션으로 표현했습니다.',
  },
  {
    id: 4,
    title: '흐르는 형태',
    artist: '박도현',
    artistHandle: '@dohyun_park',
    artistId: 'dohyun_park',
    category: '조각',
    price: 2500000,
    formattedPrice: '₩2,500,000',
    image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1000&q=85',
    aspect: 'aspect-square',
    dimensions: '38 x 26 x 45 cm',
    medium: 'White Clay & Matte Glaze, 2026',
    year: '2026',
    likes: 189,
    description: '물과 바람이 빚어낸 듯한 유기적인 곡선미. 백자토의 매트한 질감과 비움의 공간감이 공존하며 조용한 쉼의 파동을 공간에 채워 넣습니다.',
  },
  {
    id: 5,
    title: '골목의 시간',
    artist: '최은비',
    artistHandle: '@eunbi_choi',
    artistId: 'eunbi_choi',
    category: '사진',
    price: 700000,
    formattedPrice: '₩700,000',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=1200&q=85',
    aspect: 'aspect-[16/10]',
    dimensions: '80 x 53 cm (Ed. 3/15)',
    medium: 'Silver Gelatin Print, 2025',
    year: '2025',
    likes: 423,
    description: '오후 3시 골목길 담벼락 위, 햇살과 짙은 그림자 사이에 나른하게 머무는 검은 고양이. 빠르게 흘러가는 도시 속에서 멈추어 선 찰나의 순간입니다.',
  },
  {
    id: 6,
    title: '여름의 결',
    artist: '한지호',
    artistHandle: '@jiho_han',
    artistId: 'jiho_han',
    category: '회화',
    price: 1600000,
    formattedPrice: '₩1,600,000',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=85',
    aspect: 'aspect-[16/10]',
    dimensions: '116.8 x 91.0 cm (50호)',
    medium: 'Oil on canvas, 2025',
    year: '2025',
    likes: 298,
    description: '여름 산자락을 휘감는 바람과 짙푸른 녹음의 유려한 파동. 거친 듯 세심한 붓터치로 화폭 위에 담아낸 대자연의 생명력 넘치는 울림입니다.',
  },
  {
    id: 7,
    title: '파도의 결',
    artist: '김서영',
    artistHandle: '@seoyoung_kim',
    artistId: 'seoyoung_kim',
    category: '회화',
    price: 1350000,
    formattedPrice: '₩1,350,000',
    image: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=1000&q=85',
    aspect: 'aspect-square',
    dimensions: '72.7 x 60.6 cm (20호)',
    medium: 'Oil on canvas, 2026',
    year: '2026',
    likes: 175,
    description: '부서지는 파도의 거품과 깊은 바다의 울림을 딥블루와 에메랄드 톤으로 구현한 연작입니다.',
  },
  {
    id: 8,
    title: '화병과 온기',
    artist: '김서영',
    artistHandle: '@seoyoung_kim',
    artistId: 'seoyoung_kim',
    category: '회화',
    price: 900000,
    formattedPrice: '₩900,000',
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1000&q=85',
    aspect: 'aspect-square',
    dimensions: '53.0 x 45.5 cm (10호)',
    medium: 'Oil on linen, 2025',
    year: '2025',
    likes: 260,
    description: '테이블 위에 놓인 질그릇 화병과 한 줄기 풀잎. 공간에 따스한 온기를 전하는 정물화입니다.',
  },
  {
    id: 9,
    title: '언덕의 바람',
    artist: '김서영',
    artistHandle: '@seoyoung_kim',
    artistId: 'seoyoung_kim',
    category: '회화',
    price: 1100000,
    formattedPrice: '₩1,100,000',
    image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1000&q=85',
    aspect: 'aspect-square',
    dimensions: '60.6 x 50.0 cm (12호)',
    medium: 'Oil on canvas, 2025',
    year: '2025',
    likes: 194,
    description: '초록빛 언덕 위로 스며드는 새벽빛과 상쾌한 공기를 부드러운 그러데이션으로 완성했습니다.',
  },
  {
    id: 10,
    title: '백수련의 정원',
    artist: '김서영',
    artistHandle: '@seoyoung_kim',
    artistId: 'seoyoung_kim',
    category: '회화',
    price: 1450000,
    formattedPrice: '₩1,450,000',
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=1000&q=85',
    aspect: 'aspect-square',
    dimensions: '91.0 x 72.7 cm (30호)',
    medium: 'Oil on linen, 2026',
    year: '2026',
    likes: 310,
    description: '고요한 연못 위에 맑게 피어난 흰 꽃들의 향연. 빛의 산란과 물결의 흔들림을 담았습니다.',
  },
  {
    id: 11,
    title: '분홍빛 저녁놀',
    artist: '김서영',
    artistHandle: '@seoyoung_kim',
    artistId: 'seoyoung_kim',
    category: '회화',
    price: 1150000,
    formattedPrice: '₩1,150,000',
    image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1000&q=85',
    aspect: 'aspect-square',
    dimensions: '72.7 x 60.6 cm (20호)',
    medium: 'Oil on canvas, 2026',
    year: '2026',
    likes: 420,
    description: '솜사탕처럼 부드러운 핑크와 라벤더빛 하늘. 하루를 다정하게 마무리하는 몽환적인 풍경입니다.',
  },
  {
    id: 12,
    title: '기억의 조각 03',
    artist: '박도현',
    artistHandle: '@dohyun_park',
    artistId: 'dohyun_park',
    category: '조각',
    price: 1800000,
    formattedPrice: '₩1,800,000',
    image: 'https://images.unsplash.com/photo-1579783901586-d88db74b4fe4?auto=format&fit=crop&w=1000&q=85',
    aspect: 'aspect-square',
    dimensions: '30 x 20 x 28 cm',
    medium: 'Bronze & Granite, 2025',
    year: '2025',
    likes: 142,
    description: '오랜 시간 마모된 돌의 기억을 청동의 묵직한 질감과 결합한 소형 조각 연작입니다.',
  },
  {
    id: 101,
    title: '순간의 결 (Momentum)',
    artist: '이서윤',
    artistHandle: '@seoyun_lee',
    artistId: 'seoyun_lee',
    category: '회화',
    price: 1850000,
    formattedPrice: '₩1,850,000',
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1000&q=85',
    aspect: 'aspect-[3/4]',
    dimensions: '90.9 x 72.7 cm (30호)',
    medium: 'Oil & Gesso on Linen, 2026',
    year: '2026',
    likes: 580,
    description: '4겹의 젯소 칠과 빛의 굴절을 응축한 레이어링. 삶의 고요한 순간들이 빚어내는 온화한 파동을 전합니다.',
  },
  {
    id: 102,
    title: '1250도의 빙열 다완',
    artist: '박민우',
    artistHandle: '@minwoo_park',
    artistId: 'minwoo_park',
    category: '공예',
    price: 650000,
    formattedPrice: '₩650,000',
    image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=1000&q=85',
    aspect: 'aspect-square',
    dimensions: '14 x 14 x 8.5 cm',
    medium: '산청백토, 천연재유 환원소성 1250℃, 2026',
    year: '2026',
    likes: 312,
    description: '가마 속 닷새간의 기다림 끝에 얻은 얼음결 같은 미세 빙열 패턴. 손에 쥐었을 때 흙의 온기와 깊이를 느낄 수 있습니다.',
  },
  {
    id: 103,
    title: '새벽의 잔향',
    artist: '이서윤',
    artistHandle: '@seoyun_lee',
    artistId: 'seoyun_lee',
    category: '회화',
    price: 1400000,
    formattedPrice: '₩1,400,000',
    image: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1000&q=85',
    aspect: 'aspect-[4/3]',
    dimensions: '72.7 x 60.6 cm (20호)',
    medium: 'Oil on canvas, 2026',
    year: '2026',
    likes: 420,
    description: '빛과 어둠이 교차하는 새벽 5시의 공기를 담은 연작입니다.',
  },
];

export const ARTISTS_DATA: Record<string, Artist> = {
  seoyun_lee: {
    id: 'seoyun_lee',
    name: '이서윤',
    handle: '@seoyun_lee',
    category: '신진 서양화가',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=85',
    coverImage: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1400&q=85',
    followers: '1.5만',
    followersCount: 15200,
    artworksCount: 14,
    exhibitionsCount: 2,
    bio: '빛과 결의 층위를 쌓아 올리며 삶의 고요한 순간을 기록하는 신진 서양화가입니다. 물감과 젯소의 물질적 레이어로 시간의 지속성을 탐구합니다.',
    quote: '“빛과 결의 층위를 쌓아 올리며 삶의 고요한 순간을 기록합니다.”',
    exhibitions: [
      { year: '2026', title: '신진 기획전 《빛과 결의 층위》', location: '아트픽 스페이스 (서울)' },
      { year: '2025', title: '청년 미술제 《사색의 캔버스》', location: '인사 아트센터' },
    ],
    news: [
      { date: '2026.03.15', title: '이 주의 주목할 신진 작가 선정', summary: '아트픽 큐레이터팀의 스포트라이트 작가로 선정되었습니다.' },
      { date: '2026.03.01', title: '신작 〈순간의 결〉 창작 일지 공개', summary: '3주간의 밑작업 기록이 창작의 과정 섹션에 게재되었습니다.' },
    ],
  },
  minwoo_park: {
    id: 'minwoo_park',
    name: '박민우',
    handle: '@minwoo_park',
    category: '도예가',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=85',
    coverImage: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=1400&q=85',
    followers: '8.7천',
    followersCount: 8700,
    artworksCount: 19,
    exhibitionsCount: 4,
    bio: '자연의 흙과 1250도 가마 불이 만들어내는 우연한 빙열의 미학을 탐구합니다.',
    quote: '“1250도 가마 속 불과 흙의 대화에서 가장 순수한 형태를 찾습니다.”',
    exhibitions: [
      { year: '2026', title: '현대 도예 초대전 《빙열의 노래》', location: '통인 갤러리' },
      { year: '2025', title: '공예 트렌드 페어 창작 공방관', location: 'COEX' },
    ],
    news: [
      { date: '2026.03.12', title: '빙열 다완 시리즈 한정 출품', summary: '가마 소성 닷새 만에 완성된 신작 3점이 공개되었습니다.' },
    ],
  },
  seoyoung_kim: {
    id: 'seoyoung_kim',
    name: '김서영',
    handle: '@seoyoung_kim',
    category: '회화 작가',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=85',
    coverImage: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=1400&q=85',
    followers: '1.2만',
    followersCount: 12400,
    artworksCount: 24,
    exhibitionsCount: 3,
    bio: '일상의 감정을 색으로 기록하는 작가입니다. 익숙한 풍경 속에서 낯선 아름다움을 발견하고, 그 순간을 그림에 담습니다.',
    quote: '“평범한 것들이 모여, 특별한 하루가 됩니다.”',
    exhibitions: [
      { year: '2026', title: '개인전 《푸른 기억의 층위》', location: '갤러리 아원 (서울)' },
      { year: '2025', title: '단체전 《우리가 머문 계절》', location: '한남 아트스페이스' },
      { year: '2024', title: '기획전 《Color of Days: 신진 4인전》', location: '성수 뮤지엄' },
    ],
    news: [
      {
        date: '2026.03.01',
        title: '신작 연작 〈푸른 하루〉 30호 공개',
        summary: '여름의 기억을 주제로 한 새로운 블루 컬렉션이 ARTPICK에서 선공개되었습니다.',
      },
      {
        date: '2026.01.15',
        title: '월간 미술 1월호 〈주목할 신진 작가 10인〉 선정',
        summary: '서정적인 색채 미학을 구축해나가는 김서영 작가의 인터뷰가 게재되었습니다.',
      },
    ],
  },
  junho_lee: {
    id: 'junho_lee',
    name: '이준호',
    handle: '@junho_lee',
    category: '사진 작가',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=85',
    coverImage: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=85',
    followers: '8.4천',
    followersCount: 8420,
    artworksCount: 18,
    exhibitionsCount: 4,
    bio: '바다와 빛, 고요한 순간의 잔상을 아날로그 필름의 온도로 포착합니다.',
    quote: '“빛이 사라지기 전, 가장 따뜻한 숨을 기록합니다.”',
    exhibitions: [
      { year: '2025', title: '개인전 《수평선의 여운》', location: '라이카 갤러리' },
    ],
    news: [
      { date: '2025.11.10', title: '한정판 에디션 프린트 10점 완판', summary: '많은 관심과 소장에 감사드립니다.' },
    ],
  },
  minji_jung: {
    id: 'minji_jung',
    name: '정민지',
    handle: '@minji_jung',
    category: '일러스트레이터',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=85',
    coverImage: 'https://images.unsplash.com/photo-1578925518470-4def7a0f08bb?auto=format&fit=crop&w=1400&q=85',
    followers: '2.1만',
    followersCount: 21300,
    artworksCount: 32,
    exhibitionsCount: 5,
    bio: '생동감 넘치는 비비드 컬러와 솔직한 표정으로 도시 청춘의 자화상을 그립니다.',
    quote: '“그림은 나와 타인을 가장 솔직하게 잇는 다리입니다.”',
    exhibitions: [
      { year: '2026', title: '2인전 《City Pop & Modern Life》', location: 'DDP 아트홀' },
    ],
    news: [
      { date: '2026.02.14', title: '아트 콜라보레이션 굿즈 오픈', summary: '포스터와 아트북이 함께 출시되었습니다.' },
    ],
  },
  dohyun_park: {
    id: 'dohyun_park',
    name: '박도현',
    handle: '@dohyun_park',
    category: '조각 / 도예가',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=85',
    coverImage: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1400&q=85',
    followers: '5.9천',
    followersCount: 5900,
    artworksCount: 15,
    exhibitionsCount: 6,
    bio: '돌과 흙의 질감을 현대적인 곡선과 여백의 미학으로 빚어냅니다.',
    quote: '“인위적이지 않은 자연의 곡선에서 완전함을 느낍니다.”',
    exhibitions: [
      { year: '2026', title: '초대전 《형태의 침묵》', location: '국제갤러리 K3' },
    ],
    news: [
      { date: '2026.01.20', title: '흐르는 형태 시리즈 미술관 소장 확정', summary: '국립현대미술관 신소장품으로 선정되었습니다.' },
    ],
  },
  eunbi_choi: {
    id: 'eunbi_choi',
    name: '최은비',
    handle: '@eunbi_choi',
    category: '다큐멘터리 사진가',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=85',
    coverImage: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=1400&q=85',
    followers: '7.8천',
    followersCount: 7800,
    artworksCount: 22,
    exhibitionsCount: 2,
    bio: '오래된 골목과 볕뉘, 그곳을 스쳐 지나가는 생명들의 시간을 흑백으로 기록합니다.',
    quote: '“평범한 골목길 모퉁이에도 영원히 기억될 시간들이 있습니다.”',
    exhibitions: [
      { year: '2025', title: '사진전 《서촌의 오후》', location: '보안여관' },
    ],
    news: [
      { date: '2025.12.01', title: '흑백 사진집 《골목의 시간》 출간', summary: '온오프라인 서점에서 만나보실 수 있습니다.' },
    ],
  },
  jiho_han: {
    id: 'jiho_han',
    name: '한지호',
    handle: '@jiho_han',
    category: '서양화가',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=400&q=85',
    coverImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1400&q=85',
    followers: '9.3천',
    followersCount: 9300,
    artworksCount: 19,
    exhibitionsCount: 5,
    bio: '사계절 산천의 유려한 능선과 바람의 결을 깊은 붓터치로 화폭에 담습니다.',
    quote: '“산은 언제나 그 자리에 서서 계절의 숨을 들려줍니다.”',
    exhibitions: [
      { year: '2026', title: '기획전 《풍경의 맥》', location: '가나아트센터' },
    ],
    news: [
      { date: '2026.02.28', title: '봄맞이 신작 대작 3점 공개', summary: '지리산의 봄기운을 담은 신작입니다.' },
    ],
  },
};

export const MAGAZINE_ARTICLES: MagazineArticle[] = [
  {
    id: 1,
    title: '일상의 색채를 캔버스에 겹쳐내는 법',
    subtitle: '김서영 작가가 말하는 푸른색의 스펙트럼과 사색의 시간',
    cover: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=85',
    date: '2026.03.05',
    readTime: '6분 읽기',
    category: '아티스트 인터뷰',
  },
  {
    id: 2,
    title: '처음 원화를 소장하는 컬렉터를 위한 가이드',
    subtitle: '공간의 크기, 조명, 그리고 나의 취향을 발견하는 세 가지 기준',
    cover: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=85',
    date: '2026.02.24',
    readTime: '8분 읽기',
    category: '컬렉팅 인사이트',
  },
  {
    id: 3,
    title: '현대 도예와 조각이 주는 공간의 여백',
    subtitle: '박도현 작가의 작업실에서 마주한 흙과 손의 대화',
    cover: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=85',
    date: '2026.02.10',
    readTime: '5분 읽기',
    category: '스튜디오 탐방',
  },
];

export const CREATION_STORIES: CreationStory[] = [
  {
    id: 1,
    artistId: 'seoyun_lee',
    artistName: '이서윤 작가',
    artistRole: '신진 서양화가',
    stage: '창작 과정 2단계',
    title: '3주간의 밑작업과 첫 번째 붓터치',
    summary: '젯소 칠을 4번에 걸쳐 완성한 뒤, 물감의 첫 층을 얹는 순간의 기록입니다.',
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=85',
    date: '2026.03.14',
    artworkId: 101,
    fullLog: {
      duration: '3주간의 밑작업',
      materials: ['벨기에산 천연 린넨 캔버스', '전통 아크릴 젯소 4회 도포', '천연 안료 덜스트', '프랑스산 린시드 오일'],
      steps: [
        {
          step: 1,
          title: '캔버스 천 스트레칭 및 젯소 하도 작업',
          desc: '밀도 높은 린넨 천을 직접 짠 뒤, 사포질과 젯소 칠을 4번에 걸쳐 반복하여 붓이 미끄러지지 않는 견고한 표면을 만듭니다.',
        },
        {
          step: 2,
          title: '첫 번째 유화 층(Underpainting) 조색',
          desc: '빛의 투과를 위해 번트 엄버와 울트라마린 딥을 묽게 희석하여 첫 번째 구조적 명암을 잡았습니다.',
        },
        {
          step: 3,
          title: '결의 축적과 텍스처 마티에르',
          desc: '나이프를 이용해 빛이 부딪히는 각도에 따라 색조가 변하도록 층위를 쌓아갑니다.',
        },
      ],
      artistNote:
        '물감이 마르기 전까지는 알 수 없는 긴장감이 있습니다. 그러나 4겹의 젯소 위로 첫 물감이 스며드는 그 순간, 캔버스는 비로소 숨을 쉬기 시작합니다.',
    },
  },
  {
    id: 2,
    artistId: 'minwoo_park',
    artistName: '박민우 작가',
    artistRole: '도예가',
    stage: '소성 및 완성',
    title: '1250도 가마 속에서 겪은 두 번의 실패와 깨달음',
    summary: '원하는 빙열 패턴을 얻기 위해 온도 조절에 몰두했던 닷새간의 기록입니다.',
    image: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=800&q=85',
    date: '2026.03.12',
    artworkId: 102,
    fullLog: {
      duration: '5일간의 가마 소성',
      materials: ['산청 백토', '재유(재를 섞은 천연 유약)', '가스 장작가마 1250℃'],
      steps: [
        {
          step: 1,
          title: '물레 성형 및 반건조 굽깎기',
          desc: '손의 온기로 흙의 수분을 느끼며 두께 3mm의 균일한 그릇 벽을 성형합니다.',
        },
        {
          step: 2,
          title: '초벌구이 850도 및 유약 시유',
          desc: '자연 소나무 재를 정제해 만든 천연 유약에 3초간 담가 고른 피막을 형성합니다.',
        },
        {
          step: 3,
          title: '환원 소성 1250도 및 급냉 빙열 생성',
          desc: '가마 내부 산소를 차단하며 1250도까지 끌어올린 뒤, 미세한 균열음과 함께 빙열이 피어납니다.',
        },
      ],
      artistNote:
        '두 번이나 가마 안에서 기물이 주저앉았습니다. 온도를 10도 낮추고 뜸 들이는 시간을 40분 늘리자 비로소 맑은 얼음 같은 빙열이 제 모습을 드러냈습니다.',
    },
  },
  {
    id: 3,
    artistId: 'minji_jung',
    artistName: '정민지 작가',
    artistRole: '일러스트레이터',
    stage: '채색 및 무드 세팅',
    title: '도시의 밤, 네온과 고독의 조도를 맞추다',
    summary: '수십 개의 디지털 레이어를 겹치며 밤의 서늘함과 네온의 온기를 조율하는 작업 일지.',
    image: 'https://images.unsplash.com/photo-1578925518470-4def7a0f08bb?auto=format&fit=crop&w=800&q=85',
    date: '2026.03.10',
    artworkId: 3,
    fullLog: {
      duration: '7일간의 그래픽 작업',
      materials: ['디지털 캔버스', '커스텀 아크릴 브러시', '오버레이 블렌딩 모드'],
      steps: [
        {
          step: 1,
          title: '러프 스케치와 인물 감정선 포착',
          desc: '퇴근길 지하철 차창에 비친 지친 그러나 단단한 눈빛을 드로잉합니다.',
        },
        {
          step: 2,
          title: '색채 대비 설계',
          desc: '차가운 시안 블루와 따뜻한 네온 오렌지를 배치하여 도심 속 양가적 감정을 시각화합니다.',
        },
      ],
      artistNote:
        '빛은 어둠이 있을 때 가장 선명합니다. 디지털 작업이지만 한 획 한 획 손의 떨림을 남겨두려 애씁니다.',
    },
  },
  {
    id: 4,
    artistId: 'dohyun_park',
    artistName: '박도현 작가',
    artistRole: '조각가',
    stage: '원형 성형 1단계',
    title: '인위성을 덜어내는 손끝의 감각',
    summary: '물레를 쓰지 않고 손으로 흙을 비벼 쌓아 올리며 비움의 곡선을 찾아갑니다.',
    image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=85',
    date: '2026.03.08',
    artworkId: 4,
    fullLog: {
      duration: '10일간의 코일링 작업',
      materials: ['분청토', '대나무 칼', '무광 매트 유약'],
      steps: [
        {
          step: 1,
          title: '코일링(타래쌓기) 기법',
          desc: '가래떡 모양의 흙을 층층이 올리며 손자국을 그대로 남겨둡니다.',
        },
        {
          step: 2,
          title: '건조와 비움의 형태 잡기',
          desc: '바람이 드나들 공간을 칼로 오려내며 덩어리감과 공백의 밸런스를 잡습니다.',
        },
      ],
      artistNote: '흙이 스스로 서려고 하는 힘을 거스르지 않는 것이 제 조각의 전부입니다.',
    },
  },
];

