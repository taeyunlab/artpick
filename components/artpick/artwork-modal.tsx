'use client';

import { Heart, Check, X, ShieldCheck, Share2, Sparkles } from 'lucide-react';
import { Artwork } from '@/lib/artpick-data';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';

interface ArtworkModalProps {
  artwork: Artwork | null;
  isOpen: boolean;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
  onSelectArtist: (artistId: string) => void;
  onInquire: (artwork: Artwork) => void;
}

export function ArtworkModal({
  artwork,
  isOpen,
  onClose,
  isFavorite,
  onToggleFavorite,
  onSelectArtist,
  onInquire,
}: ArtworkModalProps) {
  if (!artwork) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl overflow-hidden rounded-[24px] border-none p-0 shadow-2xl sm:max-w-4xl">
        <DialogTitle className="sr-only">{artwork.title} - {artwork.artist}</DialogTitle>
        <div className="grid grid-cols-1 bg-[#f7f6f2] md:grid-cols-[1.1fr_0.9fr]">
          {/* Left: Full Artwork Image */}
          <div className="relative flex items-center justify-center bg-neutral-900/5 p-6 md:p-10">
            <img
              src={artwork.image}
              alt={artwork.title}
              className="max-h-[65vh] w-auto rounded-lg object-contain shadow-xl"
            />
            <div className="absolute top-4 left-4 rounded-full bg-black/60 px-3 py-1 text-[11px] font-medium text-white backdrop-blur-sm">
              {artwork.category}
            </div>
          </div>

          {/* Right: Artwork Metadata & Inquiry */}
          <div className="flex flex-col justify-between p-6 md:p-8">
            <div>
              {/* Artist Link */}
              <div className="flex items-center justify-between">
                <button
                  onClick={() => {
                    onClose();
                    onSelectArtist(artwork.artistId);
                  }}
                  className="group flex items-center gap-2 text-left"
                >
                  <span className="text-sm font-semibold text-black/70 group-hover:text-[#1a56db] transition-colors">
                    {artwork.artist}
                  </span>
                  <span className="text-xs text-black/40">{artwork.artistHandle}</span>
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onToggleFavorite(artwork.id)}
                    aria-label="좋아요"
                    className={`grid size-8 place-items-center rounded-full border border-black/10 transition hover:bg-white ${
                      isFavorite ? 'text-red-500' : 'text-black/50'
                    }`}
                  >
                    <Heart
                      className={`size-4 ${
                        isFavorite ? 'fill-red-500 stroke-red-500' : 'stroke-current'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Title & Price */}
              <h2 className="mt-3 font-serif-kr text-2xl font-bold tracking-tight text-[#181816] md:text-3xl">
                {artwork.title}
              </h2>
              <div className="mt-2 text-xl font-bold text-[#1a56db]">
                {artwork.formattedPrice}
              </div>

              {/* Artwork Specs */}
              <div className="mt-5 space-y-2 border-y border-black/10 py-4 text-xs">
                <div className="flex justify-between">
                  <span className="text-black/50">크기 (규격)</span>
                  <span className="font-medium text-black/85">{artwork.dimensions}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-black/50">재료 및 기법</span>
                  <span className="font-medium text-black/85">{artwork.medium}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-black/50">제작 연도</span>
                  <span className="font-medium text-black/85">{artwork.year}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-black/50">진품 보증</span>
                  <span className="flex items-center gap-1 font-medium text-black/85">
                    <ShieldCheck className="size-3.5 text-emerald-600" />
                    작가 친필 서명 및 ARTPICK 보증서 포함
                  </span>
                </div>
              </div>

              {/* Description */}
              <div className="mt-5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-black/40">
                  작품 설명
                </h4>
                <p className="mt-2 text-xs leading-relaxed text-black/70">
                  {artwork.description}
                </p>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-8 flex flex-col gap-2.5">
              <Button
                onClick={() => onInquire(artwork)}
                className="h-11 w-full rounded-full bg-[#1a56db] text-sm font-medium text-white shadow-sm hover:bg-[#1545b3]"
              >
                소장 및 구매 문의하기
              </Button>
              <button
                onClick={() => {
                  onClose();
                  onSelectArtist(artwork.artistId);
                }}
                className="w-full rounded-full border border-black/15 py-2.5 text-xs font-semibold text-black/75 transition hover:bg-white"
              >
                {artwork.artist} 작가의 다른 작품 보기
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
