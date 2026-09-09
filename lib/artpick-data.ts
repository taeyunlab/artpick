export interface Artwork {
  id: number;
  title: string;
  artist: string;
  artistHandle: string;
  artistId: string;
  category: '회화' | '사진' | '일러스트' | '조각';
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

export interface MagazineArticle {
  id: number;
  title: string;
  subtitle: string;
  cover: string;
  date: string;
  readTime: string;
  category: string;
}

export const CATEGORIES = ['전체', '회화', '사진', '일러스트', '조각'] as const;

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
];

export const ARTISTS_DATA: Record<string, Artist> = {
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
