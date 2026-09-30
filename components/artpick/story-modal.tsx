'use client';

import { X, Calendar, Clock, Palette, Sparkles, ExternalLink, ArrowRight } from 'lucide-react';
import { CreationStory, Artwork } from '@/lib/artpick-data';

interface StoryModalProps {
  story: CreationStory | null;
  isOpen: boolean;
  onClose: () => void;
  onViewArtwork?: (artworkId: number) => void;
  onSelectArtist?: (artistId: string) => void;
}

export function StoryModal({
  story,
  isOpen,
  onClose,
  onViewArtwork,
  onSelectArtist,
}: StoryModalProps) {
  if (!isOpen || !story) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 overflow-y-auto bg-black/60 backdrop-blur-sm transition-opacity">
      <div
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#f7f6f2] p-6 sm:p-8 shadow-2xl transition-all border border-black/10 scrollbar-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-10 flex size-9 items-center justify-center rounded-full bg-white/90 border border-black/10 text-black/70 hover:bg-black/10 hover:text-black transition"
          aria-label="닫기"
        >
          <X className="size-4" />
        </button>

        {/* Stage Badge & Date */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="rounded-full bg-[#181816] px-3 py-1 font-semibold text-white">
            {story.stage}
          </span>
          <span className="flex items-center gap-1 text-black/55">
            <Calendar className="size-3" />
            {story.date}
          </span>
          <span className="flex items-center gap-1 text-black/55">
            <Clock className="size-3" />
            {story.fullLog.duration}
          </span>
        </div>

        {/* Artist Header */}
        <div className="mt-4 flex items-center justify-between border-b border-black/10 pb-4">
          <div
            onClick={() => {
              if (onSelectArtist) {
                onClose();
                onSelectArtist(story.artistId);
              }
            }}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="size-11 rounded-full overflow-hidden border border-black/10">
              <img
                src={story.image}
                alt={story.artistName}
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <h4 className="font-bold text-sm sm:text-base text-[#181816] group-hover:text-[#1a56db] transition-colors">
                {story.artistName}
              </h4>
              <p className="text-xs text-black/50">{story.artistRole || '신진 작가'}</p>
            </div>
          </div>
        </div>

        {/* Title & Cover Image */}
        <h2 className="mt-4 font-serif-kr text-xl sm:text-2xl font-bold text-[#181816] leading-snug">
          {story.title}
        </h2>

        <div className="mt-4 overflow-hidden rounded-2xl border border-black/10 shadow-sm aspect-[16/10] bg-neutral-200">
          <img
            src={story.image}
            alt={story.title}
            className="h-full w-full object-cover"
          />
        </div>

        {/* Materials Chips */}
        {story.fullLog.materials && story.fullLog.materials.length > 0 && (
          <div className="mt-5 rounded-2xl bg-white/80 p-4 border border-black/5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#181816] mb-2">
              <Palette className="size-3.5 text-[#1a56db]" />
              <span>사용된 주요 재료 및 기법</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {story.fullLog.materials.map((mat, idx) => (
                <span
                  key={idx}
                  className="rounded-full bg-black/5 px-2.5 py-1 text-[11px] font-medium text-black/75"
                >
                  {mat}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Timeline Steps */}
        <div className="mt-6 space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-black/45">
            작업 단계별 기록 (Process Log)
          </h3>
          <div className="space-y-3">
            {story.fullLog.steps.map((step) => (
              <div
                key={step.step}
                className="flex items-start gap-3 rounded-2xl bg-white p-4 border border-black/5 shadow-sm"
              >
                <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#1a56db] text-xs font-bold text-white">
                  {step.step}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#181816]">{step.title}</h4>
                  <p className="mt-1 text-xs text-black/70 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Artist's Note Quote */}
        {story.fullLog.artistNote && (
          <div className="mt-6 rounded-2xl bg-[#fef9c3] p-5 border border-amber-200">
            <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900 mb-1">
              <Sparkles className="size-3.5" />
              <span>작가의 고뇌와 기록 노트</span>
            </div>
            <p className="font-serif-kr text-xs sm:text-sm text-amber-950 leading-relaxed italic">
              "{story.fullLog.artistNote}"
            </p>
          </div>
        )}

        {/* Bottom Cross-link CTA: Connect to Finished Artwork */}
        {story.artworkId && onViewArtwork && (
          <div className="mt-6 pt-4 border-t border-black/10 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              <p className="text-xs text-black/55">이 과정을 거쳐 탄생한 작품이 궁금하신가요?</p>
              <span className="text-xs font-bold text-[#181816]">완성작 정보 및 소장 문의</span>
            </div>
            <button
              onClick={() => {
                onClose();
                onViewArtwork(story.artworkId!);
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#181816] px-5 py-2.5 text-xs font-bold text-white shadow-md hover:bg-black/85 transition"
            >
              <span>완성작 보러가기</span>
              <ArrowRight className="size-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
