'use client';

import { useState } from 'react';
import { ArrowLeft, MoreHorizontal, Calendar, MapPin } from 'lucide-react';
import { Artist, Artwork } from '@/lib/artpick-data';
import { Button } from '@/components/ui/button';

interface ArtistViewProps {
  artist: Artist;
  artworks: Artwork[];
  isFollowed: boolean;
  onToggleFollow: (artistId: string) => void;
  onSelectArtwork: (artwork: Artwork) => void;
  onBack: () => void;
}

export function ArtistView({
  artist,
  artworks,
  isFollowed,
  onToggleFollow,
  onSelectArtwork,
  onBack,
}: ArtistViewProps) {
  const [activeTab, setActiveTab] = useState<'works' | 'intro' | 'exhibitions' | 'news'>('works');

  // Filter artworks belonging to this artist
  const artistArtworks = artworks.filter((item) => item.artistId === artist.id);

  return (
    <div className="min-h-screen bg-[#f7f6f2] pb-24">
      {/* Top Navigation Bar */}
      <div className="sticky top-0 z-30 border-b border-black/[0.06] bg-[#f7f6f2]/90 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-[1200px] items-center justify-between px-5 md:px-10">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-sm font-medium text-black/70 hover:text-black"
            aria-label="뒤로 가기"
          >
            <ArrowLeft className="size-4" />
            <span className="hidden sm:inline">목록으로 돌아가기</span>
          </button>

          <span className="font-medium text-sm text-[#181816]">{artist.name} 작가</span>

          <button
            onClick={() => {
              if (typeof navigator !== 'undefined' && navigator.clipboard) {
                void navigator.clipboard.writeText(window.location.href);
                alert('작가 프로필 링크가 복사되었습니다.');
              }
            }}
            className="grid size-8 place-items-center rounded-full hover:bg-black/5"
            aria-label="공유하기"
          >
            <MoreHorizontal className="size-5 text-black/70" />
          </button>
        </div>
      </div>

      {/* Artist Cover Banner */}
      <div className="relative h-48 sm:h-64 lg:h-72 w-full overflow-hidden bg-neutral-800">
        <img
          src={artist.coverImage}
          alt={artist.name}
          className="h-full w-full object-cover opacity-90 filter brightness-[0.92]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
      </div>

      {/* Main Profile Info Container */}
      <div className="mx-auto max-w-[1200px] px-5 md:px-10">
        <div className="relative -mt-16 sm:-mt-20 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          {/* Avatar & Identifiers */}
          <div className="flex items-end gap-5">
            <div className="relative size-24 sm:size-32 overflow-hidden rounded-full border-4 border-[#f7f6f2] bg-neutral-300 shadow-md">
              <img
                src={artist.avatar}
                alt={artist.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="pb-1">
              <h1 className="font-serif-kr text-2xl font-bold text-[#181816] sm:text-3xl">
                {artist.name}
              </h1>
              <p className="text-xs text-black/50 font-normal">{artist.handle}</p>
            </div>
          </div>

          {/* Follow CTA Button */}
          <div className="flex items-center gap-3 self-start md:self-end">
            <Button
              onClick={() => onToggleFollow(artist.id)}
              className={`h-9 sm:h-10 rounded-full px-6 text-xs sm:text-sm font-medium transition-all ${
                isFollowed
                  ? 'border border-black/20 bg-white text-black hover:bg-black/5'
                  : 'bg-[#1a56db] text-white hover:bg-[#1545b3] shadow-sm'
              }`}
            >
              {isFollowed ? '팔로잉 ✓' : '팔로우'}
            </Button>
          </div>
        </div>

        {/* Stats Row */}
        <div className="mt-6 flex items-center gap-8 border-b border-black/[0.07] pb-6">
          <div>
            <span className="font-cinzel text-lg font-bold text-[#181816] sm:text-xl">
              {isFollowed ? '1.2만+' : artist.followers}
            </span>
            <span className="ml-1.5 text-xs text-black/55">팔로워</span>
          </div>
          <div>
            <span className="font-cinzel text-lg font-bold text-[#181816] sm:text-xl">
              {artistArtworks.length || artist.artworksCount}
            </span>
            <span className="ml-1.5 text-xs text-black/55">작품</span>
          </div>
          <div>
            <span className="font-cinzel text-lg font-bold text-[#181816] sm:text-xl">
              {artist.exhibitionsCount}
            </span>
            <span className="ml-1.5 text-xs text-black/55">전시</span>
          </div>
        </div>

        {/* Artist Bio & Statement */}
        <div className="mt-6 max-w-2xl">
          <p className="text-sm leading-relaxed text-[#181816]/80 font-normal">
            {artist.bio}
          </p>
          <p className="mt-2 text-xs italic text-black/55 font-serif-kr">
            {artist.quote}
          </p>
        </div>

        {/* Tabs Bar */}
        <div className="mt-8 flex border-b border-black/[0.08]">
          <button
            onClick={() => setActiveTab('works')}
            className={`relative pb-3 text-sm font-semibold transition-colors px-4 ${
              activeTab === 'works'
                ? 'text-[#1a56db]'
                : 'text-black/50 hover:text-black'
            }`}
          >
            작품
            {activeTab === 'works' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1a56db]" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('intro')}
            className={`relative pb-3 text-sm font-semibold transition-colors px-4 ${
              activeTab === 'intro'
                ? 'text-[#1a56db]'
                : 'text-black/50 hover:text-black'
            }`}
          >
            소개
            {activeTab === 'intro' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1a56db]" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('exhibitions')}
            className={`relative pb-3 text-sm font-semibold transition-colors px-4 ${
              activeTab === 'exhibitions'
                ? 'text-[#1a56db]'
                : 'text-black/50 hover:text-black'
            }`}
          >
            전시
            {activeTab === 'exhibitions' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1a56db]" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('news')}
            className={`relative pb-3 text-sm font-semibold transition-colors px-4 ${
              activeTab === 'news'
                ? 'text-[#1a56db]'
                : 'text-black/50 hover:text-black'
            }`}
          >
            소식
            {activeTab === 'news' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1a56db]" />
            )}
          </button>
        </div>

        {/* Tab Contents */}
        <div className="mt-8">
          {activeTab === 'works' && (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
              {artistArtworks.map((item) => (
                <div
                  key={item.id}
                  onClick={() => onSelectArtwork(item)}
                  className="group cursor-pointer overflow-hidden rounded-xl bg-neutral-200 transition-all hover:shadow-md"
                >
                  <div className="relative aspect-square w-full overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20" />
                    <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-white opacity-0 transition-opacity group-hover:opacity-100">
                      <span className="truncate text-xs font-semibold drop-shadow">
                        {item.title}
                      </span>
                    </div>
                  </div>
                  <div className="p-2.5 bg-white/60">
                    <p className="truncate text-xs font-semibold text-[#181816]">
                      {item.title}
                    </p>
                    <p className="text-[11px] font-medium text-black/60">
                      {item.formattedPrice}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'intro' && (
            <div className="max-w-2xl rounded-2xl bg-white p-6 sm:p-8 shadow-sm">
              <h3 className="font-serif-kr text-lg font-bold text-[#181816]">작가 노트</h3>
              <p className="mt-4 text-sm leading-relaxed text-black/75">
                우리가 무심코 지나치는 하루의 순간들 속에는 수많은 색과 감정이 깃들어 있습니다. 
                아침 창가로 비쳐드는 차가운 새벽빛, 길가에 피어난 수국의 짙푸른 결, 
                그리고 하루를 마무리하며 바라보는 저녁 하늘의 부드러운 온기까지.
              </p>
              <p className="mt-4 text-sm leading-relaxed text-black/75">
                그림을 그리는 행위는 저에게 그 찰나의 감정들을 화폭 위에 겹겹이 기록하고, 
                그 속에서 다시 삶을 살아갈 위로와 다정함을 길어 올리는 여정입니다. 
                제 작품이 당신의 일상 한구석에서 작은 휴식과 따스한 대화가 되기를 바랍니다.
              </p>
            </div>
          )}

          {activeTab === 'exhibitions' && (
            <div className="max-w-2xl space-y-4">
              {artist.exhibitions.map((ex, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-4 rounded-xl bg-white p-4 shadow-sm"
                >
                  <Calendar className="mt-0.5 size-4 text-[#1a56db]" />
                  <div>
                    <span className="text-xs font-bold text-[#1a56db]">{ex.year}</span>
                    <h4 className="mt-0.5 text-sm font-semibold text-[#181816]">{ex.title}</h4>
                    <p className="mt-1 flex items-center gap-1 text-xs text-black/55">
                      <MapPin className="size-3" />
                      {ex.location}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'news' && (
            <div className="max-w-2xl space-y-4">
              {artist.news.map((item, idx) => (
                <div key={idx} className="rounded-xl bg-white p-5 shadow-sm">
                  <span className="text-[11px] font-medium text-black/40">{item.date}</span>
                  <h4 className="mt-1 text-sm font-bold text-[#181816]">{item.title}</h4>
                  <p className="mt-2 text-xs leading-relaxed text-black/70">{item.summary}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
