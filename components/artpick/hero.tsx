'use client';

import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeroProps {
  onExploreClick: () => void;
  onArtistStartClick: () => void;
}

export function Hero({ onExploreClick, onArtistStartClick }: HeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-black/[0.06] bg-[#f7f6f2] pt-12 pb-16 md:pt-20 md:pb-24">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          {/* Left Column: Headline, Description, Buttons, Metrics */}
          <div className="flex flex-col">
            <h1 className="font-serif-kr text-[2.75rem] font-bold leading-[1.18] tracking-[-0.03em] text-[#181816] sm:text-5xl md:text-6xl lg:text-[4.25rem]">
              당신의 취향이
              <br />
              작품을 만나는 곳
            </h1>

            <p className="mt-6 max-w-xl text-base text-[#181816]/70 sm:text-lg leading-relaxed font-normal">
              새로운 작가와 작품을 발견하고, 소장하는 즐거움을 시작하세요.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
              <Button
                onClick={onExploreClick}
                className="h-12 rounded-full bg-[#1a56db] px-7 text-sm font-medium text-white shadow-sm transition-all hover:bg-[#1545b3] hover:shadow-md"
              >
                작품 둘러보기
                <ArrowRight className="ml-1.5 size-4" />
              </Button>

              <button
                onClick={onArtistStartClick}
                className="flex h-12 items-center justify-center rounded-full border border-black/20 bg-white/80 px-7 text-sm font-medium text-[#181816] transition-all hover:border-black/40 hover:bg-white hover:shadow-sm"
              >
                작가로 시작하기
              </button>
            </div>

            {/* Metrics Bar */}
            <div className="mt-14 pt-8 border-t border-black/[0.08] grid grid-cols-3 gap-4 max-w-lg">
              <div>
                <div className="font-cinzel text-2xl font-bold tracking-tight text-[#181816] sm:text-3xl">
                  1,200+
                </div>
                <div className="mt-1 text-xs text-black/55 font-medium">등록 작가</div>
              </div>

              <div>
                <div className="font-cinzel text-2xl font-bold tracking-tight text-[#181816] sm:text-3xl">
                  8,500+
                </div>
                <div className="mt-1 text-xs text-black/55 font-medium">등록 작품</div>
              </div>

              <div>
                <div className="font-cinzel text-2xl font-bold tracking-tight text-[#181816] sm:text-3xl">
                  12,000+
                </div>
                <div className="mt-1 text-xs text-black/55 font-medium">
                  예술을 사랑하는 사람들
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Museum / Gallery Scene with Quotes */}
          <div className="relative">
            <div className="relative mx-auto max-w-[560px] overflow-hidden rounded-[24px] bg-[#e8e6df] shadow-2xl shadow-black/10 transition-transform duration-500 hover:scale-[1.01]">
              <img
                src="https://images.unsplash.com/photo-1536924940846-227afb31e2a5?auto=format&fit=crop&w=1200&q=85"
                alt="갤러리에서 대형 블루 추상화 작품을 감상하는 인물"
                className="h-[380px] w-full object-cover sm:h-[460px] lg:h-[500px]"
              />

              {/* Floating Typography from Reference Image */}
              <div className="absolute top-8 left-8 max-w-[170px] rounded-xl bg-white/85 p-4 backdrop-blur-md shadow-sm border border-white/60">
                <p className="font-serif-kr text-[11px] font-semibold tracking-wider text-black/70 uppercase">
                  Good Art
                </p>
                <p className="font-serif-kr text-[11px] font-semibold tracking-wider text-black/70 uppercase">
                  Brings People
                </p>
                <p className="font-serif-kr text-[11px] font-semibold tracking-wider text-black/70 uppercase">
                  Together
                </p>
                <div className="mt-2.5 h-[1.5px] w-6 bg-black/40" />
              </div>

              <div className="absolute right-6 bottom-8 max-w-[180px] rounded-xl bg-black/75 p-3.5 backdrop-blur-md text-white shadow-lg">
                <p className="font-serif-kr text-xs font-medium leading-relaxed tracking-tight text-white/95">
                  예술이 사람을<br />
                  더 가깝게 만듭니다.
                </p>
              </div>
            </div>

            {/* Subtle aesthetic backdrop blur badge */}
            <div className="absolute -bottom-6 -left-6 -z-10 h-64 w-64 rounded-full bg-[#1a56db]/10 blur-3xl pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}
