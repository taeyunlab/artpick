'use client';

import { ARTISTS_DATA, Artist } from '@/lib/artpick-data';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface ArtistsListProps {
  onSelectArtist: (artistId: string) => void;
  followedArtists: string[];
  onToggleFollow: (artistId: string) => void;
}

export function ArtistsList({
  onSelectArtist,
  followedArtists,
  onToggleFollow,
}: ArtistsListProps) {
  const artists = Object.values(ARTISTS_DATA);

  return (
    <section className="py-14 md:py-20 bg-[#f7f6f2] min-h-[70vh]">
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <div className="mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-[#1a56db]">
            Our Creators
          </span>
          <h1 className="font-serif-kr text-3xl font-bold text-[#181816] sm:text-4xl mt-1">
            ARTPICK 등록 작가
          </h1>
          <p className="mt-2 text-sm text-black/60">
            고유한 시선과 필치로 시대를 기록하는 아티스트들을 만나보세요.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {artists.map((artist) => {
            const isFollowed = followedArtists.includes(artist.id);
            return (
              <div
                key={artist.id}
                onClick={() => onSelectArtist(artist.id)}
                className="group cursor-pointer rounded-2xl bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md border border-black/[0.04]"
              >
                <div className="flex items-center gap-4">
                  <div className="relative size-16 overflow-hidden rounded-full border border-black/10 bg-neutral-200">
                    <img
                      src={artist.avatar}
                      alt={artist.name}
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <div>
                    <h3 className="font-serif-kr text-lg font-bold text-[#181816] group-hover:text-[#1a56db] transition-colors">
                      {artist.name}
                    </h3>
                    <p className="text-xs text-black/45">{artist.handle}</p>
                    <span className="mt-1 inline-block rounded-full bg-[#1a56db]/10 px-2.5 py-0.5 text-[10px] font-semibold text-[#1a56db]">
                      {artist.category}
                    </span>
                  </div>
                </div>

                <p className="mt-4 text-xs leading-relaxed text-black/65 line-clamp-2">
                  {artist.bio}
                </p>

                <div className="mt-5 flex items-center justify-between border-t border-black/[0.06] pt-4">
                  <div className="flex gap-4 text-xs">
                    <div>
                      <span className="font-bold text-[#181816]">
                        {isFollowed ? '1.2만+' : artist.followers}
                      </span>{' '}
                      <span className="text-black/40">팔로워</span>
                    </div>
                    <div>
                      <span className="font-bold text-[#181816]">{artist.artworksCount}</span>{' '}
                      <span className="text-black/40">작품</span>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleFollow(artist.id);
                    }}
                    className={`rounded-full px-3.5 py-1 text-xs font-semibold transition ${
                      isFollowed
                        ? 'border border-black/20 bg-white text-black'
                        : 'bg-[#1a56db] text-white hover:bg-[#1545b3]'
                    }`}
                  >
                    {isFollowed ? '팔로잉' : '팔로우'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
