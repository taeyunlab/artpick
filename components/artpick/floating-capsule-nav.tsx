'use client';

import { Home, Compass, Settings, Sparkles, BookOpen } from 'lucide-react';

interface FloatingCapsuleNavProps {
  currentTab: string;
  onSelectTab: (tab: 'home' | 'artworks' | 'magazine') => void;
  onToggleSimulator?: () => void;
  isSimulatorActive?: boolean;
}

export function FloatingCapsuleNav({
  currentTab,
  onSelectTab,
  onToggleSimulator,
  isSimulatorActive,
}: FloatingCapsuleNavProps) {
  return (
    <div className="fixed bottom-5 inset-x-0 z-40 pointer-events-none flex items-center justify-center px-4">
      <div className="relative flex items-center gap-3">
        {/* Capsule Navigation Bar (Matches mockup bottom navigation) */}
        <nav
          role="navigation"
          aria-label="빠른 탐색 네비게이션"
          className="pointer-events-auto flex items-center gap-1 sm:gap-2 rounded-full bg-[#181816]/92 px-3 py-2 shadow-2xl backdrop-blur-md border border-white/10"
        >
          {/* Home Button */}
          <button
            onClick={() => onSelectTab('home')}
            className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
              currentTab === 'home'
                ? 'bg-white/15 text-[#38bdf8]'
                : 'text-white/70 hover:text-white hover:bg-white/5'
            }`}
          >
            <Home className="size-4" />
            <span>Home</span>
          </button>

          {/* Explore (Artworks) Button */}
          <button
            onClick={() => onSelectTab('artworks')}
            className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
              currentTab === 'artworks'
                ? 'bg-white/15 text-[#38bdf8]'
                : 'text-white/70 hover:text-white hover:bg-white/5'
            }`}
          >
            <Compass className="size-4" />
            <span>Explore</span>
          </button>

          {/* Magazine (Story) Button */}
          <button
            onClick={() => onSelectTab('magazine')}
            className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
              currentTab === 'magazine'
                ? 'bg-white/15 text-[#38bdf8]'
                : 'text-white/70 hover:text-white hover:bg-white/5'
            }`}
          >
            <BookOpen className="size-4" />
            <span className="hidden sm:inline">Story</span>
          </button>
        </nav>

        {/* Floating Action Button (FAB - Settings / Simulator Toggle from mockup) */}
        {onToggleSimulator && (
          <button
            onClick={onToggleSimulator}
            aria-label="모바일 목업 프레임 토글"
            title="모바일 화면 시뮬레이터 토글"
            className={`pointer-events-auto flex size-11 items-center justify-center rounded-full shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 ${
              isSimulatorActive
                ? 'bg-[#181816] text-amber-300 ring-2 ring-amber-300/50'
                : 'bg-[#1a56db] text-white hover:bg-[#1546b8]'
            }`}
          >
            <Settings className="size-5" />
          </button>
        )}
      </div>
    </div>
  );
}
