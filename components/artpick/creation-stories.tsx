'use client';

import { useRef } from 'react';
import { ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';
import { CreationStory, CREATION_STORIES } from '@/lib/artpick-data';

interface CreationStoriesProps {
  onSelectStory: (story: CreationStory) => void;
  stories?: CreationStory[];
}

export function CreationStories({ onSelectStory, stories = CREATION_STORIES }: CreationStoriesProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -340 : 340;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="mx-auto max-w-[1400px] px-4 sm:px-6 md:px-10 py-6 sm:py-8">
      {/* Section Header */}
      <div className="flex items-end justify-between mb-4 sm:mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl sm:text-2xl">📖</span>
            <h2 className="font-serif-kr text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-[#181816]">
              창작의 과정 <span className="font-sans text-base sm:text-lg font-semibold text-black/60">(Story)</span>
            </h2>
          </div>
          <p className="mt-1 text-xs sm:text-sm text-black/65">
            완성된 작품 너머의 작업실 이야기
          </p>
        </div>

        {/* Scroll Arrows */}
        <div className="hidden sm:flex items-center gap-1.5">
          <button
            onClick={() => scroll('left')}
            className="flex size-8 items-center justify-center rounded-full border border-black/15 bg-white text-black/70 hover:bg-black/5 hover:text-black transition"
            aria-label="이전 이야기"
          >
            <ChevronLeft className="size-4" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="flex size-8 items-center justify-center rounded-full border border-black/15 bg-white text-black/70 hover:bg-black/5 hover:text-black transition"
            aria-label="다음 이야기"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>

      {/* Horizontal Scrollable Cards */}
      <div
        ref={scrollRef}
        className="flex gap-4 sm:gap-5 overflow-x-auto pb-4 pt-1 scrollbar-none snap-x snap-mandatory"
      >
        {stories.map((story) => (
          <article
            key={story.id}
            onClick={() => onSelectStory(story)}
            className="group relative flex w-[280px] sm:w-[320px] md:w-[360px] shrink-0 cursor-pointer flex-col overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg snap-start"
          >
            {/* Thumbnail Image Container */}
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-100">
              <img
                src={story.image}
                alt={story.title}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-40 group-hover:opacity-30 transition-opacity" />

              {/* Stage Badge on Image (Matches mockup: e.g. "창작 과정 2단계") */}
              <div className="absolute top-3 left-3 rounded-full bg-black/65 backdrop-blur-md px-3 py-1 text-[10px] sm:text-[11px] font-semibold text-white">
                {story.stage}
              </div>

              {/* Read indicator */}
              <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-black/45 backdrop-blur-md px-2.5 py-0.5 text-[10px] text-white/90">
                <BookOpen className="size-3" />
                <span>일지 읽기</span>
              </div>
            </div>

            {/* Content Body */}
            <div className="flex flex-1 flex-col p-4 sm:p-5">
              {/* Artist Name */}
              <span className="text-xs sm:text-[13px] font-bold text-[#1a56db]">
                {story.artistName}
              </span>

              {/* Title */}
              <h3 className="mt-1 font-serif-kr text-base sm:text-lg font-bold text-[#181816] line-clamp-1 group-hover:text-[#1a56db] transition-colors">
                {story.title}
              </h3>

              {/* Summary Description */}
              <p className="mt-2 text-xs sm:text-sm text-black/65 leading-relaxed line-clamp-2">
                {story.summary}
              </p>

              {/* Bottom Meta */}
              <div className="mt-4 pt-3 border-t border-black/5 flex items-center justify-between text-[11px] text-black/45">
                <span>{story.fullLog.duration}</span>
                <span className="group-hover:translate-x-0.5 transition-transform text-[#181816] font-medium">
                  자세히 보기 →
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
