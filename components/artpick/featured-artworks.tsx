'use client';

import { useState } from 'react';
import { Heart, ArrowRight, UserPlus, Check } from 'lucide-react';
import { CATEGORIES, Artwork, ARTISTS_DATA } from '@/lib/artpick-data';

interface FeaturedArtworksProps {
  artworks: Artwork[];
  favorites: number[];
  onToggleFavorite: (id: number) => void;
  onSelectArtwork: (artwork: Artwork) => void;
  onSelectArtist: (artistId: string) => void;
  onViewAllClick: () => void;
  followedArtists?: string[];
  onToggleFollow?: (artistId: string) => void;
}

export function FeaturedArtworks({
  artworks,
  favorites,
  onToggleFavorite,
  onSelectArtwork,
  onSelectArtist,
  onViewAllClick,
  followedArtists = [],
  onToggleFollow,
}: FeaturedArtworksProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');

  const filteredArtworks = artworks.filter((item) => {
    if (selectedCategory === '전체') return true;
    return item.category === selectedCategory;
  });

  return (
    <section className="py-8 sm:py-12 bg-[#f7f6f2]">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 md:px-10">
        {/* Category Filter Pills (Matches mockup style: Black active pill) */}
        <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                  isSelected
                    ? 'bg-[#181816] text-white shadow-sm'
                    : 'border border-black/10 bg-white text-black/75 hover:border-black/25'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Section Header (Matches mockup: "🎨 실시간 작품 큐레이션") */}
        <div className="mt-4 flex items-end justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl">🎨</span>
              <h2 className="font-serif-kr text-xl sm:text-2xl font-bold tracking-tight text-[#181816]">
                실시간 작품 큐레이션
              </h2>
            </div>
            <p className="mt-1 text-xs sm:text-sm text-black/60">
              {filteredArtworks.length}개의 작품이 전시 중입니다
            </p>
          </div>

          <button
            onClick={onViewAllClick}
            className="group flex items-center gap-1.5 text-xs font-medium text-black/60 transition hover:text-black sm:text-sm"
          >
            <span>전체보기</span>
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>

        {/* Artwork Feed Grid */}
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredArtworks.map((item) => {
            const isFav = favorites.includes(item.id);
            const artist = ARTISTS_DATA[item.artistId];
            const isFollowed = followedArtists.includes(item.artistId);

            return (
              <div
                key={item.id}
                className="group flex flex-col justify-between rounded-2xl bg-white border border-black/10 p-3 sm:p-4 shadow-sm transition-all duration-300 hover:shadow-md"
              >
                {/* Artist Header Row (Matches mockup: Avatar + Name + Follow Button) */}
                <div className="flex items-center justify-between mb-3">
                  <div
                    onClick={() => onSelectArtist(item.artistId)}
                    className="flex items-center gap-2.5 cursor-pointer group/artist"
                  >
                    <div className="size-9 rounded-full overflow-hidden border border-black/10">
                      <img
                        src={artist?.avatar || item.image}
                        alt={item.artist}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-[#181816] group-hover/artist:text-[#1a56db] transition-colors">
                        {item.artist}
                      </h4>
                      <p className="text-[10px] sm:text-[11px] text-black/50">
                        {artist?.category || item.category}
                      </p>
                    </div>
                  </div>

                  {onToggleFollow && (
                    <button
                      onClick={() => onToggleFollow(item.artistId)}
                      className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold transition-all ${
                        isFollowed
                          ? 'bg-black/5 text-black/70 border border-black/10'
                          : 'border border-black/20 bg-white text-[#181816] hover:bg-black/5'
                      }`}
                    >
                      {isFollowed ? (
                        <>
                          <Check className="size-3 text-[#1a56db]" />
                          <span>팔로잉</span>
                        </>
                      ) : (
                        <>
                          <UserPlus className="size-3" />
                          <span>팔로우</span>
                        </>
                      )}
                    </button>
                  )}
                </div>

                {/* Artwork Image Container */}
                <div
                  onClick={() => onSelectArtwork(item)}
                  className="relative cursor-pointer overflow-hidden rounded-xl bg-neutral-100 aspect-[4/3] shadow-sm transition-all group-hover:shadow-md"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/[0.03]" />

                  {/* Medium tag on bottom left */}
                  <div className="absolute bottom-2 left-2 rounded-md bg-black/60 backdrop-blur-md px-2 py-0.5 text-[10px] text-white/90">
                    {item.category}
                  </div>
                </div>

                {/* Info and Favorite Row */}
                <div className="pt-3 flex items-start justify-between">
                  <div className="flex-1 pr-2">
                    <h3
                      onClick={() => onSelectArtwork(item)}
                      className="cursor-pointer text-sm font-bold tracking-tight text-[#181816] hover:text-[#1a56db] transition-colors"
                    >
                      {item.title}
                    </h3>
                    <p className="text-[11px] text-black/55 mt-0.5 line-clamp-1">
                      {item.medium}
                    </p>
                    <p className="mt-1.5 text-xs font-bold text-[#181816]">
                      {item.formattedPrice}
                    </p>
                  </div>

                  {/* Heart (Like) Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleFavorite(item.id);
                    }}
                    aria-label={isFav ? '좋아요 취소' : '좋아요'}
                    className={`mt-1 grid size-8 place-items-center rounded-full transition-all ${
                      isFav
                        ? 'text-red-500 hover:scale-110'
                        : 'text-black/35 hover:text-red-500 hover:scale-110'
                    }`}
                  >
                    <Heart
                      className={`size-4 transition-all ${
                        isFav ? 'fill-red-500 stroke-red-500' : 'stroke-current'
                      }`}
                    />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filteredArtworks.length === 0 && (
          <div className="py-16 text-center">
            <p className="text-sm text-black/40">선택한 카테고리의 작품이 없습니다.</p>
          </div>
        )}
      </div>
    </section>
  );
}
