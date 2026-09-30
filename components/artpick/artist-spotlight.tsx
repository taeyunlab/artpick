'use client';

import { Sparkles, ArrowRight } from 'lucide-react';
import { ARTISTS_DATA } from '@/lib/artpick-data';

interface ArtistSpotlightProps {
  onSelectArtist: (artistId: string) => void;
  onOpenStory?: () => void;
}

export function ArtistSpotlight({ onSelectArtist, onOpenStory }: ArtistSpotlightProps) {
  const artist = ARTISTS_DATA.seoyun_lee || ARTISTS_DATA.seoyoung_kim;

  return (
    <section className="mx-auto max-w-[1400px] px-4 sm:px-6 md:px-10 pt-2 pb-6">
      <div className="relative overflow-hidden rounded-3xl bg-[#fff8c5] p-5 sm:p-7 md:p-9 shadow-sm transition-all hover:shadow-md border border-amber-200/60">
        {/* Top Badge */}
        <div className="inline-flex items-center gap-1.5 rounded-full bg-[#181816] px-3.5 py-1 text-[11px] sm:text-xs font-semibold text-white shadow-sm">
          <Sparkles className="size-3 text-amber-300" />
          <span>이 주의 주목할 신진 작가</span>
        </div>

        {/* Artist Profile & Quote */}
        <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
          {/* Avatar with soft glow */}
          <div
            onClick={() => onSelectArtist(artist.id)}
            className="group relative cursor-pointer shrink-0"
          >
            <div className="size-20 sm:size-24 rounded-full overflow-hidden border-2 border-white shadow-md transition-transform group-hover:scale-105">
              <img
                src={artist.avatar}
                alt={artist.name}
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* Texts */}
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2">
              <h3
                onClick={() => onSelectArtist(artist.id)}
                className="font-serif-kr text-xl sm:text-2xl font-bold text-[#181816] cursor-pointer hover:underline"
              >
                {artist.name} 작가
              </h3>
              <span className="rounded-full bg-black/5 px-2.5 py-0.5 text-[11px] font-medium text-black/60">
                {artist.category}
              </span>
            </div>

            <p className="font-serif-kr text-sm sm:text-base text-black/80 leading-relaxed italic">
              {artist.quote}
            </p>

            {/* Action Links */}
            <div className="pt-1 flex flex-wrap items-center gap-4">
              <button
                onClick={() => {
                  if (onOpenStory) {
                    onOpenStory();
                  } else {
                    onSelectArtist(artist.id);
                  }
                }}
                className="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#1a56db] transition hover:text-[#1442a8]"
              >
                <span>작가 스토리 & 창작 일지 보기</span>
                <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => onSelectArtist(artist.id)}
                className="text-xs text-black/55 hover:text-black hover:underline"
              >
                프로필 & 전체 작품 →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
