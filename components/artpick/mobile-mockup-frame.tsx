'use client';

import { useState } from 'react';
import {
  Search,
  Bell,
  Heart,
  Home,
  PlusCircle,
  User,
  ArrowLeft,
  MoreHorizontal,
  Wifi,
  Battery,
  X,
} from 'lucide-react';
import { Artwork, Artist } from '@/lib/artpick-data';

interface MobileMockupFrameProps {
  artworks: Artwork[];
  artist: Artist;
  favorites: number[];
  onToggleFavorite: (id: number) => void;
  onSelectArtwork: (artwork: Artwork) => void;
  isFollowed: boolean;
  onToggleFollow: (id: string) => void;
  onClose?: () => void;
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
}: MobileMockupFrameProps) {
  const [activeCategory, setActiveCategory] = useState('전체');
  const [activeTab, setActiveTab] = useState<'home' | 'search' | 'upload' | 'likes' | 'my'>('home');
  const [profileTab, setProfileTab] = useState<'작품' | '소개' | '전시' | '소식'>('작품');
  const [searchWord, setSearchWord] = useState('');

  const categories = ['전체', '회화', '사진', '일러스트', '조각'];

  const filtered = artworks.filter((item) => {
    if (activeCategory !== '전체' && item.category !== activeCategory) return false;
    if (searchWord && !item.title.includes(searchWord) && !item.artist.includes(searchWord))
      return false;
    return true;
  });

  const artistArtworks = artworks.filter((item) => item.artistId === artist.id);

  return (
    <div className="relative py-12 px-4 bg-[#edebe4]/70 border-b border-black/10">
      {/* Top Banner with Close button */}
      <div className="mx-auto max-w-6xl mb-8 flex items-center justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#1a56db]">
            Design System Mockup
          </span>
          <h2 className="font-serif-kr text-2xl font-bold text-[#181816]">
            모바일 화면 시뮬레이터 (Dual Screen)
          </h2>
          <p className="text-xs text-black/60 mt-1">
            디자인 시안에 포함된 2종의 모바일 화면(홈 탐색 피드 & 작가 프로필)을 실시간으로 조작해볼 수 있습니다.
          </p>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 rounded-full border border-black/15 bg-white px-3.5 py-1.5 text-xs font-semibold text-black/70 hover:bg-black/5"
          >
            <X className="size-3.5" />
            목업 뷰 닫기
          </button>
        )}
      </div>

      {/* Dual Phone Wrapper */}
      <div className="mx-auto flex flex-wrap items-center justify-center gap-8 lg:gap-14">
        {/* ==================== PHONE 1: Home / Discovery Feed ==================== */}
        <div className="flex flex-col items-center">
          <span className="mb-3 text-xs font-semibold text-black/60">
            화면 1: 모바일 홈 & 피드 탐색
          </span>

          <div className="relative h-[680px] w-[320px] sm:w-[340px] overflow-hidden rounded-[44px] border-[8px] border-[#181816] bg-[#f7f6f2] shadow-2xl ring-1 ring-black/10">
            {/* Speaker & Dynamic Island Notch */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 z-30 h-4 w-24 rounded-full bg-[#181816]" />

            {/* iOS Status Bar */}
            <div className="relative z-20 flex h-9 items-center justify-between px-6 pt-1 text-[11px] font-semibold text-black">
              <span>9:41</span>
              <div className="flex items-center gap-1.5">
                <Wifi className="size-3" />
                <Battery className="size-3.5" />
              </div>
            </div>

            {/* App Header */}
            <div className="px-5 pt-2 pb-2 flex items-center justify-between">
              <span className="font-cinzel text-lg font-bold tracking-widest text-[#181816]">
                ARTPICK
              </span>
              <button className="relative text-black/75">
                <Bell className="size-4" />
                <span className="absolute -top-0.5 -right-0.5 size-1.5 rounded-full bg-[#1a56db]" />
              </button>
            </div>

            {/* Search Input Bar */}
            <div className="px-4 py-1.5">
              <div className="flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-1.5 shadow-sm">
                <Search className="size-3.5 text-black/40" />
                <input
                  type="text"
                  value={searchWord}
                  onChange={(e) => setSearchWord(e.target.value)}
                  placeholder="작품, 작가, 키워드를 검색해보세요."
                  className="w-full bg-transparent text-[11px] outline-none placeholder:text-black/40"
                />
              </div>
            </div>

            {/* Category Pills */}
            <div className="flex gap-1.5 overflow-x-auto px-4 py-2 scrollbar-none">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`shrink-0 rounded-full px-3 py-1 text-[11px] font-medium transition-all ${
                    activeCategory === cat
                      ? 'bg-[#1a56db] text-white'
                      : 'border border-black/10 bg-white text-black/70'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Scrollable Artworks 2-Column Feed */}
            <div className="h-[460px] overflow-y-auto px-4 pt-1 pb-16 scrollbar-none">
              <div className="grid grid-cols-2 gap-2.5">
                {filtered.map((item) => {
                  const isFav = favorites.includes(item.id);
                  return (
                    <div
                      key={item.id}
                      className="group rounded-xl bg-white p-1.5 shadow-sm transition hover:shadow text-left"
                    >
                      <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-neutral-200">
                        <button
                          type="button"
                          onClick={() => onSelectArtwork(item)}
                          className="h-full w-full block focus:outline-none"
                          aria-label={`${item.title} 작품 상세 보기`}
                        >
                          <img
                            src={item.image}
                            alt={item.title}
                            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                          />
                        </button>
                        <button
                          type="button"
                          onClick={() => onToggleFavorite(item.id)}
                          aria-label={isFav ? '좋아요 취소' : '좋아요'}
                          className={`absolute top-1.5 right-1.5 grid size-6 place-items-center rounded-full bg-white/80 backdrop-blur-sm ${
                            isFav ? 'text-red-500' : 'text-black/40'
                          }`}
                        >
                          <Heart
                            className={`size-3.5 ${
                              isFav ? 'fill-red-500 stroke-red-500' : 'stroke-current'
                            }`}
                          />
                        </button>
                      </div>

                      <div className="pt-1.5 px-0.5">
                        <p className="truncate text-[10px] text-black/50">{item.artist}</p>
                        <button
                          type="button"
                          onClick={() => onSelectArtwork(item)}
                          className="truncate text-[11px] font-semibold text-[#181816] text-left hover:underline focus:outline-none"
                        >
                          {item.title}
                        </button>
                        <p className="mt-0.5 text-[11px] font-bold text-[#181816]">
                          {item.formattedPrice}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Mobile Bottom Navigation Bar */}
            <div className="absolute bottom-0 left-0 right-0 z-20 flex h-14 items-center justify-around border-t border-black/10 bg-white/95 px-2 backdrop-blur-md">
              <button
                onClick={() => setActiveTab('home')}
                className={`flex flex-col items-center text-[10px] ${
                  activeTab === 'home' ? 'font-bold text-[#1a56db]' : 'text-black/45'
                }`}
              >
                <Home className="size-4" />
                <span className="mt-0.5">홈</span>
              </button>
              <button
                onClick={() => setActiveTab('search')}
                className={`flex flex-col items-center text-[10px] ${
                  activeTab === 'search' ? 'font-bold text-[#1a56db]' : 'text-black/45'
                }`}
              >
                <Search className="size-4" />
                <span className="mt-0.5">탐색</span>
              </button>
              <button
                onClick={() => setActiveTab('upload')}
                className={`flex flex-col items-center text-[10px] ${
                  activeTab === 'upload' ? 'font-bold text-[#1a56db]' : 'text-black/45'
                }`}
              >
                <PlusCircle className="size-4" />
                <span className="mt-0.5">등록</span>
              </button>
              <button
                onClick={() => setActiveTab('likes')}
                className={`flex flex-col items-center text-[10px] ${
                  activeTab === 'likes' ? 'font-bold text-[#1a56db]' : 'text-black/45'
                }`}
              >
                <Heart className="size-4" />
                <span className="mt-0.5">좋아요</span>
              </button>
              <button
                onClick={() => setActiveTab('my')}
                className={`flex flex-col items-center text-[10px] ${
                  activeTab === 'my' ? 'font-bold text-[#1a56db]' : 'text-black/45'
                }`}
              >
                <User className="size-4" />
                <span className="mt-0.5">마이</span>
              </button>
            </div>
          </div>
        </div>

        {/* ==================== PHONE 2: Artist Profile (@seoyoung_kim) ==================== */}
        <div className="flex flex-col items-center">
          <span className="mb-3 text-xs font-semibold text-black/60">
            화면 2: 작가 프로필 & 컬렉션
          </span>

          <div className="relative h-[680px] w-[320px] sm:w-[340px] overflow-hidden rounded-[44px] border-[8px] border-[#181816] bg-white shadow-2xl ring-1 ring-black/10">
            {/* Speaker & Notch */}
            <div className="absolute top-2 left-1/2 -translate-x-1/2 z-30 h-4 w-24 rounded-full bg-[#181816]" />

            {/* iOS Status Bar */}
            <div className="relative z-20 flex h-9 items-center justify-between px-6 pt-1 text-[11px] font-semibold text-white">
              <span>9:41</span>
              <div className="flex items-center gap-1.5">
                <Wifi className="size-3" />
                <Battery className="size-3.5" />
              </div>
            </div>

            {/* Top Bar with Back and Menu */}
            <div className="relative z-10 -mt-9 flex h-14 items-center justify-between px-4 text-white">
              <button className="grid size-7 place-items-center rounded-full bg-black/30 backdrop-blur-sm">
                <ArrowLeft className="size-4" />
              </button>
              <button className="grid size-7 place-items-center rounded-full bg-black/30 backdrop-blur-sm">
                <MoreHorizontal className="size-4" />
              </button>
            </div>

            {/* Banner Cover */}
            <div className="relative -mt-14 h-32 w-full overflow-hidden bg-neutral-800">
              <img
                src={artist.coverImage}
                alt={artist.name}
                className="h-full w-full object-cover brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-white" />
            </div>

            {/* Profile Info */}
            <div className="relative -mt-10 px-4">
              <div className="flex items-end justify-between">
                <div className="relative size-16 overflow-hidden rounded-full border-2 border-white shadow-md">
                  <img
                    src={artist.avatar}
                    alt={artist.name}
                    className="h-full w-full object-cover"
                  />
                </div>

                <button
                  onClick={() => onToggleFollow(artist.id)}
                  className={`rounded-full px-4 py-1.5 text-xs font-semibold shadow-sm transition-all ${
                    isFollowed
                      ? 'border border-black/15 bg-white text-black'
                      : 'bg-[#1a56db] text-white hover:bg-[#1545b3]'
                  }`}
                >
                  {isFollowed ? '팔로잉' : '팔로우'}
                </button>
              </div>

              <div className="mt-2">
                <h3 className="font-serif-kr text-lg font-bold text-[#181816]">{artist.name}</h3>
                <p className="text-[10px] text-black/50">{artist.handle}</p>
              </div>

              {/* Stats */}
              <div className="mt-2.5 flex items-center gap-6 border-b border-black/[0.06] pb-2.5 text-center text-xs">
                <div>
                  <b className="text-[#181816]">{isFollowed ? '1.2만+' : artist.followers}</b>
                  <span className="block text-[10px] text-black/50">팔로워</span>
                </div>
                <div>
                  <b className="text-[#181816]">{artistArtworks.length}</b>
                  <span className="block text-[10px] text-black/50">작품</span>
                </div>
                <div>
                  <b className="text-[#181816]">{artist.exhibitionsCount}</b>
                  <span className="block text-[10px] text-black/50">전시</span>
                </div>
              </div>

              {/* Bio Statement */}
              <p className="mt-2 text-[10px] leading-relaxed text-black/75">
                {artist.bio}
              </p>
              <p className="mt-1 text-[9px] italic text-black/50 font-serif-kr">
                {artist.quote}
              </p>

              {/* Tabs */}
              <div className="mt-2.5 flex border-b border-black/[0.08] text-[11px] font-semibold">
                {(['작품', '소개', '전시', '소식'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setProfileTab(tab)}
                    className={`flex-1 py-1.5 text-center transition ${
                      profileTab === tab
                        ? 'border-b-2 border-[#1a56db] text-[#1a56db]'
                        : 'text-black/45'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* 3x3 Artwork Thumbnails Grid */}
            <div className="h-[210px] overflow-y-auto px-4 pt-2 pb-6 scrollbar-none">
              {profileTab === '작품' && (
                <div className="grid grid-cols-3 gap-1.5">
                  {artistArtworks.map((item) => (
                    <button
                      type="button"
                      key={item.id}
                      onClick={() => onSelectArtwork(item)}
                      aria-label={`${item.title} 작품 보기`}
                      className="group cursor-pointer overflow-hidden rounded-md bg-neutral-100 shadow-sm focus:outline-none"
                    >
                      <div className="aspect-square w-full overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-full w-full object-cover transition group-hover:scale-105"
                        />
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {profileTab === '소개' && (
                <div className="p-2 text-[10px] leading-relaxed text-black/70 bg-[#f7f6f2] rounded-lg">
                  일상 속에서 마주하는 빛과 색채의 찰나를 캔버스에 기록하는 서양화가 김서영입니다.
                </div>
              )}

              {profileTab === '전시' && (
                <div className="space-y-1.5 text-[10px]">
                  {artist.exhibitions.map((ex, i) => (
                    <div key={i} className="rounded border border-black/5 bg-[#f7f6f2] p-1.5">
                      <b className="text-[#1a56db]">{ex.year}</b> {ex.title}
                      <p className="text-[9px] text-black/50">{ex.location}</p>
                    </div>
                  ))}
                </div>
              )}

              {profileTab === '소식' && (
                <div className="space-y-1.5 text-[10px]">
                  {artist.news.map((item, i) => (
                    <div key={i} className="rounded border border-black/5 bg-[#f7f6f2] p-1.5">
                      <b>{item.title}</b>
                      <p className="text-[9px] text-black/50">{item.date}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
