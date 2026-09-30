'use client';

import { useState, useEffect, useMemo } from 'react';
import { Header } from '@/components/artpick/header';
import { Hero } from '@/components/artpick/hero';
import { FeaturedArtworks } from '@/components/artpick/featured-artworks';
import { ArtworkModal } from '@/components/artpick/artwork-modal';
import { ArtistView } from '@/components/artpick/artist-view';
import { ArtistsList } from '@/components/artpick/artists-list';
import { Editorial } from '@/components/artpick/editorial';
import { RegisterModal } from '@/components/artpick/register-modal';
import { LoginModal } from '@/components/artpick/login-modal';
import { MobileMockupFrame } from '@/components/artpick/mobile-mockup-frame';
import { ArtistSpotlight } from '@/components/artpick/artist-spotlight';
import { CreationStories } from '@/components/artpick/creation-stories';
import { StoryModal } from '@/components/artpick/story-modal';
import { FloatingCapsuleNav } from '@/components/artpick/floating-capsule-nav';
import {
  INITIAL_ARTWORKS,
  ARTISTS_DATA,
  Artwork,
  CreationStory,
  CREATION_STORIES,
} from '@/lib/artpick-data';
import { Check } from 'lucide-react';

export default function Home() {
  const [currentTab, setCurrentTab] = useState<'home' | 'artworks' | 'artists' | 'magazine'>('home');
  const [artworks, setArtworks] = useState<Artwork[]>(INITIAL_ARTWORKS);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [followedArtists, setFollowedArtists] = useState<string[]>(['seoyun_lee', 'seoyoung_kim']);
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [selectedArtistId, setSelectedArtistId] = useState<string | null>(null);
  const [selectedStory, setSelectedStory] = useState<CreationStory | null>(null);
  const [isDevicePreview, setIsDevicePreview] = useState<boolean>(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState<boolean>(false);
  const [isLoginOpen, setIsLoginOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [_user, setUser] = useState<{ name: string; email: string } | null>(null);

  // Load saved state from LocalStorage on mount
  useEffect(() => {
    try {
      const savedFavs = localStorage.getItem('artpick:favorites');
      if (savedFavs) setFavorites(JSON.parse(savedFavs));

      const savedFollows = localStorage.getItem('artpick:followed');
      if (savedFollows) setFollowedArtists(JSON.parse(savedFollows));

      const savedCustomArtworks = localStorage.getItem('artpick:custom_artworks');
      if (savedCustomArtworks) {
        const parsed: Artwork[] = JSON.parse(savedCustomArtworks);
        setArtworks([...parsed, ...INITIAL_ARTWORKS]);
      }
    } catch (e) {
      console.error('Error loading localStorage:', e);
    }
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2400);
  };

  const handleToggleFavorite = (id: number) => {
    setFavorites((prev) => {
      const exists = prev.includes(id);
      const next = exists ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        localStorage.setItem('artpick:favorites', JSON.stringify(next));
      } catch {}
      showToast(exists ? '관심 작품에서 삭제되었습니다.' : '관심 작품에 추가되었습니다.');
      return next;
    });
  };

  const handleToggleFollow = (artistId: string) => {
    setFollowedArtists((prev) => {
      const exists = prev.includes(artistId);
      const next = exists ? prev.filter((item) => item !== artistId) : [...prev, artistId];
      try {
        localStorage.setItem('artpick:followed', JSON.stringify(next));
      } catch {}
      const artistName = ARTISTS_DATA[artistId]?.name || '작가';
      showToast(exists ? `${artistName} 작가 팔로우를 취소했습니다.` : `${artistName} 작가를 팔로우했습니다.`);
      return next;
    });
  };

  const handleAddArtwork = (newArtwork: Artwork) => {
    setArtworks((prev) => {
      const next = [newArtwork, ...prev];
      try {
        const customOnly = next.filter((item) => !INITIAL_ARTWORKS.some((init) => init.id === item.id));
        localStorage.setItem('artpick:custom_artworks', JSON.stringify(customOnly));
      } catch {}
      return next;
    });
    showToast(`작품 「${newArtwork.title}」이 성공적으로 등록되었습니다.`);
  };

  const handleInquire = (artwork: Artwork) => {
    showToast(`「${artwork.title}」소장 문의가 갤러리 큐레이터에게 접수되었습니다.`);
  };

  // Filter artworks by search query (including title, artist, category, medium)
  const displayedArtworks = useMemo(() => {
    if (!searchQuery.trim()) return artworks;
    const q = searchQuery.toLowerCase();
    return artworks.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.artist.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.medium.toLowerCase().includes(q)
    );
  }, [artworks, searchQuery]);

  const selectedArtist = selectedArtistId ? ARTISTS_DATA[selectedArtistId] : null;

  return (
    <div className="min-h-screen bg-[#f7f6f2] text-[#181816] flex flex-col justify-between pb-16">
      <div>
        {/* Global Navigation Header */}
        <Header
          currentTab={currentTab}
          onNavigate={(tab) => {
            setCurrentTab(tab);
            setSelectedArtistId(null);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onOpenRegister={() => setIsRegisterOpen(true)}
          onOpenLogin={() => setIsLoginOpen(true)}
          onToggleDevicePreview={() => setIsDevicePreview((prev) => !prev)}
          isDevicePreview={isDevicePreview}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          savedCount={favorites.length}
        />

        {/* Dual Phone Simulation Mockup Mode (toggleable from header or floating button) */}
        {isDevicePreview && (
          <MobileMockupFrame
            artworks={artworks}
            artist={ARTISTS_DATA.seoyun_lee || ARTISTS_DATA.seoyoung_kim}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            onSelectArtwork={(item) => setSelectedArtwork(item)}
            isFollowed={followedArtists.includes('seoyun_lee')}
            onToggleFollow={handleToggleFollow}
            onClose={() => setIsDevicePreview(false)}
            onSelectStory={(story) => setSelectedStory(story)}
          />
        )}

        {/* Main Body depending on selected state & tabs */}
        {selectedArtist ? (
          /* Dedicated Artist Profile View */
          <ArtistView
            artist={selectedArtist}
            artworks={artworks}
            isFollowed={followedArtists.includes(selectedArtist.id)}
            onToggleFollow={handleToggleFollow}
            onSelectArtwork={(item) => setSelectedArtwork(item)}
            onBack={() => setSelectedArtistId(null)}
          />
        ) : currentTab === 'artists' ? (
          /* Artists Directory Tab */
          <ArtistsList
            onSelectArtist={(artistId) => setSelectedArtistId(artistId)}
            followedArtists={followedArtists}
            onToggleFollow={handleToggleFollow}
          />
        ) : currentTab === 'magazine' ? (
          /* Magazine Tab */
          <Editorial />
        ) : (
          /* Home & Artworks Feed (Matches the user's mockup design) */
          <>
            {/* Desktop Hero Section */}
            {currentTab === 'home' && (
              <Hero
                onExploreClick={() => {
                  const featuredSection = document.getElementById('featured-section');
                  featuredSection?.scrollIntoView({ behavior: 'smooth' });
                }}
                onArtistStartClick={() => setIsRegisterOpen(true)}
              />
            )}

            {/* 1. 이 주의 주목할 신진 작가 (Artist Spotlight Banner) */}
            {currentTab === 'home' && (
              <ArtistSpotlight
                onSelectArtist={(artistId) => setSelectedArtistId(artistId)}
                onOpenStory={() => setSelectedStory(CREATION_STORIES[0])}
              />
            )}

            {/* 2. 📖 창작의 과정 (Story) - 완성된 작품 너머의 작업실 이야기 */}
            {currentTab === 'home' && (
              <CreationStories
                onSelectStory={(story) => setSelectedStory(story)}
              />
            )}

            {/* 3. 🎨 실시간 작품 큐레이션 Section */}
            <div id="featured-section">
              <FeaturedArtworks
                artworks={displayedArtworks}
                favorites={favorites}
                onToggleFavorite={handleToggleFavorite}
                onSelectArtwork={(item) => setSelectedArtwork(item)}
                onSelectArtist={(artistId) => setSelectedArtistId(artistId)}
                onViewAllClick={() => setCurrentTab('artworks')}
                followedArtists={followedArtists}
                onToggleFollow={handleToggleFollow}
              />
            </div>

            {/* Editorial Brand Section & Footer */}
            <Editorial />
          </>
        )}
      </div>

      {/* Floating Capsule Navigation Bar & FAB (Matches mockup) */}
      <FloatingCapsuleNav
        currentTab={currentTab}
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          setSelectedArtistId(null);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onToggleSimulator={() => setIsDevicePreview((prev) => !prev)}
        isSimulatorActive={isDevicePreview}
      />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <output
          className="fixed bottom-20 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2.5 rounded-full bg-[#181816] px-5 py-3 text-xs font-medium text-white shadow-2xl transition-all"
        >
          <div className="grid size-4 place-items-center rounded-full bg-[#1a56db] text-white">
            <Check className="size-3 stroke-[3]" />
          </div>
          <span>{toastMessage}</span>
        </output>
      )}

      {/* Work-in-Progress Story Modal (창작의 과정 상세 일지 모달) */}
      <StoryModal
        story={selectedStory}
        isOpen={!!selectedStory}
        onClose={() => setSelectedStory(null)}
        onViewArtwork={(artworkId) => {
          const target = artworks.find((a) => a.id === artworkId);
          if (target) setSelectedArtwork(target);
        }}
        onSelectArtist={(artistId) => setSelectedArtistId(artistId)}
      />

      {/* Artwork Detail Modal */}
      <ArtworkModal
        artwork={selectedArtwork}
        isOpen={!!selectedArtwork}
        onClose={() => setSelectedArtwork(null)}
        isFavorite={selectedArtwork ? favorites.includes(selectedArtwork.id) : false}
        onToggleFavorite={handleToggleFavorite}
        onSelectArtist={(artistId) => {
          setSelectedArtwork(null);
          setSelectedArtistId(artistId);
        }}
        onInquire={handleInquire}
      />

      {/* Register Artwork Modal */}
      <RegisterModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        onAddArtwork={handleAddArtwork}
      />

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLoginSuccess={(loggedUser) => {
          setUser(loggedUser);
          showToast(`${loggedUser.name}님 환영합니다.`);
        }}
      />
    </div>
  );
}
