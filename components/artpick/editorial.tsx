'use client';

import { MAGAZINE_ARTICLES, MagazineArticle } from '@/lib/artpick-data';

interface EditorialProps {
  onSelectArticle?: (article: MagazineArticle) => void;
}

export function Editorial({ onSelectArticle }: EditorialProps) {
  return (
    <section className="border-t border-black/[0.08] bg-[#f7f6f2] pt-16 pb-20">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        {/* Editorial Brand Statement from Top-Right of Mockup */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between border-b border-black/[0.08] pb-12 gap-8">
          <div>
            <span className="font-cinzel text-xs font-bold tracking-[0.25em] text-[#1a56db]">
              ARTPICK EDITORIAL
            </span>
            <h2 className="font-serif-kr mt-3 text-3xl font-bold leading-snug tracking-tight text-[#181816] sm:text-4xl lg:text-5xl">
              예술을 고르는
              <br />
              당신이, 새로운 이야기를 만듭니다.
            </h2>
          </div>

          <div className="flex flex-col gap-1.5 text-right font-cinzel text-xs tracking-[0.2em] text-black/50">
            <span className="hover:text-black transition-colors">ARTISTS</span>
            <span className="hover:text-black transition-colors">ARTWORKS</span>
            <span className="hover:text-black transition-colors">COMMUNITY</span>
            <span className="font-bold text-[#1a56db]">A BRIGHTER TOMORROW</span>
          </div>
        </div>

        {/* Magazine Feature Stories */}
        <div>
          <div className="mb-6 flex items-center justify-between">
            <span className="font-serif-kr text-xl font-bold text-[#181816]">
              ARTPICK 매거진 & 스토리
            </span>
            <span className="text-xs text-black/45">예술과 일상을 잇는 영감의 기록</span>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {MAGAZINE_ARTICLES.map((article) => (
              <article
                key={article.id}
                onClick={() => onSelectArticle?.(article)}
                className="group cursor-pointer rounded-2xl bg-white p-4 shadow-sm transition-all duration-300 hover:shadow-md"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-neutral-200">
                  <img
                    src={article.cover}
                    alt={article.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-3 left-3 rounded-full bg-black/65 px-2.5 py-1 text-[10px] font-medium text-white backdrop-blur-sm">
                    {article.category}
                  </span>
                </div>

                <div className="pt-4">
                  <div className="flex items-center justify-between text-[11px] text-black/40">
                    <span>{article.date}</span>
                    <span>{article.readTime}</span>
                  </div>
                  <h3 className="mt-2 font-serif-kr text-base font-bold text-[#181816] group-hover:text-[#1a56db] transition-colors line-clamp-1">
                    {article.title}
                  </h3>
                  <p className="mt-1.5 text-xs text-black/60 line-clamp-2 leading-relaxed">
                    {article.subtitle}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Brand Footer Typography from Reference Mockup */}
        <div className="mt-20 pt-10 border-t border-black/[0.08] flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <p className="font-cinzel text-xs font-bold tracking-[0.25em] text-[#181816]">
              ART CHANGES TOMORROW
            </p>
            <p className="font-serif-kr mt-1 text-xs text-black/55">
              작은 선택이 새로운 예술의 내일을 만듭니다.
            </p>
          </div>

          <div className="text-xs text-black/45">
            © 2026 ARTPICK. All rights reserved. Made for art lovers & artists.
          </div>

          <div>
            <p className="font-cinzel text-xs tracking-[0.18em] text-black/50">
              MORE ARTISTS, A BRIGHTER TOMORROW.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
