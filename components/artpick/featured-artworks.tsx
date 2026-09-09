'use client';

import { useState } from 'react';
import { Heart, ArrowRight } from 'lucide-react';
import { CATEGORIES, Artwork } from '@/lib/artpick-data';

interface FeaturedArtworksProps {
  artworks: Artwork[];
  favorites: number[];
  onToggleFavorite: (id: number) => void;
  onSelectArtwork: (artwork: Artwork) => void;
  onSelectArtist: (artistId: string) => void;
  onViewAllClick: () => void;
}

export function FeaturedArtworks({
  artworks,
  favorites,
  onToggleFavorite,
  onSelectArtwork,
  onSelectArtist,
  onViewAllClick,
}: FeaturedArtworksProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('전체');

  const filteredArtworks = artworks.filter((item) => {
    if (selectedCategory === '전체') return true;
    return item.category === selectedCategory;
  });

  return (
    <section className="py-14 md:py-20 bg-[#f7f6f2]">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        {/* Section Header: Title & "더보기 ->" */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-serif-kr text-2xl font-bold tracking-tight text-[#181816] sm:text-3xl">
              주목할 만한 작품
            </h2>
          </div>

          <button
            onClick={onViewAllClick}
            className="group flex items-center gap-1.5 text-xs font-medium text-black/60 transition hover:text-black sm:text-sm"
          >
            <span>더보기</span>
            <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>

        {/* Category Filter Pills */}
        <div className="mt-6 flex gap-2 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
                  isSelected
                    ? 'bg-[#1a56db] text-white shadow-sm'
                    : 'border border-black/10 bg-white/70 text-black/75 hover:border-black/25 hover:bg-white'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Artwork Grid (Custom responsive layout matching the reference mockup) */}
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filteredArtworks.map((item, idx) => {
            const isFav = favorites.includes(item.id);
            // In the reference image, the first item (김서영 - 푸른 하루) is displayed in a taller aspect ratio
            const isTall = idx === 0 && selectedCategory === '전체';

            return (
              <div
                key={item.id}
                className={`group flex flex-col justify-between rounded-2xl bg-transparent transition-all duration-300 ${
                  isTall ? 'sm:col-span-1 lg:row-span-2' : ''
                }`}
              >
                {/* Artwork Image Container */}
                <div
                  onClick={() => onSelectArtwork(item)}
                  className={`relative cursor-pointer overflow-hidden rounded-xl bg-neutral-200 shadow-sm transition-all duration-500 group-hover:shadow-md ${
                    isTall
                      ? 'aspect-[3/4] lg:h-[510px]'
                      : item.aspect || 'aspect-[4/3]'
                  }`}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/[0.03]" />
                </div>

                {/* Info and Favorite Row */}
                <div className="pt-3.5 pb-1 flex items-start justify-between">
                  <div className="flex-1 pr-2">
                    <button
                      onClick={() => onSelectArtist(item.artistId)}
                      className="text-xs font-medium text-black/55 hover:text-black hover:underline focus:outline-none transition-colors"
                    >
                      {item.artist}
                    </button>
                    <h3
                      onClick={() => onSelectArtwork(item)}
                      className="cursor-pointer text-sm font-semibold tracking-tight text-[#181816] hover:text-[#1a56db] transition-colors"
                    >
                      {item.title}
                    </h3>
                    <p className="mt-1 text-xs font-bold text-[#181816]/90">
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
          <div className="py-20 text-center">
            <p className="text-sm text-black/40">선택한 카테고리의 작품이 없습니다.</p>
          </div>
        )}
      </div>
    </section>
  );
}
