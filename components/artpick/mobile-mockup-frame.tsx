'use client';

import { useState } from 'react';
import {
  Search,
  Heart,
  Home,
  Compass,
  Settings,
  ArrowLeft,
  MoreHorizontal,
  Wifi,
  Battery,
  X,
  Sparkles,
  UserPlus,
  Check,
} from 'lucide-react';
import { Artwork, Artist, CREATION_STORIES, ARTISTS_DATA } from '@/lib/artpick-data';

interface MobileMockupFrameProps {
  artworks: Artwork[];
  artist: Artist;
  favorites: number[];
  onToggleFavorite: (id: number) => void;
  onSelectArtwork: (artwork: Artwork) => void;
  isFollowed: boolean;
  onToggleFollow: (id: string) => void;
  onClose?: () => void;
  onSelectStory?: (story: any) => void;
}

export function MobileMockupFrame({
  artworks,
  artist,
  favorites,
  onToggleFavorite,
  onSelectArtwork,
  isFollowed,
  onToggleFollow,
  onClose,
  onSelectStory,
}: MobileMockupFrameProps) {
  const [activeCategory, setActiveCategory] = useState('전체');
  const [mobileTab, setMobileTab] = useState<'home' | 'explore'>('home');
  const [profileTab, setProfileTab] = useState<'작품' | '소개' | '전시' | '소식'>('작품');
  const [searchWord, setSearchWord] = useState('');

  const categories = ['전체', '회화', '공예', '디지털 아트', '조소', '창작 일지'];

  const filtered = artworks.filter((item) => {
    if (activeCategory !== '전체' && item.category !== activeCategory) return false;
    if (
      searchWord &&
      !item.title.toLowerCase().includes(searchWord.toLowerCase()) &&
      !item.artist.toLowerCase().includes(searchWord.toLowerCase()) &&
      !item.medium.toLowerCase().includes(searchWord.toLowerCase())
    )
      return false;
    return true;
  });

  const spotlightArtist = ARTISTS_DATA.seoyun_lee || artist;
  const artistArtworks = artworks.filter(
    (item) => item.artistId === artist.id || item.artistId === 'seoyoung_kim'
  );

  return (
    <div className="relative py-8 sm:py-12 px-3 sm:px-4 bg-[#edebe4]/70 border-b border-black/10">
      {/* Top Banner with Close button */}
      <div className="mx-auto max-w-6xl mb-6 sm:mb-8 flex items-center justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#1a56db]">
            Design System Mockup
          </span>
          <h2 className="font-serif-kr text-xl sm:text-2xl font-bold text-[#181816]">
            모바일 화면 시뮬레이터 (Dual Screen)
          </h2>
          <p className="text-xs text-black/60 mt-0.5">
            제공해주신 최신 시안(창작의 과정 Story, 신진 작가 스포트라이트, 큐레이션 피드)이 실시간 동작합니다.
          </p>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 rounded-full border border-black/15 bg-white px-3 py-1.5 text-xs font-semibold text-black/70 hover:bg-black/5"
          >
            <X className="size-3.5" />
            목업 닫기
          </button>
        )}
      </div>

      {/* Dual Phone Wrapper */}
      <div className="mx-auto flex flex-wrap items-start justify-center gap-8 lg:gap-14">
        {/* ==================== PHONE 1: Matches User's Screenshot 100% ==================== */}
        <div className="flex flex-col items-center">
          <span className="mb-2 text-xs font-semibold text-black/60">
            화면 1: 홈 큐레이션 & 창작의 과정 (최신 목업 시안)
          </span>

          <div className="relative h-[720px] w-[340px] sm:w-[360px] overflow-hidden rounded-[46px] border-[10px] border-[#181816] bg-[#f7f6f2] shadow-2xl ring-1 ring-black/10">
            {/* Speaker & Dynamic Island Notch */}
            <div className="absolute top-2.5 left-1/2 -translate-x-1/2 z-30 h-4 w-24 rounded-full bg-[#181816]" />

            {/* iOS Status Bar (21:00, Battery 80% as in reference screenshot) */}
            <div className="relative z-20 flex h-10 items-center justify-between px-7 pt-2 text-[11px] font-bold text-black">
              <span>21:00</span>
              <div className="flex items-center gap-1.5">
                <Wifi className="size-3" />
                <span className="text-[10px] font-bold">80%</span>
                <Battery className="size-3.5 fill-current" />
              </div>
            </div>

            {/* Scrollable Container */}
            <div className="h-[655px] overflow-y-auto pb-24 scrollbar-none text-left">
              {/* Top Header: Logo + Slogan + 작가 등록 Button */}
              <div className="px-5 pt-3 pb-2 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-cinzel text-lg font-black tracking-wider text-[#181816]">
                      ARTPICK
                    </span>
                    <span className="rounded bg-[#2563eb] px-1.5 py-0.2 text-[9px] font-bold text-white">
                      BETA
                    </span>
                  </div>
                  <p className="text-[10px] text-black/55 mt-0.5 tracking-tight">
                    신진 예술가의 발견 · 기록 · 연결 · 판매
                  </p>
                </div>

                <button className="rounded-full bg-[#181816] px-3.5 py-1 text-xs font-bold text-white shadow-sm hover:bg-black/85 transition">
                  작가 등록
                </button>
              </div>

              {/* Search Bar */}
              <div className="px-4 py-2">
                <div className="flex items-center gap-2 rounded-2xl border border-black/10 bg-white px-3.5 py-2 shadow-sm">
                  <Search className="size-4 text-black/40 shrink-0" />
                  <input
                    type="text"
                    value={searchWord}
                    onChange={(e) => setSearchWord(e.target.value)}
                    placeholder="작품, 작가명, 기법 검색..."
                    className="w-full bg-transparent text-xs outline-none placeholder:text-black/40"
                  />
                  {searchWord && (
                    <button
                      onClick={() => setSearchWord('')}
                      className="text-xs text-black/40 hover:text-black"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>

              {/* Category Pills */}
              <div className="flex gap-1.5 overflow-x-auto px-4 py-1.5 scrollbar-none">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold transition-all ${
                      activeCategory === cat
                        ? 'bg-[#181816] text-white shadow-sm'
                        : 'border border-black/10 bg-white text-black/75'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Spotlight Banner (이 주의 주목할 신진 작가 - 이서윤 작가) */}
              <div className="px-4 pt-3">
                <div className="rounded-2xl bg-[#fff8c5] p-4 border border-amber-200/70 shadow-sm">
                  <div className="inline-flex items-center gap-1 rounded-full bg-[#181816] px-2.5 py-0.5 text-[10px] font-semibold text-white">
                    <Sparkles className="size-2.5 text-amber-300" />
                    <span>이 주의 주목할 신진 작가</span>
                  </div>

                  <div className="mt-3 flex items-center gap-3">
                    <div className="size-14 shrink-0 rounded-full overflow-hidden border-2 border-white shadow">
                      <img
                        src={spotlightArtist.avatar}
                        alt={spotlightArtist.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#181816]">
                        {spotlightArtist.name} 작가
                      </h4>
                      <p className="font-serif-kr text-[11px] text-black/75 line-clamp-2 mt-0.5 leading-snug">
                        {spotlightArtist.quote}
                      </p>
                      <button
                        onClick={() => {
                          if (onSelectStory) onSelectStory(CREATION_STORIES[0]);
                        }}
                        className="text-[11px] font-bold text-[#1a56db] mt-1 hover:underline"
                      >
                        작가 스토리 & 창작 일지 보기 →
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* 📖 창작의 과정 (Story) Section */}
              <div className="pt-5 px-4">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 className="font-serif-kr text-sm font-bold text-[#181816]">
                      📖 창작의 과정 (Story)
                    </h3>
                    <p className="text-[10px] text-black/55">완성된 작품 너머의 작업실 이야기</p>
                  </div>
                </div>

                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none">
                  {CREATION_STORIES.map((story) => (
                    <div
                      key={story.id}
                      onClick={() => {
                        if (onSelectStory) onSelectStory(story);
                      }}
                      className="w-[200px] shrink-0 cursor-pointer overflow-hidden rounded-xl border border-black/10 bg-white shadow-sm transition hover:shadow-md"
                    >
                      <div className="relative aspect-[16/10] w-full bg-neutral-200">
                        <img
                          src={story.image}
                          alt={story.title}
                          className="h-full w-full object-cover"
                        />
                        <span className="absolute top-2 left-2 rounded-full bg-black/65 px-2 py-0.5 text-[9px] font-semibold text-white">
                          {story.stage}
                        </span>
                      </div>
                      <div className="p-2.5">
                        <span className="text-[10px] font-bold text-[#1a56db]">
                          {story.artistName}
                        </span>
                        <h5 className="font-serif-kr text-xs font-bold text-[#181816] line-clamp-1 mt-0.5">
                          {story.title}
                        </h5>
                        <p className="text-[10px] text-black/60 line-clamp-2 mt-1 leading-tight">
                          {story.summary}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 🎨 실시간 작품 큐레이션 Section */}
              <div className="pt-4 px-4">
                <div className="mb-2">
                  <h3 className="font-serif-kr text-sm font-bold text-[#181816]">
                    🎨 실시간 작품 큐레이션
                  </h3>
                  <p className="text-[10px] text-black/55">
                    {filtered.length}개의 작품이 전시 중입니다
                  </p>
                </div>

                {/* Artist Feed Item */}
                <div className="space-y-4">
                  {filtered.slice(0, 4).map((item) => {
                    const isFav = favorites.includes(item.id);
                    const isArtFollowed = isFollowed;

                    return (
                      <div
                        key={item.id}
                        className="rounded-2xl border border-black/10 bg-white p-3 shadow-sm"
                      >
                        {/* Artist Subheader */}
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <div className="size-7 rounded-full overflow-hidden border border-black/10">
                              <img
                                src={spotlightArtist.avatar}
                                alt={item.artist}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div>
                              <p className="text-xs font-bold text-[#181816]">{item.artist}</p>
                              <p className="text-[9px] text-black/50">신진 서양화가</p>
                            </div>
                          </div>
                          <button
                            onClick={() => onToggleFollow(item.artistId)}
                            className="flex items-center gap-1 rounded-full border border-black/15 px-2 py-0.5 text-[10px] font-semibold text-[#181816] hover:bg-black/5"
                          >
                            <UserPlus className="size-2.5" />
                            <span>+ 팔로우</span>
                          </button>
                        </div>

                        {/* Image */}
                        <div
                          onClick={() => onSelectArtwork(item)}
                          className="relative aspect-[4/3] w-full cursor-pointer overflow-hidden rounded-xl bg-neutral-100"
                        >
                          <img
                            src={item.image}
                            alt={item.title}
                            className="h-full w-full object-cover"
                          />
                        </div>

                        {/* Title & Info */}
                        <div className="mt-2 flex items-start justify-between">
                          <div>
                            <h4
                              onClick={() => onSelectArtwork(item)}
                              className="cursor-pointer text-xs font-bold text-[#181816] hover:text-[#1a56db]"
                            >
                              {item.title}
                            </h4>
                            <p className="text-[10px] text-black/50 mt-0.5">{item.medium}</p>
                            <p className="text-xs font-bold text-[#181816] mt-1">
                              {item.formattedPrice}
                            </p>
                          </div>
                          <button
                            onClick={() => onToggleFavorite(item.id)}
                            className="p-1 text-black/35 hover:text-red-500"
                          >
                            <Heart
                              className={`size-4 ${
                                isFav ? 'fill-red-500 stroke-red-500' : 'stroke-current'
                              }`}
                            />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Bottom Floating Navigation Capsule & Tool Button (Matches Mockup) */}
            <div className="absolute bottom-4 inset-x-0 z-30 flex items-center justify-center gap-3 pointer-events-none px-4">
              <div className="pointer-events-auto flex items-center gap-4 rounded-full bg-[#181816]/90 px-6 py-2 shadow-xl backdrop-blur-md">
                <button
                  onClick={() => setMobileTab('home')}
                  className={`flex flex-col items-center text-[10px] font-semibold ${
                    mobileTab === 'home' ? 'text-[#38bdf8]' : 'text-white/70'
                  }`}
                >
                  <Home className="size-4" />
                  <span>Home</span>
                </button>
                <button
                  onClick={() => setMobileTab('explore')}
                  className={`flex flex-col items-center text-[10px] font-semibold ${
                    mobileTab === 'explore' ? 'text-[#38bdf8]' : 'text-white/70'
                  }`}
                >
                  <Compass className="size-4" />
                  <span>Explore</span>
                </button>
              </div>

              {/* Blue Floating Action Button (FAB) */}
              <div className="pointer-events-auto flex size-10 items-center justify-center rounded-full bg-[#2563eb] text-white shadow-xl">
                <Settings className="size-4" />
              </div>
            </div>
          </div>
        </div>

        {/* ==================== PHONE 2: Artist Dedicated Profile & Diary ==================== */}
        <div className="flex flex-col items-center">
          <span className="mb-2 text-xs font-semibold text-black/60">
            화면 2: 작가 프로필 & 창작 아카이브 (이서윤 작가)
          </span>

          <div className="relative h-[720px] w-[340px] sm:w-[360px] overflow-hidden rounded-[46px] border-[10px] border-[#181816] bg-[#f7f6f2] shadow-2xl ring-1 ring-black/10">
            {/* Dynamic Island */}
            <div className="absolute top-2.5 left-1/2 -translate-x-1/2 z-30 h-4 w-24 rounded-full bg-[#181816]" />

            {/* iOS Status Bar */}
            <div className="relative z-20 flex h-10 items-center justify-between px-7 pt-2 text-[11px] font-bold text-white">
              <span>21:00</span>
              <div className="flex items-center gap-1.5">
                <Wifi className="size-3" />
                <Battery className="size-3.5 fill-current" />
              </div>
            </div>

            {/* Scrollable Profile Content */}
            <div className="h-[655px] overflow-y-auto pb-24 scrollbar-none text-left">
              {/* Cover Image */}
              <div className="relative -mt-10 h-44 w-full overflow-hidden bg-neutral-800">
                <img
                  src={spotlightArtist.coverImage}
                  alt="cover"
                  className="h-full w-full object-cover opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#f7f6f2] via-transparent to-black/50" />
              </div>

              {/* Profile Header */}
              <div className="px-5 -mt-14 relative z-10">
                <div className="flex items-end justify-between">
                  <div className="size-20 rounded-full overflow-hidden border-4 border-[#f7f6f2] shadow-md bg-white">
                    <img
                      src={spotlightArtist.avatar}
                      alt={spotlightArtist.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <button
                    onClick={() => onToggleFollow(spotlightArtist.id)}
                    className={`rounded-full px-4 py-1.5 text-xs font-bold transition-all shadow-sm ${
                      isFollowed
                        ? 'bg-black/5 border border-black/10 text-black/70'
                        : 'bg-[#181816] text-white hover:bg-black/85'
                    }`}
                  >
                    {isFollowed ? '✓ 팔로잉' : '+ 팔로우'}
                  </button>
                </div>

                <div className="mt-3">
                  <h3 className="font-serif-kr text-lg font-bold text-[#181816]">
                    {spotlightArtist.name}
                  </h3>
                  <p className="text-xs text-black/55">{spotlightArtist.category}</p>
                </div>

                <p className="font-serif-kr text-xs text-black/80 mt-2 leading-relaxed">
                  {spotlightArtist.bio}
                </p>

                {/* Followers & Counts */}
                <div className="mt-4 flex items-center gap-5 border-y border-black/10 py-2.5 text-xs">
                  <div>
                    <span className="font-bold text-[#181816]">{spotlightArtist.followers}</span>
                    <span className="text-black/50 ml-1">팔로워</span>
                  </div>
                  <div>
                    <span className="font-bold text-[#181816]">
                      {spotlightArtist.artworksCount}
                    </span>
                    <span className="text-black/50 ml-1">작품</span>
                  </div>
                  <div>
                    <span className="font-bold text-[#181816]">
                      {spotlightArtist.exhibitionsCount}
                    </span>
                    <span className="text-black/50 ml-1">전시</span>
                  </div>
                </div>

                {/* Sub-tabs */}
                <div className="mt-3 flex border-b border-black/10 text-xs font-semibold">
                  {(['작품', '창작일지', '소개', '전시'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setProfileTab(tab as any)}
                      className={`flex-1 pb-2 transition-colors ${
                        profileTab === (tab as any)
                          ? 'border-b-2 border-[#181816] text-[#181816]'
                          : 'text-black/45'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {/* Artwork Grid in Profile */}
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {artistArtworks.slice(0, 4).map((item) => (
                    <div
                      key={item.id}
                      onClick={() => onSelectArtwork(item)}
                      className="cursor-pointer overflow-hidden rounded-xl border border-black/10 bg-white p-1.5 shadow-sm"
                    >
                      <div className="aspect-square w-full overflow-hidden rounded-lg bg-neutral-100">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <p className="mt-1 truncate text-xs font-bold text-[#181816]">
                        {item.title}
                      </p>
                      <p className="text-[10px] font-bold text-[#181816]/75">
                        {item.formattedPrice}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
